import { connect } from "cloudflare:sockets";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const recentSubmissions = new Map<string, number>();
const duplicateWindowMs = 60_000;

async function sendGmailSMTP(user: string, pass: string, to: string, subject: string, textBody: string, htmlBody: string, replyTo: string) {
    const socket = connect("smtp.gmail.com:465", { secureTransport: "on" });
    const writer = socket.writable.getWriter();
    const reader = socket.readable.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    async function readResponse(): Promise<string> {
        let result = "";
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            result += decoder.decode(value);
            if (result.includes("\r\n") && !/^\d{3}-/m.test(result.split("\r\n").slice(-2)[0])) break;
        }
        return result;
    }

    async function send(cmd: string): Promise<string> {
        await writer.write(encoder.encode(cmd + "\r\n"));
        return readResponse();
    }

    const b64 = (s: string) => btoa(s);
    const boundary = "----PTPBoundary" + Date.now();

    const mime = [
        `From: "Plastic To Paper" <${user}>`,
        `To: ${to}`,
        `Reply-To: ${replyTo}`,
        `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
        `MIME-Version: 1.0`,
        `Content-Type: multipart/alternative; boundary="${boundary}"`,
        ``,
        `--${boundary}`,
        `Content-Type: text/plain; charset=UTF-8`,
        `Content-Transfer-Encoding: base64`,
        ``,
        btoa(unescape(encodeURIComponent(textBody))),
        ``,
        `--${boundary}`,
        `Content-Type: text/html; charset=UTF-8`,
        `Content-Transfer-Encoding: base64`,
        ``,
        btoa(unescape(encodeURIComponent(htmlBody))),
        ``,
        `--${boundary}--`,
    ].join("\r\n");

    // SMTP conversation
    await readResponse(); // 220 greeting
    await send(`EHLO plastictopaper.org`);
    await send(`AUTH LOGIN`);
    await send(b64(user));
    const authResult = await send(b64(pass));
    if (!authResult.startsWith("235")) {
        throw new Error("SMTP auth failed: " + authResult);
    }
    await send(`MAIL FROM:<${user}>`);
    await send(`RCPT TO:<${to}>`);
    await send(`DATA`);
    await writer.write(encoder.encode(mime + "\r\n.\r\n"));
    const dataResult = await readResponse();
    if (!dataResult.startsWith("250")) {
        throw new Error("SMTP data failed: " + dataResult);
    }
    await send(`QUIT`);
    await writer.close();
    await socket.close();
}

export async function POST(request: Request) {
    let tr = false;
    const message = (en: string, translated: string) => tr ? translated : en;
    try {
        const body = await request.json() as Record<string, unknown>;
        tr = body.locale === "tr";
        if (body.website) return Response.json({ message: message("Submission rejected.", "Başvuru reddedildi.") }, { status: 400 });

        const required = ["name", "company", "email", "country", "description"];
        if (required.some((key) => typeof body[key] !== "string" || !(body[key] as string).trim())) {
            return Response.json({ message: message("Please complete the required fields.", "Lütfen zorunlu alanları tamamlayın.") }, { status: 400 });
        }
        if (!emailPattern.test(String(body.email))) {
            return Response.json({ message: message("Please enter a valid business email.", "Lütfen geçerli bir kurumsal e-posta girin.") }, { status: 400 });
        }
        if (body.consent !== "accepted") {
            return Response.json({ message: message("Please confirm the privacy and data-processing consent.", "Lütfen gizlilik ve veri işleme onayını kabul edin.") }, { status: 400 });
        }
        if (String(body.description).length > 5000) {
            return Response.json({ message: message("Please shorten the project description.", "Lütfen proje açıklamasını kısaltın.") }, { status: 400 });
        }

        const now = Date.now();
        for (const [key, timestamp] of recentSubmissions) {
            if (now - timestamp > duplicateWindowMs) recentSubmissions.delete(key);
        }
        const fingerprint = [body.email, body.company, body.description].map((value) => String(value).trim().toLowerCase()).join("|");
        const previous = recentSubmissions.get(fingerprint);
        if (previous && now - previous <= duplicateWindowMs) {
            return Response.json({ message: message("This enquiry has already been submitted. Please wait before sending it again.", "Bu başvuru zaten gönderildi. Yeniden göndermeden önce lütfen bekleyin.") }, { status: 429 });
        }

        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        const contactTo = process.env.CONTACT_TO_EMAIL || "info@plastictopaper.org";

        if (!smtpUser || !smtpPass) {
            return Response.json({ message: message("Your project details are valid, but email delivery is not configured. No message was sent.", "Proje bilgileriniz geçerli; ancak e-posta teslimi yapılandırılmamış. Mesaj gönderilmedi.") }, { status: 503 });
        }

        const fields = [
            { label: "Ad Soyad / Name", value: body.name },
            { label: "Şirket / Company", value: body.company },
            ...(body.role ? [{ label: "Görev / Role", value: body.role }] : []),
            { label: "E-posta / Email", value: body.email },
            { label: "Ülke / Country", value: body.country },
            ...(body.stakeholder ? [{ label: "Paydaş / Stakeholder", value: body.stakeholder }] : []),
            ...(body.interest ? [{ label: "İlgi Alanı / Interest", value: body.interest }] : []),
        ];

        const escapeHtml = (s: unknown) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

        const htmlBody = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
  <div style="background:#1a1a2e;padding:24px 32px">
    <h1 style="margin:0;font-size:20px;color:#ffffff;font-weight:600">Yeni Proje Başvurusu</h1>
    <p style="margin:4px 0 0;font-size:13px;color:#94a3b8">New Project Enquiry - ${escapeHtml(body.company)}</p>
  </div>
  <div style="padding:24px 32px">
    <table style="width:100%;border-collapse:collapse">
      ${fields.map(f => `<tr>
        <td style="padding:10px 12px 10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px;white-space:nowrap;vertical-align:top">${escapeHtml(f.label)}</td>
        <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#1e293b;font-size:14px;font-weight:500">${f.label.includes("E-posta") ? `<a href="mailto:${escapeHtml(f.value)}" style="color:#2563eb;text-decoration:none">${escapeHtml(f.value)}</a>` : escapeHtml(f.value)}</td>
      </tr>`).join("")}
    </table>
    <div style="margin-top:20px;padding:16px;background:#f8fafc;border-radius:6px;border-left:3px solid #1a1a2e">
      <p style="margin:0 0 6px;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px">Proje Açıklaması / Description</p>
      <p style="margin:0;font-size:14px;color:#1e293b;line-height:1.6;white-space:pre-wrap">${escapeHtml(body.description)}</p>
    </div>
  </div>
  <div style="padding:16px 32px;background:#f8fafc;border-top:1px solid #e5e7eb;text-align:center">
    <p style="margin:0;font-size:12px;color:#94a3b8">PTP - Plastic to Paper Technology Platform</p>
  </div>
</div>`;

        const textBody = fields.map(f => `${f.label}: ${f.value}`).join("\n") + `\n\nAçıklama / Description:\n${body.description}`;

        await sendGmailSMTP(smtpUser, smtpPass, contactTo, `PTP Proje Başvurusu - ${body.company}`, textBody, htmlBody, String(body.email));

        recentSubmissions.set(fingerprint, now);
        return Response.json({ message: message(
                "Thank you. Your project enquiry has been received. We aim to acknowledge it within two business days.",
                "Teşekkür ederiz. Proje başvurunuz alınmıştır. Başvurunuza iki iş günü içinde ilk yanıtı vermeyi hedefliyoruz.",
            ) });
    } catch (error) {
        console.error("Contact form error:", error);
        return Response.json({ message: message("The submission could not be processed.", "Başvuru işlenemedi.") }, { status: 400 });
    }
}

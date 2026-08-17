const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const recentSubmissions = new Map<string, number>();
const duplicateWindowMs = 60_000;

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

    if (!process.env.CONTACT_TO_EMAIL || !process.env.CONTACT_FROM_EMAIL || !process.env.RESEND_API_KEY) {
      return Response.json({ message: message("Your project details are valid, but email delivery is not configured. No message was sent.", "Proje bilgileriniz geçerli; ancak e-posta teslimi yapılandırılmamış. Mesaj gönderilmedi.") }, { status: 503 });
    }

    let response: Response;
    try {
      response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: process.env.CONTACT_FROM_EMAIL, to: process.env.CONTACT_TO_EMAIL, subject: `PTP project enquiry — ${body.company}`, text: JSON.stringify(body, null, 2) }),
        signal: AbortSignal.timeout(12000),
      });
    } catch (error) {
      if (error instanceof DOMException && (error.name === "TimeoutError" || error.name === "AbortError")) {
        return Response.json({ message: message("Email delivery timed out. Your enquiry was not confirmed; please try again.", "E-posta teslimi zaman aşımına uğradı. Başvurunuz onaylanmadı; lütfen yeniden deneyin.") }, { status: 504 });
      }
      return Response.json({ message: message("The delivery service is temporarily unavailable. Please try again later.", "Teslimat hizmetine şu anda ulaşılamıyor. Lütfen daha sonra yeniden deneyin.") }, { status: 502 });
    }
    if (!response.ok) {
      return Response.json({ message: message("Delivery failed. Please try again later.", "Teslimat başarısız oldu. Lütfen daha sonra yeniden deneyin.") }, { status: 502 });
    }
    recentSubmissions.set(fingerprint, now);
    return Response.json({ message: message(
      "Thank you. Your project enquiry has been received. We aim to acknowledge it within two business days.",
      "Teşekkür ederiz. Proje başvurunuz alınmıştır. Başvurunuza iki iş günü içinde ilk yanıtı vermeyi hedefliyoruz.",
    ) });
  } catch {
    return Response.json({ message: message("The submission could not be processed.", "Başvuru işlenemedi.") }, { status: 400 });
  }
}

"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { nav, technologies, technologyDetails, type ComparisonRecord, type EvidenceRecord, type EvidenceStatus, type GalleryRecord, type HeroVideoRecord, type IndustrialParameter } from "../content/site";
import { homeMotionClassifications, homeVisuals, type HomeVisual } from "../content/home-visuals";

const HOME_VISUAL_BLUR = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxNicgaGVpZ2h0PScxMic+PHJlY3Qgd2lkdGg9JzE2JyBoZWlnaHQ9JzEyJyBmaWxsPScjRTdFQ0U5Jy8+PC9zdmc+";

function HomeManagedImage({visual,locale,sizes,priority=false}:{visual:HomeVisual;locale:"en"|"tr";sizes:string;priority?:boolean}) {
  const [failed,setFailed]=useState(false);
  const alt=locale==="tr"?visual.altTr:visual.altEn;
  return failed
    ? <div className="home-image-fallback" role="img" aria-label={alt}><span>{locale==="tr"?"Görsel yüklenemedi":"Visual unavailable"}</span></div>
    : <Image src={visual.src} alt={alt} fill sizes={sizes} quality={priority?88:84} priority={priority} placeholder="blur" blurDataURL={HOME_VISUAL_BLUR} onError={()=>setFailed(true)}/>;
}

export function Brand() { const tr=usePathname()?.startsWith("/tr");return <a className="brand" href={tr?"/tr":"/en"} hrefLang={tr?"tr":"en"} aria-label={tr?"PTP ana sayfa":"PTP home"}><b>PTP</b><span>Plastic-to-Paper<br/>Technology Platform</span></a> }

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isTr = pathname?.startsWith("/tr");
  const counterpart = isTr ? pathname.replace(/^\/tr/, "/en") : (pathname || "/en").replace(/^\/en/, "/tr");
  const activeNav = isTr ? [["Platform", "/tr/platform"], ["Teknolojiler", "/tr/technologies"], ["Nasıl Çalışıyoruz", "/tr/how-we-work"], ["Endüstriyel Ölçek", "/tr/industrial-scale"], ["Küresel Merkez", "/tr/global-hub"], ["İçgörüler", "/tr/insights"]] as const : nav;
  useEffect(()=>{
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections=[...document.querySelectorAll<HTMLElement>(".section,.final-cta,.mini-cta")];
    if(reduced||!("IntersectionObserver" in window)){sections.forEach(section=>section.dataset.visible="true");return;}
    sections.forEach(section=>section.dataset.visible="false");
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){(entry.target as HTMLElement).dataset.visible="true";observer.unobserve(entry.target);}}),{threshold:.08,rootMargin:"0px 0px -5%"});
    sections.forEach(section=>observer.observe(section));
    return()=>observer.disconnect();
  },[pathname]);
  const isActive=(href:string)=>pathname===href||pathname?.startsWith(`${href}/`);
  const technologyPath=pathname?.match(/technologies\/(dtpaper|ceralith|bioma-orx)/)?.[1];
  return <header className="site-header" data-technology={technologyPath||undefined}><Brand/><nav id="primary-nav" className={open ? "nav open" : "nav"} aria-label={isTr ? "Ana menü" : "Primary navigation"}>{activeNav.map(([label, href]) => <a key={href} href={href} className={isActive(href)?"current":""} aria-current={isActive(href)?"page":undefined}>{label}</a>)}<div className="locale-switch" aria-label={isTr ? "Dil seçimi" : "Language selection"}><a className={!isTr ? "active" : ""} href={isTr ? counterpart : pathname || "/en"} hrefLang="en">EN</a><span>/</span><a className={isTr ? "active" : ""} href={isTr ? pathname : counterpart} hrefLang="tr">TR</a></div><a className="nav-cta" href={isTr ? "/tr/contact" : "/en/contact"}>{isTr ? "Proje Başlat" : "Start a Project"}</a></nav><button className="menu" aria-label={isTr?"Ana menüyü aç veya kapat":"Open or close primary menu"} aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}><span>{open ? (isTr ? "Kapat" : "Close") : (isTr ? "Menü" : "Menu")}</span></button></header>
}

export function Footer() { const isTr=usePathname()?.startsWith("/tr");const base=isTr?"/tr":"/en";return <footer><div className="footer-main"><Brand/><p>{isTr?"Yeni nesil lif bazlı malzemeler için gerekli sistemleri kuruyoruz.":"Building the systems required for the next generation of fibre-based materials."}</p><div><a href={`${base}/platform`}>Platform</a><a href={`${base}/technologies`}>{isTr?"Teknolojiler":"Technologies"}</a><a href={`${base}/partners`}>{isTr?"İş Birliği":"Collaboration"}</a></div><div><a href={`${base}/insights`}>{isTr?"İçgörüler":"Insights"}</a><a href={`${base}/contact`}>{isTr?"İletişim":"Contact"}</a><a href={`${base}/privacy`}>{isTr?"Gizlilik":"Privacy"}</a><a href={`${base}/cookies`}>{isTr?"Çerezler":"Cookies"}</a><a href={`${base}/technical-disclaimer`}>{isTr?"Teknik sorumluluk reddi":"Technical disclaimer"}</a></div></div><div className="footer-line"><span>PTP · Plastic-to-Paper Technology Platform</span><span>{isTr?"Türkiye’de mühendislik derinliği. Cambridge ekosistemi üzerinden küresel bağlantı.":"Engineering depth in Türkiye. Global connection through Cambridge."}</span></div></footer> }

export function TechnologyCards() { return <div className="tech-grid">{technologies.map((t, i) => <article className={`tech-card ${t.accent}`} key={t.slug}><div className="tech-index">0{i+1}</div><p className="eyebrow">{t.label}</p><h3>{t.name}</h3><h4>{t.title}</h4><p>{t.summary}</p><ul>{t.features.map(x => <li key={x}>{x}</li>)}</ul><a className="arrow-link" href={`/en/technologies/${t.slug}`}>Explore {t.name} <span>↗</span></a></article>)}</div> }

export function TechnologyPortfolio({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  const rows=[
    {slug:"dtpaper",name:"DTPaper®",replaces:tr?"Tek kullanımlık PET transfer filmi":"Single-use PET transfer film",application:tr?"DTF tekstil baskısı":"DTF textile printing",focus:tr?"Kâğıt bazlı transfer iş akışı":"Paper-based transfer workflow"},
    {slug:"ceralith",name:"Ceralith™",replaces:tr?"Fırınlanabilir yapılardaki PET film":"PET film in ovenable structures",application:tr?"Fırınlanabilir lif ambalaj":"Ovenable fibre packaging",focus:tr?"Mineral-reaktif kaplama yapısı":"Mineral-reactive coating structure"},
    {slug:"bioma-orx",name:"Bioma-ORX®",replaces:tr?"PFAS bariyer kimyası":"PFAS barrier chemistry",application:tr?"Lif bazlı gıda ambalajı":"Fibre-based food packaging",focus:tr?"Ayarlanabilir yağ ve nem bariyeri":"Adjustable oil and moisture barrier"},
  ];
  return <div className="portfolio-compare" role="table" aria-label={tr?"Teknoloji portföyü karşılaştırması":"Technology portfolio comparison"}><div className="portfolio-head" role="row"><span role="columnheader">{tr?"Teknoloji":"Technology"}</span><span role="columnheader">{tr?"Yerine geçtiği yapı":"Replaces"}</span><span role="columnheader">{tr?"Uygulama":"Application"}</span><span role="columnheader">{tr?"Geliştirme odağı":"Development focus"}</span></div>{rows.map((row,i)=><a role="row" href={`/${locale}/technologies/${row.slug}`} className={`portfolio-row portfolio-${row.slug}`} key={row.slug}><span role="cell"><i>0{i+1}</i><b>{row.name}</b></span><span role="cell">{row.replaces}</span><span role="cell">{row.application}</span><span role="cell">{row.focus}<strong aria-hidden="true">↗</strong></span></a>)}</div>;
}

export function ProcessRoadmap({items,locale="en"}:{items:string[];locale?:"en"|"tr"}) { return <ol className="system-roadmap" aria-label={locale==="tr"?"Dokuz aşamalı geliştirme sistemi":"Nine-stage development system"}>{items.map((item,i)=><li key={item}><button type="button"><span>{String(i+1).padStart(2,"0")}</span><b>{item}</b></button></li>)}</ol> }

export function GovernanceAccordion({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  const [openIndex,setOpenIndex]=useState<number|null>(0);
  const items=tr?[
    ["PTP nedir?","Malzeme problemlerini geliştirme, validasyon ve pazar yollarıyla buluşturan bağımsız uluslararası teknoloji ve iş birliği platformudur."],
    ["Canapa’nın rolü nedir?","Canapa Paper Technologies ilk portföyü geliştirmiştir; kaplama, uygulama ve endüstriyel ölçek büyütme kabiliyetini destekler."],
    ["Teknolojileri kim endüstriyelleştirir?","Teknik geliştirme ve endüstriyelleştirme, Türkiye’deki nitelikli teknik ve üretim kabiliyetleri üzerinden koordine edilir."],
    ["Fikrî mülkiyet ve lisanslama nasıl yönetilir?","Mülkiyet, bölge, üretim hakkı ve teknoloji transferi koşulları her teknoloji için resmî sözleşmelerle tanımlanır."],
    ["Cambridge’in rolü nedir?","Bilim, iş birliği, yatırım, lisanslama ve uluslararasılaşma ağlarına erişimi tanımlar; doğrulanmamış bir ofis veya tüzel kişilik iddiası değildir."],
    ["Faaliyet nerede gerçekleşir?","Teknik geliştirme ve üretim yolları Türkiye merkezlidir; uluslararası iş birliği ve ticarileştirme platform ağı üzerinden geliştirilir."],
  ]:[
    ["What is PTP?","An independent international technology and collaboration platform connecting material challenges to development, validation and market pathways."],
    ["What is Canapa’s role?","Canapa Paper Technologies developed the initial portfolio and supports coating, application and industrial scale-up capability."],
    ["Who industrialises the technologies?","Technical development and industrialisation are coordinated through qualified technical and manufacturing capabilities in Türkiye."],
    ["How are IP and licensing managed?","Ownership, territory, manufacturing rights and technology-transfer terms are defined technology by technology within formal agreements."],
    ["What is the Cambridge role?","Cambridge describes access to science, collaboration, investment, licensing and internationalisation networks—not an unverified office or legal entity."],
    ["Where does activity happen?","Technical development and production pathways are centred in Türkiye; international collaboration and commercialisation are developed through the wider platform network."],
  ];
  return <section className="section governance governance-editorial"><div className="governance-intro"><p className="eyebrow">{tr?"Yönetişim ve platform yapısı":"Governance & platform structure"}</p><h2>{tr?"Net roller. Güvenilir ortaklıklar.":"Clear roles. Credible partnerships."}</h2><p>{tr?"Platformun nasıl çalıştığını adım adım inceleyin.":"Explore how the platform is structured and accountable."}</p><div className="platform-network" aria-label={tr?"Türkiye ile Cambridge ekosistemi arasındaki teknik ve ticari bağlantı":"Technical and commercial connection between Türkiye and the Cambridge ecosystem"}><span>{tr?"Türkiye · teknik geliştirme":"Türkiye · technical development"}</span><i aria-hidden="true"></i><b>PTP</b><i aria-hidden="true"></i><span>{tr?"Cambridge · küresel ağ":"Cambridge · global network"}</span></div></div><div className="governance-accordion">{items.map(([question,answer],i)=>{const open=openIndex===i;const buttonId=`governance-${locale}-button-${i}`;const panelId=`governance-${locale}-panel-${i}`;return <div className="governance-item" data-open={open?"true":"false"} key={question}><button id={buttonId} type="button" aria-expanded={open} aria-controls={panelId} onClick={()=>setOpenIndex(open?null:i)}><span>0{i+1}</span><h3>{question}</h3><i aria-hidden="true">+</i></button><div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}><p>{answer}</p></div></div>})}</div></section>;
}

export function IndustrialJourney({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  const stages=tr?[
    ["Develop",["Kâğıt ve altlık seçimi","Kaplama kimyası","Pilot üretim"]],
    ["Integrate",["Ters gravür deneyimi","Kurutma ve kürleme","Makine uyumu","Kalite kontrol"]],
    ["Scale",["Uygulama validasyonu","Endüstriyel ölçek büyütme","Üretim ve teknoloji transferi"]],
  ]:[
    ["Develop",["Paper and substrate selection","Coating chemistry","Pilot production"]],
    ["Integrate",["Reverse-gravure experience","Drying and curing","Machine compatibility","Quality control"]],
    ["Scale",["Application validation","Industrial scale-up","Production and technology transfer"]],
  ];
  return <section className="section industrial-journey"><div className="section-head"><p className="eyebrow">{tr?"Endüstriyel yolculuk":"Industrial journey"}</p><h2>{tr?"Geliştir. Entegre et. Ölçekle.":"Develop. Integrate. Scale."}</h2></div><ol>{stages.map(([stage,items],i)=><li key={stage as string}><span>0{i+1}</span><div className={`journey-visual journey-visual-${i+1}`} aria-hidden="true"><i></i><i></i><i></i></div><h3>{stage as string}</h3><ul>{(items as string[]).map(item=><li key={item}>{item}</li>)}</ul></li>)}</ol></section>;
}

export function HomeHeroCollage({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  const visual=homeVisuals.hero;
  return <figure className="hero-story" data-media-slot="home-hero-visual"><div className="home-hero-visual" role="img" aria-label={tr?visual.altTr:visual.altEn}><HomeManagedImage visual={visual} locale={locale} sizes="(max-width: 1050px) 100vw, 50vw" priority/><div className="home-hero-gradient" aria-hidden="true"></div><div className="home-hero-path" aria-hidden="true"><span>{tr?"Ar-Ge":"R&D"}</span><i></i><span>{tr?"Malzeme":"Material"}</span><i></i><span>{tr?"Endüstriyel ölçek":"Industrial scale"}</span></div></div><figcaption className="home-hero-disclosure">{tr?`${visual.sourceLabelTr} · ${visual.sourceNoteTr}`:`${visual.sourceLabelEn} · ${visual.sourceNoteEn}`}</figcaption><span className="home-scroll-signal" aria-hidden="true">{tr?"Dönüşümü keşfedin":"Explore the transition"}<i></i></span></figure>;
}

export function HomeTechnologyQuick({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  const cards=[
    {slug:"dtpaper",name:"DTPaper®",visual:homeVisuals.dtpaper,copy:tr?"DTF tekstil baskısındaki PET transfer filminin yerine kâğıt bazlı bir sistem.":"Replacing PET transfer film in DTF textile printing.",stage:tr?"Pilot / endüstriyel geliştirme":technologyDetails.dtpaper.maturity},
    {slug:"ceralith",name:"Ceralith™",visual:homeVisuals.ceralith,copy:tr?"PET film olmadan fırınlanabilir lif bazlı yapıların geliştirilmesi.":"Enabling ovenable fibre structures without PET film.",stage:tr?"Pilot / uygulama geliştirme":technologyDetails.ceralith.maturity},
    {slug:"bioma-orx",name:"Bioma-ORX®",visual:homeVisuals.biomaOrx,copy:tr?"Kâğıt ve karton için ayarlanabilir, PFAS içermeyen bariyer sistemleri.":"Adjustable PFAS-free barrier systems for paper and board.",stage:tr?"Pilot / endüstriyel uygulama geliştirme":technologyDetails["bioma-orx"].maturity},
  ];
  return <section className="section home-technologies" id={tr?"teknolojiler":"technologies"}><div className="home-section-heading"><p className="eyebrow">{tr?"Teknoloji portföyü":"Technology portfolio"}</p><h2>{tr?"Üç teknoloji. Üç plastikten kâğıda dönüşüm yolu.":"Three technologies. Three plastic-to-paper pathways."}</h2></div><div className="home-tech-grid">{cards.map((card,i)=><article className={`home-tech-card home-tech-${card.slug}`} key={card.slug}><div className="home-tech-media"><HomeManagedImage visual={card.visual} locale={locale} sizes="(max-width: 700px) 100vw, 34vw"/><small className="home-source-tag">{tr?card.visual.sourceLabelTr:card.visual.sourceLabelEn}</small></div><div className="home-tech-copy"><span>0{i+1}</span><h3>{card.name}</h3><p>{card.copy}</p><dl><dt>{tr?"Geliştirme aşaması":"Development stage"}</dt><dd>{card.stage}</dd></dl><a className="arrow-link" href={`/${locale}/technologies/${card.slug}`}>{tr?"Teknolojiyi incele":"Explore technology"} <b aria-hidden="true">↗</b></a></div></article>)}</div><p className="home-context-note">{tr?"DTPaper ve Bioma-ORX görselleri Canapa tarafından sağlanan gerçek uygulama/test fotoğraflarıdır. Ceralith görseli, gerçek ürün fotoğrafı sağlanana kadar açıkça temsili olarak sunulur.":"DTPaper and Bioma-ORX use authentic application/test photographs supplied by Canapa. Ceralith remains clearly representative until suitable authentic product photography is supplied."}</p></section>;
}

export function HomeDemonstrationLinks({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  const links=[
    {name:"DTPaper®",slug:"dtpaper"},
    {name:"Ceralith™",slug:"ceralith"},
    {name:"Bioma-ORX®",slug:"bioma-orx"},
  ];
  return <section className="section home-demonstrations" aria-labelledby={`home-demonstrations-${locale}`}><div className="home-demo-mark" aria-hidden="true"><span>▶</span><i></i></div><div className="home-demo-copy"><p className="eyebrow">{tr?"Kaydedilmiş demonstrasyonlar":"Recorded demonstrations"}</p><h2 id={`home-demonstrations-${locale}`}>{tr?"Gerçek prosesler. Kaydedilmiş uygulama bağlamı.":"Real processes. Recorded application context."}</h2><p>{tr?"DTPaper®, Ceralith™ ve Bioma-ORX® demonstrasyonlarını kendi teknoloji sayfalarında inceleyin.":"Watch DTPaper®, Ceralith™ and Bioma-ORX® within their individual technology pages."}</p></div><nav className="home-demo-links" aria-label={tr?"Teknoloji demonstrasyonları":"Technology demonstrations"}>{links.map(link=><a key={link.slug} href={`/${locale}/technologies/${link.slug}#recorded-demonstration`} aria-label={tr?`${link.name} kaydedilmiş demonstrasyonuna git`:`Go to the ${link.name} recorded demonstration`}><span>{link.name}</span><b aria-hidden="true">↗</b></a>)}</nav><a className="home-demo-cta" href={`/${locale}/technologies/dtpaper#recorded-demonstration`}>{tr?"Demonstrasyonları İncele":"View demonstrations"} <span aria-hidden="true">→</span></a></section>;
}

export function HomeLabToScale({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  const steps=tr?[
    {title:"Malzeme problemi",visual:homeVisuals.materialChallenge},
    {title:"Kimya ve altlık",visual:homeVisuals.chemistrySubstrate},
    {title:"Kaplama ve uygulama",visual:homeVisuals.coatingApplication},
    {title:"Validasyon",visual:homeVisuals.validation},
    {title:"Endüstriyel ölçek",visual:homeVisuals.industrialScale},
  ]:[
    {title:"Material challenge",visual:homeVisuals.materialChallenge},
    {title:"Chemistry and substrate",visual:homeVisuals.chemistrySubstrate},
    {title:"Coating and application",visual:homeVisuals.coatingApplication},
    {title:"Validation",visual:homeVisuals.validation},
    {title:"Industrial scale",visual:homeVisuals.industrialScale},
  ];
  return <section className="section home-lab-scale"><div className="home-section-heading"><p className="eyebrow">{tr?"Laboratuvardan ölçeğe":"From lab to industrial scale"}</p><h2>{tr?"Laboratuvar kimyasından endüstriyel gerçekliğe.":"From laboratory chemistry to industrial reality."}</h2><p>{tr?"Beş bağlantılı karar, tek izlenebilir geliştirme yolu.":"Five connected decisions form one traceable development pathway."}</p></div><ol className="lab-scale-strip">{steps.map((step,i)=><li className={`lab-stage-${i+1}`} key={step.title}><figure><HomeManagedImage visual={step.visual} locale={locale} sizes="(max-width: 700px) calc(100vw - 44px), 20vw"/></figure><span>{String(i+1).padStart(2,"0")}</span><h3>{step.title}</h3></li>)}</ol><p className="home-context-note">{tr?homeVisuals.materialChallenge.sourceNoteTr:homeVisuals.materialChallenge.sourceNoteEn}</p></section>;
}

export function HomeIntegration({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";const nodes=tr?["Kimya","Kâğıt mühendisliği","Kaplama","Validasyon","Ölçek"]:["Chemistry","Paper engineering","Coating","Validation","Scale"];
  const visual=homeVisuals.integration;
  return <section className="section home-integration"><div className="home-integration-media"><HomeManagedImage visual={visual} locale={locale} sizes="(max-width: 900px) 100vw, 48vw"/></div><div className="home-integration-copy"><p className="eyebrow">{tr?"PTP'nin farkı":"The PTP difference"}</p><h2>{tr?"Teknoloji, entegrasyonun kendisidir.":"Integration is the technology."}</h2><p>{tr?"Kimya, kâğıt mühendisliği, kaplama, validasyon ve ölçek tek bir geliştirme sistemi içinde birlikte çalışır.":"Chemistry, paper engineering, coating, validation and scale work together in one development system."}</p><div className="home-system" aria-label={tr?"PTP'nin beş bağlantılı teknik alanı":"Five connected technical fields in PTP"}><b>PTP</b>{nodes.map((node,i)=><span key={node} style={{"--node":i} as React.CSSProperties}>{node}</span>)}</div><p className="home-integration-note">{tr?visual.sourceNoteTr:visual.sourceNoteEn}</p><a className="arrow-link" href={`/${locale}/platform`}>{tr?"Platformu İncele":"Explore the Platform"} <b aria-hidden="true">↗</b></a></div></section>;
}

export function HomeGlobalConnection({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  const left=tr?["Ar-Ge","Kaplama","Pilot uygulama","Endüstriyel ölçeklendirme"]:["R&D","Coating","Pilot application","Industrial scale-up"];
  const right=tr?["Bilimsel ağ","Küresel ortaklıklar","Lisanslama","Pazara erişim"]:["Scientific network","Global partnerships","Licensing","Market access"];
  return <section className="section home-global"><div className="home-section-heading"><p className="eyebrow">{tr?"Küresel bağlantı":"Global connection"}</p><h2>{tr?"Türkiye’de geliştiriliyor ve endüstriyel ölçeğe taşınıyor. Cambridge üzerinden dünyaya bağlanıyor.":"Developed and industrialised in Türkiye. Connected globally through Cambridge."}</h2></div><div className="home-global-grid"><article><span>TR</span><h3>Türkiye</h3><ul>{left.map(item=><li key={item}>{item}</li>)}</ul></article><div className="home-global-signal" aria-hidden="true"><i></i><b>PTP</b><i></i></div><article><span>CB</span><h3>Cambridge</h3><ul>{right.map(item=><li key={item}>{item}</li>)}</ul></article></div><p className="home-context-note">{tr?"Cambridge, doğrulanmamış bir ofis veya tüzel kişilik iddiası değil; bilim, iş birliği, lisanslama ve uluslararasılaşma bağlantısını tanımlar.":"Cambridge describes a science, collaboration, licensing and internationalisation connection—not an unverified office or legal entity."}</p></section>;
}

export function HomeRecognition({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  const visual=homeVisuals.recognition;
  return <section className="section home-recognition"><div><p className="eyebrow">{tr?"Doğrulanmış takdir":"Verified recognition"}</p><h2>{tr?"Canapa · Sürdürülebilirlik kazananı, 2025.":"Canapa · Winner of Sustainability, 2025."}</h2><p>{tr?"Bu ödül Canapa'ya aittir. Canapa, PTP'nin başlangıç teknoloji portföyünü geliştirmiş ve platformun teknik kabiliyetini desteklemektedir; ödül doğrudan PTP ödülü değildir.":"This award belongs to Canapa. Canapa developed PTP's initial technology portfolio and supports its technical capability; it is not a direct PTP award."}</p><dl><div><dt>{tr?"Organizasyon":"Organisation"}</dt><dd>WTiN Innovate Textile Awards</dd></div><div><dt>{tr?"Kategori":"Category"}</dt><dd>{tr?"Sürdürülebilirlik kazananı":"Winner of Sustainability"}</dd></div><div><dt>{tr?"Tarih":"Date"}</dt><dd><time dateTime="2025-12-05">{tr?"5 Aralık 2025":"5 December 2025"}</time></dd></div></dl></div><figure><div className="home-recognition-image"><HomeManagedImage visual={visual} locale={locale} sizes="(max-width: 700px) 100vw, 36vw"/></div><figcaption>{tr?`${visual.sourceLabelTr} · Canapa sertifikası`:`${visual.sourceLabelEn} · Canapa certificate`}</figcaption></figure></section>;
}

export function HomeFinalCTA({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  return <section className="final-cta home-final-cta"><p className="eyebrow">{tr?"Dönüşümü başlatın":"Start the transition"}</p><h2>{tr?"Hangi plastiği veya zararlı kimyayı değiştirmek istiyorsunuz?":"What plastic or harmful chemistry would you replace?"}</h2><p>{tr?"Uygulamayı, performans beklentisini ve endüstriyel bağlamı paylaşın. Geliştirme yolunu birlikte tanımlayalım.":"Bring us the application, performance requirement and industrial context. We will help define the development pathway."}</p><div className="home-final-actions"><a className="button primary" href={`/${locale}/contact`}>{tr?"Proje Başlat":"Start a Project"} <span aria-hidden="true">→</span></a><a className="button secondary" href={`/${locale}/technologies`}>{tr?"Teknolojileri İncele":"Explore Technologies"} <span aria-hidden="true">↗</span></a></div></section>;
}

export function IndustrialPhotoStory({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  return <section className="section industrial-photo-story"><figure><Image src="/story/canapa-innovation-center.webp" alt={tr?"Canapa Innovation Center laboratuvarında numune hazırlayan laboratuvar uzmanı":"Laboratory specialist preparing a sample in the Canapa Innovation Center"} width={3120} height={1755} sizes="(max-width: 900px) 100vw, 64vw"/><figcaption>{tr?"Canapa Innovation Center — Ar-Ge ve uygulama geliştirme ortamı.":"Canapa Innovation Center — R&D and application development environment."}</figcaption></figure><div><p className="eyebrow">{tr?"Formülasyondan ölçeğe":"From formulation to scale"}</p><h2>{tr?"Formülasyon ve malzeme testlerinden kaplama, doğrulama ve endüstriyel ölçek büyütmeye.":"From formulation and material testing to coating, validation and industrial scale-up."}</h2><p>{tr?"Fotoğraf laboratuvar ortamını belgeler. Yalnızca açıkça görülen çalışma bağlamını temsil eder; cihaz veya performans iddiası oluşturmaz.":"The photograph documents the laboratory environment. It represents only the visible working context and does not add unverified equipment or performance claims."}</p></div></section>;
}

type StorySlug="dtpaper"|"ceralith"|"bioma-orx";
type StoryItem={src:string;mobileSrc?:string;titleEn:string;titleTr:string;altEn:string;altTr:string;kindEn:string;kindTr:string;noteEn:string;noteTr:string};

const productStories:Record<StorySlug,{eyebrowEn:string;eyebrowTr:string;headingEn:string;headingTr:string;noteEn:string;noteTr:string;items:StoryItem[]}>= {
  dtpaper:{
    eyebrowEn:"DTPaper® process sequence",eyebrowTr:"DTPaper® süreç sırası",headingEn:"Four process stages, visualised in sequence.",headingTr:"Sırayla görselleştirilen dört proses aşaması.",
    noteEn:"Frames 01–04 are representative process visualisations created to explain the DTPaper® workflow. They are not published as standalone performance or equipment evidence. The final textile image is also a representative end-result visualisation.",noteTr:"01–04 numaralı kareler DTPaper® iş akışını açıklamak için oluşturulmuş temsili proses görselleştirmeleridir. Tek başına performans veya ekipman kanıtı olarak yayımlanmazlar. Nihai tekstil görseli de temsili sonuç görselleştirmesidir.",
    items:[
      {src:"/story/dtpaper-process-print-v3.webp",mobileSrc:"/story/dtpaper-process-print-mobile-v3.webp",titleEn:"Print",titleTr:"Baskı",altEn:"Representative DTPaper printing stage with translucent carrier and opaque white backing ink",altTr:"Şeffaf taşıyıcı ve opak beyaz alt baskıyı gösteren temsili DTPaper baskı aşaması",kindEn:"Representative process visualisation",kindTr:"Temsili proses görselleştirmesi",noteEn:"The colour layer is shown covered by the opaque white backing mask on the working side.",noteTr:"Çalışma yüzünde renk katmanının opak beyaz alt baskı maskesiyle kaplanması gösterilir."},
      {src:"/story/dtpaper-process-powder-v3.webp",mobileSrc:"/story/dtpaper-process-powder-mobile-v3.webp",titleEn:"Powder",titleTr:"Toz uygulama",altEn:"Representative DTPaper hot-melt powder application over wet white ink",altTr:"Islak beyaz mürekkep üzerine hot-melt toz uygulamasını gösteren temsili DTPaper görseli",kindEn:"Representative process visualisation",kindTr:"Temsili proses görselleştirmesi",noteEn:"Powder application is visualised as process context; settings and consumables require workflow validation.",noteTr:"Toz uygulaması proses bağlamı olarak görselleştirilmiştir; ayarlar ve sarf malzemeleri iş akışında doğrulanmalıdır."},
      {src:"/story/dtpaper-process-cure-v3.webp",mobileSrc:"/story/dtpaper-process-cure-mobile-v3.webp",titleEn:"Curing",titleTr:"Kürleme",altEn:"Representative DTPaper curing stage on an industrial conveyor",altTr:"Endüstriyel konveyörde temsili DTPaper kürleme aşaması",kindEn:"Representative process visualisation",kindTr:"Temsili proses görselleştirmesi",noteEn:"The printed and powdered transfer structure is visualised during curing.",noteTr:"Baskılı ve tozlanmış transfer yapısı kürleme sırasında görselleştirilir."},
      {src:"/story/dtpaper-process-transfer-v3.webp",mobileSrc:"/story/dtpaper-process-transfer-mobile-v3.webp",titleEn:"Transfer",titleTr:"Transfer",altEn:"Representative DTPaper transfer onto dark textile with vivid opaque colour",altTr:"Koyu tekstil üzerinde canlı ve örtücü baskıyı gösteren temsili DTPaper transferi",kindEn:"Representative process visualisation",kindTr:"Temsili proses görselleştirmesi",noteEn:"The finished transfer is shown with the carrier being removed from the textile.",noteTr:"Nihai transfer, taşıyıcının tekstilden ayrılması sırasında gösterilir."},
      {src:"/story/dtpaper-step-textile-v2.webp",titleEn:"Final textile",titleTr:"Nihai tekstil",altEn:"Representative visualisation of a Canapa-branded textile after transfer",altTr:"Transfer sonrası Canapa markalı tekstilin temsili görselleştirmesi",kindEn:"Representative outcome visualisation",kindTr:"Temsili sonuç görselleştirmesi",noteEn:"Illustrative end-result context; final output depends on the complete validated workflow.",noteTr:"Açıklayıcı sonuç bağlamı; nihai çıktı doğrulanmış iş akışının tamamına bağlıdır."},
    ]
  },
  ceralith:{
    eyebrowEn:"Ceralith™ Application Gallery",eyebrowTr:"Ceralith™ Uygulama Galerisi",headingEn:"Application contexts—not universal performance proof.",headingTr:"Uygulama bağlamları — evrensel performans kanıtı değil.",
    noteEn:"Representative application context. Final performance depends on substrate, coating structure, converting conditions and validation.",noteTr:"Temsili uygulama bağlamı. Nihai performans; altlık, kaplama yapısı, dönüştürme koşulları ve validasyona bağlıdır.",
    items:[
      {src:"/story/ceralith-ovenable-tray-v3.webp",titleEn:"Ovenable fibre trays",titleTr:"Fırınlanabilir lif tepsiler",altEn:"Unbranded fibre tray with bread rolls inside an oven",altTr:"Fırında ekmek bulunan markasız lif tepsi",kindEn:"Representative application",kindTr:"Temsili uygulama",noteEn:"Target application category",noteTr:"Hedef uygulama kategorisi"},
      {src:"/story/ceralith-bakery-application-v1.webp",titleEn:"Bakery applications",titleTr:"Fırıncılık uygulamaları",altEn:"Fibre-based bakery tray surrounded by breads in a bakery setting",altTr:"Fırın ortamında ekmeklerle çevrili lif bazlı fırıncılık tepsisi",kindEn:"Representative application",kindTr:"Temsili uygulama",noteEn:"Target application category",noteTr:"Hedef uygulama kategorisi"},
      {src:"/story/ceralith-frozen-food-packaging-v1.webp",titleEn:"Frozen food packaging",titleTr:"Dondurulmuş gıda ambalajları",altEn:"Frozen pastry product in a fibre-based retail package",altTr:"Lif bazlı perakende ambalajında dondurulmuş börek ürünü",kindEn:"Representative application",kindTr:"Temsili uygulama",noteEn:"Target application category",noteTr:"Hedef uygulama kategorisi"},
      {src:"/story/ceralith-paper-cup-coating-v1.webp",titleEn:"Cupboard coatings",titleTr:"Karton bardak kaplamaları",altEn:"Plain paper coffee cup representing a coated paperboard application",altTr:"Kaplamalı karton uygulamasını temsil eden sade kâğıt kahve bardağı",kindEn:"Representative application",kindTr:"Temsili uygulama",noteEn:"Target application category",noteTr:"Hedef uygulama kategorisi"},
    ]
  },
  "bioma-orx":{
    eyebrowEn:"Bioma-ORX® application field",eyebrowTr:"Bioma-ORX® uygulama alanı",headingEn:"Seven target packaging formats.",headingTr:"Yedi hedef ambalaj formatı.",
    noteEn:"These seven photographs are original, unbranded representative application visualisations. They show target categories only and do not demonstrate barrier performance.",noteTr:"Bu yedi fotoğraf özgün, markasız temsili uygulama görselleştirmesidir. Yalnızca hedef kategorileri gösterir ve bariyer performansını kanıtlamaz.",
    items:[
      {src:"/story/bioma-pizza-box-application.webp",titleEn:"Pizza and bakery boxes",titleTr:"Pizza ve fırıncılık kutuları",altEn:"Pizza in an unbranded corrugated fibre-based service box",altTr:"Markasız oluklu lif bazlı servis kutusunda pizza",kindEn:"Representative application",kindTr:"Temsili uygulama",noteEn:"Target application category",noteTr:"Hedef uygulama kategorisi"},
      {src:"/story/bioma-fast-food-wrap-v3.webp",titleEn:"Fast-food wrapping",titleTr:"Hızlı servis gıda sarımı",altEn:"Unbranded kraft paper wrap around a sandwich",altTr:"Sandviç çevresinde markasız kraft kâğıt sarım",kindEn:"Representative application",kindTr:"Temsili uygulama",noteEn:"Target application category",noteTr:"Hedef uygulama kategorisi"},
      {src:"/story/bioma-fried-food-v3.webp",titleEn:"Fried food packaging",titleTr:"Kızartılmış gıda ambalajı",altEn:"Fried food in an unbranded kraft paper pouch",altTr:"Markasız kraft kâğıt poşette kızartılmış gıda",kindEn:"Representative application",kindTr:"Temsili uygulama",noteEn:"Target application category",noteTr:"Hedef uygulama kategorisi"},
      {src:"/story/bioma-bakery-bag-v3.webp",titleEn:"Bakery bags",titleTr:"Fırıncılık poşetleri",altEn:"Bread in an unbranded natural kraft bakery bag",altTr:"Markasız doğal kraft kâğıt sarım",kindEn:"Representative application",kindTr:"Temsili uygulama",noteEn:"Target application category",noteTr:"Hedef uygulama kategorisi"},
      {src:"/story/bioma-snack-pack-v3.webp",titleEn:"Popcorn and snacks",titleTr:"Patlamış mısır ve atıştırmalık",altEn:"Popcorn in an unbranded kraft paper pouch",altTr:"Markasız kraft kâğıt poşette patlamış mısır",kindEn:"Representative application",kindTr:"Temsili uygulama",noteEn:"Target application category",noteTr:"Hedef uygulama kategorisi"},
      {src:"/story/bioma-butter-wrap-v3.webp",titleEn:"Butter and fatty-food wrapping",titleTr:"Tereyağı ve yağlı gıda sarımı",altEn:"Butter wrapped in plain warm-white fibre paper",altTr:"Düz sıcak beyaz lif kâğıda sarılmış tereyağı",kindEn:"Representative application",kindTr:"Temsili uygulama",noteEn:"Target application category",noteTr:"Hedef uygulama kategorisi"},
      {src:"/story/bioma-fibre-takeaway-v3.webp",titleEn:"Fibre takeaway containers",titleTr:"Lif bazlı paket servis kapları",altEn:"Prepared food in an unbranded moulded-fibre takeaway container",altTr:"Markasız kalıplanmış lif paket servis kabında hazır gıda",kindEn:"Representative application",kindTr:"Temsili uygulama",noteEn:"Target application category",noteTr:"Hedef uygulama kategorisi"},
    ]
  }
};

export function ProductStoryGallery({technology,locale="en"}:{technology:StorySlug;locale?:"en"|"tr"}) {
  const tr=locale==="tr";const story=productStories[technology];const trackRef=useRef<HTMLDivElement>(null);
  const move=(direction:number)=>{const track=trackRef.current;if(!track)return;const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;track.scrollBy({left:direction*Math.max(300,track.clientWidth*.72),behavior:reduced?"auto":"smooth"});};
  const visual=(item:StoryItem)=><div className="story-image">{item.mobileSrc?<picture><source media="(max-width: 700px)" srcSet={item.mobileSrc}/><img src={item.src} alt={tr?item.altTr:item.altEn} width="720" height="540" loading="lazy" decoding="async"/></picture>:<Image src={item.src} alt={tr?item.altTr:item.altEn} fill sizes="(max-width: 700px) calc(100vw - 44px), 34vw" quality={84} loading="lazy"/>}</div>;
  const figure=(item:StoryItem,i:number)=><figure className={item.mobileSrc?"story-recorded":undefined} key={item.src}>{visual(item)}<figcaption><span className="story-index">{String(i+1).padStart(2,"0")}</span><span className="story-kind">{tr?item.kindTr:item.kindEn}</span><h3>{tr?item.titleTr:item.titleEn}</h3><p>{tr?item.noteTr:item.noteEn}</p></figcaption></figure>;
  if(technology==="dtpaper"){
    const processItems=story.items.slice(0,4);const outcome=story.items[4];
    return <section className="section product-story product-story-dtpaper"><div className="story-heading"><div><p className="eyebrow">{tr?story.eyebrowTr:story.eyebrowEn}</p><h2>{tr?story.headingTr:story.headingEn}</h2></div><a className="story-video-link" href="#recorded-demonstration">{tr?"Kaydedilmiş iş akışının tamamını izleyin":"Watch full recorded workflow"} <span aria-hidden="true">↓</span></a></div><ol className="dtpaper-process-timeline" aria-label={tr?"Dört aşamalı DTPaper iş akışı":"Four-stage DTPaper workflow"}>{processItems.map((item,i)=><li key={item.src}>{figure(item,i)}</li>)}</ol><div className="dtpaper-outcome">{figure(outcome,4)}</div><p className="story-disclaimer">{tr?story.noteTr:story.noteEn}</p></section>;
  }
  return <section className={`section product-story product-story-${technology}`}><div className="story-heading"><div><p className="eyebrow">{tr?story.eyebrowTr:story.eyebrowEn}</p><h2>{tr?story.headingTr:story.headingEn}</h2></div><div className="story-controls"><button type="button" onClick={()=>move(-1)} aria-label={tr?"Galeride geriye git":"Scroll gallery backward"}>←</button><button type="button" onClick={()=>move(1)} aria-label={tr?"Galeride ileri git":"Scroll gallery forward"}>→</button></div></div><div ref={trackRef} className="story-track" role="region" aria-label={tr?story.eyebrowTr:story.eyebrowEn}>{story.items.map(figure)}</div><p className="story-disclaimer">{tr?story.noteTr:story.noteEn}</p></section>;
}

export function PlatformStoryCollage({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";const items=[
    {src:"/story/platform-application-lab.webp",alt:tr?"Canapa uygulama laboratuvarında baskı ekipmanı yanında çalışan teknik uzman":"Technical specialist working beside printing equipment in a Canapa application laboratory",label:tr?"Uygulama laboratuvarı":"Application laboratory"},
    {src:"/story/platform-material-test.webp",alt:tr?"Kontrollü laboratuvar düzeneğinde malzeme numunesi":"Material sample in a controlled laboratory setup",label:tr?"Malzeme incelemesi":"Material evaluation"},
    {src:"/story/platform-data-review.webp",alt:tr?"Laboratuvar ölçüm ekranında veri inceleme bağlamı":"Data review context on a laboratory measurement screen",label:tr?"Veri değerlendirmesi":"Data review"},
  ];return <section className="section platform-story"><div className="platform-story-copy"><p className="eyebrow">{tr?"İnsan + teknoloji + sistem":"People + technology + system"}</p><h2>{tr?"Bilimsel çalışma, uygulama ve değerlendirme aynı geliştirme yolunda.":"Scientific work, application and evaluation in one development pathway."}</h2><p>{tr?"Canapa Ar-Ge ortamında uygulama, malzeme değerlendirmesi ve veri inceleme çalışmalarını gösteren fotoğraflar. Görsel olarak belgelenmeyen cihaz kabiliyeti veya test sonucu ima edilmemektedir.":"Canapa R&D photography showing application, material evaluation and data-review context. No equipment capability or test result is implied beyond what is visibly documented."}</p></div><div className="platform-collage">{items.map((item,i)=><figure key={item.src} className={`platform-collage-${i+1}`}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 800px) 90vw, 40vw" loading="lazy"/><figcaption><span>0{i+1}</span>{item.label}</figcaption></figure>)}</div></section>;
}

export function PlatformHero({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  return <section className="page-hero platform-hero"><div className="platform-hero-copy"><p className="eyebrow light">{tr?"Platform":"The platform"}</p><h1>{tr?"Teknoloji, entegrasyonun kendisidir.":"Integration is the technology."}</h1><p>{tr?"PTP, ölçeklenebilir lif bazlı teknolojiler geliştirmek ve bunların dünya çapında endüstriyel benimsenmesini hızlandırmak için oluşturulmuş bağımsız bir uluslararası platformdur.":"PTP is an independent international platform created to develop scalable fibre-based technologies and accelerate their industrial adoption globally."}</p></div><div className="platform-hero-visual" aria-hidden="true"><div className="platform-hero-texture"></div><i className="platform-hero-layer layer-chemistry"><span>{tr?"KİMYA":"CHEMISTRY"}</span></i><i className="platform-hero-layer layer-paper"><span>{tr?"KÂĞIT":"PAPER"}</span></i><i className="platform-hero-layer layer-coating"><span>{tr?"KAPLAMA":"COATING"}</span></i><i className="platform-hero-layer layer-validation"><span>{tr?"VALIDASYON":"VALIDATION"}</span></i><i className="platform-hero-layer layer-scale"><span>{tr?"ÖLÇEK":"SCALE"}</span></i></div></section>;
}

export function PlatformFragmentation({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  const disciplines=tr?["Kimya","Kâğıt bilimi","Kaplama","Dönüştürme","Validasyon","Ticari gereksinimler"]:["Chemistry","Paper science","Coating","Converting","Validation","Commercial requirements"];
  return <section className="section platform-fragmentation"><div className="platform-section-copy"><p className="eyebrow">{tr?"Problem":"The problem"}</p><h2>{tr?"Malzeme inovasyonu parçalı ilerliyor.":"Material innovation is fragmented."}</h2><p>{tr?"Kimya, kâğıt bilimi, kaplama, dönüştürme, uygulama testleri ve ticari gereksinimler çoğu zaman birbirinden bağımsız geliştiriliyor.":"Chemistry, paper science, coating, converting, application testing and commercial requirements are often developed in isolation."}</p></div><div className="fragment-map" aria-label={tr?"Altı disiplinin PTP içinde tek sisteme bağlanması":"Six disciplines connected into one PTP system"}>{disciplines.map((discipline,i)=><article className={`fragment-node fragment-node-${i+1}`} key={discipline}><span>0{i+1}</span><div className="fragment-sample" aria-hidden="true"><i></i><i></i><i></i></div><h3>{discipline}</h3></article>)}<div className="fragment-core"><b>PTP</b><span>{tr?"TEK SİSTEM":"ONE SYSTEM"}</span></div></div></section>;
}

export function PlatformSystem({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  const nodes=tr?["Malzeme problemi","Bilimsel geliştirme","Uygulama mühendisliği","Endüstriyel entegrasyon","Pazar yolu"]:["Material challenge","Scientific development","Application engineering","Industrial integration","Market pathway"];
  return <section className="section platform-system"><div className="section-head platform-system-head"><p className="eyebrow">{tr?"Platform yanıtı":"The platform response"}</p><h2>{tr?"Bütün sistemi kurun.":"Build the complete system."}</h2><p>{tr?"PTP teknik disiplinleri tanımlanmış bir uygulama etrafında birleştirir; sistemi validasyon, ölçeklendirme ve pazar yollarına kadar taşır.":"PTP joins technical disciplines around a defined application, then carries the system through validation, scale-up and market pathways."}</p></div><div className="system-map" aria-label={tr?"Merkezinde PTP bulunan bütünleşik geliştirme sistemi":"Integrated development system with PTP at its centre"}>{nodes.map((node,i)=><article className={`system-node system-node-${i+1}`} key={node}><span>0{i+1}</span><div className="system-swatch" aria-hidden="true"></div><h3>{node}</h3></article>)}<div className="system-core"><b>PTP</b><span>{tr?"ENTEGRASYON":"INTEGRATION"}</span></div></div></section>;
}

export function PlatformPeople({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  return <section className="section platform-people"><figure><Image src="/story/platform-people-collaboration-v2.webp" alt={tr?"İki teknik uzmanın kâğıt ve kaplı lif numunelerini birlikte incelemesini gösteren temsili görsel":"Representative image of two technical specialists jointly reviewing paper and coated-fibre samples"} width={1600} height={900} sizes="(max-width: 900px) 100vw, 58vw" loading="lazy"/><figcaption><span>{tr?"Temsili görsel":"Representative image"}</span>{tr?"Yapay zekâ ile oluşturulmuştur; belirli bir PTP projesinin, testinin, tesisinin veya sonucunun kanıtı değildir.":"AI-generated; not evidence of a specific PTP project, test, facility or result."}</figcaption></figure><div><p className="eyebrow">{tr?"İnsanlar ve iş birliği":"People and collaboration"}</p><h2>{tr?"Birbirine bağlı disiplinlerle geliştiriliyor.":"Built by connected disciplines."}</h2><p>{tr?"PTP; malzeme bilimini, kâğıt mühendisliğini, kaplamayı, uygulama geliştirmeyi, endüstriyel üretimi ve küresel ticari yolları ortak bir malzeme problemi etrafında bir araya getirir.":"PTP brings together material science, paper engineering, coating, application development, industrial production and global commercial pathways around a shared material challenge."}</p></div></section>;
}

export function PlatformPhases({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  const phases=tr?[
    {key:"discover",label:"KEŞFET",title:"Problemi bilimsel olarak çerçevele.",items:["Malzeme problemi","Araştırma ve teknik çerçeve","Kimya ve formülasyon"]},
    {key:"develop",label:"GELİŞTİR",title:"Yapıyı uygulamaya dönüştür.",items:["Kâğıt ve altlık mühendisliği","Kaplama ve proses entegrasyonu","Uygulama geliştirme"]},
    {key:"scale",label:"ÖLÇEKLENDİR",title:"Kanıtı endüstriyel yola taşı.",items:["Test ve validasyon","Endüstriyel ölçeklendirme","Lisanslama ve pazara geçiş"]},
  ]:[
    {key:"discover",label:"DISCOVER",title:"Frame the problem scientifically.",items:["Material challenge","Research and technical framing","Chemistry and formulation"]},
    {key:"develop",label:"DEVELOP",title:"Turn the structure into an application.",items:["Paper and substrate engineering","Coating and process integration","Application development"]},
    {key:"scale",label:"SCALE",title:"Carry evidence into an industrial pathway.",items:["Testing and validation","Industrial scale-up","Licensing and market pathway"]},
  ];let index=0;
  return <section className="section platform-phases"><div className="section-head"><p className="eyebrow">{tr?"Bağlantılı geliştirme sistemi":"Connected development system"}</p><h2>{tr?"Dokuz aşama. Tek hesap verebilir yol.":"Nine stages. One accountable pathway."}</h2><p>{tr?"Her faz bir sonraki teknik ve ticari karara izlenebilir bir temel hazırlar.":"Each phase builds a traceable basis for the next technical and commercial decision."}</p></div><div className="phase-grid">{phases.map(phase=><article className={`phase phase-${phase.key}`} key={phase.key}><div className="phase-visual" aria-hidden="true"><i></i><i></i><i></i></div><span>{phase.label}</span><h3>{phase.title}</h3><ol>{phase.items.map(item=>{index+=1;return <li key={item}><b>{String(index).padStart(2,"0")}</b>{item}</li>})}</ol></article>)}</div></section>;
}

export function MaterialOutcomes({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";const trackRef=useRef<HTMLDivElement>(null);
  const items=tr?[
    {src:"/story/dtpaper-process-print-v3.webp",title:"Baskılı transfer medyası",kind:"Temsili proses görselleştirmesi",alt:"Şeffaf taşıyıcı ve opak beyaz baskılı transfer medyası"},
    {src:"/story/bioma-butter-wrap-v3.webp",title:"Yağ bariyerli sarım bağlamı",kind:"Temsili yapı",alt:"Markasız temsili lif bazlı sarım yapısı"},
    {src:"/story/ceralith-ovenable-tray-v3.webp",title:"Fırınlanabilir lif yapısı",kind:"Uygulama bağlamı",alt:"Markasız fırınlanabilir lif tepsi uygulama bağlamı"},
    {src:"/story/dtpaper-process-cure-v3.webp",title:"Kaplı proses yüzeyi",kind:"Temsili proses görselleştirmesi",alt:"Kürleme aşamasındaki baskılı transfer yüzeyi"},
    {src:"/story/bioma-fast-food-wrap-v3.webp",title:"Lif bazlı ambalaj kâğıdı",kind:"Temsili yapı",alt:"Markasız temsili lif bazlı gıda sarımı"},
    {src:"/story/bioma-butter-coated-paper-sample.webp",title:"Kaplanmış kâğıt uygulaması",kind:"Malzeme numunesi",alt:"Kaplanmış kâğıt uygulamasını temsil eden patlamış mısır ambalajları"},
  ]:[
    {src:"/story/dtpaper-process-print-v3.webp",title:"Printed transfer media",kind:"Representative process visualisation",alt:"Translucent transfer carrier with opaque white printed backing"},
    {src:"/story/bioma-butter-wrap-v3.webp",title:"Oil-barrier wrapping context",kind:"Representative structure",alt:"Unbranded representative fibre-based wrapping structure"},
    {src:"/story/ceralith-ovenable-tray-v3.webp",title:"Ovenable fibre structure",kind:"Application context",alt:"Unbranded ovenable fibre tray application context"},
    {src:"/story/dtpaper-process-cure-v3.webp",title:"Coated process surface",kind:"Representative process visualisation",alt:"Printed transfer surface during the curing stage"},
    {src:"/story/bioma-fast-food-wrap-v3.webp",title:"Fibre-based packaging paper",kind:"Representative structure",alt:"Unbranded representative fibre-based food wrapping"},
    {src:"/story/bioma-butter-coated-paper-sample.webp",title:"Coated paper application",kind:"Material sample",alt:"Popcorn packs as representative coated-paper application context"},
  ];
  const move=(direction:number)=>{const track=trackRef.current;if(!track)return;const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;track.scrollBy({left:direction*Math.max(280,track.clientWidth*.7),behavior:reduced?"auto":"smooth"});};
  // The scrollable region is deliberately focusable so keyboard users can pan it directly in addition to using the labelled controls.
  // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
  return <section className="section material-outcomes"><div className="story-heading"><div><p className="eyebrow">{tr?"Malzeme sonuçları":"Material outcomes"}</p><h2>{tr?"Malzeme, proses ve uygulama bağlamı—kanıt iddiası olmadan.":"Material, process and application context—without overstating evidence."}</h2></div><div className="story-controls"><button type="button" onClick={()=>move(-1)} aria-label={tr?"Malzeme şeridinde geriye git":"Scroll material outcomes backward"}>←</button><button type="button" onClick={()=>move(1)} aria-label={tr?"Malzeme şeridinde ileri git":"Scroll material outcomes forward"}>→</button></div></div><div ref={trackRef} className="outcomes-track" role="region" tabIndex={0} aria-label={tr?"Malzeme ve uygulama görselleri":"Material and application visuals"}>{items.map((item,i)=><figure key={`${item.src}-${item.title}`}><div><Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 78vw, 28vw" loading="lazy"/></div><figcaption><span>{item.kind}</span><b>{item.title}</b><small>0{i+1}</small></figcaption></figure>)}</div><p className="outcomes-note">{tr?"Görseller malzeme ve uygulama kategorilerini açıklar; doğrulanmış performans sonucu, uygunluk veya ticari kanıt olarak sunulmaz.":"These visuals explain material and application categories; they are not presented as verified performance results, compliance evidence or commercial proof."}</p></section>;
}

export function PlatformCTA({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  return <section className="mini-cta platform-final-cta"><div className="platform-cta-path" aria-label={tr?"Keşfet, geliştir, ölçeklendir":"Discover, develop, scale"}><span>{tr?"KEŞFET":"DISCOVER"}</span><i aria-hidden="true">→</i><span>{tr?"GELİŞTİR":"DEVELOP"}</span><i aria-hidden="true">→</i><span>{tr?"ÖLÇEKLENDİR":"SCALE"}</span></div><h2>{tr?"Malzeme problemini getirin. Bütün sistemi birlikte kurun.":"Bring the material challenge. Build the complete system."}</h2><div className="actions"><a className="button primary" href={`/${locale}/contact`}>{tr?"Proje Başlat":"Start a Project"} <span aria-hidden="true">→</span></a><a className="button ghost" href={`/${locale}/technologies`}>{tr?"Teknolojileri İncele":"Explore Technologies"}</a></div></section>;
}

export function HeritageSection({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  return <section className="section heritage-section"><figure><Image src="/story/canapa-heritage-opening.jpg" alt={tr?"Canapa tarafından sağlanan arşiv açılış töreni fotoğrafı":"Archival opening-ceremony photograph supplied by Canapa"} width={1024} height={1024} sizes="(max-width: 900px) 100vw, 46vw" loading="lazy"/></figure><div><p className="eyebrow">{tr?"Teknik miras":"Technical heritage"}</p><h2>{tr?"Bugünün malzeme platformunun arkasında uzun soluklu bir üretim kültürü var.":"A long-standing culture of making sits behind today’s material platform."}</h2><p>{tr?"Canapa tarafından sağlanan bu arşiv fotoğrafı, şirket tarihindeki bir açılış anını belgeler. Tarih, yer ve kişilerin kimlikleri doğrulanıncaya kadar görsel yalnızca tarihsel bağlamıyla sunulmaktadır.":"Supplied by Canapa, this archival photograph records an opening moment in the company’s history. Until the date, place and identities are verified, it is presented only as historical context."}</p><small>{tr?"Arşiv kaydı · Canapa tarafından sağlandı":"Archive record · supplied by Canapa"}</small></div></section>;
}

export function DTPaperRealContext({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  const items=[
    {src:"/story/dtpaper-context-roll-process.webp",alt:tr?"Endüstriyel kâğıt hattında merdaneler arasından ilerleyen kâğıt":"Paper travelling through rollers on an industrial paper line",title:tr?"Hat ve merdane prosesi":"Web and roller process"},
    {src:"/story/dtpaper-context-liquid-test.webp",alt:tr?"Laboratuvarda sıvı içinde malzeme numunesi testi":"Material sample test in liquid in the laboratory",title:tr?"Laboratuvar testi":"Laboratory testing"},
    {src:"/story/dtpaper-context-data-analysis.webp",alt:tr?"Ölçüm sonuçlarını gösteren laboratuvar bilgisayarı":"Laboratory computer displaying measurement results",title:tr?"Ölçüm ve veri analizi":"Measurement and data analysis"},
    {src:"/story/dtpaper-context-thermal-test.webp",alt:tr?"Laboratuvar fırınında kontrollü numune testi":"Controlled sample test in a laboratory oven",title:tr?"Kontrollü ısıl test":"Controlled thermal testing"},
    {src:"/story/dtpaper-context-paper-production.webp",alt:tr?"Endüstriyel hatta kâğıt bobinleri ve hareketli kâğıt ağı":"Paper reels and moving web on an industrial line",title:tr?"Kâğıt üretim altyapısı":"Paper production environment"},
    {src:"/story/dtpaper-context-laboratory-work.webp",alt:tr?"Laboratuvar çalışanı geliştirme notlarını kaydederken":"Laboratory specialist recording development observations",title:tr?"Uygulamalı geliştirme çalışması":"Hands-on development work"}
  ];
  return <section className="section dtpaper-real-context"><div className="section-head"><p className="eyebrow">{tr?"Gerçek geliştirme ortamı":"Real development environment"}</p><h2>{tr?"DTPaper®, laboratuvardan uygulama baskısına uzanan fiziksel bir geliştirme altyapısıyla desteklenir.":"DTPaper® is supported by a physical development environment spanning laboratory work and application printing."}</h2></div><div className="dtpaper-context-grid">{items.map(item=><figure key={item.src}><div><Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 50vw, 33vw" loading="lazy"/></div><figcaption>{item.title}<small>{tr?"Canapa tarafından sağlanan gerçek fotoğraf":"Authentic photograph supplied by Canapa"}</small></figcaption></figure>)}</div></section>;
}

export function DTPaperImpactAward({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  return <section className="section dtpaper-impact-award" aria-labelledby={`dtpaper-impact-${locale}`}><div className="dtpaper-impact-media"><figure className="dtpaper-impact-main"><Image src="/story/dtpaper-plastic-impact-visual.webp" alt={tr?"Okyanusta plastik atığın çevresel etkisini anlatan temsili görsel":"Representative visual communicating the environmental impact of plastic waste in the ocean"} fill sizes="(max-width: 900px) 100vw, 58vw" loading="lazy"/></figure><figure className="dtpaper-impact-certificate"><Image src="/story/canapa-award-certificate-2025.webp" alt={tr?"DTPaper teknolojisi için Canapa'ya verilen WTiN 2025 Sürdürülebilirlik Kazananı sertifikası":"WTiN 2025 Winner of Sustainability certificate awarded to Canapa for DTPaper technology"} width={1500} height={1061} sizes="(max-width: 900px) 42vw, 24vw" loading="lazy"/><figcaption>{tr?"DTPaper® · Sürdürülebilirlik Kazananı 2025":"DTPaper® · Winner of Sustainability 2025"}</figcaption></figure></div><div className="dtpaper-impact-copy"><p className="eyebrow light">{tr?"Ödüllü malzeme dönüşümü":"Award-winning material transition"}</p><h2 id={`dtpaper-impact-${locale}`}>{tr?"Tek kullanımlık PET transfer filminden endüstriyel bir çıkış yolu.":"An industrial route away from disposable PET transfer film."}</h2><p>{tr?"DTPaper®, her DTF transferinden sonra geri dönüştürülemeyen atığa dönüşen PET film taşıyıcının yerine kâğıt bazlı, PET filmsiz ve silikonsuz bir sistem geliştirmek amacıyla tasarlandı. Canapa, DTPaper®'ı bu kategori için özel olarak geliştirilmiş tek gerçek endüstriyel kâğıt bazlı seçenek olarak konumlandırmaktadır.":"DTPaper® was designed to replace the PET film carrier that becomes non-recyclable waste after each DTF transfer with a paper-based, PET-film-free and silicone-free system. Canapa positions DTPaper® as the only real industrial paper-based option developed specifically for this category."}</p><div className="dtpaper-impact-facts"><article><strong>{tr?"Yaklaşık 200.000 ton":"Approximately 200.000 tonnes"}</strong><p>{tr?"Canapa'nın, kullanım hacmine bağlı olarak ortadan kaldırmayı hedeflediğini belirttiği geri dönüştürülemeyen plastik miktarı.":"The amount of non-recyclable plastic Canapa states the technology was developed to eliminate, subject to deployment volume."}</p></article><article><strong>{tr?"WTiN Sürdürülebilirlik Kazananı":"WTiN Winner of Sustainability"}</strong><p>{tr?"DTPaper® teknolojisi, Innovate Textile Awards 2025'te Canapa adına uluslararası sürdürülebilirlik takdiri aldı.":"DTPaper® technology received international sustainability recognition for Canapa at the 2025 Innovate Textile Awards."}</p></article></div><p className="dtpaper-impact-note">{tr?"200 ton, Canapa tarafından belirtilen hacme bağlı teknoloji hedefidir. Ödül uluslararası bir takdirdir; her çevresel veya teknik iddianın bağımsız sertifikasyonu olarak sunulmaz.":"The 200-tonne figure is a company-stated, volume-dependent technology target. The award is international recognition; it is not presented as independent certification of every environmental or technical claim."}</p></div></section>;
}

export function CeralithBreakthrough({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  return <section className="section ceralith-breakthrough" aria-labelledby={`ceralith-breakthrough-${locale}`}><div className="ceralith-breakthrough-media"><Image src="/story/ceralith-plastic-crisis-visual.webp" alt={tr?"Plastik ambalaj atığının insan ve çevre üzerindeki baskısını anlatan temsili görsel":"Representative visual communicating the human and environmental pressure of plastic packaging waste"} fill sizes="(max-width: 900px) 100vw, 52vw" loading="lazy"/><div className="ceralith-material-signal" aria-hidden="true"><span>PET FILM</span><i>→</i><b>MINERAL<br/>BARRIER</b></div></div><div className="ceralith-breakthrough-copy"><p className="eyebrow light">{tr?"Plastiksiz bariyer mimarisi":"A barrier architecture beyond plastic film"}</p><h2 id={`ceralith-breakthrough-${locale}`}>{tr?"Plastik benzeri işlev. Yapıyı plastikleştirmeden.":"Plastic-like function. Without plasticising the structure."}</h2><p>{tr?"Ceralith™, fırınlanabilir kâğıt ve karton yapılarda PET film laminasyonunun yerine geçmeyi hedefleyen su bazlı, iki komponentli mineral-reaktif bir kaplama yaklaşımıdır. Canapa'nın çığır açan teknoloji olarak konumlandırdığı bu sistem; ısı ve yağ bariyerini, yapıştırılabilirliği ve dönüştürülebilirliği PET filmsiz, mikroplastik oluşturmayan, PFAS ve silikon ilavesiz bir hedef mimaride bir araya getirir.":"Ceralith™ is a water-based, two-component mineral-reactive coating approach designed to replace PET-film lamination in ovenable paper and board structures. Positioned by Canapa as a potentially category-defining technology, it brings heat and grease barrier, glueability and convertibility together in a target architecture without PET film, microplastic formation, added PFAS or silicone."}</p><div className="ceralith-breakthrough-facts"><article><span>01</span><strong>{tr?"İnorganik mineral yaklaşım":"Inorganic mineral approach"}</strong><p>{tr?"Kurutma ve kürleme sonrasında yoğun, mineral benzeri bir bariyer ağı oluşturmak üzere tasarlanmıştır.":"Designed to form a dense, mineral-like barrier network after drying and curing."}</p></article><article><span>02</span><strong>{tr?"Mikroplastik oluşturmayan hedef yapı":"No-microplastic target structure"}</strong><p>{tr?"PET film ve sentetik polimer bariyerlerden çıkış için geliştirilen malzeme mimarisi.":"A material architecture developed as a route away from PET film and synthetic-polymer barriers."}</p></article><article><span>03</span><strong>{tr?"Daha güvenli ve çevreci yön":"Safer, lower-plastic direction"}</strong><p>{tr?"PFAS ve silikon ilavesiz yaklaşım; nihai gıda teması ve çevresel uygunluk uygulama bazında doğrulanır.":"An added-PFAS- and silicone-free approach; final food-contact and environmental suitability is validated per application."}</p></article></div><p className="ceralith-breakthrough-note">{tr?"Bu ifadeler Ceralith™'in mevcut formülasyon yaklaşımını ve hedef ürün mimarisini tanımlar. Performans, gıda teması, geri dönüşüm ve çevresel uygunluk nihai ambalaj yapısında bağımsız testlerle doğrulanmalıdır.":"These statements describe Ceralith™'s current formulation approach and target product architecture. Performance, food contact, recyclability and environmental suitability must be independently validated in the final packaging structure."}</p></div></section>;
}

export function RecognitionSection({locale="en"}:{locale?:"en"|"tr"}) {
  const tr=locale==="tr";
  return <section className="section recognition"><div className="recognition-copy"><p className="eyebrow">{tr?"Ödüller ve takdir":"Awards & Recognition"}</p><h2>{tr?"Canapa, 2025 Sürdürülebilirlik ödülünün sahibi.":"Canapa — winner of Sustainability, 2025."}</h2><p>{tr?"Bu ödül Canapa'ya aittir. Canapa, PTP'nin başlangıç teknoloji portföyünü geliştirmiş ve platformun teknik kabiliyetini desteklemektedir; ödül doğrudan PTP platform ödülü olarak sunulmaz.":"This recognition belongs to Canapa. Canapa developed PTP's initial technology portfolio and supports platform technical capability; the award is not presented as a direct PTP platform award."}</p><dl><div><dt>{tr?"Organizasyon":"Organisation"}</dt><dd>WTiN Innovate Textile Awards</dd></div><div><dt>{tr?"Kategori":"Category"}</dt><dd>{tr?"Sürdürülebilirlik kazananı":"Winner of Sustainability"}</dd></div><div><dt>{tr?"Kazanan":"Winner"}</dt><dd>Canapa</dd></div><div><dt>{tr?"Tarih":"Date"}</dt><dd><time dateTime="2025-12-05">{tr?"5 Aralık 2025":"5 December 2025"}</time></dd></div></dl></div><div className="recognition-media"><figure className="recognition-main"><Image src="/story/canapa-award-certificate-2025.webp" alt={tr?"WTiN Innovate Textile Awards tarafından Canapa'ya verilen 5 Aralık 2025 tarihli Sürdürülebilirlik Kazananı sertifikası":"Winner of Sustainability certificate presented to Canapa by WTiN Innovate Textile Awards, dated 5 December 2025"} width={1500} height={1061} sizes="(max-width: 900px) 100vw, 55vw" loading="lazy"/><figcaption>{tr?"Ana kayıt — ödül sertifikası":"Primary record — award certificate"}</figcaption></figure><figure className="recognition-support"><Image src="/story/canapa-award-square-2025.webp" alt={tr?"Canapa Sürdürülebilirlik kazananı destekleyici ödül görseli":"Supporting Canapa Winner of Sustainability award graphic"} width={600} height={600} sizes="180px" loading="lazy"/><figcaption>{tr?"Destekleyici görsel":"Supporting visual"}</figcaption></figure></div></section>;
}

export function StatusBadge({status,locale="en"}:{status:EvidenceStatus;locale?:"en"|"tr"}) { const en:Record<EvidenceStatus,string>={"pilot-demonstrated":"Pilot demonstrated", "industrially-demonstrated":"Industrially demonstrated", "independently-verified":"Independently verified", "commercially-available":"Commercially available", "target-performance":"Target performance", "under-validation":"Under validation"};const tr:Record<EvidenceStatus,string>={"pilot-demonstrated":"Pilot ölçekte gösterildi", "industrially-demonstrated":"Endüstriyel ölçekte gösterildi", "independently-verified":"Bağımsız doğrulandı", "commercially-available":"Ticari olarak mevcut", "target-performance":"Hedef performans", "under-validation":"Doğrulama aşamasında"}; return <span className={`status-badge ${status}`}>{(locale==="tr"?tr:en)[status]}</span> }

export function EvidencePanel({records,locale="en"}:{records:EvidenceRecord[];locale?:"en"|"tr"}) { const tr=locale==="tr";const approvedRecords=records.filter(r=>r.publicationApproved&&r.confidentialityStatus==="public-approved");return <section className="section evidence-section"><div className="evidence-intro"><p className="eyebrow">{tr?"Validasyon ve uygulama kanıtı":"Validation & application evidence"}</p><h2>{tr?"Teknik kanıt, bağlamıyla birlikte anlam kazanır.":"Evidence with context—not claims in isolation."}</h2><p>{tr?"Kanıt kayıtları nihai yapı, proses koşulları ve hedef kullanımla birlikte değerlendirilir.":"Evidence records are reviewed with the final structure, process conditions and intended end use."}</p></div>{approvedRecords.length?<div className="evidence-cards">{approvedRecords.map((r,i)=><article className="evidence-card" key={`${r.technology}-${r.application}-${i}`}><div><span>{tr?"Uygulama":"Application"}</span><b>{r.application}</b></div><div><span>{tr?"Teknoloji":"Technology"}</span><b>{r.technology}</b></div><div><span>{tr?"Geliştirme aşaması":"Development stage"}</span><b>{r.developmentStage}</b></div><div><span>{tr?"Altlık veya malzeme yapısı":"Substrate or material structure"}</span><b>{r.structure}</b></div><div><span>{tr?"Test / demonstrasyon bağlamı":"Test or demonstration context"}</span><b>{r.context}</b></div><div><span>{tr?"Test yöntemi":"Test method"}</span><b>{r.testMethod}</b></div><div><span>{tr?"Sonuç özeti":"Result summary"}</span><b>{r.resultSummary}</b></div><div><span>{tr?"Validasyon durumu":"Validation status"}</span><StatusBadge status={r.validationStatus} locale={locale}/></div><div><span>{tr?"Tarih":"Date"}</span><b>{r.date}</b></div><div><span>{tr?"Kanıt kaynağı":"Evidence source"}</span><b>{r.source}</b></div><div><span>{tr?"Gizlilik durumu":"Confidentiality status"}</span><b>{tr?"Kamuya açık kullanım onaylı":"Approved for public use"}</b></div><div><span>{tr?"Yayın onayı":"Publication approval status"}</span><b>{tr?"Yayın onaylı":"Approved for publication"}</b></div></article>)}</div>:<p className="evidence-availability">{tr?"Seçilmiş uygulama kanıtları teknik inceleme, kaynak doğrulaması ve gizlilik değerlendirmesinden sonra yayımlanır. Ek kayıtlar nitelikli teknik görüşmeler kapsamında sunulur.":"Selected application evidence is published after technical, source and confidentiality review. Additional records are available within qualified technical discussions."}</p>}</section> }

const approvedMedia = (item: GalleryRecord) => Boolean(
  item.copyrightApproved &&
  item.confidentialityApproved &&
  item.personConsentApproved &&
  item.technicalReviewApproved &&
  item.publicationApproved &&
  item.approvedBy &&
  item.approvalDate
);
const stageLabel = (stage: GalleryRecord["developmentStage"], tr: boolean) => tr ? ({ Laboratory: "Laboratuvar", Pilot: "Pilot", "Industrial trial": "Endüstriyel deneme", "Commercial application": "Ticari uygulama" }[stage]) : stage;

function MediaVideo({item, locale, modal=false, contextId}:{item:GalleryRecord;locale:"en"|"tr";modal?:boolean;contextId?:string}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started,setStarted] = useState(modal);
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.every(entry => !entry.isIntersecting) && !video.paused) video.pause();
    }, { threshold: 0 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  const tr = locale === "tr";
  const webm = tr ? item.webmTrSrc || item.webmSrc : item.webmSrc;
  const mp4 = tr ? item.mp4TrSrc || item.mp4Src : item.mp4Src;
  const classification=homeMotionClassifications[item.technology as keyof typeof homeMotionClassifications];
  const recordType=classification?(tr?classification.tr:classification.en):(tr?"Kaydedilmiş demonstrasyon":"Recorded demonstration");
  const accent=item.technology.startsWith("DTPaper")?"dtpaper":item.technology.startsWith("Ceralith")?"ceralith":"bioma";
  const poster=(modal?item.modalPosterSrc:item.posterSrc)||item.posterSrc;
  const posterWidth=item.posterWidth||1280;
  const posterHeight=item.posterHeight||720;
  const posterSrcSet=[item.thumbnailPosterSrc&&`${item.thumbnailPosterSrc} 480w`,poster&&`${poster} ${posterWidth}w`].filter(Boolean).join(", ");
  const startVideo=()=>{setStarted(true);window.requestAnimationFrame(()=>{void videoRef.current?.play();});};
  return <div className={`media-player media-player-${accent}${modal?" media-player-modal":""}`} style={{maxWidth:`${posterWidth}px`}} data-poster-timestamp={item.posterTimestampSeconds}>
    <video ref={videoRef} controls={started} playsInline preload="metadata" poster={poster} aria-label={tr?item.altTr:item.altEn} autoPlay={modal} muted={modal} tabIndex={started?0:-1} onPlay={()=>setStarted(true)}>
      {item.mobileWebmSrc&&<source src={item.mobileWebmSrc} type="video/webm" media="(max-width: 700px)"/>}
      {item.mobileMp4Src&&<source src={item.mobileMp4Src} type="video/mp4" media="(max-width: 700px)"/>}
      {webm&&<source src={webm} type="video/webm"/>}
      {mp4&&<source src={mp4} type="video/mp4"/>}
      <track kind="captions" src={(tr?item.captionsTrSrc:item.captionsEnSrc)||""} srcLang={tr?"tr":"en"} label={tr?"Türkçe":"English"} default/>
      <a href={mp4||item.src}>{tr?"Demonstrasyon videosunu indirin veya ayrı olarak açın.":"Download or open the demonstration video."}</a>
    </video>
    {!started&&poster&&<div className="media-poster-layer">
      <picture>
        {item.mobilePosterSrc&&<source media="(max-width: 700px)" srcSet={`${item.mobilePosterSrc} ${item.mobilePosterWidth||720}w`} sizes="100vw"/>}
        <img src={poster} srcSet={posterSrcSet||undefined} sizes="(max-width: 1050px) 100vw, 65vw" width={posterWidth} height={posterHeight} alt={tr?item.altTr:item.altEn}/>
      </picture>
      <div className="media-poster-gradient" aria-hidden="true"></div>
      <div className="media-poster-meta">
        <span>{recordType}</span>
        <b>{item.technology}</b>
        <small>{tr?item.titleTr:item.titleEn}</small>
        <button type="button" onClick={startVideo} aria-label={`${tr?"Demonstrasyonu İzle":"Watch demonstration"}: ${item.technology}`}><i aria-hidden="true">▶</i>{tr?"Demonstrasyonu İzle":"Watch demonstration"}</button>
        {contextId&&<a href={`#${contextId}`}>{tr?"Kanıt bağlamı":"Evidence context"} <span aria-hidden="true">↓</span></a>}
      </div>
    </div>}
  </div>;
}

export function ApplicationGallery({items,locale="en",eyebrow,heading}:{items:GalleryRecord[];locale?:"en"|"tr";eyebrow?:string;heading?:string}) {
  const approved=items.filter(approvedMedia);if(!approved.length)return null;const tr=locale==="tr";
  return <section className="section application-gallery" id="recorded-demonstration"><div className="section-head"><p className="eyebrow">{eyebrow||(tr?"Uygulama ve proses galerisi":"Application & Process Gallery")}</p><h2>{heading||(tr?"Gerçek proses medyası, açık validasyon statüsüyle.":"Real process media with explicit validation status.")}</h2></div><div className="gallery-records">{approved.map((item,i)=>{
    const location=tr?item.locationTr:item.locationEn;
    const contextId=`evidence-context-${item.technology.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}-${i}`;
    return <figure className={item.width<item.height?"portrait-media":"landscape-media"} key={`${item.src}-${i}`}>{item.mediaType==="video"?<MediaVideo item={item} locale={locale} contextId={contextId}/>:<Image src={item.src} alt={tr?item.altTr:item.altEn} width={item.width} height={item.height} sizes="(max-width: 700px) 100vw, 50vw"/>}<figcaption id={contextId}><h3>{tr?item.titleTr:item.titleEn}</h3><p>{tr?item.descriptionTr:item.descriptionEn}</p><p className="media-caption">{tr?item.captionTr:item.captionEn}</p>{(tr?item.publicationNoteTr:item.publicationNoteEn)&&<p className="media-note">{tr?item.publicationNoteTr:item.publicationNoteEn}</p>}<dl className="visitor-metadata"><div><dt>{tr?"Uygulama":"Application"}</dt><dd>{tr?item.applicationTr:item.applicationEn}</dd></div><div><dt>{tr?"Geliştirme aşaması":"Development stage"}</dt><dd>{stageLabel(item.developmentStage,tr)}</dd></div><div><dt>{tr?"Validasyon bağlamı":"Validation context"}</dt><dd>{tr?item.validationContextTr:item.validationContextEn}</dd></div></dl><details className="technical-record"><summary>{tr?"Teknik kayıt":"Technical record"}<span aria-hidden="true">+</span></summary><dl><div><dt>{tr?"Teknoloji":"Technology"}</dt><dd>{item.technology}</dd></div><div><dt>{tr?"Kaynak":"Source"}</dt><dd>{tr?item.photographerOrSourceTr:item.photographerOrSourceEn}</dd></div><div><dt>{tr?"Telif sahibi":"Copyright owner"}</dt><dd>{item.copyrightOwner}</dd></div>{location&&<div><dt>{tr?"Konum":"Location"}</dt><dd>{location}</dd></div>}{item.captureDate&&<div><dt>{tr?"Tarih":"Date"}</dt><dd><time dateTime={item.captureDate}>{item.captureDate}</time></dd></div>}</dl></details></figcaption></figure>;
  })}</div></section>;
}

export function FeatureMedia({items,locale="en"}:{items:GalleryRecord[];locale?:"en"|"tr"}) { const item=items.find(approvedMedia);if(!item)return null;const tr=locale==="tr";return <figure className="feature-media">{item.mediaType==="video"?<MediaVideo item={item} locale={locale}/>:<Image src={item.src} alt={tr?item.altTr:item.altEn} width={item.width} height={item.height} sizes="(max-width: 900px) 100vw, 55vw" priority/>}<figcaption><b>{tr?item.titleTr:item.titleEn}</b><span>{tr?item.captionTr:item.captionEn}</span></figcaption></figure> }

function MotionPoster({item,tr,onPlay}:{item:GalleryRecord;tr:boolean;onPlay:(button:HTMLButtonElement)=>void}) {
  const [failed,setFailed]=useState(false);
  const poster=item.thumbnailPosterSrc||item.posterSrc;
  return <div className="motion-poster">{!failed&&poster?<Image unoptimized src={poster} alt={tr?item.altTr:item.altEn} width={480} height={270} sizes="(max-width: 700px) 100vw, 33vw" onError={()=>setFailed(true)}/>:<div className="motion-poster-fallback" role="img" aria-label={tr?item.altTr:item.altEn}><b>{item.technology}</b></div>}<button type="button" className="motion-play" onClick={event=>onPlay(event.currentTarget)} aria-label={`${tr?"Demonstrasyonu İzle":"Watch Demonstration"}: ${item.technology}`}><span aria-hidden="true">▶</span><b>{tr?"Demonstrasyonu İzle":"Watch Demonstration"}</b></button></div>;
}

export function TechnologyMotion({items,locale="en"}:{items:GalleryRecord[];locale?:"en"|"tr"}) {
  const approved=items.filter(approvedMedia);
  const [activeItem,setActiveItem]=useState<GalleryRecord|null>(null);
  const triggerRef=useRef<HTMLButtonElement|null>(null);
  const closeButtonRef=useRef<HTMLButtonElement|null>(null);
  const tr=locale==="tr";
  const slugs:Record<string,string>={"DTPaper®":"dtpaper","Ceralith™":"ceralith","Bioma-ORX®":"bioma-orx"};
  useEffect(()=>{
    if(!activeItem)return;
    closeButtonRef.current?.focus();
    const onKeyDown=(event:KeyboardEvent)=>{if(event.key==="Escape"){setActiveItem(null);window.requestAnimationFrame(()=>triggerRef.current?.focus());}};
    window.addEventListener("keydown",onKeyDown);
    return()=>window.removeEventListener("keydown",onKeyDown);
  },[activeItem]);
  if(!approved.length)return null;
  const openVideo=(item:GalleryRecord,button:HTMLButtonElement)=>{triggerRef.current=button;setActiveItem(item);};
  const closeVideo=()=>{setActiveItem(null);window.requestAnimationFrame(()=>triggerRef.current?.focus());};
  return <section className="section technology-motion"><div className="section-head motion-heading"><p className="eyebrow">{tr?"Hareket hâlindeki teknoloji":"Technology in Motion"}</p><h2>{tr?"Malzeme dönüşümünü hareket içinde görün.":"See material transformation in motion."}</h2></div><div className="motion-grid">{approved.map((item,index)=>{const classification=homeMotionClassifications[item.technology as keyof typeof homeMotionClassifications];return <article className={`motion-card motion-${slugs[item.technology]} ${index===0?"motion-featured":""}`} key={item.technology}><MotionPoster item={item} tr={tr} onPlay={button=>openVideo(item,button)}/><div><span>{stageLabel(item.developmentStage,tr)}</span>{classification&&<small className="motion-classification">{tr?classification.tr:classification.en}</small>}<h3>{item.technology}</h3><p>{tr?item.captionTr:item.captionEn}</p><details className="motion-evidence"><summary>{tr?"Kanıt bağlamı":"Evidence context"}<span aria-hidden="true">+</span></summary><p>{tr?item.validationContextTr:item.validationContextEn}</p></details><a className="arrow-link" href={`/${locale}/technologies/${slugs[item.technology]}`}>{tr?"Teknolojiyi incele":"Explore technology"} <b aria-hidden="true">↗</b></a></div></article>})}</div>{activeItem&&<div className="media-modal-backdrop" role="presentation" onMouseDown={event=>{if(event.currentTarget===event.target)closeVideo();}}><div className="media-modal" role="dialog" aria-modal="true" aria-labelledby="media-modal-title"><div className="media-modal-head"><div><span>{tr?"Demonstrasyon":"Demonstration"}</span><h3 id="media-modal-title">{activeItem.technology}</h3></div><button ref={closeButtonRef} type="button" onClick={closeVideo} aria-label={tr?"Videoyu kapat":"Close video"}>×</button></div><MediaVideo item={activeItem} locale={locale} modal/></div></div>}</section>
}

export function ComparisonGallery({items,locale="en"}:{items:ComparisonRecord[];locale?:"en"|"tr"}) {
  const approved=items.filter(item=>item.publicationApproval&&item.sameTestConditionsVerified&&approvedMedia(item.before)&&approvedMedia(item.after));
  if(!approved.length)return null;
  const tr=locale==="tr";
  return <section className="section comparison-gallery"><div className="section-head"><p className="eyebrow">{tr?"Doğrulanmış karşılaştırma":"Verified comparison"}</p><h2>{tr?"Aynı test koşullarında önce ve sonra.":"Before and after under the same test conditions."}</h2></div>{approved.map(item=><article key={item.title}><div className="comparison-images"><Image src={item.before.src} alt={tr?item.before.altTr:item.before.altEn} width={item.before.width} height={item.before.height}/><Image src={item.after.src} alt={tr?item.after.altTr:item.after.altEn} width={item.after.width} height={item.after.height}/></div><h3>{item.title}</h3><dl><div><dt>{tr?"Altlık":"Substrate"}</dt><dd>{item.substrate}</dd></div><div><dt>{tr?"Kaplama yapısı":"Coating structure"}</dt><dd>{item.coatingStructure}</dd></div><div><dt>{tr?"Sıcaklık ve süre":"Temperature and duration"}</dt><dd>{item.temperature} · {item.duration}</dd></div><div><dt>{tr?"Maruziyet":"Exposure condition"}</dt><dd>{item.exposureCondition}</dd></div><div><dt>{tr?"Geliştirme aşaması":"Development stage"}</dt><dd>{item.developmentStage}</dd></div><div><dt>{tr?"Validasyon durumu":"Validation status"}</dt><dd><StatusBadge status={item.validationStatus} locale={locale}/></dd></div><div><dt>{tr?"Kaynak ve tarih":"Source and date"}</dt><dd>{item.source} · <time dateTime={item.date}>{item.date}</time></dd></div></dl></article>)}</section>
}

export function HeroVideo({record,locale="en"}:{record:HeroVideoRecord;locale?:"en"|"tr"}) { const videoRef=useRef<HTMLVideoElement>(null);const [playing,setPlaying]=useState(false);useEffect(()=>{const media=window.matchMedia("(prefers-reduced-motion: reduce)");if(!media.matches){videoRef.current?.play().then(()=>setPlaying(true)).catch(()=>setPlaying(false));}},[]);if(!record.publicationApproval||record.confidentialityReview!=="approved")return null;const toggle=()=>{const video=videoRef.current;if(!video)return;if(video.paused){void video.play().then(()=>setPlaying(true));}else{video.pause();setPlaying(false);}};return <div className="hero-video"><video ref={videoRef} muted loop playsInline preload="metadata" poster={record.posterSrc} aria-label={record.descriptiveTitle}><source src={record.webmSrc} type="video/webm"/><source src={record.mp4Src} type="video/mp4"/></video><div className="hero-video-overlay"></div><button type="button" onClick={toggle} aria-pressed={!playing}>{playing?(locale==="tr"?"Videoyu duraklat":"Pause video"):(locale==="tr"?"Videoyu oynat":"Play video")}</button></div> }

export function IndustrialDataPanel({records,locale="en"}:{records:IndustrialParameter[];locale?:"en"|"tr"}) { const tr=locale==="tr";return <section className="section industrial-data"><p className="eyebrow">{tr?"Doğrulanmış çalışma parametreleri":"Verified operating parameters"}</p>{records.length?<div className="industrial-data-grid">{records.map((r,i)=><article key={`${r.coatingMethod}-${i}`}><div><span>{tr?"Kaplama yöntemi":"Coating method"}</span><b>{r.coatingMethod}</b></div><div><span>{tr?"Doğrulanmış çalışma eni":"Verified working width"}</span><b>{r.verifiedWorkingWidth}</b></div><div><span>{tr?"Altlık kategorileri":"Supported substrate categories"}</span><b>{r.supportedSubstrateCategories.join(", ")}</b></div><div><span>{tr?"Rulo / tabaka kabiliyeti":"Roll and sheet capability"}</span><b>{r.rollAndSheetCapability}</b></div><div><span>{tr?"Durum":"Status"}</span><b>{r.status}</b></div><div><span>{tr?"Dönüştürme prosesleri":"Applicable converting processes"}</span><b>{r.convertingProcesses.join(", ")}</b></div><div><span>{tr?"Kalite kontrol yöntemleri":"Quality-control methods"}</span><b>{r.qualityControlMethods.join(", ")}</b></div><div><span>{tr?"Doğrulama tarihi":"Verification date"}</span><b>{r.verificationDate}</b></div><div><span>{tr?"Onaylı kaynak":"Approved source"}</span><b>{r.approvedSource}</b></div></article>)}</div>:<p className="evidence-availability">{tr?"Ayrıntılı çalışma parametreleri; ilgili altlık, proses ve uygulama bağlamının doğrulanmasının ardından nitelikli teknik değerlendirme kapsamında paylaşılır.":"Detailed operating parameters are disclosed during qualified technical review after verification of the relevant substrate, process and application context."}</p>}</section> }

export function VerifiedDataCard({title,copy}:{title:string;copy:string}) { return <article className="verified-card"><span>Verified performance data</span><h3>{title}</h3><p>{copy}</p><b>Source, date and test conditions required for publication</b></article> }

type ProjectField = "name" | "company" | "email" | "country" | "description" | "consent";
type ProjectFieldErrors = Partial<Record<ProjectField,string>>;

function FieldError({name,errors}:{name:ProjectField;errors:ProjectFieldErrors}) { return errors[name] ? <span className="field-error" id={`${name}-error`}>{errors[name]}</span> : null; }

export function ProjectForm({locale="en"}:{locale?:"en"|"tr"}) {
  const [state, setState] = useState<"idle"|"sending"|"sent"|"error"|"timeout"|"duplicate">("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ProjectFieldErrors>({});
  const submittingRef = useRef(false);
  const lastSuccessfulSubmissionRef = useRef<string | null>(null);
  const tr=locale==="tr";
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return;
    const element = e.currentTarget;
    const form = new FormData(element);
    const body = Object.fromEntries(form.entries()) as Record<string, string>;
    const required:ProjectField[] = ["name", "company", "email", "country", "description"];
    const errors:ProjectFieldErrors = {};
    for (const field of required) if (!String(body[field] || "").trim()) errors[field] = tr ? "Bu alan zorunludur." : "This field is required.";
    if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.email = tr ? "Geçerli bir e-posta adresi girin." : "Enter a valid email address.";
    if (body.consent !== "accepted") errors.consent = tr ? "Devam etmek için onay gereklidir." : "Consent is required to continue.";
    const firstInvalid = [...required,"consent" as const].find(field => errors[field]);
    if (firstInvalid) {
      setFieldErrors(errors);
      setState("error");
      setMessage(tr ? "Lütfen işaretlenen alanları kontrol edin." : "Please review the highlighted fields.");
      (element.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }
    setFieldErrors({});
    const fingerprint = JSON.stringify(body);
    if (lastSuccessfulSubmissionRef.current === fingerprint) {
      setState("duplicate");
      setMessage(tr ? "Bu başvuru zaten gönderildi. Yeniden göndermeden önce lütfen bekleyin." : "This enquiry has already been submitted. Please wait before sending it again.");
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 15000);
    submittingRef.current = true;
    setState("sending");
    setMessage(tr ? "Başvurunuz güvenli şekilde gönderiliyor…" : "Your enquiry is being submitted securely…");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(body), signal: controller.signal });
      const data = await res.json() as {message?:string};
      setMessage(data.message || (tr ? "Sunucu yanıtı işlenemedi. Lütfen yeniden deneyin." : "The server response could not be processed. Please try again."));
      if (res.ok) {
        lastSuccessfulSubmissionRef.current = fingerprint;
        setState("sent");
      } else if (res.status === 409 || res.status === 429) {
        setState("duplicate");
      } else {
        setState("error");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setMessage(tr ? "İstek zaman aşımına uğradı. Bilgileriniz formda korundu; lütfen yeniden deneyin." : "The request timed out. Your details remain in the form; please try again.");
        setState("timeout");
      } else {
        setMessage(tr ? "Proje formuna şu anda ulaşılamıyor. Bilgileriniz formda korundu; lütfen yeniden deneyin." : "The project endpoint is temporarily unavailable. Your details remain in the form; please try again.");
        setState("error");
      }
    } finally {
      window.clearTimeout(timer);
      submittingRef.current = false;
    }
  }
  const fieldA11y = (name: ProjectField) => ({
    "aria-invalid": Boolean(fieldErrors[name]),
    "aria-describedby": fieldErrors[name] ? `${name}-error` : undefined,
    onInput: () => setFieldErrors(current => current[name] ? {...current,[name]:undefined} : current),
  });
  return <form className="project-form" method="post" action="/api/contact" onSubmit={submit} noValidate aria-busy={state==="sending"}>
    <input type="hidden" name="locale" value={locale}/>
    <div className="form-grid">
      <label>{tr?"Ad soyad":"Name"}<input required name="name" autoComplete="name" {...fieldA11y("name")}/><FieldError name="name" errors={fieldErrors}/></label>
      <label>{tr?"Şirket":"Company"}<input required name="company" autoComplete="organization" {...fieldA11y("company")}/><FieldError name="company" errors={fieldErrors}/></label>
      <label>{tr?"Görev":"Role"}<input name="role" autoComplete="organization-title"/></label>
      <label>{tr?"Kurumsal e-posta":"Business email"}<input required type="email" name="email" autoComplete="email" {...fieldA11y("email")}/><FieldError name="email" errors={fieldErrors}/></label>
      <label>{tr?"Ülke":"Country"}<input required name="country" autoComplete="country-name" {...fieldA11y("country")}/><FieldError name="country" errors={fieldErrors}/></label>
      <label>{tr?"Paydaş türü":"I am a"}<select name="stakeholder" defaultValue="Brand"><option value="Brand">{tr?"Marka":"Brand"}</option><option value="Paper producer">{tr?"Kâğıt üreticisi":"Paper producer"}</option><option value="Packaging converter">{tr?"Ambalaj dönüştürücüsü":"Packaging converter"}</option><option value="Textile printer">{tr?"Tekstil baskıcısı":"Textile printer"}</option><option value="Chemical / material company">{tr?"Kimya / malzeme şirketi":"Chemical / material company"}</option><option value="Equipment / OEM company">{tr?"Ekipman / OEM şirketi":"Equipment / OEM company"}</option><option value="Research organisation">{tr?"Araştırma kuruluşu":"Research organisation"}</option><option value="Investor / strategic partner">{tr?"Yatırımcı / stratejik ortak":"Investor / strategic partner"}</option><option value="Other">{tr?"Diğer":"Other"}</option></select></label>
    </div>
    <label>{tr?"İlgilendiğim alan":"I am interested in"}<select name="interest" defaultValue="New technology development"><option>DTPaper®</option><option>Ceralith™</option><option>Bioma-ORX®</option><option value="New technology development">{tr?"Yeni teknoloji geliştirme":"New technology development"}</option><option value="Licensing">{tr?"Lisanslama":"Licensing"}</option><option value="Industrial scale-up">{tr?"Endüstriyel ölçek büyütme":"Industrial scale-up"}</option><option value="Strategic partnership">{tr?"Stratejik ortaklık":"Strategic partnership"}</option></select></label>
    <label>{tr?"Proje açıklaması":"Project description"}<textarea required name="description" rows={6} maxLength={5000} placeholder={tr?"Mevcut malzemeyi, uygulamayı, üretim sürecini ve hedefinizi anlatın. Emin değilseniz PTP problemin tanımlanmasına yardımcı olabilir.":"Tell us about the current material, application, production process and target. If you are unsure, say so—we can help define the problem."} {...fieldA11y("description")}/><FieldError name="description" errors={fieldErrors}/></label>
    <label className="consent"><input required type="checkbox" name="consent" value="accepted" {...fieldA11y("consent")}/><span>{tr?"Bu formda paylaştığım bilgilerin talebimin değerlendirilmesi ve yanıtlanması amacıyla PTP tarafından işlenmesini kabul ediyorum.":"I consent to PTP processing the information submitted here to evaluate and respond to this enquiry."} <a href={tr?"/tr/privacy":"/en/privacy"}>{tr?"Gizlilik Politikası":"Privacy Policy"}</a>.</span></label>
    <FieldError name="consent" errors={fieldErrors}/>
    <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
    <button className="button primary" disabled={state==="sending"} aria-disabled={state==="sending"}>{state==="sending" ? (tr?"Gönderiliyor…":"Submitting…") : (tr?"Projeyi Gönder":"Submit Project")}</button>
    <p className={`form-status ${state}`} role={state==="error"||state==="timeout"?"alert":"status"} aria-live="polite">{message}</p>
    <p className="form-note">{tr?"Teknik belgeler ilk değerlendirmeden sonra güvenli bir kanal üzerinden paylaşılabilir.":"Technical documents can be shared through a secure channel after the initial review."}</p>
  </form>
}

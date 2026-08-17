import type { Metadata } from "next";
import {
  HeroVideo,
  HomeDemonstrationLinks,
  HomeFinalCTA,
  HomeGlobalConnection,
  HomeHeroCollage,
  HomeIntegration,
  HomeLabToScale,
  HomeRecognition,
  HomeTechnologyQuick,
} from "../components";
import { homeHeroVideo } from "../../content/site";

export const metadata: Metadata = {
  title: "Plastik Bağımlılığından Ölçeklenebilir Kâğıt Teknolojilerine",
  description: "PTP; kimya, kâğıt mühendisliği, kaplama, validasyon ve küresel işbirliği yoluyla lif bazlı malzeme sistemleri geliştirir ve endüstriyel ölçeğe taşır.",
  alternates: { canonical: "/tr", languages: { "en-GB": "/en", "tr-TR": "/tr", "x-default": "/en" } },
};

export default function TurkishHome() {
  return <div className="home-page">
    <section className={`hero home-crisis-hero ${homeHeroVideo ? "hero-has-video" : ""}`}>
      {homeHeroVideo && <HeroVideo record={homeHeroVideo} locale="tr" />}
      <div className="hero-copy">
        <p className="eyebrow light">Malzeme bilimi · endüstriyel sistemler</p>
        <h1>Plastik performansı.<br/><em>Kâğıtla yeniden kuruldu.</em></h1>
        <p className="lead">PTP; kimya, kâğıt mühendisliği, kaplama, validasyon ve küresel işbirliği yoluyla lif bazlı malzeme sistemleri geliştirir ve endüstriyel ölçeğe taşır.</p>
        <div className="actions">
          <a className="button primary" href="#teknolojiler">Teknolojileri İncele <span aria-hidden="true">→</span></a>
          <a className="button ghost" href="/tr/contact">Malzeme Probleminizi Getirin</a>
        </div>
      </div>
      {!homeHeroVideo && <HomeHeroCollage locale="tr" />}
      <div className="technology-signal" aria-label="Plastikten endüstriyel ölçeğe teknoloji yolu">
        <span>PLASTİK</span><i>→</i><span>KİMYA</span><i>→</i><span>KÂĞIT</span><i>→</i><span>KAPLAMA</span><i>→</i><span>VALİDASYON</span><i>→</i><span>ÖLÇEK</span>
      </div>
    </section>

    <HomeTechnologyQuick locale="tr" />
    <HomeDemonstrationLinks locale="tr" />
    <HomeLabToScale locale="tr" />
    <HomeIntegration locale="tr" />
    <HomeGlobalConnection locale="tr" />
    <HomeRecognition locale="tr" />
    <HomeFinalCTA locale="tr" />
  </div>;
}

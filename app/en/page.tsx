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
  title: "From Plastic Dependence to Scalable Paper Technologies",
  description: "PTP develops and industrialises fibre-based material systems through chemistry, paper engineering, coating, validation and global collaboration.",
  alternates: { canonical: "/en", languages: { "en-GB": "/en", "tr-TR": "/tr", "x-default": "/en" } },
};

export default function Home() {
  return <div className="home-page">
    <section className={`hero home-crisis-hero ${homeHeroVideo ? "hero-has-video" : ""}`}>
      {homeHeroVideo && <HeroVideo record={homeHeroVideo} />}
      <div className="hero-copy">
        <p className="eyebrow light">Material science · industrial systems</p>
        <h1>Plastic performance.<br/><em>Rebuilt through paper.</em></h1>
        <p className="lead">PTP develops and industrialises fibre-based material systems through chemistry, paper engineering, coating, validation and global collaboration.</p>
        <div className="actions">
          <a className="button primary" href="#technologies">Explore Technologies <span aria-hidden="true">→</span></a>
          <a className="button ghost" href="/en/contact">Bring Us a Challenge</a>
        </div>
      </div>
      {!homeHeroVideo && <HomeHeroCollage />}
      <div className="technology-signal" aria-label="Plastic to industrial scale technology pathway">
        <span>PLASTIC</span><i>→</i><span>CHEMISTRY</span><i>→</i><span>PAPER</span><i>→</i><span>COATING</span><i>→</i><span>VALIDATION</span><i>→</i><span>SCALE</span>
      </div>
    </section>

    <HomeTechnologyQuick />
    <HomeDemonstrationLinks />
    <HomeLabToScale />
    <HomeIntegration />
    <HomeGlobalConnection />
    <HomeRecognition />
    <HomeFinalCTA />
  </div>;
}

import { AiSection } from "@/components/site/ai-section";
import { ClickBloom } from "@/components/site/click-bloom";
import { FaqSection } from "@/components/site/faq-section";
import { Footer } from "@/components/site/footer";
import { FullscreenSection } from "@/components/site/fullscreen-section";
import { Hero } from "@/components/site/hero";
import { LocalSection } from "@/components/site/local-section";
import { Navbar } from "@/components/site/navbar";
import { ReadingSection } from "@/components/site/reading-section";
import { SyntaxSection } from "@/components/site/syntax-section";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "观墨 Guanmo",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Windows",
    description: "一个面向阅读体验的开源 Markdown 桌面应用。",
    softwareVersion: "1.6.1",
    license: "https://opensource.org/license/mit",
    codeRepository: "https://github.com/we-used-to-be/Guanmo-open",
    downloadUrl: "https://github.com/we-used-to-be/Guanmo-open/releases/latest",
  };

  return (
    <>
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <main className="site-shell" id="main-content">
      <Navbar />
      <Hero />
      <div className="story">
        <ReadingSection />
        <FullscreenSection />
        <AiSection />
        <LocalSection />
        <SyntaxSection />
        <FaqSection />
      </div>
      <Footer />
      </main>
      <ClickBloom />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}

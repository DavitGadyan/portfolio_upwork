import type { Locale } from '@/lib/i18n/config';
import { SiteFrame } from '@/components/layout/SiteFrame';
import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { CapabilityMap } from '@/components/home/CapabilityMap';
import { Services } from '@/components/home/Services';
import { Portfolio } from '@/components/home/Portfolio';
import { Testimonials } from '@/components/home/Testimonials';
import { FunFacts } from '@/components/home/FunFacts';
import { Faq } from '@/components/home/Faq';
import { JsonLd } from '@/components/seo/JsonLd';
import { homeGraph } from '@/lib/seo/jsonld';

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <SiteFrame locale={locale} variant="overlay">
      <JsonLd data={homeGraph(locale)} />
      <Hero locale={locale} />
      <About locale={locale} />
      <CapabilityMap locale={locale} />
      <Services locale={locale} />
      <Portfolio locale={locale} />
      <Testimonials locale={locale} />
      <FunFacts locale={locale} />
      <Faq locale={locale} />
    </SiteFrame>
  );
}

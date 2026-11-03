import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, personNode, webPageNode, websiteNode } from '@/lib/seo/jsonld';
import { homePath, pagePath } from '@/lib/locale-path';
import { absUrl, withBasePath } from '@/lib/site';
import { getProjectsShowcase } from '@/lib/content/projects';
import { getVideo, videos, videoThumb, VIDEO_LABELS as L, type IntroVideo } from '@/data/videos';
import { SiteFrame } from '@/components/layout/SiteFrame';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Breadcrumbs } from '@/components/content/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { VideoFacade } from '@/components/embeds/VideoFacade';
import { ProjectCard } from '@/components/home/PortfolioGrid';

const MATERIALS = '/materials/';
export const VIDEOS_PATH = '/materials/videos/';
const videoPath = (slug: string) => `${VIDEOS_PATH}${slug}/`;
export const videoSlugs = videos.map((v) => v.slug);

function VideoTile({ v, locale }: { v: IntroVideo; locale: Locale }) {
  return (
    <Link href={pagePath(locale, videoPath(v.slug))} className="vtile">
      <span className="vtile__thumb">
        {/* eslint-disable-next-line @next/next/no-img-element -- Loom thumbnail served as-is from public/images/videos */}
        <img src={withBasePath(videoThumb(v.slug))} alt="" width={640} height={360} loading="lazy" decoding="async" />
        <span className="vtile__play" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        </span>
        <span className="vtile__len">{v.minutes}</span>
      </span>
      <strong>{v.title[locale]}</strong>
      <small>{L.watch[locale]} →</small>
    </Link>
  );
}

// ---------------------------------------------------------------- index: every topic

export function videosMetadata(locale: Locale): Metadata {
  return buildMetadata({ locale, path: VIDEOS_PATH, title: L.sectionTitle[locale], description: L.description[locale] });
}

export function VideosIndexPage({ locale }: { locale: Locale }) {
  const m = getMessages(locale);
  const bc = breadcrumbNode(locale, VIDEOS_PATH, [{ name: m.nav.home, path: '/' }, { name: m.nav.materials, path: MATERIALS }, { name: L.section[locale], path: VIDEOS_PATH }]);
  const graph = { '@context': 'https://schema.org', '@graph': [personNode(locale), websiteNode(),
    { ...webPageNode({ locale, path: VIDEOS_PATH, name: L.sectionTitle[locale], description: L.description[locale], type: 'CollectionPage', breadcrumbId: bc['@id'] }),
      mainEntity: { '@type': 'ItemList', itemListElement: videos.map((v, i) => ({ '@type': 'ListItem', position: i + 1, name: v.title[locale] })) } },
    bc] };
  return (
    <SiteFrame locale={locale}>
      <JsonLd data={graph} />
      <section className="section pt-10 lg:pt-14">
        <div className="container-dg">
          <Breadcrumbs items={[{ label: m.nav.home, href: homePath(locale) }, { label: m.nav.materials, href: pagePath(locale, MATERIALS) }, { label: L.section[locale] }]} />
          <div className="mx-auto mt-8 max-w-3xl text-center">
            <SectionTitle as="h1" align="center">{L.sectionTitle[locale]}</SectionTitle>
            <p className="mt-6 text-[1.02rem] leading-relaxed">{L.sectionIntro[locale]}</p>
          </div>
          <ul className="vtiles" role="list">
            {videos.map((v) => <li key={v.slug}><VideoTile v={v} locale={locale} /></li>)}
          </ul>
        </div>
      </section>
    </SiteFrame>
  );
}

// ---------------------------------------------------------------- one video: the page a client receives

export function videoMetadata(locale: Locale, slug: string): Metadata {
  const v = getVideo(slug);
  if (!v) return {};
  return buildMetadata({ locale, path: videoPath(slug), title: `${v.title[locale]} | ${L.section[locale]}`, description: v.intro[locale], image: videoThumb(slug), imageAlt: v.title[locale] });
}

export function VideoPage({ locale, slug }: { locale: Locale; slug: string }) {
  const m = getMessages(locale);
  const v = getVideo(slug)!;
  const path = videoPath(slug);
  const related = getProjectsShowcase(locale).filter((p) => p.categories.some((c) => v.categories.includes(c))).slice(0, 3);
  const others = videos.filter((x) => x.slug !== slug);
  const bc = breadcrumbNode(locale, path, [{ name: m.nav.home, path: '/' }, { name: m.nav.materials, path: MATERIALS }, { name: L.section[locale], path: VIDEOS_PATH }, { name: v.title[locale], path }]);
  const graph = { '@context': 'https://schema.org', '@graph': [personNode(locale), websiteNode(),
    { ...webPageNode({ locale, path, name: v.title[locale], description: v.intro[locale], breadcrumbId: bc['@id'] }),
      mainEntity: { '@type': 'VideoObject', name: v.title[locale], description: v.intro[locale], thumbnailUrl: absUrl(videoThumb(slug)), embedUrl: `https://www.loom.com/embed/${v.loom}`, duration: `PT${v.minutes.replace(':', 'M')}S`, uploadDate: '2026-11-03' } },
    bc] };
  return (
    <SiteFrame locale={locale}>
      <JsonLd data={graph} />
      <section className="section pt-10 lg:pt-14">
        <div className="container-dg">
          <Breadcrumbs items={[{ label: m.nav.home, href: homePath(locale) }, { label: m.nav.materials, href: pagePath(locale, MATERIALS) }, { label: L.section[locale], href: pagePath(locale, VIDEOS_PATH) }, { label: v.title[locale] }]} />
          <div className="mx-auto mt-8 max-w-3xl text-center">
            <SectionTitle as="h1" align="center">{v.title[locale]}</SectionTitle>
            <p className="mt-6 text-[1.02rem] leading-relaxed">{v.intro[locale]}</p>
          </div>
          <div className="vplayer">
            <VideoFacade provider="loom" id={v.loom} title={v.title[locale]} playLabel={L.play[locale]} poster={withBasePath(videoThumb(slug))} ratio="16 / 9" />
            <p className="vplayer__meta">{v.minutes} {L.minutes[locale]}</p>
          </div>
          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="section-title section-title--sm">{L.related[locale]}</h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => <ProjectCard key={p.slug} p={p} locale={locale} />)}
              </div>
            </section>
          )}
          <section className="mt-16">
            <h2 className="section-title section-title--sm">{L.others[locale]}</h2>
            <ul className="vtiles vtiles--sm" role="list">
              {others.map((x) => <li key={x.slug}><VideoTile v={x} locale={locale} /></li>)}
            </ul>
          </section>
          <p className="mt-12"><Link href={pagePath(locale, VIDEOS_PATH)} className="btn btn-outline-dark btn-sm">← {L.all[locale]}</Link></p>
        </div>
      </section>
    </SiteFrame>
  );
}

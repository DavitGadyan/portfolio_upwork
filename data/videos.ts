import type { CategoryId, Localized } from '@/lib/content/types';
import raw from './videos.json';

export interface IntroVideo {
  slug: string;
  /** Short link sent to clients: upwork.davidgadyan.com/<short> redirects to the video page (scripts/postbuild.mjs). */
  short: string;
  /** Loom share id (loom.com/share/<id>). */
  loom: string;
  minutes: string;
  /** Portfolio categories whose projects are listed under the video. */
  categories: CategoryId[];
  title: Localized<string>;
  intro: Localized<string>;
}

export const videos = raw.videos as IntroVideo[];
export const getVideo = (slug: string) => videos.find((v) => v.slug === slug);
export const videoThumb = (slug: string) => `/images/videos/${slug}.jpg`;

export const VIDEO_LABELS = {
  section: { en: 'Video introductions', es: 'Presentaciones en vídeo' },
  sectionTitle: { en: 'Video Introductions by Topic', es: 'Presentaciones en vídeo por tema' },
  sectionIntro: {
    en: 'Short videos where I introduce myself and how I work in each area. Pick a topic, press play.',
    es: 'Vídeos cortos en los que me presento y explico cómo trabajo en cada área. Elige un tema y dale a reproducir.',
  },
  description: {
    en: 'Short Loom video introductions by David Gadyan, one per topic: data science and ML, generative AI, algorithmic trading, AI marketing and full-stack SaaS.',
    es: 'Presentaciones breves en vídeo de David Gadyan, una por tema: ciencia de datos y ML, IA generativa, trading algorítmico, marketing con IA y SaaS full-stack.',
  },
  watch: { en: 'Watch', es: 'Ver' },
  play: { en: 'Play video', es: 'Reproducir vídeo' },
  minutes: { en: 'min video', es: 'min de vídeo' },
  related: { en: 'Related projects', es: 'Proyectos relacionados' },
  others: { en: 'Other topics', es: 'Otros temas' },
  all: { en: 'All video introductions', es: 'Todas las presentaciones en vídeo' },
} as const;

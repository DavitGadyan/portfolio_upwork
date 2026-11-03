import { VideosIndexPage, videosMetadata } from '@/components/pages/VideosPage';
import { secondaryLocales, type Locale } from '@/lib/i18n/config';
type P = { params: Promise<{ locale: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return secondaryLocales.map((locale) => ({ locale })); }
export async function generateMetadata({ params }: P) { const { locale } = await params; return videosMetadata(locale as Locale); }
export default async function Page({ params }: P) { const { locale } = await params; return <VideosIndexPage locale={locale as Locale} />; }

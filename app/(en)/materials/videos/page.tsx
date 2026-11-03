import { VideosIndexPage, videosMetadata } from '@/components/pages/VideosPage';
export const metadata = videosMetadata('en');
export default function Page() { return <VideosIndexPage locale="en" />; }

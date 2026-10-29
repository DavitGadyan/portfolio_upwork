import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { withBasePath } from '@/lib/site';
import { getMessages, fmt } from '@/lib/i18n/messages';
import { homePath, pagePath } from '@/lib/locale-path';
import { CookieSettingsButton } from '@/components/consent/CookieSettingsButton';
import { Reveal } from '@/components/ui/Reveal';

export function Footer({ locale, dark = true }: { locale: Locale; dark?: boolean }) {
  const m = getMessages(locale);
  const year = new Date().getFullYear();
  return (
    <footer className={`${dark ? 'bg-ink-800 text-ink-200' : 'bg-paper-100 text-ink-500'} py-10`}>
      <Reveal stagger className="container-dg flex flex-col items-center gap-5 text-center text-sm">
        <a href={withBasePath(`${homePath(locale)}#home`)} className="text-xs uppercase tracking-[0.2em] hover:underline">{m.nav.backToTop}</a>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <Link href={pagePath(locale, '/portfolio/')} className="hover:underline">{m.footer.portfolio}</Link>
          <Link href={pagePath(locale, '/blog/')} className="hover:underline">{m.footer.blog}</Link>
          <Link href={pagePath(locale, '/cookies/')} className="hover:underline">{m.footer.cookies}</Link>
          <Link href={pagePath(locale, '/privacy/')} className="hover:underline">{m.footer.privacy}</Link>
          <CookieSettingsButton label={m.footer.manageCookies} className="hover:underline" />
        </nav>
        <p className="m-0 text-xs opacity-80">{fmt(m.footer.copyright, { year })}</p>
      </Reveal>
    </footer>
  );
}

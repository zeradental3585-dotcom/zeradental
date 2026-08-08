import Link from 'next/link';
import { SITE, WA } from '@/lib/site';
import { CITIES } from '@/lib/cities';
import { Tooth, WhatsAppIcon } from './Icons';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-ink/[.08] bg-sand-50">
      <div className="wrap py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-mint-200"><Tooth className="h-5 w-5" /></span>
              <span className="text-[17px] font-extrabold tracking-tight">Zera<span className="text-mint-500">Dental</span></span>
            </div>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-500">
              We build fast, search-optimised websites for dental clinics across India — designed to turn
              &ldquo;dentist near me&rdquo; searches into booked appointments.
            </p>
            <a href={WA.general} target="_blank" rel="noopener noreferrer" className="btn-wa mt-5 !px-5 !py-2.5 !text-sm">
              <WhatsAppIcon className="h-4 w-4" /> {SITE.phoneDisplay}
            </a>
          </div>

          <nav aria-label="Services">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-ink">Services</h3>
            <ul className="mt-4 space-y-2.5 text-[14.5px] text-ink-500">
              <li><Link href="/services/dental-website-design" className="hover:text-mint-600">Dental website design</Link></li>
              <li><Link href="/services/local-seo-for-dentists" className="hover:text-mint-600">Local SEO for dentists</Link></li>
              <li><Link href="/services/google-business-profile" className="hover:text-mint-600">Google Business Profile</Link></li>
              <li><Link href="/services/appointment-booking" className="hover:text-mint-600">Online appointment booking</Link></li>
              <li><Link href="/services/website-redesign" className="hover:text-mint-600">Clinic website redesign</Link></li>
              <li><Link href="/pricing" className="hover:text-mint-600">Pricing &amp; packages</Link></li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-ink">Company</h3>
            <ul className="mt-4 space-y-2.5 text-[14.5px] text-ink-500">
              <li><Link href="/about" className="hover:text-mint-600">About us</Link></li>
              <li><Link href="/portfolio" className="hover:text-mint-600">Our work</Link></li>
              <li><Link href="/blog" className="hover:text-mint-600">Growth guides</Link></li>
              <li><Link href="/free-website-audit" className="hover:text-mint-600">Free clinic audit</Link></li>
              <li><Link href="/contact" className="hover:text-mint-600">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-mint-600">FAQ</Link></li>
            </ul>
          </nav>

          <nav aria-label="Cities">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-ink">Top cities</h3>
            <ul className="mt-4 space-y-2.5 text-[14.5px] text-ink-500">
              {CITIES.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link href={`/dental-website-design/${c.slug}`} className="hover:text-mint-600">{c.name}</Link>
                </li>
              ))}
              <li><Link href="/locations" className="font-medium text-mint-600 hover:text-mint-700">All cities →</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-ink/[.08] pt-7">
          <div className="flex flex-col gap-4 text-[13.5px] text-ink-300 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {SITE.name}, a property of{' '}
              <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-ink-500 underline underline-offset-2 hover:text-mint-600">
                Zera Technologies
              </a>
              . All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link href="/privacy" className="hover:text-ink-500">Privacy</Link>
              <Link href="/terms" className="hover:text-ink-500">Terms</Link>
              <Link href="/sitemap.xml" className="hover:text-ink-500">Sitemap</Link>
            </div>
          </div>
          <p className="mt-3 text-[13px] text-ink-300">
            Designed and developed by{' '}
            <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-mint-600">
              Zera Technologies
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

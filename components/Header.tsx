'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { WA } from '@/lib/site';
import { Tooth, WhatsAppIcon } from './Icons';

const NAV = [
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/portfolio', label: 'Work' },
  { href: '/locations', label: 'Cities' },
  { href: '/blog', label: 'Guides' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`sticky top-0 z-50 transition-all ${solid ? 'border-b border-ink/[.07] bg-white/90 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="wrap flex h-[68px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Zera Dental home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-mint-200">
            <Tooth className="h-5 w-5" />
          </span>
          <span className="text-[17px] font-extrabold tracking-tight">
            Zera<span className="text-mint-500">Dental</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-[14.5px] font-medium text-ink-500 transition-colors hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <a href={WA.general} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2 !text-sm">
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp
          </a>
          <Link href="/free-website-audit" className="btn-primary !px-5 !py-2.5 !text-sm">Free clinic audit</Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-ink/10 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className="relative block h-3.5 w-5">
            <span className={`absolute left-0 h-[2px] w-5 rounded bg-ink transition-all ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-1.5 h-[2px] w-5 rounded bg-ink transition-all ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 h-[2px] w-5 rounded bg-ink transition-all ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/[.07] bg-white lg:hidden">
          <div className="wrap flex flex-col gap-1 py-4">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 text-base font-medium text-ink hover:bg-sand-50">
                {n.label}
              </Link>
            ))}
            <Link href="/free-website-audit" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full">Get my free clinic audit</Link>
            <a href={WA.general} target="_blank" rel="noopener noreferrer" className="btn-wa mt-2 w-full">
              <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

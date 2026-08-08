'use client';
import { useEffect, useState } from 'react';
import { WA } from '@/lib/site';
import { WhatsAppIcon } from './Icons';

export default function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <a
      href={WA.general}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Zera Dental on WhatsApp"
      className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 text-sm font-semibold text-white shadow-lift transition-all duration-500 hover:bg-[#1eb455] ${show ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
}

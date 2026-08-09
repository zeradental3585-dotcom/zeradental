import type { Metadata } from 'next';
import { DemoBanner, DemoHeader, DemoFooter, DemoFloat } from '@/components/DemoChrome';

export const metadata: Metadata = {
  // Deliberately kept out of the index: this is a sales demo, not content.
  // Letting a fictional clinic rank for treatment queries would mislead patients
  // and confuse Google about what zeradental.in is about.
  robots: { index: false, follow: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white font-sans text-slate-800">
      <DemoBanner />
      <DemoHeader />
      <main>{children}</main>
      <DemoFooter />
      <DemoFloat />
    </div>
  );
}

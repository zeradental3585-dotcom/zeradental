'use client';
import { usePathname } from 'next/navigation';

/**
 * The /demo routes are a self-contained sample clinic site with their own
 * header and footer, so the Zera Dental chrome is suppressed there.
 * Header/Footer are passed in as nodes so Footer can stay a server component.
 */
export default function SiteChrome({
  header,
  footer,
  float,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  float: React.ReactNode;
  children: React.ReactNode;
}) {
  const isDemo = (usePathname() || '').startsWith('/demo');
  if (isDemo) return <>{children}</>;
  return (
    <>
      {header}
      <main id="main">{children}</main>
      {footer}
      {float}
    </>
  );
}

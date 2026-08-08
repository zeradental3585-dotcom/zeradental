import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="wrap py-28 text-center">
      <span className="eyebrow">404</span>
      <h1 className="h1 mt-3">That page has moved on.</h1>
      <p className="lede mx-auto mt-4 max-w-md">
        The link is broken or the page no longer exists. Here are the places most dentists are looking for.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-dark">Home</Link>
        <Link href="/pricing" className="btn-ghost">Pricing</Link>
        <Link href="/free-website-audit" className="btn-primary">Free clinic audit</Link>
      </div>
    </section>
  );
}

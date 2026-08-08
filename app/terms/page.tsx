import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'The terms governing your use of the Zera Dental website and the services offered through it.',
  alternates: { canonical: '/terms' },
};

export default function Terms() {
  return (
    <article className="wrap py-14 sm:py-20">
      <div className="mx-auto max-w-3xl prose-z">
        <h1 className="font-display text-4xl tracking-[-.02em]">Terms of Use</h1>
        <p className="text-[14px] text-ink-300">Last updated: 1 August 2026</p>

        <p>
          This website, {SITE.domain}, is operated by {SITE.name}, a property of{' '}
          <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer">Zera Technologies</a>. By accessing or using
          this site you agree to these terms. If you do not agree, please do not use the site.
        </p>

        <h2>Services and quotations</h2>
        <p>
          Prices shown on this website are indicative package prices for standard scopes and are valid for projects in
          India unless we agree otherwise in writing. A binding agreement is formed only when we issue a written
          quotation or invoice and you accept it. We reserve the right to revise published pricing at any time; changes
          do not affect projects already accepted.
        </p>

        <h2>The free website audit</h2>
        <p>
          The free clinic website audit is provided as a good-faith professional opinion based on publicly available
          information about your clinic. It carries no guarantee of accuracy, completeness or outcome, creates no
          client relationship, and must not be treated as a warranty of ranking or business results.
        </p>

        <h2>No guarantee of search rankings</h2>
        <p>
          Search engine rankings are determined by third parties whose algorithms we neither control nor have visibility
          into. Nothing on this site constitutes a promise of a specific ranking position, traffic volume, enquiry count
          or revenue outcome. Any figures, timelines or examples described are illustrative of typical experience and
          will vary by city, competition, treatment mix and your own review activity.
        </p>

        <h2>Client responsibilities</h2>
        <p>
          If you engage us, you are responsible for providing accurate clinic information, for holding valid rights to
          any photographs, logos or text you supply, and for obtaining patient consent before sharing any clinical
          images. You are responsible for compliance with the advertising and professional conduct rules applicable to
          dental practitioners in your jurisdiction, including any restrictions issued by the Dental Council of India or
          your state dental council.
        </p>

        <h2>Intellectual property</h2>
        <p>
          All content on this website — including text, layout, design, code, graphics and the Zera Dental name and
          marks — is the property of {SITE.name} and{' '}
          <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer">Zera Technologies</a>, and is protected
          under Indian and international copyright law. You may not copy, republish, scrape or reproduce it without prior
          written permission.
        </p>
        <p>
          For delivered client projects, ownership of the final website, its content and its domain transfers to the
          client on final payment. Zera Technologies retains ownership of its underlying frameworks, components, tooling
          and methodology, and retains the right to reference the completed project as portfolio work unless the client
          asks in writing that we do not.
        </p>

        <h2>Third-party links and services</h2>
        <p>
          This site links to third-party services including WhatsApp, Google and external websites. We are not
          responsible for their content, availability or practices, and your use of them is governed by their own terms.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, {SITE.name} and Zera Technologies are not liable for indirect,
          incidental or consequential losses, including lost profits or lost business opportunity, arising from use of
          this website or of our services. Our total aggregate liability in connection with any engagement is limited to
          the fees actually paid by the client for that engagement.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of India. Any dispute is subject to the exclusive jurisdiction of the
          courts of Patna, Bihar.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or WhatsApp {SITE.phoneDisplay}.
        </p>
      </div>
    </article>
  );
}

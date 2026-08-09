export const CLINIC = {
  name: 'Sunrise Dental Studio',
  tagline: 'Gentle, unhurried dentistry in Vijay Nagar, Indore.',
  area: 'Vijay Nagar',
  city: 'Indore',
  doctor: 'Dr. Meera Kulkarni',
  creds: 'BDS, MDS (Prosthodontics)',
  years: 14,
  reviews: 187,
  rating: '4.9',
  hours: 'Mon–Sat, 10am – 8pm',
  phoneDisplay: '+91 98765 43210',
} as const;

export type Treatment = {
  slug: string;
  name: string;
  short: string;
  price: string;
  duration: string;
  intro: string;
  steps: { h: string; p: string }[];
  faqs: { q: string; a: string }[];
};

export const TREATMENTS: Treatment[] = [
  {
    slug: 'dental-implants',
    name: 'Dental Implants',
    short: 'A permanent replacement for a missing tooth that behaves like your own.',
    price: '₹28,000 – ₹45,000 per implant',
    duration: '2 visits + healing period',
    intro:
      'An implant replaces the root of a missing tooth with a titanium post, then a crown on top. Unlike a bridge, it does not require cutting down the healthy teeth on either side — which is why we recommend it in most single-tooth cases.',
    steps: [
      { h: 'Assessment and 3D scan', p: 'We check bone depth and density with a cone-beam scan so there are no surprises on the day. This visit takes about 40 minutes.' },
      { h: 'Placing the implant', p: 'Done under local anaesthesia in roughly an hour. Most patients drive themselves home and are back at work the next day.' },
      { h: 'Healing', p: 'The implant fuses with the bone over three to four months. You leave with a temporary tooth, never a gap.' },
      { h: 'The final crown', p: 'Colour-matched to your neighbouring teeth and fitted in a single appointment.' },
    ],
    faqs: [
      { q: 'Is the procedure painful?', a: 'The placement itself is done under local anaesthesia and most patients report it as easier than an extraction. Expect mild soreness for two to three days, manageable with ordinary painkillers.' },
      { q: 'How long do implants last?', a: 'With normal brushing and regular cleaning appointments, implants routinely last 15 to 25 years. The crown on top may need replacing sooner than the implant itself.' },
      { q: 'Am I too old for an implant?', a: 'Age is rarely the deciding factor — bone quality and general health matter far more. We have placed implants successfully for patients in their seventies.' },
    ],
  },
  {
    slug: 'braces-and-aligners',
    name: 'Braces & Clear Aligners',
    short: 'Straighten teeth with metal, ceramic or near-invisible aligners.',
    price: '₹35,000 – ₹1,10,000 depending on type',
    duration: '9 – 24 months',
    intro:
      'Adults make up more than half our orthodontic patients now, largely because clear aligners removed the social awkwardness. We will tell you honestly which option suits your case — aligners cannot correct everything, and we would rather say so upfront.',
    steps: [
      { h: 'Records and planning', p: 'Photographs, scans and an X-ray, then a simulation showing where your teeth will end up.' },
      { h: 'Fitting', p: 'Braces are bonded in one appointment. Aligners are delivered as a series of trays you change at home.' },
      { h: 'Adjustments', p: 'Every four to six weeks for braces; every eight to ten weeks for aligners.' },
      { h: 'Retainers', p: 'Non-negotiable. Teeth drift back without them, and we would rather you keep the result you paid for.' },
    ],
    faqs: [
      { q: 'Metal braces or clear aligners?', a: 'Aligners are near-invisible and removable but demand discipline — 20 to 22 hours a day. Metal braces are cheaper, work faster on complex cases, and cannot be forgotten in a drawer. We will recommend based on your bite, not your budget.' },
      { q: 'Will treatment affect my speech?', a: 'Aligners cause a slight lisp for the first few days that almost always resolves. Braces rarely affect speech at all.' },
      { q: 'Can I pay in instalments?', a: 'Yes — orthodontic treatment is spread across monthly payments over the treatment period at no extra cost.' },
    ],
  },
  {
    slug: 'root-canal-treatment',
    name: 'Root Canal Treatment',
    short: 'Save a badly infected tooth rather than lose it.',
    price: '₹6,000 – ₹9,000 per tooth',
    duration: 'Usually a single visit',
    intro:
      'A root canal has a worse reputation than it deserves. With modern rotary instruments and proper anaesthesia, most of our patients say it felt no different from having a filling — and it saves a tooth that would otherwise have to come out.',
    steps: [
      { h: 'Diagnosis', p: 'A digital X-ray confirms how far the infection has spread and whether the tooth can be saved.' },
      { h: 'Cleaning the canal', p: 'The infected pulp is removed and the canals are shaped and disinfected. This is the part that stops the pain.' },
      { h: 'Sealing', p: 'The canals are filled and sealed the same day in the majority of cases.' },
      { h: 'Crown', p: 'A treated tooth becomes brittle, so we cap it. Skipping this step is the commonest reason root canals fail later.' },
    ],
    faqs: [
      { q: 'Will it hurt?', a: 'The procedure is done under local anaesthesia and is not painful. The ache you arrive with is usually gone by the time you leave — that is the infection being removed.' },
      { q: 'Why do I need a crown afterwards?', a: 'A tooth without its pulp loses its blood supply and becomes brittle over time. A crown protects it from fracturing. Root canals that fail years later have usually gone uncrowned.' },
      { q: 'Can the tooth be extracted instead?', a: 'It can, and it is cheaper today. But replacing it later with an implant or bridge costs several times more than saving it now. We will lay out both options with real numbers.' },
    ],
  },
];

export const getTreatment = (slug: string) => TREATMENTS.find((t) => t.slug === slug);

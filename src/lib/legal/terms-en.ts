import { COMPANY, LEGAL_UPDATED, mail } from './company';
import type { LegalDoc } from './types';

const legal = mail(COMPANY.emails.legal);
const office = COMPANY.street + ', ' + COMPANY.city + ', Lithuania';

export const termsEn: LegalDoc = {
  lang: 'en',
  eyebrow: 'Terms',
  title: 'Terms of Use',
  updatedLabel: 'Last updated',
  updated: LEGAL_UPDATED.en,
  intro:
    'The rules for using this website, who runs it, and how these terms relate to project work, which runs under separate written agreements.',
  contentsLabel: 'Contents',
  meta: {
    title: 'Terms of Use',
    description:
      'Who operates the Maxwell Software Solutions website and the terms for using it: intellectual property, limitation of liability, Lithuanian law and courts.',
  },
  sections: [
    {
      id: 'provider',
      title: 'Provider information',
      blocks: [
        {
          kind: 'p',
          text: 'The website www.maxwellsoftwaresolutions.com is operated by the company below. This is the information that Article 6 of the Lithuanian [Law on Information Society Services](https://www.e-tar.lt/portal/lt/legalAct/TAR.8A719A97956F/asr) and Article 5 of the EU [E-Commerce Directive](https://eur-lex.europa.eu/eli/dir/2000/31/oj) (2000/31/EC) require us to make easy to find.',
        },
        {
          kind: 'dl',
          rows: [
            { term: 'Provider', def: COMPANY.registerName + ' (mažoji bendrija, a small partnership under Lithuanian law)' },
            { term: 'Company code', def: COMPANY.code },
            { term: 'Register', def: 'Register of Legal Entities of the Republic of Lithuania (Juridinių asmenų registras), managed by the State Enterprise Centre of Registers (Registrų centras)' },
            { term: 'Registered office', def: office },
            { term: 'E-mail', def: mail(COMPANY.emails.general) },
            { term: 'Telephone', def: COMPANY.phone },
            { term: 'Legal notices', def: legal },
            { term: 'Privacy', def: mail(COMPANY.emails.privacy) + ' (see the [Privacy Policy](/privacy))' },
            { term: 'Security reports', def: mail(COMPANY.emails.security) + ' (see the [Security page](/security))' },
            { term: 'VAT', def: 'We are not a VAT payer.' },
            { term: 'Prices', def: 'In euros. Because we are not a VAT payer, prices shown on the website include no VAT.' },
          ],
        },
      ],
    },
    {
      id: 'scope',
      title: 'Scope and acceptance',
      blocks: [
        {
          kind: 'p',
          text: 'These terms apply to your use of www.maxwellsoftwaresolutions.com and its pages (the “website”). By using the website you accept them. If you do not accept them, please do not use the website.',
        },
        {
          kind: 'p',
          text: 'These terms are not an offer to contract. Prices, packages, case descriptions and other information on the website are for information only and bind us only if we confirm them in a written agreement.',
        },
      ],
    },
    {
      id: 'projects',
      title: 'Services and project work',
      blocks: [
        {
          kind: 'p',
          text: 'We provide software development, code review and consulting services under separate written agreements (a proposal, statement of work or contract) with each client. Those agreements, not these terms, govern the services, the fees, the intellectual property in the deliverables and each party’s liability. If an agreement conflicts with these terms, the agreement prevails.',
        },
        {
          kind: 'p',
          text: 'Nothing on the website creates a client relationship, and an enquiry sent through the website does not create a contract.',
        },
      ],
    },
    {
      id: 'use',
      title: 'Using the website',
      blocks: [
        {
          kind: 'p',
          text: 'You may browse the website and link to its public pages. You agree not to:',
        },
        {
          kind: 'ul',
          items: [
            'use the website unlawfully or to harm others;',
            'try to gain unauthorised access to the website, our systems or other users’ data, or probe or scan the website for vulnerabilities, except for the good-faith reporting that our [Security page](/security) allows;',
            'overload or disrupt the website, or collect its content automatically in a way that burdens it or ignores our robots.txt rules;',
            'introduce malicious code, or submit forms under a false identity, as spam, or with content you have no right to send;',
            'use the website scanner on sites that you do not own and are not authorised to check.',
          ],
        },
        {
          kind: 'p',
          text: 'We may block access that breaks these rules.',
        },
      ],
    },
    {
      id: 'information',
      title: 'Information on the website',
      blocks: [
        {
          kind: 'p',
          text: 'The content, including articles, case studies, descriptions of services and the results of the website scanner, is general information and not professional advice for your situation. We try to keep it accurate and current, but it may contain mistakes or become out of date. Check with us before you rely on it for a decision.',
        },
      ],
    },
    {
      id: 'ip',
      title: 'Intellectual property',
      blocks: [
        {
          kind: 'p',
          text: 'The website’s content and design, meaning its texts, graphics, logos, layout and software, belong to Maxwell software solutions, MB or its licensors and are protected by Lithuanian and EU copyright law. The name and logo of Maxwell Software Solutions are ours, and we do not license them without our written permission.',
        },
        {
          kind: 'p',
          text: 'You may view the website, print or save a copy for your own business information, and quote short extracts with a clear credit and a link to the source. Any other use, such as copying, republishing, distributing, adapting or commercial reuse, needs our prior written permission.',
        },
        {
          kind: 'p',
          text: 'Open-source software and third-party materials on or linked from the website stay under their own licences.',
        },
        {
          kind: 'p',
          text: 'What you send us, for example a message through the contact form, stays yours. You allow us to use it to answer you and, if you ask, to prepare a proposal.',
        },
      ],
    },
    {
      id: 'links',
      title: 'Links and third-party services',
      blocks: [
        {
          kind: 'p',
          text: 'The website links to other sites and services, for example Google Calendar for booking calls, LinkedIn and GitHub, and we use services such as Formspree for forms. Others run them under their own terms and privacy policies. We do not control them and are not responsible for their content or practices.',
        },
      ],
    },
    {
      id: 'availability',
      title: 'Availability and changes to the website',
      blocks: [
        {
          kind: 'p',
          text: 'We run the website with reasonable care but provide it as it is and as available, without a promise that it will be uninterrupted or error-free. We may change, suspend or remove any part of the website at any time.',
        },
      ],
    },
    {
      id: 'liability',
      title: 'Limitation of liability',
      blocks: [
        {
          kind: 'p',
          text: 'Nothing in these terms excludes or limits liability that Lithuanian law does not allow to be excluded or limited. This includes liability for harm caused intentionally or by gross negligence, for injury to health or loss of life, and for non-pecuniary damage (Civil Code, Article 6.252), and any rights you have as a consumer under mandatory law.',
        },
        {
          kind: 'p',
          text: 'Subject to that, because the website is free and informational:',
        },
        {
          kind: 'ul',
          items: [
            'we are not liable for indirect or consequential loss, lost profit or lost data arising from your use of the website or your reliance on its content; and',
            'our total liability to you for all claims arising from your use of the website is limited to EUR 100.',
          ],
        },
        {
          kind: 'p',
          text: 'Liability for project work is set by the written agreement for that work.',
        },
      ],
    },
    {
      id: 'privacy',
      title: 'Privacy, cookies and security',
      blocks: [
        {
          kind: 'p',
          text: 'How we handle personal data and cookies is described in our [Privacy Policy](/privacy). How to report a vulnerability, and what we promise in return, is described on our [Security page](/security).',
        },
      ],
    },
    {
      id: 'changes',
      title: 'Changes to these terms',
      blocks: [
        {
          kind: 'p',
          text: 'We may update these terms, for example when the website or the law changes. The date at the top shows the current version, and a new version applies from the date shown. If you keep using the website after a change, you accept the new version; if you do not accept it, stop using the website.',
        },
      ],
    },
    {
      id: 'law',
      title: 'Governing law and disputes',
      blocks: [
        {
          kind: 'p',
          text: 'These terms, and any dispute arising from your use of the website, are governed by the law of the Republic of Lithuania.',
        },
        {
          kind: 'p',
          text: 'The courts of the Republic of Lithuania have jurisdiction, in accordance with the rules on jurisdiction. If you are a consumer, nothing here takes away your right to bring proceedings, and to rely on the mandatory consumer protection rules, in the EU country where you live.',
        },
        {
          kind: 'p',
          text: 'If you have a problem, please write to ' + legal + ' first: we would like to settle it directly. If you are a consumer you can also turn to the State Consumer Rights Protection Authority ([vvtat.lrv.lt](https://vvtat.lrv.lt/)).',
        },
      ],
    },
    {
      id: 'general',
      title: 'General',
      blocks: [
        {
          kind: 'p',
          text: 'If any part of these terms is invalid or cannot be enforced, the rest stays in force. Not exercising a right does not mean that we give it up.',
        },
        {
          kind: 'p',
          text: 'These terms are published in Lithuanian and English and say the same thing. If you notice a difference, tell us at ' + legal + ' and we will correct it.',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Contact',
      blocks: [
        {
          kind: 'p',
          text: 'Questions about these terms: ' + legal + '.',
        },
      ],
    },
  ],
};

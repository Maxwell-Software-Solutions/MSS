import { COMPANY, LEGAL_UPDATED, mail } from './company';
import type { LegalDoc } from './types';

const security = mail(COMPANY.emails.security);
const privacy = mail(COMPANY.emails.privacy);

export const securityEn: LegalDoc = {
  lang: 'en',
  eyebrow: 'Responsible disclosure',
  title: 'Security',
  updatedLabel: 'Last updated',
  updated: LEGAL_UPDATED.en,
  intro:
    'How to report a security problem to us, what you can expect in return, and how we protect data.',
  contentsLabel: 'Contents',
  meta: {
    title: 'Security',
    description:
      'How to report a vulnerability to Maxwell software solutions, MB, what to expect, safe harbour for good-faith research, and how we protect data.',
  },
  sections: [
    {
      id: 'report',
      title: 'Report a vulnerability',
      blocks: [
        {
          kind: 'p',
          text: 'If you think you have found a security problem on this website, write to ' + security + ' with enough detail for us to reproduce it: the page or address affected, what you did, what happened and, if you have one, a proof of concept. Plain text is fine. The same address is listed in our [security.txt](/.well-known/security.txt) file.',
        },
      ],
    },
    {
      id: 'scope',
      title: 'What is in scope',
      blocks: [
        {
          kind: 'p',
          text: 'In scope: the website www.maxwellsoftwaresolutions.com, its pages and forms, and the tools on it, such as the website scanner.',
        },
        {
          kind: 'p',
          text: 'Out of scope, so please report to their owners instead: the third-party services we use (Google, Vercel, Cookiebot, Formspree), our clients’ systems, and anything that is not ours.',
        },
        {
          kind: 'p',
          text: 'These are not worth reporting, because on their own they have no security impact:',
        },
        {
          kind: 'ul',
          items: [
            'results of automated scanners with no demonstrated impact;',
            'missing or different HTTP headers or cookie flags where there is no demonstrated exploit;',
            'denial-of-service, heavy-load or rate-limit tests;',
            'spam or automated mass submission of forms;',
            'social engineering, phishing or physical attacks on staff, premises or devices;',
            'issues that need an already compromised device or browser.',
          ],
        },
      ],
    },
    {
      id: 'rules',
      title: 'How to test safely',
      blocks: [
        {
          kind: 'ul',
          items: [
            'Act in good faith and test only the in-scope website.',
            'Use only the data you need to show the problem. Do not view, change, delete or keep other people’s data, and stop as soon as you have shown it.',
            'Do not degrade the service: no denial-of-service attacks and no load tests.',
            'Do not use social engineering, phishing or physical attacks.',
            'Keep the details private until we have fixed the problem or 90 days have passed since your report, whichever comes first. Tell us if you plan to publish.',
            'Do not ask for payment: we run no bounty programme and pay no rewards.',
          ],
        },
      ],
    },
    {
      id: 'expect',
      title: 'What to expect from us',
      blocks: [
        {
          kind: 'ul',
          items: [
            'We acknowledge your report within 5 working days.',
            'We assess it, tell you whether we accept it as a vulnerability, and keep you informed of progress.',
            'We fix valid problems as quickly as their severity and our size allow, and tell you when it is done.',
            'If you wish, we credit you by name once it is fixed. Tell us how to name you, or that you prefer not to be named.',
            'We treat your report and your contact details as confidential and use them only to handle the report.',
          ],
        },
      ],
    },
    {
      id: 'safe-harbour',
      title: 'Safe harbour for good-faith research',
      blocks: [
        {
          kind: 'p',
          text: 'If you act in good faith and follow this policy, we will not take legal action against you or report you to law enforcement for your research on this website, and we will work with you to understand and fix the problem.',
        },
        {
          kind: 'p',
          text: 'This is a promise by Maxwell software solutions, MB about its own website. It does not bind others, such as our service providers, our clients or public authorities, and it does not cover activity outside this policy, for example viewing or keeping other people’s data, harming users or the service, or demanding payment.',
        },
        {
          kind: 'p',
          text: 'If you are not sure whether something is covered, ask first at ' + security + '.',
        },
      ],
    },
    {
      id: 'practice',
      title: 'How we protect data',
      blocks: [
        { kind: 'h3', text: 'On this website' },
        {
          kind: 'ul',
          items: [
            'All traffic is encrypted with HTTPS, and browsers are told to use only HTTPS for the site (HTTP Strict Transport Security, one year, including subdomains).',
            'The site sends security headers: it forbids content-type sniffing, limits what is passed in the referrer, switches off camera, microphone and location access, and restricts embedding in other sites.',
            'The site has no user accounts or payments and keeps no database of visitors. The forms pass what you send to Google (contact form) or Formspree (free audit application), as the [Privacy Policy](/privacy) describes.',
            'The site loads no advertising scripts, and analytics runs only after you accept it.',
          ],
        },
        { kind: 'h3', text: 'With client material' },
        {
          kind: 'ul',
          items: [
            'We work only with the access a client gives us for the project and, where the work allows, ask for read-only access or a sanitised export.',
            'We sign a non-disclosure agreement before we receive code or data.',
            'We keep passwords, keys and tokens out of source code and out of e-mail, and ask clients to share them through a secrets manager or another agreed secure channel.',
            'When a project ends we delete or return client material, except what the law or the contract requires us to keep.',
            'Where we handle personal data for a client, we act as its processor under a data processing agreement (see the [Privacy Policy](/privacy)).',
          ],
        },
        { kind: 'h3', text: 'What we do not claim' },
        {
          kind: 'p',
          text: 'Maxwell Software Solutions is a small company. We do not hold, and do not claim, security certifications such as ISO 27001 or SOC 2, and we publish no penetration-test results or uptime figures. Our providers, such as Google and Vercel, describe their own certifications on their own sites.',
        },
      ],
    },
    {
      id: 'breach',
      title: 'If something goes wrong',
      blocks: [
        {
          kind: 'p',
          text: 'If a personal data breach is likely to put people at risk, we notify the State Data Protection Inspectorate within 72 hours of becoming aware of it, and tell the people affected without undue delay if the risk is high (GDPR Articles 33 and 34). When we act for a client, we tell the client without undue delay. We keep a record of each breach and of what we did about it.',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Contact',
      blocks: [
        {
          kind: 'p',
          text: 'Vulnerability reports: ' + security + '. Anything about personal data: ' + privacy + '. Our [security.txt](/.well-known/security.txt) lists the same contact.',
        },
      ],
    },
  ],
};

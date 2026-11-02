import { COMPANY, LEGAL_UPDATED, VDAI, mail } from './company';
import type { LegalDoc } from './types';

const privacy = mail(COMPANY.emails.privacy);
const general = mail(COMPANY.emails.general);
const office = COMPANY.street + ', ' + COMPANY.city + ', Lithuania';

export const privacyEn: LegalDoc = {
  lang: 'en',
  eyebrow: 'Privacy',
  title: 'Privacy Policy',
  updatedLabel: 'Last updated',
  updated: LEGAL_UPDATED.en,
  intro:
    'What personal data Maxwell software solutions, MB handles through this website, by e-mail and when it writes to companies; why; who receives it; how long it is kept; and what rights you have under the EU General Data Protection Regulation (GDPR) and Lithuanian law.',
  contentsLabel: 'Contents',
  meta: {
    title: 'Privacy Policy',
    description:
      'How Maxwell software solutions, MB handles personal data under the GDPR and Lithuanian law: purposes, legal bases, recipients, retention, cookies and your rights.',
  },
  sections: [
    {
      id: 'short',
      title: 'In short',
      blocks: [
        {
          kind: 'ul',
          items: [
            'We are a small software company in Vilnius. We use personal data to answer you, to run and secure this website, to offer our services to businesses and to carry out our contracts.',
            'We do not sell personal data. This website has no advertising or remarketing tools.',
            'Analytics cookies are set only if you consent. Without your consent no analytics cookies are set and no analytics data is sent to Google.',
            'If we write to your company, you can tell us to stop with one word and we will never write to that address again. See [your right to object to marketing](#object).',
            'Questions, requests and objections: ' + privacy + '. Complaints: the State Data Protection Inspectorate (VDAI), see [Complaints](#complaints).',
          ],
        },
      ],
    },
    {
      id: 'controller',
      title: 'Who is responsible for your data',
      blocks: [
        {
          kind: 'p',
          text: 'In this policy “we”, “us” and “MSS” mean Maxwell software solutions, MB. We are the controller of the personal data described here, except where [we act as a processor for a client](#processor).',
        },
        {
          kind: 'dl',
          rows: [
            { term: 'Controller', def: COMPANY.registerName + ' (mažoji bendrija, a small partnership under Lithuanian law)' },
            { term: 'Company code', def: COMPANY.code + ', registered in the Register of Legal Entities (Juridinių asmenų registras)' },
            { term: 'Registered office', def: office },
            { term: 'Privacy contact', def: privacy + '. Contact person: Mantas Brasiunas, founder.' },
            { term: 'General e-mail', def: general },
            { term: 'Data protection officer', def: 'We have not appointed one. Write to ' + privacy + '.' },
          ],
        },
      ],
    },
    {
      id: 'use',
      title: 'What we use your data for',
      blocks: [
        {
          kind: 'p',
          text: 'The website and our services are meant for businesses. We do not knowingly collect data from children. Cookies are covered in [their own section](#cookies) and marketing e-mails to companies in [If we contact your company](#b2b).',
        },
        { kind: 'h3', id: 'website', text: 'Visiting this website' },
        {
          kind: 'dl',
          rows: [
            { term: 'Data', def: 'Your IP address, the date and time of the request, the pages requested, your browser and device type, the page you came from and the language setting. We do not build visitor profiles from these logs.' },
            { term: 'Source', def: 'Your browser, when it asks our server for a page.' },
            { term: 'Why and legal basis', def: 'To deliver the website and keep it working and secure. Legitimate interests (GDPR Art. 6(1)(f)).' },
            { term: 'Who receives it', def: 'Vercel Inc., which hosts the website for us.' },
          ],
        },
        { kind: 'h3', id: 'enquiries', text: 'Contact form, e-mail and booking a call' },
        {
          kind: 'dl',
          rows: [
            { term: 'Data', def: 'Your name, e-mail address and message, and anything else you choose to tell us. When you book a call: your first and last name, e-mail address and the time you choose. Our e-mails with you.' },
            { term: 'Source', def: 'You.' },
            { term: 'Why and legal basis', def: 'To answer your enquiry, arrange a call and, if you ask, prepare a proposal: steps at your request before a contract (Art. 6(1)(b)). If you write for a company, our legitimate interest in handling business enquiries (Art. 6(1)(f)).' },
            { term: 'Who receives it', def: 'Google, which provides our e-mail, calendar, spreadsheets and the script that receives the contact form (Google Workspace). The form is sent from your browser to a Google Apps Script web app, which e-mails it to us and adds it to a Google Sheet. The booking page is a Google page: [Google’s own privacy policy](https://policies.google.com/privacy) applies to your visit there.' },
            { term: 'Required?', def: 'No, it is voluntary. Without your name, e-mail address and message we cannot reply.' },
          ],
        },
        { kind: 'h3', id: 'audit', text: 'Free audit application' },
        {
          kind: 'dl',
          rows: [
            { term: 'Data', def: 'Your name, work e-mail, company, main technology stack and, if you wish, a description of your concern.' },
            { term: 'Source', def: 'You.' },
            { term: 'Why and legal basis', def: 'To assess your application and, if we accept it, carry out the audit: steps at your request before a contract (Art. 6(1)(b)).' },
            { term: 'Who receives it', def: 'Formspree, Inc. (United States), which receives the form for us and passes it on to us by e-mail.' },
            { term: 'Required?', def: 'No, it is voluntary. Without these details we cannot assess the application.' },
          ],
        },
        { kind: 'h3', id: 'scanner', text: 'Website scanner' },
        {
          kind: 'dl',
          rows: [
            { term: 'Data', def: 'The web address you enter and your IP address.' },
            { term: 'How it works', def: 'Our server (hosted by Vercel) requests the page at that address to check its security headers and the technology it uses. Your browser also asks Google’s PageSpeed Insights service to test the address, so Google receives the address and your IP address and applies its [own privacy policy](https://policies.google.com/privacy). We do not keep the addresses or the results.' },
            { term: 'Why and legal basis', def: 'To give you the check you asked for (Art. 6(1)(b)). Enter only public website addresses and no personal data.' },
          ],
        },
        { kind: 'h3', id: 'clients', text: 'Clients and projects' },
        {
          kind: 'dl',
          rows: [
            { term: 'Data', def: 'Names, work e-mail, telephone and role of our clients’ contacts; proposals, contracts, invoices and payments; project correspondence.' },
            { term: 'Source', def: 'You or your company.' },
            { term: 'Why and legal basis', def: 'To prepare and perform contracts (Art. 6(1)(b); for staff of a client company, our legitimate interest in managing the contract with that company, Art. 6(1)(f)) and to meet legal duties such as accounting and tax rules (Art. 6(1)(c)).' },
            { term: 'Who receives it', def: 'Google (Google Workspace); professional advisers bound by confidentiality, such as an accountant or lawyer, where we use them; public authorities where the law requires.' },
          ],
        },
      ],
    },
    {
      id: 'b2b',
      title: 'If we contact your company',
      blocks: [
        {
          kind: 'p',
          text: 'We offer software development, independent code reviews and extra developer capacity to businesses. Sometimes we send a business e-mail to a company we have not dealt with before. This section is the information GDPR Article 14 requires us to give you when we obtained your details from somewhere other than you. Each of these e-mails links here.',
        },
        {
          kind: 'dl',
          rows: [
            { term: 'Whom we write to', def: 'Companies (legal entities) only. We check the legal form in the Register of Legal Entities first. We do not write to private individuals or to sole traders.' },
            { term: 'Where we found your details', def: 'Your company’s own website, where the address is published; public registers, namely the Register of Legal Entities (Registrų centras) and rekvizitai.lt, for the company’s name, code, legal form and the name of its director; and other public material, such as a news article or interview that we refer to in our message. We do not buy contact lists.' },
            { term: 'Data we hold', def: 'The business e-mail address (which may contain a person’s name); the name and position of the person we address, for example the director; the company’s name and code; the page where we found the address; any public statement we refer to; the date and text of our messages; your reply, if you send one; and your objection, if you make one.' },
            { term: 'What we do', def: 'We write one message ourselves and, at most, one reminder. We use no tracking pixels or link tracking, no purchased lists and no profiling.' },
            { term: 'Legal basis', def: 'Our legitimate interest in offering our services to businesses (GDPR Art. 6(1)(f); recital 47 accepts that direct marketing may be a legitimate interest). Under Article 81 of the Lithuanian [Law on Electronic Communications](https://www.e-tar.lt/portal/lt/legalAct/TAR.82D8168D3049/asr), an e-mail to a legal entity needs no prior consent if every message gives a clear, free and easy way to refuse. Ours do.' },
            { term: 'Who receives it', def: 'Nobody outside MSS, except Google, whose Gmail and Drive host our mailbox and our records of messages and objections. We do not sell or share addresses.' },
            { term: 'How long', def: 'Up to 12 months after our last contact with you. See [How long we keep data](#retention).' },
          ],
        },
        {
          kind: 'note',
          title: 'The balance between our interest and yours, in plain words',
          blocks: [
            {
              kind: 'ul',
              items: [
                '**Our interest:** finding customers for our software services, as any business does.',
                '**Is it necessary?** A short, personal e-mail to the address a company publishes for business enquiries is the least intrusive way to start a business conversation.',
                '**Your interests:** you did not ask for the message. But a company that publishes a business address can expect business proposals. We write about a business matter and, where we can, about something your company said in public. We use little data, keep it for a short time, do not pass it on, and you can stop it at once.',
                '**Our conclusion:** the effect on you is small and the safeguards are strong, so your interests do not override ours. If you see it differently, object and we stop immediately.',
              ],
            },
          ],
        },
        {
          kind: 'p',
          text: 'You can [object at any time](#object). If you do, we put the address on a suppression list and never write to it again.',
        },
      ],
    },
    {
      id: 'object',
      title: 'Your right to object to marketing',
      blocks: [
        {
          kind: 'p',
          text: 'You may object at any time, without giving a reason and free of charge, to our using your details for direct marketing. This right is absolute (GDPR Art. 21(2) and (3)): once you object, we stop and never use your details for marketing again.',
        },
        {
          kind: 'ul',
          items: [
            '**How:** reply to any of our e-mails (the word “no” is enough) or write to ' + privacy + '.',
            '**Who can object:** the head of the company or any employee who uses the address, whether or not the address contains a name.',
            '**What we do:** we stop without undue delay. We keep the address, the company, the date and your message on a suppression list, only as proof that we acted on it and so that we never write again. We use the list for nothing else.',
          ],
        },
        {
          kind: 'p',
          text: 'You can also object, on grounds relating to your particular situation, to any other processing that rests on our legitimate interests (Art. 21(1)). We then stop unless we can show compelling legitimate grounds that override your interests, or need the data for legal claims.',
        },
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies and similar technologies',
      blocks: [
        {
          kind: 'p',
          text: 'Cookies are small files that a website stores on your device. We ask for your consent before using any that are not strictly necessary for something you asked the site to do (GDPR Art. 6(1)(a); Article 73(4) of the Law on Electronic Communications).',
        },
        { kind: 'h3', text: 'Your choice' },
        {
          kind: 'p',
          text: 'Analytics cookies are set only if you accept them in the cookie banner, which Cookiebot provides. If you have not accepted them, or the banner is not shown in your browser, no analytics cookies are set and no analytics data is sent to Google. You can change or withdraw your choice at any time. Withdrawing consent does not affect what was done before.',
        },
        { kind: 'cookieSettings', label: 'Cookie settings', unavailable: 'The cookie banner is not available in your browser right now. No analytics cookies are set unless you have consented.' },
        {
          kind: 'table',
          caption: 'Cookies we use',
          head: ['Name', 'Set by', 'What it does', 'Category', 'Lifetime'],
          rows: [
            ['`language`', 'This website', 'Remembers the language you picked (English or Lithuanian). Set only when you switch language.', 'Necessary', '1 year'],
            ['`CookieConsent`', 'Cookiebot (Usercentrics A/S)', 'Stores your cookie choice.', 'Necessary', '1 year'],
            ['`_ga`, `_ga_Z934MSEFV5`', 'Google Analytics (Google)', 'Tells visitors apart and keeps one visit together, so we can count visits and see which pages are useful. Set only after you accept statistics cookies.', 'Statistics', 'Up to 2 years'],
          ],
        },
        { kind: 'h3', text: 'Other data kept in your browser' },
        {
          kind: 'p',
          text: 'To remember your settings the site also uses your browser’s storage: `language` (the language), `site.theme` (light or dark), `site.heroPaused` (whether you paused the animation on the home page) and, for one browser tab, `has-loaded` (so the loading bar is not repeated). These items stay on your device, hold no identifier and are used only for the feature you use.',
        },
        { kind: 'h3', text: 'What Google Analytics collects' },
        {
          kind: 'p',
          text: 'Page views, the approximate location derived from your IP address, browser and device type, the page you came from, and events such as clicks on buttons and whether a form was sent (never what you wrote). Google states that it does not log or store IP addresses of visitors from the EU. Google processes this data for us as our processor. Event data is kept for no longer than 14 months. We do not use advertising or remarketing features.',
        },
        { kind: 'h3', text: 'What Cookiebot records' },
        {
          kind: 'p',
          text: 'Cookiebot (Usercentrics A/S, Denmark) keeps a consent record so that we can show your choice was respected: a random consent ID, the date and time, your choices and limited technical data such as your browser type and a shortened IP address. Cookiebot deletes it after 12 months. Its privacy policy is at [cookiebot.com](https://www.cookiebot.com/en/privacy-policy/).',
        },
        { kind: 'h3', text: 'Other sites' },
        {
          kind: 'p',
          text: 'If you click through to Google’s booking page, LinkedIn or GitHub, those sites may set their own cookies under their own policies. We do not embed their content on our pages. You can also delete or block cookies in your browser settings.',
        },
      ],
    },
    {
      id: 'processor',
      title: 'When we handle data for a client',
      blocks: [
        {
          kind: 'p',
          text: 'In client projects we may have access to personal data that the client controls, for example users’ data in a system we build or review. Then the client is the controller and we are its processor (GDPR Art. 28). We use that data only on the client’s documented instructions under a written data processing agreement; keep it confidential and secure; use another processor only with the client’s authorisation; help the client answer requests from individuals; tell the client without undue delay if we learn of a personal data breach; and delete or return the data when the project ends.',
        },
        {
          kind: 'p',
          text: 'If your data is in a client’s system, send your request to that client. If you send it to us, we will pass it on to the client.',
        },
      ],
    },
    {
      id: 'recipients',
      title: 'Who receives your data',
      blocks: [
        {
          kind: 'table',
          caption: 'Recipients and processors',
          head: ['Recipient', 'What for', 'Role', 'Where'],
          rows: [
            ['Vercel Inc.', 'Hosting and delivery of this website.', 'Processor', 'United States; delivered through a global network. Our pages are currently generated on servers in Washington, D.C.'],
            ['Google Cloud EMEA Limited (Ireland) and Google LLC (United States)', 'Google Workspace: e-mail, calendar and booking page, documents and spreadsheets, and the script that receives the contact form.', 'Processor', 'EU and other countries, including the United States'],
            ['Google Ireland Limited and Google LLC', 'Google Analytics, only if you consent.', 'Processor', 'EU and United States'],
            ['Usercentrics A/S (Cookiebot)', 'Cookie banner and consent record.', 'Processor', 'Denmark; consent records are hosted in the EU'],
            ['Formspree, Inc.', 'Free audit application form.', 'Processor', 'United States'],
            ['Google', 'PageSpeed Insights, only if you use the website scanner. Google’s own privacy policy applies.', 'Separate controller', 'EU and United States'],
          ],
        },
        {
          kind: 'p',
          text: 'We also share data with professional advisers bound by confidentiality, if we use them, and with public authorities where the law requires. We do not sell personal data and we do not give it to advertisers or data brokers.',
        },
      ],
    },
    {
      id: 'transfers',
      title: 'Transfers outside the EU',
      blocks: [
        {
          kind: 'p',
          text: 'Some providers are in the United States or process data there. Under [Implementing Decision (EU) 2023/1795](https://eur-lex.europa.eu/eli/dec_impl/2023/1795/oj) the European Commission has found that the United States ensures an adequate level of protection for companies certified under the EU–US Data Privacy Framework (GDPR Art. 45).',
        },
        {
          kind: 'ul',
          items: [
            '**Google LLC** and **Vercel Inc.** are certified under the Data Privacy Framework. Their data processing terms also contain the EU Standard Contractual Clauses (Art. 46): [Google](https://cloud.google.com/terms/data-processing-addendum), [Vercel](https://vercel.com/legal/dpa).',
            '**Formspree, Inc.** is not certified under the Data Privacy Framework. It states that it relies on the Standard Contractual Clauses: [formspree.io/security](https://formspree.io/security/).',
            '**Usercentrics A/S (Cookiebot)** is in Denmark and hosts consent records in the EU.',
          ],
        },
        {
          kind: 'p',
          text: 'For a copy of the safeguards, or to see where they are published, write to ' + privacy + '.',
        },
      ],
    },
    {
      id: 'retention',
      title: 'How long we keep data',
      blocks: [
        {
          kind: 'table',
          caption: 'Retention periods',
          head: ['What', 'How long'],
          rows: [
            ['Website server logs (Vercel)', 'Short-lived: Vercel keeps them from about one hour to a few days, depending on the hosting plan.'],
            ['Cookie choice and consent record (Cookiebot)', '12 months. The `CookieConsent` cookie lasts up to 1 year.'],
            ['Analytics data (Google Analytics)', 'No longer than 14 months. The cookies last up to 2 years.'],
            ['Contact-form messages, bookings and e-mail with enquirers', 'Up to 12 months after our last contact with you.'],
            ['Free audit applications', 'Up to 12 months after our last contact with you. Formspree keeps its own copy for the period set by our plan with it.'],
            ['Website scanner', 'Not stored.'],
            ['Business e-mails to companies', 'Up to 12 months after our last contact.'],
            ['Suppression list (objections)', 'Only as long as needed to honour the objection, that is, so that we never write to that address again. Used for nothing else.'],
            ['Clients: contracts, invoices, correspondence', 'For the contract, then for the periods Lithuanian law requires: accounting documents generally 10 years, contracts generally 5 to 10 years after they end.'],
            ['Anything needed for a legal claim', 'Until the claim is settled and the time for bringing claims has passed.'],
          ],
        },
        {
          kind: 'p',
          text: 'When a period ends we delete the data or make it anonymous.',
        },
      ],
    },
    {
      id: 'rights',
      title: 'Your rights',
      blocks: [
        {
          kind: 'ul',
          items: [
            '**Access** (Art. 15): confirmation that we process your data, a copy and the information in this policy.',
            '**Rectification** (Art. 16): correction of inaccurate or incomplete data.',
            '**Erasure** (Art. 17): deletion where the law gives you that right. If you have objected to marketing, we keep only the suppression-list entry, so that we can honour your objection.',
            '**Restriction** (Art. 18): to limit how we use your data in the cases the law lists.',
            '**Portability** (Art. 20): the data you gave us, where we process it by automated means on the basis of consent or a contract, in a common format.',
            '**Objection** (Art. 21): to marketing at any time, and to processing based on legitimate interests; see [your right to object](#object).',
            '**Withdrawal of consent** (Art. 7(3)): at any time, for example in the cookie settings.',
            '**Complaint** (Art. 77): to a supervisory authority; see [Complaints](#complaints).',
          ],
        },
        {
          kind: 'p',
          text: 'To use a right, write to ' + privacy + '. We may ask you to confirm who you are. We answer within one month; for complex or numerous requests we may extend this by up to two months and will tell you why. It is free; if a request is manifestly unfounded or excessive we may charge a reasonable fee or refuse, and we will explain.',
        },
      ],
    },
    {
      id: 'automated',
      title: 'Automated decisions',
      blocks: [
        {
          kind: 'p',
          text: 'We do not take decisions about you based solely on automated processing, including profiling, that have legal or similarly significant effects (GDPR Art. 22).',
        },
      ],
    },
    {
      id: 'security',
      title: 'Security of your data',
      blocks: [
        {
          kind: 'p',
          text: 'We protect personal data with technical and organisational measures that fit the risk; see our [Security page](/security). If a personal data breach is likely to put individuals at risk, we notify the supervisory authority within 72 hours, and tell the people affected without undue delay if the risk is high (Art. 33 and 34).',
        },
      ],
    },
    {
      id: 'complaints',
      title: 'Complaints',
      blocks: [
        {
          kind: 'p',
          text: 'We would like to hear from you first, but you do not have to contact us before complaining. You may complain to the supervisory authority in Lithuania, or in the EU country where you live or work, and you may go to court.',
        },
        {
          kind: 'dl',
          rows: [
            { term: 'Authority', def: 'State Data Protection Inspectorate (Valstybinė duomenų apsaugos inspekcija, VDAI)' },
            { term: 'Address', def: VDAI.address + ', Lithuania' },
            { term: 'Telephone', def: VDAI.phone },
            { term: 'E-mail', def: mail(VDAI.email) },
            { term: 'Website', def: '[vdai.lrv.lt](https://vdai.lrv.lt/en/)' },
          ],
        },
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      blocks: [
        {
          kind: 'p',
          text: 'We update this policy when our practices or the law change. The date at the top shows the current version. If a change affects you materially, we will say so on this page. Earlier versions are available on request.',
        },
      ],
    },
  ],
};

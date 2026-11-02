import { COMPANY, LEGAL_UPDATED, mail } from './company';
import type { LegalDoc } from './types';

const security = mail(COMPANY.emails.security);
const privacy = mail(COMPANY.emails.privacy);

export const securityLt: LegalDoc = {
  lang: 'lt',
  eyebrow: 'Atsakingas atskleidimas',
  title: 'Sauga',
  updatedLabel: 'Paskutinį kartą atnaujinta',
  updated: LEGAL_UPDATED.lt,
  intro:
    'Kaip pranešti mums apie saugumo problemą, ko galite tikėtis mainais ir kaip saugome duomenis.',
  contentsLabel: 'Turinys',
  meta: {
    title: 'Sauga',
    description:
      'Kaip pranešti Maxwell software solutions, MB apie spragą, ko tikėtis, apsauga sąžiningiems tyrėjams ir kaip saugome duomenis.',
  },
  sections: [
    {
      id: 'report',
      title: 'Kaip pranešti apie spragą',
      blocks: [
        {
          kind: 'p',
          text: 'Jei manote radę saugumo problemą šioje svetainėje, rašykite adresu ' + security + ' ir pateikite pakankamai informacijos, kad galėtume ją atkartoti: paveiktą puslapį ar adresą, ką darėte, kas įvyko ir, jei turite, koncepcijos įrodymą (angl. proof of concept). Pakanka paprasto teksto. Tas pats adresas nurodytas mūsų faile [security.txt](/.well-known/security.txt).',
        },
      ],
    },
    {
      id: 'scope',
      title: 'Kas įeina į apimtį',
      blocks: [
        {
          kind: 'p',
          text: 'Į apimtį įeina svetainė www.maxwellsoftwaresolutions.com, jos puslapiai ir formos bei joje esantys įrankiai, pavyzdžiui, svetainės skeneris.',
        },
        {
          kind: 'p',
          text: 'Į apimtį neįeina, todėl apie tai praneškite jų savininkams: mūsų naudojamos trečiųjų šalių paslaugos (Google, Vercel, Cookiebot, Formspree), mūsų klientų sistemos ir viskas, kas nėra mūsų.',
        },
        {
          kind: 'p',
          text: 'Apie šiuos dalykus pranešti nereikia, nes patys savaime jie saugumo požiūriu nieko nekeičia:',
        },
        {
          kind: 'ul',
          items: [
            'automatinių skenerių rezultatai, kurių poveikis neįrodytas;',
            'trūkstamos ar kitokios HTTP antraštės ar slapukų žymos, kai nėra įrodyto išnaudojimo būdo;',
            'paslaugos trikdymo, didelės apkrovos ar užklausų dažnio ribojimo bandymai;',
            'šlamštas ar automatinis masinis formų siuntimas;',
            'socialinė inžinerija, sukčiavimas (angl. phishing) ar fizinės atakos prieš darbuotojus, patalpas ar įrenginius;',
            'spragos, kurioms išnaudoti reikia jau pažeisto įrenginio ar naršyklės.',
          ],
        },
      ],
    },
    {
      id: 'rules',
      title: 'Kaip saugiai testuoti',
      blocks: [
        {
          kind: 'ul',
          items: [
            'Veikite sąžiningai ir testuokite tik į apimtį įeinančią svetainę.',
            'Naudokite tik tuos duomenis, kurių reikia problemai parodyti. Neperžiūrėkite, nekeiskite, netrinkite ir nesaugokite kitų žmonių duomenų ir sustokite, kai tik problemą parodėte.',
            'Netrikdykite paslaugos veikimo: jokių paslaugos trikdymo atakų ir apkrovos testų.',
            'Nenaudokite socialinės inžinerijos, sukčiavimo ar fizinių atakų.',
            'Informaciją laikykite privačią, kol ištaisysime problemą arba praeis 90 dienų nuo jūsų pranešimo, atsižvelgiant į tai, kas įvyks anksčiau. Pasakykite mums, jei ketinate skelbti.',
            'Nereikalaukite apmokėjimo: neturime atlygio už rastas spragas programos ir atlygio nemokame.',
          ],
        },
      ],
    },
    {
      id: 'expect',
      title: 'Ko galite tikėtis iš mūsų',
      blocks: [
        {
          kind: 'ul',
          items: [
            'Pranešimo gavimą patvirtiname per 5 darbo dienas.',
            'Įvertiname jį, pasakome, ar pripažįstame tai spraga, ir informuojame apie eigą.',
            'Pagrįstas problemas taisome taip greitai, kaip leidžia jų svarba ir mūsų dydis, ir pranešame, kai tai padaryta.',
            'Jei norite, ištaisę problemą paminėsime jus vardu. Pasakykite, kaip jus nurodyti, arba kad nenorite būti minimi.',
            'Jūsų pranešimą ir kontaktinius duomenis laikome konfidencialiais ir naudojame tik pranešimui nagrinėti.',
          ],
        },
      ],
    },
    {
      id: 'safe-harbour',
      title: 'Apsauga sąžiningiems tyrėjams',
      blocks: [
        {
          kind: 'p',
          text: 'Jei veikiate sąžiningai ir laikotės šios tvarkos, dėl savo tyrimo šioje svetainėje nesikreipsime į teismą ir nepranešime apie jus teisėsaugos institucijoms, o kartu su jumis stengsimės suprasti ir ištaisyti problemą.',
        },
        {
          kind: 'p',
          text: 'Tai Maxwell software solutions, MB pažadas dėl jos pačios svetainės. Jis nesaisto kitų, pavyzdžiui, mūsų paslaugų teikėjų, klientų ar valstybės institucijų, ir neapima veiksmų, kurie nepatenka į šią tvarką, pavyzdžiui, kitų žmonių duomenų peržiūros ar saugojimo, žalos naudotojams ar paslaugai darymo arba apmokėjimo reikalavimo.',
        },
        {
          kind: 'p',
          text: 'Jei nesate tikri, ar kas nors patenka į šią tvarką, pirmiausia paklauskite adresu ' + security + '.',
        },
      ],
    },
    {
      id: 'practice',
      title: 'Kaip saugome duomenis',
      blocks: [
        { kind: 'h3', text: 'Šioje svetainėje' },
        {
          kind: 'ul',
          items: [
            'Visas srautas šifruojamas naudojant HTTPS, o naršyklėms nurodoma svetainę naudoti tik per HTTPS (HTTP Strict Transport Security, vieneri metai, įskaitant subdomenus).',
            'Svetainė siunčia saugumo antraštes: draudžia nuspėti turinio tipą, riboja nukreipiančiojo puslapio informacijos perdavimą, išjungia prieigą prie kameros, mikrofono ir vietos duomenų ir riboja įterpimą į kitas svetaines.',
            'Svetainėje nėra naudotojų paskyrų ar mokėjimų, o lankytojų duomenų bazės nelaikome. Formos perduoda tai, ką siunčiate, Google (kontaktų forma) arba Formspree (prašymas dėl nemokamo audito), kaip aprašyta [Privatumo politikoje](/privacy).',
            'Svetainė neįkelia reklaminių scenarijų, o analitika veikia tik jums sutikus.',
          ],
        },
        { kind: 'h3', text: 'Dirbant su kliento medžiaga' },
        {
          kind: 'ul',
          items: [
            'Dirbame tik su ta prieiga, kurią klientas suteikia projektui, ir, kai darbas leidžia, prašome prieigos tik skaityti arba išvalytų duomenų eksporto.',
            'Prieš gaudami kodą ar duomenis pasirašome konfidencialumo sutartį.',
            'Slaptažodžių, raktų ir prieigos žetonų nelaikome šaltinio kode ir nesiunčiame el. paštu, o klientų prašome jais dalytis per paslapčių tvarkyklę ar kitą sutartą saugų kanalą.',
            'Projektui pasibaigus kliento medžiagą ištriname arba grąžiname, išskyrus tai, ką privalome saugoti pagal teisės aktus ar sutartį.',
            'Kai klientui tvarkome asmens duomenis, veikiame kaip jo duomenų tvarkytojas pagal duomenų tvarkymo sutartį (žr. [Privatumo politiką](/privacy)).',
          ],
        },
        { kind: 'h3', text: 'Ko neteigiame' },
        {
          kind: 'p',
          text: 'Maxwell Software Solutions yra maža bendrovė. Neturime ir neteigiame turintys saugumo sertifikatų, pavyzdžiui, ISO 27001 ar SOC 2, ir neskelbiame skverbties testų rezultatų ar veikimo laiko skaičių. Savo sertifikatus aprašo mūsų teikėjai, pavyzdžiui, Google ir Vercel, savo svetainėse.',
        },
      ],
    },
    {
      id: 'breach',
      title: 'Jei kas nors nutinka',
      blocks: [
        {
          kind: 'p',
          text: 'Jei asmens duomenų saugumo pažeidimas gali sukelti pavojų žmonėms, per 72 valandas nuo sužinojimo apie jį pranešame Valstybinei duomenų apsaugos inspekcijai, o jei pavojus didelis, nepagrįstai nedelsdami pranešame ir paveiktiems asmenims (BDAR 33 ir 34 straipsniai). Kai veikiame kliento vardu, nepagrįstai nedelsdami pranešame klientui. Registruojame kiekvieną pažeidimą ir tai, ką dėl jo padarėme.',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Kontaktai',
      blocks: [
        {
          kind: 'p',
          text: 'Pranešimai apie spragas: ' + security + '. Viskas, kas susiję su asmens duomenimis: ' + privacy + '. Tą patį kontaktą nurodo mūsų [security.txt](/.well-known/security.txt).',
        },
      ],
    },
  ],
};

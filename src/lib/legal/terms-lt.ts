import { COMPANY, LEGAL_UPDATED, mail } from './company';
import type { LegalDoc } from './types';

const legal = mail(COMPANY.emails.legal);
const office = COMPANY.street + ', ' + COMPANY.city + ', Lietuva';

export const termsLt: LegalDoc = {
  lang: 'lt',
  eyebrow: 'Sąlygos',
  title: 'Svetainės naudojimo sąlygos',
  updatedLabel: 'Paskutinį kartą atnaujinta',
  updated: LEGAL_UPDATED.lt,
  intro:
    'Svetainės naudojimo taisyklės, kas ją valdo ir kaip šios sąlygos susijusios su projektų darbais, kuriems taikomos atskiros rašytinės sutartys.',
  contentsLabel: 'Turinys',
  meta: {
    title: 'Svetainės naudojimo sąlygos',
    description:
      'Kas valdo Maxwell Software Solutions svetainę ir jos naudojimo sąlygos: intelektinė nuosavybė, atsakomybės apribojimas, Lietuvos teisė ir teismai.',
  },
  sections: [
    {
      id: 'provider',
      title: 'Paslaugų teikėjo informacija',
      blocks: [
        {
          kind: 'p',
          text: 'Svetainę www.maxwellsoftwaresolutions.com valdo toliau nurodyta bendrovė. Tai informacija, kurią pagal Lietuvos [Informacinės visuomenės paslaugų įstatymo](https://www.e-tar.lt/portal/lt/legalAct/TAR.8A719A97956F/asr) 6 straipsnį ir ES [Elektroninės komercijos direktyvos](https://eur-lex.europa.eu/eli/dir/2000/31/oj) (2000/31/EB) 5 straipsnį privalome pateikti taip, kad ją būtų lengva rasti.',
        },
        {
          kind: 'dl',
          rows: [
            { term: 'Paslaugų teikėjas', def: COMPANY.registerName + ' (mažoji bendrija)' },
            { term: 'Įmonės kodas', def: COMPANY.code },
            { term: 'Registras', def: 'Lietuvos Respublikos juridinių asmenų registras, kurį tvarko VĮ Registrų centras' },
            { term: 'Buveinė', def: office },
            { term: 'El. paštas', def: mail(COMPANY.emails.general) },
            { term: 'Telefonas', def: COMPANY.phoneDisplay },
            { term: 'Teisiniai pranešimai', def: legal },
            { term: 'Privatumas', def: mail(COMPANY.emails.privacy) + ' (žr. [Privatumo politiką](/privacy))' },
            { term: 'Pranešimai apie saugumo spragas', def: mail(COMPANY.emails.security) + ' (žr. [Saugumo puslapį](/security))' },
            { term: 'PVM', def: 'Pridėtinės vertės mokesčio (PVM) mokėtoja nesame.' },
            { term: 'Kainos', def: 'Eurais. Kadangi PVM mokėtoja nesame, svetainėje nurodytose kainose PVM nėra.' },
          ],
        },
      ],
    },
    {
      id: 'scope',
      title: 'Taikymo sritis ir sutikimas',
      blocks: [
        {
          kind: 'p',
          text: 'Šios sąlygos taikomos jūsų naudojimuisi www.maxwellsoftwaresolutions.com ir jos puslapiais (toliau – svetainė). Naudodamiesi svetaine sutinkate su šiomis sąlygomis. Jei nesutinkate, svetaine nesinaudokite.',
        },
        {
          kind: 'p',
          text: 'Šios sąlygos nėra pasiūlymas sudaryti sutartį. Svetainėje pateiktos kainos, paketai, atvejų aprašymai ir kita informacija yra tik informacinio pobūdžio ir mus saisto tik tada, jei juos patvirtiname rašytine sutartimi.',
        },
      ],
    },
    {
      id: 'projects',
      title: 'Paslaugos ir projektų darbai',
      blocks: [
        {
          kind: 'p',
          text: 'Programinės įrangos kūrimo, kodo peržiūros ir konsultavimo paslaugas teikiame pagal atskiras rašytines sutartis (pasiūlymą, darbų užduotį ar sutartį) su kiekvienu klientu. Paslaugoms, atlygiui, rezultatų intelektinei nuosavybei ir kiekvienos šalies atsakomybei taikomos tos sutartys, o ne šios sąlygos. Jei sutartis nesutampa su šiomis sąlygomis, viršesnė yra sutartis.',
        },
        {
          kind: 'p',
          text: 'Niekas svetainėje nesukuria santykių su klientu, o per svetainę išsiųsta užklausa sutarties nesudaro.',
        },
      ],
    },
    {
      id: 'use',
      title: 'Naudojimasis svetaine',
      blocks: [
        {
          kind: 'p',
          text: 'Galite naršyti svetainėje ir pateikti nuorodas į jos viešus puslapius. Sutinkate nedaryti nieko iš to, kas nurodyta toliau:',
        },
        {
          kind: 'ul',
          items: [
            'naudotis svetaine neteisėtai ar siekiant kam nors pakenkti;',
            'bandyti be leidimo patekti į svetainę, mūsų sistemas ar kitų naudotojų duomenis arba ieškoti ar tikrinti spragų, išskyrus sąžiningai teikiamus pranešimus apie spragas, kuriuos leidžia mūsų [Saugumo puslapis](/security);',
            'perkrauti ar trikdyti svetainę arba automatiškai rinkti jos turinį taip, kad ji būtų apkraunama ar būtų ignoruojamos mūsų robots.txt taisyklės;',
            'diegti kenkėjišką kodą arba siųsti formas netikru vardu, kaip šlamštą ar su turiniu, kurio neturite teisės siųsti;',
            'naudoti svetainės skenerį svetainėms, kurių neturite ir kurių tikrinti nesate įgalioti.',
          ],
        },
        {
          kind: 'p',
          text: 'Prieigą, pažeidžiančią šias taisykles, galime užblokuoti.',
        },
      ],
    },
    {
      id: 'information',
      title: 'Svetainėje pateikiama informacija',
      blocks: [
        {
          kind: 'p',
          text: 'Turinys, įskaitant straipsnius, atvejų analizes, paslaugų aprašymus ir svetainės skenerio rezultatus, yra bendro pobūdžio informacija, o ne profesionali konsultacija jūsų konkrečiu atveju. Stengiamės, kad ji būtų tiksli ir aktuali, tačiau joje gali būti klaidų arba ji gali pasenti. Prieš remdamiesi ja priimdami sprendimą, pasitarkite su mumis.',
        },
      ],
    },
    {
      id: 'ip',
      title: 'Intelektinė nuosavybė',
      blocks: [
        {
          kind: 'p',
          text: 'Svetainės turinys ir dizainas, t. y. tekstai, grafika, logotipai, maketas ir programinė įranga, priklauso Maxwell software solutions, MB arba jos licencijų davėjams ir yra saugomi pagal Lietuvos ir ES autorių teisės aktus. Maxwell Software Solutions pavadinimas ir logotipas yra mūsų; kiti be mūsų rašytinio leidimo jų naudoti negali.',
        },
        {
          kind: 'p',
          text: 'Galite peržiūrėti svetainę, atsispausdinti ar išsaugoti kopiją savo verslo informacijai ir cituoti trumpas ištraukas aiškiai nurodydami autorių ir pateikdami nuorodą į šaltinį. Bet kokiam kitam naudojimui, pavyzdžiui, kopijavimui, perpublikavimui, platinimui, adaptavimui ar komerciniam pakartotiniam naudojimui, reikia išankstinio mūsų rašytinio leidimo, išskyrus atvejus, kai tai leidžia teisė.',
        },
        {
          kind: 'p',
          text: 'Atvirojo kodo programinei įrangai ir trečiųjų šalių medžiagai, esančiai svetainėje arba pasiekiamai per jos nuorodas, taikomos jų pačių licencijos.',
        },
        {
          kind: 'p',
          text: 'Tai, ką mums atsiunčiate, pavyzdžiui, žinutė per kontaktų formą, lieka jūsų. Leidžiate mums tai naudoti atsakymui į jūsų užklausą ir, jei prašote, pasiūlymui parengti.',
        },
      ],
    },
    {
      id: 'links',
      title: 'Nuorodos ir trečiųjų šalių paslaugos',
      blocks: [
        {
          kind: 'p',
          text: 'Svetainėje yra nuorodų į kitas svetaines ir paslaugas, pavyzdžiui, į Google Calendar skambučiams rezervuoti, LinkedIn ir GitHub, o formoms naudojame tokias paslaugas kaip Formspree. Jas valdo kiti asmenys pagal savo sąlygas ir privatumo politiką. Mes jų nekontroliuojame ir neatsakome už jų turinį ar veiklą. Tai neriboja mūsų atsakomybės už savo paties pasirinktų teikėjų naudojimą, kuris aprašytas [Privatumo politikoje](/privacy).',
        },
      ],
    },
    {
      id: 'availability',
      title: 'Prieinamumas ir svetainės pakeitimai',
      blocks: [
        {
          kind: 'p',
          text: 'Svetainę valdome deramai rūpestingai, tačiau teikiame ją tokią, kokia yra, ir tada, kai ji pasiekiama, neįsipareigodami, kad ji veiks be pertrūkių ar be klaidų. Bet kurią svetainės dalį galime bet kada pakeisti, sustabdyti ar pašalinti.',
        },
      ],
    },
    {
      id: 'liability',
      title: 'Atsakomybės apribojimas',
      blocks: [
        {
          kind: 'p',
          text: 'Jokia šių sąlygų nuostata nepašalina ir neapriboja atsakomybės, kurios pagal Lietuvos teisę pašalinti ar apriboti neleidžiama. Tai apima atsakomybę už žalą, padarytą tyčia ar dėl didelio neatsargumo, už sveikatos sužalojimą ar gyvybės atėmimą ir už neturtinę žalą (Civilinio kodekso 6.252 straipsnis), taip pat jūsų, kaip vartotojo, teises pagal imperatyviąsias teisės normas.',
        },
        {
          kind: 'p',
          text: 'Nepažeidžiant to, kas pasakyta pirmiau, ir tiek, kiek leidžia teisė, kadangi svetainė nemokama ir informacinė:',
        },
        {
          kind: 'ul',
          items: [
            'neatsakome už netiesioginius ar šalutinius nuostolius, negautas pajamas ar prarastus duomenis, atsiradusius dėl jūsų naudojimosi svetaine ar pasitikėjimo jos turiniu; ir',
            'bendra mūsų atsakomybė jums už visus reikalavimus, susijusius su jūsų naudojimusi svetaine, ribojama 100 eurų suma.',
          ],
        },
        {
          kind: 'p',
          text: 'Niekas čia neriboja jūsų duomenų apsaugos teisių, įskaitant teisę į kompensaciją pagal BDAR 82 straipsnį. Atsakomybė už projektų darbus nustatoma tų darbų rašytine sutartimi.',
        },
      ],
    },
    {
      id: 'privacy',
      title: 'Privatumas, slapukai ir saugumas',
      blocks: [
        {
          kind: 'p',
          text: 'Kaip tvarkome asmens duomenis ir slapukus, aprašyta mūsų [Privatumo politikoje](/privacy). Kaip pranešti apie saugumo spragą ir ką mes už tai pažadame, aprašyta mūsų [Saugumo puslapyje](/security).',
        },
      ],
    },
    {
      id: 'changes',
      title: 'Šių sąlygų pakeitimai',
      blocks: [
        {
          kind: 'p',
          text: 'Šias sąlygas galime atnaujinti, pavyzdžiui, kai keičiasi svetainė ar teisė. Viršuje nurodyta data rodo galiojančią redakciją, o nauja redakcija taikoma nuo nurodytos datos. Toliau naudodamiesi svetaine po pakeitimo sutinkate su nauja redakcija; jei nesutinkate, svetaine nebesinaudokite. Nauja redakcija nekeičia jau sudarytų sutarčių, pavyzdžiui, projektų sutarčių, ar jau įgytų teisių.',
        },
      ],
    },
    {
      id: 'law',
      title: 'Taikytina teisė ir ginčai',
      blocks: [
        {
          kind: 'p',
          text: 'Šioms sąlygoms ir bet kokiam ginčui dėl jūsų naudojimosi svetaine taikoma Lietuvos Respublikos teisė.',
        },
        {
          kind: 'p',
          text: 'Ginčus nagrinėja Lietuvos Respublikos teismai pagal jurisdikcijos taisykles. Nė viena čia nurodyta nuostata neatima jūsų teisių pagal imperatyviąsias teisės normas: pavyzdžiui, vartotojas išsaugo teisę kreiptis į teismą ir remtis imperatyviosiomis vartotojų apsaugos normomis ES valstybėje, kurioje gyvena, o jūsų duomenų apsaugos teisės lieka tokios, kaip aprašyta [Privatumo politikoje](/privacy).',
        },
        {
          kind: 'p',
          text: 'Jei kilo problema, pirmiausia parašykite adresu ' + legal + ': norėtume ją išspręsti tiesiogiai. Jei esate vartotojas, taip pat galite kreiptis į Valstybinę vartotojų teisių apsaugos tarnybą ([vvtat.lrv.lt](https://vvtat.lrv.lt/)).',
        },
      ],
    },
    {
      id: 'general',
      title: 'Bendrosios nuostatos',
      blocks: [
        {
          kind: 'p',
          text: 'Jei kuri nors šių sąlygų dalis negalioja arba jos negalima priverstinai įgyvendinti, likusi dalis lieka galioti. Tai, kad nesinaudojame kuria nors teise, nereiškia, kad jos atsisakome.',
        },
        {
          kind: 'p',
          text: 'Šios sąlygos paskelbtos lietuvių ir anglų kalbomis ir turi reikšti tą patį. Jei pastebėsite skirtumą, praneškite mums adresu ' + legal + ', ir mes jį ištaisysime.',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Kontaktai',
      blocks: [
        {
          kind: 'p',
          text: 'Klausimai dėl šių sąlygų: ' + legal + '.',
        },
      ],
    },
  ],
};

import { COMPANY, LEGAL_UPDATED, VDAI, mail } from './company';
import type { LegalDoc } from './types';

const privacy = mail(COMPANY.emails.privacy);
const general = mail(COMPANY.emails.general);
const office = COMPANY.street + ', ' + COMPANY.city + ', Lietuva';

export const privacyLt: LegalDoc = {
  lang: 'lt',
  eyebrow: 'Privatumas',
  title: 'Privatumo politika',
  updatedLabel: 'Paskutinį kartą atnaujinta',
  updated: LEGAL_UPDATED.lt,
  intro:
    'Kokius asmens duomenis Maxwell software solutions, MB tvarko per šią svetainę, el. paštu ir rašydama įmonėms; kodėl; kas juos gauna; kiek laiko jie saugomi; ir kokias teises jums suteikia ES Bendrasis duomenų apsaugos reglamentas (BDAR) bei Lietuvos teisė.',
  contentsLabel: 'Turinys',
  meta: {
    title: 'Privatumo politika',
    description:
      'Kaip Maxwell software solutions, MB tvarko asmens duomenis pagal BDAR ir Lietuvos teisę: tikslai, teisiniai pagrindai, gavėjai, saugojimo terminai, slapukai ir jūsų teisės.',
  },
  sections: [
    {
      id: 'short',
      title: 'Trumpai',
      blocks: [
        {
          kind: 'ul',
          items: [
            'Esame maža programinės įrangos bendrovė Vilniuje. Asmens duomenis naudojame tam, kad jums atsakytume, valdytume ir saugotume šią svetainę, siūlytume paslaugas įmonėms ir vykdytume sutartis.',
            'Asmens duomenų neparduodame. Šioje svetainėje nėra reklaminių ar pakartotinės rinkodaros priemonių.',
            'Analitiniai slapukai nustatomi tik gavus jūsų sutikimą. Be sutikimo analitinių slapukų nenustatome ir analitikos duomenų Google nesiunčiame.',
            'Jei rašome jūsų įmonei, vienu žodžiu galite pasakyti, kad nebenorite gauti laiškų, ir mes daugiau niekada nerašysime tuo adresu. Žr. [teisę nesutikti su rinkodara](#object).',
            'Klausimai, prašymai ir nesutikimai: ' + privacy + '. Skundai: Valstybinė duomenų apsaugos inspekcija (VDAI), žr. skyrių [Skundai](#complaints).',
          ],
        },
      ],
    },
    {
      id: 'controller',
      title: 'Kas atsako už jūsų duomenis',
      blocks: [
        {
          kind: 'p',
          text: 'Šioje politikoje „mes“ ir „MSS“ reiškia Maxwell software solutions, MB. Esame čia aprašomų asmens duomenų valdytojas, išskyrus atvejus, kai [kliento vardu veikiame kaip duomenų tvarkytojas](#processor).',
        },
        {
          kind: 'dl',
          rows: [
            { term: 'Duomenų valdytojas', def: COMPANY.registerName + ' (mažoji bendrija)' },
            { term: 'Įmonės kodas', def: COMPANY.code + ', įregistruota Juridinių asmenų registre' },
            { term: 'Buveinė', def: office },
            { term: 'Kontaktai privatumo klausimais', def: privacy + '. Kontaktinis asmuo: Mantas Brasiūnas, steigėjas.' },
            { term: 'Bendrasis el. paštas', def: general },
            { term: 'Duomenų apsaugos pareigūnas', def: 'Jo nepaskyrėme. Rašykite adresu ' + privacy + '.' },
          ],
        },
      ],
    },
    {
      id: 'use',
      title: 'Kam naudojame jūsų duomenis',
      blocks: [
        {
          kind: 'p',
          text: 'Svetainė ir mūsų paslaugos skirtos verslui. Sąmoningai nerenkame vaikų duomenų. Slapukai aprašyti [atskirame skyriuje](#cookies), o rinkodaros laiškai įmonėms – skyriuje [Jei rašome jūsų įmonei](#b2b).',
        },
        { kind: 'h3', id: 'website', text: 'Apsilankymas svetainėje' },
        {
          kind: 'dl',
          rows: [
            { term: 'Duomenys', def: 'Jūsų IP adresas, užklausos data ir laikas, užklausti puslapiai, naršyklės ir įrenginio tipas, puslapis, iš kurio atėjote, ir kalbos nustatymas. Iš šių žurnalų nesudarome lankytojų profilių.' },
            { term: 'Šaltinis', def: 'Jūsų naršyklė, kai ji prašo mūsų serverio puslapio.' },
            { term: 'Kodėl ir teisinis pagrindas', def: 'Kad svetainė veiktų, būtų patikima ir saugi. Teisėtas interesas (BDAR 6 straipsnio 1 dalies f punktas).' },
            { term: 'Kas gauna', def: 'Vercel Inc., kuri mums talpina svetainę.' },
          ],
        },
        { kind: 'h3', id: 'enquiries', text: 'Kontaktų forma, el. paštas ir pokalbio rezervavimas' },
        {
          kind: 'dl',
          rows: [
            { term: 'Duomenys', def: 'Jūsų vardas ir pavardė, el. pašto adresas ir žinutė bei viskas, ką nuspręsite mums pranešti. Rezervuodami skambutį: vardas, pavardė, el. pašto adresas ir pasirinktas laikas. Mūsų el. laiškai su jumis.' },
            { term: 'Šaltinis', def: 'Jūs.' },
            { term: 'Kodėl ir teisinis pagrindas', def: 'Kad atsakytume į jūsų užklausą, suderintume skambutį ir, jei prašysite, parengtume pasiūlymą: veiksmai jūsų prašymu prieš sudarant sutartį (6 straipsnio 1 dalies b punktas). Jei rašote įmonės vardu – mūsų teisėtas interesas nagrinėti verslo užklausas (6 straipsnio 1 dalies f punktas).' },
            { term: 'Kas gauna', def: 'Google, kuri teikia mūsų el. paštą, kalendorių, skaičiuokles ir kontaktų formą priimantį scenarijų (Google Workspace). Forma iš jūsų naršyklės siunčiama į Google Apps Script žiniatinklio programą, kuri persiunčia ją mums el. paštu ir įrašo į Google Sheets lentelę. Rezervavimo puslapis yra Google puslapis: jame lankantis taikoma [pačios Google privatumo politika](https://policies.google.com/privacy?hl=lt).' },
            { term: 'Ar privaloma pateikti', def: 'Ne, tai savanoriška. Be vardo, el. pašto adreso ir žinutės negalėtume atsakyti.' },
          ],
        },
        { kind: 'h3', id: 'audit', text: 'Prašymas dėl nemokamo audito' },
        {
          kind: 'dl',
          rows: [
            { term: 'Duomenys', def: 'Jūsų vardas ir pavardė, darbo el. paštas, įmonė, pagrindinė technologijų aplinka ir, jei norite, jūsų rūpesčio aprašymas.' },
            { term: 'Šaltinis', def: 'Jūs.' },
            { term: 'Kodėl ir teisinis pagrindas', def: 'Kad įvertintume jūsų prašymą ir, jei jį patenkintume, atliktume auditą: veiksmai jūsų prašymu prieš sudarant sutartį (6 straipsnio 1 dalies b punktas).' },
            { term: 'Kas gauna', def: 'Formspree, Inc. (Jungtinės Amerikos Valstijos), kuri priima formą mūsų vardu ir persiunčia mums el. paštu.' },
            { term: 'Ar privaloma pateikti', def: 'Ne, tai savanoriška. Be šių duomenų negalėtume įvertinti prašymo.' },
          ],
        },
        { kind: 'h3', id: 'scanner', text: 'Svetainės skeneris' },
        {
          kind: 'dl',
          rows: [
            { term: 'Duomenys', def: 'Jūsų įvestas svetainės adresas ir jūsų IP adresas.' },
            { term: 'Kaip tai veikia', def: 'Mūsų serveris (talpinamas Vercel) pateikia užklausą tuo adresu esančiam puslapiui, kad patikrintų jo saugumo antraštes ir naudojamas technologijas. Jūsų naršyklė taip pat prašo Google paslaugos PageSpeed Insights patikrinti adresą, todėl Google gauna adresą ir jūsų IP adresą ir taiko [savo privatumo politiką](https://policies.google.com/privacy?hl=lt). Adresų ir rezultatų nesaugome.' },
            { term: 'Kodėl ir teisinis pagrindas', def: 'Kad atliktume jūsų prašomą patikrą (6 straipsnio 1 dalies b punktas). Įveskite tik viešus svetainių adresus ir jokių asmens duomenų.' },
          ],
        },
        { kind: 'h3', id: 'clients', text: 'Klientai ir projektai' },
        {
          kind: 'dl',
          rows: [
            { term: 'Duomenys', def: 'Klientų kontaktinių asmenų vardai ir pavardės, darbo el. paštas, telefonas ir pareigos; pasiūlymai, sutartys, sąskaitos ir mokėjimai; susirašinėjimas projektų klausimais.' },
            { term: 'Šaltinis', def: 'Jūs arba jūsų įmonė.' },
            { term: 'Kodėl ir teisinis pagrindas', def: 'Kad parengtume ir vykdytume sutartis (6 straipsnio 1 dalies b punktas; kliento įmonės darbuotojų atveju – mūsų teisėtas interesas valdyti sutartį su ta įmone, 6 straipsnio 1 dalies f punktas) ir vykdytume teisines pareigas, pavyzdžiui, apskaitos ir mokesčių taisykles (6 straipsnio 1 dalies c punktas).' },
            { term: 'Kas gauna', def: 'Google (Google Workspace); profesionalūs konsultantai, saugantys konfidencialumą, pavyzdžiui, buhalteris ar teisininkas, jei jais naudojamės; valdžios institucijos, kai to reikalauja teisės aktai.' },
          ],
        },
      ],
    },
    {
      id: 'b2b',
      title: 'Jei rašome jūsų įmonei',
      blocks: [
        {
          kind: 'p',
          text: 'Įmonėms siūlome programinės įrangos kūrimą, nepriklausomas kodo peržiūras ir papildomą programuotojų pajėgumą. Kartais parašome verslo laišką įmonei, su kuria anksčiau nebendravome. Šiame skyriuje pateikiama informacija, kurią pagal BDAR 14 straipsnį privalome pateikti, kai jūsų duomenis gavome ne iš jūsų. Kiekviename tokiame laiške yra nuoroda į šį skyrių.',
        },
        {
          kind: 'dl',
          rows: [
            { term: 'Kam rašome', def: 'Tik įmonėms (juridiniams asmenims). Pirmiausia Juridinių asmenų registre patikriname teisinę formą. Nerašome fiziniams asmenims ir individualią veiklą ar veiklą pagal verslo liudijimą vykdantiems asmenims.' },
            { term: 'Kur radome jūsų duomenis', def: 'Jūsų įmonės svetainėje, kurioje adresas skelbiamas; viešuose registruose – Juridinių asmenų registre (Registrų centras) ir rekvizitai.lt – įmonės pavadinimą, kodą, teisinę formą ir vadovo vardą bei pavardę; taip pat kitoje viešoje medžiagoje, pavyzdžiui, naujienų straipsnyje ar interviu, į kurį remiamės savo laiške. Kontaktų sąrašų nepirkame.' },
            { term: 'Kokius duomenis turime', def: 'Verslo el. pašto adresas (jame gali būti asmens vardas ir pavardė); asmens, kuriam rašome, pavyzdžiui, vadovo, vardas, pavardė ir pareigos; įmonės pavadinimas ir kodas; puslapis, kuriame radome adresą; viešas pareiškimas, į kurį remiamės; mūsų laiškų data ir tekstas; jūsų atsakymas, jei jį atsiunčiate; ir jūsų nesutikimas, jei jį pareiškiate.' },
            { term: 'Ką darome', def: 'Patys parašome vieną laišką ir ne daugiau kaip vieną priminimą. Nenaudojame sekimo pikselių ar nuorodų sekimo, pirktų sąrašų ir neprofiliuojame.' },
            { term: 'Teisinis pagrindas', def: 'Mūsų teisėtas interesas siūlyti paslaugas įmonėms (BDAR 6 straipsnio 1 dalies f punktas; 47 konstatuojamoji dalis pripažįsta, kad tiesioginė rinkodara gali būti teisėtas interesas). Pagal Lietuvos [Elektroninių ryšių įstatymo](https://www.e-tar.lt/portal/lt/legalAct/TAR.82D8168D3049/asr) 81 straipsnį elektroninį laišką juridiniam asmeniui galima siųsti be išankstinio sutikimo, jei kiekviename pranešime sudaroma aiški, nemokama ir lengvai įgyvendinama galimybė atsisakyti. Mūsų laiškuose tokia galimybė yra.' },
            { term: 'Kas gauna', def: 'Niekas už MSS ribų, išskyrus Google, kurios Gmail ir Drive talpina mūsų pašto dėžutę ir laiškų bei nesutikimų įrašus. Adresų neparduodame ir kitiems neperduodame.' },
            { term: 'Kiek laiko', def: 'Iki 12 mėnesių nuo paskutinio mūsų kontakto su jumis. Žr. [Kiek laiko saugome duomenis](#retention).' },
          ],
        },
        {
          kind: 'note',
          title: 'Mūsų ir jūsų interesų pusiausvyra paprastais žodžiais',
          blocks: [
            {
              kind: 'ul',
              items: [
                '**Mūsų interesas:** rasti klientų programinės įrangos paslaugoms, kaip ir bet kuris verslas.',
                '**Ar tai būtina?** Trumpas asmeniškas laiškas adresu, kurį įmonė skelbia verslo užklausoms, yra mažiausiai įkyrus būdas pradėti verslo pokalbį.',
                '**Jūsų interesai:** žinutės neprašėte. Tačiau įmonė, skelbianti verslo adresą, gali tikėtis verslo pasiūlymų. Rašome verslo klausimu ir, kai galime, apie tai, ką jūsų įmonė pati viešai pasakė. Naudojame nedaug duomenų, saugome trumpai, neperduodame kitiems, o jūs galite tai sustabdyti iš karto.',
                '**Mūsų išvada:** poveikis jums nedidelis, o apsaugos priemonės stiprios, todėl jūsų interesai nėra viršesni už mūsų. Jei manote kitaip, nesutikite – ir mes tuoj pat nustosime rašyti.',
              ],
            },
          ],
        },
        {
          kind: 'p',
          text: 'Galite [bet kada nesutikti](#object). Jei nesutiksite, adresą įrašysime į nesutikimų sąrašą ir daugiau tuo adresu nerašysime.',
        },
      ],
    },
    {
      id: 'object',
      title: 'Jūsų teisė nesutikti su rinkodara',
      blocks: [
        {
          kind: 'p',
          text: 'Galite bet kada, nenurodydami priežasties ir nemokamai, nesutikti, kad jūsų duomenis naudotume tiesioginei rinkodarai. Ši teisė yra besąlyginė (BDAR 21 straipsnio 2 ir 3 dalys): jums nesutikus, nustojame ir daugiau niekada nenaudosime jūsų duomenų rinkodarai.',
        },
        {
          kind: 'ul',
          items: [
            '**Kaip:** atsakykite į bet kurį mūsų laišką (pakanka žodžio „ne“) arba rašykite adresu ' + privacy + '.',
            '**Kas gali nesutikti:** įmonės vadovas arba bet kuris darbuotojas, kuris naudojasi tuo adresu, nepriklausomai nuo to, ar adrese yra vardas ir pavardė.',
            '**Ką darome:** nepagrįstai nedelsdami nustojame rašyti. Adresą, įmonę, datą ir jūsų žinutę laikome nesutikimų sąraše – tik kaip įrodymą, kad nesutikimą įvykdėme, ir kad daugiau nerašytume. Kitiems tikslams sąrašo nenaudojame.',
          ],
        },
        {
          kind: 'p',
          text: 'Taip pat galite, remdamiesi su jūsų konkrečia padėtimi susijusiais pagrindais, nesutikti su kitu duomenų tvarkymu, grindžiamu mūsų teisėtais interesais (21 straipsnio 1 dalis). Tada nustosime tvarkyti duomenis, nebent įrodytume, kad yra įtikinamų teisėtų priežasčių, viršesnių už jūsų interesus, arba duomenų reikia teisiniams reikalavimams pareikšti, vykdyti ar apginti.',
        },
      ],
    },
    {
      id: 'cookies',
      title: 'Slapukai ir panašios technologijos',
      blocks: [
        {
          kind: 'p',
          text: 'Slapukai yra nedideli failai, kuriuos svetainė išsaugo jūsų įrenginyje. Prieš naudodami slapukus, kurie nėra griežtai būtini tam, ko paprašėte svetainės, prašome jūsų sutikimo (BDAR 6 straipsnio 1 dalies a punktas; Elektroninių ryšių įstatymo 73 straipsnio 4 dalis).',
        },
        { kind: 'h3', text: 'Jūsų pasirinkimas' },
        {
          kind: 'p',
          text: 'Analitiniai slapukai nustatomi tik tada, kai juos priimate slapukų juostoje, kurią teikia Cookiebot. Jei jų nepriėmėte arba juosta jūsų naršyklėje nerodoma, analitinių slapukų nenustatome ir analitikos duomenų Google nesiunčiame. Savo pasirinkimą galite bet kada pakeisti arba atšaukti. Atšaukus sutikimą, nedaromas poveikis iki atšaukimo atlikto duomenų tvarkymo teisėtumui.',
        },
        { kind: 'cookieSettings', label: 'Slapukų nustatymai', unavailable: 'Slapukų juosta jūsų naršyklėje šiuo metu nepasiekiama. Analitinių slapukų nenustatome, jei nesutikote.' },
        {
          kind: 'table',
          caption: 'Naudojami slapukai',
          head: ['Pavadinimas', 'Kas nustato', 'Ką daro', 'Kategorija', 'Galiojimas'],
          rows: [
            ['`language`', 'Ši svetainė', 'Įsimena jūsų pasirinktą kalbą (anglų ar lietuvių). Nustatomas tik jums pakeitus kalbą.', 'Būtinasis', '1 metai'],
            ['`CookieConsent`', 'Cookiebot (Usercentrics A/S)', 'Saugo jūsų slapukų pasirinkimą.', 'Būtinasis', '1 metai'],
            ['`_ga`, `_ga_Z934MSEFV5`', 'Google Analytics (Google)', 'Atskiria lankytojus ir sujungia vieną apsilankymą, kad galėtume skaičiuoti apsilankymus ir matyti, kurie puslapiai naudingi. Nustatomi tik priėmus statistikos slapukus.', 'Statistikos', 'Iki 2 metų'],
          ],
        },
        { kind: 'h3', text: 'Kiti jūsų naršyklėje saugomi duomenys' },
        {
          kind: 'p',
          text: 'Jūsų nustatymams įsiminti svetainė taip pat naudoja naršyklės saugyklą: `language` (kalba), `site.theme` (šviesi ar tamsi tema), `site.heroPaused` (ar sustabdėte animaciją pagrindiniame puslapyje) ir, vienam naršyklės skirtukui, `has-loaded` (kad įkėlimo juosta nesikartotų). Šie įrašai lieka jūsų įrenginyje, jokio identifikatoriaus neturi ir naudojami tik jūsų naudojamai funkcijai.',
        },
        { kind: 'h3', text: 'Ką renka Google Analytics' },
        {
          kind: 'p',
          text: 'Puslapių peržiūras, apytikslę vietą, nustatytą pagal jūsų IP adresą, naršyklės ir įrenginio tipą, puslapį, iš kurio atėjote, ir įvykius, pavyzdžiui, mygtukų paspaudimus bei tai, ar forma buvo išsiųsta (niekada ne tai, ką įrašėte). Google teigia, kad ES lankytojų IP adresų neregistruoja ir nesaugo. Šiuos duomenis Google mūsų vardu tvarko kaip mūsų duomenų tvarkytoja. Įvykių duomenys saugomi ne ilgiau kaip 14 mėnesių. Nenaudojame reklamos ar pakartotinės rinkodaros funkcijų.',
        },
        { kind: 'h3', text: 'Ką registruoja Cookiebot' },
        {
          kind: 'p',
          text: 'Cookiebot (Usercentrics A/S, Danija) saugo sutikimo įrašą, kad galėtume parodyti, jog jūsų pasirinkimas buvo gerbiamas: atsitiktinį sutikimo ID, datą ir laiką, jūsų pasirinkimus ir ribotus techninius duomenis, pavyzdžiui, naršyklės tipą ir sutrumpintą IP adresą. Cookiebot jį ištrina po 12 mėnesių. Jos privatumo politika: [cookiebot.com](https://www.cookiebot.com/en/privacy-policy/).',
        },
        { kind: 'h3', text: 'Kitos svetainės' },
        {
          kind: 'p',
          text: 'Jei pereinate į Google rezervavimo puslapį, LinkedIn ar GitHub, tos svetainės pagal savo taisykles gali nustatyti savo slapukus. Jų turinio savo puslapiuose nekeliame. Slapukus taip pat galite ištrinti ar blokuoti naršyklės nustatymuose.',
        },
      ],
    },
    {
      id: 'processor',
      title: 'Kai tvarkome duomenis kliento vardu',
      blocks: [
        {
          kind: 'p',
          text: 'Vykdydami klientų projektus galime turėti prieigą prie asmens duomenų, kuriuos valdo klientas, pavyzdžiui, naudotojų duomenų kuriamoje ar peržiūrimoje sistemoje. Tuomet klientas yra duomenų valdytojas, o mes – jo duomenų tvarkytojas (BDAR 28 straipsnis). Tuos duomenis tvarkome tik pagal dokumentuotus kliento nurodymus, remdamiesi rašytine duomenų tvarkymo sutartimi; užtikriname jų konfidencialumą ir saugumą; kitą duomenų tvarkytoją pasitelkiame tik gavę kliento leidimą; padedame klientui atsakyti į asmenų prašymus; nepagrįstai nedelsdami pranešame klientui, sužinoję apie asmens duomenų saugumo pažeidimą; o projektui pasibaigus duomenis ištriname arba grąžiname.',
        },
        {
          kind: 'p',
          text: 'Jei jūsų duomenys yra kliento sistemoje, prašymą siųskite tam klientui. Jei atsiųsite jį mums, perduosime jį klientui.',
        },
      ],
    },
    {
      id: 'recipients',
      title: 'Kas gauna jūsų duomenis',
      blocks: [
        {
          kind: 'table',
          caption: 'Gavėjai ir duomenų tvarkytojai',
          head: ['Gavėjas', 'Kam', 'Vaidmuo', 'Kur'],
          rows: [
            ['Vercel Inc.', 'Šios svetainės talpinimas ir pateikimas.', 'Duomenų tvarkytojas', 'Jungtinės Amerikos Valstijos; pateikiama per pasaulinį tinklą. Mūsų puslapiai šiuo metu generuojami serveriuose Vašingtone (D. C.).'],
            ['Google Cloud EMEA Limited (Airija) ir Google LLC (Jungtinės Amerikos Valstijos)', 'Google Workspace: el. paštas, kalendorius ir rezervavimo puslapis, dokumentai ir skaičiuoklės bei kontaktų formą priimantis scenarijus.', 'Duomenų tvarkytojas', 'ES ir kitos šalys, įskaitant Jungtines Amerikos Valstijas'],
            ['Google Ireland Limited ir Google LLC', 'Google Analytics – tik jums sutikus.', 'Duomenų tvarkytojas', 'ES ir Jungtinės Amerikos Valstijos'],
            ['Usercentrics A/S (Cookiebot)', 'Slapukų juosta ir sutikimo įrašas.', 'Duomenų tvarkytojas', 'Danija; sutikimų įrašai talpinami ES'],
            ['Formspree, Inc.', 'Nemokamo audito prašymo forma.', 'Duomenų tvarkytojas', 'Jungtinės Amerikos Valstijos'],
            ['Google', 'PageSpeed Insights – tik jei naudojate svetainės skenerį. Taikoma pačios Google privatumo politika.', 'Atskiras duomenų valdytojas', 'ES ir Jungtinės Amerikos Valstijos'],
          ],
        },
        {
          kind: 'p',
          text: 'Duomenis taip pat atskleidžiame profesionaliems konsultantams, saugantiems konfidencialumą, jei jais naudojamės, ir valdžios institucijoms, kai to reikalauja teisės aktai. Asmens duomenų neparduodame ir neteikiame reklamos davėjams ar duomenų tarpininkams.',
        },
      ],
    },
    {
      id: 'transfers',
      title: 'Duomenų perdavimas už ES ribų',
      blocks: [
        {
          kind: 'p',
          text: 'Kai kurie teikėjai yra Jungtinėse Amerikos Valstijose arba ten tvarko duomenis. [Įgyvendinimo sprendimu (ES) 2023/1795](https://eur-lex.europa.eu/eli/dec_impl/2023/1795/oj) Europos Komisija nustatė, kad Jungtinės Amerikos Valstijos užtikrina tinkamo lygio apsaugą įmonėms, sertifikuotoms pagal ES ir JAV duomenų privatumo sistemą (BDAR 45 straipsnis).',
        },
        {
          kind: 'ul',
          items: [
            '**Google LLC** ir **Vercel Inc.** yra sertifikuotos pagal duomenų privatumo sistemą. Jų duomenų tvarkymo sąlygose taip pat yra ES standartinės duomenų apsaugos sąlygos (46 straipsnis): [Google](https://cloud.google.com/terms/data-processing-addendum), [Vercel](https://vercel.com/legal/dpa).',
            '**Formspree, Inc.** nėra sertifikuota pagal duomenų privatumo sistemą. Ji nurodo, kad remiasi standartinėmis duomenų apsaugos sąlygomis: [formspree.io/security](https://formspree.io/security/).',
            '**Usercentrics A/S (Cookiebot)** yra Danijoje ir sutikimų įrašus talpina ES.',
          ],
        },
        {
          kind: 'p',
          text: 'Norėdami gauti apsaugos priemonių kopiją arba sužinoti, kur jos paskelbtos, rašykite adresu ' + privacy + '.',
        },
      ],
    },
    {
      id: 'retention',
      title: 'Kiek laiko saugome duomenis',
      blocks: [
        {
          kind: 'table',
          caption: 'Saugojimo terminai',
          head: ['Kas', 'Kiek laiko'],
          rows: [
            ['Svetainės serverio žurnalai (Vercel)', 'Trumpai: Vercel juos saugo nuo maždaug vienos valandos iki kelių parų, priklausomai nuo talpinimo plano.'],
            ['Slapukų pasirinkimas ir sutikimo įrašas (Cookiebot)', '12 mėnesių. Slapukas `CookieConsent` galioja iki 1 metų.'],
            ['Analitikos duomenys (Google Analytics)', 'Ne ilgiau kaip 14 mėnesių. Slapukai galioja iki 2 metų.'],
            ['Kontaktų formos žinutės, rezervacijos ir el. laiškai su užklausų teikėjais', 'Iki 12 mėnesių nuo paskutinio mūsų kontakto su jumis.'],
            ['Prašymai dėl nemokamo audito', 'Iki 12 mėnesių nuo paskutinio mūsų kontakto su jumis. Formspree savo kopiją saugo laikotarpį, nustatytą pagal mūsų planą su ja.'],
            ['Svetainės skeneris', 'Nesaugoma.'],
            ['Verslo laiškai įmonėms', 'Iki 12 mėnesių nuo paskutinio mūsų kontakto.'],
            ['Nesutikimų sąrašas', 'Tik tiek, kiek reikia nesutikimui įvykdyti, t. y. kad daugiau niekada nerašytume tuo adresu. Kitiems tikslams nenaudojamas.'],
            ['Klientai: sutartys, sąskaitos, susirašinėjimas', 'Sutarties galiojimo laikotarpiu, o vėliau – teisės aktų reikalaujamais terminais: apskaitos dokumentai paprastai 10 metų, sutartys paprastai 5–10 metų nuo jų pabaigos.'],
            ['Viskas, ko reikia teisiniam reikalavimui', 'Kol reikalavimas išspręstas ir pasibaigęs reikalavimų pareiškimo terminas.'],
          ],
        },
        {
          kind: 'p',
          text: 'Pasibaigus terminui duomenis ištriname arba padarome anoniminius.',
        },
      ],
    },
    {
      id: 'rights',
      title: 'Jūsų teisės',
      blocks: [
        {
          kind: 'ul',
          items: [
            '**Teisė susipažinti** (15 straipsnis): patvirtinimas, kad tvarkome jūsų duomenis, jų kopija ir šioje politikoje nurodyta informacija.',
            '**Teisė ištaisyti** (16 straipsnis): netikslių ar neišsamių duomenų ištaisymas.',
            '**Teisė reikalauti ištrinti duomenis** (17 straipsnis): ištrynimas, kai įstatymai jums suteikia tokią teisę. Jei nesutikote su rinkodara, paliekame tik įrašą nesutikimų sąraše, kad galėtume nesutikimą įvykdyti.',
            '**Teisė apriboti duomenų tvarkymą** (18 straipsnis): riboti, kaip naudojame jūsų duomenis, įstatymų nurodytais atvejais.',
            '**Teisė į duomenų perkeliamumą** (20 straipsnis): jūsų mums pateikti duomenys, kai juos automatizuotomis priemonėmis tvarkome sutikimo ar sutarties pagrindu, įprastu formatu.',
            '**Teisė nesutikti** (21 straipsnis): su rinkodara – bet kada, ir su tvarkymu, grindžiamu teisėtais interesais; žr. [teisę nesutikti](#object).',
            '**Teisė atšaukti sutikimą** (7 straipsnio 3 dalis): bet kada, pavyzdžiui, slapukų nustatymuose.',
            '**Teisė pateikti skundą** (77 straipsnis): priežiūros institucijai; žr. skyrių [Skundai](#complaints).',
          ],
        },
        {
          kind: 'p',
          text: 'Norėdami pasinaudoti teise, rašykite adresu ' + privacy + '. Galime paprašyti patvirtinti savo tapatybę. Atsakome per vieną mėnesį; dėl sudėtingų ar gausių prašymų šį terminą galime pratęsti iki dviejų mėnesių ir paaiškinsime kodėl. Tai nemokama; jei prašymas akivaizdžiai nepagrįstas arba perteklinis, galime imti pagrįstą mokestį arba atsisakyti jį vykdyti ir paaiškinsime.',
        },
      ],
    },
    {
      id: 'automated',
      title: 'Automatizuoti sprendimai',
      blocks: [
        {
          kind: 'p',
          text: 'Nepriimame sprendimų apie jus tik automatizuotu duomenų tvarkymu, įskaitant profiliavimą, kurie sukeltų teisinių pasekmių ar panašiai reikšmingai jus paveiktų (BDAR 22 straipsnis).',
        },
      ],
    },
    {
      id: 'security',
      title: 'Jūsų duomenų saugumas',
      blocks: [
        {
          kind: 'p',
          text: 'Asmens duomenis saugome techninėmis ir organizacinėmis priemonėmis, atitinkančiomis riziką; žr. mūsų [Saugumo puslapį](/security). Jei asmens duomenų saugumo pažeidimas gali sukelti pavojų asmenims, per 72 valandas pranešame priežiūros institucijai, o jei pavojus didelis – nepagrįstai nedelsdami pranešame ir paveiktiems asmenims (33 ir 34 straipsniai).',
        },
      ],
    },
    {
      id: 'complaints',
      title: 'Skundai',
      blocks: [
        {
          kind: 'p',
          text: 'Norėtume pirmiausia išgirsti jus, bet prieš skųsdamiesi su mumis susisiekti neprivalote. Galite pateikti skundą Lietuvos priežiūros institucijai arba ES valstybės narės, kurioje gyvenate ar dirbate, priežiūros institucijai, taip pat galite kreiptis į teismą.',
        },
        {
          kind: 'dl',
          rows: [
            { term: 'Institucija', def: 'Valstybinė duomenų apsaugos inspekcija (VDAI)' },
            { term: 'Adresas', def: VDAI.address + ', Lietuva' },
            { term: 'Telefonas', def: VDAI.phone },
            { term: 'El. paštas', def: mail(VDAI.email) },
            { term: 'Svetainė', def: '[vdai.lrv.lt](https://vdai.lrv.lt/)' },
          ],
        },
      ],
    },
    {
      id: 'changes',
      title: 'Šios politikos pakeitimai',
      blocks: [
        {
          kind: 'p',
          text: 'Šią politiką atnaujiname, kai keičiasi mūsų veikla ar teisė. Viršuje nurodyta data rodo galiojančią redakciją. Jei pakeitimas jums turi esminės reikšmės, apie jį pranešime šiame puslapyje. Ankstesnes redakcijas galime pateikti paprašius.',
        },
      ],
    },
  ],
};

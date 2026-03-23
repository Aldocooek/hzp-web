/**
 * Sanity CMS seed script for HŽP website.
 * Seeds all content from static JSON dictionaries into Sanity.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npx tsx scripts/seed-sanity.ts
 *
 * The script is idempotent — safe to run multiple times.
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '1dyubvw4',
  dataset: 'hzp',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// ---------------------------------------------------------------------------
// Source data (mirrors cs.json / en.json exactly)
// ---------------------------------------------------------------------------

const cs = {
  hero: {
    headline1: 'Na našich pružinách',
    headline2: 'spočívá bezpečí',
    headline3: 'cestujících',
    subheadline: 'a tíha nákladů',
    sub: 'Přední evropský výrobce pružin pro železniční a automobilový průmysl od roku 1951',
    cta1: 'Zobrazit produkty',
    cta2: 'Kontaktujte nás',
  },
  stats: {
    founded: 'Rok založení',
    springs: 'Pružin ročně',
    employees: 'Zaměstnanců',
    years: 'Let zkušeností',
    foundedVal: '1951',
    springsVal: '572 945',
    employeesVal: '280',
    yearsVal: '65+',
  },
  products: {
    title: 'Naše produkty',
    subtitle: 'Precizní inženýrství pro každou aplikaci',
    helical: {
      name: 'Šroubové pružiny',
      desc: 'Vyráběné za tepla pro železniční a automobilový průmysl. Maximální přesnost a odolnost pro ty nejnáročnější aplikace.',
      detail: 'Naše šroubové pružiny jsou vyráběny z nejkvalitnějších ocelí za přísného dodržení všech norem. Každá pružina prochází důkladnou kontrolou kvality.',
      specs: [
        'Průměr drátu 12–80 mm',
        'Průměr pružiny do 500 mm',
        'Výška do 1000 mm',
        'Maximální zatížení 500 kN',
      ],
    },
    trapezoidal: {
      name: 'Listové pružiny trapézové',
      desc: 'Tradiční konstrukční řešení pro nákladní vozidla a přívěsy. Osvědčená technologie s dlouhou životností.',
      detail: 'Trapézové listové pružiny kombinují tradiční konstrukční principy s moderními výrobními postupy. Vhodné pro těžká nákladní vozidla.',
      specs: [
        'Délka do 2000 mm',
        'Šířka listu 45–120 mm',
        'Počet listů 2–12',
        'Maximální zatížení 200 kN',
      ],
    },
    parabolic: {
      name: 'Listové pružiny parabolické',
      desc: 'Moderní lehké řešení s optimálním výkonem. Snížená hmotnost při zachování maximální nosnosti.',
      detail: 'Parabolické listové pružiny představují moderní přístup k odpružení. Díky optimalizovanému průřezu dosahují nižší hmotnosti při stejné nosnosti.',
      specs: [
        'Délka do 2200 mm',
        'Šířka listu 60–120 mm',
        'Počet listů 1–5',
        'Úspora hmotnosti až 40%',
      ],
    },
  },
  industries: {
    title: 'Průmyslová odvětví',
    subtitle: 'Naše pružiny slouží v nejnáročnějších podmínkách',
    automotive: {
      name: 'Automobilový průmysl',
      desc: 'Dodáváme pružiny pro osobní i nákladní automobily předním výrobcům a jejich dodavatelům.',
    },
    railway: {
      name: 'Železniční průmysl',
      desc: 'Specializujeme se na pružiny pro kolejová vozidla — lokomotivy, vagóny a tramvaje.',
    },
    industrial: {
      name: 'Ostatní průmysl',
      desc: 'Vyrábíme pružiny pro zemědělskou techniku, průmyslové stroje a další aplikace.',
    },
  },
  about: {
    title: 'O společnosti',
    subtitle: 'Sedm desetiletí preciznosti',
    mission: 'Umíme vyrobit dobré pružiny, na kterých spočívá bezpečí cestujících a tíha nákladů',
    historyTitle: 'Naše historie',
    historyText:
      'Společnost HŽP a.s. byla založena v roce 1951 v Prostějově jako specializovaný výrobce pružin pro průmysl. Za více než 70 let existence jsme se stali uznávaným dodavatelem pro automobilový a železniční průmysl v celé Evropě.',
    history2:
      'Dnes zaměstnáváme 280 odborníků a ročně vyrobíme téměř 573 000 pružin. Naše výrobky najdete v kolejových vozidlech po celé Evropě i v automobilech předních světových značek.',
    visionTitle: 'Vize',
    visionText:
      'Stát se předním evropským výrobcem pružin pro železniční průmysl při současném rozvoji kapacit v automobilovém průmyslu.',
    valuesTitle: 'Naše hodnoty',
    managementTitle: 'Vedení společnosti',
    values: [
      { title: 'Kvalita', desc: 'Každá pružina prochází přísnou kontrolou kvality podle mezinárodních norem.' },
      { title: 'Inovace', desc: 'Investujeme do vývoje nových technologií a výrobních postupů.' },
      { title: 'Spolehlivost', desc: 'Naši zákazníci se na nás mohou spolehnout — dodáváme včas a v požadované kvalitě.' },
      { title: 'Udržitelnost', desc: 'Zodpovědný přístup k životnímu prostředí a efektivní využívání zdrojů.' },
    ],
    management: [
      { name: 'Ing. Petr Vaněk, MBA', role: 'Generální ředitel' },
      { name: 'Ing. Radek Páleník', role: 'Finanční ředitel' },
      { name: 'Ing. Tomáš Grulich', role: 'Technický ředitel' },
      { name: 'Ing. Stanislav Maslák, MBA', role: 'Obchodní ředitel' },
    ],
  },
  contact: {
    title: 'Kontaktujte nás',
    subtitle: 'Jsme tu pro vás',
    address: 'Adresa',
    addressVal: 'Dolní 3137/100, 796 01 Prostějov, Česká republika',
    phone: 'Telefon',
    phoneVal: '+420 582 344 469',
    email: 'E-mail',
    emailVal: 'springs@hzp.cz',
    ico: 'IČO',
    icoVal: '26955342',
    departments: 'Kontakty oddělení',
    depts: [
      { name: 'Obchod', person: 'Erik Nadymáček', phone: '+420 582 312 783', email: 'erik.nadymacek@hzp.cz' },
      { name: 'Technické oddělení', person: 'Pavel Nekoksa', phone: '+420 582 312 754', email: 'pavel.nekoksa@hzp.cz' },
      { name: 'Kvalita', person: 'Vojtěch Pešat', phone: '+420 582 312 849', email: 'vojtech.pesat@hzp.cz' },
      { name: 'Personální oddělení', person: 'Hana Horáková', phone: '+420 582 312 375', email: 'hana.horakova@hzp.cz' },
    ],
    formTitle: 'Napište nám',
    formName: 'Jméno a příjmení',
    formEmail: 'E-mailová adresa',
    formCompany: 'Název společnosti',
    formSubject: 'Předmět',
    formMessage: 'Zpráva',
    formSend: 'Odeslat zprávu',
    formSuccess: 'Zpráva odeslána. Ozve se vám nejpozději do 24 hodin.',
    required: 'Povinné pole',
  },
  career: {
    title: 'Kariéra',
    subtitle: 'Budujte svou kariéru s námi',
    intro: 'Hledáme talentované a motivované lidi, kteří chtějí být součástí předního evropského výrobce pružin. Nabízíme stabilní zaměstnání, příjemné pracovní prostředí a příležitosti k růstu.',
    whyTitle: 'Proč HŽP?',
    openPositions: 'Volné pozice',
    noPositions: 'Momentálně nemáme žádné volné pozice. Zašlete nám životopis na hana.horakova@hzp.cz.',
    contactHR: 'Kontakt HR',
    hrPerson: 'Hana Horáková',
    hrPhone: '+420 582 312 375',
    hrEmail: 'hana.horakova@hzp.cz',
    sendCV: 'Zaslat životopis',
    benefits: [
      { title: 'Stabilita', desc: 'Více než 70 let na trhu. Stabilní zákazníci a jistota zaměstnání.' },
      { title: 'Rozvoj', desc: 'Investujeme do vzdělávání a profesního rozvoje svých zaměstnanců.' },
      { title: 'Odměňování', desc: 'Konkurenceschopné platy, prémie a benefity nad rámec zákona.' },
      { title: 'Tým', desc: 'Přátelský kolektiv 280 odborníků. Otevřená firemní kultura.' },
      { title: 'Lokalita', desc: 'Sídlíme v Prostějově — dostupné město s dobrou kvalitou života.' },
      { title: 'Technologie', desc: 'Moderní strojní park a výrobní technologie světových výrobců.' },
    ],
  },
  footer: {
    tagline: 'Výrobce pružin od roku 1951',
  },
};

const en = {
  hero: {
    headline1: 'Safety rides',
    headline2: 'on our',
    headline3: 'springs',
    subheadline: '— since 1951',
    sub: "Europe's leading spring manufacturer for railway and automotive industries since 1951",
    cta1: 'View products',
    cta2: 'Contact us',
  },
  stats: {
    founded: 'Year founded',
    springs: 'Springs per year',
    employees: 'Employees',
    years: 'Years of experience',
    foundedVal: '1951',
    springsVal: '572,945',
    employeesVal: '280',
    yearsVal: '65+',
  },
  products: {
    title: 'Our Products',
    subtitle: 'Precision engineering for every application',
    helical: {
      name: 'Helical Springs',
      desc: 'Hot-formed springs for railway and automotive industry. Maximum precision and durability for the most demanding applications.',
      detail: 'Our helical springs are manufactured from the highest quality steels with strict adherence to all standards. Every spring undergoes thorough quality control.',
      specs: [
        'Wire diameter 12–80 mm',
        'Spring diameter up to 500 mm',
        'Height up to 1000 mm',
        'Maximum load 500 kN',
      ],
    },
    trapezoidal: {
      name: 'Trapezoidal Leaf Springs',
      desc: 'Traditional design solution for commercial vehicles and trailers. Proven technology with long service life.',
      detail: 'Trapezoidal leaf springs combine traditional design principles with modern manufacturing processes. Suitable for heavy commercial vehicles.',
      specs: [
        'Length up to 2000 mm',
        'Leaf width 45–120 mm',
        'Number of leaves 2–12',
        'Maximum load 200 kN',
      ],
    },
    parabolic: {
      name: 'Parabolic Leaf Springs',
      desc: 'Modern lightweight solution with optimal performance. Reduced weight while maintaining maximum load capacity.',
      detail: 'Parabolic leaf springs represent a modern approach to suspension. Thanks to the optimized cross-section, they achieve lower weight with the same load capacity.',
      specs: [
        'Length up to 2200 mm',
        'Leaf width 60–120 mm',
        'Number of leaves 1–5',
        'Weight savings up to 40%',
      ],
    },
  },
  industries: {
    title: 'Industries',
    subtitle: 'Our springs perform in the most demanding conditions',
    automotive: {
      name: 'Automotive',
      desc: 'We supply springs for passenger and commercial vehicles to leading manufacturers and their suppliers.',
    },
    railway: {
      name: 'Railway',
      desc: 'We specialize in springs for rail vehicles — locomotives, wagons and trams.',
    },
    industrial: {
      name: 'Industrial',
      desc: 'We manufacture springs for agricultural machinery, industrial machines and other applications.',
    },
  },
  about: {
    title: 'About Us',
    subtitle: 'Seven decades of precision',
    mission: 'We know how to make quality springs on which the safety of passengers and the weight of cargo depend',
    historyTitle: 'Our History',
    historyText:
      'HŽP a.s. was founded in 1951 in Prostějov as a specialized spring manufacturer for industry. Over more than 70 years, we have become a recognized supplier to the automotive and railway industries throughout Europe.',
    history2:
      'Today we employ 280 specialists and manufacture nearly 573,000 springs per year. Our products can be found in rail vehicles throughout Europe and in automobiles from leading global brands.',
    visionTitle: 'Vision',
    visionText:
      'To become the leading European spring manufacturer for the railway industry while expanding capacity in the automotive sector.',
    valuesTitle: 'Our Values',
    managementTitle: 'Management',
    values: [
      { title: 'Quality', desc: 'Every spring undergoes strict quality control according to international standards.' },
      { title: 'Innovation', desc: 'We invest in the development of new technologies and manufacturing processes.' },
      { title: 'Reliability', desc: 'Our customers can count on us — we deliver on time and to the required quality.' },
      { title: 'Sustainability', desc: 'Responsible approach to the environment and efficient use of resources.' },
    ],
    management: [
      { name: 'Ing. Petr Vaněk, MBA', role: 'Chief Executive Officer' },
      { name: 'Ing. Radek Páleník', role: 'Chief Financial Officer' },
      { name: 'Ing. Tomáš Grulich', role: 'Chief Technical Officer' },
      { name: 'Ing. Stanislav Maslák, MBA', role: 'Sales Director' },
    ],
  },
  contact: {
    title: 'Contact Us',
    subtitle: "We're here for you",
    address: 'Address',
    addressVal: 'Dolní 3137/100, 796 01 Prostějov, Czech Republic',
    phone: 'Phone',
    phoneVal: '+420 582 344 469',
    email: 'Email',
    emailVal: 'springs@hzp.cz',
    ico: 'Company ID',
    icoVal: '26955342',
    departments: 'Department contacts',
    depts: [
      { name: 'Sales', person: 'Erik Nadymáček', phone: '+420 582 312 783', email: 'erik.nadymacek@hzp.cz' },
      { name: 'Technical Department', person: 'Pavel Nekoksa', phone: '+420 582 312 754', email: 'pavel.nekoksa@hzp.cz' },
      { name: 'Quality', person: 'Vojtěch Pešat', phone: '+420 582 312 849', email: 'vojtech.pesat@hzp.cz' },
      { name: 'Human Resources', person: 'Hana Horáková', phone: '+420 582 312 375', email: 'hana.horakova@hzp.cz' },
    ],
    formTitle: 'Send us a message',
    formName: 'Full name',
    formEmail: 'Email address',
    formCompany: 'Company name',
    formSubject: 'Subject',
    formMessage: 'Message',
    formSend: 'Send message',
    formSuccess: "Message sent. We'll get back to you within 24 hours.",
    required: 'Required field',
  },
  career: {
    title: 'Career',
    subtitle: 'Build your career with us',
    intro: 'We are looking for talented and motivated people who want to be part of a leading European spring manufacturer. We offer stable employment, a pleasant work environment and opportunities for growth.',
    whyTitle: 'Why HŽP?',
    openPositions: 'Open positions',
    noPositions: 'We currently have no open positions. Send us your CV at hana.horakova@hzp.cz.',
    contactHR: 'HR Contact',
    hrPerson: 'Hana Horáková',
    hrPhone: '+420 582 312 375',
    hrEmail: 'hana.horakova@hzp.cz',
    sendCV: 'Send CV',
    benefits: [
      { title: 'Stability', desc: 'Over 70 years in business. Stable customers and job security.' },
      { title: 'Development', desc: 'We invest in the education and professional development of our employees.' },
      { title: 'Compensation', desc: 'Competitive salaries, bonuses and benefits beyond statutory requirements.' },
      { title: 'Team', desc: 'A friendly team of 280 professionals. Open company culture.' },
      { title: 'Location', desc: 'Based in Prostějov — an accessible city with a good quality of life.' },
      { title: 'Technology', desc: 'Modern machinery and production technology from world-class manufacturers.' },
    ],
  },
  footer: {
    tagline: 'Spring manufacturer since 1951',
  },
};

// ---------------------------------------------------------------------------
// Document builders
// ---------------------------------------------------------------------------

function buildSiteSettings() {
  return {
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: 'Site Settings',
    hero: {
      headline1: { cs: cs.hero.headline1, en: en.hero.headline1 },
      headline2: { cs: cs.hero.headline2, en: en.hero.headline2 },
      headline3: { cs: cs.hero.headline3, en: en.hero.headline3 },
      subheadline: { cs: cs.hero.subheadline, en: en.hero.subheadline },
      sub: { cs: cs.hero.sub, en: en.hero.sub },
      cta1: { cs: cs.hero.cta1, en: en.hero.cta1 },
      cta2: { cs: cs.hero.cta2, en: en.hero.cta2 },
    },
    stats: {
      founded: {
        cs: cs.stats.founded,
        en: en.stats.founded,
        value: cs.stats.foundedVal,
      },
      springs: {
        cs: cs.stats.springs,
        en: en.stats.springs,
        value: cs.stats.springsVal,
      },
      employees: {
        cs: cs.stats.employees,
        en: en.stats.employees,
        value: cs.stats.employeesVal,
      },
      years: {
        cs: cs.stats.years,
        en: en.stats.years,
        value: cs.stats.yearsVal,
      },
    },
    footer: {
      tagline: { cs: cs.footer.tagline, en: en.footer.tagline },
    },
    contactInfo: {
      address: {
        cs: cs.contact.addressVal,
        en: en.contact.addressVal,
      },
      phone: cs.contact.phoneVal,
      email: cs.contact.emailVal,
      ico: cs.contact.ico,
      icoVal: cs.contact.icoVal,
    },
  };
}

function buildProducts() {
  const productKeys = ['helical', 'trapezoidal', 'parabolic'] as const;
  const orders = { helical: 1, trapezoidal: 2, parabolic: 3 };

  return productKeys.map((key) => {
    const csP = cs.products[key];
    const enP = en.products[key];

    const specs = csP.specs.map((csSpec, i) => ({
      _key: `spec-${i}`,
      _type: 'spec',
      cs: csSpec,
      en: enP.specs[i],
    }));

    return {
      _id: `product-${key}`,
      _type: 'product',
      slug: key,
      name: { cs: csP.name, en: enP.name },
      description: { cs: csP.desc, en: enP.desc },
      detail: { cs: csP.detail, en: enP.detail },
      specs,
      order: orders[key],
    };
  });
}

function buildIndustries() {
  const entries = [
    { id: 'industry-automotive', slug: 'automotive', order: 1, icon: 'automotive' },
    { id: 'industry-railway', slug: 'railway', order: 2, icon: 'railway' },
    { id: 'industry-industrial', slug: 'industrial', order: 3, icon: 'industrial' },
  ] as const;

  return entries.map(({ id, slug, order, icon }) => ({
    _id: id,
    _type: 'industry',
    slug,
    name: {
      cs: cs.industries[slug].name,
      en: en.industries[slug].name,
    },
    description: {
      cs: cs.industries[slug].desc,
      en: en.industries[slug].desc,
    },
    icon,
    order,
  }));
}

function buildTeamMembers() {
  return cs.about.management.map((member, i) => ({
    _id: `team-${i + 1}`,
    _type: 'teamMember',
    name: member.name,
    role: {
      cs: member.role,
      en: en.about.management[i].role,
    },
    order: i + 1,
  }));
}

function buildDepartments() {
  return cs.contact.depts.map((dept, i) => ({
    _id: `dept-${i + 1}`,
    _type: 'department',
    name: {
      cs: dept.name,
      en: en.contact.depts[i].name,
    },
    person: dept.person,
    phone: dept.phone,
    email: dept.email,
    order: i + 1,
  }));
}

function buildValues() {
  return cs.about.values.map((val, i) => ({
    _id: `value-${i + 1}`,
    _type: 'value',
    title: {
      cs: val.title,
      en: en.about.values[i].title,
    },
    description: {
      cs: val.desc,
      en: en.about.values[i].desc,
    },
    order: i + 1,
  }));
}

function buildBenefits() {
  return cs.career.benefits.map((benefit, i) => ({
    _id: `benefit-${i + 1}`,
    _type: 'benefit',
    title: {
      cs: benefit.title,
      en: en.career.benefits[i].title,
    },
    description: {
      cs: benefit.desc,
      en: en.career.benefits[i].desc,
    },
    order: i + 1,
  }));
}

function buildPages() {
  const pageAbout = {
    _id: 'page-about',
    _type: 'page',
    pageId: 'about',
    title: { cs: cs.about.title, en: en.about.title },
    subtitle: { cs: cs.about.subtitle, en: en.about.subtitle },
    about: {
      mission: { cs: cs.about.mission, en: en.about.mission },
      historyTitle: { cs: cs.about.historyTitle, en: en.about.historyTitle },
      historyText: { cs: cs.about.historyText, en: en.about.historyText },
      history2: { cs: cs.about.history2, en: en.about.history2 },
      visionTitle: { cs: cs.about.visionTitle, en: en.about.visionTitle },
      visionText: { cs: cs.about.visionText, en: en.about.visionText },
      valuesTitle: { cs: cs.about.valuesTitle, en: en.about.valuesTitle },
      managementTitle: { cs: cs.about.managementTitle, en: en.about.managementTitle },
    },
  };

  const pageCareer = {
    _id: 'page-career',
    _type: 'page',
    pageId: 'career',
    title: { cs: cs.career.title, en: en.career.title },
    subtitle: { cs: cs.career.subtitle, en: en.career.subtitle },
    career: {
      intro: { cs: cs.career.intro, en: en.career.intro },
      whyTitle: { cs: cs.career.whyTitle, en: en.career.whyTitle },
      openPositions: { cs: cs.career.openPositions, en: en.career.openPositions },
      noPositions: { cs: cs.career.noPositions, en: en.career.noPositions },
      contactHR: { cs: cs.career.contactHR, en: en.career.contactHR },
      sendCV: { cs: cs.career.sendCV, en: en.career.sendCV },
    },
  };

  const pageProducts = {
    _id: 'page-products',
    _type: 'page',
    pageId: 'products',
    title: { cs: cs.products.title, en: en.products.title },
    subtitle: { cs: cs.products.subtitle, en: en.products.subtitle },
  };

  const pageContact = {
    _id: 'page-contact',
    _type: 'page',
    pageId: 'contact',
    title: { cs: cs.contact.title, en: en.contact.title },
    subtitle: { cs: cs.contact.subtitle, en: en.contact.subtitle },
    contact: {
      formTitle: { cs: cs.contact.formTitle, en: en.contact.formTitle },
      formName: { cs: cs.contact.formName, en: en.contact.formName },
      formEmail: { cs: cs.contact.formEmail, en: en.contact.formEmail },
      formCompany: { cs: cs.contact.formCompany, en: en.contact.formCompany },
      formSubject: { cs: cs.contact.formSubject, en: en.contact.formSubject },
      formMessage: { cs: cs.contact.formMessage, en: en.contact.formMessage },
      formSend: { cs: cs.contact.formSend, en: en.contact.formSend },
      formSuccess: { cs: cs.contact.formSuccess, en: en.contact.formSuccess },
      required: { cs: cs.contact.required, en: en.contact.required },
      departments: { cs: cs.contact.departments, en: en.contact.departments },
      address: { cs: cs.contact.address, en: en.contact.address },
      phone: { cs: cs.contact.phone, en: en.contact.phone },
      email: { cs: cs.contact.email, en: en.contact.email },
      ico: { cs: cs.contact.ico, en: en.contact.ico },
    },
  };

  return [pageAbout, pageCareer, pageProducts, pageContact];
}

// ---------------------------------------------------------------------------
// Seed runner
// ---------------------------------------------------------------------------

async function upsert(doc: Record<string, unknown>) {
  const id = doc._id as string;
  const type = doc._type as string;
  try {
    await client.createOrReplace(doc);
    console.log(`  [OK] ${type} / ${id}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`  [FAIL] ${type} / ${id}: ${message}`);
    throw err;
  }
}

async function seed() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('ERROR: SANITY_WRITE_TOKEN environment variable is not set.');
    console.error('Usage: SANITY_WRITE_TOKEN=<token> npx tsx scripts/seed-sanity.ts');
    process.exit(1);
  }

  console.log('=== HZP Sanity seed started ===\n');

  // 1. siteSettings singleton
  console.log('--- siteSettings ---');
  await upsert(buildSiteSettings());

  // 2. products (3)
  console.log('\n--- products ---');
  for (const doc of buildProducts()) {
    await upsert(doc);
  }

  // 3. industries (3)
  console.log('\n--- industries ---');
  for (const doc of buildIndustries()) {
    await upsert(doc);
  }

  // 4. teamMembers (4)
  console.log('\n--- teamMembers ---');
  for (const doc of buildTeamMembers()) {
    await upsert(doc);
  }

  // 5. departments (4)
  console.log('\n--- departments ---');
  for (const doc of buildDepartments()) {
    await upsert(doc);
  }

  // 6. values (4)
  console.log('\n--- values ---');
  for (const doc of buildValues()) {
    await upsert(doc);
  }

  // 7. benefits (6)
  console.log('\n--- benefits ---');
  for (const doc of buildBenefits()) {
    await upsert(doc);
  }

  // 8. pages (4)
  console.log('\n--- pages ---');
  for (const doc of buildPages()) {
    await upsert(doc);
  }

  console.log('\n=== Seed complete ===');
  console.log('Total documents: 1 + 3 + 3 + 4 + 4 + 4 + 6 + 4 = 29');
}

seed().catch((err) => {
  console.error('\nSeed failed:', err);
  process.exit(1);
});

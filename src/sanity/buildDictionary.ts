/**
 * buildDictionary.ts
 *
 * Converts raw Sanity CMS data into the same Dictionary shape that the existing
 * components expect (matching cs.json / en.json).
 *
 * The Sanity schema stores i18n fields as { cs: string; en: string } objects.
 * This helper picks the right language and assembles the flat Dictionary object.
 *
 * Existing components are NOT changed — they still receive a `dict` prop of
 * type Dictionary. If any Sanity field is missing we fall back to the value
 * already in the JSON dictionary (passed as `fallback`).
 */

import type { Dictionary } from '@/lib/getDictionary';
import type { Locale } from '@/lib/locale';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObj = Record<string, any>;

/** Pick the localised string from a { cs, en } object. Falls back to `fallback`. */
function loc(
  field: { cs?: string; en?: string } | undefined | null,
  lang: Locale,
  fallback: string
): string {
  if (!field) return fallback;
  return field[lang] || field.cs || field.en || fallback;
}

/** Safe string getter — returns `fallback` if value is falsy. */
function str(value: string | undefined | null, fallback: string): string {
  return value || fallback;
}

// ---------------------------------------------------------------------------
// Homepage / siteSettings builder
// ---------------------------------------------------------------------------

export function buildHomepageDictionary(
  data: {
    settings: AnyObj | null;
    products: AnyObj[] | null;
    industries: AnyObj[] | null;
  },
  lang: Locale,
  fallback: Dictionary
): Dictionary {
  const s = data.settings;
  const products = data.products ?? [];
  const industries = data.industries ?? [];

  // Helper to find product by slug
  const prod = (slug: string) => products.find((p) => p.slug === slug);
  const ind = (slug: string) => industries.find((i) => i.slug === slug);

  const helical = prod('helical');
  const trapezoidal = prod('trapezoidal');
  const parabolic = prod('parabolic');
  const automotive = ind('automotive');
  const railway = ind('railway');
  const industrial = ind('industrial');

  return {
    ...fallback,

    // Hero
    hero: {
      headline1: s?.hero?.headline1 ? loc(s.hero.headline1, lang, fallback.hero.headline1) : fallback.hero.headline1,
      headline2: s?.hero?.headline2 ? loc(s.hero.headline2, lang, fallback.hero.headline2) : fallback.hero.headline2,
      headline3: s?.hero?.headline3 ? loc(s.hero.headline3, lang, fallback.hero.headline3) : fallback.hero.headline3,
      subheadline: s?.hero?.subheadline ? loc(s.hero.subheadline, lang, fallback.hero.subheadline) : fallback.hero.subheadline,
      sub: s?.hero?.sub ? loc(s.hero.sub, lang, fallback.hero.sub) : fallback.hero.sub,
      cta1: s?.hero?.cta1 ? loc(s.hero.cta1, lang, fallback.hero.cta1) : fallback.hero.cta1,
      cta2: s?.hero?.cta2 ? loc(s.hero.cta2, lang, fallback.hero.cta2) : fallback.hero.cta2,
    },

    // Stats — Sanity stores stats under settings.stats.{founded,springs,employees,years}
    stats: {
      founded: s?.stats?.founded ? loc(s.stats.founded, lang, fallback.stats.founded) : fallback.stats.founded,
      springs: s?.stats?.springs ? loc(s.stats.springs, lang, fallback.stats.springs) : fallback.stats.springs,
      employees: s?.stats?.employees ? loc(s.stats.employees, lang, fallback.stats.employees) : fallback.stats.employees,
      years: s?.stats?.years ? loc(s.stats.years, lang, fallback.stats.years) : fallback.stats.years,
      foundedVal: str(s?.stats?.founded?.value, fallback.stats.foundedVal),
      springsVal: str(s?.stats?.springs?.value, fallback.stats.springsVal),
      employeesVal: str(s?.stats?.employees?.value, fallback.stats.employeesVal),
      yearsVal: str(s?.stats?.years?.value, fallback.stats.yearsVal),
    },

    // Products
    products: {
      ...fallback.products,
      title: s ? fallback.products.title : fallback.products.title,
      helical: helical
        ? {
            name: loc(helical.name, lang, fallback.products.helical.name),
            desc: loc(helical.description, lang, fallback.products.helical.desc),
            detail: loc(helical.detail, lang, fallback.products.helical.detail),
            specs: helical.specs?.map((sp: AnyObj) => loc(sp, lang, '')) ?? fallback.products.helical.specs,
          }
        : fallback.products.helical,
      trapezoidal: trapezoidal
        ? {
            name: loc(trapezoidal.name, lang, fallback.products.trapezoidal.name),
            desc: loc(trapezoidal.description, lang, fallback.products.trapezoidal.desc),
            detail: loc(trapezoidal.detail, lang, fallback.products.trapezoidal.detail),
            specs: trapezoidal.specs?.map((sp: AnyObj) => loc(sp, lang, '')) ?? fallback.products.trapezoidal.specs,
          }
        : fallback.products.trapezoidal,
      parabolic: parabolic
        ? {
            name: loc(parabolic.name, lang, fallback.products.parabolic.name),
            desc: loc(parabolic.description, lang, fallback.products.parabolic.desc),
            detail: loc(parabolic.detail, lang, fallback.products.parabolic.detail),
            specs: parabolic.specs?.map((sp: AnyObj) => loc(sp, lang, '')) ?? fallback.products.parabolic.specs,
          }
        : fallback.products.parabolic,
    },

    // Industries
    industries: {
      ...fallback.industries,
      automotive: automotive
        ? {
            name: loc(automotive.name, lang, fallback.industries.automotive.name),
            desc: loc(automotive.description, lang, fallback.industries.automotive.desc),
          }
        : fallback.industries.automotive,
      railway: railway
        ? {
            name: loc(railway.name, lang, fallback.industries.railway.name),
            desc: loc(railway.description, lang, fallback.industries.railway.desc),
          }
        : fallback.industries.railway,
      industrial: industrial
        ? {
            name: loc(industrial.name, lang, fallback.industries.industrial.name),
            desc: loc(industrial.description, lang, fallback.industries.industrial.desc),
          }
        : fallback.industries.industrial,
    },

    // Footer tagline from settings
    footer: {
      ...fallback.footer,
      tagline: s?.footer?.tagline ? loc(s.footer.tagline, lang, fallback.footer.tagline) : fallback.footer.tagline,
    },

    // Contact info from settings
    contact: {
      ...fallback.contact,
      addressVal: s?.contactInfo?.address ? loc(s.contactInfo.address, lang, fallback.contact.addressVal) : fallback.contact.addressVal,
      phoneVal: str(s?.contactInfo?.phone, fallback.contact.phoneVal),
      emailVal: str(s?.contactInfo?.email, fallback.contact.emailVal),
      icoVal: str(s?.contactInfo?.icoVal, fallback.contact.icoVal),
    },
  };
}

// ---------------------------------------------------------------------------
// About page builder
// ---------------------------------------------------------------------------

export function buildAboutDictionary(
  data: {
    page: AnyObj | null;
    values: AnyObj[] | null;
    team: AnyObj[] | null;
  },
  lang: Locale,
  fallback: Dictionary
): Dictionary {
  const p = data.page;
  const values = data.values ?? [];
  const team = data.team ?? [];

  const about = p?.about;

  return {
    ...fallback,
    about: {
      ...fallback.about,
      title: p?.title ? loc(p.title, lang, fallback.about.title) : fallback.about.title,
      subtitle: p?.subtitle ? loc(p.subtitle, lang, fallback.about.subtitle) : fallback.about.subtitle,
      mission: about?.mission ? loc(about.mission, lang, fallback.about.mission) : fallback.about.mission,
      historyTitle: about?.historyTitle ? loc(about.historyTitle, lang, fallback.about.historyTitle) : fallback.about.historyTitle,
      historyText: about?.historyText ? loc(about.historyText, lang, fallback.about.historyText) : fallback.about.historyText,
      history2: about?.history2 ? loc(about.history2, lang, fallback.about.history2) : fallback.about.history2,
      visionTitle: about?.visionTitle ? loc(about.visionTitle, lang, fallback.about.visionTitle) : fallback.about.visionTitle,
      visionText: about?.visionText ? loc(about.visionText, lang, fallback.about.visionText) : fallback.about.visionText,
      valuesTitle: about?.valuesTitle ? loc(about.valuesTitle, lang, fallback.about.valuesTitle) : fallback.about.valuesTitle,
      managementTitle: about?.managementTitle ? loc(about.managementTitle, lang, fallback.about.managementTitle) : fallback.about.managementTitle,

      values: values.length > 0
        ? values.map((v: AnyObj) => ({
            title: loc(v.title, lang, ''),
            desc: loc(v.description, lang, ''),
          }))
        : fallback.about.values,

      management: team.length > 0
        ? team.map((m: AnyObj) => ({
            name: str(m.name, ''),
            role: loc(m.role, lang, ''),
          }))
        : fallback.about.management,
    },
  };
}

// ---------------------------------------------------------------------------
// Contact page builder
// ---------------------------------------------------------------------------

export function buildContactDictionary(
  data: {
    page: AnyObj | null;
    settings: AnyObj | null;
    departments: AnyObj[] | null;
  },
  lang: Locale,
  fallback: Dictionary
): Dictionary {
  const p = data.page;
  const s = data.settings;
  const departments = data.departments ?? [];

  const contact = p?.contact;

  return {
    ...fallback,
    contact: {
      ...fallback.contact,
      title: p?.title ? loc(p.title, lang, fallback.contact.title) : fallback.contact.title,
      subtitle: p?.subtitle ? loc(p.subtitle, lang, fallback.contact.subtitle) : fallback.contact.subtitle,

      // Contact info from settings
      addressVal: s?.contactInfo?.address
        ? loc(s.contactInfo.address, lang, fallback.contact.addressVal)
        : fallback.contact.addressVal,
      phoneVal: str(s?.contactInfo?.phone, fallback.contact.phoneVal),
      emailVal: str(s?.contactInfo?.email, fallback.contact.emailVal),
      icoVal: str(s?.contactInfo?.icoVal, fallback.contact.icoVal),

      // Form labels from page
      formTitle: contact?.formTitle ? loc(contact.formTitle, lang, fallback.contact.formTitle) : fallback.contact.formTitle,
      formName: contact?.formName ? loc(contact.formName, lang, fallback.contact.formName) : fallback.contact.formName,
      formEmail: contact?.formEmail ? loc(contact.formEmail, lang, fallback.contact.formEmail) : fallback.contact.formEmail,
      formCompany: contact?.formCompany ? loc(contact.formCompany, lang, fallback.contact.formCompany) : fallback.contact.formCompany,
      formSubject: contact?.formSubject ? loc(contact.formSubject, lang, fallback.contact.formSubject) : fallback.contact.formSubject,
      formMessage: contact?.formMessage ? loc(contact.formMessage, lang, fallback.contact.formMessage) : fallback.contact.formMessage,
      formSend: contact?.formSend ? loc(contact.formSend, lang, fallback.contact.formSend) : fallback.contact.formSend,
      formSuccess: contact?.formSuccess ? loc(contact.formSuccess, lang, fallback.contact.formSuccess) : fallback.contact.formSuccess,
      required: contact?.required ? loc(contact.required, lang, fallback.contact.required) : fallback.contact.required,
      departments: contact?.departments ? loc(contact.departments, lang, fallback.contact.departments) : fallback.contact.departments,
      address: contact?.address ? loc(contact.address, lang, fallback.contact.address) : fallback.contact.address,
      phone: contact?.phone ? loc(contact.phone, lang, fallback.contact.phone) : fallback.contact.phone,
      email: contact?.email ? loc(contact.email, lang, fallback.contact.email) : fallback.contact.email,
      ico: contact?.ico ? loc(contact.ico, lang, fallback.contact.ico) : fallback.contact.ico,

      depts: departments.length > 0
        ? departments.map((d: AnyObj) => ({
            name: loc(d.name, lang, ''),
            person: str(d.person, ''),
            phone: str(d.phone, ''),
            email: str(d.email, ''),
          }))
        : fallback.contact.depts,
    },
  };
}

// ---------------------------------------------------------------------------
// Career page builder
// ---------------------------------------------------------------------------

export function buildCareerDictionary(
  data: {
    page: AnyObj | null;
    benefits: AnyObj[] | null;
  },
  lang: Locale,
  fallback: Dictionary
): Dictionary {
  const p = data.page;
  const benefits = data.benefits ?? [];

  const career = p?.career;

  return {
    ...fallback,
    career: {
      ...fallback.career,
      title: p?.title ? loc(p.title, lang, fallback.career.title) : fallback.career.title,
      subtitle: p?.subtitle ? loc(p.subtitle, lang, fallback.career.subtitle) : fallback.career.subtitle,
      intro: career?.intro ? loc(career.intro, lang, fallback.career.intro) : fallback.career.intro,
      whyTitle: career?.whyTitle ? loc(career.whyTitle, lang, fallback.career.whyTitle) : fallback.career.whyTitle,
      openPositions: career?.openPositions ? loc(career.openPositions, lang, fallback.career.openPositions) : fallback.career.openPositions,
      noPositions: career?.noPositions ? loc(career.noPositions, lang, fallback.career.noPositions) : fallback.career.noPositions,
      contactHR: career?.contactHR ? loc(career.contactHR, lang, fallback.career.contactHR) : fallback.career.contactHR,
      sendCV: career?.sendCV ? loc(career.sendCV, lang, fallback.career.sendCV) : fallback.career.sendCV,

      benefits: benefits.length > 0
        ? benefits.map((b: AnyObj) => ({
            title: loc(b.title, lang, ''),
            desc: loc(b.description, lang, ''),
          }))
        : fallback.career.benefits,

      // HR contact info — stored in the page doc (career.hrPerson etc. are plain strings in JSON)
      hrPerson: str(fallback.career.hrPerson, ''),
      hrPhone: str(fallback.career.hrPhone, ''),
      hrEmail: str(fallback.career.hrEmail, ''),
    },
  };
}

// ---------------------------------------------------------------------------
// Products page builder
// ---------------------------------------------------------------------------

export function buildProductsDictionary(
  data: {
    page: AnyObj | null;
    products: AnyObj[] | null;
  },
  lang: Locale,
  fallback: Dictionary
): Dictionary {
  const p = data.page;
  const products = data.products ?? [];

  const prod = (slug: string) => products.find((pr) => pr.slug === slug);
  const helical = prod('helical');
  const trapezoidal = prod('trapezoidal');
  const parabolic = prod('parabolic');

  return {
    ...fallback,
    products: {
      ...fallback.products,
      title: p?.title ? loc(p.title, lang, fallback.products.title) : fallback.products.title,
      subtitle: p?.subtitle ? loc(p.subtitle, lang, fallback.products.subtitle) : fallback.products.subtitle,

      helical: helical
        ? {
            name: loc(helical.name, lang, fallback.products.helical.name),
            desc: loc(helical.description, lang, fallback.products.helical.desc),
            detail: loc(helical.detail, lang, fallback.products.helical.detail),
            specs: helical.specs?.map((sp: AnyObj) => loc(sp, lang, '')) ?? fallback.products.helical.specs,
          }
        : fallback.products.helical,
      trapezoidal: trapezoidal
        ? {
            name: loc(trapezoidal.name, lang, fallback.products.trapezoidal.name),
            desc: loc(trapezoidal.description, lang, fallback.products.trapezoidal.desc),
            detail: loc(trapezoidal.detail, lang, fallback.products.trapezoidal.detail),
            specs: trapezoidal.specs?.map((sp: AnyObj) => loc(sp, lang, '')) ?? fallback.products.trapezoidal.specs,
          }
        : fallback.products.trapezoidal,
      parabolic: parabolic
        ? {
            name: loc(parabolic.name, lang, fallback.products.parabolic.name),
            desc: loc(parabolic.description, lang, fallback.products.parabolic.desc),
            detail: loc(parabolic.detail, lang, fallback.products.parabolic.detail),
            specs: parabolic.specs?.map((sp: AnyObj) => loc(sp, lang, '')) ?? fallback.products.parabolic.specs,
          }
        : fallback.products.parabolic,
    },
  };
}

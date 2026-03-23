import { client } from './client';
import { groq } from 'next-sanity';

// ---------------------------------------------------------------------------
// Individual document queries
// ---------------------------------------------------------------------------

// Site Settings (singleton)
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;

export async function getSiteSettings() {
  return client.fetch(siteSettingsQuery);
}

// Products
export const productsQuery = groq`*[_type == "product"] | order(order asc)`;

export async function getProducts() {
  return client.fetch(productsQuery);
}

// Industries
export const industriesQuery = groq`*[_type == "industry"] | order(order asc)`;

export async function getIndustries() {
  return client.fetch(industriesQuery);
}

// Team Members
export const teamQuery = groq`*[_type == "teamMember"] | order(order asc)`;

export async function getTeamMembers() {
  return client.fetch(teamQuery);
}

// Departments
export const departmentsQuery = groq`*[_type == "department"] | order(order asc)`;

export async function getDepartments() {
  return client.fetch(departmentsQuery);
}

// Values
export const valuesQuery = groq`*[_type == "value"] | order(order asc)`;

export async function getValues() {
  return client.fetch(valuesQuery);
}

// Benefits
export const benefitsQuery = groq`*[_type == "benefit"] | order(order asc)`;

export async function getBenefits() {
  return client.fetch(benefitsQuery);
}

// News Articles
export const newsQuery = groq`*[_type == "newsArticle"] | order(publishedAt desc)`;

export async function getNewsArticles() {
  return client.fetch(newsQuery);
}

// Job Positions (active only)
export const jobsQuery = groq`*[_type == "jobPosition" && isActive == true] | order(publishedAt desc)`;

export async function getJobPositions() {
  return client.fetch(jobsQuery);
}

// Page content by pageId
export const pageQuery = groq`*[_type == "page" && pageId == $pageId][0]`;

export async function getPage(pageId: string) {
  return client.fetch(pageQuery, { pageId });
}

// ---------------------------------------------------------------------------
// Batched page-level queries (single round-trip per page)
// ---------------------------------------------------------------------------

// All data for homepage
export async function getHomePageData() {
  return client.fetch(groq`{
    "settings": *[_type == "siteSettings"][0],
    "products": *[_type == "product"] | order(order asc),
    "industries": *[_type == "industry"] | order(order asc),
    "news": *[_type == "newsArticle"] | order(publishedAt desc)[0...3]
  }`);
}

// All data for products page
export async function getProductsPageData() {
  return client.fetch(groq`{
    "page": *[_type == "page" && pageId == "products"][0],
    "products": *[_type == "product"] | order(order asc)
  }`);
}

// All data for about page
export async function getAboutPageData() {
  return client.fetch(groq`{
    "page": *[_type == "page" && pageId == "about"][0],
    "values": *[_type == "value"] | order(order asc),
    "team": *[_type == "teamMember"] | order(order asc)
  }`);
}

// All data for contact page
export async function getContactPageData() {
  return client.fetch(groq`{
    "page": *[_type == "page" && pageId == "contact"][0],
    "settings": *[_type == "siteSettings"][0],
    "departments": *[_type == "department"] | order(order asc)
  }`);
}

// All data for career page
export async function getCareerPageData() {
  return client.fetch(groq`{
    "page": *[_type == "page" && pageId == "career"][0],
    "benefits": *[_type == "benefit"] | order(order asc),
    "jobs": *[_type == "jobPosition" && isActive == true] | order(publishedAt desc)
  }`);
}

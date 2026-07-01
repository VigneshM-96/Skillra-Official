import { useEffect } from 'react'
import { fetchPageMeta, fetchCourseMeta } from '../sanityClient'  // ← ADD fetchCourseMeta

function setMeta(attr, value, content) {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${value}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, value); document.head.appendChild(el) }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  if (!href) return
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el) }
  el.setAttribute('href', href)
}

function setJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) { el = document.createElement('script'); el.type = 'application/ld+json'; el.id = id; document.head.appendChild(el) }
  el.textContent = JSON.stringify(data)
}

function applyMeta(pageKey, data, fallback) {
  const meta = {
    title:      data?.metaTitle       || fallback.title       || 'Skillra',
    description:data?.metaDescription || fallback.description || '',
    keywords:   data?.keywords        || fallback.keywords    || '',
    canonical:  data?.canonicalUrl    || fallback.canonicalUrl|| '',
    ogImageAlt: data?.ogImageAlt      || fallback.ogImageAlt  || 'Skillra',
    robots:     data?.robots          || fallback.robots      || 'index, follow',
    ogImageUrl: data?.ogImageUrl      || fallback.ogImage     || '',  // ← now reads from Sanity too
  }
  document.title = meta.title
  setMeta('name', 'description',       meta.description)
  setMeta('name', 'keywords',          meta.keywords)
  setMeta('name', 'robots',            meta.robots)
  setMeta('name', 'author',            'Skillra')
  setLink('canonical',                 meta.canonical)
  setMeta('property', 'og:type',       'website')
  setMeta('property', 'og:url',        meta.canonical)
  setMeta('property', 'og:title',      meta.title)
  setMeta('property', 'og:description',meta.description)
  setMeta('property', 'og:image',      meta.ogImageUrl)
  setMeta('property', 'og:image:alt',  meta.ogImageAlt)
  setMeta('property', 'og:site_name',  'Skillra')
  setMeta('property', 'og:locale',     'en_IN')
  setMeta('name', 'twitter:card',        'summary_large_image')
  setMeta('name', 'twitter:title',       meta.title)
  setMeta('name', 'twitter:description', meta.description)
  setMeta('name', 'twitter:image',       meta.ogImageUrl)
  setMeta('name', 'twitter:image:alt',   meta.ogImageAlt)
  setJsonLd(`skillra-${pageKey}-jsonld`, {
    '@context':  'https://schema.org',
    '@type':     'WebPage',
    name:        meta.title,
    description: meta.description,
    url:         meta.canonical,
    publisher: { '@type': 'Organization', name: 'Skillra Health Innovations Pvt Ltd', logo: '/logo.png', url: 'https://www.skillra.com' },
  })
}

// ── for static pages (home, about, contact …) ──────────────────
export function useSanityMeta(pageKey, fallback = {}) {
  useEffect(() => {
    let cancelled = false
    fetchPageMeta(pageKey)
      .then((data) => { if (!cancelled) applyMeta(pageKey, data, fallback) })
      .catch(() => { if (fallback.title) document.title = fallback.title })
    return () => { cancelled = true }
  }, [pageKey])
}

// ── for individual course pages ─────────────────────────────────
export function useCourseMeta(courseSlug, fallback = {}) {
  useEffect(() => {
    let cancelled = false
    fetchCourseMeta(courseSlug)
      .then((data) => { if (!cancelled) applyMeta(courseSlug, data, fallback) })
      .catch(() => { if (fallback.title) document.title = fallback.title })
    return () => { cancelled = true }
  }, [courseSlug])
}
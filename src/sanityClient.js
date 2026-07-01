import { createClient } from '@sanity/client'
import imageUrlBuilder  from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'o8wkzf6d',
  dataset:   'production',
  apiVersion: '2024-01-01',
  useCdn:    false,
})

const builder = imageUrlBuilder(sanityClient)
export function urlFor(source) {
  return builder.image(source)
}

export async function fetchPageMeta(pageKey) {
  const query = `
    *[_type == "pageMeta" && page == $pageKey][0] {
      metaTitle, metaDescription, keywords, canonicalUrl, ogImage, ogImageAlt, robots
    }
  `
  return sanityClient.fetch(query, { pageKey })
}

export async function fetchCourseMeta(slug) {
  return sanityClient.fetch(
    `*[_type == "course" && slug.current == $slug][0]{
      metaTitle, metaDescription, keywords, canonicalUrl,
      "ogImageUrl": ogImage.asset->url, ogImageAlt, robots
    }`,
    { slug }
  )
}

// ── Shared body projection ─────────────────────────────────────────────────
const BODY_PROJECTION = `
  body[] {
    ...,
    markDefs[] {
      ...,
      _type == "link" => { "href": href }
    },
    _type == "image" => {
      ...,
      "asset": asset->{ _id, url, metadata { dimensions } }
    }
  }
`

// ── Shared blog field projection ───────────────────────────────────────────
const BLOG_FIELDS = `
  title,
  "slug": slug.current,
  publishedAt,
  tag,
  tagColor,
  tagBg,
  author,
  authorInitial,
  authorColor,
  excerpt,
  readTime,
  "image": image.asset->url,
  ${BODY_PROJECTION},
  metaTitle,
  metaDescription
`

export async function fetchAllPosts() {
  const query = `*[_type == "siteSettings"][0].blogs[] { ${BLOG_FIELDS} }`
  const data = await sanityClient.fetch(query)
  console.log('Sanity blogs fetched:', data)
  console.log('First post body:', JSON.stringify(data?.[0]?.body, null, 2)) // ← debug
  return data
}

export async function fetchPostBySlug(slug) {
  const query = `*[_type == "siteSettings"][0].blogs[] { ${BLOG_FIELDS} }`
  const allBlogs = await sanityClient.fetch(query)

  const found = allBlogs?.find(b => b.slug === slug)
  console.log('fetchPostBySlug - body:', JSON.stringify(found?.body, null, 2)) // ← debug
  return found || null
}
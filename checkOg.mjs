import { sanityClient } from './src/sanityClient.js'

const data = await sanityClient.fetch(
  `*[_type == "pageMeta" && page == "home"][0]{
    metaTitle,
    ogImage,
    "ogImageUrl": ogImage.asset->url,
    ogImageAlt
  }`
)

console.log(JSON.stringify(data, null, 2))
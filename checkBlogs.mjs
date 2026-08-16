import { sanityClient } from './src/sanityClient.js'

const data = await sanityClient.fetch(
  `*[_type == "siteSettings"][0].blogs[]{ "slug": slug.current, title }`
)

console.log(JSON.stringify(data, null, 2))
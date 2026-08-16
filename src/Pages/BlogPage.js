// src/Pages/BlogPage.js
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams }       from 'react-router-dom'
import { PortableText }                 from '@portabletext/react'

import Footer        from './Footer'
import SocialSidebar from '../components/SocialSideBar'

import { fetchAllPosts, fetchPostBySlug } from '../sanityClient'
import { useSanityMeta }                  from '../hooks/useSanityMeta'
import { BLOG_POSTS }                     from './BlogDatas'

// ─────────────────────────────────────────────────────────────────────────────
// Normalise a local BLOG_POSTS entry to match Sanity shape
// ─────────────────────────────────────────────────────────────────────────────
function normaliseLocal(b) {
  return {
    ...b,
    _id:         b.id,
    slug:        b.slug,
    publishedAt: b.date ? new Date(b.date).toISOString() : null,
    body:        null,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Local fallback meta
// ─────────────────────────────────────────────────────────────────────────────
const BLOGS_META_FALLBACK = {
  title:       'Blogs | Skillra – Insights on Medical Coding, IT & Career Growth',
  description: "Read Skillra's latest blogs on AI Medical Coding, IT trends, career tips, industry insights, and professional development.",
  keywords:    'Skillra blogs, medical coding blog, AI medical coding insights, IT career tips',
  canonicalUrl:'https://www.skillra.com/blog',
  robots:      'index, follow',
}

// ─────────────────────────────────────────────────────────────────────────────
// useInView hook
// ─────────────────────────────────────────────────────────────────────────────
function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0, rootMargin: '0px 0px -10px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return [ref, inView]
}

// ─────────────────────────────────────────────────────────────────────────────
// Portable Text components
// ─────────────────────────────────────────────────────────────────────────────
const ptComponents = {
  block: {
    normal: ({ children }) => (
      <p className="pt-normal">{children}</p>
    ),

    h2: ({ children }) => (
      <h2 className="pt-h2">{children}</h2>
    ),

    h3: ({ children }) => (
      <h3 className="pt-h3">{children}</h3>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="pt-list pt-list--bullet">
        {children}
      </ul>
    ),

    number: ({ children }) => (
      <ol className="pt-list pt-list--number">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="pt-list-item">{children}</li>
    ),

    number: ({ children }) => (
      <li className="pt-list-item">{children}</li>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="pt-strong">{children}</strong>
    ),

    em: ({ children }) => (
      <em>{children}</em>
    ),
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Plain-text body renderer
// ─────────────────────────────────────────────────────────────────────────────
function PlainTextBody({ content }) {
  if (!content) return null
  return (
    <>
      {content.split('\n\n').map((para, i) => {
        const trimmed = para.trim()
        if (!trimmed) return null
        if (trimmed.startsWith('**') && trimmed.endsWith('**'))
          return <h2 key={i} className="pt-h2">{trimmed.replace(/\*\*/g, '')}</h2>
        const parts = trimmed.split(/(\*\*[^*]+\*\*)/)
        return (
          <p key={i} className="pt-normal">
            {parts.map((part, j) =>
              part.startsWith('**') && part.endsWith('**')
                ? <strong key={j} className="pt-strong">{part.replace(/\*\*/g, '')}</strong>
                : part
            )}
          </p>
        )
      })}
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Loading Spinner
// ─────────────────────────────────────────────────────────────────────────────
function LoadingSpinner() {
  return (
    <div className="spinner-wrap">
      <div className="spinner" />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Related Post Card (fixed sidebar)
// ─────────────────────────────────────────────────────────────────────────────
function RelatedCard({ blog }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`related-card${hovered ? ' related-card--hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => { navigate(`/blog/${blog.slug}`); window.scrollTo({ top: 0 }) }}
    >
      <div className="related-card__thumb">
        <img
          src={blog.image} alt={blog.title}
          className={`related-card__img${hovered ? ' related-card__img--hovered' : ''}`}
          loading="lazy" decoding="async"
          style={{ aspectRatio: "16 / 9" }}
          onError={e => { e.target.style.display = 'none' }}
        />
        <span className="related-card__tag" style={{ background: blog.tagColor || '#6d28d9' }}>
          {blog.tag}
        </span>
      </div>
      <div className="related-card__body">
        <h4 className="related-card__title">{blog.title}</h4>
        <p className="related-card__excerpt">{blog.excerpt}</p>
        <div className="related-card__footer">
          <span className="related-card__readtime">{blog.readTime}</span>
          <span className="related-card__read-link" style={{ color: blog.tagColor || '#6d28d9' }}>
            Read
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke={blog.tagColor || '#6d28d9'} strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Blog Detail
// ─────────────────────────────────────────────────────────────────────────────
function BlogDetail({ slug, onBack, allPosts = [] }) {
  const [blog,    setBlog]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [bodyRef] = useInView()

  useEffect(() => {
    setLoading(true)
    fetchPostBySlug(slug)
      .then(data => {
        setBlog(data || (BLOG_POSTS.find(b => b.slug === slug) ? normaliseLocal(BLOG_POSTS.find(b => b.slug === slug)) : null))
        setLoading(false)
      })
      .catch(() => {
        const local = BLOG_POSTS.find(b => b.slug === slug)
        setBlog(local ? normaliseLocal(local) : null)
        setLoading(false)
      })
  }, [slug])

  useEffect(() => {
    if (!blog) return
    const title = blog.metaTitle || `${blog.title} | Skillra Blog`
    const desc  = blog.metaDescription || blog.excerpt || ''
    document.title = title
    const setM = (a, v, c) => {
      let el = document.querySelector(`meta[${a}="${v}"]`)
      if (!el) { el = document.createElement('meta'); el.setAttribute(a, v); document.head.appendChild(el) }
      el.setAttribute('content', c)
    }
    const setL = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`)
      if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el) }
      el.setAttribute('href', href)
    }
    setM('name',     'description',    desc)
    setL('canonical', `https://www.skillra.com/blog/${blog.slug}`)
    setM('property', 'og:type',        'article')
    setM('property', 'og:url',         `https://www.skillra.com/blog/${blog.slug}`)
    setM('property', 'og:title',       title)
    setM('property', 'og:description', desc)
    setM('property', 'og:image',       blog.image || '')
  }, [blog])

  useEffect(() => { window.scrollTo({ top: 0 }) }, [slug])

  if (loading) return <LoadingSpinner />
  if (!blog)   return null

  // Pick 2 related posts – prefer same tag, exclude current
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug)
    .sort((a, b) => (b.tag === blog.tag ? 1 : 0) - (a.tag === blog.tag ? 1 : 0))
    .slice(0, 2)

  return (
    <div className="detail-page">

      {/* ── Hero (full width, scrolls away normally) ── */}
      <div className="detail-hero">
        <img src={blog.image} alt={blog.title} className="detail-hero__img"
          fetchpriority="high" decoding="async"
          style={{ aspectRatio: "21 / 9" }}
          onError={e => { e.target.style.display = 'none' }} />
        <div className="detail-hero__gradient" />
        <div className="detail-hero__content">
          <span className="detail-hero__tag" style={{ background: blog.tagColor || '#6d28d9' }}>
            {blog.tag}
          </span>
          <h1 className="detail-hero__title">{blog.title}</h1>
          <div className="detail-hero__meta">
            <div className="detail-hero__author">
              <div className="detail-hero__avatar"
                style={{ background: blog.authorColor || blog.tagColor || '#6d28d9' }}>
                {blog.authorInitial || 'S'}
              </div>
              <span className="detail-hero__author-name">{blog.author || 'Skillra Team'}</span>
            </div>
            <span className="detail-hero__dot">·</span>
            <span className="detail-hero__date">
              {blog.publishedAt
                ? new Date(blog.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
                : ''}
            </span>
            <span className="detail-hero__dot">·</span>
            <span className="detail-hero__readtime">{blog.readTime}</span>
          </div>
        </div>
      </div>

      {/* ── Back Button ── */}
      <div className="detail-back-wrap">
        <a href="/blog" className="detail-back-btn"
          onClick={e => { e.preventDefault(); onBack() }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to Blogs
        </a>
      </div>

      {/* ── Article — normal page scroll, right margin leaves room for sidebar ── */}
      <article ref={bodyRef} className="detail-article">
        <blockquote className="detail-excerpt" style={{ borderColor: blog.tagColor || '#6d28d9' }}>
          {blog.excerpt}
        </blockquote>
        <div className="detail-body">
          {blog.body && Array.isArray(blog.body) && blog.body.length > 0 && (
            <PortableText
              value={blog.body.map((block, i) => ({ ...block, _key: block._key || `block-${i}` }))}
              components={ptComponents}
            />
          )}
          {blog.body && typeof blog.body === 'string' && <PlainTextBody content={blog.body} />}
          {!blog.body && blog.content && <PlainTextBody content={blog.content} />}
        </div>
      </article>

      {/* ── Sidebar — position:fixed, always visible, never scrolls ── */}
      {relatedPosts.length > 0 && (
        <aside className="detail-sidebar">
          <div className="detail-sidebar__header">
            <span className="detail-sidebar__eyebrow">Continue Reading</span>
            <div className="detail-sidebar__line" />
          </div>
          <div className="detail-sidebar__cards">
            {relatedPosts.map(related => (
              <RelatedCard key={related.slug} blog={related} />
            ))}
          </div>
        </aside>
      )}

    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Blog Card (grid)
// ─────────────────────────────────────────────────────────────────────────────
function BlogCard({ blog, inView, delay, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`blog-card${inView ? ' blog-card--visible' : ''}${hovered ? ' blog-card--hovered' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="blog-card__thumb">
        <img src={blog.image} alt={blog.title}
          className={`blog-card__img${hovered ? ' blog-card__img--hovered' : ''}`}
          loading="lazy" decoding="async"
          style={{ aspectRatio: "16 / 9" }}
          onError={e => {
            e.target.style.display = 'none'
            e.target.parentNode.style.background = (blog.tagColor || '#6d28d9') + '22'
          }}
        />
        <div className="blog-card__thumb-overlay" />
        <span className="blog-card__tag" style={{ background: blog.tagColor || '#6d28d9' }}>{blog.tag}</span>
        <span className="blog-card__readtime">{blog.readTime}</span>
      </div>
      <div className="blog-card__body">
        <div className="blog-card__author-row">
          <div className="blog-card__avatar" style={{ background: blog.authorColor || blog.tagColor || '#6d28d9' }}>
            {blog.authorInitial || 'S'}
          </div>
          <span className="blog-card__author-name">{blog.author || 'Skillra Team'}</span>
          <span className="blog-card__dot">·</span>
          <span className="blog-card__date">
            {blog.publishedAt
              ? new Date(blog.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
              : blog.date || ''}
          </span>
        </div>
        <h3 className="blog-card__title">{blog.title}</h3>
        <p className="blog-card__excerpt">{blog.excerpt}</p>
        <div className="blog-card__footer">
          <a href={`/blog/${blog.slug}`} className="blog-card__read-link"
            style={{ color: blog.tagColor || '#6d28d9' }}
            onClick={e => { e.preventDefault(); onClick() }}>
            Read article
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke={blog.tagColor || '#6d28d9'} strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          <span className="blog-card__badge"
            style={{ background: blog.tagBg || '#ede9fe', color: blog.tagColor || '#6d28d9' }}>
            {blog.tag}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Blog Page
// ─────────────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const { slug }  = useParams()
  const navigate  = useNavigate()

  const [posts,        setPosts]        = useState([])
  const [loading,      setLoading]      = useState(true)
  const [activeFilter, setActiveFilter] = useState('All')

  const [heroRef,  heroInView]  = useInView()
  const [cardsRef, cardsInView] = useInView()

  useSanityMeta(slug ? null : 'blogs', BLOGS_META_FALLBACK)

  useEffect(() => {
    fetchAllPosts()
      .then(data => {
        const sanityPosts = data && data.length > 0 ? data : []
        const localPosts  = BLOG_POSTS.map(normaliseLocal)
        const sanitySlug  = new Set(sanityPosts.map(p => p.slug))
        const uniqueLocal = localPosts.filter(p => !sanitySlug.has(p.slug))
        setPosts([...sanityPosts, ...uniqueLocal])
        setLoading(false)
      })
      .catch(() => {
        setPosts(BLOG_POSTS.map(normaliseLocal))
        setLoading(false)
      })
  }, [])

  if (slug) {
    return (
      <div className="blog-root">
        <BlogStyles />
        <BlogDetail
          slug={slug}
          allPosts={posts.length > 0 ? posts : BLOG_POSTS.map(normaliseLocal)}
          onBack={() => { navigate('/blog'); window.scrollTo({ top: 0 }) }}
        />
      </div>
    )
  }

  const categories = ['All', ...Array.from(new Set(posts.map(b => b.tag).filter(Boolean)))]
  const filtered   = activeFilter === 'All' ? posts : posts.filter(b => b.tag === activeFilter)

  return (
    <div className="blog-root blog-root--list">
      <BlogStyles />

      <header ref={heroRef} className={`blog-hero${heroInView ? ' blog-hero--visible' : ''}`}>
        <div className="blog-hero__noise" />
        <div className="blog-hero__glow blog-hero__glow--a" />
        <div className="blog-hero__glow blog-hero__glow--b" />
        <div className="blog-hero__inner">
          <p className="blog-hero__eyebrow">Insights &amp; Updates</p>
          <h1 className="blog-hero__title">
            Learn. Grow.{' '}
            <span className="blog-hero__title--accent">Get Placed.</span>
          </h1>
          <p className="blog-hero__sub">
            Expert articles on career-boosting courses, industry trends, and placement strategies — straight from the Skillra team.
          </p>
        </div>
      </header>

      <div className={`filter-bar${heroInView ? ' filter-bar--visible' : ''}`}>
        {categories.map(cat => (
          <button key={cat}
            className={`filter-pill${activeFilter === cat ? ' filter-pill--active' : ''}`}
            onClick={() => setActiveFilter(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <main ref={cardsRef} className="blog-grid-wrap">
        {loading ? <LoadingSpinner /> : (
          <div className="blog-grid">
            {filtered.map((blog, i) => (
              <BlogCard key={blog.slug} blog={blog} inView={cardsInView}
                delay={i * 90} onClick={() => navigate(`/blog/${blog.slug}`)} />
            ))}
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="blog-empty">No articles found in this category.</div>
        )}
      </main>

      <SocialSidebar />
      <Footer />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// All styles
// ─────────────────────────────────────────────────────────────────────────────
function BlogStyles() {
  return (
    <style>{`
      
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --purple:       #6d28d9;
        --purple-light: #8b5cf6;
        --purple-pale:  #ede9fe;
        --ink:          #0f0a1e;
        --ink-mid:      #3b3553;
        --ink-soft:     #7c7592;
        --surface:      #faf9ff;
        --white:        #ffffff;
        --border:       #e8e4f4;
        --font-display: 'Fraunces', Georgia, serif;
        --font-body:    'DM Sans', system-ui, sans-serif;
        --radius:       18px;
        --shadow-sm:    0 2px 12px rgba(109,40,217,0.07);
        --shadow-md:    0 8px 32px rgba(109,40,217,0.12);
        --shadow-lg:    0 20px 60px rgba(109,40,217,0.16);
        --sidebar-w:    300px;
        --sidebar-gap:  32px;
        --sidebar-right: 40px;
      }

      /* ── Root ── */
      .blog-root {
        min-height: 100vh;
        font-family: var(--font-body);
        background: var(--surface);
        color: var(--ink);
        overflow-x: hidden;
      }
      .blog-root--list {
        background: linear-gradient(160deg, #f5f1ff 0%, #faf9ff 55%, #f0f7ff 100%);
      }

      /* ── Spinner ── */
      .spinner-wrap {
        min-height: 60vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .spinner {
        width: 38px; height: 38px;
        border-radius: 50%;
        border: 3px solid var(--purple-pale);
        border-top-color: var(--purple);
        animation: spin 0.75s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }

      /* ══════════════════════════════════════════
         DETAIL PAGE
      ══════════════════════════════════════════ */
      .detail-page {
        min-height: 100vh;
        background: var(--surface);
      }

      /* Hero */
      .detail-hero {
        position: relative;
        height: clamp(440px, 42vw, 580px);
        overflow: hidden;
      }
      .detail-hero__img {
        width: 100%; height: 100%;
        object-fit: cover;
        filter: brightness(0.4);
      }
      .detail-hero__gradient {
        position: absolute; inset: 0;
        background: linear-gradient(to top, rgba(10,5,25,0.92) 35%, rgba(10,5,25,0.2) 70%, transparent);
      }
      .detail-hero__content {
        position: absolute; bottom: 0; left: 0; right: 0;
        padding: 0 clamp(20px, 6vw, 80px) 44px;
      }
      .detail-hero__tag {
        display: inline-block; color: #fff;
        font-size: 10px; font-weight: 700; letter-spacing: 1.2px;
        text-transform: uppercase; padding: 4px 12px;
        border-radius: 20px; margin-bottom: 16px;
      }
      .detail-hero__title {
        font-family: var(--font-display);
        font-size: clamp(22px, 4vw, 38px);
        font-weight: 900; color: #fff;
        line-height: 1.2; letter-spacing: -0.5px; max-width: 780px;
      }
      .detail-hero__meta {
        display: flex; align-items: center; gap: 12px;
        margin-top: 18px; flex-wrap: wrap;
      }
      .detail-hero__author { display: flex; align-items: center; gap: 8px; }
      .detail-hero__avatar {
        width: 28px; height: 28px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 11px; font-weight: 700; color: #fff; flex-shrink: 0;
      }
      .detail-hero__author-name { color: #ddd; font-size: 13px; }
      .detail-hero__dot         { color: #666; font-size: 12px; }
      .detail-hero__date        { color: #aaa; font-size: 12px; }
      .detail-hero__readtime    { color: #aaa; font-size: 12px; }

      /* Back button */
      .detail-back-wrap {
        padding: 26px clamp(20px, 6vw, 80px) 0;
      }
      .detail-back-btn {
        text-decoration: none;
        display: inline-flex; align-items: center; gap: 8px;
        background: var(--white); border: 1.5px solid var(--border);
        border-radius: 50px; padding: 8px 18px;
        font-size: 13px; font-weight: 600; color: var(--ink-mid);
        font-family: var(--font-body); cursor: pointer;
        transition: all 0.2s ease;
      }
      .detail-back-btn:hover {
        background: var(--purple); color: #fff; border-color: var(--purple);
      }

      /* ── Article
         Right padding = sidebar width + gap + right offset
         so text never goes under the sidebar ── */
      .detail-article {
        padding: 32px clamp(20px, 6vw, 80px) 100px;
        /* Reserve space on the right for the fixed sidebar */
        padding-right: calc(var(--sidebar-w) + var(--sidebar-gap) + var(--sidebar-right) + 20px);
        max-width: 1200px;
      }
      .detail-excerpt {
        font-family: var(--font-display);
        font-size: clamp(15px, 1.8vw, 18px);
        font-style: italic; font-weight: 300;
        color: var(--ink-mid); line-height: 1.75;
        border-left: 4px solid var(--purple);
        padding-left: 22px; margin-bottom: 32px;
      }
      .pt-normal {
        font-size: clamp(13.5px, 1.4vw, 15.5px);
        color: #4b5563; font-family: var(--font-body);
        line-height: 1.85; margin-bottom: 12px;
      }
      .pt-h2 {
        font-family: var(--font-display); font-weight: 700;
        color: var(--ink); font-size: clamp(16px, 1.8vw, 19px);
        margin-top: 28px; margin-bottom: 8px; line-height: 1.3;
      }
      .pt-h3 {
        font-family: var(--font-display); font-weight: 700;
        color: var(--ink-mid); font-size: clamp(14px, 1.5vw, 16px);
        margin-top: 20px; margin-bottom: 6px; line-height: 1.35;
      }
      .pt-strong { font-weight: 700; color: var(--ink); }

      /* ── Portable Text Lists ── */

.pt-list {
  margin: 16px 0 22px;
  padding-left: 28px;
}

.pt-list--bullet {
  list-style-type: disc;
}

.pt-list--number {
  list-style-type: decimal;
}

.pt-list-item {
  font-size: clamp(13.5px, 1.4vw, 15.5px);
  color: #4b5563;
  font-family: var(--font-body);
  line-height: 1.85;
  margin-bottom: 7px;
  padding-left: 6px;
}

.pt-list-item::marker {
  color: var(--purple);
  font-weight: 700;
}

      /* ── Sidebar — position:fixed, stays put while page scrolls ── */
      .detail-sidebar {
        position: fixed;
        top: 55%;
        transform: translateY(-50%);
        right: var(--sidebar-right);
        width: var(--sidebar-w);
        z-index: 100;
      }
      .detail-sidebar__header {
        display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
      }
      .detail-sidebar__eyebrow {
        font-size: 10px; font-weight: 700; letter-spacing: 2.5px;
        text-transform: uppercase; color: var(--purple-light); white-space: nowrap;
      }
      .detail-sidebar__line { flex: 1; height: 1px; background: var(--border); }
      .detail-sidebar__cards { display: flex; flex-direction: column; gap: 18px; }

      /* ── Related Card ── */
      .related-card {
        background: var(--white); border-radius: 14px; overflow: hidden;
        border: 1px solid var(--border); box-shadow: var(--shadow-sm);
        cursor: pointer;
        transition: box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
      }
      .related-card--hovered {
        box-shadow: var(--shadow-md); transform: translateY(-3px); border-color: transparent;
      }
      .related-card__thumb { position: relative; height: 130px; overflow: hidden; }
      .related-card__img {
        width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;
      }
      .related-card__img--hovered { transform: scale(1.07); }
      .related-card__tag {
        position: absolute; top: 9px; left: 9px; color: #fff;
        font-size: 9px; font-weight: 700; letter-spacing: 0.8px;
        text-transform: uppercase; padding: 3px 9px; border-radius: 20px;
      }
      .related-card__body { padding: 13px 14px 15px; }
      .related-card__title {
        font-family: var(--font-display); font-size: 13.5px; font-weight: 700;
        color: var(--ink); line-height: 1.35; margin-bottom: 7px;
        display: -webkit-box; -webkit-line-clamp: 2;
        -webkit-box-orient: vertical; overflow: hidden;
      }
      .related-card__excerpt {
        font-size: 11.5px; color: var(--ink-soft); line-height: 1.6;
        display: -webkit-box; -webkit-line-clamp: 2;
        -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 10px;
      }
      .related-card__footer {
        display: flex; align-items: center; justify-content: space-between;
        padding-top: 10px; border-top: 1px solid var(--border);
      }
      .related-card__readtime { font-size: 11px; color: #bbb; }
      .related-card__read-link {
        font-size: 11px; font-weight: 700;
        display: inline-flex; align-items: center; gap: 3px;
      }

      /* ── Hide fixed sidebar on narrow screens ── */
      @media (max-width: 1100px) {
        .detail-sidebar { display: none; }
        .detail-article { padding-right: clamp(20px, 6vw, 80px); }
      }

      /* ══════════════════════════════════════════
         LIST PAGE
      ══════════════════════════════════════════ */

      /* Hero */
      .blog-hero {
        position: relative; text-align: center;
        padding: clamp(100px, 12vw, 140px) clamp(20px, 6vw, 80px) clamp(40px, 5vw, 60px);
        overflow: hidden;
      }
      .blog-hero__noise {
        position: absolute; inset: 0; pointer-events: none;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
      }
      .blog-hero__glow {
        position: absolute; border-radius: 50%; filter: blur(80px);
        pointer-events: none; opacity: 0.18;
      }
      .blog-hero__glow--a { width: 400px; height: 400px; background: var(--purple-light); top: -100px; left: -80px; }
      .blog-hero__glow--b { width: 300px; height: 300px; background: #a78bfa; bottom: -60px; right: -40px; }
      .blog-hero__inner {
        position: relative; max-width: 620px; margin: 0 auto;
        opacity: 0; transform: translateY(28px);
        transition: opacity 0.7s ease, transform 0.7s ease;
      }
      .blog-hero--visible .blog-hero__inner { opacity: 1; transform: translateY(0); }
      .blog-hero__eyebrow {
        font-size: 11px; font-weight: 600; letter-spacing: 3px;
        text-transform: uppercase; color: var(--purple-light); margin-bottom: 14px;
      }
      .blog-hero__title {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: clamp(32px, 5.5vw, 52px);
        font-weight: 900; color: var(--ink);
        line-height: 1.1; letter-spacing: -1px; margin-bottom: 18px;
      }
      .blog-hero__title--accent {
        font-style: italic;
        background: linear-gradient(135deg, var(--purple), var(--purple-light));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      }
      .blog-hero__sub {
        font-size: clamp(14px, 1.6vw, 16px); color: var(--ink-soft);
        line-height: 1.75; font-weight: 300; max-width: 460px; margin: 0 auto;
      }

      /* Filter bar */
      .filter-bar {
        display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;
        padding: 0 clamp(20px, 6vw, 80px) clamp(28px, 4vw, 40px);
        opacity: 0; transform: translateY(16px);
        transition: opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s;
      }
      .filter-bar--visible { opacity: 1; transform: translateY(0); }
      .filter-pill {
        font-family: var(--font-body); font-size: 13px; font-weight: 500;
        color: var(--ink-soft); background: var(--white); border: 1.5px solid var(--border);
        border-radius: 50px; padding: 7px 18px; cursor: pointer; transition: all 0.2s ease;
      }
      .filter-pill:hover { border-color: var(--purple-light); color: var(--purple); background: var(--purple-pale); }
      .filter-pill--active { background: var(--purple); color: var(--white); border-color: var(--purple); }

      /* Grid */
      .blog-grid-wrap {
        padding: 0 clamp(16px, 4vw, 48px) 100px;
        max-width: 1200px; margin: 0 auto;
      }
      .blog-grid {
        display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px;
      }
      @media (max-width: 1024px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 640px)  { .blog-grid { grid-template-columns: 1fr; } }
      .blog-empty {
        text-align: center; padding: 80px 0;
        color: var(--ink-soft); font-size: 15px; font-style: italic;
      }

      /* Blog card */
      .blog-card {
        background: var(--white); border-radius: var(--radius); overflow: hidden;
        display: flex; flex-direction: column;
        box-shadow: var(--shadow-sm); border: 1px solid var(--border);
        opacity: 0; transform: translateY(36px);
        transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease, border-color 0.3s ease;
      }
      .blog-card--visible  { opacity: 1; transform: translateY(0); }
      .blog-card--hovered  { box-shadow: var(--shadow-lg); border-color: transparent; }
      .blog-card__thumb    { position: relative; height: 200px; overflow: hidden; flex-shrink: 0; }
      .blog-card__img      { width: 100%; height: 100%; object-fit: cover; transition: transform 0.55s ease; }
      .blog-card__img--hovered { transform: scale(1.07); }
      .blog-card__thumb-overlay {
        position: absolute; inset: 0;
        background: linear-gradient(to top, rgba(15,10,30,0.4) 0%, transparent 60%);
      }
      .blog-card__tag {
        position: absolute; top: 12px; left: 12px; color: #fff;
        font-size: 10px; font-weight: 700; letter-spacing: 0.8px;
        text-transform: uppercase; padding: 3px 10px; border-radius: 20px;
      }
      .blog-card__readtime {
        position: absolute; bottom: 10px; right: 12px;
        background: rgba(0,0,0,0.5); color: #fff;
        font-size: 10px; padding: 3px 9px; border-radius: 20px; backdrop-filter: blur(4px);
      }
      .blog-card__body {
        padding: 20px 20px 22px; flex: 1;
        display: flex; flex-direction: column; gap: 10px;
      }
      .blog-card__author-row { display: flex; align-items: center; gap: 8px; }
      .blog-card__avatar {
        width: 24px; height: 24px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 10px; font-weight: 700; color: #fff; flex-shrink: 0;
      }
      .blog-card__author-name { font-size: 12px; color: var(--ink-soft); }
      .blog-card__dot  { color: #ccc; font-size: 10px; }
      .blog-card__date { font-size: 12px; color: #aaa; }
      .blog-card__title {
        font-family: font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif; font-size: 17px; font-weight: 700;
        color: var(--ink); line-height: 1.3; letter-spacing: -0.3px;
        display: -webkit-box; -webkit-line-clamp: 2;f
        -webkit-box-orient: vertical; overflow: hidden;
      }
      .blog-card__excerpt {
        font-size: 13px; color: var(--ink-soft); line-height: 1.65; flex: 1;
        display: -webkit-box; -webkit-line-clamp: 3;
        -webkit-box-orient: vertical; overflow: hidden;
      }
      .blog-card__footer {
        margin-top: 4px; padding-top: 14px; border-top: 1px solid var(--border);
        display: flex; align-items: center; justify-content: space-between;
      }
      .blog-card__read-link {
        text-decoration: none; font-size: 13px; font-weight: 600;
        display: inline-flex; align-items: center; gap: 5px; transition: gap 0.2s ease;
      }
      .blog-card__read-link:hover { gap: 9px; }
      .blog-card__badge { font-size: 10px; font-weight: 600; padding: 3px 9px; border-radius: 12px; }

      @media (max-width: 860px) { .blog-grid-wrap { padding: 0 20px 60px; } }
    `}</style>
  )
}
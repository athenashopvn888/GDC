import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./blogpost.module.css";
import { getStaticPost, STORE_BLOG_CONFIG, type StaticBlogPost } from "../staticPosts";

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  seo_title?: string;
  meta_description?: string;
  h1?: string;
  content: string;
  faq?: string;
  internal_links_used?: string;
  author?: string;
  authorName?: string;
  authorHandle?: string;
  authorRole?: string;
  date?: string;
  modifiedDate?: string;
  editorialRemark?: StaticBlogPost["editorialRemark"];
  relatedLinks?: StaticBlogPost["relatedLinks"];
}

type PostContentProps = {
  managerPost?: BlogPost | null;
  slug: string;
  storeCode?: string;
  storeName?: string;
  ctaLine?: string;
  isManagerPreview?: boolean;
};

function cleanInternalHref(value: string) {
  const href = value.trim();
  if (!href.startsWith("/") || href.startsWith("//") || href.includes("..") || href.includes("\\") || /[\s<>]/.test(href)) return "";
  return href;
}

function parseRelatedLinkLine(line: string) {
  const markdown = line.trim().match(/^\[([^\]]+)\]\((\/[^)]+)\)$/);
  if (!markdown) return null;
  const href = cleanInternalHref(markdown[2]);
  return href ? { title: markdown[1].trim(), url: href, description: "Store-scoped internal link." } : null;
}

function relatedLinksForPost(post: BlogPost) {
  if (post.relatedLinks?.length) return post.relatedLinks;
  return (post.internal_links_used || "")
    .split("\n")
    .map(parseRelatedLinkLine)
    .filter((link): link is NonNullable<ReturnType<typeof parseRelatedLinkLine>> => Boolean(link))
    .slice(0, 6);
}

function renderInline(text: string) {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*([^*]+)\*\*)|\[([^\]]+)\]\((\/[^)\s]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex, match.index)}</span>);
    if (match[2]) nodes.push(<strong key={`bold-${match.index}`}>{match[2]}</strong>);
    else if (match[3] && match[4]) nodes.push(<Link key={`link-${match.index}`} href={match[4]} className={styles.contentLink}>{match[3]}</Link>);
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex)}</span>);
  return nodes.length ? nodes : text;
}

function renderContent(raw: string) {
  return raw.split("\n\n").map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("## ")) return <h2 key={i} className={styles.contentH2}>{renderInline(trimmed.replace("## ", ""))}</h2>;
    if (trimmed.startsWith("### ")) return <h3 key={i} className={styles.contentH3}>{renderInline(trimmed.replace("### ", ""))}</h3>;
    if (trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").filter((line) => line.trim().startsWith("- "));
      return <ul key={i} className={styles.contentList}>{items.map((item, j) => <li key={j}>{renderInline(item.replace(/^-\s*/, ""))}</li>)}</ul>;
    }
    return <p key={i} className={styles.contentP}>{renderInline(trimmed)}</p>;
  });
}

function displayDate(value?: string) {
  return value ? new Date(value).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" }) : "Store post";
}

function blogJsonLd(post: BlogPost) {
  const canonical = `https://${STORE_BLOG_CONFIG.domain}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.h1 || post.title,
    description: post.meta_description,
    datePublished: post.date,
    dateModified: post.modifiedDate || post.date,
    mainEntityOfPage: canonical,
    url: canonical,
    author: { "@type": "Organization", name: `${STORE_BLOG_CONFIG.storeName} Editorial Team` },
    publisher: { "@type": "Organization", name: STORE_BLOG_CONFIG.storeName, url: `https://${STORE_BLOG_CONFIG.domain}` },
  };
}

export default function PostContent({ managerPost = null, slug, storeName = STORE_BLOG_CONFIG.storeName, ctaLine, isManagerPreview = false }: PostContentProps) {
  const post = getStaticPost(slug) || managerPost;
  if (!post) {
    notFound();
  }
  const relatedLinks = relatedLinksForPost(post);
  const authorName = post.authorName || post.author || `The ${storeName} Team`;
  const authorRole = post.authorRole || "House Writer";
  const authorHandle = post.authorHandle || "";
  return (
    <main className={styles.main}>
      <Navbar />
      <article className={styles.content}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd(post)) }} />
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link><span>/</span><Link href="/blog">Blog</Link><span>/</span><span className={styles.breadcrumbCurrent}>{post.title}</span>
        </nav>
        {isManagerPreview && <div className={styles.previewNotice}><strong>Manager preview</strong><span>This draft or scheduled post is visible only while signed in.</span></div>}
        <header className={styles.header}>
          <h1 className={styles.title}>{post.h1 || post.title}</h1>
          <div className={styles.meta}>
            <span>By {authorName}{authorHandle ? ` · ${authorHandle}` : ""}</span>
            <span>{authorRole}</span>
            <span>Published {displayDate(post.date)}</span>
            {post.modifiedDate && post.modifiedDate !== post.date && <span>Updated {displayDate(post.modifiedDate)}</span>}
          </div>
        </header>
        <div className={styles.body}>{renderContent(post.content)}</div>
        {post.faq && <div className={styles.body}>{renderContent(post.faq)}</div>}
        {post.editorialRemark?.body && (
          <section className={styles.relatedLinks}>
            <h2 className={styles.contentH2}>{post.editorialRemark.label || "Another House Writer Adds"}</h2>
            <p className={styles.contentP}><strong>{post.editorialRemark.authorName} · {post.editorialRemark.authorHandle}</strong><br />{post.editorialRemark.authorRole}</p>
            <p className={styles.contentP}>{post.editorialRemark.body}</p>
          </section>
        )}
        {relatedLinks.length > 0 && (
          <section className={styles.relatedLinks}>
            <h2 className={styles.contentH2}>Helpful next steps</h2>
            <ul className={styles.relatedList}>{relatedLinks.map((link) => <li key={link.url}><a href={link.url}>{link.title}</a><p>{link.description}</p></li>)}</ul>
          </section>
        )}
        <div className={styles.cta}>
          <p><strong>{storeName}</strong> - use the store page for current store details before visiting.</p>
          {ctaLine && <p>{ctaLine}</p>}
          <Link href={STORE_BLOG_CONFIG.storePath} className={styles.ctaBtn}>Store Page</Link>
        </div>
        <Link href="/blog" className={styles.backLink}>Back to Blog</Link>
      </article>
      <Footer />
    </main>
  );
}

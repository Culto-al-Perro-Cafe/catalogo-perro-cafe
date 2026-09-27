import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogSection, blogs, getBlog } from "@/config/blogs";
import { getBlogArticles } from "@/lib/blog";
import { routes } from "@/lib/routes";
import { blogJsonLd, pageMetadata } from "@/lib/seo";
import { BlogListing } from "@/components/blog/BlogListing";
import { JsonLd } from "@/components/site/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogs.map((b) => ({ blog: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blogs/[blog]">): Promise<Metadata> {
  const blog = getBlog((await params).blog);
  if (!blog) return {};
  return pageMetadata({
    title: `${blog.title} · ${blogSection.name}`,
    description: blog.description,
    path: routes.blog(blog.slug),
  });
}

/** A category: same page as /blogs with its tab active and its own title/description. */
export default async function BlogCategoryPage({ params }: PageProps<"/blogs/[blog]">) {
  const blog = getBlog((await params).blog);
  if (!blog) notFound();
  const articles = getBlogArticles(blog.slug);
  return (
    <>
      <JsonLd data={blogJsonLd(blog, articles)} />
      <BlogListing title={blog.title} description={blog.description} articles={articles} active={blog.slug} />
    </>
  );
}

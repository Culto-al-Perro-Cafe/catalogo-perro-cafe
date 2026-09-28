import { blogSection } from "@/config/blogs";
import { getAllArticles, getFeaturedArticle } from "@/lib/blog";
import { routes } from "@/lib/routes";
import { blogIndexJsonLd, pageMetadata } from "@/lib/seo";
import { BlogListing } from "@/components/blog/BlogListing";
import { JsonLd } from "@/components/site/JsonLd";

export const metadata = pageMetadata({
  title: blogSection.title,
  description: blogSection.description,
  path: routes.blogs,
});

export default function BlogsPage() {
  const articles = getAllArticles();
  const featured = getFeaturedArticle(blogSection.featured);
  // The featured article is shown once, above the grid — never listed twice.
  const rest = articles.filter((a) => !(a.blog === featured.blog && a.slug === featured.slug));
  return (
    <>
      <JsonLd data={blogIndexJsonLd(articles)} />
      <BlogListing
        title={blogSection.title}
        description={blogSection.description}
        featured={featured}
        articles={rest}
      />
    </>
  );
}

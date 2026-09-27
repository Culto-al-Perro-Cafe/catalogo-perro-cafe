import { blogSection } from "@/config/blogs";
import { getAllArticles } from "@/lib/blog";
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
  return (
    <>
      <JsonLd data={blogIndexJsonLd(articles)} />
      <BlogListing title={blogSection.title} description={blogSection.description} articles={articles} />
    </>
  );
}

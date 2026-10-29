import { getLegalPage } from "@/lib/legal";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";

const page = getLegalPage("terminos");

export const metadata = pageMetadata({ title: page.seoTitle, description: page.description, path: routes.terms });

/** Términos y condiciones. Copy: content/legal/terminos.md */
export default function TermsPage() {
  return <LegalPage page={page} />;
}

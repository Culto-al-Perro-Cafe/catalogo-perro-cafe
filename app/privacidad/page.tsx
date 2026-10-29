import { getLegalPage } from "@/lib/legal";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";

const page = getLegalPage("privacidad");

export const metadata = pageMetadata({ title: page.seoTitle, description: page.description, path: routes.privacy });

/** Aviso de privacidad. Copy: content/legal/privacidad.md */
export default function PrivacyPage() {
  return <LegalPage page={page} />;
}

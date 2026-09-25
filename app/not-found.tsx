import type { Metadata } from "next";
import { routes } from "@/lib/routes";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 24,
        padding: "64px var(--page-pad) 80px",
      }}
    >
      <h1 className="t-display-sm" style={{ color: "#fff", fontSize: "clamp(34px, 4vw, 56px)" }}>
        Esta página <span className="t-accent">no existe</span>
      </h1>
      <p className="t-body-lg">Revisa nuestras líneas de café para tu negocio.</p>
      <Button href={routes.home} variant="secondary" size="lg" icon="arrow_back">
        Ver las líneas
      </Button>
    </section>
  );
}

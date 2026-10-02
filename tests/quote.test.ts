import assert from "node:assert/strict";
import test from "node:test";
import { getQuoteSelection, quotePairNames, getBeanOption } from "../config/sales-form";
import { routes } from "../lib/routes";

test("a bean quote preserves the validated catalog line and bean", () => {
  const selection = getQuoteSelection("espresso", "natural-honey-veracruz");
  assert.equal(selection?.name, "Café para Espresso · Natural Honey Veracruz");
  assert.ok(selection?.extra);
  assert.ok(quotePairNames.includes(selection!.name));
  const url = new URL(routes.quote("espresso", "natural-honey-veracruz"), "https://www.perro.cafe");
  assert.equal(url.searchParams.get("linea"), "espresso");
  assert.equal(url.searchParams.get("grano"), "natural-honey-veracruz");
});

test("invalid beans and mismatched pairs cannot inject quote values", () => {
  for (const bean of ["not-a-bean", "<script>", "lavado-chiapas"]) {
    assert.deepEqual(getQuoteSelection("oficina", bean), { name: "Línea Oficina", extra: false });
  }
  assert.equal(getQuoteSelection("unknown", "natural-honey-veracruz"), undefined);
  assert.equal(getQuoteSelection(null, null), undefined);
});

test("legacy bean and ordinary line quote links still select the right value", () => {
  assert.equal(getQuoteSelection("natural-honey", null)?.name, getBeanOption("natural-honey")?.name);
  assert.deepEqual(getQuoteSelection("espresso", null), { name: "Café para Espresso", extra: false });
});

test("server delivery keeps catalogued pair labels and discards arbitrary labels", async (t) => {
  const { submitSalesLead } = await import("../app/ventas/actions");
  const originalWebhook = process.env.SALES_WEBHOOK_URL;
  process.env.SALES_WEBHOOK_URL = "https://local-fixture.invalid/quotes";
  t.after(() => {
    if (originalWebhook === undefined) delete process.env.SALES_WEBHOOK_URL;
    else process.env.SALES_WEBHOOK_URL = originalWebhook;
  });
  const delivered: { linea: string }[] = [];
  t.mock.method(globalThis, "fetch", async (_url: unknown, init: RequestInit) => {
    delivered.push(JSON.parse(String(init.body)));
    return new Response(null, { status: 200 });
  });
  const fixture = {
    nombre: "Local fixture", email: "fixture@example.invalid", whatsapp: "6620000000",
    cp: "83000", consumo: "5-10 kg", tipo: "Oficina o similar", tipoOtro: "",
    linea: getQuoteSelection("espresso", "lavado-veracruz")!.name,
  };
  assert.deepEqual(await submitSalesLead(fixture), { ok: true });
  assert.equal(delivered[0].linea, fixture.linea);
  assert.deepEqual(await submitSalesLead({ ...fixture, linea: "invented line and bean" }), { ok: true });
  assert.equal(delivered[1].linea, "Recomiéndenme algo");
});

# PR #1 — evidencia visual

Capturas auténticas de builds locales, sin ediciones de imagen:

- **Antes**: commit `7ecb3552c9b9559c073232f45d31a6cb2e7fbfbd` (base original), checkout separado, puerto 3101.
- **Después**: commit de implementación `a8124788815317df46dab7d2e0b4269f7c98396e`, puerto 3100.
- Chrome headless con Playwright; escritorio 1440×1000 y móvil 390×1280. Los paneles móviles y formularios se capturan con recorte de navegador para mostrar el control completo; la página conserva sus estilos reales.
- Movimiento reducido, fuentes cargadas, misma selección de consumo (`11-15 kg`), sin datos personales. Analítica externa y POSTs bloqueados. No se enviaron formularios.
- `line-*`: `/lineas/espresso`. Aparece el enlace directo al kit y texto oscuro sobre naranja; el CTA nuevo cabe en móvil.
- `quote-*`: navegación real desde `/fichas/lavado-veracruz` mediante «Cotizar al mayoreo». Antes seleccionaba sólo `Café para Espresso`; después selecciona `Café para Espresso · Lavado Veracruz`. El select nativo puede abreviar visualmente el texto en pantallas estrechas; se verificó el valor completo en el DOM.
- La navegación con flechas se verificó en QA funcional; una imagen estática sólo evidencia el estado seleccionado, no prueba por sí sola la interacción de teclado.

Los JPEG están incluidos para que la descripción del PR pueda mostrar imágenes accesibles a cualquier lector del repositorio, sin URLs locales ni adjuntos privados.

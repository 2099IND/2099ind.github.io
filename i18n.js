/* ==========================================================================
   2099 Industries — i18n.js
   English / Español switch. Progressive enhancement: the HTML is written in
   English, so without JavaScript the site is complete in English.
   Elements opt in with:
     data-i18n="key"                 → innerHTML is swapped
     data-i18n-attr="attr:key"       → that attribute is swapped
     data-lang-only="es"             → shown only in Spanish
   Headings, product names and section titles stay in English on purpose.
   ========================================================================== */

(() => {
  'use strict';

  /* Spanish strings. To add one: give the element a data-i18n key and add it here. */
  const ES = {
    "ui.language": "Idioma",
    "ui.skip": "Saltar al contenido",
    "ui.footer-nav": "Información",
    "foot.privacy": "Privacidad",
    "foot.terms": "Términos",
    "foot.access": "Accesibilidad",
    "foot.legal": "© 2026 2099 Industries. Todos los derechos reservados.",
    "home.title": "2099 Industries — Sentando las bases de lo que viene",
    "home.desc": "2099 Industries desarrolla y opera negocios, servicios y emprendimientos digitales para el mercado moderno. Nuestro sitio web está en desarrollo.",
    "ui.wordmark-top": "2099 Industries, volver arriba",
    "ui.primary": "Principal",
    "ui.in-dev": "En desarrollo",
    "home.lead": "Sentando las bases de lo que viene.",
    "home.status": "Sitio web actualmente en desarrollo.",
    "home.expl": "Visuales conceptuales de las áreas que 2099 Industries está explorando. Ilustran una dirección, no productos ni servicios actuales.",
    "alt.p3d": "Visual conceptual: una impresora 3D de escritorio cerrada fabricando una pieza geométrica.",
    "alt.lsr": "Visual conceptual: un láser de fibra marcando una placa de acero dentro de una máquina cerrada.",
    "alt.crd": "Visual conceptual: una tarjeta de metal negra con un patrón hexagonal grabado y una marca NFC.",
    "alt.dsp": "Visual conceptual: una tarjeta de metal con NFC junto a una pequeña pantalla con líneas geométricas.",
    "alt.fut": "Visual conceptual: un prototipo mecanizado junto a su carcasa de aluminio abierta, un calibrador y tornillos.",
    "alt.txt": "Visual conceptual: una camiseta negra con una pequeña marca hexagonal, extendida junto a una regla.",
    "home.dir": "Las áreas que marcan el rumbo de 2099 Industries. Describen nuestra dirección, no una lista de ofertas actuales, y cada una puede convertirse en una línea de negocio propia.",
    "area.cap": "Servicios y experiencia basados en estándares claros y relaciones a largo plazo.",
    "area.goods": "Bienes físicos y digitales, y los canales que los llevan al mercado.",
    "area.sys": "La infraestructura digital y los procesos que mantienen las operaciones precisas y listas para crecer.",
    "area.vent": "Alianzas comerciales, relaciones B2B y nuevas unidades de negocio.",
    "home.co1": "2099 Industries desarrolla y opera negocios, servicios y emprendimientos digitales creados para el mercado moderno.",
    "home.co2": "La empresa está organizada en distintas áreas de actividad, estructurada para crecer, adaptarse e incorporar nuevas líneas de negocio con el tiempo. Este sitio web es el inicio de nuestra presencia pública y crecerá junto con la empresa.",
    "home.contact": "Escríbenos directamente por correo electrónico.",
    "ct.sales": "Cotizaciones y pedidos para particulares",
    "ct.business": "Solo empresas y organizaciones",
    "ct.support": "Preguntas, reclamaciones y solicitudes especiales",
    "ui.copy": "Copiar",
    "ct.copy-sales": "Copiar el email de ventas",
    "ct.copy-business": "Copiar el email de empresas",
    "ct.copy-support": "Copiar el email de soporte",
    "ui.back-top": "Volver arriba",
    "ui.wordmark-home": "2099 Industries, inicio",
    "ui.home": "Inicio",
    "faq.title": "Preguntas frecuentes — 2099 Industries",
    "faq.desc": "Respuestas a preguntas comunes sobre 2099 Industries, su estado actual, los requisitos legales y la verificación de pedidos.",
    "faq.label": "Ayuda",
    "ui.updated": "Última actualización: 8 de octubre de 2026",
    "faq.h1": "Preguntas frecuentes",
    "faq.intro": "Preguntas comunes sobre 2099 Industries, el estado actual de este sitio web y cómo se revisarán los pedidos futuros.",
    "faq.q1": "¿Qué es 2099 Industries?",
    "faq.q2": "¿Puedo comprar productos en este sitio web?",
    "faq.q3": "¿Las imágenes de Explorations son productos reales?",
    "faq.q4": "¿Los requisitos legales son iguales en todas partes?",
    "faq.q5": "¿Siempre tengo que presentar una licencia o identificación?",
    "faq.q6": "¿Cuándo se puede solicitar una verificación adicional?",
    "faq.q7": "¿Qué ocurre con los pedidos mayoristas o de alto volumen?",
    "faq.q8": "¿El umbral de 8 unidades viene de la ley?",
    "faq.q9": "¿Por qué mi pedido podría requerir revisión manual?",
    "faq.q10": "¿Cómo puedo contactar a 2099 Industries?",
    "faq.a1": "2099 Industries desarrolla y opera negocios, servicios y emprendimientos digitales creados para el mercado moderno. La empresa está organizada en distintas áreas de actividad y estructurada para crecer con el tiempo.",
    "faq.a2": "Todavía no. El sitio web está en desarrollo y no procesa pedidos ni pagos. Store, Catalog y Offers estarán disponibles a medida que se lance cada área.",
    "faq.a3": "No. Son visuales conceptuales que ilustran las áreas que la empresa está explorando. No representan productos, servicios, precios ni disponibilidad actuales.",
    "faq.a4": "No. Las leyes pueden variar entre Puerto Rico, los estados y territorios de EE. UU. y las jurisdicciones locales. Un producto o servicio legal en Puerto Rico no es necesariamente legal en todas partes.",
    "faq.a5": "Cuando comiencen las ventas, algunos productos podrían no ofrecerse ni enviarse a ciertos destinos. Los clientes son responsables de asegurarse de que lo que piden sea legal donde viven y donde se entregará.",
    "faq.a6": "No. En general, los pedidos estándar solo requerirán la información necesaria para completar la compra, salvo que la ley aplicable o nuestros criterios internos de verificación requieran información adicional.",
    "faq.a7": "La documentación puede ser necesaria en dos situaciones distintas:",
    "faq.a8": "<strong>Cuando la ley aplicable lo exige</strong> para una transacción concreta. En ese caso es obligatoria.",
    "faq.a9": "<strong>Cuando un pedido cumple nuestros criterios internos de riesgo.</strong> En ese caso la solicitud es una política de la empresa para prevenir fraude y revisar pedidos. No significa que la ley lo exija.",
    "faq.a10": "Se puede solicitar una verificación adicional cuando la ley aplicable lo exige, o cuando un pedido cumple los criterios internos de riesgo de la empresa, por ejemplo:",
    "faq.a11": "Los pedidos de carácter comercial, o que alcanzan nuestro umbral interno de cantidad, son clasificados por la empresa como mayoristas o de alto volumen. Es una clasificación comercial, no legal.",
    "faq.a12": "Estos pedidos pasan a revisión manual antes de procesarse. Podemos pedir información de la empresa, verificación de identidad u otra documentación razonable. Al terminar la revisión, el pedido se procesa o se cancela, y se reembolsa cualquier pago.",
    "faq.a13": "No. El umbral de aproximadamente 8 o más unidades es un criterio interno de control de riesgo comercial establecido por 2099 Industries. No es una cantidad establecida por la ley de Puerto Rico ni por ninguna otra ley, y la empresa puede ajustarlo con el tiempo.",
    "faq.a14": "Un pedido puede marcarse como “Pending Verification” cuando cumple alguno de nuestros criterios internos de riesgo, cuando la ley aplicable exige verificación o cuando cierta información no puede confirmarse automáticamente. Te contactaremos por correo electrónico si hace falta algo más. La revisión manual protege a los clientes y a la empresa contra el fraude; no es una acusación.",
    "faq.a15": "Para cotizaciones y pedidos como particular, escribe a <a href=\"mailto:sales@2099ind.com\">sales@2099ind.com</a>. Las empresas y organizaciones pueden escribir a <a href=\"mailto:business@2099ind.com\">business@2099ind.com</a>. Para preguntas, reclamaciones, solicitudes especiales o cualquier asunto que requiera atención personalizada, escribe a <a href=\"mailto:support@2099ind.com\">support@2099ind.com</a>.",
    "faq.l1": "pedidos mayoristas o de alto volumen, como aproximadamente 8 o más unidades en una sola transacción;",
    "faq.l2": "pedidos de valor inusualmente alto;",
    "faq.l3": "servicios de personalización de alto valor;",
    "faq.l4": "patrones de pedido o de pago inusuales;",
    "faq.l5": "indicios de posible fraude o uso indebido de identidad;",
    "faq.l6": "información de facturación y envío que no coincide o no se puede confirmar;",
    "faq.l7": "otras circunstancias que razonablemente requieran una revisión manual.",
    "privacy.title": "Privacy policy — 2099 Industries",
    "privacy.desc": "Cómo 2099 Industries recopila, usa y protege la información personal.",
    "privacy.label": "Legal",
    "terms.title": "Terms of use — 2099 Industries",
    "terms.desc": "Términos que rigen el uso del sitio web de 2099 Industries y los pedidos futuros.",
    "terms.label": "Legal",
    "access.title": "Accessibility — 2099 Industries",
    "access.desc": "El compromiso de accesibilidad del sitio web de 2099 Industries.",
    "access.label": "Legal",
    "ui.copied": "Copiado",
    "ui.copy-status": "{value} copiado al portapapeles.",
    "ui.copy-failed": "No se pudo copiar. Selecciona la dirección para copiarla manualmente."
  };

  const STORAGE_KEY = '2099-lang';
  const store = {
    get() { try { return localStorage.getItem(STORAGE_KEY); } catch { return null; } },
    set(v) { try { localStorage.setItem(STORAGE_KEY, v); } catch { /* private mode: ignore */ } }
  };

  // Remember the English originals straight from the page.
  const textNodes = [...document.querySelectorAll('[data-i18n]')].map((el) => ({ el, key: el.dataset.i18n, en: el.innerHTML }));
  const attrNodes = [];
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attr, key] = pair.split(':');
      attrNodes.push({ el, attr, key, en: el.getAttribute(attr) });
    });
  });
  const spanishOnly = document.querySelectorAll('[data-lang-only="es"]');
  const switches = document.querySelectorAll('.lang-switch');
  const buttons = document.querySelectorAll('.lang-switch [data-lang]');

  let current = 'en';

  const apply = (lang) => {
    current = lang === 'es' ? 'es' : 'en';
    const es = current === 'es';
    document.documentElement.lang = current;
    textNodes.forEach(({ el, key, en }) => { el.innerHTML = es && ES[key] != null ? ES[key] : en; });
    attrNodes.forEach(({ el, attr, key, en }) => {
      const value = es && ES[key] != null ? ES[key] : en;
      if (value != null) el.setAttribute(attr, value);
    });
    spanishOnly.forEach((el) => { el.hidden = !es; });
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === current)));
  };

  // Used by script.js for the Copy button messages.
  window.i18n = {
    get lang() { return current; },
    t: (key) => (current === 'es' && ES[key] != null ? ES[key] : null)
  };

  buttons.forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.lang === current) return;
    apply(b.dataset.lang);
    store.set(current);
  }));

  switches.forEach((s) => { s.hidden = false; });
  if (store.get() === 'es') apply('es');
})();

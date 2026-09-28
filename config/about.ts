/**
 * "Sobre nosotros" page (/nosotros). Edit copy, photos and the order of blocks here —
 * the page reads everything from this file.
 */
import { routes } from "@/lib/routes";

type Photo = { src: string; alt: string };
type Action = { label: string; href: string };

/** A chapter: ivory text panel + photo. `flip` puts the photo on the left (desktop). */
type Chapter = { type: "chapter"; eyebrow: string; title: string; body: string[]; image: Photo; flip?: boolean };

const quote = { type: "quote" } as const;
const checklist = { type: "checklist" } as const;

export type AboutBlock = Chapter | typeof quote | typeof checklist;

const IMG = "/images/nosotros";

const quoteAction: Action = { label: "Cotizar mayoreo", href: routes.sales };
const buyAction: Action = { label: "Comprar café", href: routes.menudeo };

export const aboutConfig = {
  seoTitle: "Sobre nosotros · Café mexicano tostado sin pretensión",
  seoDescription:
    "Culto al Perro Café tuesta café mexicano consistente para personas, restaurantes, cafeterías y oficinas. Café bueno, sin pretensión y listo para tomarse todos los días.",

  hero: {
    eyebrow: "Sobre Culto al Perro Café",
    title: "El café bueno debería ser",
    titleAccent: "normal.",
    body: "Culto al Perro Café nació de una obsesión: hacer café mexicano consistente, accesible y sin pretensión.",
    actions: [quoteAction, buyAction],
    image: { src: `${IMG}/img-1725.jpg`, alt: "Culto al Perro Café" } as Photo,
  },

  /** Big band under the hero. */
  ticker: ["Menos mitos", "Más café", "Tostado para todos los días"],

  quote: {
    text: "No queremos que el café sea especial.",
    accent: "Queremos que el café bueno sea normal.",
  },

  checklist: {
    eyebrow: "Operación real",
    title: "Lo que aprendimos vendiéndole a negocios",
    body: "Restaurantes, oficinas, cafeterías y casinos no necesitan el café más raro del planeta. Necesitan café que trabaje todos los días y no falle cuando hay fila, turno pesado o junta larga.",
    items: [
      "Que sepa bien",
      "Que llegue a tiempo",
      "Que sepa igual cada vez",
      "Que el proveedor responda",
      "Que el cliente final quiera otra taza",
    ],
    action: quoteAction,
  },

  /** Page body, top to bottom. */
  blocks: [
    {
      type: "chapter",
      eyebrow: "Cómo empezó",
      title: "No empezamos queriendo vender café",
      image: { src: `${IMG}/dsc0015.jpg`, alt: "Bolsas de café Culto al Perro Café" },
      body: [
        "Empezamos regalándolo. Tostábamos más café del que podíamos tomar, así que lo compartíamos con amigos. Ahí entendimos algo simple: cuando el café sabe bien, la gente regresa.",
        "Después la pregunta cambió: ¿cómo hacemos que ese café no dependa de suerte, humor o magia negra de barra? Ahí empezó lo serio.",
      ],
    },
    {
      type: "chapter",
      flip: true,
      eyebrow: "Proceso antes que pose",
      title: "Ingeniería aplicada al café",
      image: { src: `${IMG}/dsc9166-2.jpg`, alt: "Proceso de café tostado" },
      body: [
        "Antes del café había ingeniería de software. Eso nos dejó una maña útil: si algo importa, se mide, se documenta y se repite.",
        "El tueste lo entendemos con procesos, automatización, consistencia y datos. Menos mitos. Más café. Menos «parece que quedó». Más repetibilidad.",
      ],
    },
    quote,
    {
      type: "chapter",
      eyebrow: "Sin teatro",
      title: "Café sin rodeos",
      image: { src: `${IMG}/dsc9172.jpg`, alt: "Café en grano tostado" },
      body: [
        "No somos fans del café quemado. Tampoco del café snob que te hace sentir que estás presentando examen para poder tomarte una taza.",
        "El café no debería ser una prueba de personalidad. Debe ser bueno, claro, disfrutable y listo para entrar a tu rutina sin explicarte el universo en cada sorbo.",
      ],
    },
    checklist,
    {
      type: "chapter",
      flip: true,
      eyebrow: "Tueste",
      title: "Tostar bien",
      image: { src: `${IMG}/dsc9688.jpg`, alt: "Café tostado listo para venta" },
      body: [
        "Para nosotros, tostar bien no significa perseguir modas. Significa usar matemáticas, procesos y experiencia para lograr algo simple: que el café esté bueno. Siempre.",
        "Eso aplica para quien compra una bolsa para su casa y para quien necesita kilos cada semana sin andar cruzando los dedos.",
      ],
    },
    {
      type: "chapter",
      eyebrow: "Sonora",
      title: "Somos del norte",
      image: { src: `${IMG}/letrero-perro.png`, alt: "Letrero de Culto al Perro Café" },
      body: [
        "Venimos de una forma de trabajar donde se habla directo, se resuelve rápido y se hacen las cosas sin tanto teatro.",
        "Eso también se nota en el café: menos pretensión, más oficio, atención clara y ganas de que el producto se mueva. Si algo falla, se arregla. Si algo se puede mejorar, se mejora.",
      ],
    },
    {
      type: "chapter",
      flip: true,
      eyebrow: "La visión",
      title: "Mejor café donde menos lo esperes",
      image: { src: `${IMG}/02.png`, alt: "Culto al Perro Café" },
      body: [
        "Queremos un México donde puedas encontrar mejor café en un restaurante, una oficina, una cafetería pequeña, un casino o una barra escondida.",
        "Porque el café es del mundo. Y porque el café bueno debería ser normal.",
      ],
    },
  ] satisfies AboutBlock[] as AboutBlock[],

  closing: {
    title: "¿Quieres café que sí se mueva?",
    body: "Vendemos café tostado para negocios y personas que quieren café consistente, bien tostado y sin vueltas. En grano, por kilo, para todos los días.",
    actions: [quoteAction, buyAction],
  },
} as const;

export const fmt = (n) => "S/ " + n.toLocaleString("en-US");

const P = {
  magicbook: { kind: "laptop", name: "MagicBook 14", normal: 3499, match: 1899 },
  pad: { kind: "tablet", name: "HONOR Pad 9", normal: 1299, match: 699 },
  phone: { kind: "phone", name: "Smartphone HONOR", normal: 1599, match: 849 },
};

const mk = (id, title, a, b, tag) => ({
  id, title, tag, a, b,
  normal: a.normal + b.normal,
  match: a.match + b.match,
  yourPart: Math.min(a.match, b.match),
});

export const combos = [
  mk("mb-pad", "MagicBook + HONOR Pad", P.magicbook, P.pad, "Más elegido"),
  mk("ph-ph", "Smartphone + Smartphone", P.phone, { ...P.phone }),
  mk("pad-ph", "HONOR Pad + Smartphone", P.pad, P.phone),
];

export const navLinks = [
  { label: "Combos", href: "#combos" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "MagicRing", href: "#magicring" },
  { label: "Preguntas", href: "#faq" },
];

export const steps = [
  { icon: "layout-grid", title: "Elige tu combo", text: "Escoge el equipo que quieres dentro de un combo." },
  { icon: "users", title: "Haz match", text: "Te juntamos con alguien que quiere el otro equipo." },
  { icon: "wallet", title: "Paga solo tu parte", text: "Tú pagas lo tuyo. Tu match, lo suyo. Hasta en cuotas." },
  { icon: "truck", title: "Recibe en tu casa", text: "Cada uno recibe su equipo en su propia dirección." },
];

export const perks = [
  { icon: "mouse-pointer-2", t: "Arrastra archivos de la Pad a la laptop" },
  { icon: "monitor-smartphone", t: "Usa tu Pad como segunda pantalla" },
  { icon: "clipboard-copy", t: "Copia en uno, pega en el otro" },
];

export const matchesCount = 12480;

export const testimonials = [
  { quote: "Me llevé la Pad a casi la mitad y la usé para mis apuntes desde el primer día.", name: "Diego", meta: "22 · San Miguel", combo: "Pad + Phone" },
  { quote: "Hice match en 10 minutos. Cada uno pagó lo suyo y nunca supe su apellido.", name: "Camila", meta: "24 · Miraflores", combo: "Laptop + Pad" },
  { quote: "Lo compartí con mi roomie por el enlace. Llegaron los dos el mismo día.", name: "Renzo", meta: "19 · Los Olivos", combo: "Phone + Phone" },
];

export const faq = [
  { q: "¿Y si no encuentro match?", a: "Tu precio Match se guarda 24 h. Si nadie aparece, te devolvemos el 100% de lo que pagaste." },
  { q: "¿Es seguro emparejarme con un desconocido?", a: "Solo ven tu nombre de pila y tu ciudad. Nunca compartimos tu teléfono, correo ni dirección." },
  { q: "¿Qué pasa si la otra persona no paga?", a: "Nada malo para ti. HONOR cubre la espera y tu pedido sale igual." },
  { q: "¿Mi pedido llega igual?", a: "Sí. Cada uno recibe su equipo en su propia dirección, como cualquier compra." },
  { q: "¿Tiene garantía?", a: "Sí, la misma garantía oficial que una compra normal en la tienda HONOR." },
  { q: "¿Puedo pagar en cuotas?", a: "Sí. Con tarjeta de crédito hasta en 12 cuotas. También débito y billetera digital." },
];

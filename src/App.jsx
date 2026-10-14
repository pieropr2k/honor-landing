import { useCallback, useEffect, useState } from "react";
import {
  Accordion, Badge, Button, ComboCard, Icon, Navbar, ProductPair, ProductShot, SectionHeading,
  StatCounter, StepItem, StickyCTA, Testimonial, Toast, Wordmark,
} from "./components/ui.jsx";
import { combos, faq, fmt, matchesCount, navLinks, perks, steps, testimonials } from "./data.js";

const HERO_COMBO = "mb-pad";
const gridAuto = (min, gap) => ({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}px), 1fr))`,
  gap,
});

function useWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return w;
}

const scrollToCombos = () => {
  const el = document.getElementById("combos");
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
};

export default function App() {
  const w = useWidth();
  const desktop = w >= 900;
  const [pickedId, setPickedId] = useState(null);
  const [toast, setToast] = useState(false);
  const closeToast = useCallback(() => setToast(false), []);

  const heroC = combos.find((c) => c.id === HERO_COMBO);
  const picked = combos.find((c) => c.id === pickedId);

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-page)" }}>
      <div className="hdm-topnav">
        <div>
          <Navbar mobile={w < 1100} links={navLinks} cta="Elegir mi combo" onCta={scrollToCombos} />
        </div>
      </div>

      {/* Hero */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(36px, 6vw, 72px) clamp(20px, 3vw, 32px) clamp(56px, 8vw, 96px)", ...gridAuto(460, "clamp(36px, 5vw, 56px)"), alignItems: "center" }}>
        <div style={{ maxWidth: 576, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <Badge tone="outline" icon="users">Nuevo · Compra en dúo</Badge>
          <h1 style={{ margin: "20px 0 0", fontSize: "clamp(46px, 6vw, 72px)", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.05, textWrap: "balance" }}>
            Tu combo <b style={{ fontWeight: 700 }}>HONOR</b> a mitad de precio. Haz match.
          </h1>
          <p style={{ margin: "clamp(18px, 2vw, 24px) 0 0", fontSize: "clamp(18px, 1.6vw, 20px)", lineHeight: 1.55, color: "var(--text-muted)", maxWidth: 520 }}>
            Te juntamos con alguien que quiere el otro equipo. Cada uno paga solo su parte.
          </p>
          <div style={{ marginTop: "clamp(28px, 3.5vw, 40px)", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
            <Button size="xl" iconRight="arrow-right" onClick={scrollToCombos}>Elegir mi combo</Button>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "var(--text-muted)" }}>
              <Icon name="shield-check" size={16} /> Sin match, te devolvemos todo
            </span>
          </div>
        </div>

        <div style={{ position: "relative", padding: "clamp(28px, 3.5vw, 40px) 0 clamp(24px, 3.5vw, 40px)" }}>
          <div style={{ padding: "clamp(12px, 1.6vw, 20px)", borderRadius: 28, background: "var(--surface-card)", boxShadow: "var(--shadow-lg)" }}>
            <ProductPair connected gap={14} a={{ kind: heroC.a.kind, name: heroC.a.name }} b={{ kind: heroC.b.kind, name: heroC.b.name }} />
          </div>
          <HeroChip style={{ top: 0, left: 4 }} initial="T" who="Tú" sub={`${heroC.a.name} · ${fmt(heroC.a.match)}`} />
          <HeroChip style={{ bottom: 0, right: 4 }} initial="V" who="Valeria" sub={`${heroC.b.name} · ${fmt(heroC.b.match)}`} />
        </div>
      </section>

      {/* Problema */}
      <section id="problema" className="section" style={{ ...gridAuto(420, "clamp(28px, 5vw, 64px)"), alignItems: "center" }}>
        <SectionHeading eyebrow="El problema" title="Un equipo es caro. Dos, imposible." lead="Armar tu setup completo cuesta lo que un ciclo de universidad." />
        <div style={{ padding: "clamp(20px, 2.4vw, 28px)", borderRadius: 16, background: "var(--surface-card)", boxShadow: "0 0 0 1px var(--border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span className="eyebrow">Comprando solo</span>
            <Badge tone="example" />
          </div>
          <PriceRow name="MagicBook 14" price="S/ 3,499" border />
          <PriceRow name="HONOR Pad 9" price="S/ 1,299" border />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: 16 }}>
            <span style={{ fontWeight: 600 }}>Total</span>
            <s style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.04em", textDecorationThickness: 2 }}>S/ 4,798</s>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="section">
        <SectionHeading eyebrow="Cómo funciona" title="Cuatro pasos. Cero complicaciones." />
        <div style={{ marginTop: "clamp(32px, 4.5vw, 56px)", ...gridAuto(240, "clamp(0px, 2.5vw, 32px)") }}>
          {steps.map((s, i) => (
            <StepItem key={s.title} n={i + 1} {...s} layout={desktop ? "column" : "row"} last={i === steps.length - 1} />
          ))}
        </div>
      </section>

      {/* Combos */}
      <section id="combos" className="section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
          <SectionHeading eyebrow="Combos disponibles" title="Elige tu dúo." lead="Precio Match = pagas solo tu equipo, con descuento." />
          <Badge tone="example">Precios de ejemplo</Badge>
        </div>
        <div style={{ marginTop: "clamp(28px, 4vw, 48px)", ...gridAuto(320, "clamp(16px, 2vw, 24px)") }}>
          {combos.map((c) => (
            <ComboCard key={c.id} {...c} selected={c.id === pickedId} onCta={() => { setPickedId(c.id); setToast(true); }} />
          ))}
        </div>
      </section>

      {/* MagicRing */}
      <section id="magicring" className="section" style={{ ...gridAuto(440, "clamp(28px, 5vw, 64px)"), alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <SectionHeading eyebrow="Qué ganas con MagicRing" title="Tus equipos, conectados de verdad." lead="Juntos funcionan como uno. Sin cables, sin apps raras." />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {perks.map((p) => (
              <div key={p.t} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 16, fontWeight: 500 }}>
                <span style={{ width: 40, height: 40, borderRadius: 10, background: "var(--surface-card)", boxShadow: "0 0 0 1px var(--border)", display: "grid", placeItems: "center", flex: "none" }}>
                  <Icon name={p.icon} size={20} />
                </span>
                <span>{p.t}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "relative", padding: "clamp(16px, 2.4vw, 28px)", borderRadius: 28, background: "var(--surface-card)", boxShadow: "var(--shadow-lg)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, .8fr) minmax(0, 1.2fr)", gap: "clamp(12px, 1.6vw, 20px)", alignItems: "center" }}>
            <Device label="HONOR Pad"><ProductShot kind="tablet" name="HONOR Pad" ratio="3 / 4" style={{ width: "100%" }} /></Device>
            <Device label="MagicBook"><ProductShot kind="laptop" name="MagicBook" ratio="16 / 11" style={{ width: "100%" }} /></Device>
          </div>
          <div className="hdm-drag" aria-hidden="true" style={{ position: "absolute", top: "42%", display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 10, background: "var(--surface-card)", boxShadow: "var(--shadow-lg)", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>
            <Icon name="file-text" size={18} /> apuntes.pdf
          </div>
        </div>
      </section>

      {/* Prueba social */}
      <section id="pruebas" className="section" style={{ display: "flex", flexWrap: "wrap", gap: "clamp(28px, 4vw, 48px)", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: 20 }}>
          <span className="eyebrow">Ya lo están haciendo</span>
          <StatCounter value={matchesCount} label="matches hechos" size={desktop ? 80 : 60} />
        </div>
        <div style={{ flex: "3 1 560px", minWidth: 0, ...gridAuto(240, 16) }}>
          {testimonials.map((t) => <Testimonial key={t.name} {...t} />)}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section" style={{ ...gridAuto(400, "clamp(20px, 5vw, 64px)"), alignItems: "start" }}>
        <SectionHeading eyebrow="Preguntas" title="Tus dudas, resueltas." lead="Lo que todos preguntan antes de su primer match." />
        <Accordion items={faq} defaultOpen={0} />
      </section>

      {/* Cierre */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(24px, 4vw, 48px) clamp(20px, 3vw, 32px) clamp(56px, 9vw, 112px)" }}>
        <div style={{ padding: "clamp(48px, 7vw, 80px) clamp(20px, 4vw, 48px)", borderRadius: 28, background: "var(--surface-card)", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 20 }}>
          <h2 style={{ fontSize: "clamp(38px, 5vw, 60px)", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.05, maxWidth: 720, textWrap: "balance" }}>Tu setup completo está a un match.</h2>
          <p style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.5, maxWidth: 420 }}>Elige tu combo hoy y asegura el precio por 24 horas.</p>
          {desktop && <div style={{ marginTop: 12 }}><Button size="xl" iconRight="arrow-right" onClick={scrollToCombos}>Elegir mi combo</Button></div>}
        </div>
      </section>

      <footer style={{ maxWidth: 1280, margin: "0 auto", padding: "32px clamp(20px, 3vw, 32px) 48px", borderTop: "1px solid var(--border)", display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
        <Wordmark size={18} />
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Prototipo. Precios, cifras y testimonios son de ejemplo.</span>
      </footer>

      {!desktop && (
        <StickyCTA
          label={picked ? "Buscar mi match" : "Elegir mi combo"}
          note={picked ? `${picked.title} · tu parte desde ${fmt(picked.yourPart)}` : undefined}
          onClick={scrollToCombos}
        />
      )}
      <Toast open={toast} message={picked ? `Elegiste ${picked.title}` : ""} onClose={closeToast} />
    </div>
  );
}

function HeroChip({ style, initial, who, sub }) {
  return (
    <div style={{ position: "absolute", display: "flex", alignItems: "center", gap: 8, padding: "8px 12px 8px 8px", borderRadius: 999, background: "var(--surface-card)", boxShadow: "var(--shadow-md)", fontSize: 13, ...style }}>
      <span style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--surface-inverse)", color: "#fff", display: "grid", placeItems: "center", fontWeight: 600, fontSize: 12 }}>{initial}</span>
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
        <b style={{ fontWeight: 600 }}>{who}</b>
        <span style={{ color: "var(--text-muted)", fontSize: 12 }}>{sub}</span>
      </span>
    </div>
  );
}

function PriceRow({ name, price, border }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 0", borderBottom: border ? "1px solid var(--border)" : undefined, fontSize: 17 }}>
      <span>{name}</span>
      <span style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{price}</span>
    </div>
  );
}

function Device({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
      {children}
      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{label}</span>
    </div>
  );
}

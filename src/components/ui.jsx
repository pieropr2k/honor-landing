import { useEffect, useState } from "react";

const LUCIDE = "https://unpkg.com/lucide-static@0.460.0/icons/";
export const formatPEN = (n) => "S/ " + Number(n).toLocaleString("en-US", { maximumFractionDigits: 0 });

export function Icon({ name, size = 20, color = "currentColor", style, label }) {
  const url = `url("${LUCIDE}${name}.svg")`;
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{
        display: "inline-block", flex: "none", width: size, height: size, background: color,
        WebkitMask: `${url} center / contain no-repeat`, mask: `${url} center / contain no-repeat`,
        ...style,
      }}
    />
  );
}

export function Button({ variant = "hero", size = "default", block, iconRight, children, className = "", ...rest }) {
  const isz = size === "xl" ? 20 : 18;
  return (
    <button type="button" className={`hdm-btn hdm-btn--${variant} hdm-btn--${size}${block ? " hdm-btn--block" : ""} ${className}`} {...rest}>
      {children}
      {iconRight && <Icon name={iconRight} size={isz} />}
    </button>
  );
}

export function IconButton({ icon, label, size = 40, ...rest }) {
  return (
    <button type="button" aria-label={label} title={label} className="hdm-iconbtn" style={{ width: size, height: size }} {...rest}>
      <Icon name={icon} size={Math.round(size * 0.45)} />
    </button>
  );
}

const TONES = {
  neutral: { background: "var(--surface-sunken)", color: "var(--text-strong)" },
  inverse: { background: "var(--surface-inverse)", color: "var(--text-inverse)" },
  outline: { background: "var(--surface-card)", color: "var(--text-strong)", boxShadow: "inset 0 0 0 1px var(--border)" },
  example: { background: "transparent", color: "var(--text-muted)", border: "1px dashed var(--n-300)", textTransform: "uppercase", letterSpacing: "var(--tracking-wide)", fontSize: 10 },
};

export function Badge({ tone = "neutral", icon, children }) {
  const isExample = tone === "example";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6, height: isExample ? 20 : 26,
      padding: isExample ? "0 7px" : "0 10px", borderRadius: "var(--radius-full)",
      fontSize: "var(--text-xs)", fontWeight: 600, lineHeight: 1, whiteSpace: "nowrap", ...TONES[tone],
    }}>
      {icon && <Icon name={icon} size={14} />}
      {children ?? (isExample ? "Ejemplo" : null)}
    </span>
  );
}

export function Card({ padding = 20, selected, interactive, children, style, ...rest }) {
  return (
    <div
      className={interactive ? "hdm-card--interactive" : undefined}
      style={{
        background: "var(--surface-card)", color: "var(--text-strong)", borderRadius: "var(--radius-xl)", padding,
        boxShadow: selected ? "0 0 0 2px var(--foreground), var(--shadow-md)" : "0 0 0 1px var(--border), var(--shadow-sm)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function Wordmark({ size = 22 }) {
  return (
    <a href="#" aria-label="HONOR Duo Match" style={{ textDecoration: "none" }}>
      <span style={{ display: "inline-flex", alignItems: "baseline", gap: size * 0.35, lineHeight: 1 }}>
        <span style={{ fontSize: size, fontWeight: 700, letterSpacing: "0.12em" }}>HONOR</span>
        <span style={{ fontSize: size * 0.68, fontWeight: 500, letterSpacing: "var(--tracking-tight)", opacity: 0.7 }}>Duo Match</span>
      </span>
    </a>
  );
}

export function SectionHeading({ eyebrow, title, lead }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 style={{ fontSize: "clamp(32px, 4.4vw, 48px)", fontWeight: 500, letterSpacing: "var(--tracking-tight)", lineHeight: "var(--leading-display)", maxWidth: 720 }}>{title}</h2>
      {lead && <p style={{ fontSize: "var(--text-lg)", lineHeight: 1.5, color: "var(--text-muted)", maxWidth: 520 }}>{lead}</p>}
    </div>
  );
}

const KIND_ICON = { laptop: "laptop", tablet: "tablet", phone: "smartphone", watch: "watch" };

export function ProductShot({ kind = "laptop", name, ratio = "4 / 3", style }) {
  return (
    <div style={{ position: "relative", aspectRatio: ratio, borderRadius: 16, background: "var(--surface-device)", overflow: "hidden", display: "grid", placeItems: "center", ...style }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <Icon name={KIND_ICON[kind]} size={40} color="hsl(249 14% 62%)" />
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "hsl(249 10% 50%)" }}>Foto · {name || kind}</span>
      </div>
    </div>
  );
}

export function ProductPair({ a, b, connected, gap = 10 }) {
  return (
    <div style={{ position: "relative", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap }}>
      <ProductShot {...a} />
      <ProductShot {...b} />
      {connected && <span className="hdm-link-line" aria-hidden style={{ position: "absolute", top: "50%", left: "30%", right: "30%", height: 2, marginTop: -1 }} />}
      <span aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 36, height: 36, borderRadius: "50%", background: "var(--surface-inverse)", color: "var(--text-inverse)", display: "grid", placeItems: "center", boxShadow: "0 0 0 4px var(--surface-card)" }}>
        <Icon name={connected ? "link-2" : "plus"} size={18} />
      </span>
    </div>
  );
}

export function PriceTag({ normal, match, label = "Precio Match" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="eyebrow">{label}</span>
        <Badge tone="example" />
      </span>
      <span style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
        <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: "var(--tracking-tighter)", lineHeight: 1 }}>{formatPEN(match)}</span>
        {normal != null && <s style={{ fontSize: 15, color: "var(--text-muted)", textDecorationThickness: 1.5 }}>{formatPEN(normal)}</s>}
      </span>
    </div>
  );
}

export function ComboCard({ title, a, b, normal, match, yourPart, tag, selected, onCta }) {
  return (
    <Card padding={16} selected={selected} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <ProductPair a={a} b={b} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "0 4px" }}>
        <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: "var(--tracking-tight)", lineHeight: 1.2 }}>{title}</h3>
        {tag && <Badge tone="inverse">{tag}</Badge>}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, padding: "0 4px" }}>
        <PriceTag normal={normal} match={match} label="Combo Match" />
        {yourPart != null && (
          <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>Tu parte desde</span>
            <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "var(--tracking-tight)" }}>{formatPEN(yourPart)}</span>
          </div>
        )}
      </div>
      <Button size="lg" block onClick={onCta}>Elegir mi combo</Button>
    </Card>
  );
}

export function StepItem({ n, icon, title, text, layout = "row", last }) {
  const col = layout === "column";
  return (
    <div style={{ display: "flex", flexDirection: col ? "column" : "row", gap: 16, alignItems: "flex-start" }}>
      <div style={{ flex: "none", display: "flex", flexDirection: "column", alignItems: "center", alignSelf: col ? "flex-start" : "stretch" }}>
        <span style={{ width: 52, height: 52, borderRadius: "var(--radius-lg)", background: "var(--surface-card)", boxShadow: "0 0 0 1px var(--border), var(--shadow-sm)", display: "grid", placeItems: "center" }}>
          <Icon name={icon} size={24} />
        </span>
        {!col && !last && <span aria-hidden style={{ flex: 1, width: 1.5, marginTop: 8, minHeight: 20, background: "var(--n-200)" }} />}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingBottom: col || last ? 0 : 24, paddingTop: col ? 0 : 4 }}>
        <span className="eyebrow">Paso {n}</span>
        <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: "var(--tracking-tight)", lineHeight: 1.2 }}>{title}</h3>
        {text && <p style={{ color: "var(--text-muted)", lineHeight: 1.5, maxWidth: 320 }}>{text}</p>}
      </div>
    </div>
  );
}

export function Accordion({ items, defaultOpen = -1 }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={it.q} style={{ borderBottom: "1px solid var(--border)" }}>
            <button type="button" className="hdm-acc-q" aria-expanded={on} onClick={() => setOpen(on ? -1 : i)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, minHeight: 64, padding: "16px 0" }}>
              <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.35 }}>{it.q}</span>
              <span className="hdm-acc-chev" style={{ flex: "none", width: 32, height: 32, borderRadius: "50%", background: "var(--surface-card)", boxShadow: "inset 0 0 0 1px var(--border)", display: "grid", placeItems: "center" }}>
                <Icon name="chevron-down" size={16} />
              </span>
            </button>
            <div style={{ display: "grid", gridTemplateRows: on ? "1fr" : "0fr", transition: "grid-template-rows var(--dur-slow) var(--ease-out)" }}>
              <div style={{ overflow: "hidden" }}>
                <p style={{ padding: "0 48px 20px 0", lineHeight: 1.55, color: "var(--text-muted)" }}>{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function StatCounter({ value, label, size = 64 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf, t0;
    const step = (t) => {
      t0 = t0 || t;
      const p = Math.min(1, (t - t0) / 1400);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: size, fontWeight: 600, letterSpacing: "var(--tracking-tighter)", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{n.toLocaleString("en-US")}</span>
      <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "var(--text-lg)", color: "var(--text-muted)" }}>{label}<Badge tone="example" /></span>
    </div>
  );
}

export function Testimonial({ quote, name, meta, combo, rating = 5 }) {
  return (
    <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 16, padding: 20, borderRadius: "var(--radius-xl)", background: "var(--surface-card)", boxShadow: "0 0 0 1px var(--border)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ display: "flex", gap: 2 }} aria-label={`${rating} de 5`}>
          {Array.from({ length: 5 }, (_, i) => <Icon key={i} name="star" size={16} color={i < rating ? "var(--n-900)" : "var(--n-300)"} />)}
        </span>
        <Badge tone="example" />
      </div>
      <blockquote style={{ margin: 0, fontSize: 17, lineHeight: 1.45, fontWeight: 500, letterSpacing: "-0.01em" }}>“{quote}”</blockquote>
      <figcaption style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span aria-hidden style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--surface-sunken)", display: "grid", placeItems: "center", fontWeight: 600, fontSize: 14 }}>{name.charAt(0)}</span>
        <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <span style={{ fontSize: "var(--text-sm)", fontWeight: 600 }}>{name}</span>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{meta} · {combo}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Navbar({ links, cta, onCta, mobile }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const open = mobile && menuOpen;
  const close = () => setMenuOpen(false);
  return (
    <div style={{ padding: mobile ? "12px 12px 0" : "16px 32px 0", position: "relative", zIndex: 20 }}>
      <nav style={{ position: "relative", maxWidth: "var(--container-max)", margin: "0 auto", background: "var(--nav)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", padding: mobile ? "14px 14px 14px 18px" : "20px 32px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <Wordmark size={mobile ? 18 : 22} />
        {!mobile && (
          <div style={{ display: "flex", gap: 24 }}>
            {links.map((l) => <a key={l.label} href={l.href} className="hdm-navlink">{l.label}</a>)}
          </div>
        )}
        {mobile ? (
          <IconButton icon={open ? "x" : "menu"} label={open ? "Cerrar menú" : "Menú"} aria-expanded={open} onClick={() => setMenuOpen((v) => !v)} />
        ) : (
          <Button onClick={onCta}>{cta}</Button>
        )}
        {open && (
          <div className="hdm-fadeup" style={{ position: "absolute", top: "100%", left: 0, right: 0, display: "flex", flexDirection: "column", background: "var(--nav)", boxShadow: "var(--shadow-lg)", borderTop: "1px solid var(--border)", padding: "8px 18px 18px", borderRadius: "0 0 var(--radius-lg) var(--radius-lg)" }}>
            {links.map((l) => (
              <a key={l.label} href={l.href} className="hdm-navlink" onClick={close} style={{ display: "block", padding: "14px 4px", fontSize: 17, borderBottom: "1px solid var(--border)" }}>{l.label}</a>
            ))}
            <Button block size="lg" style={{ marginTop: 16 }} onClick={() => { close(); onCta(); }}>{cta}</Button>
          </div>
        )}
      </nav>
    </div>
  );
}

export function StickyCTA({ label, note, onClick }) {
  return (
    <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 30, padding: "12px 16px calc(16px + env(safe-area-inset-bottom))", background: "hsl(0 0% 100% / .88)", backdropFilter: "blur(var(--blur-nav))", WebkitBackdropFilter: "blur(var(--blur-nav))", boxShadow: "var(--shadow-sticky)", display: "flex", flexDirection: "column", gap: 8 }}>
      <Button size="xl" block iconRight="arrow-right" onClick={onClick}>{label}</Button>
      {note && <span style={{ textAlign: "center", fontSize: 12, color: "var(--text-muted)" }}>{note}</span>}
    </div>
  );
}

export function Toast({ open, message, onClose, duration = 2600 }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [open, message, onClose, duration]);
  if (!open) return null;
  return (
    <div role="status" className="hdm-fadeup" style={{ position: "fixed", left: 16, right: 16, bottom: 120, margin: "0 auto", zIndex: 60, display: "flex", alignItems: "center", gap: 10, maxWidth: 358, padding: "14px 16px", borderRadius: "var(--radius-lg)", background: "var(--surface-inverse)", color: "var(--text-inverse)", boxShadow: "var(--shadow-lg)", fontSize: "var(--text-sm)", fontWeight: 500 }}>
      <Icon name="check" size={18} color="hsl(152 55% 62%)" />
      <span style={{ flex: 1 }}>{message}</span>
    </div>
  );
}

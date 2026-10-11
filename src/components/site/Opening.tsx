import { useEffect, useState, type CSSProperties } from "react";
import { Flame, MessageSquare, QrCode, Server, Terminal, Ticket, type LucideIcon } from "lucide-react";
import { products, type ProductId } from "@/data/products";
import GlyphPortal from "@/components/ui/glyph-portal";

const COPY =
  "Fasthost Technology Enterprise is a technology company in Accra. Hosting and bulk SMS were the start. The work now includes products people open every day.";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

type StarStyle = CSSProperties & {
  "--star-angle": string;
  "--star-x": string;
  "--star-y": string;
};

function ShootingStar() {
  const [shot, setShot] = useState<{ id: number; style: StarStyle } | null>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    let timer = 0;
    let id = 0;
    const launch = () => {
      id += 1;
      const fromLeft = Math.random() > 0.5;
      setShot({
        id,
        style: {
          top: `${6 + Math.random() * 32}%`,
          left: fromLeft ? `${4 + Math.random() * 18}%` : `${58 + Math.random() * 24}%`,
          "--star-angle": `${fromLeft ? 16 + Math.random() * 18 : -(16 + Math.random() * 18)}deg`,
          "--star-x": fromLeft ? "42vw" : "-42vw",
          "--star-y": `${16 + Math.random() * 18}vh`,
        },
      });
    };
    const schedule = (delay: number) => {
      timer = window.setTimeout(() => {
        launch();
        schedule(3500 + Math.random() * 3500);
      }, delay);
    };
    schedule(1200);
    return () => window.clearTimeout(timer);
  }, []);

  if (!shot) return null;
  return <span key={shot.id} className="shooting-star" style={shot.style} aria-hidden="true" />;
}

function iconFor(id: ProductId): LucideIcon {
  switch (id) {
    case "hotspark":
      return Flame;
    case "sms":
      return MessageSquare;
    case "hosting":
      return Server;
    case "console":
      return Terminal;
    case "brocchure":
      return QrCode;
    case "slip":
      return Ticket;
    default: {
      const exhaustive: never = id;
      return exhaustive;
    }
  }
}

function lineFor(id: ProductId): string {
  switch (id) {
    case "hotspark":
      return "The dating app is already built in the building. The public site is the last door left to open.";
    case "sms":
      return "Schools, hospitals, churches, and banks already send through it. Keep the groups and templates. The bundle never expires.";
    case "hosting":
      return "Put a site on the internet properly. cPanel, a free SSL certificate, WordPress in one click, from GHs 300 a year.";
    case "console":
      return "Send the message, watch the credits, and trust the tab with the API key. Close it, and the key leaves with you.";
    case "brocchure":
      return "A menu, a pitch deck, a wedding, or a memorial becomes a QR code people scan on the spot. Fasthost takes the mobile money.";
    case "slip":
      return "Describe the bet in ordinary language. Slip Builder writes the SportyBet GH slip.";
    default: {
      const exhaustive: never = id;
      return exhaustive;
    }
  }
}

const heroFilm = (
  <div className="absolute inset-0" style={{ transform: "scale(var(--gp-field-scale, 1))" }}>
    <video autoPlay loop muted playsInline className="h-full w-full object-cover" src={HERO_VIDEO} />
  </div>
);

export function Opening() {
  return (
    <GlyphPortal
      word="FASTHOST"
      fontFamily='"Arial Black", Arial, sans-serif'
      fontWeight={900}
      scrollLength={2.4}
      interactive
      annotations={false}
      enterLabel=""
      className="opening-portal"
      background={heroFilm}
      style={{
        "--gp-paper": "#05051f",
        "--gp-ink": "#f4f1ea",
        "--gp-field": "#121417",
        "--gp-foreground": "#121417",
      }}
      front={
        <>
          <ShootingStar />
          <p className="opening-kicker">A technology company, wider than the work it started with</p>
          <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-end h-full py-10 px-6 gap-4">
            <p className="w-full text-right text-sm text-ink md:text-left md:text-base">Weija Road, Ghana-Accra</p>
            <div className="w-full md:w-150 flex flex-col gap-4">
              <p className="text-sm leading-relaxed text-ink/85 sm:text-base">{COPY}</p>
              <div>
              <a
                href="#products"
                className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-paper"
              >
                See products
              </a>
              </div>
            </div>
          </div>
        </>
      }
    >
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-sm tracking-[0.16em] text-ink/50 uppercase">The company</p>
        <h2 className="mt-4 max-w-xl text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          A technology company with a hosting habit.
        </h2>
        <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-ink/75 sm:text-lg">
          <p>
            Fasthost Technology Enterprise works from Weija Road in Accra. Hosting and bulk SMS are
            still the floor: sites on cPanel, with a free SSL certificate and one-click WordPress,
            and text that goes out for schools, hospitals, churches, banks, and anyone else with a
            phone list. The office keeps Monday to Friday, 9am to 6pm. Support for those two stays
            on through the weekend.
          </p>
          <p>
            Beside that floor, the company ships products with one job each. A dating app. An SMS
            desk that forgets the API key when the tab closes. A QR code that stands in for a
            brochure, a menu, or a pitch deck. A sentence that becomes a SportyBet GH slip.
          </p>
        </div>
        <ul className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {products.map((product) => {
            const Icon = iconFor(product.id);
            return (
              <li key={product.id} className="flex items-start gap-3.5">
                <span
                  className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-ink text-accent"
                  aria-hidden="true"
                >
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-xs tracking-[0.14em] text-ink/45 uppercase">{product.eyebrow}</p>
                  <p className="mt-1 text-lg font-medium tracking-tight">{product.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">{lineFor(product.id)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </GlyphPortal>
  );
}

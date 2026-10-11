import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, type CSSProperties } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={word}
            initial={reduce ? false : { y: 20, opacity: 0 }}
            animate={reduce || isInView ? { y: 0, opacity: 1 } : {}}
            transition={reduce ? { duration: 0 } : { duration: 0.6, delay: i * 0.08, ease: EASE }}
            className="relative inline-block"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: CSSProperties;
}

export const WordsPullUpMultiStyle = ({ segments, className = "", style }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={`${w.word}-${i}`}
          initial={reduce ? false : { y: 20, opacity: 0 }}
          animate={reduce || isInView ? { y: 0, opacity: 1 } : {}}
          transition={reduce ? { duration: 0 } : { duration: 0.6, delay: i * 0.08, ease: EASE }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

const COPY =
  "Fasthost Technology Enterprise is a technology company in Accra. Hosting and bulk SMS were the start. The work now includes products people open every day.";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

const CREAM = "#E1E0CC";

export function PrismaHero() {
  const reduce = useReducedMotion();

  return (
    <section className="h-svh w-full bg-black">
      <div className="relative h-full w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO}
        />

        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-70 mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1
            className="w-full text-center text-[min(18vw,30svh)] leading-[0.85] font-medium tracking-[-0.07em]"
            style={{ color: CREAM }}
          >
            <WordsPullUp text="FASTHOST" className="w-full justify-center" />
          </h1>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-5 px-4 pb-6 text-center sm:px-6 sm:pb-8">
          <motion.p
            initial={reduce ? false : { y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={reduce ? { duration: 0 } : { duration: 0.8, delay: 0.5, ease: EASE }}
            className="max-w-md text-xs leading-snug sm:text-sm md:text-base"
            style={{ color: "rgba(225, 224, 204, 0.8)" }}
          >
            {COPY}
          </motion.p>

          <motion.a
            href="#products"
            initial={reduce ? false : { y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={reduce ? { duration: 0 } : { duration: 0.8, delay: 0.7, ease: EASE }}
            className="group inline-flex min-h-11 items-center gap-2 rounded-full py-1 pr-1 pl-5 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
            style={{ backgroundColor: CREAM }}
          >
            See products
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
              <ArrowRight className="h-4 w-4" style={{ color: CREAM }} />
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

export default PrismaHero;

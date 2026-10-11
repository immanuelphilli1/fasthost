import brocchure from "@/assets/brocchure-landing.png";
import hosting from "@/assets/hosting-landing.png";
import hotspark from "@/assets/hotspark.png";
import slipBuilder from "@/assets/slip-builder-landing.png";
import smsDesk from "@/assets/sms-desk-landing.png";
import sms from "@/assets/sms-landing.png";

export type ProductId =
  | "hotspark"
  | "sms"
  | "hosting"
  | "console"
  | "brocchure"
  | "slip";

export type Product = {
  id: ProductId;
  name: string;
  eyebrow: string;
  summary: string;
  href?: string;
  poster: string;
  background: string;
};

export const products: Product[] = [
  {
    id: "hotspark",
    name: "HotSpark",
    eyebrow: "Dating",
    summary: "A dating app from Fasthost.",
    poster: hotspark,
    background: "linear-gradient(160deg, #3a1020 0%, #c23b4a 70%, #e7a23a 100%)",
  },
  {
    id: "sms",
    name: "Fasthost SMS",
    eyebrow: "Bulk SMS",
    summary:
      "Bulk SMS for schools, hospitals, churches, businesses, and individuals.",
    href: "https://sms.fasthosttech.com",
    poster: sms,
    background: "linear-gradient(160deg, #0d2b22 0%, #1f6b4a 100%)",
  },
  {
    id: "hosting",
    name: "Hosting",
    eyebrow: "Web hosting",
    summary: "Web hosting for a site that needs a place to live.",
    href: "https://hosting.fasthosttech.com/",
    poster: hosting,
    background: "linear-gradient(160deg, #10243f 0%, #1d4e89 100%)",
  },
  {
    id: "console",
    name: "FastHost Console",
    eyebrow: "Console",
    summary: "The FastHost console.",
    href: "https://desk.fasthosttech.com",
    poster: smsDesk,
    background: "linear-gradient(160deg, #1a1d22 0%, #3a404a 100%)",
  },
  {
    id: "brocchure",
    name: "Brocchure",
    eyebrow: "Product",
    summary: "Brocchure, built at Fasthost.",
    href: "https://www.brocchure.com/",
    poster: brocchure,
    background: "linear-gradient(160deg, #2c2116 0%, #8a6232 100%)",
  },
  {
    id: "slip",
    name: "Slip Builder",
    eyebrow: "SportyBet GH",
    summary: "SportyBet GH slips from natural language.",
    href: "https://slip-builder.com/home",
    poster: slipBuilder,
    background: "linear-gradient(160deg, #1c1633 0%, #4a3480 100%)",
  },
];

import logo from "@/assets/favicon.png";

const links = [
  { href: "#products", label: "Products" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "Company" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteNav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      <div className="pointer-events-auto flex max-w-full items-center gap-3 rounded-b-2xl bg-black px-4 py-2 sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14">
        <a href="#top" aria-label="Fasthost" className="brand-mark">
          <img src={logo} alt="" />
        </a>
        <nav aria-label="Page" className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center text-[10px] whitespace-nowrap text-[rgba(225,224,204,0.8)] transition-colors duration-300 hover:text-[#E1E0CC] sm:text-xs md:text-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

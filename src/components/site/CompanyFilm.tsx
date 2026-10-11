import MetroHero from "@/components/ui/scroll-locked-video-hero";

export function CompanyFilm() {
  return (
    <section id="company" aria-label="Company">
      <MetroHero
        title="FASTHOST"
        tagline="Welcome to the world of Fasthost. The home of possibilities."
        signature={false}
        skipHref="#about"
      />
    </section>
  );
}

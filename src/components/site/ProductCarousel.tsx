import { SqueezeCarousel, type SqueezeSlide } from "@/components/ui/carousel-squeeze";
import { products, type Product } from "@/data/products";

function mark(name: string) {
  return <span className="text-sm font-medium tracking-tight text-white">{name}</span>;
}

function toSlide(product: Product): SqueezeSlide {
  return {
    id: product.id,
    title: product.name,
    description: product.summary,
    image: product.poster,
    imageAlt: product.name,
    background: product.background,
    overlay: mark(product.name),
    action: product.href ? "Open" : undefined,
    href: product.href,
    target: product.href ? "_blank" : undefined,
  };
}

export function ProductCarousel() {
  return (
    <section id="work" className="theatre overflow-x-clip px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-8 text-sm tracking-[0.16em] text-accent uppercase">Work</p>
        <SqueezeCarousel slides={products.map(toSlide)} label="Products" autoplay={false} />
      </div>
    </section>
  );
}

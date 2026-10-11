import ImageStreamHero from "@/components/ui/image-stream-hero";
import { products } from "@/data/products";

const images = products.map((product) => ({
  src: product.poster,
  alt: product.name,
}));

export function ProductCorridor() {
  return (
    <ImageStreamHero images={images} className="theatre h-svh min-h-[32rem]">
      <div className="relative z-10 flex h-full flex-col items-center justify-between px-4 py-20 text-center sm:px-6 sm:py-16">
        <p className="text-sm tracking-[0.16em] text-accent uppercase">In motion</p>
        <h2 className="text-3xl font-medium tracking-tight text-balance sm:text-5xl">
          Six products.
          <br />
          One company.
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-paper/70">
          Hosting and SMS still run. The newer products sit beside them.
        </p>
      </div>
    </ImageStreamHero>
  );
}

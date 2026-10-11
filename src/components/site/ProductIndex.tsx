import { products } from "@/data/products";

export function ProductIndex() {
  return (
    <section id="products" className="theatre px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm tracking-[0.16em] text-accent uppercase">Products</p>
        <h2 className="mt-4 max-w-xl text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          What Fasthost ships.
        </h2>
        <ul className="mt-10 grid gap-px bg-white/10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => {
            const body = (
              <>
                <span className="font-mono text-xs tracking-[0.14em] text-paper/50">
                  {String(index + 1).padStart(2, "0")} / {product.eyebrow}
                </span>
                <span className="mt-6 block text-2xl font-medium tracking-tight sm:mt-8">{product.name}</span>
                <span className="mt-3 block text-sm leading-relaxed text-paper/75">{product.summary}</span>
                {product.href ? (
                  <span className="mt-8 block text-sm text-accent">Open</span>
                ) : (
                  <span className="mt-8 block text-sm text-paper/50">No public link yet</span>
                )}
              </>
            );

            return (
              <li key={product.id} className="bg-ink">
                {product.href ? (
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-full flex-col p-6 transition-colors hover:bg-white/5"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="flex h-full flex-col p-6">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

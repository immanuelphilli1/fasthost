import { AboutContact } from "@/components/site/AboutContact";
import { CompanyFilm } from "@/components/site/CompanyFilm";
import { Opening } from "@/components/site/Opening";
import { ProductCarousel } from "@/components/site/ProductCarousel";
import { ProductCorridor } from "@/components/site/ProductCorridor";
import { ProductIndex } from "@/components/site/ProductIndex";
import { SiteNav } from "@/components/site/SiteNav";

function App() {
  return (
    <>
      <SiteNav />
      <main id="top">
        <Opening />
        <ProductIndex />
        <ProductCorridor />
        <ProductCarousel />
        <CompanyFilm />
        <AboutContact />
      </main>
    </>
  );
}

export default App;

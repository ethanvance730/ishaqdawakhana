import { useCallback, useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { AdminPage } from './components/AdminPage';
import { ContactSection } from './components/ContactSection';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FeaturedProductsSection } from './components/FeaturedProductsSection';
import { Footer } from './components/Footer';
import { Header, type ActivePage } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductsPage } from './components/ProductsPage';
import type { HerbalProduct } from './data/catalogSeed';
import { ensureCatalogSeeded, subscribeToProducts } from './services/productService';

function getInitialPageFromHash(): ActivePage {
  if (typeof window === 'undefined') return 'home';
  if (window.location.hash === '#admin') return 'admin';
  if (window.location.hash === '#products') return 'products';
  return 'home';
}

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>(getInitialPageFromHash);
  const [products, setProducts] = useState<HerbalProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const loadCatalog = useCallback(() => {
    setLoading(true);
    setError(null);
    setReloadToken((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === '#admin') {
        setActivePage('admin');
      } else if (window.location.hash === '#products') {
        setActivePage('products');
      } else if (window.location.hash === '' || window.location.hash === '#home') {
        setActivePage('home');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe: (() => void) | null = null;

    async function initFirestoreCatalog() {
      try {
        await ensureCatalogSeeded();
        if (!isMounted) return;

        unsubscribe = subscribeToProducts(
          (items) => {
            if (!isMounted) return;
            setProducts(items);
            setLoading(false);
            setError(null);
          },
          () => {
            if (!isMounted) return;
            setLoading(false);
            setError('مصنوعات لوڈ کرنے میں دشواری پیش آئی۔ براہِ کرم دوبارہ کوشش کریں۔');
          }
        );
      } catch {
        if (!isMounted) return;
        setLoading(false);
        setError('ڈیٹابیس سے رابطہ قائم نہیں ہو سکا۔ براہِ کرم دوبارہ کوشش کریں۔');
      }
    }

    initFirestoreCatalog();

    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [reloadToken]);

  const handleNavigate = useCallback((page: ActivePage, sectionId?: string) => {
    setActivePage(page);

    if (page === 'admin') {
      window.location.hash = '#admin';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'products') {
      window.location.hash = '#products';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.location.hash = sectionId ? `#${sectionId}` : '#home';

    if (sectionId) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 40);
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <ErrorBoundary>
      <div dir="rtl" className="min-h-screen flex flex-col bg-[#FBF8F1] text-[#132A20]">
        <Header activePage={activePage} onNavigate={handleNavigate} />

        <main className="flex-1">
          {activePage === 'home' && (
            <>
              <HeroSection onExploreProducts={() => handleNavigate('products')} />
              <FeaturedProductsSection
                products={products}
                loading={loading}
                error={error}
                onRetry={loadCatalog}
                onViewAll={() => handleNavigate('products')}
              />
              <AboutSection />
              <ContactSection />
            </>
          )}

          {activePage === 'products' && (
            <>
              <ProductsPage
                products={products}
                loading={loading}
                error={error}
                onRetry={loadCatalog}
                onBackHome={() => handleNavigate('home', 'hero')}
              />
              <ContactSection />
            </>
          )}

          {activePage === 'admin' && (
            <AdminPage
              products={products}
              onBackHome={() => handleNavigate('home', 'hero')}
            />
          )}
        </main>

        <Footer onNavigate={handleNavigate} />
      </div>
    </ErrorBoundary>
  );
}

import { ArrowLeft } from 'lucide-react';
import type { HerbalProduct } from '../data/catalogSeed';
import { ProductCard } from './ProductCard';

interface FeaturedProductsSectionProps {
  products: HerbalProduct[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onViewAll: () => void;
}

export function FeaturedProductsSection({
  products,
  loading,
  error,
  onRetry,
  onViewAll,
}: FeaturedProductsSectionProps) {
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <section id="featured" className="py-16 lg:py-20 bg-[#FBF8F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold text-[#8C6A2B] mb-1">منتخب و آزمودہ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0E3B2C] leading-[1.75]">
              نمایاں مصنوعات
            </h2>
          </div>

          <button
            type="button"
            onClick={onViewAll}
            className="inline-flex items-center gap-2 text-base font-bold text-[#0E3B2C] hover:text-[#8C6A2B] transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            <span>تمام مصنوعات دیکھیں</span>
            <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
          </button>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E3D8C2] rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="aspect-[4/3] bg-[#EAE0CC]" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-20 bg-[#EAE0CC] rounded" />
                  <div className="h-6 w-3/4 bg-[#EAE0CC] rounded" />
                  <div className="h-4 w-full bg-[#F2EBDD] rounded" />
                  <div className="h-12 w-full bg-[#DFD4BE] rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="bg-[#F3ECE0] border border-[#DFD4BE] rounded-2xl p-8 text-center">
            <p className="text-base text-[#132A20] mb-4">{error}</p>
            <button
              type="button"
              onClick={onRetry}
              className="px-6 py-2.5 rounded-xl bg-[#0E3B2C] text-white font-semibold hover:bg-[#14533D] transition-colors cursor-pointer"
            >
              دوبارہ لوڈ کریں
            </button>
          </div>
        )}

        {!loading && !error && featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && !error && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={onViewAll}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#0E3B2C] hover:bg-[#14533D] text-[#FBF8F1] text-base font-bold transition-colors shadow-sm cursor-pointer min-h-[48px]"
            >
              <span>تمام ۱۰ ادویات کا کیٹلاگ دیکھیں</span>
              <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

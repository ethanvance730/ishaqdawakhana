import { ArrowRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { HerbalProduct, ProductCategory } from '../data/catalogSeed';
import { ProductCard } from './ProductCard';
import { GeometricOrnament } from './UrduIcons';

interface ProductsPageProps {
  products: HerbalProduct[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onBackHome: () => void;
}

const CATEGORY_OPTIONS: Array<{ value: 'all' | ProductCategory; label: string }> = [
  { value: 'all', label: 'سب ادویات' },
  { value: 'کیپسول', label: 'کیپسول' },
  { value: 'گولیاں', label: 'گولیاں' },
  { value: 'معجون و لعوق', label: 'معجون و لعوق' },
  { value: 'سیرپ', label: 'سیرپ' },
];

export function ProductsPage({
  products,
  loading,
  error,
  onRetry,
  onBackHome,
}: ProductsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    const trimmed = searchQuery.trim();
    return products.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesQuery =
        trimmed === '' ||
        item.name.includes(trimmed) ||
        item.description.includes(trimmed) ||
        item.category.includes(trimmed);
      return matchesCategory && matchesQuery;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <section id="products" className="py-12 lg:py-16 bg-[#FBF8F1] min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8C6A2B] hover:text-[#0E3B2C] transition-colors mb-4 cursor-pointer"
          >
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>مرکزی صفحہ پر واپس جائیں</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E3B2C] leading-[1.75] mb-2">
                ہماری تمام جڑی بوٹیوں کی ادویات
              </h1>
              <p className="text-base text-[#3D5247] leading-[2.0]">
                اسحاق دواخانہ کی تمام مستند اور خالص یونانی ادویات نیچے موجود ہیں۔ آرڈر کے لیے متعلقہ دوا کے بٹن پر کلک کریں۔
              </p>
            </div>

            <div className="text-sm font-semibold text-[#8C6A2B] whitespace-nowrap">
              کل مصنوعات:{' '}
              {String(filteredProducts.length).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])}
            </div>
          </div>
        </div>

        {/* Search & Interactive Category Filter Controls */}
        <div className="bg-[#F3ECE0] border border-[#DFD4BE] rounded-2xl p-4 sm:p-5 mb-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORY_OPTIONS.map((opt) => {
              const isActive = selectedCategory === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSelectedCategory(opt.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[42px] ${
                    isActive
                      ? 'bg-[#0E3B2C] text-[#FBF8F1] shadow-sm'
                      : 'bg-white text-[#2A4237] border border-[#DFD4BE] hover:border-[#B68D40]'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-80 shrink-0">
            <Search
              className="w-4 h-4 text-[#8C6A2B] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="دوا یا مرض کا نام تلاش کریں..."
              aria-label="ادویات تلاش کریں"
              className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-white border border-[#DFD4BE] text-sm text-[#132A20] placeholder-[#7B8B82] focus:outline-none focus:border-[#0E3B2C] min-h-[44px]"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
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

        {/* Error State */}
        {!loading && error && (
          <div className="bg-[#F3ECE0] border border-[#DFD4BE] rounded-2xl p-10 text-center">
            <p className="text-base text-[#132A20] mb-4">{error}</p>
            <button
              type="button"
              onClick={onRetry}
              className="px-6 py-3 rounded-xl bg-[#0E3B2C] text-white font-semibold hover:bg-[#14533D] transition-colors cursor-pointer"
            >
              دوبارہ لوڈ کریں
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="bg-[#F3ECE0] border border-[#DFD4BE] rounded-2xl p-10 text-center">
            <p className="text-lg font-semibold text-[#0E3B2C] mb-2">
              آپ کی تلاش کے مطابق کوئی دوا نہیں ملی۔
            </p>
            <p className="text-sm text-[#4A5D52] mb-5">
              براہِ کرم تمام اقسام منتخب کریں یا کوئی دوسرا لفظ تلاش کریں۔
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-xl bg-[#0E3B2C] text-white font-semibold hover:bg-[#14533D] transition-colors cursor-pointer"
            >
              تمام مصنوعات دکھائیں
            </button>
          </div>
        )}

        {/* Responsive Product Grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <GeometricOrnament className="mt-16" />
      </div>
    </section>
  );
}

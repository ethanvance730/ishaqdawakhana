import { Leaf } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  buildWhatsAppOrderUrl,
  resolveProductImage,
  type HerbalProduct,
} from '../data/catalogSeed';
import { WhatsAppIcon } from './UrduIcons';

interface ProductCardProps {
  product: HerbalProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageSrc = resolveProductImage(product);
  const whatsappHref = buildWhatsAppOrderUrl(product.name);

  useEffect(() => {
    setImageError(false);
  }, [imageSrc]);

  return (
    <article className="group bg-white border border-[#E3D8C2] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-[#C9A45C]">
      <div>
        {/* Product Image Container (4:3 neutral travertine backdrop) */}
        <div className="relative aspect-[4/3] w-full bg-[#F3ECE0] overflow-hidden">
          {!imageError ? (
            <img
              src={imageSrc}
              alt={product.name}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#EFE6D4] to-[#DFD3BA] p-6 text-center">
              <Leaf className="w-10 h-10 text-[#0E3B2C]" aria-hidden="true" />
              <span className="text-base font-semibold text-[#0E3B2C]">{product.name}</span>
            </div>
          )}
        </div>

        {/* Clean Unboxed Metadata & Content */}
        <div className="p-6 pb-4">
          <div className="text-xs font-medium text-[#8C6A2B] mb-1.5">
            {product.category}
          </div>
          <h3 className="text-xl font-bold text-[#0E3B2C] leading-[1.85] mb-2">
            {product.name}
          </h3>
          <p className="text-sm sm:text-base text-[#3D5247] leading-[2.05]">
            {product.description}
          </p>
        </div>
      </div>

      {/* Prominent Green WhatsApp Order Button (No Prices Shown) */}
      <div className="px-6 pb-6 pt-2">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-[#168A45] hover:bg-[#117037] text-white text-sm sm:text-base font-bold transition-colors shadow-sm min-h-[48px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E3B2C]"
        >
          <WhatsAppIcon className="w-5 h-5 shrink-0" />
          <span>واٹس ایپ پر آرڈر کریں</span>
        </a>
      </div>
    </article>
  );
}

import { ArrowLeft, Leaf, MapPin } from 'lucide-react';
import { useState } from 'react';
import {
  buildWhatsAppGeneralUrl,
  CLINIC_ADDRESS,
  CLINIC_NAME,
  HERO_IMAGE_PATH,
} from '../data/catalogSeed';
import { GeometricOrnament, WhatsAppIcon } from './UrduIcons';

interface HeroSectionProps {
  onExploreProducts: () => void;
}

export function HeroSection({ onExploreProducts }: HeroSectionProps) {
  const [heroImgError, setHeroImgError] = useState(false);

  return (
    <section
      id="hero"
      className="relative bg-gradient-to-b from-[#FBF8F1] to-[#F3ECE0] border-b border-[#E3D8C2]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center text-right">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#8C6A2B] mb-3">
              <MapPin className="w-4 h-4 text-[#B68D40] shrink-0" aria-hidden="true" />
              <span>{CLINIC_ADDRESS}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0E3B2C] leading-[1.7] mb-5 [text-wrap:balance]">
              {CLINIC_NAME}
            </h1>

            <p className="text-base sm:text-lg text-[#2C4238] leading-[2.2] max-w-2xl mb-8">
              خالص قدرتی جڑی بوٹیوں اور مستند طبِ یونانی کے اصولوں کے مطابق تیار کردہ معیاری دیسی ادویات کا بااعتماد مرکز۔ صحت، توانائی اور شفاء کے لیے آزمودہ نسخہ جات اب گھر بیٹھے حاصل کریں۔
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreProducts}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0E3B2C] hover:bg-[#14533D] text-[#FBF8F1] text-base font-bold transition-colors shadow-sm cursor-pointer min-h-[48px] whitespace-nowrap"
              >
                <span>تمام مصنوعات دیکھیں</span>
                <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>

              <a
                href={buildWhatsAppGeneralUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#168A45] hover:bg-[#117037] text-white text-base font-bold transition-colors shadow-sm min-h-[48px] whitespace-nowrap"
              >
                <WhatsAppIcon className="w-5 h-5 shrink-0" />
                <span>واٹس ایپ پر آرڈر کریں</span>
              </a>
            </div>

            <div className="mt-10 pt-6 border-t border-[#DFD4BE] grid grid-cols-3 gap-4 max-w-xl">
              <div>
                <div className="text-lg sm:text-xl font-bold text-[#0E3B2C]">۱۰۰٪ خالص</div>
                <div className="text-xs sm:text-sm text-[#4A5D52]">قدرتی جڑی بوٹیاں</div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-[#0E3B2C]">طبِ یونانی</div>
                <div className="text-xs sm:text-sm text-[#4A5D52]">مستند اور آزمودہ نسخے</div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-[#0E3B2C]">فوری رہنمائی</div>
                <div className="text-xs sm:text-sm text-[#4A5D52]">براہِ راست واٹس ایپ آرڈر</div>
              </div>
            </div>
          </div>

          {/* Visual Column */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full rounded-2xl overflow-hidden border border-[#DFD4BE] bg-[#EAE0CC] shadow-md min-h-[300px] lg:min-h-[460px]">
              {!heroImgError ? (
                <img
                  src={HERO_IMAGE_PATH}
                  alt="اسحاق دواخانہ کی خالص جڑی بوٹیاں اور دیسی ادویات"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#0E3B2C] to-[#1A5943] text-[#FBF8F1] p-10 text-center">
                  <Leaf className="w-14 h-14 text-[#C9A45C]" aria-hidden="true" />
                  <span className="text-2xl font-bold">{CLINIC_NAME}</span>
                  <span className="text-sm text-[#EAE0CC]">{CLINIC_ADDRESS}</span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A261C]/85 via-[#0A261C]/35 to-transparent p-6">
                <p className="text-sm sm:text-base font-medium text-[#FBF8F1]">
                  خالص اجزاء اور روایتی حکمت کے امتزاج سے تیار کردہ ادویات — {CLINIC_ADDRESS}
                </p>
              </div>
            </div>
          </div>
        </div>

        <GeometricOrnament className="mt-12" />
      </div>
    </section>
  );
}

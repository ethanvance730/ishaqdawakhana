import { Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { ABOUT_IMAGE_PATH, CLINIC_ADDRESS, CLINIC_NAME } from '../data/catalogSeed';

export function AboutSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="about"
      className="py-16 lg:py-20 bg-[#F3ECE0] border-y border-[#E3D8C2]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Craftsmanship Photograph */}
          <div className="lg:col-span-5 flex">
            <div className="w-full rounded-2xl overflow-hidden border border-[#DFD4BE] bg-[#EAE0CC] shadow-sm min-h-[280px]">
              {!imgError ? (
                <img
                  src={ABOUT_IMAGE_PATH}
                  alt="اسحاق دواخانہ میں خالص جڑی بوٹیوں اور یونانی ادویات کی تیاری"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#0E3B2C] text-[#FBF8F1] p-8 text-center">
                  <Leaf className="w-12 h-12 text-[#C9A45C]" aria-hidden="true" />
                  <span className="text-xl font-bold">{CLINIC_NAME}</span>
                </div>
              )}
            </div>
          </div>

          {/* Heritage Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-sm font-semibold text-[#8C6A2B] mb-1">
              ہمارا تعارف اور روایت
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0E3B2C] leading-[1.75] mb-5">
              ہمارے بارے میں
            </h2>

            <p className="text-base sm:text-lg text-[#2A4237] leading-[2.15] mb-4">
              {CLINIC_NAME} ({CLINIC_ADDRESS}) خالص دیسی اور یونانی ادویات کی تیاری اور فراہمی کا ایک مستند و بااعتماد ادارہ ہے۔ ہمارا مقصد قدرتی جڑی بوٹیوں کی افادیت کو جدید اور صاف ستھرے طریقے سے عوام تک پہنچانا ہے تاکہ ہر مریض کو محفوظ، مؤثر اور معیاری علاج میسر آ سکے۔
            </p>
            <p className="text-base text-[#3D5247] leading-[2.1] mb-8">
              ہر دوا ماہر حکماء کی نگرانی میں خالص جڑی بوٹیوں، زعفران، عنبر اور قدرتی اجزاء سے تیار کی جاتی ہے، اور معیار پر کسی قسم کا سمجھوتہ نہیں کیا جاتا۔
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#DFD4BE]">
              <div>
                <div className="flex items-center gap-2 text-[#0E3B2C] font-bold text-base mb-1">
                  <Leaf className="w-4 h-4 text-[#8C6A2B] shrink-0" aria-hidden="true" />
                  <span>خالص اجزاء</span>
                </div>
                <p className="text-sm text-[#4A5D52] leading-[1.95]">
                  ملاوٹ سے پاک تازہ اور منتخب جڑی بوٹیوں کا استعمال۔
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-[#0E3B2C] font-bold text-base mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#8C6A2B] shrink-0" aria-hidden="true" />
                  <span>مستند نسخہ جات</span>
                </div>
                <p className="text-sm text-[#4A5D52] leading-[1.95]">
                  صدیوں پرانے آزمودہ طبِ یونانی کے اصولوں کے عین مطابق۔
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-[#0E3B2C] font-bold text-base mb-1">
                  <Sparkles className="w-4 h-4 text-[#8C6A2B] shrink-0" aria-hidden="true" />
                  <span>اعتماد اور خدمت</span>
                </div>
                <p className="text-sm text-[#4A5D52] leading-[1.95]">
                  مریض کی کیفیت کے مطابق مخلصانہ رہنمائی اور بروقت ترسیل۔
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

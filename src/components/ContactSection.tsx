import { Clock, MapPin, Phone } from 'lucide-react';
import {
  buildWhatsAppGeneralUrl,
  CLINIC_ADDRESS,
  CLINIC_NAME,
  WHATSAPP_DISPLAY_NUMBER,
} from '../data/catalogSeed';
import { WhatsAppIcon } from './UrduIcons';

export function ContactSection() {
  return (
    <section id="contact" className="py-16 lg:py-20 bg-[#FBF8F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="islamic-lattice-bg rounded-3xl border border-[#C9A45C]/40 p-8 sm:p-12 lg:p-14 text-[#FBF8F1] shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-[#D9B973] mb-2">
                مشورہ اور آرڈر کے لیے
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-[1.75] mb-4">
                رابطہ کریں اور تشریف لائیں
              </h2>
              <p className="text-base sm:text-lg text-[#E8E2D4] leading-[2.1] max-w-2xl mb-8">
                اپنی بیماری، علامات یا کسی بھی دوا کے آرڈر کے لیے براہِ راست {CLINIC_NAME} تشریف لائیں یا واٹس ایپ پر پیغام بھیجیں۔
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#C9A45C]/25">
                <div>
                  <div className="flex items-center gap-2 text-[#D9B973] font-bold text-sm mb-1">
                    <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>پتہ</span>
                  </div>
                  <p className="text-base font-semibold text-white">{CLINIC_ADDRESS}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-[#D9B973] font-bold text-sm mb-1">
                    <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>واٹس ایپ نمبر</span>
                  </div>
                  <p
                    dir="ltr"
                    className="text-base font-semibold text-white tabular-nums text-right"
                  >
                    {WHATSAPP_DISPLAY_NUMBER}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-[#D9B973] font-bold text-sm mb-1">
                    <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>اوقاتِ کار</span>
                  </div>
                  <p className="text-base font-semibold text-white">
                    صبح ۹ بجے تا رات ۹ بجے
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex lg:justify-end">
              <div className="w-full max-w-md bg-[#FBF8F1] text-[#132A20] rounded-2xl p-6 sm:p-8 border border-[#DFD4BE]">
                <h3 className="text-xl font-bold text-[#0E3B2C] leading-[1.8] mb-2">
                  فوری واٹس ایپ آرڈر
                </h3>
                <p className="text-sm text-[#3D5247] leading-[2.0] mb-6">
                  کسی بھی دوا کا آرڈر دینے یا حکیم صاحب سے مشورہ کرنے کے لیے نیچے دیے گئے بٹن کو دبائیں۔
                </p>

                <a
                  href={buildWhatsAppGeneralUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#168A45] hover:bg-[#117037] text-white text-base font-bold transition-colors shadow-sm min-h-[48px]"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  <span>واٹس ایپ پر آرڈر کریں</span>
                </a>

                <p
                  dir="ltr"
                  className="mt-4 text-center text-sm font-semibold text-[#0E3B2C] tabular-nums"
                >
                  {WHATSAPP_DISPLAY_NUMBER}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

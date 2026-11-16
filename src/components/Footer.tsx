import { MapPin, Phone } from 'lucide-react';
import {
  buildWhatsAppGeneralUrl,
  CLINIC_ADDRESS,
  CLINIC_NAME,
  WHATSAPP_DISPLAY_NUMBER,
} from '../data/catalogSeed';
import type { ActivePage } from './Header';
import { WhatsAppIcon } from './UrduIcons';

interface FooterProps {
  onNavigate: (page: ActivePage, sectionId?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#0B2D22] text-[#E8E2D4] border-t-2 border-[#B68D40]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-[#C9A45C]/25">
          {/* Brand Summary */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">{CLINIC_NAME}</h2>
            <p className="text-sm text-[#D6CFBF] leading-[2.1]">
              خالص جڑی بوٹیوں اور مستند طبِ یونانی کے مطابق تیار کردہ دیسی ادویات کا بااعتماد مرکز۔
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-[#D9B973] mb-3">اہم روابط</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home', 'hero')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  مرکزی صفحہ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  تمام مصنوعات
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home', 'about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ہمارے بارے میں
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home', 'contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  رابطہ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('admin')}
                  className="hover:text-white transition-colors cursor-pointer text-[#D9B973]"
                >
                  ایڈمن پینل
                </button>
              </li>
            </ul>
          </div>

          {/* Location & WhatsApp */}
          <div>
            <h3 className="text-lg font-bold text-[#D9B973] mb-3">پتہ اور رابطہ</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D9B973] shrink-0" aria-hidden="true" />
                <span>{CLINIC_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D9B973] shrink-0" aria-hidden="true" />
                <span dir="ltr" className="tabular-nums">
                  {WHATSAPP_DISPLAY_NUMBER}
                </span>
              </div>
              <div className="pt-2">
                <a
                  href={buildWhatsAppGeneralUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#168A45] hover:bg-[#117037] text-white font-bold transition-colors min-h-[44px]"
                >
                  <WhatsAppIcon className="w-4 h-4 shrink-0" />
                  <span>واٹس ایپ پر آرڈر کریں</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#BFB7A4]">
          <p>© ۲۰۲۶ {CLINIC_NAME} — جملہ حقوق محفوظ ہیں</p>
          <p>{CLINIC_ADDRESS}</p>
        </div>
      </div>
    </footer>
  );
}

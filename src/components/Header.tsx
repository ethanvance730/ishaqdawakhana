import { MapPin, Menu, X } from 'lucide-react';
import { useState } from 'react';
import {
  buildWhatsAppGeneralUrl,
  CLINIC_ADDRESS,
  CLINIC_NAME,
} from '../data/catalogSeed';
import { WhatsAppIcon } from './UrduIcons';

export type ActivePage = 'home' | 'products' | 'admin';

interface HeaderProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage, sectionId?: string) => void;
}

export function Header({ activePage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: ActivePage, sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(page, sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF8F1]/95 backdrop-blur-sm border-b border-[#DFD4BE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-8 h-20">
          {/* Zone 1: Prominent Clinic Brand Name */}
          <button
            type="button"
            onClick={() => handleNavClick('home', 'hero')}
            className="text-right cursor-pointer focus-visible:outline-2 focus-visible:outline-[#B68D40] rounded-lg shrink-0"
          >
            <span className="block text-2xl sm:text-3xl font-bold text-[#0E3B2C] leading-normal whitespace-nowrap">
              {CLINIC_NAME}
            </span>
          </button>

          {/* Zone 2: Clean Single-Line Navigation Links */}
          <nav
            aria-label="بنیادی مینو"
            className="hidden lg:flex items-center gap-7 text-base font-medium text-[#2A4237]"
          >
            <button
              type="button"
              onClick={() => handleNavClick('home', 'hero')}
              className={`whitespace-nowrap shrink-0 pb-1 transition-colors cursor-pointer ${
                activePage === 'home'
                  ? 'text-[#0E3B2C] font-bold border-b-2 border-[#B68D40]'
                  : 'hover:text-[#0E3B2C]'
              }`}
            >
              مرکزی صفحہ
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('products')}
              className={`whitespace-nowrap shrink-0 pb-1 transition-colors cursor-pointer ${
                activePage === 'products'
                  ? 'text-[#0E3B2C] font-bold border-b-2 border-[#B68D40]'
                  : 'hover:text-[#0E3B2C]'
              }`}
            >
              مصنوعات
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('home', 'about')}
              className="whitespace-nowrap shrink-0 pb-1 hover:text-[#0E3B2C] transition-colors cursor-pointer"
            >
              ہمارے بارے میں
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('home', 'contact')}
              className="whitespace-nowrap shrink-0 pb-1 hover:text-[#0E3B2C] transition-colors cursor-pointer"
            >
              رابطہ
            </button>
          </nav>

          {/* Zone 3: Address + Primary WhatsApp Action */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 text-sm text-[#4A5D52] whitespace-nowrap">
              <MapPin className="w-4 h-4 text-[#B68D40] shrink-0" aria-hidden="true" />
              <span>{CLINIC_ADDRESS}</span>
            </div>

            <a
              href={buildWhatsAppGeneralUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#168A45] hover:bg-[#127038] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 shadow-sm min-h-[44px]"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">واٹس ایپ رابطہ</span>
              <span className="sm:hidden">واٹس ایپ</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'مینو بند کریں' : 'مینو کھولیں'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[#DFD4BE] text-[#0E3B2C] hover:bg-[#F3ECE0] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Compact Mobile Address Strip */}
        <div className="md:hidden pb-2.5 flex items-center justify-center gap-1.5 text-xs text-[#4A5D52] border-t border-[#EAE0CC]/70 pt-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#B68D40] shrink-0" aria-hidden="true" />
          <span>{CLINIC_ADDRESS}</span>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBF8F1] border-t border-[#DFD4BE] px-4 py-4">
          <nav className="flex flex-col gap-2" aria-label="موبائل مینو">
            <button
              type="button"
              onClick={() => handleNavClick('home', 'hero')}
              className="w-full text-right px-4 py-3 rounded-xl text-base font-semibold text-[#0E3B2C] hover:bg-[#F2EBDD] transition-colors cursor-pointer"
            >
              مرکزی صفحہ
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('products')}
              className="w-full text-right px-4 py-3 rounded-xl text-base font-semibold text-[#0E3B2C] hover:bg-[#F2EBDD] transition-colors cursor-pointer"
            >
              تمام مصنوعات
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('home', 'about')}
              className="w-full text-right px-4 py-3 rounded-xl text-base font-semibold text-[#0E3B2C] hover:bg-[#F2EBDD] transition-colors cursor-pointer"
            >
              ہمارے بارے میں
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('home', 'contact')}
              className="w-full text-right px-4 py-3 rounded-xl text-base font-semibold text-[#0E3B2C] hover:bg-[#F2EBDD] transition-colors cursor-pointer"
            >
              رابطہ اور پتہ
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export type ProductCategory = 'کیپسول' | 'گولیاں' | 'معجون و لعوق' | 'سیرپ';
export type ProductImageKey = 'capsules' | 'pills' | 'majoon' | 'syrup';

export interface HerbalProduct {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  imageKey: ProductImageKey;
  imageUrl?: string;
  featured: boolean;
  sortOrder: number;
}

export const WHATSAPP_BASE_URL = 'https://wa.me/923157919074';
export const WHATSAPP_DISPLAY_NUMBER = '+92 315 7919074';
export const CLINIC_NAME = 'اسحاق دواخانہ';
export const CLINIC_ADDRESS = 'مین بازار، ڈونگہ بونگہ';

export const PRODUCT_IMAGE_MAP: Record<ProductImageKey, string> = {
  capsules: '/src/assets/images/product_herbal_capsules_1794805416712.jpg',
  pills: '/src/assets/images/product_unani_pills_1794805417048.jpg',
  majoon: '/src/assets/images/product_majoon_jar_1794805417490.jpg',
  syrup: '/src/assets/images/product_herbal_syrup_1794805418359.jpg',
};

export const PRODUCT_DEFAULT_IMAGE_BY_ID: Record<string, string> = {
  'ikseer-saal-capsule': '/src/assets/images/product_herbal_capsules_1794805416712.jpg',
  'suranjan-capsule': '/src/assets/images/product_suranjan_capsule_1794806454987.jpg',
  'mubahhi-capsule': '/src/assets/images/product_mubahhi_capsule_1794806454326.jpg',
  'habb-e-ambari': '/src/assets/images/product_unani_pills_1794805417048.jpg',
  'habb-e-shingrafi': '/src/assets/images/product_habb_shingrafi_1794806455434.jpg',
  'habb-e-nuqra': '/src/assets/images/product_habb_nuqra_1794806456162.jpg',
  'majoon-moosli-zafrani': '/src/assets/images/product_majoon_jar_1794805417490.jpg',
  'laooq-sapistan': '/src/assets/images/product_laooq_sapistan_clean_1794806477981.jpg',
  'ikseer-saal-syrup': '/src/assets/images/product_herbal_syrup_1794805418359.jpg',
  'gastonil-syrup': '/src/assets/images/product_gastonil_syrup_1794806456516.jpg',
};

export function resolveProductImage(
  product: Pick<HerbalProduct, 'imageUrl' | 'imageKey'> & { id?: string }
): string {
  const custom = product.imageUrl?.trim();
  if (custom && (custom.startsWith('https://') || custom.startsWith('/src/assets/images/'))) {
    return custom;
  }
  if (product.id && PRODUCT_DEFAULT_IMAGE_BY_ID[product.id]) {
    return PRODUCT_DEFAULT_IMAGE_BY_ID[product.id];
  }
  return PRODUCT_IMAGE_MAP[product.imageKey] || PRODUCT_IMAGE_MAP.capsules;
}

export const HERO_IMAGE_PATH = '/src/assets/images/hero_dawakhana_apothecary_1794805415816.jpg';
export const ABOUT_IMAGE_PATH = '/src/assets/images/about_unani_craftsmanship_1794805416368.jpg';

export function buildWhatsAppOrderUrl(productName: string): string {
  const message = `السلام علیکم، میں ${productName} کا آرڈر کرنا چاہتا/چاہتی ہوں۔`;
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppGeneralUrl(): string {
  const message = 'السلام علیکم، مجھے اسحاق دواخانہ کی ادویات کے بارے میں معلومات درکار ہیں۔';
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

export const CANONICAL_PRODUCTS: HerbalProduct[] = [
  {
    id: 'ikseer-saal-capsule',
    name: 'اکسیر سعال کیپسول',
    description: 'کھانسی، نزلہ اور زکام کے لیے مؤثر قدرتی علاج۔',
    category: 'کیپسول',
    imageKey: 'capsules',
    imageUrl: PRODUCT_DEFAULT_IMAGE_BY_ID['ikseer-saal-capsule'],
    featured: true,
    sortOrder: 1,
  },
  {
    id: 'suranjan-capsule',
    name: 'سورنجاں کیپسول',
    description: 'جوڑوں کے درد، سوزش اور گٹھیا کے لیے مفید۔',
    category: 'کیپسول',
    imageKey: 'capsules',
    imageUrl: PRODUCT_DEFAULT_IMAGE_BY_ID['suranjan-capsule'],
    featured: false,
    sortOrder: 2,
  },
  {
    id: 'mubahhi-capsule',
    name: 'مبہی کیپسول',
    description: 'بھوک بڑھانے اور وزن بڑھانے کے لیے بہترین۔',
    category: 'کیپسول',
    imageKey: 'capsules',
    imageUrl: PRODUCT_DEFAULT_IMAGE_BY_ID['mubahhi-capsule'],
    featured: false,
    sortOrder: 3,
  },
  {
    id: 'habb-e-ambari',
    name: 'حب عنبری گولیاں',
    description: 'جسم کے مختلف دردوں کے لیے مؤثر۔',
    category: 'گولیاں',
    imageKey: 'pills',
    imageUrl: PRODUCT_DEFAULT_IMAGE_BY_ID['habb-e-ambari'],
    featured: false,
    sortOrder: 4,
  },
  {
    id: 'habb-e-shingrafi',
    name: 'حب شنگرفی',
    description: 'پٹھوں کے کھچاؤ اور اینٹھن کے لیے مفید۔',
    category: 'گولیاں',
    imageKey: 'pills',
    imageUrl: PRODUCT_DEFAULT_IMAGE_BY_ID['habb-e-shingrafi'],
    featured: false,
    sortOrder: 5,
  },
  {
    id: 'habb-e-nuqra',
    name: 'حب نقرہ',
    description: 'مردانہ کمزوری کے لیے طاقتور نسخہ۔',
    category: 'گولیاں',
    imageKey: 'pills',
    imageUrl: PRODUCT_DEFAULT_IMAGE_BY_ID['habb-e-nuqra'],
    featured: false,
    sortOrder: 6,
  },
  {
    id: 'majoon-moosli-zafrani',
    name: 'معجون موصلی زعفرانی',
    description: 'مردانہ طاقت اور قوت بڑھانے والا معروف معجون۔',
    category: 'معجون و لعوق',
    imageKey: 'majoon',
    imageUrl: PRODUCT_DEFAULT_IMAGE_BY_ID['majoon-moosli-zafrani'],
    featured: true,
    sortOrder: 7,
  },
  {
    id: 'laooq-sapistan',
    name: 'لعوق سپستاں',
    description: 'نزلہ زکام اور سینے کی جکڑن کے لیے مؤثر۔',
    category: 'معجون و لعوق',
    imageKey: 'majoon',
    imageUrl: PRODUCT_DEFAULT_IMAGE_BY_ID['laooq-sapistan'],
    featured: false,
    sortOrder: 8,
  },
  {
    id: 'ikseer-saal-syrup',
    name: 'اکسیر سعال سیرپ',
    description: 'کھانسی کے لیے میٹھا اور مؤثر سیرپ۔',
    category: 'سیرپ',
    imageKey: 'syrup',
    imageUrl: PRODUCT_DEFAULT_IMAGE_BY_ID['ikseer-saal-syrup'],
    featured: true,
    sortOrder: 9,
  },
  {
    id: 'gastonil-syrup',
    name: 'گیسٹونل سیرپ',
    description: 'معدے کی گیس، تیزابیت اور ہاضمے کی شکایات کے لیے مفید۔',
    category: 'سیرپ',
    imageKey: 'syrup',
    imageUrl: PRODUCT_DEFAULT_IMAGE_BY_ID['gastonil-syrup'],
    featured: true,
    sortOrder: 10,
  },
];

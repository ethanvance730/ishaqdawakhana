import { onAuthStateChanged, type User } from 'firebase/auth';
import { ArrowRight, Lock, LogOut, Pencil, Plus, ShieldAlert, Trash2 } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import {
  resolveProductImage,
  type HerbalProduct,
  type ProductCategory,
  type ProductImageKey,
} from '../data/catalogSeed';
import { auth } from '../firebase';
import {
  removeProduct,
  saveProduct,
  signInAdminWithGoogle,
  signOutAdmin,
  verifyAdminAccess,
} from '../services/productService';

interface AdminPageProps {
  products: HerbalProduct[];
  onBackHome: () => void;
}

const CATEGORIES: ProductCategory[] = ['کیپسول', 'گولیاں', 'معجون و لعوق', 'سیرپ'];

const IMAGE_OPTIONS: Array<{ value: ProductImageKey; label: string }> = [
  { value: 'capsules', label: 'کیپسول بوتل' },
  { value: 'pills', label: 'گولیاں اور شیشی' },
  { value: 'majoon', label: 'معجون اور لعوق مرتبان' },
  { value: 'syrup', label: 'سیرپ بوتل' },
];

export function AdminPage({ products, onBackHome }: AdminPageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthorizedAdmin, setIsAuthorizedAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ProductCategory>('کیپسول');
  const [imageKey, setImageKey] = useState<ProductImageKey>('capsules');
  const [imageUrl, setImageUrl] = useState('');
  const [featured, setFeatured] = useState(false);
  const [sortOrder, setSortOrder] = useState(11);

  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!active) return;
      setUser(firebaseUser);
      if (!firebaseUser) {
        setIsAuthorizedAdmin(false);
        setAuthLoading(false);
        return;
      }
      setAuthLoading(true);
      const allowed = await verifyAdminAccess(firebaseUser.uid);
      if (!active) return;
      setIsAuthorizedAdmin(allowed);
      setAuthLoading(false);
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setCategory('کیپسول');
    setImageKey('capsules');
    setImageUrl('');
    setFeatured(false);
    setSortOrder(Math.min(100, products.length + 1));
    setFormError(null);
  };

  const handleStartEdit = (product: HerbalProduct) => {
    setEditingId(product.id);
    setName(product.name);
    setDescription(product.description);
    setCategory(product.category);
    setImageKey(product.imageKey);
    setImageUrl(product.imageUrl || '');
    setFeatured(product.featured);
    setSortOrder(product.sortOrder);
    setStatusMessage(null);
    setFormError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignIn = async () => {
    setAuthError(null);
    try {
      await signInAdminWithGoogle();
    } catch {
      setAuthError('گوگل لاگ ان مکمل نہیں ہو سکا۔ براہِ کرم دوبارہ کوشش کریں۔');
    }
  };

  const handleSignOut = async () => {
    setAuthError(null);
    await signOutAdmin();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setStatusMessage(null);

    const trimmedName = name.trim();
    const trimmedDesc = description.trim();
    const trimmedImageUrl = imageUrl.trim();

    if (trimmedName.length < 2 || trimmedName.length > 120) {
      setFormError('دوا کا نام ۲ سے ۱۲۰ حروف کے درمیان ہونا چاہیے۔');
      return;
    }
    if (trimmedDesc.length < 5 || trimmedDesc.length > 500) {
      setFormError('دوا کی تفصیل ۵ سے ۵۰۰ حروف کے درمیان ہونی چاہیے۔');
      return;
    }
    if (
      trimmedImageUrl !== '' &&
      !trimmedImageUrl.startsWith('https://') &&
      !trimmedImageUrl.startsWith('/src/assets/images/')
    ) {
      setFormError('تصویر کا لنک درست نہیں ہے۔ براہِ کرم مکمل محفوظ لنک درج کریں۔');
      return;
    }

    const isNew = editingId === null;
    const productId = isNew ? `product-${Date.now()}` : editingId;

    setSubmitting(true);
    try {
      await saveProduct(
        {
          id: productId,
          name: trimmedName,
          description: trimmedDesc,
          category,
          imageKey,
          imageUrl: trimmedImageUrl,
          featured,
          sortOrder: Math.min(100, Math.max(1, Number(sortOrder) || 1)),
        },
        isNew
      );
      setStatusMessage(
        isNew ? 'نئی دوا کامیابی سے محفوظ کر لی گئی۔' : 'دوا کی معلومات کامیابی سے اپ ڈیٹ ہو گئیں۔'
      );
      resetForm();
    } catch {
      setFormError('محفوظ کرنے میں خرابی پیش آئی۔ براہِ کرم دوبارہ کوشش کریں۔');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (productId: string) => {
    setFormError(null);
    setStatusMessage(null);
    try {
      await removeProduct(productId);
      setConfirmDeleteId(null);
      if (editingId === productId) {
        resetForm();
      }
      setStatusMessage('دوا کیٹلاگ سے حذف کر دی گئی۔');
    } catch {
      setFormError('دوا حذف کرنے میں دشواری پیش آئی۔');
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-[#FBF8F1] min-h-[75vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#8C6A2B] hover:text-[#0E3B2C] transition-colors mb-6 cursor-pointer"
        >
          <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>مرکزی صفحہ پر واپس جائیں</span>
        </button>

        {authLoading && (
          <div className="bg-[#F3ECE0] border border-[#DFD4BE] rounded-2xl p-10 text-center">
            <p className="text-base font-semibold text-[#0E3B2C]">تصدیق ہو رہی ہے...</p>
          </div>
        )}

        {!authLoading && !user && (
          <div className="max-w-lg mx-auto bg-white border border-[#DFD4BE] rounded-2xl p-8 sm:p-10 text-center shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-[#F3ECE0] border border-[#DFD4BE] flex items-center justify-center mx-auto mb-5">
              <Lock className="w-7 h-7 text-[#0E3B2C]" aria-hidden="true" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0E3B2C] mb-3">
              انتظامیہ پینل (ایڈمن لاگ ان)
            </h1>
            <p className="text-sm sm:text-base text-[#3D5247] leading-[2.0] mb-6">
              ادویات شامل کرنے، ترمیم کرنے یا حذف کرنے کے لیے اپنے مجاز گوگل اکاؤنٹ سے لاگ ان کریں۔
            </p>
            {authError && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-3 mb-5">
                {authError}
              </p>
            )}
            <button
              type="button"
              onClick={handleSignIn}
              className="w-full px-6 py-3.5 rounded-xl bg-[#0E3B2C] hover:bg-[#14533D] text-white text-base font-bold transition-colors cursor-pointer min-h-[48px]"
            >
              گوگل اکاؤنٹ سے لاگ ان کریں
            </button>
          </div>
        )}

        {!authLoading && user && !isAuthorizedAdmin && (
          <div className="max-w-lg mx-auto bg-white border border-[#DFD4BE] rounded-2xl p-8 text-center shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-5">
              <ShieldAlert className="w-7 h-7 text-red-700" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-bold text-[#0E3B2C] mb-3">رسائی کی اجازت نہیں</h1>
            <p className="text-sm sm:text-base text-[#3D5247] leading-[2.0] mb-6">
              اس اکاؤنٹ کو انتظامیہ پینل تک رسائی حاصل نہیں ہے۔ براہِ کرم مجاز ایڈمن اکاؤنٹ سے لاگ ان کریں۔
            </p>
            <button
              type="button"
              onClick={handleSignOut}
              className="px-6 py-3 rounded-xl bg-[#0E3B2C] hover:bg-[#14533D] text-white font-bold transition-colors cursor-pointer"
            >
              لاگ آؤٹ کریں
            </button>
          </div>
        )}

        {!authLoading && isAuthorizedAdmin && (
          <div className="space-y-10">
            {/* Admin Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DFD4BE]">
              <div>
                <h1 className="text-3xl font-bold text-[#0E3B2C]">انتظامیہ پینل</h1>
                <p className="text-sm text-[#4A5D52]">
                  اسحاق دواخانہ کی تمام ادویات کا انتظام اور فہرست
                </p>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#DFD4BE] bg-white hover:bg-[#F3ECE0] text-[#0E3B2C] text-sm font-semibold transition-colors cursor-pointer self-start sm:self-auto"
              >
                <LogOut className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>لاگ آؤٹ کریں</span>
              </button>
            </div>

            {/* Add / Edit Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-[#DFD4BE] rounded-2xl p-6 sm:p-8 shadow-sm space-y-5"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-[#0E3B2C]">
                  {editingId ? 'دوا کی معلومات میں ترمیم' : 'نئی دوا شامل کریں'}
                </h2>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-sm font-semibold text-[#8C6A2B] hover:text-[#0E3B2C] cursor-pointer"
                  >
                    منسوخ کریں
                  </button>
                )}
              </div>

              {statusMessage && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-medium">
                  {statusMessage}
                </div>
              )}

              {formError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-medium">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="admin-product-name"
                    className="block text-sm font-semibold text-[#0E3B2C] mb-1.5"
                  >
                    دوا کا نام
                  </label>
                  <input
                    id="admin-product-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثلاً: اکسیر سعال کیپسول"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DFD4BE] bg-[#FBF8F1] text-sm text-[#132A20] focus:outline-none focus:border-[#0E3B2C]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="admin-product-category"
                    className="block text-sm font-semibold text-[#0E3B2C] mb-1.5"
                  >
                    قسم منتخب کریں
                  </label>
                  <select
                    id="admin-product-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DFD4BE] bg-[#FBF8F1] text-sm text-[#132A20] focus:outline-none focus:border-[#0E3B2C]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="admin-product-image"
                    className="block text-sm font-semibold text-[#0E3B2C] mb-1.5"
                  >
                    تصویر کا انداز
                  </label>
                  <select
                    id="admin-product-image"
                    value={imageKey}
                    onChange={(e) => setImageKey(e.target.value as ProductImageKey)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DFD4BE] bg-[#FBF8F1] text-sm text-[#132A20] focus:outline-none focus:border-[#0E3B2C]"
                  >
                    {IMAGE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="admin-product-order"
                    className="block text-sm font-semibold text-[#0E3B2C] mb-1.5"
                  >
                    ترتیب نمبر (۱ سے ۱۰۰)
                  </label>
                  <input
                    id="admin-product-order"
                    type="number"
                    min={1}
                    max={100}
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DFD4BE] bg-[#FBF8F1] text-sm text-[#132A20] focus:outline-none focus:border-[#0E3B2C] tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="admin-product-image-url"
                  className="block text-sm font-semibold text-[#0E3B2C] mb-1.5"
                >
                  اپنی تصویر کا لنک (اختیاری)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    id="admin-product-image-url"
                    type="url"
                    dir="ltr"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#DFD4BE] bg-[#FBF8F1] text-sm text-[#132A20] focus:outline-none focus:border-[#0E3B2C]"
                  />
                  <img
                    src={resolveProductImage({ imageUrl, imageKey })}
                    alt="منتخب تصویر"
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover border border-[#DFD4BE] shrink-0"
                  />
                </div>
                <p className="text-xs text-[#4A5D52] mt-1">
                  اگر آپ اپنی تصویر کا لنک خالی چھوڑ دیں تو اوپر منتخب کردہ معیاری تصویر خودکار لگ جائے گی۔
                </p>
              </div>

              <div>
                <label
                  htmlFor="admin-product-desc"
                  className="block text-sm font-semibold text-[#0E3B2C] mb-1.5"
                >
                  دوا کے فوائد اور تفصیل
                </label>
                <textarea
                  id="admin-product-desc"
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="دوا کے استعمال اور فوائد لکھیں..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DFD4BE] bg-[#FBF8F1] text-sm text-[#132A20] focus:outline-none focus:border-[#0E3B2C]"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="admin-product-featured"
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 accent-[#0E3B2C] cursor-pointer"
                />
                <label
                  htmlFor="admin-product-featured"
                  className="text-sm font-medium text-[#2A4237] cursor-pointer"
                >
                  مرکزی صفحہ کی نمایاں مصنوعات میں دکھائیں
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0E3B2C] hover:bg-[#14533D] disabled:opacity-60 text-white text-sm sm:text-base font-bold transition-colors cursor-pointer min-h-[46px]"
                >
                  <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>
                    {submitting
                      ? 'محفوظ ہو رہا ہے...'
                      : editingId
                      ? 'تبدیلیاں محفوظ کریں'
                      : 'دوا شامل کریں'}
                  </span>
                </button>
              </div>
            </form>

            {/* Product List */}
            <div className="bg-white border border-[#DFD4BE] rounded-2xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 bg-[#F3ECE0] border-b border-[#DFD4BE]">
                <h2 className="text-lg font-bold text-[#0E3B2C]">
                  موجودہ مصنوعات (
                  {String(products.length).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])})
                </h2>
              </div>

              <div className="divide-y divide-[#EAE0CC]">
                {products.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={resolveProductImage(item)}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover border border-[#DFD4BE] shrink-0"
                      />
                      <div>
                        <div className="text-xs text-[#8C6A2B] font-semibold">
                          {item.category}
                          {item.featured ? ' · نمایاں' : ''}
                        </div>
                        <h3 className="text-base font-bold text-[#0E3B2C]">{item.name}</h3>
                        <p className="text-sm text-[#4A5D52]">{item.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(item)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#DFD4BE] bg-[#FBF8F1] hover:bg-[#F3ECE0] text-[#0E3B2C] text-xs font-semibold cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>ترمیم</span>
                      </button>

                      {confirmDeleteId === item.id ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="px-3 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold cursor-pointer"
                          >
                            یقینی حذف
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-3 py-2 rounded-xl border border-[#DFD4BE] text-xs text-[#4A5D52] cursor-pointer"
                          >
                            منسوخ
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(item.id)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-800 text-xs font-semibold cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>حذف</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

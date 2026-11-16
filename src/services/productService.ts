import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDocFromServer,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  type Unsubscribe,
} from 'firebase/firestore';
import { CANONICAL_PRODUCTS, type HerbalProduct } from '../data/catalogSeed';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';

const PRODUCTS_COLLECTION = 'products';
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export async function signInAdminWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export async function signInAdminWithRedirect() {
  return signInWithRedirect(auth, googleProvider);
}

export async function checkAdminRedirectResult() {
  return getRedirectResult(auth);
}

export async function signOutAdmin() {
  return signOut(auth);
}

export async function verifyAdminAccess(uid: string): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'admins', uid));
    return true;
  } catch {
    return false;
  }
}

export async function saveProduct(product: HerbalProduct, isNew: boolean): Promise<void> {
  const docPath = `${PRODUCTS_COLLECTION}/${product.id}`;
  const trimmedImageUrl = (product.imageUrl || '').trim().slice(0, 1000);
  const payload = {
    id: product.id,
    name: product.name.trim().slice(0, 120),
    description: product.description.trim().slice(0, 500),
    category: product.category,
    imageKey: product.imageKey,
    imageUrl: trimmedImageUrl,
    featured: Boolean(product.featured),
    sortOrder: Math.min(100, Math.max(1, Math.round(Number(product.sortOrder) || 1))),
  };

  try {
    if (isNew) {
      await setDoc(doc(db, PRODUCTS_COLLECTION, product.id), payload);
    } else {
      await updateDoc(doc(db, PRODUCTS_COLLECTION, product.id), {
        name: payload.name,
        description: payload.description,
        category: payload.category,
        imageKey: payload.imageKey,
        imageUrl: payload.imageUrl,
        featured: payload.featured,
        sortOrder: payload.sortOrder,
      });
    }
  } catch (error) {
    handleFirestoreError(
      error,
      isNew ? OperationType.CREATE : OperationType.UPDATE,
      docPath
    );
  }
}

export async function removeProduct(productId: string): Promise<void> {
  const docPath = `${PRODUCTS_COLLECTION}/${productId}`;
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, docPath);
  }
}

export async function ensureCatalogSeeded(): Promise<void> {
  let existingIds = new Set<string>();
  try {
    const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    existingIds = new Set(snapshot.docs.map((d) => d.id));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, PRODUCTS_COLLECTION);
  }

  const missingProducts = CANONICAL_PRODUCTS.filter((item) => !existingIds.has(item.id));
  if (missingProducts.length === 0) {
    return;
  }

  for (const product of missingProducts) {
    const docPath = `${PRODUCTS_COLLECTION}/${product.id}`;
    try {
      await setDoc(doc(db, PRODUCTS_COLLECTION, product.id), {
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        imageKey: product.imageKey,
        featured: product.featured,
        sortOrder: product.sortOrder,
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, docPath);
    }
  }
}

export function subscribeToProducts(
  onData: (products: HerbalProduct[]) => void,
  onError: (error: Error) => void
): Unsubscribe {
  const q = query(collection(db, PRODUCTS_COLLECTION), orderBy('sortOrder', 'asc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const items: HerbalProduct[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data() as HerbalProduct;
        return {
          id: data.id || docSnap.id,
          name: data.name,
          description: data.description,
          category: data.category,
          imageKey: data.imageKey,
          imageUrl: data.imageUrl || '',
          featured: Boolean(data.featured),
          sortOrder: Number(data.sortOrder) || 0,
        };
      });
      onData(items);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, PRODUCTS_COLLECTION);
      } catch (wrapped) {
        onError(wrapped instanceof Error ? wrapped : new Error(String(wrapped)));
      }
    }
  );
}

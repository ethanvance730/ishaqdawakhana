# Security Specification — اسحاق دواخانہ

## 1. Data Invariants
1. Every document in `/products/{productId}` must match the `Product` schema (`id`, `name`, `description`, `category`, `imageKey`, `featured`, `sortOrder`) with no shadow/extra fields.
2. `productId` must match `^[a-zA-Z0-9_-]+$` and `incoming().id == productId`.
3. Public storefront visitors may read (`get`, `list`) the non-PII herbal catalog and may idempotently seed only the 10 canonical catalog document IDs when they do not yet exist in Firestore.
4. Arbitrary `create`, `update`, and `delete` operations on `/products/{productId}` are strictly restricted to the verified admin (`ishaqstore405@gmail.com` with `email_verified == true`).
5. `id` is immutable on update (`incoming().id == existing().id`).

## 2. Adversarial Payloads (Dirty Dozen)
1. Shadow field injection on create: `{ ..., "price": 500, "isAdmin": true }` -> Rejected by `hasOnly`.
2. Non-canonical ID creation by unauthenticated user: `/products/fake-product-1` -> Rejected by `isCanonicalProductId`.
3. Overwriting existing canonical product via create: `/products/ikseer-saal-capsule` when already exists -> Rejected by `!exists(...)`.
4. Unauthenticated update on `/products/ikseer-saal-capsule` -> Rejected by `isAdmin()`.
5. Unauthenticated delete on `/products/ikseer-saal-capsule` -> Rejected by `isAdmin()`.
6. Spoofed admin email with `email_verified: false` -> Rejected by `email_verified == true`.
7. Oversized `name` (> 120 chars) or `description` (> 500 chars) -> Rejected by `.size()` checks.
8. Invalid `category` enum value (e.g. `"EnglishCategory"`) -> Rejected by enum check.
9. Invalid `imageKey` enum value (e.g. `"http://evil.com/x.jpg"`) -> Rejected by enum check.
10. Mismatched `data.id` vs `{productId}` path parameter -> Rejected by `incoming().id == productId`.
11. Mutating immutable `id` during admin update -> Rejected by `incoming().id == existing().id`.
12. Write to arbitrary unregistered collection `/users/attacker` -> Rejected by global deny-all catch-all.

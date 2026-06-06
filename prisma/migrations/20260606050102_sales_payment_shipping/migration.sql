-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "total" REAL NOT NULL DEFAULT 0,
    "couponId" TEXT,
    "paymentMethod" TEXT,
    "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "shippingStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "shippingName" TEXT,
    "shippingPhone" TEXT,
    "shippingZipCode" TEXT,
    "shippingState" TEXT,
    "shippingCity" TEXT,
    "shippingNeighborhood" TEXT,
    "shippingStreet" TEXT,
    "shippingNumber" TEXT,
    "shippingComplement" TEXT,
    "shippingCarrier" TEXT,
    "shippingTrackingCode" TEXT,
    "paidAt" DATETIME,
    "shippedAt" DATETIME,
    "deliveredAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("couponId", "createdAt", "customerId", "id", "status", "total", "updatedAt") SELECT "couponId", "createdAt", "customerId", "id", "status", "total", "updatedAt" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL DEFAULT 0,
    "imageUrl" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "stockQuantity" INTEGER NOT NULL DEFAULT 0,
    "categoryId" TEXT,
    "paymentMethod" TEXT,
    "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "shippingStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "shippingName" TEXT,
    "shippingPhone" TEXT,
    "shippingZipCode" TEXT,
    "shippingState" TEXT,
    "shippingCity" TEXT,
    "shippingNeighborhood" TEXT,
    "shippingStreet" TEXT,
    "shippingNumber" TEXT,
    "shippingComplement" TEXT,
    "shippingCarrier" TEXT,
    "shippingTrackingCode" TEXT,
    "paidAt" DATETIME,
    "shippedAt" DATETIME,
    "deliveredAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProductCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("active", "categoryId", "createdAt", "description", "featured", "id", "imageUrl", "name", "price", "slug", "stockQuantity", "updatedAt") SELECT "active", "categoryId", "createdAt", "description", "featured", "id", "imageUrl", "name", "price", "slug", "stockQuantity", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

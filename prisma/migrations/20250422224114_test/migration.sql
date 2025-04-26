/*
  Warnings:

  - You are about to drop the column `advancedHint` on the `Hint` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Hint` table. All the data in the column will be lost.
  - You are about to drop the column `intermediateHint` on the `Hint` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `Hint` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `Hint` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Level` table. All the data in the column will be lost.
  - Added the required column `sqlQuery` to the `Level` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "levelId" INTEGER NOT NULL,
    "pattern" TEXT NOT NULL,
    "basicHint" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Hint_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Hint" ("basicHint", "createdAt", "id", "levelId", "pattern", "updatedAt") SELECT "basicHint", "createdAt", "id", "levelId", "pattern", "updatedAt" FROM "Hint";
DROP TABLE "Hint";
ALTER TABLE "new_Hint" RENAME TO "Hint";
CREATE TABLE "new_Level" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sqlQuery" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Level" ("createdAt", "description", "id", "name", "updatedAt") SELECT "createdAt", "description", "id", "name", "updatedAt" FROM "Level";
DROP TABLE "Level";
ALTER TABLE "new_Level" RENAME TO "Level";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

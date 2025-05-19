/*
  Warnings:

  - Added the required column `level` to the `LevelProgress` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LevelProgress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL,
    CONSTRAINT "LevelProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LevelProgress" ("id", "score", "userId") SELECT "id", "score", "userId" FROM "LevelProgress";
DROP TABLE "LevelProgress";
ALTER TABLE "new_LevelProgress" RENAME TO "LevelProgress";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

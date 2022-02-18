/*
  Warnings:

  - Added the required column `name` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "beginsAt" DATETIME NOT NULL,
    "endsAt" DATETIME,
    "homeId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    CONSTRAINT "Event_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "Home" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Roommate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("beginsAt", "createdAt", "createdById", "description", "endsAt", "homeId", "id", "updatedAt") SELECT "beginsAt", "createdAt", "createdById", "description", "endsAt", "homeId", "id", "updatedAt" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE UNIQUE INDEX "Event_id_key" ON "Event"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

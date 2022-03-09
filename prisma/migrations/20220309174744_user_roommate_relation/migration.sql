-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Roommate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL,
    "homeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Roommate_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "Home" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Roommate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Roommate" ("homeId", "id", "role", "userId") SELECT "homeId", "id", "role", "userId" FROM "Roommate";
DROP TABLE "Roommate";
ALTER TABLE "new_Roommate" RENAME TO "Roommate";
CREATE UNIQUE INDEX "Roommate_id_key" ON "Roommate"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

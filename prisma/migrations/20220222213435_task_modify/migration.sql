-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "beginsAt" DATETIME NOT NULL,
    "frequency" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "completedBy" TEXT
);
INSERT INTO "new_Task" ("beginsAt", "complete", "completedBy", "createdAt", "description", "frequency", "id") SELECT "beginsAt", "complete", "completedBy", "createdAt", "description", "frequency", "id" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE UNIQUE INDEX "Task_id_key" ON "Task"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

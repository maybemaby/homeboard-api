-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
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

-- CreateIndex
CREATE UNIQUE INDEX "Event_id_key" ON "Event"("id");

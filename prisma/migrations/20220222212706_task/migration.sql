-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "beginsAt" DATETIME NOT NULL,
    "frequency" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL,
    "completedBy" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TasksOnRoommates" (
    "taskId" TEXT NOT NULL,
    "roommateId" TEXT NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("taskId", "roommateId"),
    CONSTRAINT "TasksOnRoommates_roommateId_fkey" FOREIGN KEY ("roommateId") REFERENCES "Roommate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TasksOnRoommates_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_id_key" ON "Task"("id");

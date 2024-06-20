-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "boardID" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_boardID_fkey" FOREIGN KEY ("boardID") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `authorId` to the `boards` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_boards" DROP CONSTRAINT "user_boards_boardId_fkey";

-- DropForeignKey
ALTER TABLE "user_boards" DROP CONSTRAINT "user_boards_userId_fkey";

-- AlterTable
ALTER TABLE "boards" ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "boards" ADD CONSTRAINT "boards_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_boards" ADD CONSTRAINT "user_boards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_boards" ADD CONSTRAINT "user_boards_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

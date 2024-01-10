-- DropForeignKey
ALTER TABLE "boards" DROP CONSTRAINT "boards_authorId_fkey";

-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_listId_fkey";

-- DropForeignKey
ALTER TABLE "lists" DROP CONSTRAINT "lists_boardId_fkey";

-- AddForeignKey
ALTER TABLE "boards" ADD CONSTRAINT "boards_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lists" ADD CONSTRAINT "lists_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

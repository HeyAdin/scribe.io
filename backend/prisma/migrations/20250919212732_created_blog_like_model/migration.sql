-- CreateTable
CREATE TABLE "public"."BlogLike" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "BlogLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogLike_blogId_userId_key" ON "public"."BlogLike"("blogId", "userId");

-- AddForeignKey
ALTER TABLE "public"."BlogLike" ADD CONSTRAINT "BlogLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BlogLike" ADD CONSTRAINT "BlogLike_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "public"."Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

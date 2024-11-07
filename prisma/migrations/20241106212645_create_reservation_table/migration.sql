-- CreateTable
CREATE TABLE "reservarions" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "accountId" UUID NOT NULL,
    "spaceId" UUID NOT NULL,

    CONSTRAINT "reservarions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reservarions" ADD CONSTRAINT "reservarions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservarions" ADD CONSTRAINT "reservarions_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

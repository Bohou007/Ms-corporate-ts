-- CreateTable
CREATE TABLE "Corporate" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "code_souscripteur" TEXT NOT NULL,
    "country_code" VARCHAR(10) NOT NULL,
    "is_enable" BOOLEAN NOT NULL DEFAULT true,
    "disabledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Corporate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApprouveProducts" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "product_code_core" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_code" TEXT,
    "is_enable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "corporateId" INTEGER,

    CONSTRAINT "ApprouveProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role_code" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "token" TEXT,
    "is_password_updated" BOOLEAN,
    "is_enable" BOOLEAN NOT NULL DEFAULT true,
    "is_already_signup" BOOLEAN,
    "login_attempts" INTEGER,
    "login_attempt_time" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "corporateId" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataSituations" (
    "id" SERIAL NOT NULL,
    "exercice" TEXT NOT NULL,
    "police" TEXT NOT NULL,
    "typeCompte" TEXT NOT NULL,
    "soldePrec" TEXT NOT NULL,
    "pbPrec" TEXT NOT NULL,
    "cotiExo" TEXT NOT NULL,
    "rachExo" TEXT NOT NULL,
    "soldeExo" TEXT NOT NULL,
    "pbExo" TEXT NOT NULL,
    "intg" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "corporateId" INTEGER,
    "tauxId" INTEGER,
    "approuveProductsId" INTEGER,

    CONSTRAINT "DataSituations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Taux" (
    "id" SERIAL NOT NULL,
    "exercice" TEXT NOT NULL,
    "produit" TEXT NOT NULL,
    "tauxUA" TEXT NOT NULL,
    "tauxAXA" TEXT NOT NULL,
    "tauxRevalo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "corporateId" INTEGER,
    "approuveProductsId" INTEGER,

    CONSTRAINT "Taux_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Corporate_uuid_key" ON "Corporate"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "ApprouveProducts_uuid_key" ON "ApprouveProducts"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Users_uuid_key" ON "Users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_token_key" ON "Users"("token");

-- AddForeignKey
ALTER TABLE "ApprouveProducts" ADD CONSTRAINT "ApprouveProducts_corporateId_fkey" FOREIGN KEY ("corporateId") REFERENCES "Corporate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_corporateId_fkey" FOREIGN KEY ("corporateId") REFERENCES "Corporate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataSituations" ADD CONSTRAINT "DataSituations_corporateId_fkey" FOREIGN KEY ("corporateId") REFERENCES "Corporate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataSituations" ADD CONSTRAINT "DataSituations_tauxId_fkey" FOREIGN KEY ("tauxId") REFERENCES "Taux"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataSituations" ADD CONSTRAINT "DataSituations_approuveProductsId_fkey" FOREIGN KEY ("approuveProductsId") REFERENCES "ApprouveProducts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Taux" ADD CONSTRAINT "Taux_corporateId_fkey" FOREIGN KEY ("corporateId") REFERENCES "Corporate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Taux" ADD CONSTRAINT "Taux_approuveProductsId_fkey" FOREIGN KEY ("approuveProductsId") REFERENCES "ApprouveProducts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

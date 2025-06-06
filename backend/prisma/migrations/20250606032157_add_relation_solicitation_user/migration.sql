/*
  Warnings:

  - Added the required column `solicitanteId` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Solicitacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipoSolicitacao" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "solicitanteId" INTEGER NOT NULL,
    "nomeSolicitante" TEXT NOT NULL,
    "cpfSolicitante" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    CONSTRAINT "Solicitacao_solicitanteId_fkey" FOREIGN KEY ("solicitanteId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Solicitacao" ("cpfSolicitante", "descricao", "endereco", "id", "nomeSolicitante", "status", "tipoSolicitacao") SELECT "cpfSolicitante", "descricao", "endereco", "id", "nomeSolicitante", "status", "tipoSolicitacao" FROM "Solicitacao";
DROP TABLE "Solicitacao";
ALTER TABLE "new_Solicitacao" RENAME TO "Solicitacao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

export class tauxDto {
  Exercice: string;
  Produit: string;
  TauxUA: string;
  TauxAXA: string;
  TauxRevalo: string;
}
export interface Taux {
  data: tauxDto[];
}

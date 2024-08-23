export interface Category {
  id:number;
  name: string;
  description: string | null;
}

export interface CategoryMutation {
  name: string;
  description: string | null;
}
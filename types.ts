export interface Category {
  id:number;
  name: string;
  description: string | null;
}

export interface CategoryMutation {
  name: string;
  description: string | null;
}

export interface Place {
  id:number;
  name: string;
  description: string | null;
}

export interface PlaceMutation {
  name: string;
  description: string | null;
}

export interface Item {
  id: number;
  category_id: number;
  place_id: number;
  name: string;
  description: string;
  image: string | null;
  created_at: string;
}

export interface ItemMutation {
  category_id: number;
  place_id: number;
  name: string;
  description: string;
  image: string | null;
}
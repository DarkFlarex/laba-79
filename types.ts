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

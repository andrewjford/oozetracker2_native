export interface CategoryState {
  displayCategoryInput: boolean;
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
}

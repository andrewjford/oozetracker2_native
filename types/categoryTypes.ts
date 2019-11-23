export interface CategoryState {
  displayCategoryInput: boolean;
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
}

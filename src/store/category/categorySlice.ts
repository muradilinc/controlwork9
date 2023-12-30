import {Category, ResponseCategory} from '../../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createCategory, deleteCategory, getCategories, getCategory, updateCategory} from './categoryThunk';
import {RootState} from '../../redux/store';

interface CategoryState {
  categories: ResponseCategory[],
  singleCategory: Category | null;
  createCategoryLoading: boolean;
  getCategoriesLoading: boolean;
  getSingleCategoryLoading: boolean;
  updateCategoryLoading: boolean;
  deleteCategoryLoading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  singleCategory: null,
  createCategoryLoading: false,
  getCategoriesLoading: false,
  getSingleCategoryLoading: false,
  updateCategoryLoading: false,
  deleteCategoryLoading: false,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCategory.pending, (state) => {
      state.createCategoryLoading = true;
    });
    builder.addCase(createCategory.fulfilled, (state) => {
      state.createCategoryLoading = false;
    });
    builder.addCase(createCategory.rejected, (state) => {
      state.createCategoryLoading = false;
    });
    builder.addCase(getCategories.pending, (state) => {
      state.getCategoriesLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, {payload: categories}: PayloadAction<ResponseCategory[]>) => {
      state.getCategoriesLoading = false;
      state.categories = categories;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.getCategoriesLoading = false;
    });
    builder.addCase(getCategory.pending, (state) => {
      state.getSingleCategoryLoading = true;
    });
    builder.addCase(getCategory.fulfilled, (state, {payload: category}: PayloadAction<Category>) => {
      state.getSingleCategoryLoading = false;
      state.singleCategory = category;
    });
    builder.addCase(getCategory.rejected, (state) => {
      state.getSingleCategoryLoading = false;
    });
    builder.addCase(updateCategory.pending, (state) => {
      state.updateCategoryLoading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state) => {
      state.updateCategoryLoading = false;
    });
    builder.addCase(updateCategory.rejected, (state) => {
      state.updateCategoryLoading = false;
    });
    builder.addCase(deleteCategory.pending, (state) => {
      state.deleteCategoryLoading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state) => {
      state.deleteCategoryLoading = false;
    });
    builder.addCase(deleteCategory.rejected, (state) => {
      state.deleteCategoryLoading = false;
    });
  },
});

export const categoryReducer = categorySlice.reducer;
export const selectCategories = (state: RootState) => state.category.categories;
export const selectCategory = (state: RootState) => state.category.singleCategory;
export const selectCreateCategoryLoading = (state: RootState) => state.category.createCategoryLoading;
export const selectGetCategoriesLoading = (state: RootState) => state.category.getCategoriesLoading;
export const selectGetCategoryLoading = (state: RootState) => state.category.getSingleCategoryLoading;
export const selectUpdateCategoryLoading = (state: RootState) => state.category.updateCategoryLoading;
export const selectDeleteCategoryLoading = (state: RootState) => state.category.deleteCategoryLoading;
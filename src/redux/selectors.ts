import { RootState } from "./store"

export const loadingSelector = (state: RootState) => {
  if(state.app.loading)  return true;
  return false;
}

export const selectCategories = (state: RootState) => {
  if(state.app.categories) return state.app.categories;
  return [];
}

export const selectLimit = (state: RootState) => {
  if(state.app.limit) return state.app.limit;
  return 10;
}
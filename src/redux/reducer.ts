import { AppAction, AppState, initialState } from './store';

export const rootReducer = (state: AppState = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload, error: null };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'CATEGORIES':
      return { ...state, loading: false, categories: action.payload, error: null };
    case 'IMAGES':
      return { ...state, loading: false, images: action.payload, error: null };
    case 'LIMIT':
      return { ...state, loading: false, limit: action.payload, error: null };
    case 'SET_CATEGORY_ID':
      return { ...state, loading: false, categoryId: action.payload, error: null };
    case 'IMAGES_ADD':
      return { ...state, loading: false, images: [...state.images, ...action.payload], error: null };
    default:
      return state;
  }
};
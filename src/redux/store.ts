import { createStore, applyMiddleware, combineReducers, Middleware } from 'redux';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import thunk, { ThunkAction, ThunkMiddleware } from 'redux-thunk';
import { Action } from 'redux';
import { rootReducer } from './reducer';

export interface AppState {
  data: any | null;
  loading: boolean;
  error: string | null;
  categories: {
    id: number;
    name: string;
  }[];
  images: any[];
  limit: number;
  categoryId: number;
}

export interface AppAction {
  payload: any;
  type: string;
}

export const initialState: AppState = {
  data: null,
  categories: [],
  images: [],
  loading: false,
  error: null,
  limit: 10,
  categoryId: 0
};

const rootReducerWithTypes = combineReducers({ 
  app: rootReducer
});

const middleware: Array<Middleware> = [thunk as ThunkMiddleware<AppState, AppAction>];

export const store = createStore(rootReducerWithTypes, applyMiddleware(...middleware));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
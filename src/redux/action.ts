import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from './store';

enum ActionTypes {
  FETCH_REQUEST = 'FETCH_REQUEST',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_FAILURE = 'FETCH_FAILURE',
  CATEGORIES = 'CATEGORIES',
  IMAGES = 'IMAGES',
  SET_CATEGORY_ID = 'SET_CATEGORY_ID',
  IMAGES_ADD = 'IMAGES_ADD'
}

interface FetchRequestAction {
  type: ActionTypes.FETCH_REQUEST;
}

interface FetchSuccessAction {
  type: ActionTypes.CATEGORIES | ActionTypes.IMAGES_ADD | ActionTypes.FETCH_SUCCESS | ActionTypes.IMAGES | ActionTypes.SET_CATEGORY_ID;
  payload: any;
}

interface FetchFailureAction {
  type: ActionTypes.FETCH_FAILURE;
  payload: string;
}

type AppAction = FetchRequestAction | FetchSuccessAction | FetchFailureAction;

export const getCatgories = (): any => {
  return async (dispatch: ThunkDispatch<RootState, unknown, AppAction>, getState: () => RootState) => {
    try {
      dispatch({ type: ActionTypes.FETCH_REQUEST, payload: true });

      const response = await axios.get('https://api.thecatapi.com/v1/categories');
      
      dispatch({ type: ActionTypes.CATEGORIES, payload: response.data });
      dispatch({ type: ActionTypes.FETCH_SUCCESS, payload: false });
    } catch (error: any) {
      dispatch({ type: ActionTypes.FETCH_FAILURE, payload: error.message});
    }
  };
};

export const getImages = (): any => {
  return async (dispatch: ThunkDispatch<RootState, unknown, AppAction>, getState: () => RootState) => {
    try {
      dispatch({ type: ActionTypes.FETCH_REQUEST, payload: true });
      
      const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=10`);
      
      dispatch({ type: ActionTypes.IMAGES, payload: response.data });
      dispatch({ type: ActionTypes.FETCH_SUCCESS, payload: false });
    } catch (error: any) {
      dispatch({ type: ActionTypes.FETCH_FAILURE, payload: error.message});
    }
  };
};

export const setImagesLimit = (limit: number): any => {
  return async (dispatch: ThunkDispatch<RootState, unknown, AppAction>, getState: () => RootState) => {
    try {
      const categoryId = getState().app.categoryId;
      
      const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${limit}&page=1&category_ids=${categoryId || 1}`);
      dispatch({ type: ActionTypes.IMAGES_ADD, payload: response.data });
    } catch (error: any) {
    }
  };
};
export const getImagesByCatgory = (categoryId: number): any => {
  return async (dispatch: ThunkDispatch<RootState, unknown, AppAction>, getState: () => RootState) => {
    try {
      dispatch({ type: ActionTypes.FETCH_REQUEST, payload: true });
      const limit = getState().app.limit;
      const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${limit}&page=1&category_ids=${categoryId || 1}`);
      
      dispatch({ type: ActionTypes.IMAGES, payload: response.data });
      dispatch({ type: ActionTypes.SET_CATEGORY_ID, payload: categoryId });
      dispatch({ type: ActionTypes.FETCH_SUCCESS, payload: false });
    } catch (error: any) {
      dispatch({ type: ActionTypes.FETCH_FAILURE, payload: error.message});
    }
  };
};
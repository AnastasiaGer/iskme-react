import { combineReducers, configureStore } from '@reduxjs/toolkit';
import collectionReducer from 'widgets/CollectionList/model/slice/CollectionSlice';
import collectionsByMicrositeReducer from 'widgets/MicrositeCollectionList/model/slice/CollectionSlice';
import resourcesReducer from 'widgets/ResourcesList/model/slice/ResourcesSlice';
import collectionDetailsReducer from 'pages/CollectionDetails/model/slice/CollectionDetailsSlice';

const rootReducer = combineReducers({
  collectionReducer,
  collectionsByMicrositeReducer,
  resourcesReducer,
  collectionDetailsReducer
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

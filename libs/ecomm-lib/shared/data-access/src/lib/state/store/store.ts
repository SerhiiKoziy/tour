import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { progressSlice } from '../slices/progressSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { NextPageContext } from 'next';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  progress: progressSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// TODO check how to type AppState and AppDispatch types to delete the const store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const makeStore = () => {
  /*let reducer;
  if (isServer) {
    reducer = rootReducer;
  } else {
    reducer = persistedReducer;
  }


  const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  // Creating the store again
  // TODO why do we need this to have this store working? But this enables to have the first state rendered and then the client state
  // retrieved and rendered without using dynamic imports :D (although we should use it if we do not need the component rendered and server side)
  store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature
*/

  if (typeof window === 'undefined') {
    //If it's on server side, create a store
    return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });
  } else {
    const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });
    // Creating the store again
    // TODO why do we need this to have this store working? But this enables to have the first state rendered and then the client state
    // retrieved and rendered without using dynamic imports :D (although we should use it if we do not need the component rendered and server side)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
};

export const persistor = persistStore(store);

// TODO check how to type AppState and AppDispatch types to delete the const store
// export type AppStore = ReturnType<typeof makeStore>;
// export type AppState = ReturnType<typeof store.getState>;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch; // ReturnType<AppStore['dispatch']>; //typeof store.dispatch;

export const wrapper = createWrapper<AppStore>(makeStore);

// TODO this should be in another file/place
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

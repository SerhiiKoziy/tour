import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { REHYDRATE } from 'redux-persist';
import { fetchFavourite } from '../../services/destinations-service';
import { AppState } from '../store/store';

/**
 * Notes:
 * - WARNING: we should not use the store in the server side, in this way we will avoid many headaches,
 * but in case it is needed, this is an example about how to do it
 */

// TODO this can be in the utils lib
export type Favourite = number;

export const fetchFavouriteThunk = createAsyncThunk(
  'progress/fetchFavourite',
  async (note: number) => {
    const response = await fetchFavourite(note);
    return response;
  }
);

const hydrate = createAction<AppState>(HYDRATE);
const rehydrate = createAction<AppState>(REHYDRATE);

// TODO this needs some TS typing
export const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    // TODO this might need some TS typing
    settingsModalOpen: false,
    status: 'idle',
    rehydrated: false,
    client: {
      favouriteNotes: [],
    },
    server: {
      favouriteNotes: [],
    },
  },
  reducers: {
    addClientFavourite: (state, action) => {
      state.client.favouriteNotes.push(action.payload);
    },
    // WARNING: we should not use the store in the server side, in this way we will avoid many headaches,
    // but in case it is needed, this is an example about how to do it
    addServerFavourite: (state, action) => {
      state.server.favouriteNotes.push(action.payload);
    },
    toggleSettingsModal: (state) => {
      state.settingsModalOpen = !state.settingsModalOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavouriteThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavouriteThunk.fulfilled, (state, action) => {
        state.status = 'idle';
        state.client.favouriteNotes.push(action.payload); // TODO this is the same function as addClientFavourite, check if this can be refactored
      })
      .addCase(hydrate, (state, action) => {
        state.server = action.payload['progress'].server;
      })
      .addCase(rehydrate, (state, action) => {
        // IMPORTANT if you are able to pass the result of the actions dispatched through props instead of
        // consuming the data from the store, please do this instead of using this approach, but in case we need to
        // share data retrieved from the server rendering in multiple components this is a working example

        // NOTE: if we want to re-render the page with the state from the server to be sure we render the
        // data coming from the server, we can use a dedicated property for this, but we need to be aware because
        // this will cause re-rendering, and this might impact the performance
        // This is because the client gets an empty store with the selectors sometimes (async code)
        // we can implement also the PersistGate for a page that is using a server store, but this would be SEO penalized
        // or I guess so. There are other alternatives to load the incoming state as the initialState, but let's implement it
        // if it is needed

        // NOTE 2: after some testing, it seems the page is not loaded until this case is executed

        // TODO: check with a tool how many times the ssr-state page is re-rendered

        // WARNING: I feel this following code very hacky, but after spending some hours debugging, the client store is re-written by something
        // with the initial state, and if we do not use the state.rehydrated = true approach (mentioned above),
        // the server state is not passed to the client store (but the client store is), I decided to "merge/reconciliate" the state in this way.
        // Also, this REHYDRATE action is dispatched twice, and in the second time, the action.payload variable has the client store from the
        // localStorage always

        // TODO if you find a better way to implement this, please make the changes needed
        if (action.payload) {
          state = {
            ...action.payload['progress'],
            server: state.server,
          };
        }

        // I don't know why I have to return the state in this case, but the code does not work as expected if I don't do it
        return state;
      });
  },
});

export const { addClientFavourite, addServerFavourite, toggleSettingsModal } =
  progressSlice.actions;

// WARNING: the function within selectors has to be non-expensive to run because
// this will be running to detect changes, according to the React-Redux docs
export const selectProgressNotes = (state: AppState) => {
  const server = state?.[progressSlice.name].server?.favouriteNotes ?? [];
  const client = state?.[progressSlice.name].client?.favouriteNotes ?? [];
  return [...server, ...client];
};
export const selectProgressModal = (state: AppState) =>
  state?.[progressSlice.name].settingsModalOpen;

export default progressSlice;

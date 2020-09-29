// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel(state, { payload }) {
      const { attributes } = payload;
      state.push(attributes);
    },
    deleteChannel(state, { payload }) {
      const { id } = payload;
      return state.filter((c) => c.id !== id);
    },
    renameChannel(state, { payload }) {
      const { attributes } = payload;
      const channel = state.find((c) => c.id === attributes.id);
      channel.name = attributes.name;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;

// @ts-check

import { createSlice } from '@reduxjs/toolkit';

import { actions as channelsActions } from './channels';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, { payload }) {
      const { attributes } = payload;
      state.push(attributes);
    },
  },
  extraReducers: {
    [channelsActions.deleteChannel.type](state, { payload }) {
      const { id } = payload;
      return state.filter((m) => m.channelId !== id);
    },
  },
});

export const { actions } = slice;
export default slice.reducer;

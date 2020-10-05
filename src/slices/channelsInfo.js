// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const defaultChannelId = 1;

const slice = createSlice({
  name: 'channelsInfo',
  initialState: { channels: [], currentChannelId: defaultChannelId },
  reducers: {
    addChannel(state, { payload }) {
      const { attributes } = payload;
      state.channels.push(attributes);
    },
    deleteChannel(state, { payload }) {
      const { id } = payload;
      const channels = state.channels.filter((c) => c.id !== id);
      const currentChannelId = id === state.currentChannelId
        ? defaultChannelId
        : state.currentChannelId;
      return { channels, currentChannelId };
    },
    renameChannel(state, { payload }) {
      const { attributes } = payload;
      const channel = state.channels.find((c) => c.id === attributes.id);
      channel.name = attributes.name;
    },
    switchChannel: (state, { payload }) => ({ ...state, currentChannelId: payload }),
  },
});

export const { actions } = slice;
export default slice.reducer;

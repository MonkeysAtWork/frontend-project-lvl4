// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'currentChannelId',
  initialState: null,
  reducers: {
    switchChannel: (state, { payload }) => (payload),
  },
});

export const { actions } = slice;
export default slice.reducer;

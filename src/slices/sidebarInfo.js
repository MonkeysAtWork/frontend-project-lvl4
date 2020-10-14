// @ts-check

import { createSlice } from '@reduxjs/toolkit';

import { actions as channelsActions } from './channelsInfo';

const slice = createSlice({
  name: 'sidebarInfo',
  initialState: { open: false },
  reducers: {
    toggleSidebarState: (state) => ({ open: !state.open }),
  },
  extraReducers: {
    [channelsActions.switchChannel.type]: () => ({ open: false }),
  },
});

export const { actions } = slice;
export default slice.reducer;

// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channelsUIState',
  initialState: { focusedButtonId: null },
  reducers: {
    showActionButtins: (state, { payload }) => (payload),
    hideActionButtins: () => ({ focusedButtonId: null }),
  },
});

export const { actions } = slice;
export default slice.reducer;

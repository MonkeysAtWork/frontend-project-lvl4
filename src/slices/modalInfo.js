// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modalInfo',
  initialState: { open: false, type: null, item: null },
  reducers: {
    openModal: (state, { payload }) => ({ ...state, open: true, ...payload }),
    closeModal: () => ({ open: false, type: null, item: null }),
  },
});

export const { actions } = slice;
export default slice.reducer;

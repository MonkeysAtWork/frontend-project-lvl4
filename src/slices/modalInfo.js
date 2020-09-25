// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modalInfo',
  initialState: { open: false, type: null },
  reducers: {
    openModal: (state, { payload }) => ({ open: true, ...payload }),
    closeModal: () => ({ open: false, type: null }),
  },
});

export const { actions } = slice;
export default slice.reducer;

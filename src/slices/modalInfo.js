// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modalInfo',
  initialState: { open: false, type: 'none' },
  reducers: {
    openModal: (state, { payload }) => ({ open: true, ...payload }),
    closeModal: () => ({ open: false, type: 'none' }),
  },
});

export const { actions } = slice;
export default slice.reducer;

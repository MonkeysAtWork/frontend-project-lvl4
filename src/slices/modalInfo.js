// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modalInfo',
  initialState: { type: 'none' },
  reducers: {
    openModal: (state, { payload }) => (payload),
    closeModal: () => ({ type: 'none' }),
  },
});

export const { actions } = slice;
export default slice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export interface TData {
  key: string;
  id: string;
  status: 'active' | 'archive';
  sum: number;
  qty: number;
  volume: number;
  name: string;
  delivery_date: string;
  currency: string;
}

interface IDataSlice {
  documents: TData[];
  activeCheckbox: null | string;
  resultActiveBoxes: string[];
  findItem: number;
  choosenAllCheckboxes: boolean;
}

const initialState: IDataSlice = {
  documents: [
    {
      key: '0',
      id: '0',
      status: 'archive',
      sum: 1000,
      qty: 15,
      volume: 20,
      name: 'first',
      delivery_date: '2021, 11, 20',
      currency: 'rub',
    },
    {
      key: '1',
      id: '1',
      status: 'active',
      sum: 3520,
      qty: 5,
      volume: 4,
      name: 'second',
      delivery_date: '2022, 11, 20',
      currency: 'rub',
    },
  ],
  activeCheckbox: null,
  resultActiveBoxes: [],
  findItem: -1,
  choosenAllCheckboxes: false,
};

export const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    onClickSelectBox(state, action) {
      state.activeCheckbox = action.payload;
      if (state.activeCheckbox !== null) {
        state.findItem = state.resultActiveBoxes.indexOf(state.activeCheckbox);
      }

      if (state.findItem === -1 && state.activeCheckbox !== null) {
        state.resultActiveBoxes.push(state.activeCheckbox);
      } else {
        state.resultActiveBoxes = state.resultActiveBoxes.slice(state.findItem + 1);
      }
    },
    onClickAllCheckBoxes(state, action) {
      state.choosenAllCheckboxes = action.payload;
    },
  },
});

export const { onClickSelectBox, onClickAllCheckBoxes } = fetchSlice.actions;

export default fetchSlice.reducer;

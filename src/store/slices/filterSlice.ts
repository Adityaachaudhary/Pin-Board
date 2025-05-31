
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchText: string;
  selectedTags: string[];
}

const initialState: FilterState = {
  searchText: '',
  selectedTags: [],
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    toggleTag: (state, action: PayloadAction<string>) => {
      const tagIndex = state.selectedTags.indexOf(action.payload);
      if (tagIndex > -1) {
        state.selectedTags.splice(tagIndex, 1);
      } else {
        state.selectedTags.push(action.payload);
      }
    },
    clearFilters: (state) => {
      state.searchText = '';
      state.selectedTags = [];
    },
  },
});

export const { setSearchText, toggleTag, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;

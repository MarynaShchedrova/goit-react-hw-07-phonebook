import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        filter: '',
    },
    reducers: {
        setFilter(state, action) {
            state.filter = action.payload;
        },
    },
});

export const { setFilter } = filterSlice.actions;
// export const getFilter = state => state.filter.value;
// export const filterReduser = filterSlice.reducer;
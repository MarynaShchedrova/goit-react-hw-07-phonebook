import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://648ee68175a96b66444471f2.mockapi.io';

export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/contacts/contacts');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async ({ name, phone }, thunkAPI) => {
        try {
            const response = await axios.post('/contacts/contacts', { name, phone });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`/contacts/contacts/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const handlePending = state => {
    state.isLoading = true;
};
const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    extraReducers: {
        [fetchContacts.pending]: handlePending,
        [addContact.pending]: handlePending,
        [deleteContact.pending]: handlePending,
        [fetchContacts.rejected]: handleRejected,
        [addContact.rejected]: handleRejected,
        [deleteContact.rejected]: handleRejected,
        [fetchContacts.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items = action.payload;
        },
        [addContact.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items.push(action.payload);
        },
        [deleteContact.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            const index = state.items.findIndex(
                contact => contact.id === action.payload.id
            );
            state.items.splice(index, 1);
        },
    },
});

export const contactsReducer = contactsSlice.reducer;
export const getContacts = state => state.contacts.items;
export const getIsLoading = state => state.contacts.isLoading;
export const getError = state => state.contacts.error;
export const getFilter = state => state.filter.filter;


// export const contactsApi = createApi({
//     reducerPath: 'contacts',
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'https://648ee68175a96b66444471f2.mockapi.io/contacts/',
//     }),
//     tagTypes: ['contacts'],
//     endpoints: builder => ({
//         getContacts: builder.query({
//             query: () => `/contacts`,
//             providesTags: ['contacts'],
//         }),

//         deleteContact: builder.mutation({
//             query: id => ({
//                 url: `/contacts/${id}`,
//                 method: 'DELETE',
//             }),
//             invalidatesTags: ['contacts'],
//         }),

//         addContact: builder.mutation({
//             query: values => ({
//                 url: `/contacts`,
//                 method: 'POST',
//                 body: values,
//             }),
//             invalidatesTags: ['contacts'],
//         }),
//     }),
// });

// export const {
//     useGetContactsQuery,
//     useDeleteContactMutation,
//     useAddContactMutation,
// } = contactsApi;
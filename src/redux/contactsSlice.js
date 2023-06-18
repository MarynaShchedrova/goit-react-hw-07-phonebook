import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
    reducerPath: 'contacts',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://648ee68175a96b66444471f2.mockapi.io/contacts/contacts',
    }),
    tagTypes: ['contacts'],
    endpoints: builder => ({
        getContacts: builder.query({
            query: () => `/contacts`,
            providesTags: ['contacts'],
        }),

        deleteContact: builder.mutation({
            query: id => ({
                url: `/contacts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['contacts'],
        }),

        addContact: builder.mutation({
            query: values => ({
                url: `/contacts`,
                method: 'POST',
                body: values,
            }),
            invalidatesTags: ['contacts'],
        }),
    }),
});

export const {
    useGetContactsQuery,
    useDeleteContactMutation,
    useAddContactMutation,
} = contactsApi;
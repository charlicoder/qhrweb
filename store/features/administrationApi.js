// src/features/api/apiSlice.js (or wherever you manage your API slices)
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define your API base URL from environment variables
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/administration/api';

export const administrationApi = createApi({
    reducerPath: 'administrationApi', // A unique key for the reducer
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE,
        // Configure credentials if needed (e.g., for cookies)
        prepareHeaders: (headers, { getState }) => {
            // You might add common headers here, like Authorization tokens
            // Example:
            // const token = getState().auth.token;
            // if (token) {
            //   headers.set('Authorization', `Bearer ${token}`);
            // }
            headers.set('Accept', 'application/json');

            // Handling CSRF tokens is often done via cookies, fetchBaseQuery
            // might handle it if your backend sends the correct headers/cookies.
            // If not, you might need to add it here or handle it manually in mutations.
            return headers;
        },
        // For credentials like cookies, fetchBaseQuery usually picks them up
        // if the backend is configured to send them and the request is made
        // with the same-origin policy in mind or CORS is configured for it.
        // If you encounter issues, you might need to configure `fetch` options.
    }),
    tagTypes: ['BankBranches', 'Banks', 'BankBranches'], // Define tag types for caching
    endpoints: (builder) => ({
        // Define your query endpoint
        getCompanyBranch: builder.query({
            query: () => '/company-branch/1/', // Assuming '1' is a fixed ID for the company branch
            providesTags: ['CompanyBranch'], // Tag for company branch data
        }),

        // Get List of Banks
        getBanks: builder.query({
            query: () => '/banks/',
            providesTags: ['Banks'], // Tag for banks list
            transformResponse: (response) => Array.isArray(response) ? response : [], // Ensure it's an array
        }),

        getBankBranches: builder.query({
            query: (bankId) => ({
                url: '/bank-branches/',
                method: 'GET',
                params: { bankId }, // This will be appended as ?bankId=...
                // credentials: 'include' // fetchBaseQuery handles credentials based on baseQuery config
            }),
            // Define how to transform the response if needed
            transformResponse: (response, meta, arg) => {
                // Ensure response is an array, otherwise return an empty array
                return Array.isArray(response) ? response : [];
            },
            // Define cache tags for invalidation
            providesTags: (result, error, arg) => {
                // 'result' is the data returned from the query
                // 'arg' is the argument passed to the query (bankId in this case)
                return arg ? [{ type: 'BankBranches', id: arg }] : ['BankBranches'];
            },
        }),

        // Add other endpoints here...
    }),
});

// Export the auto-generated hook for the getBankBranches query
export const {
    useGetCompanyBranchQuery,
    useGetBanksQuery,
    useGetBankBranchesQuery,
} = administrationApi;

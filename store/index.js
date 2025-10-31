import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { administrationApi } from "@/store/features/administrationApi";

export const store = configureStore({
    reducer: {
        [administrationApi.reducerPath]: administrationApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", 'persist/REHYDRATE',],
            },
        }).concat(administrationApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);
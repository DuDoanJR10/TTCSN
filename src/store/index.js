import authSlice from "../pages/Auth/store/authSlice";
import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import categorySlice from "../pages/Category/store/categorySlice";
import accountSlice from "../pages/Account/store/accountSlice";
import suppliesSlice from "../pages/Supplies/store/suppliesSlice";
import roomSlice from "../pages/Room/store/roomSlice";
import staffSlice from '../pages/Staff/store/staffSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['supplies', 'category', 'account', 'room', 'staff']
}

const suppliesPersistConfig = {
    key: 'supplies',
    storage: storage,
    blacklist: ['modalAdd', 'modalUpdate', 'modalView', 'listSuppliesExport', 'listSuppliesImport']
}

const categoryPersistConfig = {
    key: 'category',
    storage: storage,
    blacklist: ['modalAdd', 'modalUpdate']
}

const accountPersistConfig = {
    key: 'account',
    storage: storage,
    blacklist: ['modalAdd', 'modalUpdate']
}

const roomPersistConfig = {
    key: 'room',
    storage: storage,
    blacklist: ['modalAdd', 'modalUpdate']
}

const staffPersistConfig = {
    key: 'staff',
    storage: storage,
    blacklist: ['modalAdd', 'modalUpdate']
}

const rootReducer = combineReducers({
    auth: authSlice,
    category: persistReducer(categoryPersistConfig, categorySlice),
    account: persistReducer(accountPersistConfig, accountSlice),
    supplies: persistReducer(suppliesPersistConfig, suppliesSlice),
    room: persistReducer(roomPersistConfig, roomSlice),
    staff: persistReducer(staffPersistConfig, staffSlice),
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);
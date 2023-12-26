import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        listAccounts: [],
        loading: false,
        modalAdd: {
            open: false,
        }, 
        modalUpdate: {
            open: false,
            id: '',
            username: '',
            password: '',
            phone: '',
            address: '',
            role: ''
        }
    },
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setListAccounts(state, action) {
            state.listAccounts = action.payload;
        },
        setModalAdd(state, action) {
            state.modalAdd = action.payload;
        },
        setModalUpdate(state, action) {
            state.modalUpdate = action.payload;
        }
    }
})

export const {
    setLoading,
    setListAccounts,
    setModalAdd,
    setModalUpdate
} = accountSlice.actions;

export default accountSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        loading: false,
        listCategories: [],
        modalAdd: {
            open: false,
        },
        modalUpdate: {
            open: false,
            id: '',
            name: '',
            description: '',
        }
    },
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setListCategories(state, action) {
            state.listCategories = action.payload;
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
    setListCategories,
    setModalAdd,
    setModalUpdate
} = categorySlice.actions;

export default categorySlice.reducer;

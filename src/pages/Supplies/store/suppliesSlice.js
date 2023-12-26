import { createSlice } from '@reduxjs/toolkit';

const suppliesSlice = createSlice({
    name: 'supplies',
    initialState: {
        loading: false,
        listSupplies: [],
        modalAdd: {
            open: false,
        },
        modalUpdate: {
            open: false,
            id: '',
            category: '',
            description: '',
            quantity: '',
            brand: '',
            color: '',
            size: '',
            image: '',
        },
        modalView: {
            open: false,
            id: '',
            category: '',
            description: '',
            quantity: '',
            brand: '',
            color: '',
            size: '',
            image: '',
        },
        listSuppliesExport: [],
        listSuppliesImport: []
    }, reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setListSupplies(state, action) {
            state.listSupplies = action.payload;
        },
        setModalAdd(state, action) {
            state.modalAdd = action.payload;
        },
        setModalUpdate(state, action) {
            state.modalUpdate = action.payload;
        },
        setModalView(state, action) {
            state.modalView = action.payload;
        },
        setExportSupplies(state, action) {
            state.listSuppliesExport = action.payload
        },
        setImportSupplies(state, action) {
            state.listSuppliesImport = action.payload
        }
    }
})

export const {
    setLoading,
    setListSupplies,
    setModalAdd,
    setModalUpdate,
    setModalView,
    setExportSupplies,
    setModalExport,
    setImportSupplies
} = suppliesSlice.actions;

export default suppliesSlice.reducer;

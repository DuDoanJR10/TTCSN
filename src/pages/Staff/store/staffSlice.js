import { createSlice } from '@reduxjs/toolkit';

const staffSlice = createSlice({
    name: 'staff',
    initialState: {
        loading: false,
        listStaff: [],
        modalAdd: {
            open: false,
        },
        modalUpdate: {
            open: false,
            id: '',
            room: '',
            phone: '',
            name: '',
        }
    }, reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setListStaff(state, action) {
            state.listStaff = action.payload;
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
    setListStaff,
    setModalAdd,
    setModalUpdate,
} = staffSlice.actions;

export default staffSlice.reducer;

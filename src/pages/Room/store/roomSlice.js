import { createSlice } from '@reduxjs/toolkit';
const roomSlice = createSlice({
    name: 'room',
    initialState: {
        loading: false,
        listRoom: [],
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
        setListRoom(state, action) {
            state.listRoom = action.payload;
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
    setListRoom,
    setModalAdd,
    setModalUpdate
} = roomSlice.actions;

export default roomSlice.reducer;
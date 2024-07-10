// mainSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MainState {
    formData: FormData[]; // Assuming FormData interface is defined
}

const initialState: MainState = {
    formData: [],
};

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        updateForm: (state, action: PayloadAction<FormData>) => {
            // Update or add form data
            const index = state.formData.findIndex(item => item.key === action.payload.key);
            if (index !== -1) {
                state.formData[index] = action.payload;
            } else {
                state.formData.push(action.payload);
            }
        },
        deleteForm: (state, action: PayloadAction<React.Key>) => {
            // Delete form data entry by key
            state.formData = state.formData.filter(item => item.key !== action.payload);
        },
        resetForm: (state) => {
            state.formData = [];
        },
    },
});

export const { updateForm, deleteForm, resetForm } = mainSlice.actions;
export default mainSlice.reducer;

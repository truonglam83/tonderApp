import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPhoto } from "../../interface/photo-interface";
import { AppDispatch } from "../configStore";
import { http } from "../../utils/config";

export interface PhotoState {
    photos: IPhoto[] | null;
}

const initialState: PhotoState = {
    photos: [],
};

const photoReducer = createSlice({
    name: "imageReducer",
    initialState,
    reducers: {
        getAllPhotosAction: (state: PhotoState, action: PayloadAction<IPhoto[]>) => {
            state.photos = action.payload;
        },
    },
});
export const { getAllPhotosAction } = photoReducer.actions;
export default photoReducer.reducer;

export const getAllPhotos = () => {
    return async (dispatch: AppDispatch) => {
        const res = await http.get(`/photo/get-all-photos`);
        try {
            if (res) {
                const data: IPhoto[] = res.data;
                dispatch(getAllPhotosAction(data));
                return data;
            }
        } catch (error) {
            return error;
        }
    };
};

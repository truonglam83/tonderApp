import { IUser } from "@/interface/user-interface";
import { http } from "@/utils/config";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../configStore";
import {
  IFormUpdateInfo,
  IFormUpdateDetail,
} from "../../types/profileType/index";

export interface UserState {
  user: IUser[] | null;
  userProfile: IUser | null;
}

const initialState: UserState = {
  user: [],
  userProfile: null,
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getUserByRadiusAction: (
      state: UserState,
      action: PayloadAction<IUser[]>
    ) => {
      state.user = action.payload;
    },
    userProfileAction: (state: UserState, action: PayloadAction<IUser>) => {
      state.userProfile = action.payload;
    },
  },
});
export const { getUserByRadiusAction, userProfileAction } = userReducer.actions;
export default userReducer.reducer;

export const getUserByRadius = (
  latitude: number,
  longitude: number,
  radius: number
) => {
  return async (dispatch: AppDispatch) => {
    const res = await http.post("/location/user-within-radius", {
      latitude: latitude,
      longitude: longitude,
      radius: radius,
    });
    try {
      if (res) {
        const user: IUser[] = res.data;
        dispatch(getUserByRadiusAction(res.data));
        return user;
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const uploadImageApi = (formData: FormData) => {
  return async () => {
    try {
      const response = await http.post("/photo/upload", formData);
      return response;
    } catch (error) {
      return error;
    }
  };
};

export const updateInfoUser = (user: IFormUpdateInfo) => {
  return async () => {
    try {
      await http.put("/user", user);
    } catch (error) {
      return error;
    }
  };
};

export const updateDetailUser = (user: IFormUpdateDetail) => {
  return async () => {
    try {
      const res = await http.put("/user", user);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
};

export const getProfileUser = () => {
  return async (dispatch: AppDispatch) => {
    const res = await http.get(`/user/profile`);
    try {
      if (res) {
        // console.log(res.data);
        const data: IUser = res.data;
        dispatch(userProfileAction(data));
      }
    } catch (error) {
      return error;
    }
  };
};

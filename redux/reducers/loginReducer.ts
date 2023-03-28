import { ICreateUser } from "./../../interface/login-interface";
import { AppDispatch } from "@/redux/configStore";
import { ILoginPhone } from "@/interface/login-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, http, USER } from "../../utils/config";

export interface LoginState {
  loginPhone: ILoginPhone;
}

const initialState: LoginState = {
  loginPhone: {
    id: "",
    phone: "",
    email: "",
    name: "",
    isPhoneConfirmed: false,
  },
};

const loginReducer = createSlice({
  name: "loginReducer",
  initialState,
  reducers: {
    userLoginPhoneAction: (
      state: LoginState,
      action: PayloadAction<ILoginPhone>
    ) => {
      state.loginPhone = action.payload;
    },
  },
});

export const { userLoginPhoneAction } = loginReducer.actions;

export default loginReducer.reducer;

export const userLoginPhoneApi = (user: ILoginPhone) => {
  return async (dispatch: AppDispatch) => {

    try {
      const response = await http.post("/user/login", user);

      if (response) {
        dispatch(userLoginPhoneAction(response.data.user));
        localStorage.setItem(USER, JSON.stringify(response.data.user));
        localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
      }
    } catch (error) {
      return error;
    }
  };
};

export const createNewUserApi = async (user: ICreateUser) => {
  await http.post("user", user);
};

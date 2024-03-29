import { ILocation } from "@/interface/location-interface";
import { http } from "@/utils/config";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../configStore";

const initialState = {};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {},
});
export const {} = userReducer.actions;
export default userReducer.reducer;

export const createLocation = async (
  latitude: number,
  longitude: number,
  userId: string
) => {
  const res = await http.post("/location/Create-location", {
    latitude: latitude,
    longitude: longitude,
    userId: userId,
  });
  console.log(res);
  return res;
};

export const updateLocation = async (
  userId: string,
  latitude: number,
  longitude: number
) => {
  const res = await http.post(`/location/create-location/`, {
    userId: userId,
    latitude: latitude,
    longitude: longitude,
  });
  // console.log(res);
  return res;
};

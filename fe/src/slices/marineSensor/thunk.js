import { createAsyncThunk } from "@reduxjs/toolkit";
//Include Helper File with needed methods
import {
    getMarineSensorData as getMarineSensorDataApi,
    getMarineSensorHealth as getMarineSensorHealthApi,
    getMarineSensorLocations as getMarineSensorLocationsApi
} from "../../helpers/fakebackend_helper";

export const getMarineSensorData = createAsyncThunk("marineSensor/getData", async () => {
    try {
        const response = await getMarineSensorDataApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const getMarineSensorHealth = createAsyncThunk("marineSensor/getHealth", async () => {
    try {
        const response = await getMarineSensorHealthApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const getMarineSensorLocations = createAsyncThunk("marineSensor/getLocations", async () => {
    try {
        const response = await getMarineSensorLocationsApi();
        return response;
    } catch (error) {
        return error;
    }
}); 
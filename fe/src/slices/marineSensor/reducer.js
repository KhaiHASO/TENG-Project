import { createSlice } from "@reduxjs/toolkit";
import { 
    getMarineSensorData, 
    getMarineSensorHealth, 
    getMarineSensorLocations 
} from "./thunk";

export const initialState = {
    sensorData: {},
    sensorHealth: { sensors: [] },
    sensorLocations: { buoys: [] },
    loading: {
        sensorData: false,
        sensorHealth: false,
        sensorLocations: false
    },
    error: {
        sensorData: null,
        sensorHealth: null,
        sensorLocations: null
    }
};

const MarineSensorSlice = createSlice({
    name: "marineSensor",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle Sensor Data
        builder.addCase(getMarineSensorData.pending, (state) => {
            state.loading.sensorData = true;
            state.error.sensorData = null;
        });
        builder.addCase(getMarineSensorData.fulfilled, (state, action) => {
            state.loading.sensorData = false;
            state.sensorData = action.payload || {};
        });
        builder.addCase(getMarineSensorData.rejected, (state, action) => {
            state.loading.sensorData = false;
            state.error.sensorData = action.payload || "Failed to fetch sensor data";
        });

        // Handle Sensor Health
        builder.addCase(getMarineSensorHealth.pending, (state) => {
            state.loading.sensorHealth = true;
            state.error.sensorHealth = null;
        });
        builder.addCase(getMarineSensorHealth.fulfilled, (state, action) => {
            state.loading.sensorHealth = false;
            state.sensorHealth = action.payload || { sensors: [] };
        });
        builder.addCase(getMarineSensorHealth.rejected, (state, action) => {
            state.loading.sensorHealth = false;
            state.error.sensorHealth = action.payload || "Failed to fetch sensor health";
        });

        // Handle Sensor Locations
        builder.addCase(getMarineSensorLocations.pending, (state) => {
            state.loading.sensorLocations = true;
            state.error.sensorLocations = null;
        });
        builder.addCase(getMarineSensorLocations.fulfilled, (state, action) => {
            state.loading.sensorLocations = false;
            state.sensorLocations = action.payload || { buoys: [] };
        });
        builder.addCase(getMarineSensorLocations.rejected, (state, action) => {
            state.loading.sensorLocations = false;
            state.error.sensorLocations = action.payload || "Failed to fetch sensor locations";
        });
    }
});

export default MarineSensorSlice.reducer; 
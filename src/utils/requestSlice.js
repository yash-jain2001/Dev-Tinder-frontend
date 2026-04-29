import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers:{
        addRequests:(state,action)=>action.payload,
        removeRequest:(state,action)=>state.filter((request)=>request._id!==action.payload._id)
    }
})

export const{addRequests} = requestSlice.actions;
export default requestSlice.reducer;
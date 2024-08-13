import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`

const initialState ={
    status : "",
    error : "",
    conversations : [],
    activeConversation : {},
    notifications : [],


}

// function
export const getConversations = createAsyncThunk("conversation/all" ,async(token  , {rejectWithValue}) => {
    try {
        const {data} = await axios.get(CONVERSATION_ENDPOINT , {
            headers : {
                Authorization : `Bearer ${token}`
            }})

            return data;
        
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error?.message);
        
    }
})

export const chatSlice = createSlice({
    name :"chat",
    initialState ,
    reducers : {
        setActiveConversations :(state ,actions ) => {
            state.activeConversation = actions.payload
        }
    },
    extraReducers(builder){
        builder.addCase(getConversations.fulfilled, (state,action) => {
            state.status = "succeded";
            state.conversations = action.payload;

        })
        builder.addCase(getConversations.rejected, (state,action) => {
            state.status = "failed";
            state.error = action.payload;

        })
        builder.addCase(getConversations.pending, (state,action) => {
            state.status = "loading";
           

        })



    }

});



export const {setActiveConversations} = chatSlice.actions

export default chatSlice.reducer
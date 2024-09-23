import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;
const MESSAGE_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/message`

const initialState ={
    status : "",
    error : "",
    conversations : [],
    activeConversation : {},
    messages : [],
    files : [],
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

export const open_create_conversation = createAsyncThunk(
    "conversation/open_create" ,
    async(values  , {rejectWithValue}) => {
        const {token ,receiver_id} = values;
   
    try {
        const {data} = await axios.post(CONVERSATION_ENDPOINT ,{receiver_id}, {
            headers : {
                Authorization : `Bearer ${token}`
            }})

            return data;
        
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error?.message);
        
    }
});

export const getConversationsMessages  = createAsyncThunk(
    "conversation/messages" ,
    async(values  , {rejectWithValue}) => {
        console.log(values , "valuesssssssss")
        
        const {token ,convo_id} = values;
        console.log(convo_id , "convoooidddddddddddddddddddddddddddddddddddddddddddd")
   
    try {
        const {data} = await axios.get(`${MESSAGE_ENDPOINT}/${convo_id}` , {
            headers : {
                Authorization : `Bearer ${token}`
            }})


            console.log(data , "datadatadtata1111111111111111111111")

            return data;
        
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error?.message);
        
    }
});

export const sendMessages  = createAsyncThunk(
    "message/send" ,
    async(values  , {rejectWithValue}) => {
        const {token,message ,convo_id , files} = values;
   
    try {
        const {data} = await axios.post(MESSAGE_ENDPOINT ,{message,convo_id , files}, {
            headers : {
                Authorization : `Bearer ${token}`
            }})

            return data;
        
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error?.message);
        
    }
});

export const chatSlice = createSlice({
    name :"chat",
    initialState ,
    reducers : {
        setActiveConversations :(state ,actions ) => {
            state.activeConversation = actions.payload
        },

        updateMessagesAndConversations : (state, action) => {
            // update messages
            let convo = state.activeConversation;
            if(convo._id === action.payload.conversation._id){
                state.messages= [...state.messages , action.payload]
            };
            // update convos
           let conversation = {
                ...action.payload.conversation,
                latestMessage: action.payload,
              };
            
              // Filter out the old conversation with the same _id
              let updatedConvos = state.conversations.filter((c) => c._id !== conversation._id);
            
              // Add the updated conversation to the beginning of the list
              updatedConvos.unshift(conversation);
            
              // Update the conversations in the state
              state.conversations = updatedConvos;
          
        },
        addFiles : (state, action) => {
            state.files = [...state.files ,action.payload];

         
            
            
          
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
        builder.addCase(open_create_conversation.fulfilled, (state,action) => {
            state.status = "succeded";
            state.activeConversation = action.payload;

        })
        builder.addCase(open_create_conversation.rejected, (state,action) => {
            state.status = "failed";
            state.error = action.payload;

        })
        builder.addCase(open_create_conversation.pending, (state,action) => {
            state.status = "loading";
           

        })
        builder.addCase(getConversationsMessages.fulfilled, (state,action) => {
            state.status = "succeded";
            state.messages = action.payload;

        })
        builder.addCase(getConversationsMessages.rejected, (state,action) => {
            state.status = "failed";
            state.error = action.payload;

        })
        builder.addCase(getConversationsMessages.pending, (state,action) => {
            state.status = "loading";
           

        });
      builder.addCase(sendMessages.fulfilled, (state, action) => {
  state.status = "succeeded";
  
  // Append the new message to the messages array
  state.messages = [...state.messages, action.payload];

  // Update the conversation's latestMessage
  let conversation = {
    ...action.payload.conversation,
    latestMessage: action.payload,
  };

  // Filter out the old conversation with the same _id
  let updatedConvos = state.conversations.filter((c) => c._id !== conversation._id);

  // Add the updated conversation to the beginning of the list
  updatedConvos.unshift(conversation);

  // Update the conversations in the state
  state.conversations = updatedConvos;
});

        builder.addCase(sendMessages.rejected, (state,action) => {
            state.status = "failed";
            state.error = action.payload;

        })
        builder.addCase(sendMessages.pending, (state,action) => {
            state.status = "loading";
           

        })




    }

});



export const {setActiveConversations ,updateMessagesAndConversations ,addFiles} = chatSlice.actions

export default chatSlice.reducer
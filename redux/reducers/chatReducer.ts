
import { http } from './../../utils/config';
import { AppDispatch } from '@/redux/configStore';
import { IChatList, IConversation, IMatchedUser } from './../../interface/chat-interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IChatState {
    matchedUser: IMatchedUser[],
    listChat: IChatList[],
    conversation: IConversation | null
}

const initialState: IChatState = {
    matchedUser: [],
    listChat: [],
    conversation: null
}

const chatReducer = createSlice({
    name: 'chatReducer',
    initialState,
    reducers: {
        getMatchedUser: (state: IChatState, action: PayloadAction<IMatchedUser[]>) => {
            state.matchedUser = action.payload;
        },
        getAllListChat: (state: IChatState, action: PayloadAction<IChatList[]>) => {
            state.listChat = action.payload;
        },
        createConversation: (state: IChatState, action: PayloadAction<IConversation>) => {
            state.conversation = action.payload;
        }
    }
});

export const { getMatchedUser, getAllListChat, createConversation } = chatReducer.actions

export default chatReducer.reducer

export const createConversationApi = (receiverId: string) => {
    return async (dispatch: AppDispatch) => {
        const response = await http.post('/conversation', {
            receiverId: receiverId
        });

        try {
            if (response) {
                dispatch(createConversation(response.data))
            }
        } catch (error) {
            return error;
        }
    }
}

export const getAllListChatApi = () => {
    return async (dispatch: AppDispatch) => {
        const response = await http.get('/conversation');

        try {
            if (response) {
                const data: IChatList[] = response.data;
                dispatch(getAllListChat(data))

            }
        } catch (error) {
            return error;
        }
    }
}

export const getMatchedUserApi = () => {
    return async (dispatch: AppDispatch) => {
        const response = await http.get('/user/match')

        try {

            const matchedUser: IMatchedUser[] = response.data
            dispatch(getMatchedUser(matchedUser))
        } catch (error) {
            console.log(error)
        }
    }
}





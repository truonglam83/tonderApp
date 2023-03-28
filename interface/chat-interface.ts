export interface IMatchedUser {
    id: string,
    name: string,
    avatar: string | null
}

export interface IChatList {
    conversation_id: string,
    content: string,
    avatar: string | null,
    name: string,
    id: string,
    created_at: string
}

export interface IChatContent {
    content: string
    conversationId: string
    createdAt: string
    deletedAt: null
    id: string
    isSeen: false
    receiver: string
    sender: string
    updatedAt: string
}

export interface IConversation {
    conversation_id: string
    id: string;
    userId: string;
    receiver: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}
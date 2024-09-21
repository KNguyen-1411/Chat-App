export interface IUser {
    id: string;
    email: string;
    displayName: string;
    photoURL: string;
}

export interface IMessage {
    name: string;
    message: string;
    photoURL: string;
    name: string;
    time: string;
    id: string;
}
export interface IRoom {
    id: Key | null | undefined;
    name: string;
    description: string;
    members: string[];
    messages: IMessage[];
    createdAt: string;
}

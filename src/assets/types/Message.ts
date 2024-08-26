import { DateTime } from "luxon";
import { UserMessage } from "./User";

export interface Message{
    id_message: string
    user: UserMessage,
    text: string,
    date: DateTime,
    my: boolean
    isEdit: boolean
}

export interface MessageEdit{
    id_message: string
    text: string,
}
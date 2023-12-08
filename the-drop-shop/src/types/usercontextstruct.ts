import { Dispatch, SetStateAction } from "react";
import { User } from "./user";

export interface UserContextStruct {
    currentUser: User | null,
    setCurrentUser: Dispatch<SetStateAction<User | null>> | null
}
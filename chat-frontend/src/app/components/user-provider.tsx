'use client';

import { createContext, useContext } from "react";



type User = {
    _id: string;
    name: string;
    token: string;
    email: string;
}

const defaultUser: User = {
    _id: "",
    name: "invitado",
    token: "",
    email: ""

}

const userContex = createContext<User>(defaultUser);

export const UserProvide = ({ children }: { children: React.ReactNode }) => {
    return (
        <userContex.Provider value={defaultUser}>

            {children}

        </userContex.Provider>
    );
};

export const useUser = () => useContext(userContex)
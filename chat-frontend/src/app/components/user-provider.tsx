'use client';

import React, { createContext, useContext, useEffect, useState } from "react";

// Tipo de usuario
type User = {
    _id: string;
    name: string;
    token: string;
    email: string;
};

const defaultUser: User = {
    _id: "",
    name: "invitado",
    token: "",
    email: ""
};

type UserContextType = {
    user: User;
    setUser: (user: User) => void;
    isLoading: boolean;
};

// Crear contexto correctamente
const UserContext = createContext<UserContextType | undefined>(undefined);

// Proveedor
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>(defaultUser);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.error("Error parsing user:", err);
            }
        }
        setIsLoading(false);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook para acceder al contexto
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

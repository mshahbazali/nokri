import React, { createContext, useState } from 'react';
export const AuthContext = createContext({});
export const AuthProvider = props => {
    const [userProfileId, setUserProfileId] = useState();
    const [chatId, setChatId] = useState();
    const [user, setUser] = useState();
    return (
        <AuthContext.Provider
            value={{
                userProfileId,
                setUserProfileId,
                chatId,
                setChatId,
                user,
                setUser
            }}>
            {props.children}
        </AuthContext.Provider>
    );
};

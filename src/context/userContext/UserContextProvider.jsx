import React, { useState } from 'react'
import userContext from './userContext'

export default function UserContextProvider({ children }) {

    const [user, setUser] = useState(null)

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    )
}

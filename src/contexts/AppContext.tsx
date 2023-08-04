import React, { useState, createContext, useContext } from 'react';

interface AppContextProps {
    editing: boolean;
    setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export const AppProvider: React.FC = ({ children }) => {
    const [editing, setEditing] = useState(false);

    return (
        <AppContext.Provider value={{ editing, setEditing }}>
            {children}
        </AppContext.Provider>
    );
};

import create from 'zustand'
import { System } from '../interfaces/System.ts';
import { Document } from '../interfaces/Document.ts';

type State = {
    systems: System[],
    documents: Document[],
    addSystem: (system: System) => void,
    addDocument: (document: Document) => void,
    removeSystem: (systemID: string) => void,
    removeDocument: (documentID: string) => void,
    updateSystem: (updatedSystem: System) => void,
    updateDocument: (updatedDocument: Document) => void,
}

export const useStore = create<State>((set) => ({
    systems: [],
    documents: [],
    addSystem: (system: System) => {
        set((state) => {
            return { systems: [...state.systems, system] }
        })
    },
    addDocument: (document: Document) => {
        set((state) => {
            return { documents: [...state.documents, document] }
        })
    },
    removeSystem: (systemID: string) => {
        set((state) => {
            const newSystems = state.systems.filter(system => system.Id !== systemID);
            return { systems: newSystems }
        })
    },
    removeDocument: (documentID: string) => {
        set((state) => {
            const newDocuments = state.documents.filter(document => document.Id !== documentID);
            return { documents: newDocuments }
        })
    },
    updateSystem: (updatedSystem: System) => {
        set((state) => {
            const updatedSystems = state.systems.map(system => {
                if (system.Id === updatedSystem.Id) {
                    return updatedSystem;
                }
                return system;
            });
            return { systems: updatedSystems }
        })
    },
    updateDocument: (updatedDocument: Document) => { 
        set((state) => {
            const updatedDocuments = state.documents.map(document => {
                if (document.Id === updatedDocument.Id) {
                    return updatedDocument;
                }
                return document;
            });
            return { documents: updatedDocuments };
        });
    },
}));
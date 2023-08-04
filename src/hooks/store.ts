import create from 'zustand';
import {AuthData, AuthType, ISystem} from '../interfaces/ISystem.ts';
import { Document } from '../interfaces/Document.ts';

type UserStore = {
    systems: ISystem[];
    documents: Document[];
    addSystem: (system: { systemId: string; authData: AuthData; name: string; authType: AuthType; url: string }) => void;
    addDocument: (document: Document) => void;
    removeSystem: (systemID: string) => void;
    removeDocument: (documentID: string) => void;
    updateSystem: (updatedSystem: ISystem) => void;
    updateDocument: (updatedDocument: Document) => void;
};

export const useStore = create<UserStore>((set) => ({
    systems: [],
    documents: [],
    addSystem: (system: ISystem) =>
        set((state) => ({
            systems: [...state.systems, system],
        })),
    addDocument: (document: Document) =>
        set((state) => ({
            documents: [...state.documents, document],
        })),
    removeSystem: (systemID: string) =>
        set((state) => ({
            systems: state.systems.filter((system) => system.systemId !== systemID),
        })),
    removeDocument: (documentID: string) =>
        set((state) => ({
            documents: state.documents.filter(
                (document) => document.Id !== documentID
            ),
        })),
    updateSystem: (updatedSystem: ISystem) =>
        set((state) => ({
            systems: state.systems.map((system) =>
                system.systemId === updatedSystem.systemId ? updatedSystem : system
            ),
        })),
    updateDocument: (updatedDocument: Document) =>
        set((state) => ({
            documents: state.documents.map((document) =>
                document.Id === updatedDocument.Id ? updatedDocument : document
            ),
        })),
}));

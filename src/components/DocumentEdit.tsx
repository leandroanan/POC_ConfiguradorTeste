import React from "react";
import { System } from "../interfaces/System";
import { Document } from "../interfaces/Document";
import { useStore } from "../hooks/store";
import { Form, Button } from 'react-bootstrap';
interface DocumentEditProps {
    editedName: string;
    setEditedName: (name: string) => void;
    editedSystem: System | null;
    setEditedSystem: (system: System | null) => void;
    documentId: string;
}

const DocumentEdit: React.FC<DocumentEditProps> = ({
                                                       editedName,
                                                       setEditedName,
                                                       editedSystem,
                                                       setEditedSystem,
                                                       documentId,
                                                   }) => {
    const systems = useStore((state) => state.systems);
    const updateDocument = useStore((state) => state.updateDocument);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(event.target.value);
    };

    const handleSystemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const systemName = event.target.value;
        const system = systems.find((sys) => sys.name === systemName) || null;
        setEditedSystem(system);
    };

    const handleSaveClick = () => {
        const updatedDocument: Document = {
            Id: documentId,
            name: editedName,
            system: editedSystem as System,
        };

        updateDocument(updatedDocument);
    };

    return (
        <div>
            <h2>Editar Documento</h2>
            <label>
                Nome do Documento:
                <input type="text" value={editedName} onChange={handleNameChange} />
            </label>
            <label>
                Sistema:
                <select value={editedSystem?.name || ""} onChange={handleSystemChange}>
                    <option value="">Selecione um sistema</option>
                    {systems.map((sys) => (
                        <option key={sys.name} value={sys.name}>
                            {sys.name}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default DocumentEdit;

import React, { useState } from "react";
import { useStore } from "../hooks/store";
import Modal from "./Modal";
import DocumentEdit from "./DocumentEdit";
import { System } from "../interfaces/System";
import { Document } from "../interfaces/Document";

function DocumentList() {
    // Obtém a lista de documentos da store
    const documents = useStore((state) => state.documents);

    // Obtém as funções da store para remover e atualizar documentos
    const removeDocument = useStore((state) => state.removeDocument);
    const updateDocument = useStore((state) => state.updateDocument);

    // Estados locais para armazenar os valores do documento a ser editado
    const [editDocumentId, setEditDocumentId] = useState("");
    const [editedName, setEditedName] = useState("");
    const [editedSystem, setEditedSystem] = useState<System | null>(null);

    // Estado local para controlar a abertura e fechamento do modal de edição
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Manipulador de evento para o clique no botão "Editar" de um documento
    const handleEditClick = (documentId: string, name: string, system: System) => {
        // Atualiza os estados locais com os valores do documento a ser editado
        setEditDocumentId(documentId);
        setEditedName(name);
        setEditedSystem(system);
        setIsModalOpen(true); // Abre o modal de edição
    };

    // Manipulador de evento para o clique no botão "Salvar" do modal de edição
    const handleSaveClick = () => {
        // Cria um objeto de documento atualizado com os valores dos estados locais
        const updatedDocument: Document = {
            Id: editDocumentId,
            name: editedName,
            system: editedSystem as System,
        };

        // Chama a função de atualização de documento da store
        updateDocument(updatedDocument);

        // Limpa os estados locais e fecha o modal de edição
        setIsModalOpen(false);
        setEditDocumentId("");
        setEditedName("");
        setEditedSystem(null);
    };

    // Manipulador de evento para o clique no botão "Cancelar" do modal de edição
    const handleCancelClick = () => {
        // Limpa os estados locais e fecha o modal de edição
        setIsModalOpen(false);
        setEditDocumentId("");
        setEditedName("");
        setEditedSystem(null);
    };

    return (
        <ul>
            {documents.map((document, index) => (
                <li key={document.Id}>
                    <p>Id do documento: {document.Id}</p>
                    <p>Nome do documento: {document.name}</p>
                    <p>Nome do sistema: {document.system.name}</p>
                    <button onClick={() => removeDocument(document.Id)}>Excluir</button>
                    <button
                        onClick={() =>
                            handleEditClick(document.Id, document.name, document.system)
                        }
                    >
                        Editar
                    </button>
                    {/* Renderiza o modal de edição apenas se o ID do documento corresponder ao documento sendo editado */}
                    {isModalOpen && editDocumentId === document.Id && (
                        <Modal>
                            {/* Passa os valores do documento a ser  editado para o componente DocumentEdit */}
                            <DocumentEdit
                                editedName={editedName}
                                setEditedName={setEditedName} 
                                editedSystem={editedSystem}
                                setEditedSystem={setEditedSystem}
                                documentId={document.Id}
                            />
                            <button onClick={handleSaveClick}>Salvar</button>
                            <button onClick={handleCancelClick}>Cancelar</button>
                        </Modal>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default DocumentList;
// Importando as dependências
import { FC, useState } from "react";
import { useStore } from "../hooks/store";
import Modal from "./Modal";
import DocumentEdit from "./DocumentEdit";
import { ISystem } from "../interfaces/ISystem.ts";
import { Document } from "../interfaces/Document.ts";
import listStyles from "./List.module.css";
import styles from "./FormEdited.module.css";

// Definindo o componente DocumentList
const DocumentList: FC = () => {
    // Obtendo os documentos e as funções removeDocument e updateDocument do state
    const documents: Document[] = useStore((state) => state.documents);
    const removeDocument = useStore((state) => state.removeDocument);
    const updateDocument = useStore((state) => state.updateDocument);

    // Definindo o estado para o documento a ser editado e se o modal está aberto ou não
    const [editDocumentId, setEditDocumentId] = useState<string>("");
    const [editedName, setEditedName] = useState<string>("");
    const [editedSystem, setEditedSystem] = useState<ISystem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Função para lidar com o clique no botão de editar
    const handleEditClick = (
        documentId: string,
        name: string,
        system: ISystem
    ) => {
        // Atualizando o estado com as informações do documento a ser editado e abrindo o modal
        setEditDocumentId(documentId);
        setEditedName(name);
        setEditedSystem(system);
        setIsModalOpen(true);
    };

    // Função para lidar com o clique no botão de salvar
    const handleSaveClick = () => {
        // Se um sistema foi selecionado, atualiza o documento
        if (editedSystem) {
            const updatedDocument: { system: ISystem; name: string; Id: string } = {
                Id: editDocumentId,
                name: editedName,
                system: editedSystem,
            };

            updateDocument(updatedDocument as Document);
        }

        // Fechando o modal e resetando o estado
        setIsModalOpen(false);
        setEditDocumentId("");
        setEditedName("");
        setEditedSystem(null);
    };

    // Função para lidar com o clique no botão de cancelar
    const handleCancelClick = () => {
        // Fechando o modal e resetando o estado
        setIsModalOpen(false);
        setEditDocumentId("");
        setEditedName("");
        setEditedSystem(null);
    };

    // Renderizando o componente
    return (
        <table className={listStyles.table}>
            <thead>
            <tr>
                <th>Id do documento</th>
                <th>Nome do documento</th>
                <th>Nome do sistema</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {documents.map((document: Document) => (
                <tr key={document.Id}>
                    <td>{document.Id}</td>
                    <td>{document.name}</td>
                    <td>{document.system.name}</td>
                    <td>
                        <button
                            className={listStyles.button}
                            onClick={() =>
                                handleEditClick(document.Id, document.name, document.system)
                            }
                        >
                            Editar
                        </button>
                    </td>
                    <td>
                        <button
                            className={listStyles.button}
                            onClick={() => removeDocument(document.Id)}
                        >
                            Excluir
                        </button>
                    </td>
                    {isModalOpen && editDocumentId === document.Id && (
                        <Modal>
                            <DocumentEdit
                                editedName={editedName}
                                setEditedName={setEditedName}
                                editedSystem={editedSystem}
                                setEditedSystem={setEditedSystem}
                                documentId={document.Id}
                            />
                            <button onClick={handleSaveClick} className={styles.button}>Salvar</button>
                            <button onClick={handleCancelClick} className={styles.button}>Cancelar</button>
                        </Modal>
                    )}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

// Exportando o componente
export default DocumentList;

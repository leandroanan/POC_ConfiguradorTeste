// Importando as dependências
import { FC, ChangeEvent } from "react";
import { ISystem } from "../interfaces/ISystem.ts";
import { useStore } from "../hooks/store";
import styles from "./FormEdited.module.css";

// Criando uma interface para os props do componente
interface DocumentEditProps {
    editedName: string;
    setEditedName: (name: string) => void;
    editedSystem: ISystem | null;
    setEditedSystem: (system: ISystem | null) => void;
    documentId: string;
}

// Definindo o componente DocumentEdit
const DocumentEdit: FC<DocumentEditProps> = ({
                                                 editedName,
                                                 setEditedName,
                                                 editedSystem,
                                                 setEditedSystem,
                                             }) => {
    // Obtendo os sistemas e a função updateDocument do state
    const systems = useStore((state) => state.systems);

    // Função para lidar com a alteração do nome do documento
    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEditedName(event.target.value);
    };

    // Função para lidar com a alteração do sistema do documento
    const handleSystemChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const systemName = event.target.value;
        const system = systems.find((sys) => sys.name === systemName) || null;
        setEditedSystem(system);
    };

    // Renderizando o componente
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Editar Documento</h2>
            <label className={styles.label}>
                Nome do Documento:
                <input
                    type="text"
                    value={editedName}
                    onChange={handleNameChange}
                    className={styles.input}
                />
            </label>
            <label className={styles.label}>
                Sistema:
                <select
                    value={editedSystem?.name || ""}
                    onChange={handleSystemChange}
                    className={styles.input}
                >
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

// Exportando o componente
export default DocumentEdit;

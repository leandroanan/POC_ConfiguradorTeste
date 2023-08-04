// Importando as dependências
import React, { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Document } from "../interfaces/Document.ts";
import { ISystem } from "../interfaces/ISystem.ts";
import { useStore } from "../hooks/store";
import DocumentList from './DocumentList';
import styles from './Form.module.css';
import {Button} from "antd";

// Definindo os props do componente DocumentForm
interface DocumentFormProps {}

// Definindo o componente DocumentForm
const DocumentForm: FC<DocumentFormProps> = () => {
    // Criando o estado para o nome do documento e o sistema selecionado
    const [name, setName] = useState<string>("");
    const [system, setSystem] = useState<ISystem | null>(null);

    // Obtendo os sistemas e a função addDocument do state
    const systems = useStore((state) => state.systems);
    const addDocument = useStore((state) => state.addDocument);

    // Função para submeter o formulário
    const submitForm = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        // Verificando se o sistema foi selecionado e se o nome foi preenchido
        if (system && name.trim() !== "") {
            // Criando um novo documento
            const newDocument: { system: ISystem; name: string; Id: string } = {
                Id: uuidv4(),
                name,
                system
            };

            // Adicionando o novo documento
            addDocument(newDocument as Document);

            // Resetando o estado
            setSystem(null);
            setName("");
        } else {
            // Se não, mostra um alerta para o usuário
            alert("Favor preencher o nome do documento e selecionar um sistema!");
        }
    };

    // Renderizando o formulário
    return (
        <div>
            <form className={styles.form} onSubmit={submitForm}>
                <div className={styles.input_container}>
                    <label>
                        Nome do Documento:
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </label>
                </div>

                <div className={styles.input_container}>
                    <label>
                        Sistema:
                        <select
                            value={system?.name || ''}
                            onChange={e => setSystem(systems.find(s => s.name === e.target.value) || null)}
                        >
                            <option value="">Selecione um sistema</option>
                            {systems.map(s => (
                                <option key={s.name} value={s.name}>{s.name}</option>
                            ))}
                        </select>
                    </label>
                </div>

                {/*<div className={styles.input_container}>
                    <input type="submit" value="Enviar" />
                </div>*/}
                <Button type="primary" htmlType="submit">Enviar</Button>
            </form>

            <h3>Documentos Cadastrados:</h3>
            <DocumentList />
        </div>
    );
}

// Exportando o componente
export default DocumentForm;

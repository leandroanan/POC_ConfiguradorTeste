import React, { useState } from "react";
import { Document, System } from "../interfaces/";
import { useStore } from "../hooks/store.ts";
import styles from './Form.module.css';
import DocumentList from './DocumentList';
import {v4 as uuidv4} from "uuid";

function DocumentForm() {
    // Utiliza o useState para criar estados locais para nome e sistema
    const [name, setName] = useState("");
    const [system, setSystem] = useState<System | null>(null);

    // Utiliza a função useStore para obter a lista de sistemas da store
    const systems = useStore((state) => state.systems);

    const addDocument = useStore((state) => state.addDocument);

    const submitForm = (event: React.FormEvent) => {
        // Previne o comportamento padrão do formulário (atualizar a página)
        event.preventDefault();

        // Verifica se o sistema não é nulo e se o nome do documento não está vazio
        if (system !== null && name.trim() !== "") {
            // Cria um novo documento com um ID gerado e os valores do nome e sistema
            addDocument({ Id: uuidv4(), name, system } as Document);

            // Limpa os campos após adicionar o documento
            setSystem(null);
            setName("");
        } else {
            alert("Favor preencher o nome do documento e selecionar um sistema!");
            return;
        }
    };

    // Retorna o JSX do formulário
    return (
        <div>
            <form className={styles.form} onSubmit={submitForm}>
                <div className={styles.input_container}>
                    <label>
                        Nome do Documento:
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </label>
                </div>

                {/* Campo de seleção para o sistema associado ao documento */}
                <div className={styles.input_container}>
                    <label>
                        Sistema:
                        {/* O valor do select é definido como o nome do sistema selecionado */}
                        {/* O evento onChange atualiza o estado do sistema com base no valor selecionado */}
                        <select value={system?.name || ''} onChange={e => setSystem(systems.find(s => s.name === e.target.value) || null)}>
                            <option value="">Selecione um sistema</option>
                            {/* Mapeia a lista de sistemas e cria uma opção para cada um */}
                            {systems.map(s => (
                                <option key={s.name} value={s.name}>{s.name}</option>
                            ))}
                        </select>
                    </label>
                </div>

                {/* Botão para enviar o formulário */}
                <div className={styles.input_container}>
                    <input type="submit" value="Enviar" />
                </div>
            </form>

            {/* Lista de documentos cadastrados */}
            <h3>Documentos Cadastrados:</h3>
            <DocumentList />
        </div>
    );
}

export default DocumentForm;

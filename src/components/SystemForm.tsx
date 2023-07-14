import React, { useState } from "react";
import { System, AuthType, AuthData } from "../interfaces/System";
import { useStore } from "../hooks/store.ts";
import styles from './Form.module.css';
import { v4 as uuidv4 } from 'uuid';
import Modal from "./Modal";
import SystemEdit from "./SystemEdit";

// Componente que renderiza as informações de um sistema específico
//Lista os sistemas
function SystemItem({ system, removeSystem }) {
    const [isModalOpen, setModalOpen] = useState(false);

    // Manipula o clique no botão "Editar" para abrir o modal
    const handleEditClick = () => {
        setModalOpen(true);
    };

    return (
        <li key={system.Id}>
            <p>ID: {system.Id}</p>
            <p>Nome: {system.name}</p>
            {system.url && <p>URL: {system.url}</p>}
            {system.authType !== AuthType.None && <p>Tipo de Autenticação: {system.authType}</p>}
            {system.authData && (
                <div>
                    {system.authData.key && <p>Chave: {system.authData.key}</p>}
                    {system.authData.value && <p>Valor: {system.authData.value}</p>}
                    {system.authData.username && <p>Usuário: {system.authData.username}</p>}
                    {system.authData.password && <p>Senha: {'****'}</p>}
                </div>
            )}
            <button onClick={handleEditClick}>Editar</button>
            <button onClick={() => removeSystem(system.Id)}>Excluir</button>

            {isModalOpen && (
                <Modal>
                    <SystemEdit system={system} closeModal={() => setModalOpen(false)} />
                </Modal>
            )}
        </li>
    );
}

// Componente principal que renderiza o formulário de cadastro de sistemas
function SystemForm() {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [authType, setAuthType] = useState(AuthType.None);
    const [authData, setAuthData] = useState<AuthData>({});

    const systems = useStore((state) => state.systems);
    const addSystem = useStore((state) => state.addSystem);
    const removeSystem = useStore((state) => state.removeSystem);

    // Função executada quando o formulário é submetido
    const submitForm = (event: React.FormEvent) => {
        event.preventDefault();

        // Validação dos campna linha 91 retorna as tags do formulario principalos obrigatórios
        if (!name || !url) {
            alert('Os campos "Nome do Sistema" e "URL" são obrigatórios');
            return;
        }

        if (authType === AuthType.Header && (!authData.key || !authData.value)) {
            alert('Os campos "Chave" e "Valor" são obrigatórios para autenticação por "Header"');
            return;
        }

        if (authType === AuthType.User && (!authData.username || !authData.password)) {
            alert('Os campos "Usuário" e "Senha" são obrigatórios para autenticação por "Usuário"');
            return;
        }

        // Cria um novo sistema com os dados fornecidos e o adiciona à lista de sistemas
        addSystem({
            "Id": uuidv4(),
            name,
            url,
            authType,
            authData
        });

        // Limpa os campos do formulário
        setName("");
        setUrl("");
        setAuthType(AuthType.None);
        setAuthData({});
    };

    return (
        <div>
            <form className={styles.form} onSubmit={submitForm}>
                {/* Campo para o nome do sistema */}
                <div className={styles.input_container}>
                    <label>
                        Nome do Sistema:
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </label>
                </div>

                {/* Campo para a URL do sistema */}
                <div className={styles.input_container}>
                    <label>
                        URL:
                        <input type="text" value={url} onChange={e => setUrl(e.target.value)} />
                    </label>
                </div>

                {/* Campo para selecionar o tipo de autenticação */}
                <div className={styles.input_container}>
                    <label>
                        Tipo de Autenticação:
                        <select value={authType} onChange={e => setAuthType(e.target.value as AuthType)}>
                            <option value={AuthType.None}>Sem autenticação</option>
                            <option value={AuthType.Header}>Header</option>
                            <option value={AuthType.User}>Usuário</option>
                        </select>
                    </label>
                </div>

                {/* Campos adicionais dependendo do tipo de autenticação selecionado */}
                {authType === AuthType.Header && (
                    <div className={styles.input_container}>
                        <label>
                            Chave:
                            <input type="text" value={authData.key || ''} onChange={e => setAuthData({ ...authData, key: e.target.value })} />
                        </label>
                        <label>
                            Valor:
                            <input type="text" value={authData.value || ''} onChange={e => setAuthData({ ...authData, value: e.target.value })} />
                        </label>
                    </div>
                )}

                {authType === AuthType.User && (
                    <div className={styles.input_container}>
                        <label>
                            Usuário:
                            <input type="text" value={authData.username || ''} onChange={e => setAuthData({ ...authData, username: e.target.value })} />
                        </label>
                        <label>
                            Senha:
                            <input type="password" value={authData.password || ''} onChange={e => setAuthData({ ...authData, password: e.target.value })} />
                        </label>
                    </div>
                )}

                {/* Botão para enviar o formulário */}
                <div className={styles.input_container}>
                    <input type="submit" value="Enviar" />
                </div>
            </form>

            {/* Lista de sistemas cadastrados */}
            <div>
                <h3>Sistemas Cadastrados:</h3>
                <ul>
                    {systems.map((system) => (
                        <SystemItem system={system} removeSystem={removeSystem} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SystemForm;

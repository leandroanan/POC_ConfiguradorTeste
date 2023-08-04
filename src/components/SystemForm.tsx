import React, { useContext, useState } from 'react';
import { ISystem, AuthType, AuthData } from '../interfaces/ISystem.ts';
import { useStore } from '../hooks/store';
import styles from './FormEdited.module.css';
import { v4 as uuidv4 } from 'uuid';
import Modal from './Modal';
import SystemEdit from './SystemEdit';
import { LanguageContext } from '../contexts/LanguageContext';
import useFormattedSystems from '../hooks/useFormattedSystems';
import { Button, Select, Input, Table, Space } from 'antd';
import {useAppContext} from "../contexts/AppContext.tsx";

// Componente que renderiza o formulário do sistema
const SystemForm: React.FC = () => {
    // Estados do formulário
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [authType, setAuthType] = useState(AuthType.None);
    const [authData, setAuthData] = useState<AuthData>({});
    // Usando o hook useStore para acessar os sistemas e documentos da store
    const store = useStore();
    const systems = store.systems || [];
    const addSystem = store.addSystem;
    const removeSystem = store.removeSystem;
    // Obtendo as labels de idioma do contexto de idiomas usando o hook useContext
    const { systemNameLabel, urlLabel } = useContext(LanguageContext);
    // Estados do modal e sistema em edição
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingSystem, setEditingSystem] = useState<ISystem | null>(null);
    // Obtendo o estado de edição do contexto de aplicativo usando o hook useAppContext
    const { editing, setEditing } = useAppContext();

    // Função que é chamada quando o botão Editar é clicado, abrindo o modal de edição
    const handleEditClick = (systemId: string) => {
        // Encontrando o sistema que está sendo editado com base no ID
        const systemToEdit = systems.find((system) => system.systemId === systemId);
        // Definindo o sistema encontrado no estado editingSystem
        setEditingSystem(systemToEdit);
        // Abrindo o modal
        setModalOpen(true);
        // Definindo o estado de "editing" como true
        setEditing(true);
    }

    // Função que é chamada quando o modal é fechado
    const handleCloseModal = () => {
        // Limpando o sistema que está sendo editado ao fechar o modal
        setEditingSystem(null);
        setModalOpen(false);
        // Definindo o estado de "editing" como false ao fechar o modal
        setEditing(false);
    };

    // Função para validar se a URL é válida
    const isValidURL = (input: string) => {
        const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
        return urlPattern.test(input);
    };

    // Função executada quando o formulário é submetido
    const submitForm = (event: React.FormEvent) => {
        event.preventDefault();
        // Verificando se os campos obrigatórios estão preenchidos
        if (!name || !url) {
            alert('Os campos "Nome do Sistema" e "URL" são obrigatórios');
            return;
        }
        // Verificando se a URL é válida
        if (!isValidURL(url)) {
            alert('URL inválida');
            return;
        }
        // Verificando se já existe um sistema com o mesmo nome
        const systemExists = systems.some((existingSystem) => existingSystem.name === name);

        if (systemExists) {
            alert('Não é possível adicionar o sistema. O nome do sistema já existe.');
            return;
        }
        // Verificando se os campos obrigatórios da autenticação por header estão preenchidos
        if (authType === AuthType.Header && (!authData.key || !authData.value)) {
            alert('Os campos "Chave" e "Valor" são obrigatórios para autenticação por "Header"');
            return;
        }
        // Verificando se os campos obrigatórios da autenticação por usuário estão preenchidos
        if (authType === AuthType.User && (!authData.username || !authData.password)) {
            alert('Os campos "Usuário" e "Senha" são obrigatórios para autenticação por "Usuário"');
            return;
        }
        // Adicionando o novo sistema
        addSystem({
            systemId: uuidv4(),
            name,
            url,
            authType,
            authData,
        });
        // Resetando o formulário
        setName('');
        setUrl('');
        setAuthType(AuthType.None);
        setAuthData({});
    };
    // Função para remover o sistema
    const handleRemoveSystem = (systemId: string) => {
        removeSystem(systemId);
    };
    // Configuração das colunas para a tabela
    const columns = [
        {
            title: 'ID do sistema',
            dataIndex: 'systemId',
            key: 'systemId',
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
        },
        {
            title: 'Tipo de Autenticação',
            dataIndex: 'authType',
            key: 'authType',
        },
        {
            title: 'Autenticação Adicional',
            dataIndex: 'authData',
            key: 'authData',
            render: (authData: AuthData) => (
                <div>
                    {authData.key && <p>Chave: {authData.key}</p>}
                    {authData.value && <p>Valor: {authData.value}</p>}
                    {authData.username && <p>Usuário: {authData.username}</p>}
                    {authData.password && <p>Senha: ****</p>}
                </div>
            ),
        },
        {
            title: 'Ação',
            key: 'action',
            render: (text: any, record: ISystem) => (
                <div>
                    <Button onClick={() => handleEditClick(record.systemId)}>Editar</Button>
                    <Button onClick={() => handleRemoveSystem(record.systemId)}>Excluir</Button>
                </div>
            ),
        },
    ];

    const formattedSystems = useFormattedSystems(systems);

    return (
        <div>
            <div style={{ position: 'relative' }}>
                {!editing && (
                <form className={styles.container} onSubmit={submitForm}>
                    <div>
                        <label htmlFor="name">{systemNameLabel}</label>
                        <Input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="url">{urlLabel}</label>
                        <Input
                            type="text"
                            id="url"
                            value={url}
                            onChange={(event) => setUrl(event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="authType">Tipo de Autenticação:</label>
                        <Select
                            id="authType"
                            value={authType}
                            onChange={(value) => setAuthType(value)}
                        >
                            <Select.Option value={AuthType.None}>Nenhum</Select.Option>
                            <Select.Option value={AuthType.Header}>Header</Select.Option>
                            <Select.Option value={AuthType.User}>Usuário</Select.Option>
                        </Select>
                    </div>
                    {/* Renderização condicional dos campos de autenticação */}
                    {authType === AuthType.Header && (
                        <div>
                            <label htmlFor="key">Chave:</label>
                            <Input
                                type="text"
                                id="key"
                                value={authData.key || ''}
                                onChange={(event) => setAuthData({ ...authData, key: event.target.value })}
                            />
                            <label htmlFor="value">Valor:</label>
                            <Input
                                type="text"
                                id="value"
                                value={authData.value || ''}
                                onChange={(event) => setAuthData({ ...authData, value: event.target.value })}
                            />
                        </div>
                    )}
                    {authType === AuthType.User && (
                        <div>
                            <label htmlFor="username">Usuário:</label>
                            <Input
                                type="text"
                                id="username"
                                value={authData.username || ''}
                                onChange={(event) => setAuthData({ ...authData, username: event.target.value })}
                            />
                            <label htmlFor="password">Senha:</label>
                            <Input
                                type="password"
                                id="password"
                                value={authData.password || ''}
                                onChange={(event) => setAuthData({ ...authData, password: event.target.value })}
                            />
                        </div>
                    )}
                    <Button type="primary" htmlType="submit">Enviar</Button>
                </form>
                )}

                {isModalOpen && editingSystem && (
                    <Modal>
                        <SystemEdit system={editingSystem} closeModal={handleCloseModal} />
                    </Modal>
                )}
            </div>

            <div>
                {/* Tabela de sistemas cadastrados */}
                <h3>Sistemas Cadastrados:</h3>
                <Table
                    columns={columns}
                    dataSource={formattedSystems}
                    pagination={{ pageSize: 2 }}
                    scroll={{ y: 200 }}
                    rowKey={(record) => record.systemId}
                />
            </div>
        </div>
    );
};

export default SystemForm;
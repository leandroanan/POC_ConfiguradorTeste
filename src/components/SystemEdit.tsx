import { FC, useState } from "react";
import { ISystem, AuthType, AuthData } from "../interfaces/ISystem.ts";
import { useStore } from "../hooks/store";
import styles from "./FormEdited.module.css";

interface SystemEditProps {
    system: ISystem;
    closeModal: () => void;
}

const SystemEdit: FC<SystemEditProps> = ({ system, closeModal }) => {
    // Estados para armazenar os valores editados do sistema
    const [editedSystemId, setEditedSystemId ] = useState<string>(system.systemId);
    const [editedName, setEditedName] = useState<string>(system.name);
    const [editedUrl, setEditedUrl] = useState<string>(system.url);
    const [editedAuthType, setEditedAuthType] = useState<AuthType>(
        system.authType
    );
    const [editedAuthData, setEditedAuthData] = useState<AuthData>(
        system.authData
    );
    // Função para atualizar o sistema usando o hook useStore
    const updateSystem = useStore((state) => state.updateSystem);
    // Função para lidar com a mudança do tipo de autenticação
    const handleAuthTypeChange = (authType: AuthType) => {
        setEditedAuthType(authType);

        if (authType === AuthType.None) {
            setEditedAuthData({});
        } else if (authType === AuthType.Header) {setEditedName
            setEditedAuthData({ key: "", value: "" });
        } else if (authType === AuthType.User) {
            setEditedAuthData({ username: "", password: "" });
        }
    };
    // Função para lidar com o clique no botão "Salvar"
    const handleSaveClick = () => {
    const updatedSystem: ISystem = {
        ...system,
        systemId: editedSystemId,
        name: editedName,
        url: editedUrl,
        authType: editedAuthType,
        authData: editedAuthData,
    };
    updateSystem(updatedSystem);// Atualizando o sistema usando a função updateSystem da store
    closeModal();// Fechando o modal após salvar as alterações
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Editar Sistema</h2>
            {/* Inputs para editar o nome e a URL do sistema */}
            <label className={styles.label}>
                Nome do Sistema:
                <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className={styles.input}
                />
            </label>
            <label className={styles.label}>
                URL:
                <input
                    type="text"
                    value={editedUrl}
                    onChange={(e) => setEditedUrl(e.target.value)}
                    className={styles.input}
                />
            </label>
            {/* Seletor para o tipo de autenticação */}
            <label className={styles.label}>
                Tipo de Autenticação:
                <select
                    value={editedAuthType}
                    onChange={(e) => handleAuthTypeChange(e.target.value as AuthType)}
                    className={styles.input}
                >
                    <option value={AuthType.None}>Sem autenticação</option>
                    <option value={AuthType.Header}>Header</option>
                    <option value={AuthType.User}>Usuário</option>
                </select>
            </label>
            {/* Renderização condicional dos campos de autenticação */}
            {editedAuthType === AuthType.Header && (
                <div className={styles.inputContainer}>
                    {/* Inputs para editar a chave e o valor da autenticação do tipo Header */}
                    <label className={styles.label}>
                        Chave:
                        <input
                            type="text"
                            value={editedAuthData.key || ""}
                            onChange={(e) =>
                                setEditedAuthData({ ...editedAuthData, key: e.target.value })
                            }
                            className={styles.input}
                        />
                    </label>
                    <label className={styles.label}>
                        Valor:
                        <input
                            type="text"
                            value={editedAuthData.value || ""}
                            onChange={(e) =>
                                setEditedAuthData({ ...editedAuthData, value: e.target.value })
                            }
                            className={styles.input}
                        />
                    </label>
                </div>
            )}
            {/* Inputs para editar o usuário e senha da autenticação do tipo User */}
            {editedAuthType === AuthType.User && (
                <div className={styles.inputContainer}>
                    <label className={styles.label}>
                        Usuário:
                        <input
                            type="text"
                            value={editedAuthData.username || ""}
                            onChange={(e) =>
                                setEditedAuthData({
                                    ...editedAuthData,
                                    username: e.target.value,
                                })
                            }
                            className={styles.input}
                        />
                    </label>
                    <label className={styles.label}>
                        Senha:
                        <input
                            type="password"
                            value={editedAuthData.password || ""}
                            onChange={(e) =>
                                setEditedAuthData({
                                    ...editedAuthData,
                                    password: e.target.value,
                                })
                            }
                            className={styles.input}
                        />
                    </label>
                </div>
            )}
            {/* Botões de salvar e cancelar */}
            <div className={styles.buttonContainer}>
                <button onClick={handleSaveClick} className={styles.button}>
                    Salvar
                </button>
                <button onClick={closeModal} className={styles.button}>
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default SystemEdit;

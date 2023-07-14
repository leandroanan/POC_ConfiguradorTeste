import React, { useState } from "react";
import { System, AuthType, AuthData } from "../interfaces/System";
import { useStore } from "../hooks/store.ts";
import styles from './SystemEdit.module.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importe o arquivo CSS do Bootstrap

// Props do componente SystemEdit
interface Props {
    system: System;
    closeModal: () => void;
}

function SystemEdit({ system, closeModal }: Props) {
    // Estados locais para os campos editados do sistema
    const [editedName, setEditedName] = useState(system.name);
    const [editedUrl, setEditedUrl] = useState(system.url);
    const [editedAuthType, setEditedAuthType] = useState(system.authType);
    const [editedAuthData, setEditedAuthData] = useState<AuthData>(system.authData);

    const updateSystem = useStore((state) => state.updateSystem);

    // Manipula o clique no botão "Salvar"
    const handleSaveClick = () => {
        // Cria um novo objeto System com os campos editados
        const updatedSystem: System = {
            ...system,
            name: editedName,
            url: editedUrl,
            authType: editedAuthType,
            authData: editedAuthData,
        };

        // Chama a função de atualização do sistema e fecha o modal
        updateSystem(updatedSystem);
        closeModal();
    };

    return (
        <div className={styles.container}>
            <h2>Editar Sistema</h2>
            <label>
                Nome do Sistema:
                <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                />
            </label>
            <label>
                URL:
                <input
                    type="text"
                    value={editedUrl}
                    onChange={(e) => setEditedUrl(e.target.value)}
                />
            </label>
            <label>
                Tipo de Autenticação:
                <select
                    value={editedAuthType}
                    onChange={(e) => setEditedAuthType(e.target.value as AuthType)}
                >
                    <option value={AuthType.None}>Sem autenticação</option>
                    <option value={AuthType.Header}>Header</option>
                    <option value={AuthType.User}>Usuário</option>
                </select>
            </label>

            {/* Campos adicionais dependendo do tipo de autenticação selecionado */}
            {editedAuthType === AuthType.Header && (
                <div className={styles.input_container}>
                    <label>
                        Chave:
                        <input
                            type="text"
                            value={editedAuthData.key || ""}
                            onChange={(e) =>
                                setEditedAuthData({ ...editedAuthData, key: e.target.value })
                            }
                        />
                    </label>
                    <label>
                        Valor:
                        <input
                            type="text"
                            value={editedAuthData.value || ""}
                            onChange={(e) =>
                                setEditedAuthData({ ...editedAuthData, value: e.target.value })
                            }
                        />
                    </label>
                </div>
            )}

            {editedAuthType === AuthType.User && (
                <div className={styles.input_container}>
                    <label>
                        Usuário:
              // Cria um novo objeto System com os campos editados
                  <input
                            type="text"
                            value={editedAuthData.username || ""}
                            onChange={(e) =>
                                setEditedAuthData({
                                    ...editedAuthData,
                                    username: e.target.value,
                                })
                            }
                        />
                    </label>
                    <label>
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
                        />
                    </label>
                </div>
            )}

            {/* Botões de Salvar e Cancelar */}
            <div className={styles.button_container}>
                <button onClick={handleSaveClick}>Salvar</button>
                <button onClick={closeModal}>Cancelar</button>
            </div>
        </div>
    );
}

export default SystemEdit;

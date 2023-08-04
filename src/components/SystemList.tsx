import { useStore } from "../hooks/store";
import { AuthType, ISystem } from "../interfaces/ISystem.ts";
import {FC} from "react";

const SystemList: FC = () => {
    const systems: ISystem[] = useStore((state) => state.systems);

    return (
        <ul>
            {systems.map((system: ISystem) => (
                <li key={system.Id}>
                    <h2>{system.Id}</h2>
                    <p>{system.name}</p>
                    <p>{system.url}</p>
                    <p>{system.authType}</p>
                    {system.authType !== AuthType.None && system.authData && (
                        <div>
                            {system.authData.key && <p>Chave: {system.authData.key}</p>}
                            {system.authData.value && <p>Valor: {system.authData.value}</p>}
                            {system.authData.username && (
                                <p>Usuário: {system.authData.username}</p>
                            )}
                            {system.authData.password && <p>Senha: ****</p>}
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default SystemList;
export interface System {
    Id: string;
    name: string;
    url: string;
    authType: AuthType;
    authData: AuthData;
}

export interface AuthData {
    key?: string;
    value?: string;
    username?: string;
    password?: string;
}

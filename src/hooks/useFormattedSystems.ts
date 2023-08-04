import { useEffect, useState } from 'react';
import { ISystem, AuthType } from '../interfaces/ISystem.ts';

const useFormattedSystems = (systems: ISystem[]): any[] => {
    const [formattedSystems, setFormattedSystems] = useState<any[]>([]);

    useEffect(() => {
        const formatDataSource = (systems: ISystem[]): any[] => {
            return systems.map((system) => ({
                systemId: system.systemId,
                name: system.name,
                url: system.url,
                authType: system.authType !== AuthType.None ? system.authType : '',
                authData: system.authData,
            }));
        };
        // Chamada da função de formatação quando o array de sistemas é alterado
        setFormattedSystems(formatDataSource(systems));
    }, [systems]);

    return formattedSystems;
};

export default useFormattedSystems;

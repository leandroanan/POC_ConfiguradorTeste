import { ISystem } from './ISystem.ts';

export interface Document {
    Id: string;
    name: string;
    systemId: string;
    system: ISystem;
}

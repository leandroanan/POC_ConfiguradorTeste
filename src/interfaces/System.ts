export enum AuthType {
    Header = "Header",
    User = "Usuário",
    None = "Sem autenticação"
}

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

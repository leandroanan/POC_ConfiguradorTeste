export enum Language {
    Spanish = 'es',
    Portuguese = 'pt',
    English = 'en',
}

export interface ILanguageSelector {
    onChangeLanguage: (language: Language) => void;
}

export default ILanguageSelector;

// Neste arquivo, definimos um enum para representar os idiomas disponíveis na aplicação.
// Também definimos uma interface ILanguageSelector que possui uma função onChangeLanguage para selecionar o idioma.
// Essas definições são exportadas para que possam ser utilizadas em outros arquivos da aplicação.

// ILanguageContext.ts
import { Language } from './ILanguageSelector';

export interface ILanguageContext {
    language: Language;
    setLanguage: (language: Language) => void;
    headerTitle: string;
    setHeaderTitle: (headerTitle: string) => void;
    systemLink: string;
    setSystemLink: (systemLink: string) => void;
    documentLink: string;
    setDocumentLink: (documentLink: string) => void;
    systemNameLabel: string;
    setSystemNameLabel: (systemNameLabel: string) => void;
    urlLabel: string;
    setUrlLabel: (urlLabel: string) => void;
    documentLabel: string;
    setDocumentLabel: (documentLabel: string) => void;
    systemName: string;
    setSystemName: (systemName: string) => void;
    documentName: string;
    setDocumentName: (documentName: string) => void;
}

//Essa interface define a estrutura dos valores que serão fornecidos pelo contexto de idioma
//e como esses valores podem ser atualizados. Esses campos são usados para gerenciar
//os estados relacionados às traduções e labels da aplicação com base no idioma selecionado
// LanguageContext.tsx
import {createContext, useState, useEffect, ReactNode} from 'react';
import { Language } from '../interfaces/ILanguageSelector';
import { ILanguageContext } from '../interfaces/ILanguageContext';
//Importa as labels
import es from '../locales/es.json';
import pt from '../locales/pt.json';
import en from '../locales/en.json';

// Criação do contexto de idioma, getters e setters
export const LanguageContext = createContext<ILanguageContext>({
    language: Language.Spanish,
    setLanguage: () => {},
    headerTitle: "POC Configurador",
    setHeaderTitle: () => {},
    systemLink: "Sistema ES",
    setSystemLink: () => {},
    documentLink: "Document ES",
    setDocumentLink: () => {},
    systemNameLabel: "Nombre del sistema",
    setSystemNameLabel: () => {},
    urlLabel: "URL",
    setUrlLabel: () => {},
    documentLabel: "Documento",
    setDocumentLabel: () => {},
    systemName: "Nombre del Sistema",
    setSystemName: () => {},
    documentName: "Nombre del Documento",
    setDocumentName: () => {},
});

// Estados relacionados ao idioma
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children })  => {
    const [language, setLanguage] = useState<Language>(Language.Spanish);
    const [headerTitle, setHeaderTitle] = useState("POC Configurador");
    const [systemLink, setSystemLink] = useState("Sistema ES");
    const [documentLink, setDocumentLink] = useState("Documento ES");
    const [systemNameLabel, setSystemNameLabel] = useState("Nombre del sistema");
    const [urlLabel, setUrlLabel] = useState("URL");
    const [documentLabel, setDocumentLabel] = useState("Documento");
    const [systemName, setSystemName] = useState("Nombre del Sistema");
    const [documentName, setDocumentName] = useState("Nombre del Documento");
    //seta a label selecionada no header
    useEffect(() => {
        let labels;
        //setando o arquivo se labels com o enum de idiomas de labels
        //De acordo com o campo de idiomas language, eu seleciono o arquivo de labels es, pt, en
        switch (language) {
            case Language.Spanish:
                labels = es.labels;
                break;
            case Language.Portuguese:
                labels = pt.labels;
                break;
            case Language.English:
                labels = en.labels;
                break;
            default:
                labels = es.labels;
                break;
        }
        // Atualiza os estados de acordo com as traduções do idioma selecionado
        setHeaderTitle(labels['header.title']);
        setSystemLink(labels['systemLink']);
        setDocumentLink(labels['documentLink']);
        setSystemNameLabel(labels['systemName']);
        setUrlLabel(labels['urlLabel']);
        setDocumentLabel(labels['documentName']);
        setSystemNameLabel(labels['systemName']);
        setDocumentName(labels['documentName']);
    }, [language]);

    return (
        //Retorna as labels atualizadas
        <LanguageContext.Provider value={{ language, setLanguage, headerTitle, setHeaderTitle
                                         , systemLink, setSystemLink, documentLink, setDocumentLink
                                         , systemNameLabel, setSystemNameLabel, urlLabel, setUrlLabel
                                         , documentLabel, setDocumentLabel, systemName, setSystemName
                                         , documentName, setDocumentName}}>
            {children}
        </LanguageContext.Provider>
    );
};

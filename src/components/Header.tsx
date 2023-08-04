import React, { useContext } from 'react';
import styles from './Header.module.css';
import { LanguageContext } from '../contexts/LanguageContext';
import { Language } from '../interfaces/ILanguageSelector';
import { Select } from 'antd';

const { Option } = Select;

const Header: React.FC = () => {
    const { language, setLanguage, headerTitle } = useContext(LanguageContext);

    // Função chamada quando o valor do seletor de idioma é alterado
    const handleLanguageChange = (value: Language) => {
        //setando o idioma no contexto
        setLanguage(value);
    };

    return (
        <div>
            <h1 className={styles.header}>{headerTitle}</h1>
            <span>Idioma:</span>
            <Select value={language} onChange={handleLanguageChange}>
                <Option value={Language.Spanish}>Espanhol</Option>
                <Option value={Language.Portuguese}>Português</Option>
                <Option value={Language.English}>Inglês</Option>
            </Select>
        </div>
    );
};

export default Header;

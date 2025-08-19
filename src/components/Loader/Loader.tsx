import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Loader: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>{t('loading')}</p>
        </div>
    );
};

export default Loader;

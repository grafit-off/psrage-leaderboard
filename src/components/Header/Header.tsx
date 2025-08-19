import React from 'react';
import Select from 'react-select';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const options = [
    { value: 'en', label: 'English' },
    { value: 'uk', label: 'Українська' },
  ];

  const selectedOption = options.find(opt => opt.value === language) ?? options[0];

  return (
    <header className={styles.header}>
      <h1 className={styles.appTitle}>
        <a
          href='https://www.faceit.com/en/club/f70da885-8b43-4ff5-a986-a97ce35e9c81/queue/3b814eda-51a7-497b-8efd-18d039e8db49/chat'
          target="_blank"
        >
          {t('app.title')}
        </a>
      </h1>
      <div className={styles.languageSelector}>
        <label className={styles.languageSelectorLabel} htmlFor="language-select">{t('app.language')}:</label>
        <div style={{ minWidth: 140 }}>
          <Select
            inputId="language-select"
            value={selectedOption}
            onChange={(opt) => {
              if (opt) {
                setLanguage(opt.value as 'en' | 'uk');
              }
            }}
            options={options}
            isSearchable={false}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: 'rgba(255,255,255,0.06)',
                borderColor: 'rgba(255,255,255,0.2)',
                boxShadow: 'none',
                minHeight: 36,
                cursor: 'pointer',
              }),
              singleValue: (base) => ({
                ...base,
                color: '#ffffff',
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: '#111',
                border: '1px solid rgba(255,255,255,0.15)',
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? 'rgba(78, 205, 196, 0.15)' : 'transparent',
                color: '#ffffff',
                cursor: 'pointer',
              }),
              placeholder: (base) => ({ ...base, color: '#cccccc' }),
              input: (base) => ({ ...base, color: '#ffffff' }),
              indicatorSeparator: (base) => ({ ...base, backgroundColor: 'rgba(255,255,255,0.15)' }),
              dropdownIndicator: (base) => ({ ...base, color: '#cccccc' }),
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;



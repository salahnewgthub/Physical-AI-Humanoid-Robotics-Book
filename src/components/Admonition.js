import React from 'react';
import clsx from 'clsx';
import styles from './Admonition.module.css';

export default function Admonition({type, title, children}) {
  const icon = type === 'tip' ? '💡' :
               type === 'note' ? '📝' :
               type === 'caution' ? '⚠️' :
               type === 'danger' ? '🚨' : 'ℹ️';

  const titleText = type === 'tip' ? 'Tip' :
                    type === 'note' ? 'Note' :
                    type === 'caution' ? 'Caution' :
                    type === 'danger' ? 'Danger' : 'Info';

  return (
    <div className={clsx(styles.admonition, styles[`admonition--${type}`])}>
      <div className={styles.admonitionHeader}>
        <span className={styles.admonitionIcon}>{icon}</span>
        <span className={styles.admonitionTitle}>{title || titleText}</span>
      </div>
      <div className={styles.admonitionContent}>
        {children}
      </div>
    </div>
  );
}
import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {translate} from '@docusaurus/Translate';
import styles from './TOC.module.css';

export default function TOC({toc, className, ...props}) {
  if (!toc.length) {
    return null;
  }

  return (
    <div
      className={clsx(
        className,
        ThemeClassNames.docs.docTocMobile,
        'table-of-contents',
        'table-of-contents__left-border',
        styles.toc,
      )}>
      <div className={styles.tocHeading}>
        {translate({
          id: 'theme.TOCCollapsible.toggleButtonLabel',
          message: 'On this page',
          description:
            'The label used by the button on the mobile TOC component',
        })}
      </div>
      <ul className={clsx('table-of-contents', 'clean-list')}>
        {toc.map((heading) => (
          <li key={heading.id} className={clsx(heading.level >= 3 && 'margin-left--sm')}>
            <a
              className={clsx(styles.tocItem, 'table-of-contents__link')}
              href={`#${heading.id}`}
              {...(heading.children?.length > 0 && {
                'aria-label': translate(
                  {
                    id: 'theme.TOCCollapsible.linkToHeading',
                    message: 'Link to heading',
                    description:
                      'Screen reader label to link to a heading in the Table of Contents',
                  },
                  {heading: heading.value},
                ),
              })}>
              {heading.value}
            </a>
            {heading.children?.length > 0 && (
              <ul className="clean-list">
                {heading.children.map((childHeading) => (
                  <li
                    key={childHeading.id}
                    className="margin-left--sm margin-bottom--sm">
                    <a
                      className={clsx(
                        styles.tocItem,
                        'table-of-contents__link',
                      )}
                      href={`#${childHeading.id}`}>
                      {childHeading.value}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
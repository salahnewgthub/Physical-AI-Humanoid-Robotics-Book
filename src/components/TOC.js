import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {translate} from '@docusaurus/Translate';
import styles from './TOC.module.css';

export default function TOC({className, ...props}) {
  const {toc, isChild} = props;

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
        styles.tocContainer,
        isChild && styles.tocChild,
      )}>
      <div className={styles.tocHeading}>
        {translate({
          id: 'theme.TOCCollapsible.toggleButtonLabel',
          message: 'On this page',
          description:
            'The label used by the button on the mobile TOC component',
        })}
      </div>
      <ul className={clsx('table-of-contents', 'clean-list', styles.toc)}>
        {toc.map((heading) => (
          <li key={heading.id} className={clsx(heading.level >= 3 && 'margin-left--sm')}>
            <Link
              className={clsx(styles.tocItem, 'table-of-contents__link')}
              to={`#${heading.id}`}
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
            </Link>
            {heading.children?.length > 0 && (
              <ul className="clean-list">
                {heading.children.map((childHeading) => (
                  <li
                    key={childHeading.id}
                    className="margin-left--sm margin-bottom--sm">
                    <Link
                      className={clsx(
                        styles.tocItem,
                        'table-of-contents__link',
                      )}
                      to={`#${childHeading.id}`}>
                      {childHeading.value}
                    </Link>
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
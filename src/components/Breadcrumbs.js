import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {translate} from '@docusaurus/Translate';
import {ThemeClassNames} from '@docusaurus/theme-common';
import styles from './Breadcrumbs.module.css';

function BreadcrumbItem({children, href, isLast, ...props}) {
  return (
    <li
      className={clsx(
        'breadcrumb__item',
        !isLast && 'breadcrumb__item--active',
        styles.breadcrumbItem,
      )}
      {...props}>
      {href ? (
        <Link
          aria-label={translate(
            {
              id: 'theme.docs.breadcrumbs.home',
              message: 'Home page',
              description: 'The ARIA label for the home page in the breadcrumbs',
            },
            {},
          )}
          className={clsx('breadcrumb__link', styles.breadcrumbLink)}
          href={href}>
          {children}
        </Link>
      ) : (
        <span className="breadcrumb__link breadcrumb__link--active">
          {children}
        </span>
      )}
      {!isLast && <span className="breadcrumb__separator">/</span>}
    </li>
  );
}

export default function Breadcrumbs({items}) {
  const location = useLocation();

  return (
    <nav
      className={clsx(
        ThemeClassNames.docs.docBreadcrumbs,
        styles.breadcrumbContainer,
      )}
      aria-label={translate({
        id: 'theme.docs.breadcrumbs.navAriaLabel',
        message: 'Breadcrumbs',
        description: 'The ARIA label for the breadcrumbs',
      })}>
      <ul className={clsx('clean-list', styles.breadcrumbs)}>
        <BreadcrumbItem href="/" isLast={items.length === 0}>
          {translate({
            id: 'theme.docs.breadcrumbs.home',
            message: 'Home',
            description: 'The label for the home page in the breadcrumbs',
          })}
        </BreadcrumbItem>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <BreadcrumbItem
              key={idx}
              href={isLast ? undefined : item.href}
              isLast={isLast}>
              {item.label}
            </BreadcrumbItem>
          );
        })}
      </ul>
    </nav>
  );
}
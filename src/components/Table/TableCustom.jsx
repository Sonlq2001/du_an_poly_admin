import React from 'react';

import {
  Table,
  TableTr,
  TableTh,
  GroupTale,
  TableTd,
} from './TableCustom.styles';

export const TableCustom = ({ children, className }) => {
  return (
    <GroupTale>
      <Table className={className}>{children}</Table>
    </GroupTale>
  );
};

export const Thead = ({ children, className }) => {
  return <thead className={className}>{children}</thead>;
};

export const Tbody = ({ children, className }) => {
  return <tbody className={className}>{children}</tbody>;
};

export const Tr = ({ children, className, ...props }) => {
  return (
    <TableTr className={className} {...props}>
      {children}
    </TableTr>
  );
};

export const Th = ({ children, sort = false, className, align, onClick }) => {
  let alignTh = '';
  switch (align) {
    case 'right':
      alignTh = 'right';
      break;
    case 'center':
      alignTh = 'center';
      break;
    default:
      alignTh = 'left';
  }
  return sort ? (
    <TableTh sort={sort} className={className} alignText={alignTh}>
      <span className="label-th">{children}</span>
      <span className="sort" onClick={onClick ? onClick : () => {}}></span>
    </TableTh>
  ) : (
    <th className={`th-default ${className}`} align={alignTh}>
      {children}
    </th>
  );
};

export const Td = ({ children, className, nowrap = false }) => {
  return (
    <TableTd className={className} nowrap={nowrap}>
      {children}
    </TableTd>
  );
};

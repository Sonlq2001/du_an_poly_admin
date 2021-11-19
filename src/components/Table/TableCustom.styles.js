import styled from 'styled-components';

export const GroupTale = styled.div`
  /* overflow-x: auto; */
`;
export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  background-color: var(--white-color);
  font-size: 1.4rem;
  text-align: left;
`;

export const TableTr = styled.tr`
  border-bottom: 1px solid var(--eee-color);
  display: table-row;

  th {
    font-weight: 500;
    padding: 1rem;
    white-space: nowrap;
    text-align: ${({ alignText }) => alignText};
  }

  .fix-sort {
    min-width: 15rem;
  }

  td {
    padding: 1.2rem;
  }
  li {
    list-style: none;
    padding: 2px 0px;
  }
`;

export const TableTh = styled.th`
  position: relative;
  text-align: ${({ alignText }) => alignText};
  & .label-th {
    padding-right: 2.5rem;
  }
  .sort {
    position: absolute;
    cursor: pointer;
  }
  & .sort::after {
    content: '\\2191';
    opacity: 0.7;
  }

  & .sort::before {
    content: '\\2193';
    opacity: 0.7;
  }
`;

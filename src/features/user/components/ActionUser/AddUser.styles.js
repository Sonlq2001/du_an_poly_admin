import styled from 'styled-components';
export const ContentForm = styled.div`
  & .from-group {
    padding-bottom: 2rem;
    display: flex;
    justify-content: space-between;
  }
  & .from-group label {
    width: 40%;
    white-space: nowrap;
    margin-right: 2rem;
    line-height: 3rem;
    font-size: 15px;
    color: gray;
  }
  & .from-group > input {
    width: 25rem;
    border-radius: 5px;
    font-size: 14px;
    padding-left: 1rem;
    outline: none;
    border: 1px solid #c1bcbc;
    height: 2rem;
    font-weight: 200;
    :focus {
      border: 2px solid #165bf3;
    }
  }
  .box-select {
    width: 100%;
    font-size: 1.4rem;
  }
  @media (max-width: 575.98px) {
    .from-group {
      flex-direction: column;
    }
    .from-group + .from-group {
      margin-top: 0;
    }
  }
  .error-group .css-1s2u09g-control {
    border: 1px solid var(--red-color);
    background-color: var(--red-bg-err);
  }

  .error-msg {
    font-size: 1.3rem;
    color: var(--red-color);
    margin-top: 5px;
  }
`;

export const GroupAction = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4rem;
`;

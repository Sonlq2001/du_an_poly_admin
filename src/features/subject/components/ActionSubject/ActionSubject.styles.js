import styled from 'styled-components';

export const ContentForm = styled.div`
  & .form-group {
    padding-bottom: 2rem;
    display: flex;
    justify-content: space-between;
  }
  .form-group + .form-group {
    margin-top: 1.5rem;
  }
  & .form-group label {
    margin-right: 2rem;
    line-height: 3rem;
    font-size: 15px;
    color: gray;
    width: 40%;
    white-space: nowrap;
  }
  & .form-group > input {
    width: 25rem;
    border-radius: 5px;
    font-size: 14px;
    padding-left: 1rem;
    outline: none;
    border: 1px solid #c1bcbc;
    height: 3.8rem;
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
    .form-group {
      flex-direction: column;
    }
    .form-group + .form-group {
      margin-top: 0;
    }
  }
`;

export const GroupAction = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4rem;
`;

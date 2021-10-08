import styled from 'styled-components';

export const BoxInputField = styled.div`
  .label-field {
    font-size: 1.4rem;
    display: block;
    margin-bottom: 5px;
  }

  .input-field {
    border-radius: 5px;
    padding: 1rem;
    border: none;
    border: 1px solid var(--ddd-color);
    width: 25rem;
    height: 4rem;
  }

  .input-field:hover {
    border: 1px solid var(--blue-bold-color);
    box-shadow: 0 0 1rem rgba(234 34 234 / 10%);
  }

  .input-field::placeholder {
    color: var(--aaa-color);
  }
`;
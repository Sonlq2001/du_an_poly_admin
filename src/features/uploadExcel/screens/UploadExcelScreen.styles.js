import styled from 'styled-components';

export const GroupUpload = styled.div`
  .group-select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .box-select {
    width: 50%;
    font-size: 1.3rem;
  }
  .box-select + .box-select {
    margin-left: 4rem;
  }
  .title-upload {
    font-size: 1.8rem;
    font-weight: 500;
  }
  .helper-upload {
    font-size: 1.2rem;
    font-style: italic;
  }
  .button-upload {
    margin-top: 3rem;
    display: flex;
    justify-content: flex-end;
  }
  .btn-download {
    font-size: 1.4rem;
    padding: 1rem 1.5rem;
    background-color: var(--eee-color);
    border-radius: 5px;
    &:hover {
      opacity: 0.9;
    }
  }

  @media (max-width: 767.98px) {
    .group-select,
    .box-select {
      width: 100%;
    }
  }
`;
export const HeaderUpload = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const BoxUpload = styled.div`
  margin: 4em 0 1rem 0;
  width: 50%;
  .label-upload {
    font-size: 1.4rem;
    margin-bottom: 5px;
  }
  .error-file {
    font-size: 1.3rem;
    color: var(--red-color) !important;
    margin-top: 5px;
  }
  @media (max-width: 767.98px) {
    & {
      width: 100%;
    }
  }
`;
export const ContentUpload = styled.label`
  display: block;
  padding: 2rem 5rem;
  background-color: rgba(52 152 219 / 11%);
  border-radius: 1rem;
  border: 1px dashed var(--ddd-color);
  cursor: pointer;
  text-align: center;
  .input-upload {
    display: none;
  }
  .icon-upload {
    font-size: 5rem;
  }
  .text-upload {
    font-size: 1.3rem;
  }
  .label-upload:hover .icon-upload,
  .label-upload:hover .text-upload {
    color: var(--blue-color);
  }
`;

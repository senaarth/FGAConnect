import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 1120px;
  margin: 2.5% auto;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  div {
    width: 100%;
    display: flex;
    flex-direction: column;

    input,
    select {
      width: 100%;
    }
  }

  input,
  button,
  select {
    border: 0;
    border-radius: 8px;
    padding: 1rem;
    margin: 0.5rem auto;
    outline: none;
    color: var(--text-body);
  }

  input::placeholder {
    color: var(--text-body);
  }

  button {
    background: var(--blue);
    color: white;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 1px;
    width: 70%;

    transition: filter 0.4s;

    &:hover {
      filter: brightness(0.7);
    }
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;

    div {
      flex-direction: row;
      width: 75%;
      justify-content: space-between;

      input,
      select {
        width: 48%;
        margin: 0;
      }
    }

    button {
      width: 20%;
      margin: 0;
    }
  }
`;

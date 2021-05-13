import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 4rem 0;
  width: 90%;
  max-width: 500px;
  margin: 0 auto;

  h1 {
    margin-bottom: 2rem;
  }

  input,
  select {
    width: 100%;
    color: var(--text-body);
  }

  input::placeholder {
    color: var(--text-body);
  }

  input + input,
  input + select {
    margin-top: 1rem;
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
    margin-top: 3rem;
  }
`;

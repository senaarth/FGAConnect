import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5% 0;
`;

export const Content = styled.div`
  * {
    text-align: center;
  }

  h1 {
    font-size: 1.5rem;

    strong {
      color: var(--green);
    }
  }

  h2 {
    font-size: 1rem;
  }

  p {
    text-align: center;
    width: 70%;
    margin: 1rem auto;
    font-weight: 500;
    font-size: 0.9rem;
  }

  @media screen and (min-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    p {
      width: 60%;
    }
  }
`;

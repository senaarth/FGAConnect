import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5% 0;

  h1, input, button {
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
  }

  h1 {
    font-size: 1.4rem;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 1.5rem;
  }

  input + input,
  input + button {
    margin-top: 1rem;
  }

  @media screen and (min-width: 1024px) {
      flex-direction: row;
  }
`;

export const SignupContainer = styled.div`
  width: 100%;
  padding: 5%;
  display: flex;
  flex-direction: column;
`;

export const LoginContainer = styled.div`
  width: 100%;
  padding: 5%;
  display: flex;
  flex-direction: column;
`;

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 550px;
  text-align: center;

  background: #fff;
  border-radius: 10px;
  padding: 1.8rem;
  padding-bottom: 1.2rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
  color: var(--blue);
  font-weight: 500;

  h1,
  a {
    margin: 0 auto;
  }

  h1 {
    margin: 0;
    font-size: 1.4rem;
  }

  a {
    text-decoration: none !important;
    color: var(--green);
    margin-top: 0.6rem;
  }

  & + div {
    margin-top: 1.5rem;
  }
`;

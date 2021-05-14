import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;
  padding: 2rem 0;

  @media screen and (min-width: 375px) {
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
`;

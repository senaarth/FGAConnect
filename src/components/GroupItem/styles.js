import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  padding: 1.2rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
  color: var(--blue);
  font-weight: 500;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.95);
  }
  h1 {
    font-size: 1.2rem;
  }

  h2 {
    font-size: 1rem;
  }

  p {
    font-size: 0.8rem;
  }

  .detailsBtn {
    text-decoration: none;
    font-size: 1rem;
    margin-top: 0.4rem;
    color: var(--green) !important;
    font-weight: 600;
    margin-left: auto;
    cursor: pointer;
    margin-bottom: 0;
  }
`;

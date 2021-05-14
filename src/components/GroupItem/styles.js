import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  border-radius: 10px;
  padding: 1.2rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
  color: var(--blue);
  font-weight: 500;
  height: 180px;
  margin-top: 0.8rem;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.95);
  }

  * {
    word-wrap: break-word;
  }

  h1 {
    font-size: 1.2rem;
  }

  h2 {
    font-size: 0.7rem;
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

  @media (min-width: 375px) {
    width: 48%;
  }

  @media (min-width: 768px) {
    width: 32%;
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

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

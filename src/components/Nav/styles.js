import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background: var(--green);
`;
export const Content = styled.div`
  width: 90%;
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  color: #fff;

  * {
    font-size: 1.2rem;
    font-weight: 500;
  }

  .navBar {
    width: 100%!important;
    padding: 0;
  }
`;

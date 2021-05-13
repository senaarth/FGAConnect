import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  width: 90%;
  max-width: 1120px;
  margin: 0 auto;

  p {
      margin: 0;
  }

  @media (min-width: 768px) {
    align-items: flex-start;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h2 {
    color: var(--blue);
  }

  h5 {
    font-size: 1rem;
  }

  p {
    width: 70%;
    max-width: 400px;
  }

  @media (min-width: 768px) {
    align-items: flex-start;
    text-align: left;
  }
`;

export const StudentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 280px;
  margin: 0 auto;
  margin-top: 2rem;

  & > div {
    background-color: #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.8rem;

    h5 {
        color: var(--blue);
        font-size: 1rem;
    }

    p {
        font-size: 0.8rem;
        text-align: center;
    }
  }

  div + div {
    margin-top: 1.5rem;
  }

  @media (min-width: 768px) {
    width: 40%;
    margin: 0;
  }

  .adminWaitingList {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    width: 95%;
    
    div {
      margin-top: 0!important;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      * + * {
        margin-left: 5px;
      }

      a {
        cursor: pointer;
      }
    }
  }
`;

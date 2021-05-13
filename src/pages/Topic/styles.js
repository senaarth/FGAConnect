import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 1134px;
  margin: 0 auto;
  padding: 4rem 0;

  .inputContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 600px;

    input{
      width: 100%;
    }

    button {
      margin: 0 auto;
      margin-top: 1rem;
      width: 40%;
    }

    margin-bottom: 1.5rem;
  }

  .commentsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 600px;

    .commentItem {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      background: #fff;
      border-radius: 10px;
      padding: 1.2rem;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
      color: var(--blue);
      font-weight: 500;

      & + div {
        margin-top: 1rem;
      }

      p {
        font-size: 1rem;
        margin: 0;
      }

      p + p {
        font-size: 0.8rem;
      }

      .commentLikes {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: var(--green);
        height: 15px;

        p {
          font-size: 15px;
          margin: auto 0;
          margin-right: 0.3rem;
          line-height: 15px;
        }
      }
    }
  }
`;

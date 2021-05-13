import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 600px;
    margin: 0 auto;
    padding: 4rem 0;

    h1 {
        color: var(--green);
        font-size: 2rem;
    }

    input {
        width: 100%;
        margin-top: 1rem;
    }

    button {
        margin: 0 auto;
        margin-top: 1rem;
        width: 40%;
        min-width: 200px;
    }
`;
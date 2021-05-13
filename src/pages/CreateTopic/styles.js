import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 500px;
    margin: 0 auto;
    padding: 4rem 0;
    text-align: center;

    h1 {
        font-size: 3rem;
        color: var(--green);
        margin-bottom: 0;
    }

    h5 {
        font-size: 1rem;
        margin-bottom: 1rem;
    }

    input,
    button {
        width: 100%;
        margin-top: 1rem;
    }

    input + input {
        margin-top: 1rem;
    }
`;
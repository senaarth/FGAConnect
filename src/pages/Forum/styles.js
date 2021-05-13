import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem 0;
    width: 90%;
    max-width: 1134px;
    margin: 0 auto;

    .inputsContainer {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 550px;
        justify-content: space-between;
        padding-bottom: 3rem;

        input, button {
            width: 100%;
            margin-top: 1.5rem;
        }

        @media (min-width: 768px) {
            flex-direction: row;

            input {
                width: 65%;
            }

            button {
                width: 30%;
            }
        }
    }
`;
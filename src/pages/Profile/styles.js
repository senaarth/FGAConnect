import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    text-align: center;

    h2 {
        margin-top: 2rem;
        color: var(--blue) !important;
    }

    .createGroup {
        color: var(--green);
        text-decoration: none;

        transition: filter 0.2s;

        &.hover {
            filter: brightness(0.8);
        }
    }
`;

export const GroupsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    width: 90%;
    max-width: 700px;
    margin-top: 0.6rem;

    div {
        margin-top: 1.4rem;
    }
`;
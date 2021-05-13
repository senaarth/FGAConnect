import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --background: #f0f2f5;
        --red: #E52E4D;
        --green: #008940;
        --dark-green: #3D550C;
        --light-green: #81B622;
        --text-tile: #363F5F;
        --text-body: #969CB3;
        --blue: #133e79;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        @media (max-width: 720px) {
            font-size: 0.975rem;
        }
        @media (max-width: 1080px) {
            font-size: 0.9375rem;
        }
    }

    body {
        background: var(--background);
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, bold {
        font-weight: 600;
    }
    
    button { 
        cursor: pointer;
        background: var(--blue);
        color: white;
        font-size: 1rem;
        font-weight: 600;
        letter-spacing: 1px;

        transition: filter 0.4s;

        &:hover {
            filter: brightness(0.7);
        }
    }

    input, select, button {
        border: 0;
        border-radius: 8px;
        padding: 1rem;
        outline: none;
    }

    select {
        background-color: white;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .modalTitle {
        color: var(--blue);
        font-size: 1.4rem;
    }

    .sendSolicitation {
        text-decoration: none;
        font-size: 1rem;
        margin-top: 0.4rem;
        color: var(--blue) !important;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none !important;
    }
`;

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Montserrat Variable', sans-serif;
    background-color: #f9f9f9;
    color: #333;
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Merriweather', serif;
    margin: 1.5rem 0 1rem;
    color: #222;
  }

  a {
    color: #007acc;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  p {
    margin: 0 0 1.5rem;
  }

  code {
    font-family: 'Courier New', Courier, monospace;
    background: #f4f4f4;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
  }
`;

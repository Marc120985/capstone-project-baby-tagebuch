import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

export default function Homepage() {
    return <>
        <SyledHeader>
            <h1>Willkommen bei deinem Baby Tagebuch</h1>
        </SyledHeader>
        <main>
            <Link to={"/babyoverview"}>Auswahl Baby</Link>

        </main>
        <footer></footer>
    </>;
}


const SyledHeader = styled.header`
  display: flex;
  justify-content: center;

  h1 {
    font-family: ubuntu, sans-serif;
  }
`


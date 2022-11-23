import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";


export default function Homepage() {
    return <>
        <StyledHeader>
            <h1>Willkommen bei deinem Baby Tagebuch</h1>
        </StyledHeader>
        <main>
            <StyledDiv>
                <StyledImg src={process.env.PUBLIC_URL + '/BabyDiary_k.png'} alt="Baby"/>
            </StyledDiv>
            <Link to={"/babyoverview"}>Auswahl Baby</Link>

        </main>
        <footer></footer>
    </>;
}


const StyledHeader = styled.header`
  background-color: var(--color-white);
  display: flex;
  justify-content: center;

  h1 {
    font-family: ubuntu, sans-serif;
  }
`

const StyledImg = styled.img`
  width: 80%;
  height: 80%;
  justify-content: center;
`

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
`

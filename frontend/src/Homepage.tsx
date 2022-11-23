import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";


export default function Homepage() {
    return <>
        <StyledHeader>
            <h1>Dein Baby Tagebuch</h1>
        </StyledHeader>
        <main>
            <StyledDiv>
                <StyledImg src={process.env.PUBLIC_URL + '/BabyDiary_k.png'} alt="Baby"/>
            </StyledDiv>
            <StyledDiv2>
                <StyledButton><StyledLink to={"/babyoverview"}>Eingang</StyledLink></StyledButton>
            </StyledDiv2>
        </main>
        <footer></footer>
    </>;
}


const StyledHeader = styled.header`
  background-color: var(--color-white);
  display: flex;
  justify-content: center;

  h1 {
    font-family: Gistesy, sans-serif;
    font-size: 3.5rem;
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

const StyledDiv2 = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;
  background-color: white;
`
const StyledLink = styled(Link)`
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 5rem;
  padding-right: 5rem;
  background-color: var(--color-background);
  display: flex;
  justify-content: center;
  border-radius: 1rem;
  color: var(--color-white);
  font-family: Ubuntu, sans-serif;
  text-decoration: none;
`
const StyledButton = styled.button`
  border: none;
  background-color: transparent;
`

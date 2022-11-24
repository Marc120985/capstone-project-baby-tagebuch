import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";


export default function Homepage() {
    return <>
        <StyledHeader>
            <h1>Dein Baby Tagebuch</h1>
        </StyledHeader>
        <StyledMain>
            <StyledImg src={process.env.PUBLIC_URL + '/BabyDiary_k.png'} alt="Baby"/>
            <StyledButton><StyledLink to={"/babyoverview"}>Eingang</StyledLink></StyledButton>
        </StyledMain>
        <footer></footer>
    </>;
}


const StyledHeader = styled.header`
  background-color: var(--color-white);
  display: flex;
  justify-content: center;
`
const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-white);
`

const StyledImg = styled.img`
  width: 80%;
  height: 80%;
  justify-content: center;
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
  padding-top: 1rem;
  padding-bottom: 1rem;
`

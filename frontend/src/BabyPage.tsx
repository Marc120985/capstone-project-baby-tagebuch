import React from 'react';
import {BabyModel} from "./BabyModel";
import {useParams} from "react-router";
import styled from "styled-components";
import {Link} from "react-router-dom";

type babyProps = { babies: BabyModel[] }

export default function BabyPage(props: babyProps) {

    const params = useParams()
    const id = params.id;

    if (!id) {
        return <div>ID Error</div>
    }

    const foundBaby = props.babies.find(element => element.id === id)

    if (!foundBaby) {
        return <div>Baby nicht gefunden</div>
    }


    return <>
        <StyledHeader>
            <h1>{foundBaby.name}</h1>
        </StyledHeader>
        <StyledSection>
            <StyledH4>Geburtstag</StyledH4>
            <StyledP>{foundBaby.birthday}</StyledP>
            <StyledH4>Gewicht in Gramm</StyledH4>
            <StyledP>{foundBaby.weight}</StyledP>
            <StyledH4>Größe in Zentimetern</StyledH4>
            <StyledP>{foundBaby.height}</StyledP>
            <StyledH4>Geschlecht</StyledH4>
            <StyledP>{foundBaby.gender}</StyledP>
        </StyledSection>
        <StyledSection2>
            <StyledButton>Essen</StyledButton>
            <StyledButton>Schlafen</StyledButton>
        </StyledSection2>
        <StyledSection2>
            <StyledButton3>Update Baby</StyledButton3>
            <StyledButton3>Delete Baby</StyledButton3>
        </StyledSection2>
        <StyledButton2>
            <StyledLink2 to={"/Babyoverview"}>Alle Baby's</StyledLink2>
        </StyledButton2>
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
const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  align-items: center;
`
const StyledLink2 = styled(Link)`
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
  margin: 0.5rem;
  border: 1px solid white;
`
const StyledButton2 = styled.button`
  border: none;
  background-color: transparent;
  width: 100%;
`

const StyledH4 = styled.h4`
  font-family: Gistesy, sans-serif;
  font-size: 2.6rem;
  color: var(--color-background);
  text-shadow: 1px 1px 1px black;
  margin-block-start: 0;
  margin-block-end: 0;
`

const StyledP = styled.p`
  font-family: ubuntu, sans-serif;
  font-size: 1.5rem;
  color: var(--color-black);
  text-shadow: 1px 1px 1px var(--color-background);
  padding: 5px 20px 5px 20px;
  border: 1px solid var(--color-background);
  border-radius: 1rem;
`
const StyledSection2 = styled.section`
  display: flex;
  justify-content: center;
  background-color: white;
`

const StyledButton = styled.button`
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 5rem;
  padding-right: 5rem;
  background-color: var(--color-background);
  border: none;
  border-radius: 1rem;
  margin: 0.5rem;
  color: var(--color-white);
  font-family: ubuntu, sans-serif;
`
const StyledButton3 = styled.button`
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 5rem;
  padding-right: 5rem;
  background-color: transparent;
  border: 1px solid var(--color-background);
  border-radius: 1rem;
  margin: 0.5rem;
  color: var(--color-background);
  font-family: ubuntu, sans-serif;
`

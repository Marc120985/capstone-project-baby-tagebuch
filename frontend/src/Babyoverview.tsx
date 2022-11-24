import React, {} from 'react';
import {Link} from "react-router-dom";
import {BabyModel} from "./BabyModel";
import styled from "styled-components";


type BabyoverviewProps = {
    babies: BabyModel[]
}

export default function Babyoverview(props: BabyoverviewProps) {

    return <>
        <StyledHeader>
            <h1>Deine Baby`s</h1>
        </StyledHeader>
        <StyledSection>
            <StyledUl>{props.babies.map((baby: BabyModel) => <StyledLi><StyledButton><StyledLink
                to={"/baby/" + baby.id}>{baby.name}</StyledLink></StyledButton></StyledLi>)}</StyledUl>
        </StyledSection>
        <StyledSection>
            <StyledButton><StyledLink to={"/newbaby"}>Neues Baby anlegen</StyledLink></StyledButton>
        </StyledSection>
        <StyledButton2>
            <StyledLink2 to={"/"}>Zurück zur Übersicht</StyledLink2>
        </StyledButton2>
    </>;
}

const StyledHeader = styled.header`
  background-color: var(--color-white);
  display: flex;
  justify-content: center;
`

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  background-color: white;
`

const StyledLi = styled.li`
  display: flex;
  justify-content: center;
  background-color: white;
  list-style: none;
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
  margin: 0.5rem;
`

const StyledUl = styled.ul`
  padding: 0;
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
const StyledButton = styled.button`
  border: none;
  background-color: transparent;
`
const StyledButton2 = styled.button`
  border: none;
  background-color: transparent;
  width: 100%;
`

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
            <ul>{props.babies.map((baby: BabyModel) => <StyledLi><StyledLink
                to={"/baby/" + baby.id}>{baby.name}</StyledLink></StyledLi>)}</ul>
        </StyledSection>
        <Link to={"/newbaby"}>Neues Baby anlegen</Link><br/>
        <Link to={"/"}>Zurück zur Übersicht</Link><br/>
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
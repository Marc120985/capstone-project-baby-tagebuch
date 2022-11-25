import React, {FormEvent} from 'react';
import {BabyModel} from "./BabyModel";
import {useParams} from "react-router";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

type babyProps = {
    babies: BabyModel[],
    getAllBabies: () => void
}

export default function BabyPage(props: babyProps) {

    const params = useParams()
    const id = params.id;
    const navigate = useNavigate();

    if (!id) {
        return <div>ID Error</div>
    }

    const foundBaby = props.babies.find(element => element.id === id)

    if (!foundBaby) {
        return <div>Baby nicht gefunden</div>
    }

    function deleteBaby(event: FormEvent<HTMLButtonElement>) {
        event.preventDefault()
        axios.delete("/api/babies/" + id)
            .then(props.getAllBabies)
            .then(() => navigate("/babyoverview"))
            .catch(error => console.log("DELETE Error: " + error))
    }


    return <>
        <StyledHeader>
            <h1>{foundBaby.name}</h1>
        </StyledHeader>
        <StyledSection>
            <StyledLabel htmlFor="name">Geburtstag</StyledLabel>
            <StyledP>{foundBaby.birthday}</StyledP>
            <StyledLabel htmlFor="weight">Gewicht in Gramm</StyledLabel>
            <StyledP>{foundBaby.weight}</StyledP>
            <StyledLabel htmlFor="height">Größe in Zentimeter</StyledLabel>
            <StyledP>{foundBaby.height}</StyledP>
            <StyledLabel htmlFor="gender">Geschlecht</StyledLabel>
            <StyledP>{foundBaby.gender}</StyledP>
        </StyledSection>
        <StyledSection2>
            <StyledButton>Essen</StyledButton>
            <StyledButton>Schlafen</StyledButton>
        </StyledSection2>
        <StyledSection2>
            <StyledButton3 onClick={deleteBaby}>Löschen</StyledButton3>
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


const StyledP = styled.p`
  font-family: Gruenewald_VA_normal, sans-serif;
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
  border: 1px solid var(--color-deleteRed);
  border-radius: 1rem;
  margin: 0.5rem;
  color: var(--color-deleteRed);
  font-family: ubuntu, sans-serif;
`
const StyledLabel = styled.label`
  font-family: KGPrimaryPenmanshipLined, sans-serif;
  font-size: 2.6rem;
  color: var(--color-background);
  text-shadow: 1px 1px 1px black;
  margin-block-start: 0;
  margin-block-end: 0;
`

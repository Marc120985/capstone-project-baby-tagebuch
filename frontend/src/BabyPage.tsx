import React from 'react';
import {BabyModel} from "./BabyModel";
import {useParams} from "react-router";
import styled from "styled-components";

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
            <div>
            <p>{foundBaby.birthday}</p>
            </div>
            <div>
            <p>{foundBaby.weight}</p>
            </div>
            <p>{foundBaby.height}</p>
            <p>{foundBaby.gender}</p>
            <button>Update Baby</button>
            <button>Delete Baby</button>
            <button>Essen</button>
            <button>Schlafen</button>
        </StyledSection>
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
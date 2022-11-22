import React from 'react';
import {BabyModel} from "./BabyModel";
import {useParams} from "react-router";

type babyProps = {babies: BabyModel[]}

export default function BabyPage(props: babyProps) {

    const params = useParams()
    const id = params.id;

    if(!id) {
        return <div>ID Error</div>
    }

    const foundBaby = props.babies.find(element => element.id === id)

    if(!foundBaby){
        return <div>Baby nicht gefunden</div>
    }


    return <>
        <div>
            <h4>Hallo</h4>
            <p>{foundBaby.name}</p>
            <p>{foundBaby.birthdate}</p>
            <p>{foundBaby.weight}</p>
            <p>{foundBaby.height}</p>
            <p>{foundBaby.gender}</p>
            <button>Update Baby</button>
            <button>Delete Baby</button>
            <button>Essen</button>
            <button>Schlafen</button>
        </div>
    </>;
}

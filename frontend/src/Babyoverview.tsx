import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {BabyModel} from "./BabyModel";

type BabyoverviewProps = {babies: BabyModel[]}

export default function Babyoverview(props: BabyoverviewProps) {

        return <>
            <h1>Baby Overview</h1>
            <section>
                <ul>{props.babies.map((baby: BabyModel) => <li><Link to={"/baby/" + baby.id}>{baby.name}</Link></li>)}</ul>
            </section>
            <Link to={"/newbaby"}>Neues Baby anlegen</Link><br/>
            <Link to={"/"}>Zurück zur Übersicht</Link><br/>
            </>;
    }



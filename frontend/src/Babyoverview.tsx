import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

export default function Babyoverview() {
    const [babyname, setBabyname] = useState("")
    const [babies, setBabies] = useState([])

    useEffect(() => {
        getAllBabys()
    }, [])


    const getAllBabys = () => {
        axios.get("/api/baby")
            .then((response) => {
                setBabies(response.data)
            })
            .catch((e) => console.log("GET ERROR: " + e))}


        const postNewBaby = () => {
            axios.post("/api/baby", {
                name: babyname
            })
                .then(getAllBabys)
            setBabyname("")
        }


        return <>
            <h1>Baby Overview</h1>
            <section>
                <ul>{babies.map((baby: any) => <li key={baby.id}>{baby.name}</li>)}</ul>
                <form onSubmit={postNewBaby}>
                    <label htmlFor="babyname">Name deines Baby's</label>
                    <input id="babyname" onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setBabyname(event.target.value)}>
                    </input>
                    <button type="submit">Senden</button>
                </form>
            </section>
            <Link to={"/newbaby"}>Neues Baby anlegen</Link><br/>
            <Link to={"/"}>Zurück zur Übersicht</Link><br/>
            </>;
    }



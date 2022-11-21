import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from "axios";

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
                <form onSubmit={postNewBaby}>
                    <label htmlFor="babyname">Name deines Baby's</label>
                    <input id="babyname" onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setBabyname(event.target.value)}>
                    </input>
                    <button type="submit">Senden</button>
                </form>
            </section>
            </>;
    }



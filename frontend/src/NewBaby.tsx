import React, {FormEvent} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

export default function NewBaby() {

    const [newBaby, setNewBaby] = React.useState(
        {
            name: "",
            birthday: "",
            weight: "",
            height: "",
            gender: "",
        });

    const baseUrl = '/api/baby';

    const postNewBaby = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post(baseUrl, newBaby)
            .then(function (response) {
                console.log(response);
            })
            .catch((e) => console.log("POST ERROR: " + e))
        setNewBaby({name: "", birthday: "", weight: "", height: "", gender: ""});
    }

    function handleChange(event: any) {
        setNewBaby({...newBaby, [event.target.name]: event.target.value});
    }



    return <>
        <h2>Mein neues Baby anlegen</h2>
        <form onSubmit={postNewBaby}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={newBaby.name} onChange={handleChange} placeholder={"John"}/>
            <label htmlFor="birthday">Geburtstag</label>
            <input id="birthday" name="birthday" value={newBaby.birthday} onChange={handleChange} placeholder={"01.01.2022"}/>
            <label htmlFor="weight">Gewicht</label>
            <input id="weight" name="weight" value={newBaby.weight} onChange={handleChange} placeholder={"Gewicht in Gramm"}/>
            <label htmlFor="height">Größe</label>
            <input id="height" name="height" value={newBaby.height} onChange={handleChange} placeholder={"Größe in cm"}/>
            <label htmlFor="gender">Geschlecht</label>
            <input id="gender" name="gender" value={newBaby.gender} onChange={handleChange} placeholder={"m/w/d"}/>
            <button type="submit">Speichern</button>
        </form>
        <Link to={"/"}>Zurück zur Übersicht</Link><br/>
    </>;
}

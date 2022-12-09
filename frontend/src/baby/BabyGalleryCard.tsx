import React, {useState} from 'react';
import {GalleryPictureModel} from "./GalleryPictureModel";
import styled from "styled-components";
import axios from "axios";
import {BabyModel} from "./BabyModel";


type BabyGalleryCardProps = {
    picture: GalleryPictureModel
    baby: BabyModel
    getAllBabies: () => void
}

export default function BabyGalleryCard(props: BabyGalleryCardProps) {

    const [messageStatus, setMessageStatus] = useState("");
    const [error, setError] = useState("");

    function deletePicture() {
        axios.delete("/api/babies/picturegallery/" + props.baby.id, {
            data: {
                name: props.picture.name,
                url: props.picture.url
            }
        })
            .then((response) => response)
            .then((response) => {
                if (response.status === 200) {
                    setMessageStatus("Bild erfolgreich gelöscht");
                    (setTimeout(() => {
                        setMessageStatus("")
                    }, 2000));
                    (setTimeout(() => {
                        props.getAllBabies()
                    }, 2000));
                }
            })

            .catch((error) => {
                if (error.response.status === 400) {
                    setError("Fehler beim löschen, bitte versuche es erneut");
                    (setTimeout(() => setError(""), 3000));
                }
                console.log("Error =>" + error)
            })


    }

    return <StyledLi key={props.picture.name}>
        <StyledImg2 src={props.picture.url} alt="Foto"/>
        <button onClick={() => deletePicture()}>Bild löschen</button>
        {messageStatus && <p>{messageStatus}</p>}
        {error && <p>{error}</p>}
    </StyledLi>

        ;
}


const StyledLi = styled.li`
  display: flex;
  justify-content: center;
  background-color: white;
  list-style: none;
`
const StyledImg2 = styled.img`
  width: 80%;
  height: 100%;
  object-fit: cover;
  margin: 1rem 0 0 0;
  border-radius: 1rem;
`


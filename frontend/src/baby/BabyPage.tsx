import React, {FormEvent, useEffect, useState} from 'react';
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

    const fileStartUrl = "/api/pictures/files/";
    const params = useParams()
    const id = params.id;
    const navigate = useNavigate();
    const [editBaby, setEditBaby] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isUpload, setIsUpload] = useState(false);
    const searchBaby = props.babies.find(element => element.id === id)
    const [baby, setBaby] = useState<BabyModel>({
        id: "",
        name: "",
        birthday: "",
        weight: "",
        height: "",
        gender: "",
        profilePicture: {name: "baby_placeholder.jpeg", url: "/api/pictures/files/baby_placeholder.jpeg",},
        pictureGallery: []
    });
    const [updateName, setUpdateName] = useState(baby.name)
    const [updateBirthday, setUpdateBirthday] = useState(baby.birthday)
    const [updateWeight, setUpdateWeight] = useState(baby.weight)
    const [updateHeight, setUpdateHeight] = useState(baby.height)
    const [updateGender, setUpdateGender] = useState(baby.gender)
    const [file, setFile] = useState<FileList | null>(null)
    const [fileName, setFileName] = useState(baby.profilePicture.name)
    const [fileUrl, setFileUrl] = useState(baby.profilePicture.url)
    const [messageStatus, setMessageStatus] = useState("");
    const [error, setError] = useState("");
    let fileData = new FormData();

    useEffect(() => {
        setBaby(searchBaby ? searchBaby : {
            id: "",
            name: "",
            birthday: "",
            weight: "",
            height: "",
            gender: "",
            profilePicture: {name: "baby_placeholder.jpeg", url: "/api/pictures/files/baby_placeholder.jpeg"},
            pictureGallery: []
        })
    }, [searchBaby])

    useEffect(() => {
        setUpdateName(baby.name)
        setUpdateBirthday(baby.birthday)
        setUpdateWeight(baby.weight)
        setUpdateHeight(baby.height)
        setUpdateGender(baby.gender)
        setFileName(baby.profilePicture.name)
        setFileUrl(baby.profilePicture.url)
    }, [baby]);

    const profilePicture = {
        name: fileName,
        url: fileUrl
    }

    const babyToUpdate = {
        id: id,
        name: updateName,
        birthday: updateBirthday,
        weight: updateWeight,
        height: updateHeight,
        gender: updateGender,
        profilePicture
    }

    fileData.append("file", file ? file[0] : new File([""], "baby_placeholder.jpeg"));

    function uploadBabyPic() {
        axios.post("/api/pictures/upload", fileData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => response)
            .then((response) => {
                if (response.request.response) {
                    setFileName(response.request.response);
                }
                if (response.status === 200) {
                    setMessageStatus("Bild erfolgreich hochgeladen");
                    (setTimeout(() => {
                        setMessageStatus("")
                    }, 2000));
                    (setTimeout(() => setIsUpload(false), 2000));
                }
            })
            .catch((error) => {
                if (error.response.status === 417) {
                    setError("Fehler beim hochladen, bitte versuche es erneut");
                    (setTimeout(() => setError(""), 5000));
                }
                console.log("Error =>" + error)
            })
    }

    let constructFileUrl = () => {
        setFileUrl(fileStartUrl.concat(fileName ? fileName : "baby_placeholder.jpeg"))
    }

    useEffect(constructFileUrl, [fileName])

    function setIsUploadBabyPic() {
        setIsUpload(true)
        setEditBaby(true)
    }

    function deleteBaby(event: FormEvent<HTMLButtonElement>) {
        event.preventDefault()
        axios.delete("/api/babies/" + id)
            .then(props.getAllBabies)
            .then(() => navigate("/babyoverview"))
            .catch(error => console.log("DELETE Error: " + error))
    }

    const updateBabyGo = () => {
        axios.put("/api/babies/" + id, babyToUpdate)
            .then(props.getAllBabies)
            .then(() => setEditBaby(false))
            .catch(error => console.log("Edit Error: " + error))
    }
    const updateBabyToBackend = (event: any) => {
        event.preventDefault()
        updateBabyGo()
    }

    function handleEditPage() {
        setEditBaby(true);
    }

    if (editBaby) {
        return <>
            {isDelete && (
                <StyledDiv>
                    <StyledDiv2>
                        <StyledP2>Möchtest du wirklich dein Baby {baby.name} löschen?</StyledP2>
                        <StyledDiv3>
                            <StyledButton1 onClick={() => setIsDelete(false)}>Abbrechen</StyledButton1>
                            <StyledButton3 onClick={deleteBaby}>Löschen</StyledButton3>
                        </StyledDiv3>
                    </StyledDiv2>
                </StyledDiv>
            )}
            {isUpload && (
                <StyledDiv>
                    <StyledDiv2>
                        <StyledP2>Wähle dein Profilbild für dein Baby {baby.name} aus.</StyledP2>
                        <input type={"file"} accept={"image/*"} onChange={(e) => setFile(e.target.files)}/>
                        <StyledDiv3>
                            <StyledButton1 onClick={() => setIsUpload(false)}>Abbrechen</StyledButton1>
                            <StyledButton3 onClick={uploadBabyPic}>Hochladen</StyledButton3>
                        </StyledDiv3>
                        {messageStatus && <StyledP2>{messageStatus}</StyledP2>}
                    </StyledDiv2>
                </StyledDiv>
            )}
            <StyledForm onSubmit={updateBabyToBackend}>
                <StyledHeader2>
                    <StyledInputH1 value={updateName} onChange={(e) => setUpdateName(e.target.value)}/>
                    <StyledDivUploadButton>
                        <StyledImg src={fileUrl} alt={"Baby Bild"}/>
                    </StyledDivUploadButton>
                </StyledHeader2>
                <StyledLabel htmlFor="birthday">Geburtstag</StyledLabel>
                <StyledInput id="birthday" value={updateBirthday}
                             onChange={(e) => setUpdateBirthday(e.target.value)}></StyledInput>
                <StyledLabel htmlFor="weight">Gewicht in Gramm</StyledLabel>
                <StyledInput id="weight" value={updateWeight}
                             onChange={(e) => setUpdateWeight(e.target.value)}></StyledInput>
                <StyledLabel htmlFor="height">Größe in Zentimeter</StyledLabel>
                <StyledInput id="height" value={updateHeight}
                             onChange={(e) => setUpdateHeight(e.target.value)}></StyledInput>
                <StyledLabel htmlFor="gender">Geschlecht</StyledLabel>
                <StyledInput id="gender" value={updateGender}
                             onChange={(e) => setUpdateGender(e.target.value)}></StyledInput>
            </StyledForm>
            <StyledSection2>
                <StyledButton onClick={setIsUploadBabyPic}>Profilbild hochladen</StyledButton>
            </StyledSection2>
            <StyledSection2>
                <StyledButton1 onClick={updateBabyToBackend}>Speichern</StyledButton1>
                <StyledButton3 onClick={() => setIsDelete(true)}>Löschen</StyledButton3>
            </StyledSection2>
            <StyledButton2>
                <StyledLink2 to={"/Babyoverview"}>Alle Baby's</StyledLink2>
            </StyledButton2>
        </>
    }

    function handleGoToGallery(e: FormEvent<HTMLButtonElement>) {
        e.preventDefault()
        navigate("/babygallery/" + id)
    }

    return <>
        <StyledHeader>
            <h1>{baby.name}</h1>
            <StyledDivUploadButton>
                <StyledImg src={fileUrl} alt={"Baby Bild"}/>
            </StyledDivUploadButton>
        </StyledHeader>
        <StyledSection>
            <StyledLabel htmlFor="name">Geburtstag</StyledLabel>
            <StyledP>{baby.birthday}</StyledP>
            <StyledLabel htmlFor="weight">Gewicht in Gramm</StyledLabel>
            <StyledP>{baby.weight}</StyledP>
            <StyledLabel htmlFor="height">Größe in Zentimeter</StyledLabel>
            <StyledP>{baby.height}</StyledP>
            <StyledLabel htmlFor="gender">Geschlecht</StyledLabel>
            <StyledP>{baby.gender}</StyledP>
        </StyledSection>
        <StyledSection2>
            <StyledButton1 onClick={handleEditPage}>Ändern</StyledButton1>
            <StyledButton1 onClick={handleGoToGallery}>Fotoalbum</StyledButton1>
        </StyledSection2>
        <StyledButton2>
            <StyledLink2 to={"/Babyoverview"}>Alle Baby's</StyledLink2>
        </StyledButton2>
    </>;
}

const StyledDivUploadButton = styled.div`
  width: 22%;
  height: 22%;
  cursor: pointer;
`

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`

const StyledHeader = styled.header`
  background-color: var(--color-white);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const StyledHeader2 = styled.header`
  background-color: var(--color-white);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 0 35px 0;
`

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  align-items: center;
`

const StyledLink2 = styled(Link)`
  padding: 1rem 5rem;
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
  cursor: pointer;
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
  flex-wrap: wrap;
  background-color: white;
`

const StyledButton = styled.button`
  padding: 1rem 5rem;
  background-color: var(--color-background);
  border: none;
  border-radius: 1rem;
  margin: 0.5rem;
  color: var(--color-white);
  font-family: ubuntu, sans-serif;
  cursor: pointer;
`

const StyledButton1 = styled.button`
  padding: 1rem 5rem;
  background-color: transparent;
  border: 1px solid var(--color-background);
  border-radius: 1rem;
  margin: 0.5rem;
  color: var(--color-background);
  font-family: ubuntu, sans-serif;
  cursor: pointer;
`

const StyledLabel = styled.label`
  font-family: KGPrimaryPenmanshipLined, sans-serif;
  font-size: 2.6rem;
  color: var(--color-background);
  text-shadow: 1px 1px 1px black;
  margin-block-start: 0;
  margin-block-end: 0;
`

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  align-items: center;
`

const StyledInput = styled.input`
  font-family: Gruenewald_VA_normal, sans-serif;
  font-size: 1.5rem;
  color: var(--color-black);
  text-shadow: 1px 1px 1px var(--color-background);
  padding: 5px 20px 5px 20px;
  border: 1px solid var(--color-background);
  border-radius: 1rem;
  margin: 1.5rem;
`

const StyledInputH1 = styled.input`
  font-family: Gistesy, sans-serif;
  @media (min-width: 600px) {
    font-size: 3.2rem;
  }
  @media (min-width: 801px) {
    font-size: 3.5rem;
  }
  color: var(--color-black);
  text-shadow: 1px 1px 1px var(--color-background);
  padding: 5px 20px 5px 20px;
  border: 1px solid var(--color-background);
  border-radius: 1rem;
  margin: 1.5rem;
`

const StyledButton3 = styled.button`
  padding: 1rem 5rem;
  background-color: transparent;
  border: 1px solid var(--color-deleteRed);
  border-radius: 1rem;
  margin: 0.5rem;
  color: var(--color-deleteRed);
  font-family: ubuntu, sans-serif;
  cursor: pointer;
`

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  justify-content: center;
  margin: 0;
`

const StyledDiv2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-items: center;
  justify-self: center;
  align-self: center;
  padding: 20px;
  width: 100%;
  max-width: 640px;
  background-color: #fff;
`

const StyledDiv3 = styled.div`
  color: #638e93;
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  padding: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
`

const StyledP2 = styled.p`
  font-family: KGPrimaryPenmanshipLined, sans-serif;
  font-size: 2.6rem;
  color: var(--color-background);
  text-shadow: 1px 1px 1px black;
  margin-block-start: 0;
  margin-block-end: 0;
  text-align: center;
  padding: 20px;
`

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
    const foundBaby = props.babies.find(element => element.id === id)
    const foundedBaby = foundBaby ? foundBaby : {id: "", name: "", birthday: "", weight: "", height: "", gender: ""}
    const [updateName, setUpdateName] = useState(foundedBaby.name)
    const [updateBirthday, setUpdateBirthday] = useState(foundedBaby.birthday)
    const [updateWeight, setUpdateWeight] = useState(foundedBaby.weight)
    const [updateHeight, setUpdateHeight] = useState(foundedBaby.height)
    const [updateGender, setUpdateGender] = useState(foundedBaby.gender)
    const [file, setFile] = useState<FileList | null>(null)
    const [fileName, setFileName] = useState(props.babies.find(element => element.id === id)?.profilePicture.name)
    const [fileUrl, setFileUrl] = useState(props.babies.find(element => element.id === id)?.profilePicture.url)
    let fileData = new FormData();

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


    fileData.append("file", file ? file[0] : new File([""], "empty"));

    function uploadBabyPic() {
        axios.post("/api/pictures/upload", fileData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => setFileName(response.request.response.split('"')[3]))
            .then(() => setIsUpload(false))
            .then(() => setTimeout(() => constructFileUrl(), 20))
            .catch(error => console.log("Upload Error: " + error));

    }

    let constructFileUrl = () => {
        setFileUrl(fileStartUrl.concat(fileName ? fileName : "empty"))

    }
    useEffect(constructFileUrl, [uploadBabyPic])

    function setIsUploadBabyPic() {
        setIsUpload(true)
        setEditBaby(true)
    }


    if (!id) {
        return <div>ID Error</div>
    }

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


    console.log(fileName)
    console.log(fileUrl)


    if (editBaby) {
        return <>
            {isDelete && (
                <StyledP2>
                    <StyledP3>
                        <StyledP5>Möchtest du wirklich dein Baby <br/>
                            {foundBaby.name} löschen?</StyledP5>
                        <StyledP4>
                            <StyledButton1 onClick={() => setIsDelete(true)}>Abbrechen</StyledButton1>
                            <StyledButton3 onClick={deleteBaby}>Löschen</StyledButton3>
                        </StyledP4>
                    </StyledP3>
                </StyledP2>
            )}
            {isUpload && (
                <StyledP2>
                    <StyledP3>
                        <StyledP5>Wähle dein Profilbild für dein Baby <br/>
                            {foundBaby.name} aus.</StyledP5>
                        <input type={"file"} onChange={(e) => setFile(e.target.files)}/>
                        <StyledP4>
                            <StyledButton1 onClick={() => setIsUpload(false)}>Abbrechen</StyledButton1>
                            <StyledButton3 onClick={uploadBabyPic}>Hochladen</StyledButton3>
                        </StyledP4>
                    </StyledP3>
                </StyledP2>
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
                <StyledButton>Essen</StyledButton>
                <StyledButton>Schlafen</StyledButton>
            </StyledSection2>
            <StyledSection2>
                <StyledButton1 onClick={updateBabyToBackend}>Speichern</StyledButton1>
                <StyledButton3 onClick={() => setIsDelete(true)}>Löschen</StyledButton3>
                <StyledButton3 onClick={setIsUploadBabyPic}>Profilbild hochladen</StyledButton3>
            </StyledSection2>
            <StyledButton2>
                <StyledLink2 to={"/Babyoverview"}>Alle Baby's</StyledLink2>
            </StyledButton2>
        </>
    }
    return <>
        <StyledHeader>
            <h1>{foundBaby.name}</h1>
            <StyledDivUploadButton>
                <StyledImg src={fileUrl} alt={"Baby Bild"}/>
            </StyledDivUploadButton>
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
            <StyledButton1 onClick={handleEditPage}>Ändern</StyledButton1>
        </StyledSection2>
        <StyledButton2>
            <StyledLink2 to={"/Babyoverview"}>Alle Baby's</StyledLink2>
        </StyledButton2>
    </>;
}


const StyledDivUploadButton = styled.div`

  width: 22%;
  height: 22%;
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

const StyledButton1 = styled.button`
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 5rem;
  padding-right: 5rem;
  background-color: transparent;
  border: 1px solid var(--color-background);
  border-radius: 1rem;
  margin: 0.5rem;
  color: var(--color-background);
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

const StyledP2 = styled.p`
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

const StyledP3 = styled.p`
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

const StyledP4 = styled.p`
  color: #638e93;
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  padding: 10px;
`

const StyledP5 = styled.p`
  font-family: KGPrimaryPenmanshipLined, sans-serif;
  font-size: 2.6rem;
  color: var(--color-background);
  text-shadow: 1px 1px 1px black;
  margin-block-start: 0;
  margin-block-end: 0;
  text-align: center;
`

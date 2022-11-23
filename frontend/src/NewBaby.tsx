import React, {FormEvent} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";

type NewBabyProps = {
    getAllBabies: () => void
}

export default function NewBaby(props: NewBabyProps) {
    const navigate = useNavigate();

    const [newBaby, setNewBaby] = React.useState(
        {
            name: "",
            birthday: "",
            weight: "",
            height: "",
            gender: "",
        });

    const postNewBaby = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post('/api/babies', newBaby)
            .then(function (response) {
                console.log(response);
            })
            .then(props.getAllBabies)
            .then(() => navigate("/babyoverview"))
            .catch((e) => console.log("POST ERROR: " + e))
        setNewBaby({name: "", birthday: "", weight: "", height: "", gender: ""});
    }

    function handleChange(event: any) {
        setNewBaby({...newBaby, [event.target.name]: event.target.value});
    }


    return <>
        <StyledHeader>
            <h1>Unser neuer Nachwuchs</h1>
        </StyledHeader>
        <StyledSection>
            <StyledForm onSubmit={postNewBaby}>
                <StyleDiv>
                    <StyledLabel htmlFor="name">Name</StyledLabel>
                    <StyledInput id="name" name="name" value={newBaby.name} onChange={handleChange}
                                 placeholder={"John"}/>
                    <StyledLabel htmlFor="birthday">Geburtstag</StyledLabel>
                    <StyledInput id="birthday" name="birthday" value={newBaby.birthday} onChange={handleChange}
                                 placeholder={"01.01.2022"}/>
                    <StyledLabel htmlFor="weight">Gewicht</StyledLabel>
                    <StyledInput id="weight" name="weight" value={newBaby.weight} onChange={handleChange}
                                 placeholder={"Gewicht in Gramm"}/>
                    <StyledLabel htmlFor="height">Größe</StyledLabel>
                    <StyledInput id="height" name="height" value={newBaby.height} onChange={handleChange}
                                 placeholder={"Größe in cm"}/>
                    <StyledLabel htmlFor="gender">Geschlecht</StyledLabel>
                    <StyledInput id="gender" name="gender" value={newBaby.gender} onChange={handleChange}
                                 placeholder={"Junge/Mädchen/Divers"}/>
                    <StyledButton type="submit">Speichern</StyledButton>
                </StyleDiv>
            </StyledForm>
        </StyledSection>
        <StyledButton2>
            <StyledLink2 to={"/Babyoverview"}>Alle Baby's</StyledLink2>
        </StyledButton2>
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

const StyledForm = styled.form`
  display: flex;
  align-self: center;
  align-items: center;
`

const StyleDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const StyledLabel = styled.label`
  font-family: Gistesy, sans-serif;
  font-size: 2.6rem;
  color: var(--color-background);
  text-shadow: 1px 1px 1px black;
  margin-block-start: 0;
  margin-block-end: 0;
`
const StyledButton2 = styled.button`
  border: none;
  background-color: transparent;
  width: 100%;
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

const StyledInput = styled.input`
  font-family: ubuntu, sans-serif;
  font-size: 0.8rem;
  color: var(--color-black);
  text-shadow: 1px 1px 1px var(--color-background);
  padding: 5px 20px 5px 20px;
  border: 1px solid var(--color-background);
  border-radius: 1rem;
  margin-bottom: 1rem;
`

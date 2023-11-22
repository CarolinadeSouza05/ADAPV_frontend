import { useEffect, useState } from "react";
import { getByIdRegisterVoluntarioAceitafazer } from "../api";
import "./CheckboxDropdownAcceptToDo.css";

export function CheckboxDropdownAcceptToDo({
  inputs,
  setAcceptToDoHandleVoluntter,
  acceptToDoHandleVoluntter,
  formValidate,
  titleCheckbox,
  type,
  name,
  handleChangeInput,
  setIsOpen,
  isOpen,
}) {
  const [inputsAux, setInputsAux] = useState([]);

  useEffect(() => {
    setInputsAux(inputs);
  }, [inputs]);

  useEffect(() => {
    if (acceptToDoHandleVoluntter?.length === 0 && formValidate.edit !== -1) {
      handleIsCheckedInput();
    }
  }, []);

  return (
    <div className="container-checkbox-dropwodn">
      <div onClick={toggleDropdown} className="select-div">
        {titleCheckbox}
      </div>
      {isOpen && (
        <div
          className="menu-checkbox-dropdown"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {inputsAux?.map((option, index) => (
            <div key={option.id} className="checkbox-item" role="menuitem">
              {console.log(option)}
              <label className="">{option.name}</label>
              <input
                type={type}
                className="input-checkbox-item"
                value={option.id}
                name={name}
                checked={
                  formValidate.edit !== -1 ? checkedOption(option.id) : option.isChecked
                }
                onChange={(e) => handleChangeInput(e, index)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  function checkedOption(optionId) {
    if (acceptToDoHandleVoluntter?.length === 0) {
      const indexOfOption = acceptToDoHandleVoluntter.indexOf(optionId);
      return indexOfOption !== -1 && true;
    }
    else{
      const nameOption = inputs.find((option) => option.id === optionId).name;
      return nameOption === formValidate.id_office;
    }
  }

  async function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  async function handleIsCheckedInput() {
    const auxAcceptToDoHandleVoluntter = [];
    const volunteerAceitaFazer = await getByIdRegisterVoluntarioAceitafazer(
      formValidate.id
    );
    let aux = [];
    if (volunteerAceitaFazer.length !== undefined) {
      aux = inputs.map((input) => {
        volunteerAceitaFazer.forEach((volunteer) => {
          if (volunteer.id_aceitafazer === input.id) {
            input.isChecked = true;
            auxAcceptToDoHandleVoluntter.push(input.id);
          }
        });
        return input;
      });
    } else {
      aux = inputs;
    }
    
    setInputsAux(aux);
    setAcceptToDoHandleVoluntter(
      auxAcceptToDoHandleVoluntter.sort((dado1, dado2) => dado1 - dado2)
    );
  }
}

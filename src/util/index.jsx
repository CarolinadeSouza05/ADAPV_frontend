import { getAllRegisterAcceptToDo, getAllRegisterOffice, getAllRegisterUsers, getAllRegisterVoluntario, getAllRegisterVoluntarioAceitafazer } from "../api";

export const disponibilidadeArray = [
  {
    class: "form-check-input",
    type: "checkbox",
    value: "S",
    id: "segunda",
    label: "Segunda - S",
    labelClass: "form-check-label",
    labelFor: "segunda",
    checked: false,
    name: "disponibilidade",
  },

  {
    class: "form-check-input",
    type: "checkbox",
    value: "T",
    id: "terca",
    label: "Terça - T",
    labelClass: "form-check-label",
    labelFor: "terca",
    checked: false,
    name: "disponibilidade",
  },

  {
    class: "form-check-input",
    type: "checkbox",
    value: "Q",
    id: "quarta",
    label: "Quarta - Q",
    labelClass: "form-check-label",
    labelFor: "quarta",
    checked: false,
    name: "disponibilidade",
  },

  {
    class: "form-check-input",
    type: "checkbox",
    value: "QI",
    id: "quinta",
    label: "Quinta - QI",
    labelClass: "form-check-label",
    labelFor: "quinta",
    checked: false,
    name: "disponibilidade",
  },

  {
    class: "form-check-input",
    type: "checkbox",
    value: "SE",
    id: "sexta",
    label: "Sexta - SE",
    labelClass: "form-check-label",
    labelFor: "sexta",
    checked: false,
    name: "disponibilidade",
  },

  {
    class: "form-check-input",
    type: "checkbox",
    value: "SA",
    id: "sabado",
    label: "Sabádo - SB",
    labelClass: "form-check-label",
    labelFor: "sabado",
    checked: false,
    name: "disponibilidade",
  },
];

export const periodoArray = [
  {
    class: "form-check-input",
    type: "radio",
    value: "Manhã",
    name: "periodo",
    id: "manha",
    label: "Manhã",
    labelClass: "form-check-label",
    labelFor: "manha",
    checked: false,
  },
  {
    class: "form-check-input",
    type: "radio",
    value: "Tarde",
    name: "periodo",
    id: "tarde",
    label: "Tarde",
    labelClass: "form-check-label",
    labelFor: "tarde",
    checked: false,
  },
];

export const listadedenuncias = [
  {
      id:"1",
      rua: "R. das Margaridas ",
      numero: "123",
      cep: "19060-260",
      cidade: "Presidente Prudente",
      observacoes: "Sem comida",
      tel: ""
  },
  {   
      id:"2",
      rua: "R. das Aboboras",
      numero: "321",
      cep: "19060-120",
      cidade: "Pres. Prudente",
      observacoes: "Não tem onde dormir",
      tel: "(18)99999-9999"
  },
];

export function ObjectEmptyValue(array) {
  for (let chave in array) {
    if (array.hasOwnProperty(chave) && array[chave] === "") {
      return false;
    }
  }
  return true;
}

export function onChangeInput(name, value, setFormInput, formInput) {
  setFormInput({ ...formInput, [name]: value });
}

export async function NameToAccepToDoAllFromVolunteer(setRegisterVolunteers, setAcceptToDoAll, token, id){
  const volunteers = await getAllRegisterVoluntario();
  const acceptToDoAllAux = await getAllRegisterAcceptToDo(token, id);
  const allAcceptToDoVolunteer = await getAllRegisterVoluntarioAceitafazer();

    volunteers.forEach((volunteer) => {
      volunteer.oQueAceitariaFazer = [];
      allAcceptToDoVolunteer.forEach((accept) => {
        if (volunteer.id === accept.id_voluntario) {
          const auxIndexOfAccepTodo = acceptToDoAllAux.find(acceptToDo => acceptToDo.id === accept.id_aceitafazer).name;
          volunteer.oQueAceitariaFazer.push(auxIndexOfAccepTodo);
        }
      });
    });

    setRegisterVolunteers(volunteers);
    setAcceptToDoAll(acceptToDoAllAux);
}

export async function NameToOfficeFromUser(setRegisterUser, setOffices){
  const users = await getAllRegisterUsers();
  const offices = await getAllRegisterOffice();

    users.forEach((user) => {
      offices.forEach((office) => {
        if (user.id_office === office.id) {
          user.id_office = office.name;
        }
      })
    });

    setRegisterUser(users);
    setOffices(offices);
}
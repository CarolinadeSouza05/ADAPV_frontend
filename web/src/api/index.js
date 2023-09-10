const apiLogin = "http://localhost:4000/login";
const apiVoluntario = "http://localhost:4000/voluntarios";
const apiProdutos = "http://localhost:4000/produto";
const apiEntradas = "http://localhost:4000/entradas";
const apiAnimais = "http://localhost:4000/animais";
export const urLBase = "http://localhost:4000";

export async function getAllRegisterLogin(){
    let aux = [];
    await fetch(apiLogin, {
        method: "GET",
    })
    .then((data) => data.json())
    .then((repos) => (aux = repos))
    .catch(e => console.log(e));

    return aux;
}

export async function getAllRegisterVoluntario(){
    let aux = [];
    await fetch(apiVoluntario, {
        method: "GET",
    })
    .then((data) => data.json())
    .then((repos) => (aux = repos))
    .catch(e => console.log(e));

    return aux;
}

export async function createRegisterLogin(register){
    await fetch(`${apiLogin}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(register),
    })
    .then(() => alert("Usuário cadastrado com sucesso"))
    .catch((err) => console.log(err))
}

export async function createRegisterVoluntario(register){
    const newUrl = new URL(`${apiVoluntario}`)
    await fetch(newUrl.href, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(register),
    })
    .then(() => alert("Voluntário cadastrado com sucesso"))
    .catch((err) => console.log(err))
}

export async function editRegisterLogin(register, index){
    await fetch(`${apiLogin}/${index}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
         },
        body: JSON.stringify(register),
    })
    .then(() => alert("Usuário editado com sucesso"))
    .catch((err) => console.log(err))
}

export async function editRegisterVoluntario(register, index){
    
    console.log(register)
    await fetch(`${apiVoluntario}/${index}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
         },
        body: JSON.stringify(register),
    })
    .then(() => alert("Voluntário editado com sucesso"))
    .catch((err) => console.log(err))
}

export async function deleteRegisterLogin(index){
    let aux = [];
    await fetch(`${apiLogin}/${index}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
         },
    })
    .then((data) => {
        aux = data
        alert("Usuário deletado com sucesso")
    })
    .catch((err) => console.log(err))

    return aux;
}

export async function deleteRegisterVoluntario(index){
    let aux = [];
    await fetch(`${apiVoluntario}/${index}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
         },
    })
    .then((data) => {
        aux = data
        alert("Voluntário deletado com sucesso")
    })
    .catch((err) => console.log(err))

    return aux;
}

export async function getRegisterEmail(email){
    let aux = [];

    await fetch(`${apiLogin}/${email}`, {
        method: "GET",
    })
    .then((data) => data.json())
    .then((repos) => (aux = repos))
    .catch((err) => console.log(err))

    return aux;
}

export async function getRegisterTel(telefone) {
    let aux = [];

    const url = new URL(`${apiVoluntario}/${telefone}`);
    console.log(url);
    
    await fetch(url.href, {
        method: "GET",
    })
    .then((data) => data.json())
    .then((repos) => (aux = repos))
    .catch((err) => console.log(err))

    return aux;
}

//================== API-Produtos ==================//

export async function getProdutos() {
    let aux = [];
    await fetch(apiProdutos, {
        method: "GET",
    })
        .then((data) => data.json())
        .then((res) => (aux = res))
        .catch(e => console.log(e));

    return aux;
}

export async function handleSubmit(produto) {
  console.log(produto)
    await fetch(apiProdutos, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
    })
      .then(()=> alert('Produto Cadastrado com sucesso!'))
}

export async function editarProdutos(produto) {
  console.log(produto)
    try {
      await fetch(`${apiProdutos}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produto),
      })
      .then(()=> alert('Produto editado com sucesso!'))
    } catch (error) {
      console.log('Erro na requisição:', error);
    }
  }

  export async function excluirProduto(codigo) {
    try {
      await fetch(`${apiProdutos}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigo: codigo }),
      });
  
      alert("Produto deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o produto:", error);
      throw error;
    }
  }

//================== API-Denuncias ==================//

//================== API-Entrada ==================//

export async function getEntradas() {
  let aux = [];
  await fetch(apiEntradas, {
      method: "GET",
  })
      .then((data) => data.json())
      .then((res) => (aux = res))
      .catch(e => console.log(e));

  return aux;
}

export async function handleSubmitEntradas(entrada) {
  await fetch(apiEntradas, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(entrada)
  })
    .then(()=> alert('entrada Cadastrado com sucesso!'))
}

export async function editarEntradas(entrada) {
  try {
    await fetch(`${apiEntradas}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entrada),
    })
    .then(()=> alert('entrada editado com sucesso!'))
  } catch (error) {
    console.log('Erro na requisição:', error);
  }
}

export async function excluirEntradas(id) {
  try {
    await fetch(`${apiEntradas}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    alert("entrada deletado com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir o entrada:", error);
    throw error;
  }
}
//================== API-Animais ==================//

export async function getAnimais() {
  let aux = [];
  await fetch(apiAnimais, {
      method: "GET",
  })
      .then((data) => data.json())
      .then((res) => (aux = res))
      .catch(e => console.log(e));

  return aux;
}

export async function handleSubmitAnimais(animal) {
  await fetch(apiAnimais, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(animal)
  })
    .then(()=> alert('animal Cadastrado com sucesso!'))
}

export async function editarAnimais(animal) {
  try {
    await fetch(`${apiAnimais}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(animal),
    })
    .then(()=> alert('animal editado com sucesso!'))
  } catch (error) {
    console.log('Erro na requisição:', error);
  }
}

export async function excluirAnimais(id) {
  try {
    await fetch(`${apiAnimais}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    alert("animal deletado com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir o animal:", error);
    throw error;
  }
}


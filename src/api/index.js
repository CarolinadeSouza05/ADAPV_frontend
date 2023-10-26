const apiVoluntario = "http://localhost:4000/voluntarios";
const apiAcceptToDo = "http://localhost:4000/aceitariafazer";
const apiUser = "http://localhost:4000/user";
const apiOffice = "http://localhost:4000/office";
const apiVoluntarioAceitafazer = "http://localhost:4000/voluntario-aceitafazer";
const apiProdutos = "http://localhost:4000/produto";
const apiEntradas = "http://localhost:4000/entradas";
const apiAnimais = "http://localhost:4000/animais";
export const urLBase = "http://localhost:4000";
const apiDoacao = "http://localhost:4000/doacao";

const apiCategoria = "http://localhost:4000/categoria";
const apiTipo = "http://localhost:4000/tipo";
const apiAdocao = "http://localhost:4000/adocao";

export async function getAllRegisterVoluntario() {
  let aux = await fetch(apiVoluntario, {
      method: "GET",
  })
      .then((data) => data.json())
      .then((repos) => repos)
      .catch(e => e);

  return aux;
}

export async function createRegisterVoluntario(register) {
  const newUrl = new URL(`${apiVoluntario}`)
  const message = await fetch(newUrl.href, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
  })
      .then((data) => data.json())
      .then((res) => res)
      .catch((err) => err)

  return message;
}

export async function editRegisterVoluntario(register) {
  const message = await fetch(`${apiVoluntario}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
  })
      .then(() => "Voluntário editado com sucesso")
      .catch((err) => err)

  return message;
}

export async function deleteRegisterVoluntario(register) {
  let aux = await fetch(`${apiVoluntario}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
  })
      .then(() => "Voluntário deletado com sucesso")
      .catch((err) => err)

  return aux;
}

export async function getByName(name) {
  let aux = await fetch(`${apiVoluntario}/name/${name}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  })
      .then((data) => data.json())
      .then((res) => res)
      .catch((err) => err)

  return aux;
}

export async function getRegisterTel(telefone) {
  let aux = await fetch(`${apiVoluntario}/tel/${telefone}`, {
      method: "GET",
  })
      .then((data) => data.json())
      .then((repos) => repos)
      .catch((err) => err)

  return aux;
}

// --------------------------------- Router AceitariaFazer ---------------------------------
export async function getAllRegisterAcceptToDo() {
  let aux = await fetch(apiAcceptToDo, {
      method: "GET",
  })
      .then((data) => data.json())
      .then((repos) => repos)
      .catch(e => e);

  return aux;
}

export async function createRegisterAccepToDo(register) {
  const message = await fetch(`${apiAcceptToDo}`, {
      method: "POST",
      body: JSON.stringify(register),
      headers: {
          "Content-Type": "application/json",
      },
  })
      .then(() => "Tarefa cadastrado com sucesso")
      .catch((err) => err)

  return message;
}

export async function editRegisterAccepToDo(register) {
  const message = await fetch(`${apiAcceptToDo}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
  })
      .then(() => "Tarefa editada com sucesso")
      .catch((err) => err)

  return message;
}

export async function deleteRegisterAccepToDo(register) {
  let aux = await fetch(`${apiAcceptToDo}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
  })
      .then((data) => data.json())
      .catch((err) => err)

  return aux;
}

// --------------------------------- Router User ---------------------------------
export async function getAllRegisterUsers() {
  let aux = await fetch(`${apiUser}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  })
      .then((data) => data.json())
      .then((repos) => repos)
      .catch((e) => e);

  return aux;
}

export async function createRegisterUser(register) {
  const aux = await fetch(`${apiUser}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
  })
      .then(() => "Usuário cadastrado com sucesso")
      .catch((err) => err)

  return aux;
}

export async function editRegisterUser(register) {
  const aux = await fetch(`${apiUser}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
  })
      .then(() => "Usuário editado com sucesso")
      .catch((err) => err)

  return aux;
}

export async function deleteRegisterUser(register) {
  let aux = await fetch(`${apiUser}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
  })
      .then(() => "Usuário deletado com sucesso")
      .catch((err) => err)

  return aux;
}

export async function getRegisterEmail(email) {
  let aux = await fetch(`${apiUser}/${email}`, {
      method: "GET",
  })
      .then((data) => data.json())
      .then((repos) => repos)
      .catch((err) => err)

  return aux;
}

// --------------------------------- Router AceitariaFazer ---------------------------------
export async function getAllRegisterOffice() {
  let aux = await fetch(apiOffice, {
      method: "GET",
  })
      .then((data) => data.json())
      .then((repos) => repos)
      .catch(e => e);

  return aux;
}

export async function createRegisterOffice(register) {
  const message = await fetch(`${apiOffice}`, {
      method: "POST",
      body: JSON.stringify(register),
      headers: {
          "Content-Type": "application/json",
      },
  })
      .then(() => "Cargo cadastrado com sucesso")
      .catch((err) => err)

  return message;
}

export async function editRegisterOffice(register) {
  const message = await fetch(`${apiOffice}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
  })
      .then(() => "Cargo editada com sucesso")
      .catch((err) => err)

  return message;
}

export async function deleteRegisterOffice(register) {
  let aux = await fetch(`${apiOffice}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
  })
      .then((data) => data.json())
      .catch((err) => err)

  return aux;
}

// --------------------------------- Router Voluntario AceitariaFazer ---------------------------------
export async function getAllRegisterVoluntarioAceitafazer() {
  let aux = await fetch(apiVoluntarioAceitafazer, {
      method: "GET",
  })
      .then((data) => data.json())
      .then((repos) => repos)
      .catch(e => e);

  return aux;
}

export async function createRegisterVoluntarioAceitafazer(register) {
  const message = await fetch(`${apiVoluntarioAceitafazer}`, {
      method: "POST",
      body: JSON.stringify(register),
      headers: {
          "Content-Type": "application/json",
      },
  })
      .then(() => "Cargo cadastrado com sucesso")
      .catch((err) => err)

  return message;
}

export async function editRegisterVoluntarioAceitafazer(register, index) {
  const message = await fetch(`${apiVoluntarioAceitafazer}/${index}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
  })
      .then(() => "Cargo editada com sucesso")
      .catch((err) => err)

  return message;
}

export async function getByIdRegisterVoluntarioAceitafazer(index) {
  let aux = await fetch(`${apiVoluntarioAceitafazer}/${index}`, {
      method: "GET",
  })
      .then((data) => data.json())
      .then((repos) => repos)
      .catch(e => e);

  return aux;
}
// //================== API-Produtos ==================//

// export async function getProdutos() {
//     let aux = [];
//     await fetch(apiProdutos, {
//         method: "GET",
//     })
//         .then((data) => data.json())
//         .then((res) => (aux = res))
//         .catch(e => console.log(e));

//     return aux;
// }

// export async function handleSubmit(produto) {
//   console.log(produto)
//     await fetch(apiProdutos, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(produto)
//     })
//       .then(()=> alert('Produto Cadastrado com sucesso!'))
// }

// export async function editarProdutos(produto) {
//   console.log(produto)
//     try {
//       await fetch(`${apiProdutos}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(produto),
//       })
//       .then(()=> alert('Produto editado com sucesso!'))
//     } catch (error) {
//       console.log('Erro na requisição:', error);
//     }
//   }

//   export async function excluirProduto(codigo) {
//     try {
//       await fetch(`${apiProdutos}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ codigo: codigo }),
//       });
  
//       alert("Produto deletado com sucesso!");
//     } catch (error) {
//       console.error("Erro ao excluir o produto:", error);
//       throw error;
//     }
//   }

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
    .then(() => alert('Produto Cadastrado com sucesso!'))
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
      .then(() => alert('Produto editado com sucesso!'))
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

//----------------------------- API Categorias ---------------------------------//

export async function getAllCategorias() {
  let aux = [];
  await fetch(apiCategoria, {
    method: "GET",
  })
    .then((data) => data.json())
    .then((res) => (aux = res))
    .catch(e => console.log(e));

  return aux;
}

export async function createRegisterCategoria(categoria) {
  console.log(categoria)
  await fetch(apiCategoria, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(categoria)
  })
    .then(() => alert('Categoria Cadastrada com sucesso!'))
}

export async function editRegisterCategoria(categoria) {
  console.log(categoria)
  try {
    await fetch(`${apiCategoria}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoria),
    })
      .then(() => alert('Categoria editado com sucesso!'))
  } catch (error) {
    console.log('Erro na requisição:', error);
  }
}

export async function deleteCategoriaP(id) {
  try {
    await fetch(`${apiCategoria}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    alert("Categoria deletado com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir o categoria:", error);
    throw error;
  }
}

export async function consultarCategoriaPorId(id) {
  try {
    const response = await fetch(`${apiCategoria}/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Erro ao consultar a categoria: ${response.statusText}`);
    }

    const categoria = await response.json();
    return categoria;
  } catch (error) {
    console.error('Erro ao consultar a categoria:', error);
    throw error;
  }
}


//----------------------------- API Tipo ---------------------------------//

export async function getAllTipo() {
  let aux = [];
  await fetch(apiTipo, {
    method: "GET",
  })
    .then((data) => data.json())
    .then((res) => (aux = res))
    .catch(e => console.log(e));

  return aux;
}

export async function createRegisterTipo(tipo) {
  console.log(tipo)
  await fetch(apiTipo, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tipo)
  })
    .then(() => alert('Tipo Cadastrada com sucesso!'))
}

export async function editRegisterTipo(tipo) {
  console.log(tipo)
  try {
    await fetch(`${apiTipo}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tipo),
    })
      .then(() => alert('Tipo editado com sucesso!'))
  } catch (error) {
    console.log('Erro na requisição:', error);
  }
}

export async function deleteTipo(id) {
  try {
    await fetch(`${apiTipo}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    alert("Categoria deletado com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir o tipo:", error);
    throw error;
  }
}

export async function getByIdRegisterTipo(index){
  let aux = await fetch(`${apiTipo}/${index}`, {
      method: "GET",
  })
  .then((data) => data.json())
  .then((repos) => repos)
  .catch(e => e);

  return aux;
}

//================== API-Adoção ==================//

export async function getAdocao() {
  let aux = [];
  await fetch(apiAdocao, {
    method: "GET",
  })
    .then((data) => data.json())
    .then((res) => (aux = res))
    .catch(e => console.log(e));

  return aux;
}

export async function handleSubmitAdocao(adocao) {
  console.log(adocao)
  await fetch(apiAdocao, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(adocao)
  })
    .then(() => alert('Produto Cadastrado com sucesso!'))
}

export async function editarAdocao(adocao) {
  console.log(adocao)
  try {
    await fetch(`${apiAdocao}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adocao),
    })
      .then(() => alert('Produto editado com sucesso!'))
  } catch (error) {
    console.log('Erro na requisição:', error);
  }
}

export async function excluirAdocao(codigo) {
  try {
    await fetch(`${apiAdocao}`, {
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
//---------------------donation

export async function getDonnation() {
  const aux = await fetch(apiAnimais, {
      method: "GET",
  })
      .then((data) => data.json())
      .then((res) => res)
      .catch(e => console.log(e));

  return aux;
}

export async function createRegisterDonnation(register){
  const aux = await fetch(`${apiDoacao}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
  })
  .then((data) => data.json())
  .then((res) => res)
  .catch((err) => console.log(err))

  return aux;
}
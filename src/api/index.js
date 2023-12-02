const apiVoluntario = "http://localhost:4000/security/voluntarios";
const apiAcceptToDo = "http://localhost:4000/security/aceitariafazer";
const apiUser = "http://localhost:4000/user";
const apiOffice = "http://localhost:4000/security/office";
const apiVoluntarioAceitafazer = "http://localhost:4000/security/voluntario-aceitafazer";
const apiProdutos = "http://localhost:4000/security/produto";
const apiEntradas = "http://localhost:4000/security/entradas";
const apiAnimais = "http://localhost:4000/security/animais";
export const urLBase = "http://localhost:4000";
const apiDoacao = "http://localhost:4000/security/doacao";
const apiCategoria = "http://localhost:4000/security/categoria";
const apiTipo = "http://localhost:4000/security/tipo";
const apiAdocao = "http://localhost:4000/security/adocao";

export async function getAllRegisterVoluntario(token, id) {
  let aux = await fetch(`${apiVoluntario}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "token": token,
    },
  })
    .then((data) => data.json())
    .then((repos) => repos)
    .catch((e) => e);

  return aux;
}

export async function createRegisterVoluntario(register, token, id) {
  const newUrl = new URL(`${apiVoluntario}/${id}`)
  const message = await fetch(newUrl.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "token": token,
    },
    body: JSON.stringify(register),
  })
    .then((data) => data.json())
    .then((res) => res)
    .catch((err) => err)

  return message;
}

export async function editRegisterVoluntario(register, token, id) {
  const message = await fetch(`${apiVoluntario}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
      body: JSON.stringify(register),
  })
      .then(() => "Voluntário editado com sucesso")
      .catch((err) => err)

  return message;
}

export async function deleteRegisterVoluntario(register, token, id) {
  let aux = await fetch(`${apiVoluntario}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
      body: JSON.stringify(register),
  })
      .then(() => "Voluntário deletado com sucesso")
      .catch((err) => err)

  return aux;
}

export async function getByName(name, token, id) {
  let aux = await fetch(`${apiVoluntario}/name/${name}/${id}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "token": token,
      },
  })
      .then((data) => data.json())
      .then((res) => res)
      .catch((err) => err)

  return aux;
}

export async function getRegisterTel(telefone, token, id) {
  let aux = await fetch(`${apiVoluntario}/tel/${telefone}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": token,
    },
  })
      .then((data) => data.json())
      .then((repos) => repos)
      .catch((err) => err)

  return aux;
}

// --------------------------------- Router AceitariaFazer ---------------------------------
export async function getAllRegisterAcceptToDo(token, id) {
  let aux = await fetch(`${apiAcceptToDo}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
  })
      .then((data) => data.json())
      .then((repos) => repos)
      .catch(e => e);

  return aux;
}

export async function createRegisterAccepToDo(register, token, id) {
  const message = await fetch(`${apiAcceptToDo}/${id}`, {
      method: "POST",
      body: JSON.stringify(register),
      headers: {
        "Content-Type": "application/json",
        "token": token,
    },
  })
      .then(() => "Tarefa cadastrado com sucesso")
      .catch((err) => err)

  return message;
}

export async function editRegisterAccepToDo(register, token, id) {
  const message = await fetch(`${apiAcceptToDo}/${id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "token": token,

      },
      body: JSON.stringify(register),
  })
      .then(() => "Tarefa editada com sucesso")
      .catch((err) => err)

  return message;
}

export async function deleteRegisterAccepToDo(register, token, id) {
  let aux = await fetch(`${apiAcceptToDo}/${id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          "token": token,
      },
      body: JSON.stringify(register),
  })
      .then((data) => data.json())
      .catch((err) => err)

  return aux;
}

// --------------------------------- Router User ---------------------------------
export async function getAllRegisterUsers(id, token) {
  let aux = await fetch(`${apiUser}/security/${id}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "token": token,
      },
  })
      .then((data) => data.json())
      .then((repos) => repos)
      .catch((e) => e);

  return aux;
}

export async function createRegisterUser(register, id, token) {
  const aux = await fetch(`${apiUser}/security/${id}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "token": token,
      },
      body: JSON.stringify(register),
  })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => err)

  return aux;
}

export async function editRegisterUser(register, id, token) {
  const aux = await fetch(`${apiUser}/security/${id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "token": token,
      },
      body: JSON.stringify(register),
  })
      .then(() => "Usuário editado com sucesso")
      .catch((err) => err)

  return aux;
}

export async function deleteRegisterUser(register, id, token) {
  let aux = await fetch(`${apiUser}/security/${id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          "token": token
      },
      body: JSON.stringify(register),
  })
      .then(() => "Usuário deletado com sucesso")
      .catch((err) => err)

  return aux;
}

export async function getRegisterEmailPassword(register) {
  let aux = await fetch(`${apiUser}/login`, {
      method: "POST",
      body: JSON.stringify(register),
      headers: {
        "Content-Type": "application/json",
    },
  })
      .then((data) => data.json())
      .then((repos) => repos)
      .catch((err) => err)

  return aux;
}

export async function getBulletinAll(register, id, token) {
  let aux = await fetch(`${apiUser}/bulletin/${id}`, {
      method: "POST",
      body: JSON.stringify(register),
      headers: {
        "Content-Type": "application/json",
        "token": token,
    },
  })
      .then((data) => data.json())
      .then((repos) => repos)
      .catch((err) => err)

  return aux;
}



// --------------------------------- Router AceitariaFazer ---------------------------------
export async function getAllRegisterOffice(token, id) {
  let aux = await fetch(`${apiOffice}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": token,
    },
  })
      .then((data) => data.json())
      .then((repos) => repos)
      .catch(e => e);

  return aux;
}

export async function createRegisterOffice(register, token, id) {
  const message = await fetch(`${apiOffice}/${id}`, {
      method: "POST",
      body: JSON.stringify(register),
      headers: {
        "Content-Type": "application/json",
        "token": token,
    },
  })
      .then(() => "Cargo cadastrado com sucesso")
      .catch((err) => err)

  return message;
}

export async function editRegisterOffice(register, token, id) {
  const message = await fetch(`${apiOffice}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "token": token,
    },
      body: JSON.stringify(register),
  })
      .then(() => "Cargo editada com sucesso")
      .catch((err) => err)

  return message;
}

export async function deleteRegisterOffice(register, token, id) {
  let aux = await fetch(`${apiOffice}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "token": token,
    },
      body: JSON.stringify(register),
  })
      .then((data) => data.json())
      .catch((err) => err)

  return aux;
}

// --------------------------------- Router Voluntario AceitariaFazer ---------------------------------
export async function getAllRegisterVoluntarioAceitafazer(token, id) {
  let aux = await fetch(`${apiVoluntarioAceitafazer}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": token,
    },
  })
      .then((data) => data.json())
      .then((repos) => repos)
      .catch(e => e);

  return aux;
}

export async function createRegisterVoluntarioAceitafazer(register, token, id) {
  const message = await fetch(`${apiVoluntarioAceitafazer}/${id}`, {
      method: "POST",
      body: JSON.stringify(register),
      headers: {
        "Content-Type": "application/json",
        "token": token,
    },
  })
      .then(() => "Cargo cadastrado com sucesso")
      .catch((err) => err)

  return message;
}

export async function editRegisterVoluntarioAceitafazer(register, index, token, id) {
  const message = await fetch(`${apiVoluntarioAceitafazer}/${index}/${id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "token": token,
      },
      body: JSON.stringify(register),
  })
      .then(() => "Cargo editada com sucesso")
      .catch((err) => err)

  return message;
}

export async function getByIdRegisterVoluntarioAceitafazer(index, token, id) {
  let aux = await fetch(`${apiVoluntarioAceitafazer}/${index}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": token,
    },
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

export async function getEntradas(token, id) {
  let aux = [];
  await fetch(`${apiEntradas}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": token,
    },
  })
      .then((data) => data.json())
      .then((res) => (aux = res))
      .catch(e => console.log(e));

  return aux;
}

export async function handleSubmitEntradas(entrada, token, id) {
  await fetch(`${apiEntradas}/${id}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "token": token,
      },
      body: JSON.stringify(entrada)
  })
    .then(()=> alert('entrada Cadastrado com sucesso!'))
}

export async function editarEntradas(entrada, token, id) {
  try {
    await fetch(`${apiEntradas}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "token": token,
      },
      body: JSON.stringify(entrada),
    })
    .then(()=> alert('entrada editado com sucesso!'))
  } catch (error) {
    console.log('Erro na requisição:', error);
  }
}

export async function excluirEntradas(id, token) {
  try {
    await fetch(`${apiEntradas}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "token": token,
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

export async function getAnimais(token, id) {
  let aux = [];
  await fetch(`${apiAnimais}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
  })
      .then((data) => data.json())
      .then((res) => (aux = res))
      .catch(e => console.log(e));

  return aux;
}

export async function handleSubmitAnimais(animal, token, id) {
  const aux = await fetch(`${apiAnimais}/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
      body: JSON.stringify(animal)
  })
    .then((data) => data.json())
    .then((res) => res)
    .catch((err) => err);

  return aux;
}

export async function editarAnimais(animal, token, id) {
  try {
    await fetch(`${apiAnimais}/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
      body: JSON.stringify(animal),
    })
    .then(()=> alert('animal editado com sucesso!'))
  } catch (error) {
    console.log('Erro na requisição:', error);
  }
}

export async function excluirAnimais(id, token) {
  try {
    await fetch(`${apiAnimais}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
      body: JSON.stringify({ id: id }),
    });

    alert("animal deletado com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir o animal:", error);
    throw error;
  }
}

export async function getAnimalsPagination(register, token, id){
  console.log(register);
  const aux = await fetch(`${apiAnimais}/pagination/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "token": token,
    },
    body: JSON.stringify(register)
  })
  .then((data) => data.json())
  .then((res) => res)
  .catch((err) => err)

  return aux;
}

//================== API-Produtos ==================//

export async function getProdutos(token, id) {
  let aux = [];
  await fetch(`${apiProdutos}/${id}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      "token": token,
    },
  })
    .then((data) => data.json())
    .then((res) => (aux = res))
    .catch(e => console.log(e));

  return aux;
}

export async function handleSubmit(produto, token, id) {
  console.log(produto)
  await fetch(`${apiProdutos}/${id}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "token": token,
    },
    body: JSON.stringify(produto)
  })
    .then(() => alert('Produto Cadastrado com sucesso!'))
}

export async function editarProdutos(produto, token, id) {
  console.log(produto)
  try {
    await fetch(`${apiProdutos}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "token": token,
      },
      body: JSON.stringify(produto),
    })
      .then(() => alert('Produto editado com sucesso!'))
  } catch (error) {
    console.log('Erro na requisição:', error);
  }
}

export async function excluirProduto(codigo, token, id) {
  try {
    await fetch(`${apiProdutos}/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "token": token,
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

export async function getAllCategorias(token, id) {
  let aux = [];
  await fetch(`${apiCategoria}/${id}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      "token": token,
    },
  })
    .then((data) => data.json())
    .then((res) => (aux = res))
    .catch(e => console.log(e));

  return aux;
}

export async function createRegisterCategoria(categoria, token, id) {
  console.log(categoria)
  await fetch(`${apiCategoria}/${id}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "token": token,
    },
    body: JSON.stringify(categoria)
  })
    .then(() => alert('Categoria Cadastrada com sucesso!'))
}

export async function editRegisterCategoria(categoria, token, id) {
  console.log(categoria)
  try {
    await fetch(`${apiCategoria}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "token": token,
      },
      body: JSON.stringify(categoria),
    })
      .then(() => alert('Categoria editado com sucesso!'))
  } catch (error) {
    console.log('Erro na requisição:', error);
  }
}

export async function deleteCategoriaP(id, token) {
  try {
    await fetch(`${apiCategoria}/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "token": token,
      },
      body: JSON.stringify({ id: id }),
    });

    alert("Categoria deletado com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir o categoria:", error);
    throw error;
  }
}

export async function consultarCategoriaPorId(id, token) {
  try {
    const response = await fetch(`${apiCategoria}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "token": token,
      },
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

export async function getAllTipo(token, id) {
  let aux = [];
  await fetch(`${apiTipo}/${id}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      "token": token,
    },
  })
    .then((data) => data.json())
    .then((res) => (aux = res))
    .catch(e => console.log(e));

  return aux;
}

export async function createRegisterTipo(tipo, token, id) {
  console.log(tipo)
  await fetch(`${apiTipo}/${id}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "token": token,
    },
    body: JSON.stringify(tipo)
  })
    .then(() => alert('Tipo Cadastrada com sucesso!'))
}

export async function editRegisterTipo(tipo, token, id) {
  console.log(tipo)
  try {
    await fetch(`${apiTipo}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "token": token,
      },
      body: JSON.stringify(tipo),
    })
      .then(() => alert('Tipo editado com sucesso!'))
  } catch (error) {
    console.log('Erro na requisição:', error);
  }
}

export async function deleteTipo(id, token) {
  try {
    await fetch(`${apiTipo}/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "token": token,
      },
      body: JSON.stringify({ id: id }),
    });

    alert("Categoria deletado com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir o tipo:", error);
    throw error;
  }
}

export async function getByIdRegisterTipo(index, token, id){
  let aux = await fetch(`${apiTipo}/${index}/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "token": token,
      },
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
//---------------------donation---------------------//

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
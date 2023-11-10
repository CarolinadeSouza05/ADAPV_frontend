import { Col, Container, Row, Form, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import './CaixadeSelecao.css'

// Criando uma caixa de seleção genérica que recebe os dados de um banco de dados
export default function CaixadeSelecao({ url, campoChave, campoExibicao, funcaoSelecao }) {
  const [valorSelecionado, setValorSelecionado] = useState({
    [campoChave]: 0,
    [campoExibicao]: "Não foi possível obter resultados do banco de dados"
  });

  const [carregandoDados, setCarregandoDados] = useState(false);
  const [dados, setDados] = useState([]);

  useEffect(() => {
    setCarregandoDados(true);

    fetch(url, { method: "GET" })
      .then((resposta) => {
        if (resposta.ok) {
          return resposta.json();
        } else {
          throw new Error("Não foi possível obter resultados do banco de dados");
        }
      })
      .then((listadedados) => {
        setCarregandoDados(false);
        setDados(listadedados);
        if (listadedados.length > 0) {
          setValorSelecionado(listadedados[0]);
          funcaoSelecao(listadedados[0]);
        }
      })
      .catch((erro) => {
        setCarregandoDados(false);
        setDados([
          {
            [campoChave]: 0,
            [campoExibicao]: "Não foi possível obter resultados do banco de dados: " + erro.message
          }
        ]);
      });
  }, [url, campoChave, campoExibicao, funcaoSelecao]);

  return (
    <>
      {/* <Row>
        <Col md={11}> */}
          <Form.Select
          className="caixadeSelecao"
            value={valorSelecionado[campoExibicao]}
            onChange={(evento) => {
              const itemSelecionado = evento.target.value;
              // para encontrar a posição do item selecionado no array
              const pos = dados.map((item) => item[campoChave].toString()).indexOf(itemSelecionado);
              setValorSelecionado(dados[pos]);
              funcaoSelecao(dados[pos]);
            }}
          >
            <option value="" className="options_selecao">Selecione uma opção abaixo:</option> {/* Opção de placeholder */}
            {dados.map((item) => {
              return (
                <option key={item[campoChave]} value={item[campoChave]} className="options_selecao">
                  {item[campoExibicao]}
                </option>
              );
            })}
          </Form.Select>
        {/* </Col>
        {/* <Col md={1}>
          <Spinner className={carregandoDados ? 'visible' : 'invisible'} />
        </Col> 
      </Row> */}
    </>
  );
}

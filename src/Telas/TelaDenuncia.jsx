import { Footer } from "../components/Footer.jsx";
import { Cabecalho } from "../components/Cabecalho.jsx";
import "./TelaDenuncia.css";
import cat_denuncia from "../imagens/denuncia-cat.png";
import triangle1 from "../imagens/triangle.png";
import triangle2 from "../imagens/trianfle2.png";
import paw from "../imagens/paw-vector.png";
import paw2 from "../imagens/paw-vector2.png";
import { Link } from "react-router-dom";

export function CadastroDenuncia() {
  return (
    <div className="page_container_denuncia">
      <Cabecalho />

      <div>
        <img className="triangle2" src={triangle2} alt="triangle" />
        <img className="paw2" src={paw2} alt="pata" />
      </div>

      <div className="denuncia">
        <img
          src={cat_denuncia}
          alt="imagem-denuncia"
          className="cat_denuncia"
        />

        <div className="container_text">
          <h1 className="title_denuncia">
            MAUS-<span className="title_denuncia">TRATOS</span>
          </h1>
          <h3 className="subtitle">É CRIME, DENUNCIE!</h3>
          <p className="text">
            Lei 9605/98 Art. 32. Praticar ato <br />
            de abuso, maus-tratos, ferir ou <br />
            mutilar animais silvestres, <br />
            domesticos ou domesticados, <br />
            nativos ou exoticos
          </p>

          <div className="disk_number">
            <p className="disk"> Disk: <span className="n1">(18) 3281-2033</span>, <span className="n2">(18) 3906-9200</span> </p>
          </div>

          <div>
            <p className="link">Acesse: <Link target="_blank" to="https://www.webdenuncia.org.br/depa" className="link_denuncia">https://www.webdenuncia.org.br/depa</Link></p>
          </div>
        </div>
      </div>
      <Footer />
      <img className="triangle" src={triangle1} alt="triangle" />
      <img className="paw" src={paw} alt="pata" />
    </div>
  );
}

import { useState } from "react";
import { BsKey } from "react-icons/bs"
import "./FormRegisterDonation.css";
import { MdOutlineAttachMoney } from "react-icons/md";
import { InputsForm } from "../components/InputsForm";
import { QrCodePix } from "qrcode-pix"

const donationValues = {
    chavePix: "",
    value: 0,
}
export function FormRegisterDonation(){
  const [inputsValidateDonation, setInputsValidateDonation] = useState(donationValues);
  const [qrCodeData, setQrCodeData] = useState('');
  const [validado, setValidado] = useState(false);

  const inputsForm = [
      {
          type: "text",
          name: "chavePix",
          id: "chavePix",
          placeholder: "Chave Pix",
          icon: BsKey,
          value: inputsValidateDonation.chavePix,
          required: true,
      },

      {
          type: "number",
          name: "value",
          id: "value",
          placeholder: "Valor",
          icon: MdOutlineAttachMoney,
          value: inputsValidateDonation.value,
          required: true,
      },
  ]
  return(
    <>
      <div className="container-form-donation">
        <form action="" onSubmit={e => handleGenerateQRCode(e)}>
          {inputsForm.map((input, index) => (
            <div className="form-input flex-col" key={index}>
              <label htmlFor={input.name}>{input.placeholder}</label>
              <div className={`alinhamento input-container ${validado && !input.value ? "input-invalid" : ""}`}>
                {input.icon && <input.icon size={32} />}
                <InputsForm
                    key={index}
                    infoInput={input}
                    formValidate={inputsValidateDonation}
                    setFormValidate={setInputsValidateDonation}
                    onInput={input.onInput}
                />
              </div>
            </div>
          ))}

          <div className="container-button alinhamento">
            <button type="submit">Gerar QrCode</button>
          </div>

          {qrCodeData && (
            <div className="container-qrcode">
              <img src={qrCodeData} alt={'QR Code PIX'}/>
            </div>
          )}
        </form>
      </div>
    </>
  );

    async function handleGenerateQRCode(e){
        e.preventDefault();
        const pixData = {
            key: inputsValidateDonation.chavePix,
            name: "Alerrando Breno",
            amount: inputsValidateDonation.value,
            estado: "São Paulo",
            description: "Teste",
        };
        const pix = QrCodePix({
            city: "Rancharia",
            key: pixData.key,
            name: pixData.name,
            version: "01",
            value: parseFloat(pixData.amount),
        })

        const qrCodeBase64 = await pix.base64()
        setQrCodeData(qrCodeBase64);
    }
}
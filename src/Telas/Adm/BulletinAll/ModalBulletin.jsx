import { X } from '@phosphor-icons/react';
import './ModalBulletin.css';
import { format, isValid, parseISO } from 'date-fns';

export function ModalBulletin({ infosModal, setModal }) {
  return (
    <div className="modal">
      <div className="modal-container flex-col">
        <div className="modal-container-title">
          <h2>Relatório {infosModal.nameTableQuery}</h2>
          <X size={32} onClick={() => setModal(false)} />
        </div>

        <table>
          <thead>
            <tr>
              {Object.keys(infosModal.allDataInInterval[0]).map((head, index) => (
                <th scope="col" key={index}>
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {infosModal.allDataInInterval !== undefined &&
              infosModal.allDataInInterval.map((registerInput, index) => {
                const register = [];
                Object.values(registerInput).forEach((values) => {
                  if (values !== registerInput.senha) {
                    return register.push(values);
                  }
                });

                return (
                  <tr key={index}>
                    {Object.values(register).map((input, idx) => (
                      <td key={`td-${index}-${idx}`}>
                        {typeof input === 'object' ? (
                          <div className="td-maps horizontal-divide">
                            {input.map((item, indexItem) => (
                              <span key={`td-map-${indexItem}`}>{item}</span>
                            ))}
                          </div>
                        ) : isValid(parseISO(input)) && typeof input === 'string' ? (
                          <span>{format(parseISO(input), 'dd/MM/yyyy')}</span>
                        ) : (
                          <span>{input}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

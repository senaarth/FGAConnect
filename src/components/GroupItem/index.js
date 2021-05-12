import React, { useState } from "react";
import { Modal } from "react-bootstrap"
import { api } from "../../services/api";

import { Container } from "./styles";

function GroupItem({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("Enviar Solicitação");

  function handleSendSolicitation() {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("É necessário efetuar login para solicitar entrada no grupo.");
      return;
    }

    api.post(`group/join/${data._id}`, {}, {
      headers: {
        "authorization": token
      }
    }).then(() => {
      setMessage("Solicitação Enviada!");
    }).catch(() => {
      setMessage("Você já está na lista de espera.");
    })
  }
  return (
    <Container>
      <h1>{data.name}</h1>
      <h2>Requisitos de Software</h2>
      <p>Turma: 02A</p>
      <a onClick={() => setIsModalOpen(true)}>+ Detalhes</a>
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <strong className="modalTitle">{data.name}</strong>
        </Modal.Header>
        <Modal.Body>
          <p>{data.description}.</p>
          <p><strong>Nº Máximo de Integrantes: </strong>{data.membersNumber}</p>
          <p><strong>Nº de Vagas Disponíveis: </strong>{data.membersNumber - data.members.length}</p>
          <strong>Integrantes:</strong>
          {
            data.members.map((member) => {
              return <p key={member.email}>{member.email}</p>
            })
          }
          <a className="sendSolicitation" onClick={() => handleSendSolicitation()}>{message}</a>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export { GroupItem };

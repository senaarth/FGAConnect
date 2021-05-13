import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { api } from "../../services/api";

import { Container, ModalContainer } from "./styles";

function GroupItem({ data, profilePage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("Enviar Solicitação");
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function isUserOnWaitingList() {
      api
        .post(
          `user/me/`,
          {},
          {
            headers: {
              authorization: token,
            },
          }
        )
        .then((res) => {
          const user = res.data.user;

          const checkUser = data.waitingList.some(
            (student) => student._id === user._id
          );
          if (checkUser) {
            setMessage("Você já está na lista de espera.");
          }
        });
    }

    isUserOnWaitingList();
  }, []);

  function handleSendSolicitation() {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("É necessário efetuar login para solicitar entrada no grupo.");
      return;
    }

    api
      .post(
        `group/join/${data._id}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        setMessage("Solicitação Enviada!");
      })
      .catch(() => {
        setMessage("Você já está na lista de espera.");
      });
  }

  return (
    <Container>
      <h1>{data.name}</h1>
      <h2>Requisitos de Software</h2>
      <p>Turma: 02A</p>
      {profilePage ? (
        <a
          href={`/group/${data._id}`}
          style={{ marginLeft: 0 }}
          className="detailsBtn"
          onClick={() => console.log()}
        >
          Ver página do grupo
        </a>
      ) : (
        <p className="detailsBtn" onClick={() => setIsModalOpen(true)}>
          + Detalhes
        </p>
      )}
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <strong className="modalTitle">{data.name}</strong>
        </Modal.Header>
        <Modal.Body>
          <ModalContainer>
            <p>{data.description}.</p>
            <p>
              <strong>Nº Máximo de Integrantes: </strong>
              {data.membersNumber}
            </p>
            <p>
              <strong>Nº de Vagas Disponíveis: </strong>
              {data.membersNumber - data.members.length}
            </p>
            <strong>Integrantes:</strong>
            {data.members.map((member) => {
              return <p key={member.email}>{member.email}</p>;
            })}
            <a
              href={`/group/${data._id}`}
              style={{ marginLeft: 0 }}
              className="detailsBtn"
              onClick={() => console.log()}
            >
              Ver página do grupo
            </a>
            <a
              className="sendSolicitation"
              onClick={() => handleSendSolicitation()}
            >
              {message}
            </a>
          </ModalContainer>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export { GroupItem };

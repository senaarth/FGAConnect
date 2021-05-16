import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Modal } from "react-bootstrap";
import { api } from "../../services/api";

import { Container, ModalContainer } from "./styles";

function GroupItem({ data, profilePage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("Enviar Solicitação");
  const token = localStorage.getItem("@FGAConnect:Token");
  const [isWaiting, setIsWating] = useState(false);
  const [isParticipant, setIsParticipant] = useState(false);
  const history = useHistory();

  const [group, setGroup] = useState(data);

  useEffect(() => {
    async function isUserWaitingOrParticipant() {
      if (token) {
       await api
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
              setIsWating(true);
            }

            const checkMember = data.members.some(
              (student) => student._id === user._id
            );

            if (checkMember) {
              setMessage("Você é um participante");
              setIsParticipant(true);
            }
          }).catch(() => {
            localStorage.setItem("@FGAConnect:Token", "");
            history.go(0);
          })
      }
    }

    isUserWaitingOrParticipant();

    async function getClassData() {
      if (!group) {
        return;
      }
      if (!group.class) {
        return;
      }
      if (group.class.class) {
        api.get(`class/find/${group.class._id}`).then((res) => {
          setGroup({ ...group, class: res.data });
        });
      } else {
        api.get(`class/find/${group.class}`).then((res) => {
          setGroup({ ...group, class: res.data });
        });
      }
    }

    getClassData();
  }, []);

  async function handleSendSolicitation() {
    const token = localStorage.getItem("@FGAConnect:Token");
    if (!token) {
      alert("É necessário efetuar login para solicitar entrada no grupo.");
      return;
    }

    await api
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

  const [subject, setSubject] = useState({
    name: "",
  });

  useEffect(() => {
    async function getSubjectData() {
      if (!group) {
        return;
      }
      if (!group.class) {
        return;
      }
      if (group.class.subject) {
        api.get(`subject/find/${group.class.subject}`).then((res) => {
          setSubject(res.data);
        });
      }
    }

    getSubjectData();
  }, [group]);

  return (
    <Container style={{ maxWidth: profilePage ? "300px" : "" }}>
      <h1>{group.name}</h1>
      <h2>{subject.name}</h2>
      <p>Turma: { group.class && group.class.class }</p>
      {profilePage ? (
        <a
          href={`/group/${group._id}`}
          style={{ marginLeft: 0 }}
          className="detailsBtn"
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
          <strong className="modalTitle">{group.name}</strong>
        </Modal.Header>
        <Modal.Body>
          <ModalContainer>
            <p>{group.description}.</p>
            <p>
              <strong>Nº Máximo de Integrantes: </strong>
              {group.membersNumber}
            </p>
            <p>
              <strong>Nº de Vagas Disponíveis: </strong>
              {group.membersNumber - group.members.length}
            </p>
            <strong>Integrantes:</strong>
            {group.members.map((member) => {
              return <p key={member.email}>{member.email}</p>;
            })}
            <a
              href={`/group/${group._id}`}
              style={{ marginLeft: 0 }}
              className="detailsBtn"
            >
              Ver página do grupo
            </a>
            <p
              style={{
                cursor: isWaiting || isParticipant ? "default" : "pointer",
                marginBottom: 0,
              }}
              className="sendSolicitation"
              onClick={() => {
                if (!isWaiting && !isParticipant) {
                  handleSendSolicitation();
                }
              }}
            >
              {message}
            </p>
          </ModalContainer>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export { GroupItem };

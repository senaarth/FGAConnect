import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { BiTrash, BiEditAlt } from "react-icons/bi";

import { api } from "../../services/api";
import { Container, InfoContainer, StudentsContainer } from "./styles";

export function GroupPage() {
  const { id } = useParams();
  const token = localStorage.getItem("@FGAConnect:Token");
  const [userId, setUserId] = useState({});
  const [isParticipant, setIsParticipant] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [group, setGroup] = useState({
    _id: 1,
    active: false,
    membersNumber: 0,
    waitingList: [],
    members: [],
    name: "",
    description: "",
    class: {},
    groupLider: "",
  });
  const [subject, setSubject] = useState({
    name: "",
  });
  const history = useHistory();

  useEffect(() => {
    async function getUser() {
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
          setUserId(res.data.user._id);
        });
    }
    getUser();

    async function getGroupData() {
      await api
        .get(`group/find/${id}`)
        .then((res) => {
          setGroup(res.data);
        })
        .catch(() => {
          history.push("/");
        });
    }

    getGroupData();
  }, []);

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

    const isUserMember = group.members.some((user) => user._id === userId);

    if (isUserMember) {
      setIsParticipant(true);
    }

    const isUserWaiting = group.waitingList.some((user) => user._id === userId);

    if (isUserWaiting) {
      setIsWaiting(true);
    }
  }, [group, userId]);

  async function handleAcceptMember(userId) {
    await api
      .post(
        `/group/accept/${group._id}/${userId}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        alert("Usuário adicionado ao grupo.");
        history.go(0);
      })
      .catch((err) => {
        alert("Erro ao adicionar usuário ao grupo.");
        history.go(0);
      });
  }

  async function handleDeclineMember(userId) {
    await api
      .post(
        `/group/decline/${group._id}/${userId}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        alert("Usuário removido da lista de espera.");
        history.go(0);
      })
      .catch((err) => {
        alert("Erro ao remover usuário da lista de espera.");
        history.go(0);
      });
  }

  async function handleLeaveGroup() {
    await api
      .post(
        `/group/leave/${group._id}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        alert("Você foi removido do grupo com sucesso.");
        history.go(0);
      })
      .catch((err) => {
        alert("Erro ao sair do grupo.");
        history.go(0);
      });
  }

  async function handleRemoveMember(userId) {
    await api
      .post(
        `/group/kick/${group._id}/${userId}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        alert("Usuário removido do grupo com sucesso.");
        history.go(0);
      })
      .catch((err) => {
        alert("Erro ao remover usuário do grupo.");
        history.go(0);
      });
  }

  async function handleSendSolicitation() {
    if (!token) {
      alert("É necessário efetuar login para solicitar entrada no grupo.");
      return;
    }

    await api
      .post(
        `/group/join/${group._id}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        alert("Solicitação Enviada!");
        history.go(0);
      })
      .catch((err) => {
        alert("Erro ao enviar solicitação.");
        history.go(0);
      });
  }

  async function handleDeleteGroup() {
    await api
      .post(
        `/group/delete/${group._id}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        alert("Grupo deletado com sucesso!");
        history.push("/");
      })
      .catch(() => {
        alert("Erro ao deletar grupo, favor tentar novamente.");
        history.push("/"); 
      });
  }

  return (
    <Container>
      <InfoContainer>
        <h2>
          {group.name}
          {userId === group.groupLider && (
            <span>
              <BiTrash
                onClick={() => handleDeleteGroup()}
                style={{ marginLeft: "0.4rem", cursor: "pointer" }}
                color="red"
                size={20}
              />
              <a href={`/edit-group/${group._id}`}>
                <BiEditAlt
                  color="var(--green)"
                  size={20}
                  style={{ marginRight: "0.6rem" }}
                />
              </a>
            </span>
          )}
        </h2>
        <h5>{subject.name}</h5>
        <h5>Turma {group.class && group.class.class}</h5>
        <p>{group.description}</p>
        {isParticipant ? (
          <p
            style={{
              textDecoration: "none",
              fontSize: "0.8rem",
              color: "red",
              marginTop: "0.5rem",
              cursor: "pointer",
            }}
            onClick={() => handleLeaveGroup()}
          >
            SAIR DO GRUPO
          </p>
        ) : (
          <p
            style={{
              cursor: isWaiting || isParticipant ? "default" : "pointer",
            }}
            className="sendSolicitation"
            onClick={() => {
              if (!isWaiting && !isParticipant) {
                handleSendSolicitation();
              }
            }}
          >
            {isWaiting ? "Você está na lista de espera." : "Enviar solicitação"}
          </p>
        )}
      </InfoContainer>
      <StudentsContainer>
        <div className="membersContainer">
          <h5>Integrantes</h5>
          {group.members.map((member) => {
            const student =
              userId === group.groupLider ? (
                <div
                  key={member._id}
                  className="adminWaitingList"
                  style={{ marginTop: "0.3rem" }}
                >
                  <p>{member.email}</p>
                  {userId !== member._id && (
                    <div>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRemoveMember(member._id)}
                      >
                        <IoMdClose color="red" size={14} />
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <p key={member._id}>{member.email}</p>
              );
            return student;
          })}
        </div>
        <div className="waitingListContainer">
          <h5>Lista de Espera</h5>
          {group.waitingList.map((member) => {
            const student =
              userId === group.groupLider ? (
                <div
                  key={member._id}
                  className="adminWaitingList"
                  style={{ marginTop: "0.3rem" }}
                >
                  <p>{member.email}</p>
                  <div>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleAcceptMember(member._id)}
                    >
                      <FaCheck color="green" size={10} />
                    </span>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeclineMember(member._id)}
                    >
                      <IoMdClose color="red" size={14} />
                    </span>
                  </div>
                </div>
              ) : (
                <p key={member._id}>{member.email}</p>
              );

            return student;
          })}
          {group.waitingList.length === 0 && (
            <p>Não há usuários na lista de espera.</p>
          )}
        </div>
      </StudentsContainer>
    </Container>
  );
}

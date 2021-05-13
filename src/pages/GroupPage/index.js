import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import { api } from "../../services/api";
import { Container, InfoContainer, StudentsContainer } from "./styles";

export function GroupPage() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [userId, setUserId] = useState({});
  const [isParticipant, setIsParticipant] = useState(false);
  const [group, setGroup] = useState({
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
  }, []);

  useEffect(() => {
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

  return (
    <Container>
      <InfoContainer>
        <h2>{group.name}</h2>
        <h5>{subject.name}</h5>
        <h5>Turma {group.class.class}</h5>
        <p>{group.description}</p>
        {isParticipant && (
          <a
            style={{
              textDecoration: "none",
              fontSize: "0.8rem",
              color: "red",
              marginTop: "0.5rem",
            }}
            href="#"
            onClick={() => handleLeaveGroup()}
          >
            SAIR DO GRUPO
          </a>
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
                      <a
                        href="#"
                        onClick={() => handleRemoveMember(member._id)}
                      >
                        <IoMdClose color="red" size={14} />
                      </a>
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
                    <a href="#" onClick={() => handleAcceptMember(member._id)}>
                      <FaCheck color="green" size={10} />
                    </a>
                    <a href="#" onClick={() => handleDeclineMember(member._id)}>
                      <IoMdClose color="red" size={14} />
                    </a>
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

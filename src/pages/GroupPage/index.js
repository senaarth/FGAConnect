import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { api } from "../../services/api";
import { Container, InfoContainer, StudentsContainer } from "./styles";

export function GroupPage() {
  const { id } = useParams();
  const [group, setGroup] = useState({
    active: false,
    membersNumber: 0,
    waitingList: [],
    members: [],
    name: "",
    description: "",
    class: {},
  });

  const [subject, setSubject] = useState({
    name: "",
  });

  useEffect(() => {
    async function getGroupData() {
      await api.get(`group/find/${id}`).then((res) => {
        setGroup(res.data);
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
  }, [group]);

  return (
    <Container>
      <InfoContainer>
        <h2>{group.name}</h2>
        <h5>{subject.name}</h5>
        <h5>Turma {group.class.class}</h5>
        <p>{group.description}</p>
      </InfoContainer>
      <StudentsContainer>
        <div className="membersContainer">
          <h5>Integrantes</h5>
          {group.members.map((member) => {
            return <p key={member._id}>{member.email}</p>;
          })}
        </div>
        <div className="waitingListContainer">
          <h5>Lista de Espera</h5>
          {group.waitingList.map((member) => {
            return <p key={member._id}>{member.email}</p>;
          })}
          {
            group.waitingList.length === 0 && (
              <p>Não há usuários na lista de espera.</p>
            )
          }
        </div>
      </StudentsContainer>
    </Container>
  );
}

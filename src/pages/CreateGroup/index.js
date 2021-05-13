import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { api } from "../../services/api";
import { Container } from "./styles";

export function CreateGroup() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");
  const history = useHistory();
  console.log(token);
  if (!token) {
    alert("Favor logar antes de criar grupo.");
    history.push("/auth");
  }

  useEffect(() => {
    async function getSubjects() {
      await api
        .get("/subject/list")
        .then(({ data }) => {
          setSubjects(data);
        })
        .catch(() => {});
    }

    getSubjects();
  }, []);

  async function handleGroupCreation() {
    if (!name) {
      alert("Favor dar nome ao grupo.");
      return;
    }

    if (!selectedSubject) {
      alert("Favor escolher uma matéria.");
      return;
    }

    if (!selectedClass) {
      alert("Favor escolher uma turma.");
      return;
    }

    await api
      .post(
        `/group/create/${selectedClass}`,
        {
          name,
          description,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(({ data }) => {
        alert("Grupo criado com sucesso.");
        history.push(`/group/${data._id}`);
      })
      .catch((err) => {
        alert("Erro ao criar grupo, favor tentar novamente.");
        history.go(0);
      });
  }

  return (
    <Container>
      <h1>Criar Grupo</h1>
      <input
        onChange={({ target }) => setName(target.value)}
        placeholder="Nome do Grupo"
      />
      <input
        onChange={({ target }) => setDescription(target.value)}
        placeholder="Descrição"
      />
      <select
        defaultValue={selectedSubject}
        onChange={({ target }) => {
          setSelectedSubject(target.value);

          const { classes } = subjects.find(
            (subject) => subject._id === target.value
          );
          setClasses(classes);
        }}
      >
        <option value={selectedSubject} disabled hidden>
          Selecione a Matéria
        </option>
        {subjects.map((subject) => {
          return (
            <option value={subject._id} key={subject._id}>
              {subject.name}
            </option>
          );
        })}
      </select>
      {classes.length > 0 && (
        <select
          style={{ marginTop: "1rem" }}
          defaultValue={selectedClass}
          onChange={({ target }) => {
            setSelectedClass(target.value);
          }}
        >
          <option value={selectedClass} disabled hidden>
            Selecione a Turma
          </option>
          {classes.map((classItem) => {
            return (
              <option value={classItem._id} key={classItem._id}>
                {classItem.class}
              </option>
            );
          })}
        </select>
      )}
      <button onClick={() => handleGroupCreation()}>CRIAR GRUPO</button>
    </Container>
  );
}

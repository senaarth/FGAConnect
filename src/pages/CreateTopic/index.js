import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../services/api";

import { Container } from "./styles";

export function CreateTopic() {
  const token = localStorage.getItem("@FGAConnect:Token");
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!token) {
    alert("Favor se logar antes de criar um tópico.");
    history.push("/auth");
  }

  async function handleSubmitTopic() {
    await api
      .post(
        `/topic/create`,
        {
          title,
          description,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(({ data }) => {
        alert("Tópico criado com sucesso.");
        history.push(`/forum/${data.topic._id}`);
      })
      .catch((err) => {
        alert("Erro ao criar tópico favor tentar novamente.", err);
        history.go(0);
      });
  }

  return (
    <Container>
      <h1>Crie o seu Tópico</h1>
      <h5>
        Basta adicionar um nome e uma descrição e os outros estudantes poderão
        comentar no seu tópico.
      </h5>
      <input
        onChange={({ target }) => {
          setTitle(target.value);
        }}
        placeholder="Título do Tópico"
      />
      <input
        placeholder="Adicione uma Descrição"
        onChange={({ target }) => {
          setDescription(target.value);
        }}
      />
      <button onClick={() => handleSubmitTopic()}>CRIAR</button>
    </Container>
  );
}

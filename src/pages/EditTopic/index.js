import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";

import { Container } from "./styles";
import { api } from "../../services/api";

export function EditTopic() {
  const history = useHistory();
  const { id } = useParams();
  const token = localStorage.getItem("@FGAConnect:Token");
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState({
    user: {
      _id: "",
    },
  });

  useEffect(() => {
    async function getTopic() {
      await api
        .get(`/topic/findbyId/${id}`)
        .then(({ data }) => {
          setTopic(data);
          setTitle(data.title);
          setDescription(data.description);
        })
        .catch(() => {
          history.push("/forum");
        });
    }
    getTopic();

    async function getUser() {
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
            setUserId(res.data.user._id);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    if (userId !== topic.user._id) {
      alert("Você não tem permissão para editar este tópico.");
      history.push("/");
    }
  }, [userId]);

  async function handleSubmit() {
    if (title === "") {
      alert("Título não pode estar vazio.");
      return;
    }
    
    await api
      .put(
        `/topic/update/${topic._id}`,
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
      .then(() => {
        alert("Tópico editado com sucesso");
        history.push(`/forum/${topic._id}`);
      })
      .catch(() => {
        alert("Erro ao editar comentário favor tentar novamente.");
        history.go(0);
      });
  }

  return (
    <Container>
      <h1>Editar Tópico</h1>
      <input value={title} onChange={({ target }) => setTitle(target.value)} />
      <input
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <button onClick={() => handleSubmit()}>ATUALIZAR TÓPICO</button>
    </Container>
  );
}

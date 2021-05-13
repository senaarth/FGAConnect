import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Container } from "./styles";
import { api } from "../../services/api";

export function EditGroup() {
  const history = useHistory();
  const { id } = useParams();
  const token = localStorage.getItem("@FGAConnect:Token");
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [group, setGroup] = useState({
    user: {
      _id: "",
    },
  });

  useEffect(() => {
    async function getTopic() {
      await api
        .get(`/group/find/${id}`)
        .then(({ data }) => {
          setGroup(data);
          setTitle(data.name);
          setUserId(data.groupLider);
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

  //   useEffect(() => {
  //     if (userId !== group.groupLider) {
  //       alert("Você não tem permissão para editar este grupo.");
  //       history.push("/");
  //     }
  //   }, [userId]);

  async function handleSubmit() {
    if (title === "") {
      alert("Título não pode estar vazio.");
      return;
    }

    await api
      .put(
        `/group/update/${id}`,
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
        alert("Grupo editado com sucesso");
        history.push(`/group/${id}`);
      })
      .catch(() => {
        alert("Título ou descrição inválida, favor tentar novamente.");
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

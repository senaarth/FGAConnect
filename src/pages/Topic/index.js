import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BiTrash, BiEditAlt } from "react-icons/bi";

import { api } from "../../services/api";
import { Container } from "./styles";

export function TopicPage() {
  const { topicId } = useParams();
  const token = localStorage.getItem("@FGAConnect:Token");
  const history = useHistory();
  const [userId, setUserId] = useState("");
  const [topic, setTopic] = useState({
    _id: "1",
    title: "Título do Tópico",
    description: "Descrição do tópico",
    createdAt: new Date(),
    comments: [],
    user: {
      _id: "",
      email: "",
    },
  });
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function getTopic() {
      await api
        .get(`/topic/findbyId/${topicId}`)
        .then(({ data }) => {
          setTopic(data);
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

  async function handleTopicDelete() {
    await api
      .post(
        `/topic/delete/${topic._id}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        alert("Tópico deletado com sucesso.");
        history.push("/forum");
      })
      .catch(() => {
        alert("Erro ao deletar tópico, favor tentar novamente.");
        history.push("/forum");
      });
  }

  async function handleCommentDelete(commentId) {
    await api
      .post(
        `/comment/delete/${commentId}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        alert("Comentário deletado com sucesso!");
        history.go(0);
      })
      .catch((err) => {
        alert("Erro ao deletar comentario, favor tentar novamente.");
        history.go(0);
      });
  }

  async function handleComment() {
    await api
      .post(
        `/comment/create/${topic._id}`,
        {
          text: comment,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        alert("Comentário realizado com sucesso.");
        history.go(0);
      });
  }

  return (
    <Container>
      <h3>{topic.title}</h3>
      <h5>{topic.description}</h5>
      {topic.user._id === userId ? (
        <div className="maintainTopic" style={{ marginBottom: "1.5rem" }}>
          <a href={`/edit-topic/${topic._id}`}>
            <BiEditAlt
              color="var(--blue)"
              size={20}
              style={{ marginRight: "0.6rem" }}
            />
          </a>
          <BiTrash
            color="var(--red)"
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => handleTopicDelete()}
          />
        </div>
      ) : (
        <p>Criado por {topic.user.email}</p>
      )}
      <div className="inputContainer">
        <input
          placeholder="Comentar Tópico"
          onChange={({ target }) => {
            setComment(target.value);
          }}
        />
        <button onClick={() => handleComment()}>COMENTAR</button>
      </div>
      <div className="commentsContainer">
        {topic.comments.map((comment) => {
          return (
            <div key={comment._id} className="commentItem">
              <div className="commentText">
                <p>{comment.text}</p>
                <p>{comment.user.email}</p>
              </div>
              <div className="commentLikes">
                {comment.user._id === userId && (
                  <BiTrash
                    color="var(--red)"
                    size={15}
                    style={{ cursor: "pointer", marginLeft: "0.6rem" }}
                    onClick={() => handleCommentDelete(comment._id)}
                  />
                )}
              </div>
            </div>
          );
        })}
        {topic.comments.length === 0 && (
          <p style={{ color: "gray", textAlign: "center" }}>
            Não foram encontrados comentários neste tópico
          </p>
        )}
      </div>
    </Container>
  );
}

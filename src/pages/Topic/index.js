import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BiLike, BiTrash, BiEditAlt } from "react-icons/bi";

import { api } from "../../services/api";
import { Container } from "./styles";

export function TopicPage() {
  const { topicId } = useParams();
  const token = localStorage.getItem("@FGAConnect:Token");
  const [userId, setUserId] = useState("");
  const [topic, setTopic] = useState({
    _id: "1",
    title: "Título do Tópico",
    description: "Descrição do tópico",
    createdAt: new Date(),
    comments: [
      {
        text: "Isso aqui é um comentário.",
        user: {
          email: "email@email.com",
        },
        likes: [],
      },
      {
        text: "Isso aqui é outro comentário.",
        user: {
          email: "email@email.com",
          _id: userId,
        },
        likes: ["1"],
      },
    ],
    user: "iddousuario",
  });

  useEffect(() => {
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
    // Deleta tópico
  }

  async function handleCommentDelete(commentId) {
    // Deleta commentario
  }

  return (
    <Container>
      <h3>{topic.title}</h3>
      <h5>{topic.description}</h5>
      <p>{JSON.stringify(topic.createdAt)}</p>
      {topic.user !== userId && (
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
      )}
      <div className="commentsContainer">
        {topic.comments.map((comment) => {
          return (
            <div key={comment._id} className="commentItem">
              <div className="commentText">
                <p>{comment.text}</p>
                <p>{comment.user.email}</p>
              </div>
              <div className="commentLikes">
                <p>{comment.likes.length}</p>
                <BiLike color="#008940" size={15} />
                {comment.user._id !== userId && (
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
      </div>
    </Container>
  );
}

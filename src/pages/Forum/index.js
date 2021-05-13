import React, { useState, useEffect } from "react";
import { TopicItem } from "../../components/TopicItem";

import { Container } from "./styles";
import { api } from "../../services/api";

export function ForumPage() {
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState(topics);

  const [filter, setFilter] = useState("");

  function handleFilterTopics() {
    const filteredTopics = topics.filter((topic) =>
      topic.title.toLowerCase().includes(filter)
    );
    setFilteredTopics(filteredTopics);
  }

  useEffect(() => {
    async function getTopics() {
      await api.get("/topic/list").then(({ data }) => {
        setTopics(data);
        setFilteredTopics(data);
      });
    }

    getTopics();
  }, []);

  return (
    <Container>
      <h1>Fórum</h1>
      <a
        style={{ textDecoration: "none", color: "var(--green)" }}
        href="/create-topic"
      >
        Criar Tópico
      </a>
      <div className="inputsContainer">
        <input
          placeholder="Filtrar Tópicos"
          onChange={({ target }) => {
            setFilter(target.value.toLowerCase());

            if (target.value === "") {
              setFilteredTopics(topics);
            }
          }}
        />
        <button onClick={() => handleFilterTopics()}>PESQUISAR</button>
      </div>
      {filteredTopics.map((topic) => {
        return <TopicItem key={topic._id} data={topic} />;
      })}
      {filteredTopics.length === 0 && <p>Nenhum tópico encontrado.</p>}
    </Container>
  );
}

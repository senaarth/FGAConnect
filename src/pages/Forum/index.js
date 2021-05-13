import React, { useState, useEffect } from "react";
import { TopicItem } from "../../components/TopicItem";

import { Container } from "./styles";

export function ForumPage() {
  const [topics, setTopics] = useState([
    {
      _id: "1",
      title: "Chave perdida na I4",
      description:
        "Encontrei uma chave na I4 ontem, horário das 16h, tem um chaveiro do homem aranha, dono me procurar meu email é admin@admin.com",
      likes: [],
      comments: [],
    },
    {
      _id: "2",
      title: "Vagas de Estágio",
      description: "Fórum dedicado a publicação de vagas de estágio",
      likes: [],
      comments: [],
    },
  ]);
  const [filteredTopics, setFilteredTopics] = useState(topics);

  const [filter, setFilter] = useState("");

  function handleFilterTopics() {
    const filteredTopics = topics.filter((topic) => topic.title.toLowerCase().includes(filter));
    setFilteredTopics(filteredTopics);
  }

  return (
    <Container>
      <h1>Fórum</h1>
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
      {
        filteredTopics.length === 0 && (
          <p>Nenhum tópico encontrado.</p>
        )
      }
    </Container>
  );
}

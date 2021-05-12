import React from "react";
import { GroupsTable } from "../../components/GroupsTable";
import { Container, Content } from "./styles";

function Landing() {
  return (
    <Container>
      <Content>
        <h1>
          Bem vindo(a) ao <strong>FGA Connect</strong>
        </h1>
        <h2>Esperamos facilitar a sua vida dentro da FGA</h2>
        <p>
          Aqui você pode encontrar grupos nas matérias que procura ou aquele
          integrante que falta para completar o seu. Veja os diversos grupos que
          já temos cadastrados:
        </p>
      </Content>
      <GroupsTable filterOptions={{ type: null }} />
    </Container>
  );
}

export { Landing };

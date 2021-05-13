import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { api } from "../../services/api";
import { Container, GroupsContainer } from "./styles";
import { GroupItem } from "../../components/GroupItem";

function ProfilePage() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({
    groups: []
  });
  const history = useHistory();

  if (!token) {
    history.push("/auth");
  }

  useEffect(() => {
    async function getUser() {
      await api.post(`user/me/`, {}, {
        headers: {
          authorization: token,
        }
      }).then((res) => {
        setUser(res.data.user);
      });
    }

    getUser();
  }, []);

  function handleLogout() {
    localStorage.setItem("token", "");
    history.push("/");
  }

  return (
      <Container>
        <h2>{user.name}</h2>
        <h5 style={{ textAlign: "center" }}>{user.description}</h5>
        <h2>Seus Grupos</h2>
        <GroupsContainer>
        {
          user.groups.length > 0 ? (
            user.groups.map((group, index) => {
              return <GroupItem key={index} data={group} profilePage={true} />
            })
          ) : (
            <p>Você ainda não participa de nenhum grupo.</p>
          )
        }
        </GroupsContainer>
        <a href="/create-group" className="createGroup" style={{ marginTop: "2rem"}}>Criar um Grupo</a>
        <a href="#" onClick={() => handleLogout()} style={{ marginTop: "2rem", textDecoration: "none", color: "black" }}>SAIR</a>
      </Container>
    )
}

export { ProfilePage };

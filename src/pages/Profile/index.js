import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../services/api";
import { Container } from "./styles";

function ProfilePage() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const history = useHistory();

  api.post(`user/me/`, {}, {
    headers: {
      authorization: token,
    }
  }).then((res) => {
    setUser(res.data.user);
  });

  function handleLogout() {
    localStorage.setItem("token", "");
    history.push("/");
  }

  return (
      <Container>
        <h1>{user.name}</h1>
        <h2>{user.description}</h2>
        <a onClick={() => handleLogout()}>SAIR</a>
      </Container>  
    )
}

export { ProfilePage };

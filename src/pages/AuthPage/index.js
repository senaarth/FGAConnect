import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { Container, SignupContainer, LoginContainer } from "./styles";

function AuthPage() {
  const { token, getToken } = useAuth();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPass, setSignupPass] = useState("");
  const [signupPassConfirm, setSignupPassConfirm] = useState("");

  let history = useHistory();

  const hasToken = localStorage.getItem("token");
  if (hasToken) {
    history.push("/profile");
  }

  function handleLogin() {
    const login = {
      email: loginEmail,
      password: loginPass,
    };

    getToken(login);
    clearInputs();
    history.push("/");
  }

  async function handleSignup() {
    if (!(signupPass === signupPassConfirm)) {
      alert("Senha e confirmação de senha não batem.");
      return;
    }

    const signUp = {
      name: signupName,
      email: signupEmail,
      password: signupPass,
    };

    await api
      .post("user/register", signUp)
      .then((res) => {
        if (res.status === 200) {
          alert("Cadastro realizado com sucesso!");
          clearInputs();
        }
      })
      .catch((err) => {
        clearInputs();
        alert("Erro no cadastro: " + err);
      });
  }

  function clearInputs() {
    setLoginEmail("");
    setLoginPass("");
    setSignupName("");
    setSignupEmail("");
    setSignupPass("");
    setSignupPassConfirm("");
  }

  return (
    <Container>
      <SignupContainer>
        <h1>Não possui conta? Faça seu cadastro!</h1>
        <input
          value={signupName}
          type="text"
          placeholder="Nome"
          onChange={(e) => setSignupName(e.target.value)}
        ></input>
        <input
          value={signupEmail}
          type="text"
          placeholder="E-Mail"
          onChange={(e) => setSignupEmail(e.target.value)}
        ></input>
        <input
          value={signupPass}
          type="password"
          placeholder="Senha"
          onChange={(e) => setSignupPass(e.target.value)}
        ></input>
        <input
          value={signupPassConfirm}
          type="password"
          placeholder="Confirme sua senha"
          onChange={(e) => setSignupPassConfirm(e.target.value)}
        ></input>
        <button onClick={handleSignup}>Realizar Cadastro</button>
      </SignupContainer>
      <LoginContainer>
        <h1>Já tem cadastro? Faça o login</h1>
        <input
          type="text"
          placeholder="E-Mail"
          onChange={(e) => setLoginEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setLoginPass(e.target.value)}
        ></input>
        <button onClick={handleLogin}>Entrar</button>
      </LoginContainer>
    </Container>
  );
}

export { AuthPage };

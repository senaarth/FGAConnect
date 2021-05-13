import React, { useState } from "react";
import { GroupsTable } from "../../components/GroupsTable";
import { Container, InputContainer } from "./styles";

function Groups() {
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filterOptions, setFilterOptions] = useState({
      type: null,
      value: null
  });

  function handleFilterTypeChange(e) {
    setFilterType(e.target.value);
  }

  function handleFilterValueChange(e) {
    setFilterValue(e.target.value);
  }

  function handleFilterOptionsChange() {
    setFilterOptions({
        type: filterType,
        value: filterValue
    });
  }

  return (
    <Container>
      <InputContainer>
        <div>
          <select defaultValue={null} onChange={() => handleFilterTypeChange}>
            <option value={null} disabled hidden>
              Selecione a Categoria de Filtro
            </option>
            <option value="Subject">Filtrar por Matéria</option>
            <option value="Name">Filtrar pelo nome do Grupo</option>
            <option value="Class">Filtrar por Turma</option>
            <option value="Status">Filtrar por Status (Ativo ou Não)</option>
          </select>
          <input
            type="text"
            onChange={handleFilterValueChange}
            placeholder="Digite o valor do seu filtro"
          ></input>
        </div>
        <button onClick={handleFilterOptionsChange}>Filtrar</button>
      </InputContainer>
      <GroupsTable filterOptions={filterOptions} />
    </Container>
  );
}

export { Groups };

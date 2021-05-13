import React, { useEffect, useState } from "react";

import { api } from "../../services/api";
import { Container } from "./styles";
import { GroupItem } from "../GroupItem";

function GroupsTable({ filterOptions }) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function getGroups() {
      if (!filterOptions.type) {
        await api.get("/group/list").then((res) => setGroups(res.data));
      } else {
        await api
          .get(`group/findBy/${filterOptions.type}/${filterOptions.value}`)
          .then((res) => setGroups(res.data));
      }
    }

    getGroups();
  }, [filterOptions]);

  return (
    <Container>
      {groups.map((group, index) => {
        return <GroupItem key={index} data={group} />;
      })}
    </Container>
  );
}

export { GroupsTable };

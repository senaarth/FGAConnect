import React, { useState } from "react";

import { Container } from "./styles";

export function TopicItem({ data }) {
    return (
        <Container>
            <h1>{data.title}</h1>
            <a href={`/forum/${data._id}`}>Visitar Página do Tópico</a>
        </Container>
    );
}
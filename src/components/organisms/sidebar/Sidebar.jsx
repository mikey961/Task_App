import styled from "styled-components";

export function Sidebar({ state, onClose }) {
  if (!state) return null;

  return (
    <Container>
      <h1>Sidebar</h1>
    </Container>
  );
}

const Container = styled.div`
  
`;
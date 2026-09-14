import { useState } from "react";
import { Button, useAuthStore } from "../index";
import styled from "styled-components";

export function Home() {
  const signout = useAuthStore((s) => s.signOut);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signout();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ButtonWrapper>
        <Button onClick={handleLogout} disabled={loading}>
          {loading ? 'Cerrando sesión...' : 'Cerrar sesión'}
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
`;

const ButtonWrapper = styled.div`
  width: 200px;
`;

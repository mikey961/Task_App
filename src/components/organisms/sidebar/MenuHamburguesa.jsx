import styled from "styled-components";
import { v } from "../../../index";

export function MenuHamburguesa({ onClick }) {
  return (
    <Button type="button"
      onClick={onClick}
      aria-label="Abrir o cerrar el menú">
      <v.iconoMenu size={20}/>
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.bg4};
  }
`;
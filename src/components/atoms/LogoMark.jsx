import styled from "styled-components";
import { v } from "../../index";

export function LogoMark({ size = '48px', iconSize = 24 }) {
  return (
    <IconBox size={size}>
      <v.iconoCircleCheck size={iconSize}
        color="#FFFFFF"
        strokeWidth={2.5}/>
    </IconBox>
  );
}

const IconBox = styled.div`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 12px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary} 0%, ${({ theme }) => theme.bg6} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
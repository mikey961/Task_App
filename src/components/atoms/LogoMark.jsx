import styled from "styled-components";

export function LogoMark({ size }) {
  return (
    <IconBox>
      <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 12.5l2 2 4-4.5M12 21a9 9 0 100-18 9 9 0 000 18z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconBox>
  );
}

const IconBox = styled.div`
  width: ${({ size }) => size || '48px'};
  height: ${({ size }) => size || '48px'};
  border-radius: 12px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary} 0%, ${({ theme }) => theme.bg5} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
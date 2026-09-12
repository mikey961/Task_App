import styled from "styled-components";

export function AppFooter({ year = new Date().getFullYear() }) {
  return (
    <Bar>
      <LeftSection>
        <span>{year} &bull; FlowTask</span>
      </LeftSection>
      <CenterSection>
        <span>&bull; &copy; {year} Inc. Todos los derechos reservados.</span>
      </CenterSection>
      <RightSection>
        <span>v1.0.0</span>
      </RightSection>
    </Bar>
  );
}

const Bar = styled.footer`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1.2rem 2rem;
  font-size: 0.90rem;
  color: ${({ theme }) => theme.textMuted || '#8F8B8B'};
  background: ${({ theme }) => theme.bgtotal};
  border-top: 1px solid ${({ theme }) => theme.border || 'rgba(255, 255, 255, 0.05)'};
`;

const LeftSection = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const CenterSection = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
`;
import styled from "styled-components";

export function LoginTemplate({ header, footer, children }) {
  return (
    <Page>
      <Glow/>
      {header}
      <Main>
        {children}
      </Main>
      {footer}
    </Page>
  );
}

const Page = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bgtotal};
  overflow: hidden;
`;

const Glow = styled.div`
  position: absolute;
  top: 83px;
  left: 50%;
  transform: translateX(-50%);
  width: 1200px;
  max-width: 100vw;
  height: 400px;
  background: radial-gradient(
    ellipse 70% 45% at 50% 0%,
    color-mix(
      in srgb,
      ${({ theme }) => theme.glow} 30%,
      transparent
    ),
    transparent 75%
  );
  pointer-events: none;
  z-index: 0;
`;

const Main = styled.main` 
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  gap: 1.5rem;
`;
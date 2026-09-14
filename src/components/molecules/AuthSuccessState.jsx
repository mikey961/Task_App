import styled from "styled-components";
import { MailCheck } from "lucide-react";
import { AuthFormFooter, Button } from "../../index";

export function AuthSuccessState({ title, children, onBack, backLabel = 'Volver a iniciar sesión' }) {
  return (
    <Wrapper>
      <HeaderGroup>
        <IconWrap>
          <MailCheck size={26}/>
        </IconWrap>
        {title && <Title>{title}</Title>}
      </HeaderGroup>
      <Description>{children}</Description>
      <AuthFormFooter>
        Todo Listo &bull;
        {onBack && (
          <Button type="button"
            onClick={onBack}>
            {backLabel}
          </Button>
        )}
      </AuthFormFooter>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const IconWrap = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: color-mix(in srgb, ${({ theme }) => theme.success} 18%, trasnparent);
  color: ${({ theme }) => theme.success};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const Description = styled.p`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.textMuted};
  text-align: center;
  line-height: 1.5;
  margin: 0;
  strong {
    color: ${({ theme }) => theme.text};
  }
`;
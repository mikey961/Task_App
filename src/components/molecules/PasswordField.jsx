import styled from "styled-components";
import { Input } from "../../index";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function PasswordField({ label = 'Contraseña', error, id, ...inputProps }) {
  const [visible, setVisible] = useState(false)

  return (
    <Wrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <InputRow>
        <StyledInput id={id}
          type={visible ? 'text' : 'password'} {...inputProps}/>
        <ToggleButton type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
          {visible ? <Eye size={18}/> : <EyeOff size={18}/>}
        </ToggleButton>
      </InputRow>
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
  text-align: left;
`;

const Label = styled.label`
  font-size: 1rem;
  color: ${({ theme }) => theme.textMuted};
`;

const InputRow = styled.div`
  position: relative;
`;

const StyledInput = styled(Input)`
  padding-right: 2.6rem;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textMuted};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: background 0.2s ease, color 0.2s ease;
  &:hover {
    background: ${({ theme }) => theme.bg2 || 'rgba(255, 255, 255, 0.08)'};
    color: ${({ theme }) => theme.text || '#ffffff'};
  }
`;

const ErrorText = styled.span`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.error};
`;
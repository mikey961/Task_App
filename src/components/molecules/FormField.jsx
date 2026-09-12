import styled from "styled-components";
import { Input } from '../../index';

export function FormField({ label, error, id, ...inputProps }) {
  return (
    <Wrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input id={id}
        {...inputProps}/>
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

const ErrorText = styled.span`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.error};
`;
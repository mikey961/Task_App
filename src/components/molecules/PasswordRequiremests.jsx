import styled from "styled-components";

const RULES = [
  {
    id: 'length',
    label: 'La contraseña debe tener al menos 8 caracteres.',
    test: (p) => p.length >= 8
  },
  {
    id: 'upper',
    label: 'La contraseña debe tener al menos una letra mayúscula.',
    test: (p) => /[A-Z]/.test(p)
  },
  {
    id: 'lower',
    label: 'La contraseña debe tener al menos una letra minúscula.',
    test: (p) => /[a-z]/.test(p)
  },
  {
    id: 'number',
    label: 'La contraseña debe tener al menos un número.',
    test: (p) => /[0-9]/.test(p)
  },
  {
    id: 'special',
    label: 'La contraseña debe tener al menos un caráter especial.',
    test: (p) => /[^A-Za-z0-9]/.test(p)
  }
];

export function PasswordRequirements({ password, evaluated }) {
  const pendingRules = RULES.filter((rule) => !rule.test(password))

  if (pendingRules.length === 0) return null;

  return (
    <List>
      {pendingRules.map((rule) => (
        <Item key={rule.id}
          $failed={evaluated}>
          {rule.label}
        </Item>
      ))}
    </List>
  ); 
}

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: -0.5rem 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Item = styled.li`
  font-size: 0.86rem;
  line-height: 1.4rem;
  display: flex;
  align-items: center;
  color: ${({ $failed, theme }) => ($failed ? theme.error : theme.text)};
  &::before {
    content: '\\2022';
    font-size: 1rem;
    line-height: 1;
    color: currentColor;
    margin-right: 0.5rem;
  }
`;

export function isPasswordValid(password) {
  return RULES.every((rule) => rule.test(password));
}
import styled from "styled-components";
import { AuthCard, AuthFormError, Button, isPasswordValid, PasswordField, PasswordRequirements, useAuthStore } from "../../index";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function ResetPasswordCard() {
  const navigate = useNavigate();
  const updatePassword = useAuthStore((state) => state.updatePassword);
  const signOut = useAuthStore((state) => state.signout);
  const [password, setPassword] = useState('');
  const [confirmPassword, setPasswordConfirm] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const passwordValid = isPasswordValid(password);
  const passwordMatch = password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitted(true);

    if (!passwordValid || !passwordMatch) {
      return;
    }

    setLoading(true);
    try {
      await updatePassword(password);
      await signOut();
      navigate('/login')
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const getPasswordError = () => {
    if (!submitted) return undefined;
    if (!password.trim()) return 'La contraseña es obligatoria.';
    if (!passwordValid) return 'La contraseña no cumple con los requisitos.';
    return undefined;
  }

  const getConfirmPasswordError = () => {
    if (!submitted) return undefined;
    if (!confirmPassword.trim()) return 'Se debe confirmar la contraseña.';
    if (!passwordMatch) return 'Las contraseñas no coinciden.';
    return undefined;
  }

  return (
    <AuthCard>
      <Title>Cambiar contraseña</Title>
      {error && <AuthFormError>{error}</AuthFormError>}
      <form onSubmit={handleSubmit} noValidate>
        <PasswordField id="new-password"
          label="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingrese la nueva contraseña"
          autoComplete="new-password"
          error={getPasswordError()}
          required/>
        <PasswordRequirements password={password}
          evaluated={submitted}/>
        <PasswordField id="confirm-password"
          label="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="Confirme la nueva contraseña"
          autoComplete="new-password"
          error={getConfirmPasswordError()}
          required/>
        <Button type="submit"
          disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar contraseña'}
        </Button>
      </form>
    </AuthCard>
  );
}

const Title = styled.h1`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
  text-align: center;
  margin: 0 0 1.4rem;
`;
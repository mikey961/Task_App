import styled from "styled-components";
import { AuthCard, AuthFormError, AuthFormFooter, AuthFormSuccess, Button, FormField, isPasswordValid, PasswordField, PasswordRequirements, useAuthStore } from "../../index";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isEmailValid = (value) => EMAIL_REGEX.test(value);

export function SignUpCard() {
  const navigate = useNavigate();
  const signUp = useAuthStore((state) => state.signUp);
  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [pendingConfirm, setPendingConfirm] = useState(null);
  const emailValid = isEmailValid(email);
  const passwordValid = isPasswordValid(password);
  const passwordMatch = password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitted(true);

    if (!emailValid || !passwordValid || !passwordMatch) {
      return;
    }

    setLoading(true);
    try {
      const data = await signUp(email, password, name, apellido);

      if (data.session) {
        navigate('/');
      } else {
        setPendingConfirm(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (pendingConfirm) {
    return (
      <AuthCard>
        <AuthFormSuccess>
          Listo, Te enviamos un enlace a <strong>{email}</strong> para confirmar tu cuenta antes de poder iniciar sesión.
        </AuthFormSuccess>
        <AuthFormFooter>
          <Button type="button"
            onClick={() => navigate('/login')}>
            Volver a iniciar sesión
          </Button>
        </AuthFormFooter>
      </AuthCard>
    );
  }

  const getEmailError = () => {
    if (!submitted) return undefined;
    if (!email.trim()) return 'El correo electrónico es obligatorio.';
    if (!emailValid) return 'El correo electrónico no es válido';
    return undefined;
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
      {error && <AuthFormError>{error}</AuthFormError>}
      <form onSubmit={handleSubmit} noValidate>
        <FormField id="signup-name"
          label="Nombre"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ingrese su nombre"
          autoComplete="name"/>
        <FormField id="signup-lastname"
          label="Apellido"
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          placeholder="Opcional"
          autoComplete="apellido"/>
        <FormField id="signup-email"
          label="Correo"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingrese un correo electrónico"
          autoComplete="email"
          error={getEmailError()}
          required/>
        <WrapperPasswords>
          <PasswordField id="signup-password"
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese una contraseña"
            autoComplete="new-password"
            error={getPasswordError()}
            required/>
          <PasswordRequirements password={password}
            evaluated={submitted}/>
          <PasswordField id="signup-password-confirm"
            label="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme la contraseña"
            autoComplete="new-password"
            error={getConfirmPasswordError()}
            required/>
        </WrapperPasswords>
        <Button type="submit"
          disabled={loading}>
          {loading ? 'Creando cuenta' : 'Crear cuenta'}
        </Button>
      </form>
      <AuthFormFooter>
        ¿Ya tienes una cuenta?{' '}
        &bull;
        <Button type="button"
          onClick={() => navigate('/login')}>
          Iniciar sesión
        </Button>
      </AuthFormFooter>
    </AuthCard>
  );
}

const WrapperPasswords = styled.div`
  & > *:last-child {
    margin-bottom: 1.5rem;
  }
`;
import styled from "styled-components";
import { Button, FormField, GoogleSignButton, AuthCard, PasswordField, useAuthStore, AuthFormFooter } from '../../index';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginCard() {
  const navigate = useNavigate();
  const signWithEmail = useAuthStore((state) => state.signWithEmail);
  const signWithGoogle = useAuthStore((state) => state.signWithGoogle);
  const sendPasswordReset = useAuthStore((state) => state.sendPasswordReset);
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signWithEmail(email, password);
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false);
    }
  }

  const handleGoogle = async () => {
    setLoading(true);

    try {
      await signWithGoogle();
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard>
      {mode === 'login' && (
        <>
          {error && <GlobalError>{error}</GlobalError>}
          <form onSubmit={handleLogin} noValidate>
            <FormField id='login-email'
              label='Correo electrónico'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Ingrese su correo electrónico'
              autoComplete="off"
              required/>
            <PasswordField id='login-password'
              label="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              autoComplete="new-password"
              required/>
              <ForgotLink type="button"
                onClick={() => { 
                  setError(null); 
                  setMode('recover'); }}>
                ¿Olvidaste tu contraseña?
              </ForgotLink>
              <Button type="submit"
                disabled={loading}>
                {loading ? 'Ingresando...' : 'Iniciar Sesión'}
              </Button>
          </form>
          <Divider>o continuar con</Divider>
          <GoogleSignButton onClick={handleGoogle}
            disabled={loading}>
            Continuar con google
          </GoogleSignButton>
          <AuthFormFooter>
            ¿No tienes una cuenta?{' '}
            &bull;
            <Button type="button"
              onClick={() => navigate('/register')}>
              Registrase
            </Button>
          </AuthFormFooter>
        </>
      )}
    </AuthCard>
  );
}

const GlobalError = styled.p`
  color: ${({ theme }) => theme.error};
  font-size: 0.85rem;
  margin: -0.4rem 0 1rem;
  text-align: center;
`;

const ForgotLink = styled.button`
  position: relative;
  display: block;
  top: 5px;
  margin: -0.4rem 0 1rem auto;
  background: none;
  border: none;
  padding: 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textMuted};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colorForgotPass};
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 1.4rem 0;
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.92rem;
  &::before, &::after {
    content: '';
    flex: 1;
    height: 1.5px;
    background: ${({ theme }) => theme.border};
  }
`;
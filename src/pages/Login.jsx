import { AppFooter, AppHeader, LoginCard, LoginTemplate } from '../index';

export function Login() {
  return (
    <LoginTemplate header={<AppHeader/>}
      footer={<AppFooter/>}>
      <LoginCard/>
    </LoginTemplate>
  );
}
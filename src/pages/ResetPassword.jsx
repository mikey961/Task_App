import { AppFooter, AppHeader, LoginTemplate, ResetPasswordCard } from '../index'
export function ResetPassword() {
  return (
    <LoginTemplate header={<AppHeader/>}
      footer={<AppFooter/>}>
      <ResetPasswordCard/>
    </LoginTemplate>
  );
}
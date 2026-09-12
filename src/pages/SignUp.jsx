import styled from "styled-components";
import { AppFooter, AppHeader, LoginTemplate, SignUpCard } from "../index";

export function SignUp() {
  return (
    <LoginTemplate header={<AppHeader/>} 
      footer={<AppFooter/>}>
      <SignUpCard/>
    </LoginTemplate>
  );
}
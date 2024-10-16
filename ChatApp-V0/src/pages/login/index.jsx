import React from "react";
import styles from "./login.module.scss";
import background from "./background.module.scss";
import FormLogin from "./FormLogin";
import { Container } from "react-bootstrap";
export default function Login() {
  return (
    <>
      <Container fluid className={background.containerFluid}>
        {Array.from({ length: 100 }, (_, i) => (
          <div key={i} className={background.circleContainer}>
            <div className={background.circle}></div>
          </div>
        ))}
        <Container>
          <FormLogin />
        </Container>
      </Container>
    </>
  );
}

import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import {
  Container,
  Col,
  Row,
  InputGroup,
  FormControl,
  Button
} from "react-bootstrap";

import { SERVER_URL } from "../config";

import { userLogin } from "../store/user";

const Login = ({ userData, login, history }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const submit = history => {
    let data = {
      email,
      password
    };
    axios
      .post(SERVER_URL + "users/login", data)
      .then(response => response.data)
      .then(res => {
        console.log(res);
        login(res);
        if (res.loginSuccess) history.push("dashboard");
        else alert("Wrong!");
      });
  };

  return (
    <Container style={{ width: "300px", marginTop: "150px" }}>
      <Row style={{ justifyContent: "center" }}>
        <h2>Log In</h2>
      </Row>
      <Row>
        <Col>
          <Row>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon2">
                  <span className="fa fa-envelope" />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="User Email"
                aria-label="User Email"
                aria-describedby="basic-addon1"
                onChange={e => setEmail(e.target.value)}
              />
            </InputGroup>
          </Row>
          <Row>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon2">
                  <span className="fa fa-lock" />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="password"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon2"
                onChange={e => setPassword(e.target.value)}
              />
            </InputGroup>
          </Row>
          <Row>
            <Button
              variant="primary"
              style={{ width: "100%" }}
              onClick={() => submit(history)}
            >
              Login
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(userLogin(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

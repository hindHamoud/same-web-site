import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {connect} from "react-redux";

import {
  Container,
  Col,
  Row,
  InputGroup,
  FormControl,
  Button
} from "react-bootstrap";

import {SERVER_URL} from "../../config";

const AddUsers = ({ title = "Register",  history ,user }) => {
  const [firstName, setFirstName] = React.useState("");
  
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password1, setPassword1] = React.useState("");
  const submit = () => {
    let data = {
      firstName,
      email,
      password,
      password1,
      role:1,
      image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
      admin:user._id,
    };
    if (
      password.length === 0 ||
      password1.length === 0 ||
      password !== password1
    ) {
      return;
    }
    console.log(data);
    axios.post(SERVER_URL + "users/register", data).then(res => res.data).then(datas => {
      if(datas.success && title === "Register") {
        history.push("/dashboard");
      } else if(!datas.success) {
        alert("Already Exist Or Failed to Register");
      }
    });
  };
  return (
    <Container style={{ width: "300px", marginTop: "100px" }}>
      <Row style={{ justifyContent: "center" }}>
        
        <h2>Add Users</h2>
      </Row>
      <Row>
        <Col>
          <Row>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon2">
                  <span style={{ width: "70px" }}>FirstName</span>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="FirstName"
                aria-label="FirstName"
                aria-describedby="basic-addon1"
                onChange={e => {
                  setFirstName(e.target.value);
                }}
              />
            </InputGroup>
          </Row>
          <Row>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon2">
                  <span style={{ width: "70px" }}>Email</span>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon2"
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </InputGroup>
          </Row>
          <Row>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon2">
                  <span style={{ width: "70px" }}>Password</span>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="password"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon2"
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
            </InputGroup>
          </Row>
          <Row>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon2">
                  <span style={{ width: "70px" }}>Confirm</span>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="password"
                placeholder="Password Confirm"
                aria-label="Password Confirm"
                aria-describedby="basic-addon2"
                onChange={e => {
                  setPassword1(e.target.value);
                }}
              />
            </InputGroup>
          </Row>
          <Row>
            <Button
              variant="primary"
              style={{ width: "100%" }}
              onClick={submit}
            >
              Add
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(withRouter(AddUsers));

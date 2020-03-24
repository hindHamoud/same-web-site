import React from "react";
import axios from "axios";

import {
  Container,
  Row,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import { SERVER_URL } from "../config";

const ChatRoom = ({ users, manager }) => {
    
    
    const [ setChatMessage] = React.useState("");
    
    React.useEffect(() => {
      axios.get(SERVER_URL + "chat/getChats?ID=" + manager.userId).then(res => res.json()).then(messages => {
        console.log(messages);
      })
    }, []);

  return (
    <Container>
      <h3 style={{ margin: 0, textAlign: "center" }}>Chat Room</h3>
      <Container style={{ height: "450px", overflowY: "scroll" }}>
        {users.map(user => {
          return <h4 key={user._id}>{user.email}</h4>;
        })}
      </Container>
      <Container style={{ position: "fixed", bottom: 0 }}>
        <Row style={{ width: "70%" }}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter your messages"
              aria-label="Enter your messages"
              aria-describedby="basic-addon2"
              onChange={e => setChatMessage(e.target.value)}
            />
          </InputGroup>
        </Row>
      </Container>
    </Container>
  );
};

export default ChatRoom;
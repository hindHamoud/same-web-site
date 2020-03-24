import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import io from "socket.io-client";



import {
   Button,
  FormControl,
  InputGroup,
  Container,
  Row,
  Col
} from "react-bootstrap";


import { SERVER_URL } from "../config";
import { setAllChat, setNewChat} from "../store/chat";

const Chat = ({ users, manager, chats, setAllChat, setNewChat }) => {
  const [user, setUsers] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [chatMessage, setChatMessage] = React.useState("");
  const [socket, setSocket] = React.useState(io("http://127.0.0.1:5000"));
  // React.useEffect(() => {
  //   if (manager.role === 1) {
  //     axios
  //       .post(SERVER_URL + "users/allusers", { id: manager.userId })
  //       .then(res => res.data)
  //       .then(datas => {
  //         console.log(datas);
  //         setUsers(datas);
  //       });
  //   }
  // }, []);

  React.useEffect(() => {
    console.log("chat data fetching");
    socket.on("Output Chat Message", message => {
      console.log(message);
      setNewChat(message);
      // setMessages(draft => {draft.push(message)});
      // console.log(messages);
      // console.log(chats);
    });
  }, []);
  const submit = () => {
    let userId = manager.userId;
    // let userName = this.props.user.userData.name;
    // let userImage = this.props.user.userData.image;
    let nowTime = new Date();
    let type = "Text";
    console.log(user);
    socket.emit("Input Chat Message", {
      chatMessage,
      userId,
      user,
      // userName,
      // userImage,
      nowTime,
      type
    });
    setChatMessage("");
  };

  const chatUser = clientId => {
    setUsers(clientId);
    let data = {
      server: manager.userId,
      client: clientId
    };
    console.log(data);
    socket.emit("CreateRoom", data);
    axios
      .post(SERVER_URL + "chat/getChats", data)
      .then(res => res.data)
      .then(msgs => {
        console.log(msgs);
        setAllChat(msgs);
        console.log(chats);
      });
  };

  return (
    <div>
      <Container>
        <Row>
          <Col sm={3} style={{borderRight: "2px solid black"}}>
            <h3 style={{ textAlign: "center", margin: 0 }}>Users</h3>
            {users.map(user => {
              return (
                <h4
                  key={Math.random()}
                  style={{ margin: "5px", cursor: "pointer", backgroundColor: "#aaa", textAlign: "center" }}
                  onClick={() => {chatUser(user._id); setUserName(user.firstName )}}
                >
                  {user.firstName }
                </h4>
              );
            })}
          </Col>
          <Col sm={9}>
            <h3 style={{ margin: 0, textAlign: "center" }}>Chat Room</h3>
            <Container style={{ height: "450px", overflowY: "scroll" }}>
              {chats.map(msg => {
                let output = msg.sender === manager.userId? "You:" + msg.message: userName + ":" + msg.message;
                return <h4 key={Math.random()}>{output}</h4>;
              })}
            </Container>
            <Container style={{ position: "fixed", bottom: 0 }}>
              <Row style={{ width: "70%" }}>
                <InputGroup className="mb-3">
                  <FormControl
                    value={chatMessage}
                    placeholder="Enter your messages"
                    aria-label="Enter your messages"
                    aria-describedby="basic-addon2"
                    onChange={e => setChatMessage(e.target.value)}
                  />
                  <InputGroup.Append>
                  <Button type="primary" style={{ width: '100%' }} onClick={submit} htmlType="submit">
                                    send
                                </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    chats: state.chat.messages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAllChat: (data) => dispatch(setAllChat(data)),
    setNewChat: (data) => dispatch(setNewChat(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

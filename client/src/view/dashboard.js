import React from "react";
import {connect} from "react-redux";
import { Route, Switch, BrowserRouter as Router, Link, withRouter } from "react-router-dom";

import axios from 'axios';

import { Layout, Drawer, Navigation, Content } from "react-mdl";
import { Container, Row,  } from "react-bootstrap";
import { CommentOutlined, UserOutlined,ReconciliationOutlined } from "@ant-design/icons";

import { SERVER_URL } from '../config';

import Users from './users/users';

import Chat from './chat';
import Plan from './plan/plan'

const Dashboard = ({ user, history }) => {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    // if (user.role === 1) {
      axios
        .get(SERVER_URL + "users/allusers")
        .then(res => res.data)
        .then(datas => {
          console.log(datas);
          setUsers(datas);
        });
    // }
  }, [history]);
  return (
    <div style={{ height: "calc(100vh - 60px)", position: "relative" }}>
      <Router>
        <Layout fixedDrawer>
          <Drawer title="Menu">
            <Navigation>
              <Link to="/dashboard/user">
                <UserOutlined />
                User
              </Link>
              <Link to="/dashboard/chat">
                <CommentOutlined />
                Chat
              </Link>
              <Link to="/dashboard/plan">
              <ReconciliationOutlined />
                Plan
              </Link>
            </Navigation>
          </Drawer>
          <Content>
            <Switch>
              <Route path="/dashboard/user">
                <Container>
                  <Row>
                    <Users />
                  </Row>
                </Container>
              </Route>
              <Route path="/dashboard/chat"><Chat users={users} manager={user} /></Route>
              <Route path="/dashboard/plan">
                <Container>
                  <Row>
                    <Plan/>
                  </Row>
                </Container>
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(withRouter(Dashboard));

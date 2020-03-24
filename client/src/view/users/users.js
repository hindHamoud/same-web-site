import React from 'react';
import {  Button ,Avatar} from 'antd';
import { SERVER_URL } from '../../config';
import { Container, Row } from "react-bootstrap";
import {connect} from "react-redux";
import{List,ListItem,ListItemContent,ProgressBar}from 'react-mdl'
import { Route, Switch, BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import Add from './add'
import Collapsible from 'react-collapsible';


  class Users extends React.Component {

    constructor(props){
      super(props);
      this.state = {
          isLoading: false,
          users: []
      }
  }

componentDidMount = () => {
  fetch(SERVER_URL + "users/allusers")
  .then(res=>res.json())
  .then(json=>{
    this.setState({
      isLoading:true,
      users:json,
    })
  })}
     

    render(){
      const{isLoading,users}=this.state;
      if(!isLoading){
        return <ProgressBar indeterminate />
      }else {return (
        <div style={{height: '300px' }}>
          
      
          
          
          <List style={{width: '650px'}}>
          {users.map(user=>
    <ListItem threeLine >
      
    <ListItemContent  subtitle={user.email}>{user.firstName}</ListItemContent>
    </ListItem>)}
</List>
<Collapsible trigger={<Link to="/dashboard/user/add"><Button type="primary" >Add new user</Button></Link>}>
<Route path="/dashboard/user/add">
                <Container>
                  <Row>
                  <Add />
                  </Row>
                </Container>
              </Route></Collapsible>
</div>
      );
    }}}
    const mapStateToProps = (state) => {
      return {
        user: state.user
      }
    }
    
    export default connect(mapStateToProps)(withRouter(Users)) ;
import React, { Component } from 'react'
import { Route, Switch, BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import { Button,Layout } from "react-mdl";
import Incident from './incident.js'
import Collapsible from 'react-collapsible';
import { Container, Row } from "react-bootstrap";


export class choose extends Component {
    constructor() {
        super()
        this.state = {
          incident: ''}
          
    }

   
    render() {
    
    return(
        
        <div style={{margin:'30px'}}>
            <Layout>

<Collapsible trigger={<Link to="/dashboard/plan/incidect"><Button  type="primary" onClick={()=>{this.setState({incident:'incident A'})}}> incident A</Button></Link>}><Switch>
              <Route path="/dashboard/plan/incidect">
                <Container>
                  <Row>
                  <Incident incident={this.state.incident}/>
                  </Row>
                </Container>
              </Route>
              
              
            </Switch></Collapsible>



</Layout>
        </div>
    )}}

export default choose;
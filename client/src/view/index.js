import React from "react";
 import "./home.css"
import mBkg from "../image/background.jpg";
import bBkg from "../image/underBackgrouns.jpeg";
import {MailOutlined,PhoneOutlined,EnvironmentOutlined} from '@ant-design/icons';
class LandingPage extends React.Component{
  
render() {
  return (
    <div className='page' >
      <div className="image">
    <img src={mBkg} className="background" alt="background"/>
    <div className="text1"  >
    <p style={{fontSize:'35px',lineHeight:'80px',textShadow:'5px 5px #f9e9c9c',fontWeight: 'bold'}}>Under One Framework ‏ 
    <p style={{fontSize:'35px',lineHeight:'10px',textShadow:'5px 5px #f9e9c9c',fontWeight: 'bold'}}>Basic DR Services with Smooth Work!</p>
    <p style={{fontSize:'30px',lineHeight:'5px',textShadow:'5px 5px #f9e9c9c',fontWeight: 'bold'}}>_______________________</p></p>
    </div>
    </div>
    <img src={bBkg} className="background" alt="background"/>

    <div style={{background:'gray'}} >
      
            <lu style={{fontSize:"16px", textDecoration:"underline"}}>Contact Information:  </lu>
            <br/>
        <li style={{fontSize:"16px"}}> <MailOutlined style={{fontSize:"20px"}} /> support@recoverly.com </li>
        
        <li style={{fontSize:"16px"}}>  <PhoneOutlined style={{fontSize:"20px"}} />  +966531682593  </li>
        
        
        <li style={{fontSize:"16px"}}> <EnvironmentOutlined style={{fontSize:"20px"}} /> saudi arabia , qassim  </li>
        </div>
    </div>
  );
}}

export default LandingPage  ;
import React from 'react'
import './SendEmail.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from 'emailjs-com'
import {Form , Button} from 'react-bootstrap'

class SendEmail extends React.Component{
    constructor(props){
        super(props)
        
        this.state={
            tip_utilizator:props.match.params.tipUtilizator,
            iduser:props.match.params.iduser,
            email:props.match.params.email
        }

        this.email=(evt)=> {
            evt.preventDefault();
            
            emailjs.sendForm('gmail', 'template_gnrz5d5', evt.target, 'user_KIpRQtQrC1GW9esC0ZDhE')
              .then((result) => {
                  console.log(result.text);
              }, (error) => {
                  console.log(error.text);
              });
            this.props.history.push(`/${this.state.tip_utilizator}`)
        }
        this.email=this.email.bind(this)
   
    }

    render(){
        return(
        <>
            <Form onSubmit={this.email} className="emailForm">
                <Form.Label>Catre:</Form.Label>
                <Form.Control type="text" value={this.state.email} name="to_name"></Form.Control>
                <Form.Label>De la:</Form.Label>
                <Form.Control type="text" name="from_name"></Form.Control>
                <Form.Label>Subiect:</Form.Label>
                <Form.Control type="text" name="subject"></Form.Control>
                <Form.Label>Mesaj:</Form.Label>
                <Form.Control type="textarea" name="message"></Form.Control>
                <Button className="sendEmailbtn" variant="primary" type="submit">Trimite</Button>
            </Form>
        </>
        )
    }
}

export default SendEmail
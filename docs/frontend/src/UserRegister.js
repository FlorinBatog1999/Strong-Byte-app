import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import './UserRegister.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button  } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import vegetarianUserStore from './vegetarieni/VegetarianUserStore'
import carnivorousUserStore from './carnivori/CarnivorousUserStore'
import apivegetarianUserStore from './apivegetarian/ApivegetarianUserStore'
import lactovegetarianUserStore from './lactovegetarian/LactovegetarianUserStore'
import lactoovovegetarianUserStore from './lactoovovegetarian/lactovegetarian/LactoovovegetarianUserStore'

class UserRegister extends React.Component{
    constructor(props){
        super(props)
        
        this.state={
            iduser: '',
            nume:'',
            prenume:'',
            email:'',
            data_logare:new Date(),
            tip_utilizator:"vegetarian"
            
        }
        this.handleSelectedTipUtilizator=(evt)=>{
            this.setState({tip_utilizator:evt.target.value})
            
        } 
        this.handleChangedIDuser=(evt)=>{
            this.setState({
                iduser:evt.target.value
            })
        }
        this.handleChangedNume=(evt)=>{
            this.setState({
                nume:evt.target.value
            })
        }
        this.handleChangedPrenume=(evt)=>{
            this.setState({
                prenume:evt.target.value
            })
        }
        this.handleChangedEmail=(evt)=>{
            this.setState({
                email:evt.target.value
            })
        }
        this.handleChangedDataLogare=(evt)=>{
            this.setState({
                data_logare:evt.target.value
            })
        }

        this.handleCreateUser=(evt)=>{
            evt.preventDefault();
            const user={
                iduser:this.state.iduser,
                nume:this.state.nume,
                prenume:this.state.prenume,
                email:this.state.email,
                data_logare:this.state.data_logare,
                tip_utilizator:this.state.tip_utilizator
            }
            if(this.state.iduser==""){
                alert("Introduceti iduser-ul")
            }
            else if(this.state.nume==""){
                alert("Introduceti numele")
            }   
            else if(this.state.prenume==""){
                alert("Introduceti prenumele")
            }
            else if(this.state.email==""){
                alert("Introduceti adresa de mail")
            }
            else if(this.state.tip_utilizator==="vegetarian"){
                vegetarianUserStore.addOne(user)
                console.log(user)
                alert(`${this.state.nume}, ai fost inregistrat`);
            }else if(this.state.tip_utilizator==="carnivor"){
                carnivorousUserStore.addOne(user)
                console.log(user)
                alert(`${this.state.nume}, ai fost inregistrat`);
            }else if(this.state.tip_utilizator==="apivegetarian"){
                apivegetarianUserStore.addOne(user)
                console.log(user)
                alert(`${this.state.nume}, ai fost inregistrat`);
            }else if(this.state.tip_utilizator==="lactovegetarian"){
                lactovegetarianUserStore.addOne(user)
                console.log(user)
                alert(`${this.state.nume}, ai fost inregistrat`);
            }else if(this.state.tip_utilizator==="lactoovovegetarian"){
                lactoovovegetarianUserStore.addOne(user)
                console.log(user)
                alert(`${this.state.nume}, ai fost inregistrat`);
            }
            else{
                console.log("Nimic")
            }
        }
        this.handleDeleteUser=(evt)=>{
            evt.preventDefault();
            const iduser=this.state.iduser
            vegetarianUserStore.deleteOne(iduser)
            alert(`Contul a fost sters`);
        }
        this.goOnMyList=()=>{
            if(this.state.id===""){
                alert("Introduceti numele iduser-ul")
            }else{
               this.props.history.push(`/myaccount/${this.state.tip_utilizator}/${this.state.iduser}/mylist`)
            }
        }
        this.goOnMyGroup=()=>{
            this.props.history.push(`/${this.state.tip_utilizator}`)
        }
        this.handleSelectedTipUtilizator=this.handleSelectedTipUtilizator.bind(this)
        this.handleChangedIDuser=this.handleChangedIDuser.bind(this),
        this.handleChangedNume=this.handleChangedNume.bind(this),
        this.handleChangedPrenume=this.handleChangedPrenume.bind(this),
        this.handleChangedEmail=this.handleChangedEmail.bind(this),
        this.handleChangedDataLogare=this.handleChangedDataLogare.bind(this),
        this.goOnMyList=this.goOnMyList.bind(this)
          
    }
    render(){
        return(
        <>
        <h1>Inregistreaza-te</h1>
        <br/><br/>  
        <Form className="form">
        <Form.Label>IDuser</Form.Label>
        <Form.Control type="text" placeholder="Iduser" value={this.state.iduser}  onChange={this.handleChangedIDuser} />
        <Form.Text className="text-muted">
            IDuser este folosit pentru accesarea listei proprii.
        </Form.Text>
        <Form.Label>Nume</Form.Label>
        <Form.Control type="text" placeholder="Nume" value={this.state.nume} onChange={this.handleChangedNume} />
        <Form.Label>Prenume</Form.Label>
        <Form.Control type="text" placeholder="Prenume" value={this.state.prenume} onChange={this.handleChangedPrenume}/>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Email" value={this.state.email} onChange={this.handleChangedEmail}/>
        <Form.Label>Data logarii</Form.Label>
        <br/>
        <Form.Control value={this.state.data_logare} onChange={this.handleChangedDataLogare}/>
        <br/>
        <Form.Label>Tip utilizator</Form.Label>
        <Form.Control as="select" value={this.state.tip_utilizator} onChange={this.handleSelectedTipUtilizator}>
            <option>vegetarian</option>
            <option>carnivor</option>
            <option>apivegetarian</option>
            <option>lactovegetarian</option>
            <option>lactoovovegetarian</option>
        </Form.Control>
        <Form.Text className="text-muted">
            Pentru a merge catre grupa dumneavoastra selectati tipul de utilizator
        </Form.Text>
        <br/><br/>
        <Button variant="primary"  type="submit" onClick={this.handleCreateUser}>
            Inregistreaza-te
        </Button>
        <Button variant="primary"  type="submit" onClick={this.handleDeleteUser}>
            Elimina contul
        </Button>
        <Button variant="primary" type="submit" onClick={this.goOnMyList}>
                Lista mea
        </Button> 
        <Button variant="primary" type="submit" onClick={this.goOnMyGroup} >
                Grupa mea
        </Button>
        </Form>
        </>
        )
        
    }
}

export default UserRegister
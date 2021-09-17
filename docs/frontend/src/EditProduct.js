import React from 'react'
import { render } from 'react-dom'
import vegetarianUserStore from './vegetarieni/VegetarianUserStore'
import carnivorousUserStore from './carnivori/CarnivorousUserStore'
import apivegetarianUserStore from './apivegetarian/ApivegetarianUserStore'
import lactovegetarianUserStore from './lactovegetarian/LactovegetarianUserStore'
import lactoovovegetarianUserStore from './lactoovovegetarian/lactovegetarian/LactoovovegetarianUserStore'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button  } from 'react-bootstrap'

class EditProduct extends React.Component{
    constructor(props){
        super(props)
        
        this.state={
            tip_utilizator:props.match.params.tipUtilizator,
            id:props.match.params.id,
            iduser:props.match.params.iduser,
            nume:'',
            nume_proprietar:'',
            prenume_proprietar:'',
            data_expirare:''
            
        }
        this.modificaProdusul=()=>{
            const idParameter=this.state.id
            const iduserParameter=this.state.iduser
            const product={
                nume:this.state.nume,
                nume_proprietar:this.state.nume_proprietar,
                prenume_proprietar:this.state.prenume_proprietar,
                data_expirare:this.state.data_expirare
            }
            try{
                if(this.state.tip_utilizator==="vegetarian"){
                    vegetarianUserStore.saveOneProduct(iduserParameter,idParameter,product)
                    console.log("Am modificat")
                }else if(this.state.tip_utilizator==="carnivor"){
                    carnivorousUserStore.saveOneProduct(iduserParameter,idParameter,product)
                    console.log("Am modificat")
                }
                else if(this.state.tip_utilizator==="apivegetarian"){
                    apivegetarianUserStore.saveOneProduct(iduserParameter,idParameter,product)
                    console.log("Am modificat")
                }
                else if(this.state.tip_utilizator==="lactovegetarian"){
                    lactovegetarianUserStore.saveOneProduct(iduserParameter,idParameter,product)
                    console.log("Am modificat")
                }
                else if(this.state.tip_utilizator==="lactoovovegetarian"){
                    lactoovovegetarianUserStore.saveOneProduct(iduserParameter,idParameter,product)
                    console.log("Am modificat")
                }
                else{
                    console.log("Update esuat")
                }
            }
            catch(err){
                console.log("Eroare")
            }
        }
        this.onHandleChangedNume=(evt)=>{
            this.setState({
                nume:evt.target.value
            })
        }
        this.onHandleChangedNumeProprietar=(evt)=>{
            this.setState({
                nume_proprietar:evt.target.value
            })
        }
        this.onHandleChangedPrenumeProprietar=(evt)=>{
            this.setState({
                prenume_proprietar:evt.target.value
            })
        }
        this.onHandleChangedDataExpirare=(evt)=>{
            this.setState({
                data_expirare:evt.target.value
            })
        }
        this.onHandleChangedNumeProprietar=this.onHandleChangedNumeProprietar.bind(this);
        this.onHandleChangedPrenumeProprietar=this.onHandleChangedPrenumeProprietar.bind(this);
        this.onHandleChangedNume=this.onHandleChangedNume.bind(this);
        this.onHandleChangedDataExpirare= this.onHandleChangedDataExpirare.bind(this)
        this.modificaProdusul=this.modificaProdusul.bind(this)
    }

    render(){
        return(
        <>
        <h1>Modifica produsul selectat</h1>
        <br/><br/>
        <Form>
            <Form.Control type="text" placeholder="Nume produs" value={this.state.nume} onChange={this.onHandleChangedNume}></Form.Control>
            <br/>
            <Form.Control type="text" placeholder="Nume proprietar" value={this.state.nume_proprietar} onChange={this.onHandleChangedNumeProprietar}></Form.Control>
            <br/>
            <Form.Control type="text" placeholder="Prenume proprietar" value={this.state.prenume_proprietar} onChange={this.onHandleChangedPrenumeProprietar}></Form.Control>
            <br/>
            <Form.Control type="text" placeholder="Data expirare" value={this.state.data_expirare} onChange={this.onHandleChangedDataExpirare}></Form.Control
            >
            <br/>
            <Button variant="primary" type="submit" onClick={this.modificaProdusul}>Modifica produsul</Button>
        </Form>
        
        </>
        )
    }
}

export default EditProduct
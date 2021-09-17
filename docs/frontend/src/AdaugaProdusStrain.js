import React from 'react'
import { render } from 'react-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button  } from 'react-bootstrap'
import vegetarianUserStore from './vegetarieni/VegetarianUserStore'
import carnivorousUserStore from './carnivori/CarnivorousUserStore'
import apivegetarianUserStore from './apivegetarian/ApivegetarianUserStore'
import lactovegetarianUserStore from './lactovegetarian/LactovegetarianUserStore'
import lactoovovegetarianUserStore from './lactoovovegetarian/lactovegetarian/LactoovovegetarianUserStore'
class AdaugaProdusStrain extends React.Component{
    constructor(props){
        super(props)
        
        this.state={
            tip_utilizator:props.match.params.tipUtilizator,
            iduser:props.match.params.iduser,
            nume:props.match.params.nume,
            nume_proprietar:props.match.params.numeProprietar,
            prenume_proprietar:props.match.params.prenumeProprietar,
            data_expirare:props.match.params.dataExpirare
            
        }
        this.adaugaInListaMea=()=>{
            const idParameter=this.state.iduser
            const product={
                nume:this.state.nume,
                nume_proprietar:this.state.nume_proprietar,
                prenume_proprietar:this.state.prenume_proprietar,
                data_expirare:this.state.data_expirare
            }
            try{
                if(this.state.tip_utilizator==="vegetarian"){
                    vegetarianUserStore.addOneProduct(product,idParameter)
                }else if(this.state.tip_utilizator==="carnivor"){
                    carnivorousUserStore.addOneProduct(product,idParameter)
                }else if(this.state.tip_utilizator==="apivegetarian"){
                    apivegetarianUserStore.addOneProduct(product,idParameter)
                }else if(this.state.tip_utilizator==="lactovegetarian"){
                    lactovegetarianUserStore.addOneProduct(product,idParameter)
                }else if(this.state.tip_utilizator==="lactoovovegetarian"){
                    lactoovovegetarianUserStore.addOneProduct(product,idParameter)
                }
            }
            catch(err){
                console.log("Eroare")
            }
        }
        this.onHandleChangedIduser=(evt)=>{
            this.setState({
                iduser:evt.target.value
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
        this.onHandleChangedIduser=this.onHandleChangedIduser.bind(this);
        this.onHandleChangedNumeProprietar=this.onHandleChangedNumeProprietar.bind(this);
        this.onHandleChangedPrenumeProprietar=this.onHandleChangedPrenumeProprietar.bind(this);
    }
    render(){
        return(
        <>
        <h1>Detalii produs selectat</h1>
        <br/><br/>
        <Form.Control type="text" value={this.state.iduser} onChange={this.onHandleChangedIduser}></Form.Control>
        <br/>
        <Form.Control type="text" value={this.state.nume}></Form.Control>
        <br/>
        <Form.Control type="text" value={this.state.nume_proprietar} onChange={this.onHandleChangedNumeProprietar}></Form.Control>
        <br/>
        <Form.Control type="text" value={this.state.prenume_proprietar} onChange={this.onHandleChangedPrenumeProprietar}></Form.Control>
        <br/>
        <Form.Control type="text" value={this.state.data_expirare}></Form.Control>
        <br/>
        <Button type="submit" variant="primary" onClick={this.adaugaInListaMea}>Adauga in lista personala</Button>
        </>
        )
    }
}

export default AdaugaProdusStrain
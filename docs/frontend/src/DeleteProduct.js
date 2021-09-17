import React from 'react'
import { render } from 'react-dom'
import { withRouter} from 'react-router-dom'
import vegetarianUserStore from './vegetarieni/VegetarianUserStore'
import carnivorousUserStore from './carnivori/CarnivorousUserStore'
import apivegetarianUserStore from './apivegetarian/ApivegetarianUserStore'
import lactovegetarianUserStore from './lactovegetarian/LactovegetarianUserStore'
import lactoovovegetarianUserStore from './lactoovovegetarian/lactovegetarian/LactoovovegetarianUserStore'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap'

class DeleteProduct extends React.Component{
    constructor(props){
        super(props)
        
        this.state={
            tip_utilizator:props.match.params.tipUtilizator,
            id:props.match.params.id,
            iduser:props.match.params.iduser
        }
        this.stergeProdusul=()=> {
            const iduserParameter=this.state.iduser;
            const idParameter=this.state.id;
            try{
            if(this.state.tip_utilizator==="vegetarian"){
                vegetarianUserStore.deleteOneProduct(iduserParameter,idParameter)
                console.log("Am sters")
            }else if(this.state.tip_utilizator==="carnivor"){
                carnivorousUserStore.deleteOneProduct(iduserParameter,idParameter)
                console.log("Am sters")
            }
            else if(this.state.tip_utilizator==="apivegetarian"){
                apivegetarianUserStore.deleteOneProduct(iduserParameter,idParameter)
                console.log("Am sters")
            }
            else if(this.state.tip_utilizator==="lactovegetarian"){
                lactovegetarianUserStore.deleteOneProduct(iduserParameter,idParameter)
                console.log("Am sters")
            }
            else if(this.state.tip_utilizator==="lactoovovegetarian"){
                lactoovovegetarianUserStore.deleteOneProduct(iduserParameter,idParameter)
                console.log("Am sters")
            }
            else{
                console.log("Stergere esuata")
            }}
            catch(err){
                console.log("Eroare")
            }
            this.props.history.push(`/myaccount/vegetarian/${this.state.iduser}/mylist`)
        }
        this.return=()=>{
            this.props.history.push(`/myaccount/vegetarian/${this.state.iduser}/mylist`)
        }
   
    }

    render(){
        return(
        <>
        <h1>Sigur vrei sa stergi acest produs?</h1>
        <br/><br/>
        <Button variant="primary" onClick={this.stergeProdusul}>Da</Button>
        <Button variant="primary" onClick={this.return}>Nu</Button>
        </>
        )
    }
}

export default DeleteProduct
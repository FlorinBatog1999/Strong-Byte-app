import React from 'react'
import { render } from 'react-dom'
import vegetarianUserStore from './vegetarieni/VegetarianUserStore'
import { Link } from 'react-router-dom'
import './App.css';
import './MyProducts.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'react-bootstrap'
import carnivorousUserStore from './carnivori/CarnivorousUserStore';
import apivegetarianUserStore from './apivegetarian/ApivegetarianUserStore';
import lactovegetarianUserStore from './lactovegetarian/LactovegetarianUserStore';
import lactoovovegetarianUserStore from './lactoovovegetarian/lactovegetarian/LactoovovegetarianUserStore';
const SERVER = 'http://localhost:5000'

const Myproduct=(props)=>{
    let data1=new Date()
    let data2=new Date(props.data)
    return(
        <tr className={data1.getTime()<data2.getTime() ? "green" : "red"}>
            <td>{props.iduser}</td>
            <td>{props.myproduct.nume}</td>
            <td>{props.data}</td>
            <td>
                <Link to={`/myaccount/${props.tipUtilizator}/${props.iduser}/mylist/edit/${props.myproduct.id}`}>Editare</Link>
                <Link to={`/myaccount/${props.tipUtilizator}/${props.iduser}/mylist/${props.myproduct.id}`}>Sterge</Link>
            </td>
        </tr> 
    
    )
}
class MyProducts extends React.Component{
    constructor(props){
        super(props)
        this.state={
            iduser:props.match.params.iduser,
            tip_utilizator:props.match.params.tipUtilizator,
            nume:'',
            nume_proprietar:'',
            prenume_proprietar:'',
            data_expirare:new Date(),
            myproducts:[]
        }
        this.componenteLista=()=>{
            return this.state.myproducts.map(function(currentproduct){
                return <Myproduct myproduct={currentproduct} data={currentproduct.data_expirare} iduser={props.match.params.iduser} tipUtilizator={props.match.params.tipUtilizator} key={currentproduct.id}></Myproduct>
            })
        }
     
        this.handleChangedIduser=(evt)=>{
            this.setState({
                iduser:evt.target.value
            })
        }
        this.handleChangedNume=(evt)=>{
            this.setState({
                nume:evt.target.value
            })
        }
        this.handleChangedNumeProprietar=(evt)=>{
            this.setState({
                nume_proprietar:evt.target.value
            })
        }
        this.handleChangedPrenumeProprietar=(evt)=>{
            this.setState({
                prenume_proprietar:evt.target.value
            })
        }
        this.handleChangedDataExpirare=(evt)=>{
            this.setState({
                data_expirare:evt.target.value
            })
        }
     
        this.handleCreateProduct=(evt)=>{
            evt.preventDefault();
            const idParameter=this.state.iduser
            const product={
                iduser:this.state.iduser,
                nume:this.state.nume,
                nume_proprietar:this.state.nume_proprietar,
                prenume_proprietar:this.state.prenume_proprietar,
                data_expirare:this.state.data_expirare
            }
            if(this.state.tip_utilizator==="vegetarian"){
                vegetarianUserStore.addOneProduct(product,idParameter)
                console.log(product)
            }else if(this.state.tip_utilizator==="carnivor"){
                carnivorousUserStore.addOneProduct(product,idParameter)
                console.log(product)
            }else if(this.state.tip_utilizator==="apivegetarian"){
                apivegetarianUserStore.addOneProduct(product,idParameter)
                console.log(product)
            }else if(this.state.tip_utilizator==="lactovegetarian"){
                lactovegetarianUserStore.addOneProduct(product,idParameter)
                console.log(product)
            }else if(this.state.tip_utilizator==="lactoovovegetarian"){
                lactoovovegetarianUserStore.addOneProduct(product,idParameter)
                console.log(product)
            }
           
        }

        this.handleChangedIduser=this.handleChangedIduser.bind(this),
        this.handleChangedNume=this.handleChangedNume.bind(this),
        this.handleChangedNumeProprietar=this.handleChangedNumeProprietar.bind(this),
        this.handleChangedPrenumeProprietar=this.handleChangedPrenumeProprietar.bind(this),
        this.handleChangedDataExpirare=this.handleChangedDataExpirare.bind(this),
        this.handleCreateProduct=this.handleCreateProduct.bind(this)
          
    }
    componentDidMount(){
            fetch(`${SERVER}/myaccount/${this.state.iduser}/mylist`).then(res=>res.json()).then(products=>{this.setState({myproducts:products},
              ()=>{console.log(products)})})
    }
    render(){
        return(
        <>
        <h1>Adauga, sterge, modifica un produs </h1>
        <br/><br/>
        <Form className="formAdaugareLista">
            <Form.Control type="text" placeholder="Iduser" value={this.state.iduser} onChange={this.handleChangedIduser}></Form.Control>
            <br/>
            <Form.Control type="text" placeholder="Nume" value={this.state.nume} onChange={this.handleChangedNume}></Form.Control>
            <br/>
            <Form.Control type="text" placeholder="Nume proprietar" value={this.state.nume_proprietar} onChange={this.handleChangedNumeProprietar}></Form.Control>
            <br/>
            <Form.Control type="text" placeholder="Prenume proprietar" value={this.state.prenume_proprietar}  onChange={this.handleChangedPrenumeProprietar}></Form.Control>
            <br/>
            <Form.Control type="text" placeholder="Data expirare" value={this.state.data_expirare}  onChange={this.handleChangedDataExpirare}></Form.Control>
            <br/>
            <Button className="butonAdaugare" type="submit" variant="primary" onClick={this.handleCreateProduct}>Adauga</Button>
        </Form>
       
        <h1 className="h1Lista">Lista</h1>
        <table className="table">
            <thead>
                <tr>
                    <th >IDuser</th>
                    <th >Nume</th>
                    <th >Data expirare</th>
                    <th >Actiuni</th>
                </tr>
            </thead>
            <tbody>
                    {this.componenteLista()}
            </tbody>
        </table>
        </>
        )
    }
}

export default MyProducts
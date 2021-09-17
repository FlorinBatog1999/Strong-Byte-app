import React from 'react'
import { Link } from 'react-router-dom'
const SERVER = 'http://localhost:5000'
const Product= (props) =>{
    return(
    <tr>
        <td>{props.iduser}</td>
        <td>{props.product.nume}</td>
        <td>{props.product.nume_proprietar}</td>
        <td>{props.product.prenume_proprietar}</td>
        <td>{props.product.data_expirare}</td>
        <td><Link to={`/detaliiProdus/${props.tipUtilizator}/${props.iduser}/${props.product.nume}/${props.product.nume_proprietar}/${props.product.prenume_proprietar}/${props.product.data_expirare}`} >Detalii produs</Link></td>
    </tr>
    )
}
class UserProducts extends React.Component{
    constructor(props){
        super(props)
        this.state={
            tip_utilizator:props.match.params.tipUtilizator,
            iduser:props.match.params.iduser,
            myproducts:[]
        }
        this.mylist=()=>{
            return this.state.myproducts.map(function(currentproduct,index){
                return <Product product={currentproduct} tipUtilizator={props.match.params.tipUtilizator} iduser={props.match.params.iduser} key={index}/>
            })
        }
    }
    componentDidMount(){
      fetch(`${SERVER}/myaccount/${this.state.iduser}/mylist`).then(res=>res.json()).then(products=>{this.setState({myproducts:products},
        ()=>{console.log(products)})})
    }
    render(){
        return(
            <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Iduser</th>
                        <th>Nume</th>
                        <th>Nume proprietar</th>
                        <th>Prenume proprietar</th>
                        <th>Data expirare</th>
                    </tr>
          
                </thead>
                <tbody>
                    {this.mylist()}
                </tbody>
            </table>
            </>
        )
    }
}
export default UserProducts
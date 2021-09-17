import React from 'react'
import { Link } from 'react-router-dom'
import carnovorousUserStore from './CarnivorousUserStore'
const SERVER = 'http://localhost:5000'
const CarnivorousItem=(props)=>{
    return(
    <tr>
        <td>{props.carnivorous.iduser}</td>
        <td>{props.carnivorous.nume}</td>
        <td>{props.carnivorous.prenume}</td>
        <td>{props.carnivorous.email}</td>
        <td>{props.carnivorous.data_logare}</td>
        <td><Link to={`/carnivorousaccount/${props.carnivorous.iduser}/mylist`}>Lista lui {props.carnivorous.nume}</Link></td>
        <td><Link to={`/carnivorousaccount/${props.carnivorous.iduser}/mylist/${props.carnivorous.email}`}>Trimite-i mail lui {props.carnivorous.nume}</Link></td>
    </tr>
    )
}
class Carnivorous extends React.Component{
    constructor(){
        super()
        this.state={
            carnivorous:[]
        }
        this.componenteLista=()=>{
            return this.state.carnivorous.map(function(currentcarnivorous){
                return(
                    <CarnivorousItem carnivorous={currentcarnivorous} key={currentcarnivorous.id}></CarnivorousItem>
                )
            })
        }
    }
    componentDidMount(){
        fetch(`${SERVER}/carnivorousgroup`).then(res=>res.json()).then(carnivor=>{this.setState({carnivorous:carnivor},
            ()=>{console.log(carnivor)})})
    }

    render(){
        return(
            <>
             <h1>Grupa carnivorilor</h1>
            <table className="table table-striped">
            <thead>
                <tr>
                    <th>IDuser</th>
                    <th>Nume</th>
                    <th>Prenume</th>
                    <th>Email</th>
                    <th>Data logare</th>
                    <th>Optiuni</th>
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
export default Carnivorous
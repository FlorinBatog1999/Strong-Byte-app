import React from 'react'
import { Link } from 'react-router-dom'
import vegetarianUserStore from './VegetarianUserStore'
const SERVER = 'http://localhost:5000'
const VegetarianItem=(props)=>{
    return(
    <tr>
        <td>{props.vegetarians.iduser}</td>
        <td>{props.vegetarians.nume}</td>
        <td>{props.vegetarians.prenume}</td>
        <td>{props.vegetarians.email}</td>
        <td>{props.vegetarians.data_logare}</td>
        <td><Link to={`/${props.tipUtilizator}/${props.vegetarians.iduser}/mylist`}>Lista lui {props.vegetarians.nume}</Link></td>
        <td><Link to={`/vegetarian/${props.vegetarians.iduser}/mylist/${props.vegetarians.email}`}>Trimite-i mail lui {props.vegetarians.nume}</Link></td>

    </tr>
    )
}
class Vegetarian extends React.Component{
    constructor(){
        super()
        this.state={
            vegetarians:[]
        }
        this.componenteLista=()=>{
            return this.state.vegetarians.map(function(currentvegetarian){
                return(
                    <VegetarianItem vegetarians={currentvegetarian} tipUtilizator={currentvegetarian.tip_utilizator} key={currentvegetarian.id}/>
                )
            })
        }
        this.componenteLista=this.componenteLista.bind(this)

    }
    componentDidMount(){
        fetch(`${SERVER}/vegetariangroup`).then(res=>res.json()).then(vegetarians=>{this.setState({vegetarians:vegetarians},
            ()=>{console.log(vegetarians)})})
    }

    render(){
        return(
            <>
            <h1>Grupa vegetarienilor</h1>
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
export default Vegetarian
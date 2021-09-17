import React from 'react'
import { Link } from 'react-router-dom'
const SERVER = 'http://localhost:5000'
const ApivegetarianItem=(props)=>{
    return(
    <tr>
        <td>{props.apivegetarian.iduser}</td>
        <td>{props.apivegetarian.nume}</td>
        <td>{props.apivegetarian.prenume}</td>
        <td>{props.apivegetarian.email}</td>
        <td>{props.apivegetarian.data_logare}</td>
        <td><Link to={`/apivegetarian/${props.apivegetarian.iduser}/mylist`}>Lista lui {props.apivegetarian.nume}</Link></td>
        <td><Link to={`/apivegetarian/${props.apivegetarian.iduser}/mylist/${props.apivegetarian.email}`}>Trimite-i mail lui {props.apivegetarian.nume}</Link></td>
    </tr>
    )
}
class Apivegetarian extends React.Component{
    constructor(){
        super()
        this.state={
            apivegetarians:[]
        }
        this.componenteLista=()=>{
            return this.state.apivegetarians.map(function(currentapivegetarian){
                return(
                    <ApivegetarianItem apivegetarian={currentlapivegetarian} key={currentapivegetarian.id}></ApivegetarianItem>
                )
            })
        }
    }
    componentDidMount(){
        fetch(`${SERVER}/apivegetariangroup`).then(res=>res.json()).then(apivegetarian=>{this.setState({apivegetarians:apivegetarian},
            ()=>{console.log(apivegetarian)})})
    }

    render(){
        return(
            <>
             <h1>Grupa apivegetarianilor</h1>
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
export default Apivegetarian
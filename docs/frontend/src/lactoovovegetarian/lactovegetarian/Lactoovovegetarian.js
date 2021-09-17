import React from 'react'
import { Link } from 'react-router-dom'
const SERVER = 'http://localhost:5000'
const LactoovovegetarianItem=(props)=>{
    return(
    <tr>
        <td>{props.lactoovovegetarian.iduser}</td>
        <td>{props.lactoovovegetarian.nume}</td>
        <td>{props.lactoovovegetarian.prenume}</td>
        <td>{props.lactoovovegetarian.email}</td>
        <td>{props.lactoovovegetarian.data_logare}</td>
        <td><Link to={`/lactoovovegetarian/${props.lactoovovegetarian.iduser}/mylist`}>Lista lui {props.lactoovovegetarian.nume}</Link></td>
        <td><Link to={`/lactoovovegetarian/${props.lactoovovegetarian.iduser}/mylist/${props.lactoovovegetarian.email}`}>Trimite-i mail lui {props.lactoovovegetarian.nume}</Link></td>
    </tr>
    )
}
class Lactovegetarian extends React.Component{
    constructor(){
        super()
        this.state={
            lactoovovegetarians:[]
        }
        this.componenteLista=()=>{
            return this.state.lactoovovegetarians.map(function(currentlactovoovegetarian){
                return(
                    <LactoovovegetarianItem lactoovovegetarian={currentlactovoovegetarian} key={currentlactovoovegetarian.id}></LactoovovegetarianItem>
                )
            })
        }
    }
    componentDidMount(){
        fetch(`${SERVER}/lactoovovegetariangroup`).then(res=>res.json()).then(lactovegetarian=>{this.setState({lactovegetarians:lactovegetarian},
            ()=>{console.log(lactovegetarian)})})
    }

    render(){
        return(
            <>
             <h1>Grupa lactoovovegetarianilor</h1>
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
export default Lactovegetarian
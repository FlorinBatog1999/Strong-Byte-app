import React from 'react'
import { Link } from 'react-router-dom'
const SERVER = 'http://localhost:5000'
const LactovegetarianItem=(props)=>{
    return(
    <tr>
        <td>{props.lactovegetarian.iduser}</td>
        <td>{props.lactovegetarian.nume}</td>
        <td>{props.lactovegetarian.prenume}</td>
        <td>{props.lactovegetarian.email}</td>
        <td>{props.lactovegetarian.data_logare}</td>
        <td><Link to={`/lactovegetarian/${props.lactovegetarian.iduser}/mylist`}>Lista lui {props.lactovegetarian.nume}</Link></td>
        <td><Link to={`/lactovegetarian/${props.lactovegetarian.iduser}/mylist/${props.lactovegetarian.email}`}>Trimite-i mail lui {props.lactovegetarian.nume}</Link></td>
    </tr>
    )
}
class Lactovegetarian extends React.Component{
    constructor(){
        super()
        this.state={
            lactovegetarians:[]
        }
        this.componenteLista=()=>{
            return this.state.lactovegetarians.map(function(currentlactovegetarian){
                return(
                    <LactovegetarianItem lactovegetarian={currentlactovegetarian} key={currentlactovegetarian.id}></LactovegetarianItem>
                )
            })
        }
    }
    componentDidMount(){
        fetch(`${SERVER}/lactovegetariangroup`).then(res=>res.json()).then(lactovegetarian=>{this.setState({lactovegetarians:lactovegetarian},
            ()=>{console.log(lactovegetarian)})})
    }

    render(){
        return(
            <>
             <h1>Grupa lactovegetarianilor</h1>
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
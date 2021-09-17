import React from 'react'
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import UserRegister from './UserRegister'
import UserProducts from './UserProducts'
import AdaugaProdusStrain from './AdaugaProdusStrain'
import Vegetarian from './vegetarieni/Vegetarian';
import Home from './Home'
import EditProduct from './EditProduct'
import Carnivorous from './carnivori/Carnivorous'
import MyProducts from './MyProducts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap'
import Lactovegetarian from './lactovegetarian/Lactovegetarian';
import Lactoovovegetarian from './lactoovovegetarian/lactovegetarian/Lactoovovegetarian';
import Apivegetarian from './apivegetarian/Apivegetarian'
import DeleteProduct from './DeleteProduct'
import SendEmail from './SendEmail'
class App extends React.Component{
render(){
  return(
    <>
    <BrowserRouter>
        <Navbar className={"navbar"}>
          <Link className="home" to="/">Home</Link>
          <Link className="contulMeu" to="/account">Contul meu</Link>
        </Navbar>
        <Route path={`/`} exact component={Home}></Route>
        <Route path={`/account`} exact component={UserRegister}></Route>
        <Route path="/vegetarian" exact component={Vegetarian}></Route>
        <Route path="/carnivor" exact component={Carnivorous}></Route>
        <Route path="/lactovegetarian" exact component={Lactovegetarian}></Route>
        <Route path="/lactoovovegetarian" exact component={Lactoovovegetarian}></Route>
        <Route path="/apivegetarian" exact component={Apivegetarian}></Route>
        <Route path="/:tipUtilizator/:iduser/mylist" exact component={UserProducts}></Route>
        {/* <Route path="/:tipUtilizator/:iduser/mylist" exact component={UserProducts}></Route>
        <Route path="/:tipUtilizator/:iduser/mylist" exact component={UserProducts}></Route>
        <Route path="/:tipUtilizator/:iduser/mylist" exact component={UserProducts}></Route>
        <Route path="/:tipUtilizator/:iduser/mylist" exact component={UserProducts}></Route> */}
        <Route path="/myaccount/:tipUtilizator/:iduser/mylist/edit/:id" exact component={EditProduct}></Route>
        <Route path="/myaccount/:tipUtilizator/:iduser/mylist/:id" exact component={DeleteProduct}></Route>
        <Route path="/myaccount/:tipUtilizator/:iduser/mylist" exact component={MyProducts}></Route>
        <Route path="/:tipUtilizator/:iduser/mylist/:email" exact component={SendEmail}></Route>
        <Route path="/detaliiProdus/:tipUtilizator/:iduser/:nume/:numeProprietar/:prenumeProprietar/:dataExpirare" exact component={AdaugaProdusStrain}></Route>
    </BrowserRouter>
    </>
  )
}

}
export default App;

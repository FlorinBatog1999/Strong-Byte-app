import React from 'react'
import './Home.css'
import video from './media/video.mp4'
import teacher from './media/teacher.png'
import planet from './media/happyPlanet.png'
class Home extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <>
                <h1 className="title">Bine ati venit!</h1>
                <div className="videodiv">
                    <video className="introvideo"  src={video} type="video/mp4" autoPlay muted loop> </video>
                    <h1 className="introtext">Știați că in România, anual, aproximativ o treime din produse ajung la coșul de gunoi?</h1>
                    <h1 className="introtext2">Dar ca la nivel global, aproape o jumătate din mâncarea produsă este risipită, ceea ce reprezintă 1,3 miliarde de tone pierdute pe an?</h1>
                </div>
                <h1 className="titluLista">Câteva soluții pentru a evita risipa de mâncare:</h1>
                <br/><br/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <ol>
                                <li>Fă o listă de cumpărături și respect-o</li>
                                <li>Informează-te despre cum se depozitează corect alimentele</li>
                                <li>Folosește resturile. Dacă ai pregătit un fel de mâncare și ți-au rămas alimente, încearcă să le folosești pentru o altă rețetă</li>
                                <li>Verifică întotdeauna termenul de valabilitate al alimentelor</li>
                                <li>Încearcă să pregătești doar porțiile de care ai nevoie</li>
                                <li>Nu mai cumpăra alimente de care nu ai nevoie</li>
                                <li>Multe alimente pot fi congelate și astfel se pot păstra o perioadă mai lungă</li>
                            </ol>
                        </div>
                        <div className="col-sm">
                            <img className="teacher" src={teacher}></img>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <img className="planet" src={planet}></img>
                        </div>
                        <div className="col-sm">
                            <h3>Dacă observi că aceste soluții nu funcționează, încearcă o altfel de soluție.</h3>
                            <h1>ShareFood!</h1>
                            <p>Aplicația noastră te ajută să faci ShareFood, un proces foarte simplu în care tu îți notifici prietenii sau vecinii tăi că ai câteva alimente pe care tu nu le mai dorești și ele sunt încă în starea perfectă de valabilitate. 
                                Am uitat să îți spunem că pentru a intra în acest ecosistem nu e obligatoriu ca tu doar să oferi. La fel de important e să și primești. 
                                Îți place ideea? Hai în comunitatea noastră ca împreună să salvăm planeta!</p>
                        </div>
                    </div>
                </div>
                
               
            </>
        )
    }
}
export default Home
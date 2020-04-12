import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state= {
            case: [],
            temoignages : []
        }
    }

    getCasIDFromServer(id) {
        fetch('http://localhost:8080/api/cases/'+ id, {
            method: 'get',
        })
            .then(response => {
          return response.json();
        })

        .then(res => { 
          this.setState({
            case: res.case
          });
          console.log(res.case);
          this.renderDetailsList()
        })

        .catch(err => {
          console.log("Erreur dans le get: " + err)
        });
    }

    getTemoignageByCasId(id) {
        fetch('http://localhost:8080/api/testimonials/byCase/'+ id, {
            method: 'get',
        })
            .then(response => {
          return response.json();
        })

        .then(res => {  
            let newTemoignage = [];
            console.log(res.case)
             res.case.forEach((el) => {
              newTemoignage.push(el);
            }); 
            this.setState({
              temoignages: newTemoignage
            });
            
            //this.renderTemoignagesList()
          })

        .catch(err => {
          console.log("Erreur dans le get: " + err)
        });
    }


    renderDetailsList() {
        let data = {
            casName: this.state.case.cas_nom_dossier,

            casDateMaj: this.state.case.cas_date_maj,

            nomZone: this.state.case.cas_zone_nom,

            typeZone: this.state.case.cas_zone_type,

            casDate : this.state.case.cas_JJ + "/" + this.state.case.cas_MM + "/" + this.state.case.cas_AAAA,

            casPublic: this.state.case.cas_public,

            nbTemoins: this.state.case.cas_temoins_nb,

            classe: this.state.case.cas_classification,

            numEtude: this.state.case.cas_numEtude,

            resume : this.state.case.cas_resume,

            resumeWeb : this.state.case.cas_resume_web
        }
        return (
    this.setState({
        case : data
    })
        )
}

    renderTemoignagesList() {
        let newTemoignagesList = []
        this.state.case.map((el, index) => {
            let data = {
                id: el.id_temoignage
            }
            newTemoignagesList.push(data)
            return newTemoignagesList
        })
         this.setState({
             temoignages: newTemoignagesList
         })
         console.log(this.state.temoignages[0])
    }

    handleDetailsTemoignage(_id){
       this.props.history.push("/cas/details/temoignage/"+_id)
    }

    componentDidMount() {
        console.log(this.state.temoignages.length)
        this.getCasIDFromServer(this.props.match.params._id)
        this.getTemoignageByCasId(this.props.match.params._id)
        
    }

    
    
    render() {
        const text = {
            color: 'black',
            fontWeight: 'normal'
          }
          
        const linksTems = this.state.temoignages.map(function(tem){
            return( 
                    <Link to={'/cas/details/temoignage/'+tem.id_temoignage}>
                    <p>Numéro {tem.id_temoignage} </p>
                    </Link>
                )
          });

        return (
            <div>
                <List>
                    <ListItem>
                        <ListItemText style={text} primary="Nom du cas" secondary={this.state.case.casName}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText style={text} primary="Classe du cas" secondary={this.state.case.classe}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText style={text} primary="Date d'apparition" secondary={this.state.case.casDate}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText style={text} primary="Date de mise à jour du cas" secondary={this.state.case.casDateMaj}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText style={text} primary="Endroit où le cas a été observé et type" secondary={this.state.case.nomZone + " : " + this.state.case.typeZone}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText style={text} primary="Description du cas" secondary={this.state.case.resume}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText style={text} primary="Résume sur le site web" secondary={this.state.case.resumeWeb}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText style={text} primary="Nombre de témoins" secondary={this.state.case.nbTemoins}/>
                    </ListItem>
                    <ListItem>
                        <h5 style={text}>Témoignages :
                            <li>
                                {linksTems}
                            </li>

                        </h5>
                        
                    </ListItem>
                </List>
               
                
                
                
            </div>
        );

                }

}


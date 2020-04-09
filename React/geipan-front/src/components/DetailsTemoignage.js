import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class DetailsTemoignage extends Component{
    constructor(props) {
        super(props);
        this.state= {
            temoignage: []
        }
    }

    getTemoignageById(id) {
        fetch('http://localhost:8080/api/testimonials/'+ id, {
            method: 'get',
        })
            .then(response => {
          return response.json();
        })

        .then(res => {  
            console.log(res);
            this.setState({
                temoignage : res.case
            });
            this.renderTemoignageDetails()
          })

        .catch(err => {
          console.log("Erreur dans le get: " + err)
        });
    }

    renderDetailsList() {
        let data = {
            casId: this.state.case.id_cas,

            casNum: this.state.case.cas_numEtude,

            temGenre: this.state.case.tem_genre,

            nomDossier: this.state.case.tem_nom_dossier,

            typeZone: this.state.case.cas_zone_type
        }
        return (
    this.setState({
        temoignage : data
    })
        )
}
componentDidMount() {
    //console.log("ana honnn componentDidMount");
    console.log(this.state.temoignage.length);

    this.getTemoignageById(this.props.match.params.id_temoignage)
    console.log("Param id: " + this.props.match.params._id)
}

render() {
    const text = {
        color: 'black',
        fontWeight: 'bold'
      }
    return (
        <div>
            <List>
                <ListItem>
                    <ListItemText style={text} primary="Identifiant du cas" secondary={this.state.temoignage.id_cas}/>
                </ListItem>
                <ListItem>
                    <ListItemText style={text} primary="Numéro d'etude du cas" secondary={this.state.temoignage.cas_numEtude}/>
                </ListItem>
                <ListItem>
                    <ListItemText style={text} primary="Genre du témoin" secondary={this.state.temoignage.tem_genre}/>
                </ListItem>
                <ListItem>
                    <ListItemText style={text} primary="Profession du témoin" secondary={this.state.temoignage.tem_xp_activite_type}/>
                </ListItem>
                

            </List>
            
        </div>
    );
            }




}
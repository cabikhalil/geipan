import { FormControl,TextField,Checkbox, InputLabel, Select,MenuItem, FormHelperText,Button } from '@material-ui/core';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class Form extends Component{

    constructor(props) {
        super(props);
        this.state= {
            localisation: [],
            classe: [],
            startDate : new Date(),
            endDate : new Date()  
    };
    this.handleChangeLocalisation = this.handleChangeLocalisation.bind(this);
    this.handleChangeClasse = this.handleChangeClasse.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const filters = {
            localisation:[],
            classe: [],
            startDate: this.state.startDate || "",
            endDate : this.state.endDate || ""
        };

        if(this.state.localisation.length!==0){
            filters.localisation= this.state.localisation
        }
        if(this.state.classe.length!==0){
            filters.classe= this.state.classe
        }

        let params = "";

        if (filters.startDate!== ""){
            if (params !== "") params += "&"
            params += "cas_date_start=" + filters.startDate.getFullYear() + "-" +
            (filters.startDate.getMonth()+1) + "-" + filters.startDate.getDate()
        }
        //months are starting from 0 <=> january

        if (filters.endDate!== ""){
            if (params !== "") params += "&"
            params += "cas_date_end=" + filters.endDate.getFullYear() + "-" +
            (filters.endDate.getMonth()+1) + "-" + filters.endDate.getDate()
        }

        if (filters.classe.length!== 0){
            if (params !== "") params += "&"
            params += "cas_classification=";
            filters.classe.forEach(el =>
                params += el + ","
                )
                params.slice(0,-1);
        } else {
            if (params !== "") params += "&"
            params += "cas_classification=ALL";
        }

        if (filters.localisation.length!== 0){
            if (params !== "") params += "&"
            params += "cas_zone_nom=";
            filters.localisation.forEach(el =>
                params += el + ","
                )
                params.slice(0,-1);
        }

        this.props.history.push('/cas/' + params);
      }
 

    handleChangeLocalisation(event) {
        this.setState({localisation: event.target.value});
        console.log("Localisation selected : "+ this.state.localisation)
      }

      handleChangeClasse(event) {
        this.setState({classe: event.target.value});
        console.log("Classe selected : "+ this.state.classe)
      }
      handleChangeStartDate(date) {
        this.setState({startDate: date});
        console.log("startDate selected : "+ this.state.startDate)
      }
      handleChangeEndDate(date) {
        this.setState({endDate: date});
        console.log("endDate selected : "+ this.state.endDate)
      }

    render() {
        
        const useStyles = makeStyles((theme) => ({
            formControl: {
              margin: theme.spacing(1),
              minWidth: 120,
              maxWidth: 300,
            }
          }));
        const localisations= [
            "Martinique",
            "Vaucluse",
            "Ardennes",
            "Pyrénées-Atlantiques",
            "Haute-Vienne",
            "Yvelines",
            "Autre",
            "Somme",
            "Lot",
            "Pas-de-Calais",
            "Morbihan",
            "Côte-d'Or",
            "Isère",
            "Côtes-d'Armor",
            "Oise",
            "Gard",
            "Drôme",
            "Aube",
            "Ain",
            "Aisne",
            "Vosges",
            "Seine-Maritime",
            "Grand Est",
            "Paris",
            "Charente",
            "Essonne",
            "Cantal",
            "Nord",
            "Savoie",
            "Alpes-de-Haute-Provence",
            "Loir-et-Cher",
            "Loire-Atlantique",
            "Landes",
            "Meurthe-et-Moselle",
            "Nouvelle-Calédonie",
            "Var",
            "Finistère",
            "Sarthe",
            "Hérault",
            "Charente-Maritime",
            "France",
            "Tarn",
            "Ardèche",
            "La Réunion",
            "Aveyron",
            "Vendée",
            "Indre-et-Loire",
            "Bouches-du-Rhône",
            "Puy-de-Dôme",
            "Guadeloupe",
            "Pyrénées-Orientales",
            "Loire",
            "Lot-et-Garonne",
            "Dordogne",
            "Yonne",
            "Bas-Rhin",
            "Gers",
            "Saône-et-Loire",
            "Maine-et-Loire",
            "Meuse",
            "Hauts-de-Seine",
            "Nièvre",
            "Moselle",
            "Hautes-Pyrénées",
            "Vienne",
            "Haute-Garonne",
            "Mayenne",
            "Auvergne-Rhône-Alpes",
            "Haute-Loire",
            "Alpes-Maritimes",
            "Corse-du-Sud",
            "Doubs",
            "Creuse",
            "Jura",
            "Indre",
            "Marne",
            "Rhône",
            "Ariège",
            "Corrèze",
            "Loiret",
            "Gironde",
            "Hautes-Alpes",
            "Eure",
            "Seine-Saint-Denis",
            "Haute-Savoie",
            "Haute-Marne",
            "Guyane",
            "Occitanie",
            "Ille-et-Vilaine",
            "Deux-Sèvres",
            "Bourgogne-Franche-Comté",
            "Val-d'Oise",
            "Ile-de-France",
            "Calvados",
            "Seine-et-Marne",
            "Tarn-et-Garonne",
            "Val-de-Marne",
            "Manche",
            "Territoire de Belfort",
            "Maritime",
            "Saint-Pierre-et-Miquelon",
            "Allier",
            "Eure-et-Loir",
            "Provence-Alpes-Côte-d'Azur",
            "Haut-Rhin",
            "Outre-Mer",
            "Pays de la Loire",
            "Haute-Corse",
            "Cher",
            "Centre-Val de Loir",
            "Polynésie française",
            "Lozère",
            "Corse du Sud",
            "Aude",
            "Orne",
            "Haute-Saône",
            "Nouvelle-Aquitaine",
            "Côte-d'or",
            "Aérien",
            "Aéro",
            "MER DES BALEARES",
            "Savoie (Haute)",
            "Mayotte",
            "Corse",
            "Réunion",
            "Garonne (Haute-)"
    ];
    const classes = [ "A", "B", "C", "D", "D1" ];
    
        //const { cases : {classe, localisation, dateStart, dateEnd}} = this.state.cases;
        return(
        
        <form onSubmit={this.handleSubmit}>
        <Grid container> 
        <Grid item xs={6}> 
        <Paper> Du :
        <DatePicker
        selected={this.state.startDate}
        onChange={date => this.handleChangeStartDate(date)}
        selectsStart
        startDate={this.state.startDate}
        endDate={this.state.endDate}
      /> </Paper>
        
      </Grid>
      <Grid item xs={6}> 
      <Paper> au : 
          <br/>
        <DatePicker
        selected={this.state.endDate}
        onChange={date => this.handleChangeEndDate(date)}
        selectsEnd
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        minDate={this.state.startDate}
      /></Paper>
      
      </Grid>
      </Grid>
        <br/>
        <Grid container>
        <Grid item xs={12}>  
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-name-label" >Localisation</InputLabel>
        <Select
          multiple
          value={this.state.localisation}
          onChange={this.handleChangeLocalisation}
        >
          {localisations.map((localisation) => (
            <MenuItem key={localisation} value={localisation}>
              {localisation}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        </Grid>
            <br/>
        <Grid item xs={12}> 
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Classe</InputLabel>
            <Select
                multiple
                value={this.state.classe}
                onChange={this.handleChangeClasse}
            >
                {classes.map((classe) => (
            <MenuItem key={classe} value={classe}>
              {classe}
            </MenuItem>
          ))}
            </Select>
      </FormControl>
      </Grid>
      </Grid>
      <br/>
      <Button type="submit">Submit</Button>
        </form>
        )
    }




}
import React, { Component } from 'react';
import MaterialTable from "material-table";
import queryString from 'query-string';


export default class Observation extends Component {

    

    constructor(props) {

        super(props)



        this.state= {

            case: [],

            dataTable: []

        }

    }


    getCasFromServer() {

        fetch('http://localhost:8080/api/cases', {

            method: 'get',

        })

            .then(response => {

          return response.json();

        })

        .then(res => {  

          let newCas = [];

          console.log(res);

          res.data.forEach((el) => {

            newCas.push(el);

          });

          this.setState({

            case: newCas

          });

          this.renderDataTable()

        })

        .catch(err => {

          console.log("Erreur dans le get: " + err)

        });

    }



    renderDataTable() {

        let newDataTable = []

        this.state.case.map((el, index) => {

            let data = {

                id: el.id_cas,

                casName: el.cas_nom_dossier,

                casDateMaj: el.cas_date_maj,

                nomZone: el.cas_zone_nom,

                numZone: el.cas_zone_code,

                typeZone: el.cas_zone_type,

                casAnnee: el.cas_AAAA,

                casMois: el.cas_MM,

                casJour: el.cas_JJ,

                casPublic: el.cas_public,

                nbTemoins: el.cas_temoins_nb,

                classe: el.cas_classification,

                numEtude: el.cas_numEtude

            }

            newDataTable.push(data)

            return newDataTable

        })

         this.setState({

             dataTable: newDataTable

         })

    }



    handleDetailRow(_id){
       console.log("ana honnn handleDetailRow");

       console.log(_id)

       console.log(this);

        //this.props.history.push('/api/cases/' + _id);
        fetch('http://localhost:8080/api/cases/' + _id, {

            method: 'get',

        })

            .then(response => {

          return response.json();

        })
        .then(res => {  

            console.log(res.case);
            return res.case;
  
            });
  


    }



    componentDidMount() {

        //console.log("ana honnn componentDidMount");

        //console.log(this);

        //this.getCasFromServer(JSON.stringify(queryString.parse(this.props.match.params.params)))
        this.getCasFromServer()

    }

    

    render() {

        return (

            <div style={{ margin: "50px 50px 0px 50px" }}>

                <MaterialTable

                    columns={[

                        { title: "ID", field: "id" },

                        { title: "Nom du cas", field: "casName" },

                        { title: "Date mise à jour", field: "casDateMaj" },

                        { title: "Zone", field: "nomZone"},

                        { title: "Zone numéro", field: "numZone"},

                        { title: "Zone type", field: "typeZone"},

                        { title: "Année", field: "casAnnee"},

                        { title: "Mois", field: "casMois"},

                        { title: "Jour", field: "casJour"},

                        { title: "Public", field: "casPublic"},

                        { title: "Nombre de témoins", field: "nbTemoins"},

                        { title: "Classe", field: "classe"},

                        { title: "Numéro d'étude", field: "numEtude"}

                    ]}

                    data={this.state.dataTable}

                    title="Résultats"

                    onRowClick={ (event, rowData) => {this.handleDetailRow(rowData.id)}}

                     actions={[

                        {

                          icon: 'details',

                          tooltip: 'Delete User',

                          onClick: (event, rowData) => {this.handleDetailRow(rowData.id)}

                        }

                    ]}

                />

            </div>

        );

    }

}


import React, { Component } from 'react';
import MaterialTable from "material-table";
import queryString from 'query-string';



/* import React from 'react';
class Table extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        data: []
      };
    }
  
    componentDidMount() {
      fetch("http://localhost:8080/api/cases")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              data: result.data
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, data } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <table>
            <thead>
            <tr>
              <th>Id</th>
              <th>cas_nom_dossier</th>
            </tr>
            </thead>

            <tbody>
            {data.map(item => (
              <tr key={item.id_cas}>
                <td>
                  {item.id_cas}
                </td>
                <td>
                  {item.cas_nom_dossier}
                </td> 
              </tr>
            ))}
            </tbody>
          </table>
        );
      }
    }
  }

  export default Table; */

export default class Table extends Component {
    constructor(props) {

        super(props)

        this.state= {

            cas: [],

            dataTable: []

        }

    }


/* 
    getCasFromServer(form) {

        fetch('http://localhost:8080/api/cases' + form, {

            method: 'get',

        })

            .then(response => {

          return response.json();

        })

        .then(res => {

          let newCas = [];

          res.cas.forEach((el) => {

            newCas.push(el);

          });

          this.setState({

            cas: newCas

          });

          this.renderDataTable()

        })

        .catch(err => {

          console.log("Erreur dans le get: " + err)

        });

    } */

    
    getCasFromServer() {

      fetch('http://localhost:8080/api/cases', {

          method: 'get',

      })

          .then(response => {

        return response.json();

      })

      .then(res => {

        let newCas = [];

        res.data.forEach((el) => {

          newCas.push(el);

        });

        this.setState({

          cas: newCas

        });

        this.renderDataTable()

      })

      .catch(err => {

        console.log("Erreur dans le get: " + err)

      });

  }



    renderDataTable() {

        let newDataTable = []

        this.state.cas.map((el, index) => {
          console.log("HEREEE");

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



    handleDetailRow(id){

        this.props.history.push(id);

    }



    componentDidMount() {

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

                    /* actions={[

                        {

                          icon: 'details',

                          tooltip: 'Delete User',

                          onClick: (event, rowData) => {this.handleDetailRow(rowData._id)}

                        }

                    ]} */

                />

            </div>

        );

    }

}


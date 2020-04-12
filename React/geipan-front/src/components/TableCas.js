import React, { Component } from 'react';
import MaterialTable from "material-table";
import Search from '@material-ui/icons/Search'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Clear from '@material-ui/icons/Clear'
import Check from '@material-ui/icons/Check'
import FilterList from '@material-ui/icons/FilterList'
import Remove from '@material-ui/icons/Remove'



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

    getTestimonialsFromServer() {
        fetch('http://localhost:8080/api/testimonials', {
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

                casDate : el.cas_JJ + "/" + el.cas_MM + "/" + el.cas_AAAA,

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
       this.props.history.push("/cas/details/"+_id)
       
    }
    componentDidMount() {
        this.getCasFromServer()
    }

    render() {
        return (
            <div >
                <MaterialTable
                    columns={[
                        { title: "Nom du cas", field: "casName" },
                        { title: "Département", field: "nomZone"},
                        { title: "Date", field: "casDate"},
                        { title: "Classe", field: "classe"},
                    ]}
                    icons={{ 
                      Check: Check,
                      DetailPanel: ChevronRight,
                      Export: SaveAlt,
                      Filter: FilterList,
                      FirstPage: FirstPage,
                      LastPage: LastPage,
                      NextPage: ChevronRight,
                      PreviousPage: ChevronLeft,
                      Search: Search,
                      Clear: Clear,
                      ThirdStateCheck: Remove,
                    }}
                    data={this.state.dataTable}
                    title="Liste des cas"
                    options={{
                      search: true,
                      headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF'
                      }
                    }}
                    onRowClick={ (event, rowData) => {this.handleDetailRow(rowData.id)}}
                     /*actions={[

                        {

                          icon: 'details',

                          tooltip: 'Delete User',

                          onClick: (event, rowData) => {this.handleDetailRow(rowData.id)}

                        }

                    ]}*/    
                />
            </div>
        );
    }
}


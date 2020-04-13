/* import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';



export default class Example extends React.Component {
    constructor(props) {

        super(props)
        this.state= {
            case: []
        }
    }

    getCasFromServer() {
        let url = 'http://localhost:8080/api/cases'
          fetch(url, {
              method: 'get',
          })
              .then(response => {
                console.log(url)
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

  render() {
    return (
      <PieChart width={400} height={400}>
        <Pie dataKey="value" startAngle={180} endAngle={0} data={this.state.case} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
      </PieChart>
    );
  }
}
 */
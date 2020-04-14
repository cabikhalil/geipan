import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    
    <g>
      
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
    
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} cas`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`( ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default class Example extends React.Component {
  constructor(props) {

    super(props)
    this.state = {
      case: [],
      data: [{ name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
      { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 }]
    }
  }

  state = {
    activeIndex: 0,
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

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
        this.prepData()
      })

      .catch(err => {
        console.log("Erreur dans le get: " + err)
      });
  }

  prepData() {
    let newDataTable = []
    let cpt_A = 0;
    let cpt_B = 0;
    let cpt_C = 0;
    let cpt_D = 0;
    let cpt_D1 = 0;
    console.log("case longueur" + this.state.case.length)
    this.state.case.map((el, index) => {

      //cas_classif: el.cas_classification
      if (el.cas_classification == 'A') {
        cpt_A++
      }
      else if (el.cas_classification == 'B') {
        cpt_B++
      }
      else if (el.cas_classification == 'C') {
        cpt_C++
      }
      else if (el.cas_classification == 'D') {
        cpt_D++
      }
      else if (el.cas_classification == 'D1') {
        cpt_D1++
      }

    })
    console.log("cpt_A : " + cpt_A);
    console.log("cpt_B : " + cpt_B);
    console.log("cpt_C : " + cpt_C);
    console.log("cpt_D : " + cpt_D);
    console.log("cpt_D1 : " + cpt_D1);
    newDataTable.push({name: 'Classe A', value : cpt_A})
    newDataTable.push({name: 'Classe B', value : cpt_B})
    newDataTable.push({name: 'Classe C', value : cpt_C})
    newDataTable.push({name: 'Classe D', value : cpt_D})
    newDataTable.push({name: 'Classe D1', value : cpt_D1})
    console.log(newDataTable);
    this.setState({
      data: newDataTable
  })

  }

  componentDidMount() {
    this.getCasFromServer()
  }

  render() {
    
    return (
      
      <PieChart width={500} height={500}>
        <Pie
          activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape}
          data={this.state.data}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={this.onPieEnter}
        />
      </PieChart>
      
    );
  }
}

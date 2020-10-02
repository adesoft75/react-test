import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';

import { ArgumentScale, ValueScale, Animation } from '@devexpress/dx-react-chart';
import { scaleLog, scaleTime } from 'd3-scale';

const data = [
  { date: new Date(2015, 10, 15), price: 346 },
  { date: new Date(2015, 11, 17), price: 441 },
  { date: new Date(2016, 0, 16), price: 435 },
  { date: new Date(2016, 1, 21), price: 415 },
  { date: new Date(2016, 3, 25), price: 445 },
  { date: new Date(2016, 4, 29), price: 460 },
  { date: new Date(2016, 5, 20), price: 730 },
  { date: new Date(2016, 7, 5), price: 600 },
  { date: new Date(2016, 8, 14), price: 617 },
  { date: new Date(2016, 9, 30), price: 674 },
  { date: new Date(2016, 11, 21), price: 785 },
  { date: new Date(2017, 0, 8), price: 991 },
  { date: new Date(2017, 1, 9), price: 1028 },
  { date: new Date(2017, 2, 9), price: 1251 },
  { date: new Date(2017, 3, 6), price: 1103 },
  { date: new Date(2017, 4, 4), price: 1392 },
  { date: new Date(2017, 5, 11), price: 2747 },
  { date: new Date(2017, 6, 19), price: 2203 },
  { date: new Date(2017, 7, 18), price: 4114 },
  { date: new Date(2017, 8, 19), price: 3840 },
  { date: new Date(2017, 9, 19), price: 5591 },
  { date: new Date(2017, 10, 14), price: 6716 },
  { date: new Date(2017, 11, 22), price: 17905 },
  { date: new Date(2018, 0, 23), price: 11438 },
  { date: new Date(2018, 1, 10), price: 8125 },
  { date: new Date(2018, 2, 6), price: 11079 },
  { date: new Date(2018, 3, 7), price: 6913 },
  { date: new Date(2018, 4, 9), price: 9511 },
  { date: new Date(2018, 5, 6), price: 7553 },
  { date: new Date(2018, 6, 18), price: 6400 },
]

const modifyDomain = () => [100, 100000];

const superscript = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const formatPower = d => (`${d}`).split('').map(c => superscript[c]).join('');
const format = scale => scale.tickFormat(4, d => 10
  + formatPower(Math.round(Math.log(d) / Math.LN10)));

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <ArgumentScale factory={scaleTime} />
          <ValueScale factory={scaleLog} modifyDomain={modifyDomain} />
          <ArgumentAxis />
          <ValueAxis tickFormat={format} />

          <LineSeries
            valueField="price"
            argumentField="date"
          />
          <Title
            text="Average USD market price across major bitcoin exchanges"
          />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}
import React from 'react';
import {
  VictoryTooltip,
  VictoryScatter,
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryArea
} from 'victory'
import moment from 'moment'
import GraphBoundary from '../atoms/GraphBoundary'
require('moment-duration-format')

function epochToTime(values,milisecondConverter){
  // change
  let array = values.map(value => {
    return {x: moment(value.ts).toDate(),y: value.value}
  })
  return array
}

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('this.props.values',moment(this.props.values[this.props.values.length -1].ts).toDate())
    return (
      <div>

        <VictoryChart
          containerComponent={<VictoryVoronoiContainer/>}
          animate={{ duration: 500 }}
          theme={VictoryTheme.material}
          style={{ parent: { border: "2px solid black"} }}
          padding={{ top: 40, bottom: 40, left: 60, right: 40 }}
        >
          <VictoryAxis
            orientation="bottom"
            label="Time"
            scale={{x: "time"}}
            style={{
              axisLabel: { padding: 25 }
            }}
            offsetY={40}
          />
          <VictoryAxis dependentAxis
            label={`${this.props.graphPreference.displayTitle} (${this.props.graphPreference.unit})`}
            style={{
              axisLabel: { padding: 40 }
            }}

          />
          <VictoryLine
            style={{
              data: { stroke: "#c43a31"},
              parent: { border: "6px solid blue"}
            }}
            data={epochToTime(this.props.values)}
          />
          <VictoryScatter
            style={{
              data: { stroke: "#c43a31", strokeWidth: 2, fill: "white" }
            }}
            size={2}
            data={epochToTime(this.props.values)}
            labelComponent={<VictoryTooltip/>}
            labels={(d) => {
                return `${moment(d.x).format("h[:]mm A")}
                ${this.props.graphPreference.displayTitle}: ${(d.y).toFixed(2)}${this.props.graphPreference.unit}`
              }}
          />          
          <VictoryArea 
            name="HigherLimit"
            style={{
              data: {
                  fill: "red", fillOpacity: 0.3
              }
            }}
            data={[
              {x: moment(this.props.values[this.props.values.length -1].ts).subtract(30,'minutes').toDate(), y:  this.props.upperlimit},
              {x: moment(this.props.values[0].ts).add(30,'minutes').toDate(), y:  this.props.upperlimit}
            ]}
            y0={ (d) => 60}
          />
          <VictoryArea 
            name="LowerLimit"
            style={{
              data: {
                  fill: "blue", fillOpacity: 0.3
              }
            }}
            data={[
              {x: moment(this.props.values[this.props.values.length -1].ts).subtract(30,'minutes').toDate(), y:  this.props.lowerlimit},
              {x: moment(this.props.values[0].ts).add(30,'minutes').toDate(), y: this.props.lowerlimit}
            ]}
            y0={ (d) => -99}
          />
            {/*
            */}
{/* 

          <GraphBoundary 
            minX={this.props.rangeX.min}
            maxX={this.props.rangeX.max}
            condition={this.props.graphPreference.displayTitle}
          />
*/}
        </VictoryChart>


      </div>

    );
  }
}

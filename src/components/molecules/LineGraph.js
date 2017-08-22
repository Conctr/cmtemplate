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
    return (
      <div>
        <VictoryChart
          containerComponent={<VictoryVoronoiContainer/>}
          animate={{ duration: 500 }}
          theme={VictoryTheme.material}
          style={{ parent: { border: "2px solid white"} }}
          padding={{ top: 40, bottom: 40, left: 60, right: 40 }}
          domain={{x: [this.props.rangeX.min, this.props.rangeX.max], y: [this.props.rangeY.min, this.props.rangeY.max]}}
          domainPadding={30}
        >
          { !!this.props.upperlimit ? (          
            <VictoryArea 
              name="HigherLimit"
              domainPadding={{ x: [-30, -30] }}
              style={{
                data: {
                    fill: "#f9e9e9", fillOpacity: 1.0
                }
              }}
              data={[
                {x: moment(this.props.values[this.props.values.length -1].ts).subtract(30,'minutes').toDate(), y:  this.props.upperlimit},
                {x: moment(this.props.values[0].ts).add(30,'minutes').toDate(), y:  this.props.upperlimit}
              ]}
              y0={ (d) => 60}
            />
          ) : false }

          <VictoryAxis
            orientation="bottom"
            label="Time"
            scale={{x: "time"}}
            style={{
              axisLabel: { padding: 25 },
              grid: { stroke: "grey", strokeWidth: 1 }
            }}
            offsetY={40}
          />
          <VictoryAxis dependentAxis
            label={`${this.props.graphPreference.displayTitle} (${this.props.graphPreference.unit})`}
            style={{
              axisLabel: { padding: 50 },
              grid: { stroke: "grey", strokeWidth: 1 }
            }}

          />
          <VictoryLine
            style={{
              data: { stroke: "black"},
              parent: { border: "6px solid blue"}
            }}
            data={epochToTime(this.props.values)}
          />
          <VictoryScatter
            style={{
              data: { stroke: "black", strokeWidth: 1, fill: "white" }
            }}
            size={2}
            data={epochToTime(this.props.values)}
            labelComponent={<VictoryTooltip/>}
            labels={(d) => {
                return `${moment(d.x).format("h[:]mm A")}
                ${this.props.graphPreference.displayTitle}: ${(d.y).toFixed(2)}${this.props.graphPreference.unit}`
              }}
          />

          { !!this.props.lowerlimit ? (          
            <VictoryArea 
              name="LowerLimit"
              domainPadding={{ x: [-30, -30] }}
              style={{
                data: {
                    fill: "blue", fillOpacity: 0.2
                }
              }}
              data={[
                {x: moment(this.props.values[this.props.values.length -1].ts).subtract(30,'minutes').toDate(), y:  this.props.lowerlimit},
                {x: moment(this.props.values[0].ts).add(30,'minutes').toDate(), y: this.props.lowerlimit}
              ]}
              y0={ (d) => -99}
            />                 
          ) : false }
        </VictoryChart>
      </div>
    );
  }
}

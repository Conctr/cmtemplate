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
    let yAxisEnd,yAxisStart
    if ( this.props.upperlimit && this.props.rangeY.max < this.props.upperlimit ){
      yAxisEnd = this.props.upperlimit 
    } else {
      yAxisEnd = this.props.rangeY.max
    } 
    if ( this.props.lowerlimit && (this.props.rangeY.min < this.props.lowerlimit) ) {
      yAxisStart = this.props.rangeY.min
    } else {
      yAxisStart = this.props.lowerlimit
    } 
console.log('range y min',this.props.rangeY.min)
console.log('Upper lower',this.props.lowerlimit)
console.log('y axis start',yAxisStart)
    return (
      <div>
        <VictoryChart
          containerComponent={<VictoryVoronoiContainer/>}
          animate={{ duration: 500 }}
          theme={VictoryTheme.material}
          style={{ parent: { border: "2px solid white"} }}
          padding={{ top: 40, bottom: 40, left: 60, right: 40 }}
          domain={{x: [this.props.rangeX.min, this.props.rangeX.max], y: [yAxisStart, yAxisEnd]}}
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
              y0={ (d) => 100}
            />
          ) : false }

          { !!this.props.lowerlimit ? (          
            <VictoryArea 
              name="LowerLimit"
              domainPadding={{ x: [-30, -30] }}
              style={{
                data: { fill: "#f9e9e9", fillOpacity: 1.0 }
              }}
              data={[
                {x: moment(this.props.values[this.props.values.length -1].ts).subtract(30,'minutes').toDate(), y:  this.props.lowerlimit},
                {x: moment(this.props.values[0].ts).add(30,'minutes').toDate(), y: this.props.lowerlimit}
              ]}
              y0={ (d) => -99}
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
        </VictoryChart>

        { !!this.props.lowerlimit ? 
          <p> Low {this.props.graphPreference.displayTitle} warning: {this.props.lowerlimit} </p>
        : false } 
        { !!this.props.upperlimit ? 
          <p> High {this.props.graphPreference.displayTitle} warning: {this.props.upperlimit}</p> 
        : false }

      </div>
    );
  }
}

import React, { Component } from 'react';
import * as deviceWebSocket from '../api/deviceWebSockets'
import { VictoryTooltip,VictoryScatter,VictoryLine,VictoryChart,VictoryTheme,VictoryVoronoiContainer,VictoryAxis } from 'victory'
import CircularProgress from 'material-ui/CircularProgress'
import Slider from 'material-ui/Slider'
import moment from 'moment'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
require('moment-duration-format')


function sorter(data,dataKeys){
  let sortedValues = {}
  if(!!data) {
    dataKeys.forEach(key => {
    sortedValues[key] = {}
    sortedValues[key].values = []
      for(let i = 0; i < data.length; i++){
        let time = moment().diff(moment(data[i]['_ts']))
        // Turn into hours
        time /= 3600000
        sortedValues[key].values.push({x: time,y: data[i][key]})
      }
    let allX = sortedValues[key].values.map(val => (val.x))
    let allY = sortedValues[key].values.map(val => (val.y))
    let minX = Math.min.apply(null, allX)
    let maxX = Math.max.apply(null, allX)
    let minY = Math.min.apply(null, allY)
    let maxY = Math.max.apply(null, allY)
    let domainValX = (maxX - minX)/10
    let domainValY = (maxY - minY)/10

    sortedValues[key]['domainX'] = [minX - domainValX,maxX + domainValX]
    sortedValues[key]['domainY'] = [minY - domainValY,maxY + domainValY]
  })
  }
  return sortedValues
}

class DevicePage extends Component {

  graphs = [{
    key: 'humidity',
    displayTitle: 'Humidity',
    unit: '%'
  },{
    key: 'pressure',
    displayTitle: 'Pressure',
    unit: 'pSi'
  },{
    key: 'temperature',
    displayTitle: 'Temperature',
    unit: '°C'
  }]

  constructor(props){
    super(props);
    this.state = {
       data: {},
       hoursBack: 3,
       loaderShown : false
    };
  }

  componentDidMount(){
    deviceWebSocket.getDevicesData(this.props.deviceId, this.updateData, this.state.hoursBack,this.handleUpdateData)
  }

  componentWillUpdate(nextProps, nextState){
    if (nextState.hoursBack !== this.state.hoursBack) {
      deviceWebSocket.getDevicesData(this.props.deviceId, this.updateData, nextState.hoursBack,this.handleUpdateData)
    }
  }

  updateData = (newData)=>{
    this.setState({
      data: newData,
      loaderShown:false
    })
  }
  handleUpdateData = (newData)=>{

    this.setState({
      data: this.state.data.concat(newData)
    })
  }

  handleSlider = (value)=>{
    this.setState({
      hoursBack: value,
      loaderShown: true
    })
  }

  render() {
    //deviceWebSocket.getDevicesData(this.props.deviceId, this.updateData,this.state.hoursBack)
    let defaultChange = null
    const sortedData = sorter(this.state.data,this.graphs.map(graph => graph.key))
    console.log(sortedData);
    return (
      <div>
        { sortedData ? (
          <div style={{textAlign: 'center'}}>
            <h2>{this.state.hoursBack}</h2>
              { this.state.loaderShown &&  <MuiThemeProvider><CircularProgress /></MuiThemeProvider> }

          <MuiThemeProvider>
            <Slider
            min={1}
            max={24}
            step={1}
            value={this.state.hoursBack}
            axis="x-reverse"
            onChange={(event,value) => {defaultChange = value}}
            onDragStop={() => (defaultChange > 0 ? this.handleSlider(defaultChange): (''))}
          />
          </MuiThemeProvider>
          {this.graphs.map(graphPreference => (
            <div  style={{height: '500px',
            width: '500px', display: 'inline-block'}} key={`${graphPreference.key}Graph`}>

              <h1>{graphPreference.displayTitle}</h1>
              
              <h2>Min and Max : {Number(sortedData[graphPreference.key].domainY[0]).toFixed(2)} and {Number(sortedData[graphPreference.key].domainY[1]).toFixed(2)}</h2>             
              <VictoryChart
                containerComponent={<VictoryVoronoiContainer/>}
                animate={{ duration: 500 }}
                theme={VictoryTheme.material}
                style={{parent: { border: "2px solid purple"}}}
                padding={{ top: 40, bottom: 40, left: 60, right: 40 }}
                domainPadding={30}
                /* domain={
                  { 
                    x: [
                        Number(sortedData[graphPreference.key].domainX[0]).toFixed(2), 
                        Number(sortedData[graphPreference.key].domainX[1]).toFixed(2)
                       ],
                    y: [
                        Number(sortedData[graphPreference.key].domainY[0]).toFixed(2), 
                        Number(sortedData[graphPreference.key].domainY[1]).toFixed(2)
                       ]
                  }
                } */

              >
              <VictoryAxis
                orientation="bottom"
                label="Hours Ago"
                style={{
                  axisLabel: { padding: 30 }
                }}
              />
              <VictoryAxis dependentAxis

                label={`${graphPreference.displayTitle} (${graphPreference.unit})`}
                style={{
                  axisLabel: { padding: 40 }
                }}

              />
              <VictoryLine
                style={{
                  data: { stroke: "#c43a31"},
                  parent: { border: "6px solid blue"}
                }}
                data={sortedData[graphPreference.key].values}
              />
              <VictoryScatter 
                style={{
                  data: { stroke: "#c43a31", strokeWidth: 2, fill: "white" }
                }}
                size={4}
                data={sortedData[graphPreference.key].values}
                labelComponent={<VictoryTooltip/>}
                labels={(d) => {
                    return `Time:${moment.duration(d.x*-3600000).format("h [hours], m [minutes], s [seconds]")} value:${d.y}`
                  }}
              />
            </VictoryChart></div>
            ))}</div>
        ) : <MuiThemeProvider><CircularProgress /></MuiThemeProvider>}
      </div>
    )
  }
}

export default DevicePage

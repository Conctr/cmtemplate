import React, { Component } from 'react';
import * as deviceWebSocket from '../api/deviceWebSockets'
import { VictoryLine,VictoryChart,VictoryTheme,VictoryVoronoiContainer,VictoryAxis } from 'victory'
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
      time /= -3600000
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

    sortedValues[key]['domainX'] = [maxX + domainValX,minX - domainValX]
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
       hoursBack: 3
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
      data: newData
    })
  }
  handleUpdateData = (newData)=>{

    this.setState({
      data: this.state.data.concat(newData)
    })
  }

  handleSlider = (value)=>{
    this.setState({
      hoursBack: value
    })
  }

  render() {
    //deviceWebSocket.getDevicesData(this.props.deviceId, this.updateData,this.state.hoursBack)
    let defaultChange = null
    console.log(this.state.data)
    const sortedData = sorter(this.state.data,this.graphs.map(graph => graph.key))
    return (
      <div>
        { sortedData ? (
          <div style={{textAlign: 'center'}}>
            <h2>{this.state.hoursBack}</h2>
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
            width: '500px'}} key={`${graphPreference.key}Graph`}>
              <h1>{graphPreference.key}</h1>
              <VictoryChart
              containerComponent={<VictoryVoronoiContainer
                 labels={(d) => {
                   return `time:${moment.duration(d.x*-3600000).format("h [hours], m [minutes], s [seconds]")} value:${d.y}`
                 }}
               />}
              animate={{ duration: 500 }}
              theme={VictoryTheme.material}
              style={{parent: { border: "2px solid purple"}}}
              >
              <VictoryAxis
                label="Time In Hours"
                style={{
                  axisLabel: { padding: 30 }
                }}
              />
              <VictoryAxis dependentAxis
                label={`${graphPreference.displayTitle} in ${graphPreference.unit}`}
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
            </VictoryChart></div>
            ))}</div>
        ) : <MuiThemeProvider><CircularProgress /></MuiThemeProvider>}
      </div>
    )
  }
}

export default DevicePage

import React, { Component } from 'react';
import * as deviceWebSocket from '../api/deviceWebSockets'
import { VictoryLine,VictoryChart,VictoryTheme } from 'victory'
import CircularProgress from 'material-ui/CircularProgress'
import Slider from 'material-ui/Slider'
import moment from 'moment'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


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
    sortedValues[key]['x'] = {min: minX,max: maxX}
    sortedValues[key]['y'] = {min: minY,max: maxY}
  })
  console.log('sorted data',sortedValues)
  }
  return sortedValues
}

let graphLoading = false
class DevicePage extends Component {

  graphs = ['humidity','pressure','temperature']

  constructor(props){
    super(props);
    this.state = {
       data: {},
       hoursBack: 3
    };
  }

  componentDidMount(){
    deviceWebSocket.getDevicesData(this.props.deviceId, this.updateData, this.state.hoursBack)
  }

  componentWillUpdate(nextProps, nextState){
    if (nextState.hoursBack !== this.state.hoursBack) {
      deviceWebSocket.getDevicesData(this.props.deviceId, this.updateData, nextState.hoursBack)
    }
  }

  updateData = (newData)=>{
    this.setState({
      data: newData
    })
  }
  pushNewData = (newData)=>{

    // this.setState({
    //   data: this.state.data.push(newData)
    // })
  }

  handleSlider = (value)=>{
    this.setState({
      hoursBack: value
    })
  }

  render() {
    //deviceWebSocket.getDevicesData(this.props.deviceId, this.updateData,this.state.hoursBack)
    let defaultChange = null
    const sortedData = sorter(this.state.data,this.graphs)
    console.log(this.state.data)
    return (
      <div>
        { sortedData ? (
          <div>
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
          {this.graphs.map(keyName => (
            <div  style={{height: '80%',
            width: '80%'}} key={`${keyName}Graph`}>
              <h1>{keyName}</h1>
              <VictoryChart
              animate={{ duration: 1500 }}
              theme={VictoryTheme.material}
              style={{parent: { border: "2px solid purple"}}}
              >
              <VictoryLine
                style={{
                  data: { stroke: "#c43a31"},
                  parent: { border: "6px solid blue"}
                }}
                data={sortedData[keyName].values}
              />
            </VictoryChart></div>
            ))}</div>
        ) : <MuiThemeProvider><CircularProgress /></MuiThemeProvider>}
      </div>
    )
  }
}

export default DevicePage

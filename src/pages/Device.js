import React, { Component } from 'react';
import * as deviceWebSocket from '../api/deviceWebSockets'
import { getModel as getDeviceModel } from '../api/device'
import CircularProgress from 'material-ui/CircularProgress'
import Slider from 'material-ui/Slider'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Chip from 'material-ui/Chip';
import FaBattery0 from 'react-icons/lib/fa/battery-0'
import FaBattery1 from 'react-icons/lib/fa/battery-1'
import FaBattery2 from 'react-icons/lib/fa/battery-2'
import FaBattery3 from 'react-icons/lib/fa/battery-3'
import FaBattery4 from 'react-icons/lib/fa/battery-4'
import LineGraph from '../components/molecules/LineGraph'


function sorter(data,dataKeys){
  /* function to sort data into
  {key:
    {
      values: [all the values],
      rangeX: {min: minOfX, max: maxOfX}
      rangeY: {min: minOfY, max: maxOfY}
    }
  }
  */
  let sortedValues = {}
  if(data != null) {
    dataKeys.forEach(key => {
    sortedValues[key] = {}
    sortedValues[key].values = []
      for(let i = 0; i < data.length; i++){
        let time = data[i]['_ts']

        sortedValues[key].values.push({ts: time,value: data[i][key]})
      }
    let allX = sortedValues[key].values.map(val => (val.ts))
    let allY = sortedValues[key].values.map(val => (val.value))
    let minX = Math.min.apply(null, allX)
    let maxX = Math.max.apply(null, allX)
    let minY = Math.min.apply(null, allY)
    let maxY = Math.max.apply(null, allY)

    sortedValues[key]['rangeX'] = {min: minX,max: maxX}
    sortedValues[key]['rangeY'] = {min: minY,max: maxY}

  })
  }
  return sortedValues
}

class DevicePage extends Component {

  // Determines which graphs get rendered
  allGraphs = []

  constructor(props){
    super(props);
    this.state = {
       data: {},
       hoursBackShown:3,
       hoursBack: 3,
       loaderShown: false,
       graphsShown: [{
          key: 'humidity',
          displayTitle: 'Humidity',
          unit: '%'
        },{
          key: 'pressure',
          displayTitle: 'Pressure',
          unit: ' hPa'
        },{
          key: 'temperature',
          displayTitle: 'Temperature',
          unit: '°C'
        }],
    };
    this.defaultChange = null;
  }

  componentDidMount(){
    deviceWebSocket.getDevicesData(this.props.deviceId, this.updateData, this.state.hoursBack,this.handleUpdateData)
    getDeviceModel(this.props.deviceId)
    .then( res => {
      this.allGraphs = res.map(modelData => {
        return {
          key: modelData.reference,
          displayTitle: modelData.title,
          unit: modelData.unit
        }
      })
    })
    .catch(error => {
      this.props.handleError(error)
    })
  }

determineGraphsWithClass = (allGraphs) => {
  this.state.graphsShown.forEach(graphShown => {
    allGraphs.forEach(graph => {
      if(graphShown.key === graph.key) {
        graph.display = true
        // Optimasation issue, loop will keep running even when matched
      }
    })
  })
  return allGraphs
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

  handleSliderStop = (value)=>{
    deviceWebSocket.getDevicesData(this.props.deviceId, this.updateData, value,this.handleUpdateData)

    this.setState({
      hoursBack: value,
      loaderShown: true,
      hoursBackShown: value
    })
  }

  handleSlider = (value)=>{
    this.setState({
      hoursBackShown: value
    })
  }

  getBatteryPercentage = (latestBattery) =>{
    // Getting the percentage of how far between two points.
    let lower = 2.31
    let upper = 2.794
    let value = latestBattery
    let percentage = (value - lower) / (upper - lower)
    return percentage * 100
  }

  handleGraphDelete = (graphKey) => {
    this.setState({
      graphsShown: this.state.graphsShown.filter(graphShown =>{
        return graphShown.key !== graphKey
      })
    })
    this.allGraphs = this.allGraphs.map(graph => {
      graph.display = false
      return graph
    })
  }

  handleGraphAdd = (graphKey) => {
    let elementToAdd = this.allGraphs.find(graph => graph.key === graphKey)
    this.setState({
      graphsShown: this.state.graphsShown.concat(elementToAdd)
    })
    this.allGraphs = this.allGraphs.map(graph => {
      graph.display = false
      return graph
    })
  }

  handleGraphAdd = (graphKey) => {
    let elementToAdd = this.allGraphs.find(graph => graph.key === graphKey)
    this.setState({
      graphsShown: this.state.graphsShown.concat(elementToAdd)
    })
    this.allGraphs = this.allGraphs.map(graph => {
      graph.display = false
      return graph
    })
  }

  render() {
    const sortedGraphs = this.determineGraphsWithClass(this.allGraphs)
    const sortedData = sorter(this.state.data,this.state.graphsShown.map(graph => graph.key))
    return (

      <div style={{textAlign: 'center'}}>
        { !!this.state.data.length ? (

          <div style={{textAlign: 'center',marginLeft: 'auto',marginRight: 'auto'}}>
            <div style={{width: '90%'}}>
              {this.getBatteryPercentage(this.state.data[0].battery) >= 80 ? (
                <FaBattery4 style={{display: 'block',float: 'right'}} size={60} color='green'/>
              ): this.getBatteryPercentage(this.state.data[0].battery) >= 60 ? (
                <FaBattery3 style={{display: 'block',float: 'right'}} size={60} color='green'/>
              ): this.getBatteryPercentage(this.state.data[0].battery) >= 40 ? (
                <FaBattery2 style={{display: 'block',float: 'right'}} size={60} color='yellow'/>
              ): this.getBatteryPercentage(this.state.data[0].battery) >= 20 ? (
                <FaBattery1 style={{display: 'block',float: 'right'}} size={60} color='red'/>
              ): this.getBatteryPercentage(this.state.data[0].battery) >= 0 ? (
                <FaBattery0 style={{display: 'block',float: 'right'}} size={60} color='red'/>
              ): 'Inavlid battery data'}
            </div>
            <div style={{width: '100%',display: 'block'}}>
              {!this.state.loaderShown ? (
                <div style={{height: '90px',width: '80%',display: 'flex',flexDirection: 'row',alignItems: 'center',marginLeft: 'auto',marginRight: 'auto'}}>
                <h5 style={{height: '45px',width: '14%',display: 'inline-block'}}>{`Data range: ${this.state.hoursBackShown} hours`}</h5>
              <MuiThemeProvider>
                <Slider style={{width: '85%',display: 'inline-block'}}
                min={1}
                max={24}
                step={1}
                value={this.state.hoursBack}
                onChange={(event,value) => {
                  this.defaultChange = value
                  this.handleSlider(value)
                }}
                onDragStop={() => {  this.defaultChange > 0 && this.handleSliderStop(this.defaultChange)}}
              />
              </MuiThemeProvider>
              </div>
              ): (
                <MuiThemeProvider><CircularProgress /></MuiThemeProvider>
              )}
            </div>
             {sortedGraphs.length > 0 ? (
                <div className='chip-container'>
                  {sortedGraphs.map(graph =>{
                    return <MuiThemeProvider
                    key={graph.key}>
                    {graph.display ? (
                      <Chip
                      className='display-true'
                      onRequestDelete={() => this.handleGraphDelete(graph.key)}
                      style={{backgroundColor: 'red'}}>
                        {graph.displayTitle}
                      </Chip>
                    ) : (
                      <Chip
                      className='display-false'
                      onTouchTap={() => this.handleGraphAdd(graph.key)}>
                        {graph.displayTitle}
                      </Chip>
                    )}
                    </MuiThemeProvider>
                  })}
                </div>
             ) : (
               <MuiThemeProvider><CircularProgress /></MuiThemeProvider>
             )}

          {this.state.graphsShown.map(graphPreference => (

            <div  style={{height: '500px',
            width: '500px', display: 'inline-block'}} key={`${graphPreference.key}Graph`}>
              <h1>{graphPreference.displayTitle}</h1>
              <h2> Min: {(sortedData[graphPreference.key].rangeY.min).toFixed(2)} /
                   Max: {(sortedData[graphPreference.key].rangeY.max).toFixed(2)}  </h2>
                 <LineGraph graphPreference={graphPreference} values={sortedData[graphPreference.key].values}/>
                </div>
            ))}</div>
        ) : <MuiThemeProvider><CircularProgress /></MuiThemeProvider>}
      </div>
    )
  }
}

export default DevicePage

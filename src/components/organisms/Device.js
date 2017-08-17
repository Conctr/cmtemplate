import React, { Component } from 'react';
import * as deviceWebSocket from '../../api/deviceWebSockets';
import { getModel as getDeviceModel } from '../../api/device';
import CircularProgress from 'material-ui/CircularProgress';
import Slider from 'material-ui/Slider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LineGraph from '../molecules/LineGraph';
import Menu from '../atoms/Menu';
import MenuItem from '../atoms/MenuItem';
import DeviceInfoTable from '../molecules/DeviceInfoTable';
import DeviceSettingsDialog from '../molecules/DeviceSettingsDialog';
import BatteryIcon from '../atoms/Battery'

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

export default class DeviceInfo extends Component {

  // Determines which graphs get rendered
  allGraphs = []

  constructor(props){
    super(props);
    this.state = {
       data: {},
       hoursBackShown:3,
       hoursBack: 3,
       loaderShown: false,
       keysShown: [{key: "temperature", displayTitle: "temperature", unit: "°c", display: true},
       {key: "humidity", displayTitle: "humidity", unit: "%", display: true},
       {key: "pressure", displayTitle: "pressure", unit: "hPa", display: true}],
       selectedGraphKey: null
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
      // this.props.handleError(error)
      console.error(error);
    })
  }

determineGraphsWithClass = (allGraphs) => {
  this.state.keysShown.forEach(graphShown => {
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
      keysShown: this.state.keysShown.filter(graphShown =>{
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
      keysShown: this.state.keysShown.concat(elementToAdd)
    })
    this.allGraphs = this.allGraphs.map(graph => {
      graph.display = false
      return graph
    })
  }

  handleGraphSelect = (selectedGraphKey) => {
    this.setState({selectedGraphKey: selectedGraphKey})
  }
// .paper-data {
//             text-align: center;
//             margin-left: auto;
//           }
  render() {
    const sortedGraphs = this.determineGraphsWithClass(this.allGraphs)
    const sortedData = sorter(this.state.data,this.state.keysShown.map(graph => graph.key))
    return (

      <div style={{textAlign: 'center'}}>

        { !!this.state.data.length ? (

          <div className='paper-data' style={{textAlign: 'center',marginLeft: 'auto',marginRight: 'auto'}}>
          
            <BatteryIcon batteryPercentage={this.getBatteryPercentage(this.state.data[0].battery)} />

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
               <DeviceSettingsDialog
                 handleGraphDelete={this.handleGraphDelete}
                 handleGraphAdd={this.handleGraphAdd}
                 sortedGraphs={sortedGraphs}/>
             ) : (
               <MuiThemeProvider><CircularProgress /></MuiThemeProvider>
             )}
             {this.state.keysShown.length > 0 ? (
               <div style={{display: 'flex',flexDirection: 'row',width: '100%',justifyContent: 'space-around'}}>
                 {this.state.keysShown.map(keyShown => (
                   <div style={{textAlign: 'center'}} key={keyShown.key} >
                     <p>{keyShown.displayTitle}</p>
                     <h3><b>{sortedData[keyShown.key].values[0].value.toFixed(1)} {keyShown.unit}</b></h3>
                   </div>
                 ))}
                 {/*<DeviceInfoTable sortedData={sortedData} keysShown={this.state.keysShown}/>*/}
               </div>
             ) : (<h1>Please Select Attributes to Display</h1>)}
             <br/>
             <br/>
             <br/>
          <div className='graph-with-select' style={{height: '800px'}}>
            <div className='graph-select' style={{display: 'flex',flexDirection: 'column',height: '40%',width: '25%',float: 'left'}}>
              <Menu>
                {this.state.keysShown.map(keyShown => (
                  <div key={`${keyShown.key}Graph`}>
                    {keyShown.key === this.state.selectedGraphKey ? (
                      <MenuItem
                        style={{backgroundColor: 'linear-gradient(0deg, blue, white)'}}
                        onTouchTap={() => this.handleGraphSelect(keyShown.key)}
                        primaryText={keyShown.displayTitle}/>
                    ) : (
                      <MenuItem
                        onTouchTap={() => this.handleGraphSelect(keyShown.key)}
                        primaryText={keyShown.displayTitle}/>
                    ) }
                  </div>
                ))}
              </Menu>
            </div>
            {console.log('sorted data',sortedData)}
            {console.log('selectedGraphKey',this.state.selectedGraphKey)}
            <div
              className='graph'
              style={{height: '80%',width: '60%',float: 'right',marginRight: '20px'}}>
              {this.state.selectedGraphKey ? (
                <LineGraph
                graphPreference={this.state.keysShown.find(object => (object.key === this.state.selectedGraphKey))}
                values={sortedData[this.state.selectedGraphKey].values}/>
              ) : ('Select Attribute to graph')}
            </div>
          </div>
          </div>
        ) : <MuiThemeProvider><CircularProgress /></MuiThemeProvider>}
      </div>
    )
  }
}

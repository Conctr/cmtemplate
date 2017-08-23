import React, { Component } from 'react';
import * as deviceWebSocket from '../../api/deviceWebSockets';
import { getModel as getDeviceModel,
  update as updateDevice,
  getSingle as getDevice,
  setAlertSettings as setDeviceAlertSettings,
  getAlertSettings as getDeviceAlertSettings} from '../../api/device';
import Slider from 'material-ui/Slider';
import CircularProgress from '../atoms/CircularProgress';
import LineGraph from '../molecules/LineGraph';
import Menu from '../atoms/Menu';
import Paper from '../atoms/Paper';
import MenuItem from '../atoms/MenuItem';
import DeviceInfoTable from '../molecules/DeviceInfoTable';
import DeviceSettingsDialog from '../molecules/DeviceSettingsDialog';
import BatteryIcon from '../atoms/Battery'
import moment from 'moment'
import { toast , ToastContainer} from 'react-toastify'

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
    let allX = sortedValues[key].values.map(val => (moment(val.ts)))
    let allY = sortedValues[key].values.map(val => (val.value))
    let minX = Math.min.apply(null, allX)
    let maxX = Math.max.apply(null, allX)
    let minY = Math.min.apply(null, allY)
    let maxY = Math.max.apply(null, allY)

    sortedValues[key]['rangeX'] = {
      min: moment(minX).toDate(),
      max: moment(maxX).toDate()
    }
    sortedValues[key]['rangeY'] = {
      min: minY,
      max: maxY
    }

  })
  }
  return sortedValues
}

export default class DeviceInfo extends Component {
  alertSettings;
  // Determines which graphs get rendered
  allGraphs = []
  deviceData = {}
  constructor(props){
    super(props);
    this.state = {
      data: null,
      hoursBackShown:3,
      newDeviceName:this.deviceData.name,
      hoursBack: 3,
      loaderShown: false,
      keysShown: [],
      selectedGraphKey: null
    };
    this.defaultChange = null;
  }

  originalShownKeys;

  componentDidMount(){
    this.getDeviceSettings()
    deviceWebSocket.getDevicesData(this.props.deviceId, this.updateData, this.state.hoursBack,this.handleUpdateData)
    Promise.all([getDeviceModel(this.props.deviceId),getDevice(this.props.deviceId),getDeviceAlertSettings()])
    .then(([model,deviceData,deviceAlertSettings]) => {
      this.deviceData = deviceData
      this.setState({"newDeviceName":deviceData.name})
      this.alertSettings = deviceAlertSettings
      this.allGraphs = model.map(modelData => {
        return {
          displayTitle: modelData.title,
          key: modelData.reference,
          unit: modelData.unit
        }
      })
    })
    .catch(error => {
      // this.props.handleError(error)
      console.error(error);
    })
  }
  componentWillReceiveProps({deviceId}) {
    this.setState({
      data: null
    })
    this.getDeviceSettings()
    deviceWebSocket.getDevicesData(this.props.deviceId, this.updateData, this.state.hoursBack,this.handleUpdateData)
    Promise.all([getDeviceModel(this.props.deviceId),getDevice(this.props.deviceId),getDeviceAlertSettings()])
    .then(([model,deviceData,deviceAlertSettings]) => {
      this.deviceData = deviceData
      this.alertSettings = deviceAlertSettings
      this.allGraphs = model.map(modelData => {
        return {
          displayTitle: modelData.title,
          key: modelData.reference,
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
    if(graphKey !== this.state.selectedGraphKey){
      this.setState({
        keysShown: this.state.keysShown.filter(graphShown =>{
          return graphShown.key !== graphKey
        })
      })
    } else {
      this.setState({
        keysShown: this.state.keysShown.filter(graphShown =>(
          graphShown.key !== graphKey
        )),selectedGraphKey: null

      })
    }
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

  saveGraphSettings = (object) => {
    localStorage.setItem('graphPreference',JSON.stringify(object))
    return object
  }

  getGraphSettings = () => {
    return localStorage.graphPreference
  }

  getDeviceSettings = () => {
    // Graph Preference
    let graphPreference = this.getGraphSettings()
      graphPreference = this.saveGraphSettings([
        {"key":"temperature","displayTitle":"temperature","unit":"°c","display": true},
        {"key":"humidity","displayTitle":"humidity","unit":"%","display": true},
        {"key":"pressure","displayTitle":"pressure","unit":"hPa","display": true}
      ])
    this.originalShownKeys = graphPreference
    this.setState({keysShown: graphPreference})
  }

  saveDeviceSettings = (rules) => {
    // console.log('asdf',JSON.stringify(rules))
    setDeviceAlertSettings(this.props.deviceId,rules,this.handleAlerts)
    updateDevice(this.deviceData.id,{new_name: this.state.newDeviceName})
    //todo save device name
  }

  handleAlerts = (err,res) => {
    if(err) {
      toast.error('Failed to update settings, please try later')
    }else {
      toast.success('Successfully saved settings')
    }
  }

  updateDeviceName = (newDeviceName)=>{
    this.setState ({"newDeviceName" : newDeviceName})
  }

  resetGraphsShown = () => {

  }

  // // Save state of settings
  // handleSettingsEnter = () => {
  //   this.state.
  // }
  // // Save state of settings
  // handleSettingsSave = () => {
  //   this.state.
  // }
  // // Save state of settings
  // handleSettingsCancel = () => {
  //   this.state.
  // }

  render() {
    const sortedGraphs = this.determineGraphsWithClass(this.allGraphs)
    const sortedData = sorter(this.state.data,this.state.keysShown.map(graph => graph.key))
    console.log('this.alertSettings render',this.alertSettings)
    return (
      <div style={{textAlign: 'center'}}>
        <ToastContainer
          position="top-right"
          type="default"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        {this.state.data ? (
          <div>
            { !!this.state.data.length ? (
              <div style={{textAlign: 'center',marginLeft: 'auto',marginRight: 'auto'}}>
                <br/>
                <br/>
                <br/>
                 {//<h1>{this.deviceData.name ? this.deviceData.name : 'No Name'}</h1>
             }
                <h1>{this.state.newDeviceName ? this.state.newDeviceName : 'No Name'}</h1>

                <div style={{width: '100%',display: 'flex',justifyContent: 'center'}}>
                  <BatteryIcon batteryPercentage={this.getBatteryPercentage(this.state.data[0].battery)} />
                </div>
                <Paper
                  style={{width: '80%',margin: 'auto'}}
                  zDepth={1}>
                  <br/>
                  <h2>Current Status</h2>
                 {sortedGraphs.length > 0 ? (
                   <DeviceSettingsDialog

                     resetGraphsShown={this.resetGraphsShown}
                     newDeviceName ={this.updateDeviceName}
                     alertSettings={this.alertSettings}
                     saveSettings={this.saveDeviceSettings}
                     updateDevice={updateDevice}
                     handleGraphDelete={this.handleGraphDelete}
                     handleGraphAdd={this.handleGraphAdd}
                     sortedGraphs={sortedGraphs}
                     deviceData={this.deviceData}
                     />
                 ) : (
                   <CircularProgress />
                 )}
                 {this.state.keysShown.length > 0 ? (
                   <div style={{display: 'flex',flexDirection: 'row',width: '100%',justifyContent: 'space-around'}}>
                     {this.state.keysShown.map(keyShown => (
                       <div style={{textAlign: 'center'}} key={keyShown.key} >
                         <p>{keyShown.displayTitle}</p>
                         <h3><b>{sortedData[keyShown.key].values[0].value} {keyShown.unit}</b></h3>
                       </div>
                     ))}
                     {/*<DeviceInfoTable sortedData={sortedData} keysShown={this.state.keysShown}/>*/}
                   </div>
                 ) : (<h1>Please Select Attributes to Display</h1>)}
                 </Paper>
                 <br/>
                 <br/>
                 <br/>
              <Paper
                style={{width: '90%',marginLeft: 'auto',marginRight: 'auto',marginBottom: '15px'}}
                zDepth={1}>
                <br/>
                <h2>Data analysis</h2>
                <h5>{/* last data recieved minutes ago xxx*/}</h5>
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
                  <div
                    className='graph'
                    style={{height: '80%',width: '60%',float: 'right',marginRight: '20px'}}>
                    {this.state.selectedGraphKey ? (
                      <LineGraph
                        graphPreference={this.state.keysShown.find(object => (object.key === this.state.selectedGraphKey))}
                        values={sortedData[this.state.selectedGraphKey].values}
                        rangeX={sortedData[this.state.selectedGraphKey].rangeX}
                        rangeY={sortedData[this.state.selectedGraphKey].rangeY}
                        upperlimit={this.alertSettings && this.alertSettings[this.state.selectedGraphKey] ? (
                          parseInt(this.alertSettings[this.state.selectedGraphKey]['GT'])
                        ) : null }
                        lowerlimit={this.alertSettings && this.alertSettings[this.state.selectedGraphKey] ? (
                          parseInt(this.alertSettings[this.state.selectedGraphKey]['LT'])
                        ) : null }
                      />
                    ) : ('Select Attribute to graph')}
                  </div>
                  <div style={{width: '100%',display: 'block'}}>
                    {!this.state.loaderShown ? (
                      <div style={{height: '90px',width: '80%',display: 'flex',flexDirection: 'row',alignItems: 'center',marginLeft: 'auto',marginRight: 'auto'}}>
                      <h5 style={{height: '45px',width: '14%',display: 'inline-block'}}>{`Data range: ${this.state.hoursBackShown} hours`}</h5>
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
                    </div>
                    ): (
                      <CircularProgress />
                    )}
                  </div>
                </div>
              </Paper>
              </div>
            ) : <h3>No Data Associated with this device</h3>}
          </div>
        ) : (
          <CircularProgress />
        )}
      </div>
    )
  }
}

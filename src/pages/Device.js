import React, { Component } from 'react';
import * as deviceWebSocket from '../api/deviceWebSockets'
function sorter(data,dataKeys){
  let sortedValues = {}
  dataKeys.forEach(key => {
    if (!sortedValues[key]){
      sortedValues[key] = []
    }
    for(let i = 0; i < data.length; i++){
      sortedValues[key].push({ts: data[i]['_ts'],value: data[i][key]})
    }
  })
  return sortedValues
}
class DevicePage extends Component {

  constructor(props){
    super(props);
    this.state = {
       data: {}
    };
  }

  componentDidMount(){
    deviceWebSocket.getDevicesData(this.props.deviceId, this.updateData,1)
  }

  updateData = (newData)=>{
    this.setState({
      data: newData
    })
  }


  render() {
    console.log('sorted',sorter(this.state.data,['humidity','pressure','temperature']))
    return (
      <div>
        <h1>Hai</h1>
      </div>
    )
  }
}

export default DevicePage

import React from 'react'
import FaBattery0 from 'react-icons/lib/fa/battery-0'

export default class BatteryPercentage extends React.Component {
  render() {
    let batterySize = 60
    let batteryPercentage = this.props.batteryPercentage
    let batteryColor=''
    if      (batteryPercentage >= 80)
        { batteryColor='darkgreen' } 
    else if (batteryPercentage >= 60)
        { batteryColor='green' } 
    else if (batteryPercentage >= 40)
        { batteryColor='green' } 
    else if (batteryPercentage >= 20)
        { batteryColor='orange' } 
    else if (batteryPercentage >= 10)
        { batteryColor='red' } 
    else if (batteryPercentage >= 0 )
        { batteryColor='darkred' }
    
    return (
      <div className='battery-container'> 
        <p className={`battery-percent ${batteryColor}`}> {batteryPercentage.toFixed(1)}% </p>
        <FaBattery0 className={`battery ${batteryColor}`} size={batterySize} />
        </div>
    )
  }
}
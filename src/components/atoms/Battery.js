import React from 'react'
import FaBattery0 from 'react-icons/lib/fa/battery-0'

export default class BatteryPercentage extends React.Component {
  render() {
    let batterySize = 60
    let batteryPercentage = this.props.batteryPercentage
    return (
      <div>
        {batteryPercentage >= 80 ? (
            <div className='battery-container'> 
                <p className='battery-percent'> {batteryPercentage.toFixed(1)}% </p>
                <FaBattery0 className='darkgreen' size={batterySize} />
            </div>
            ) : batteryPercentage >= 60 ? (
            <div className='battery-container'> 
                <p className='battery-percent'> {batteryPercentage.toFixed(1)}% </p>
                <FaBattery0 className='green' size={batterySize} />
            </div>
        ) : batteryPercentage >= 40 ? (
            <div className='battery-container'> 
                <p className='battery-percent'> {batteryPercentage.toFixed(1)}% </p>
                <FaBattery0 className='green' size={batterySize} />
            </div>
        ) : batteryPercentage >= 20 ? (
            <div className='battery-container'> 
                <p className='battery-percent'> {batteryPercentage.toFixed(1)}% </p>
                <FaBattery0 className='orange' size={batterySize} />
            </div>
        ) : batteryPercentage >= 10 ? (
            <div className='battery-container'> 
                <p className='battery-percent'> {batteryPercentage.toFixed(1)}% </p>
                <FaBattery0 className='red' size={batterySize} />
            </div>
        ) : batteryPercentage >= 0 ? (
            <div className='battery-container'> 
                <p className='battery-percent'> {batteryPercentage.toFixed(1)}% </p>
                <FaBattery0 className='darkred' size={batterySize} />
            </div>
        ) : 'Inavlid battery data'}
      </div>
    )
  }
}
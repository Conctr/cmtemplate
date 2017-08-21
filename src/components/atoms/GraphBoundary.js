import React from 'react'
import {VictoryArea,VictoryAxis,VictoryChart}  from 'victory'
import moment  from 'moment'

export default function GraphBoundary ({
    minSetting,
    maxSetting,
    condition,
    minX,
    maxX
}) {
    let dataHigh
    let dataLow

    if (condition === 'temperature') {  //temperature min and max graph shading 
      let condition = 'Temp'
      minSetting = 18
      maxSetting = 19.5
        dataHigh = [
          {x: "2017-08-20T23:44:34.000Z", y: maxSetting},
          {x: "2017-08-21T02:30:10.000Z", y: maxSetting}
      ]
        dataLow = [
          {x: minSetting, y: minSetting},
          {x: maxSetting, y: minSetting}
      ]

    } else if (condition === 'humidity') {
      let condition = 'Humidity'
      minSetting = '50'
      maxSetting = '70'
    } else {
      let conditon = 'Other'
      minSetting = 'Not known'
      maxSetting = 'Not known'
    }

        /* <small><p>{condition} conditions
          minY: <strong>{minSetting}</strong> &nbsp; 
          maxY: <strong>{maxSetting}</strong>
          minx: {moment(minX).format()} maxX: {moment(maxX).format()}
        </p> </small> */
  return (
        


        <VictoryArea 
            name="AlertHigh"
            style={{
            data: {
                fill: "red", fillOpacity: 0.3
            }
            }}
            data={dataHigh}
            y0={(d) => d.y + 3}
        />


  )
}

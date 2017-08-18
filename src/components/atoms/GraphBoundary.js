import React from 'react'
import {VictoryArea,VictoryAxis,VictoryChart}  from 'victory'

export default function GraphBoundary ({
    maxX,
    minX,
    maxY,
    minY,
    condition
}) {
  return (
    <p>GraphBoundary maxX {maxX} minX</p>
  )
}

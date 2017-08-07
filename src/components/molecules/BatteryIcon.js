import React from 'react'

function percentageToPixels(percentage){
  return 224 * (percentage/100)
}
export default ({
  percentage
}) => (
  <div>
    <div className="container">
      <div className="battery">
  	   <div className="inner"></div>
  	    <div className="innerpre" style={{width: percentageToPixels(percentage)}}></div>
  	    <div className="posi"></div>
      </div>
    </div>
  </div>
)

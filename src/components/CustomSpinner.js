import React from 'react'
import Spinner from 'react-spinkit'

import '../styles/sass/components/CustomSpinner.scss'

function CustomSpinner({}) {
  return (
    <div className="transparent-background">
      <Spinner className="spinner-format" name="cube-grid" color="dodgerblue" />
    </div>
  )
}

export default CustomSpinner

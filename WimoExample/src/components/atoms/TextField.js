import React from 'react'
import Field from 'material-ui/TextField'

export default function TextField(props) {

  let mutableProps = {...props}
  let handleKey = mutableProps.onEnterKeyDown
  delete mutableProps.onEnterKeyDown

  let handleKeyDown = (event) => {
    switch (event.key) {
      case 'Enter':
        handleKey()
        break
      default: break
    }
  }

  return (
    <Field
      { ...mutableProps }
      onKeyDown={ handleKeyDown }
    />
  )
}

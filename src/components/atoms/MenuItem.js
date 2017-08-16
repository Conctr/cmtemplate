import React from 'react';
import WimoThemeProvider from '../../styles/WimoThemeProvider'
import MenuItem from 'material-ui/MenuItem'

export default function Item (props) {
   return (
     <WimoThemeProvider>
       <MenuItem
         {...props}
       />
     </WimoThemeProvider>
   )
}

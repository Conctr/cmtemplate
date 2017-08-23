import React from 'react';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import imgAvatar from '../../imgs/uxceo-128.jpg'

import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

const style = {margin: 5};
  
const NavbarAvatar = () => (
    <ListItem
      disabled={true}
      leftAvatar={
        <Avatar
          src={ imgAvatar } alt='wimo logo' className='navbar-avatar'
          size={30}
          style={style}
        />
      }
    />
);

export default NavbarAvatar;
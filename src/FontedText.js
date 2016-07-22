
'use strict';
import React from 'react';
import {
  StyleSheet,
  Text,
  Platform
  } from 'react-native';

export default class FontedText extends React.Component{
   static defaultProps={

   };
   static propTypes ={
    children: React.PropTypes.node,
    style: React.PropTypes.number
  };

  render(){
    var {style, ...props} = this.props;
    return (
      <Text style={[styles.font, style]} {...props}>
        { this.props.children }
      </Text>
    );
   }
}

var styles = StyleSheet.create({
  font: {
    fontFamily:'UKIJTuz',
  },
});

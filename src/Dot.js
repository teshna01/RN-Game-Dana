
'use strict';
import React from 'react';
import {
  StyleSheet,
  View,
  Animated,
  } from 'react-native';

export default class Dot extends React.Component{
   static propTypes ={
    isPlacedCorrectly: React.PropTypes.bool.isRequired,
   };

 constructor(props) {
   super(props);
   this.state = {
    scale: new Animated.Value(this.props.isPlacedCorrectly ? 1 : 0.1),
    visible: this.props.isPlacedCorrectly,
   };
 }
  componentWillReceiveProps(nextProps) {
    if (!this.props.isPlacedCorrectly && nextProps.isPlacedCorrectly) {
      this.animateShow();
    } else if (this.props.isPlacedCorrectly && !nextProps.isPlacedCorrectly) {
      this.animateHide();
    }
  }

  animateShow() {
    this.setState({visible: true}, () => {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 100,
      }).start();
    });
  }

  animateHide() {
    Animated.timing(this.state.scale, {
      toValue: 0.1,
      duration: 100,
    }).start(() => this.setState({visible: false}));
  }

  render() {
    if (!this.state.visible) {
      return null;
    }
    return (
      <Animated.View style={[styles.dot, {transform: [{scale: this.state.scale}]}]}/>
    );
  }
}

var styles = StyleSheet.create({
  dot: {
    backgroundColor: '#FF3366',
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 3,
  }
});


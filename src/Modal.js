
'use strict';
import React from 'react';
import Dimensions from 'Dimensions';
var screen = Dimensions.get('window');

import {
  StyleSheet,
  View,
  Animated,
  } from 'react-native';


export default class Modal extends React.Component{
   static propTypes= {
    children: React.PropTypes.node.isRequired,
    isOpen: React.PropTypes.bool.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      position: new Animated.Value(this.props.isOpen ? 0 : screen.height),
      visible: this.props.isOpen
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.animateOpen();
    } else if (this.props.isOpen && !nextProps.isOpen) {
      this.animateClose();
    }
  }

  /*
   * Open animation for the modal, will move up
   */
  animateOpen() {
    this.setState({visible: true}, () => {
      Animated.spring(
        this.state.position, {
          toValue: 0,
          friction: 8,
        }
      ).start();
    });
  }

  /*
   * Close animation for the modal, will move down
   */
  animateClose(){
    Animated.timing(
      this.state.position,
      {
        toValue: screen.height,
        duration: 400,
      }
    ).start(() => this.setState({visible: false}));
  }

  render() {
    if (!this.state.visible) {
      return null;
    }
    return (
      <View style={[styles.wrapper]}>
      { this.props.isOpen ? <View style={[styles.backdrop]}/> : null}
        <Animated.View style={[styles.modal, {transform: [{translateY: this.state.position}, {translateX: 0}]}]}>
          { this.props.children }
        </Animated.View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: screen.height,
    width: screen.width,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  modal: {
    backgroundColor: 'white',
    margin: 20,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.5,
    backgroundColor: '#000000',
  },

});


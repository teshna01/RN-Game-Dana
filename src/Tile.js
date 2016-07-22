import React from 'react';
import Dot  from './Dot';
import FontedText from './FontedText';

import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  } from 'react-native';


export default class Tile extends React.Component{
  static defaultProps = {
    axis: '',
    direction:-1
   };
  static propTypes = {
    coordinates: React.PropTypes.object.isRequired,
    axis: React.PropTypes.string.isRequired,
    direction: React.PropTypes.number.isRequired,
    size: React.PropTypes.number.isRequired,
    isPlacedCorrectly: React.PropTypes.bool.isRequired,
    visible: React.PropTypes.bool.isRequired,
    index: React.PropTypes.number.isRequired,
    onMoved: React.PropTypes.func.isRequired
  };
 constructor(props) {
   super(props);
   this.state = {
    value: new Animated.Value(this.props.coordinates[this.props.axis] * this.props.size),
    scale: new Animated.Value(this.props.visible ? 1 : 0.01),
   };
 }
  
  componentWillMount() {
    this.lastDistance = 0;
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (e:Object, gestureState:Object) => this.props.axis && this.props.direction, // eslint-disable-line no-unused-vars
      onPanResponderGrant: (e:Object, gestureState:Object) => { // eslint-disable-line no-unused-vars
        this.state.value.setOffset(this.state.value.__getValue());
        this.state.value.setValue(0);
      },
      onPanResponderMove: (e:Object, gestureState:Object) => {
        var absDistance = this.props.direction * gestureState['d' + this.props.axis];
        if (absDistance > 0 && absDistance < this.props.size) {
          this.state.value.setValue(gestureState['d' + this.props.axis]);
          this.lastDistance = gestureState['d' + this.props.axis];
        }
      },
      onPanResponderRelease: (e:Object, gestureState:Object) => {
        var absDistance = this.props.direction * gestureState['d' + this.props.axis];
        if (absDistance > this.props.size / 3) {
          Animated.timing(this.state.value, {
            toValue: this.props.direction * this.props.size,
            duration: 100,
          }).start(this.props.onMoved);
          // this.state.value.flattenOffset()
        } else {
          Animated.spring(this.state.value, {
            toValue: 0,
          }).start();
        }
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible && !nextProps.visible) {
      this.animateHide();
    } else if (!this.props.visible && nextProps.visible) {
      this.animateShow();
    }
    this.setState({value: new Animated.Value(nextProps.coordinates[nextProps.axis] * nextProps.size)});
  }

  getStyle() {
    return [
      styles.tile,
      {
        top: this.props.axis === 'y' ? this.state.value : this.props.coordinates.y * this.props.size,
        left: this.props.axis === 'x' ? this.state.value : this.props.coordinates.x * this.props.size,
        width: this.props.size,
        height: this.props.size,
        transform: [
          {scale: this.state.scale},
        ],
      },
    ];
  }

  animateHide() {
    Animated.timing(this.state.scale, {
      toValue: 0.01,
      duration: 200,
      delay: this.props.index * 20,
    }).start();
  }

  animateShow() {
    Animated.timing(this.state.scale, {
      toValue: 1,
      duration: 200,
      delay: this.props.index * 20,
    }).start();
  }

  render() {
    return (
      <Animated.View
        style={this.getStyle()}
        {...this._panResponder.panHandlers}>
        <View style={styles.row}/>
        <View style={styles.row}>
          <FontedText style={styles.text}>{ this.props.index }</FontedText>
        </View>
        <View style={[styles.row, styles.dotRow]}>
          <Dot isPlacedCorrectly={this.props.isPlacedCorrectly}/>
        </View>
      </Animated.View>
    );
  }
}

var styles = StyleSheet.create({
  tile: {
    position: 'absolute',
    backgroundColor: '#50D2C2',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: '#F4F4F4',
    borderWidth: 2,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotRow: {
    alignItems: 'flex-start',
  },
});


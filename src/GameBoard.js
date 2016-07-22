'use strict';
import React from 'react';
import Dimensions from 'Dimensions';
import GameHelpers from './GameHelpers';
import Tile from './Tile';
import load from 'lodash';

import {
  StyleSheet,
  View,
  Text
  } from 'react-native';

var deviceWidth = Dimensions.get('window').width;
export default class GameBoard extends React.Component{
 
  static propTypes={
    boardSize: React.PropTypes.number.isRequired,
    indexes: React.PropTypes.array.isRequired,
    tilesVisible: React.PropTypes.bool.isRequired,
    onMoved: React.PropTypes.func.isRequired,
  };

 render(){
  var indexesMatrix = GameHelpers.getMatrixFromIndxes(this.props.indexes, this.props.boardSize);
    var orderedIndexesMatrix = GameHelpers.getMatrixFromIndxes(GameHelpers.getOrderedIndexes(this.props.boardSize), this.props.boardSize);
    var tiles = load.flatten(indexesMatrix.map((row, i) => {
      return row.map((index, j) => {
        var axis;
        var direction;
        var moveTo;
        if (i > 0 && indexesMatrix[i - 1][j] === null) {
          axis = 'y';
          direction = -1;
          moveTo = {x: j, y: i - 1};
        } else if (i < this.props.boardSize - 1 && indexesMatrix[i + 1][j] === null) {
          axis = 'y';
          direction = 1;
          moveTo = {x: j, y: i + 1};
        } else if (j > 0 && indexesMatrix[i][j - 1] === null) {
          axis = 'x';
          direction = -1;
          moveTo = {x: j - 1, y: i};
        } else if (j < this.props.boardSize - 1 && indexesMatrix[i][j + 1] === null) {
          axis = 'x';
          direction = 1;
          moveTo = {x: j + 1, y: i};
        }
        return index ? (
          <Tile
            index={index}
            coordinates={{x: j, y: i}}
            axis={axis}
            direction={direction}
            size={(deviceWidth - 20) / this.props.boardSize}
            onMoved={() => this.props.onMoved({x: j, y: i}, moveTo)}
            isPlacedCorrectly={orderedIndexesMatrix[i][j] === index}
            key={index}
            visible={this.props.tilesVisible}
          />
        ) : null;
      });
    }));
    return (
      <View style={
        [styles.board, {
          width: deviceWidth - 20,
          height: deviceWidth - 20,
        }]}>
        {tiles}
        </View>
    );
   }
}

var styles = StyleSheet.create({
  board: {
    backgroundColor: '#F4F4F4',
  }
});
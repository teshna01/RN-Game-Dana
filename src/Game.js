 

'use strict';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity, 
  Platform,
} from 'react-native';
import FontedText from './FontedText';
import GameBoard from './GameBoard';
import GameHelpers from './GameHelpers';
import Modal from './Modal';

var BOARD_SIZE = 4;
var TOPMARGIN=Platform.OS === 'ios'? 30 : 15;
export default class Game extends React.Component{

	constructor(props) {
	  super(props);
	  this.state = {
	  	indexes:GameHelpers.getShuffledIndexes(BOARD_SIZE),
	  	tilesVisible: false,
      langua:0 //0:uighur 1: chinese
	  };
	 }

	 componentDidMount(){
	 	this.setState({tilesVisible:true});
	 }

   onNewGame(){
    this.setState({
      tilesVisible: false
    });
    setTimeout(() => {
      this.setState({
        indexes: GameHelpers.getShuffledIndexes(BOARD_SIZE)
      }, () => this.setState({tilesVisible: true}));
    }, 200 + 20 * 15);
   }
   onSwitchLang(){
    if(this.state.langua===0){
     this.setState({
      langua:1
    }); 
    }else{
   this.setState({
      langua:0
    });
    }
    
   }
   onMoved(moveFrom, moveTo){
    var indexesMatrix = GameHelpers.getMatrixFromIndxes(this.state.indexes, BOARD_SIZE);
    indexesMatrix[moveTo.y][moveTo.x] = indexesMatrix[moveFrom.y][moveFrom.x];
    indexesMatrix[moveFrom.y][moveFrom.x] = null;
    this.setState({
      indexes: GameHelpers.getIndexesFromMatrix(indexesMatrix),
    });
   }


	 render(){
	 	return(
	 	<View style={styles.container}>
            <TouchableOpacity style={styles.lang} onPress={this.onSwitchLang.bind(this)}>
              <FontedText >{this.state.langua===0? '中文' : ' ئۇيغۇرچە ' }</FontedText>
            </TouchableOpacity>
          
	 	  <View style={styles.headerArea}>
            <FontedText style={styles.header}> {this.state.langua===0? 'سان رەتلەش ئويۇنى' : '数字块游戏' }</FontedText>
            <FontedText style={styles.header2}>{this.state.langua===0? 'كاتەكچىلەرنى يۆتكەپ، سانلار بويىچە تەرتىپلەڭ!' : '移动方块，按大小排序数字！' }</FontedText>
	 	  </View>

	 	  <View style={styles.mainArea}>
            <GameBoard
            boardSize={BOARD_SIZE}
            indexes={this.state.indexes}
            onMoved={this.onMoved.bind(this)}
            tilesVisible={this.state.tilesVisible}/>
	 	  </View>

      <View style={styles.bottomArea}>
        { this.state.tilesVisible ? (
            <TouchableOpacity onPress={this.onNewGame.bind(this)}>
              <FontedText style={styles.help}>{this.state.langua===0? 'قايتا بىر كىلەي؟' : '重新来？' }</FontedText>
            </TouchableOpacity>
          ) : null }
        
      </View>
       <Modal isOpen={GameHelpers.isWon(this.state.indexes, BOARD_SIZE)}>
          <View style={styles.wonDialog}>
            <FontedText style={styles.header}>{this.state.langua===0? 'كارامەت!!' : '棒棒哒' }</FontedText>
            <FontedText style={styles.header2}>{this.state.langua===0? 'يەنە بىر ئوينامدۇق؟' : '再来一次？' }</FontedText>
            <TouchableOpacity onPress={this.onNewGame.bind(this)}>
              <View style={styles.buttonWrapper}>
                <FontedText style={styles.button}>{this.state.langua===0? 'يەنە بىر كىلەي' : '我要重玩儿' }</FontedText>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
	 	</View>
	 	);
	 }
}

var styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  headerArea: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  mainArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomArea: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 35,
    fontWeight: '200',
    textAlign: 'center',
    marginBottom: 15,
  },
  header2: {
    fontSize: 15,
    fontWeight: '200',
    textAlign: 'center',
  },
  help: {
    opacity: 0.7,
  },
  wonDialog: {
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  buttonWrapper: {
    backgroundColor: '#FF3366',
    height: 55,
    justifyContent: 'center',
    marginTop: 30,
  },
  button: {
    fontSize: 15,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  lang:{
    marginTop:TOPMARGIN,
    marginLeft:10,
    marginRight:10
  },
  
});

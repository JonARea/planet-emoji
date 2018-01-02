import React, {Component} from 'react'
import {StyleSheet, Text, View, Button, TextInput} from 'react-native'
import {StackNavigator} from 'react-navigation'
import {emojis} from '../utils/emojis.js'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emojis: [],
      currentQuestion: 0,
      score: 0
    }

    this.restartGame = this.restartGame.bind(this)
  }

  restartGame() {
   let randomQuestion = this.pickRandomQuestion()
   this.setState({
     emojis: [...emojis],
     currentQuestion: randomQuestion,
     score: 0,
     input: ''
   })
  }

  pickRandomQuestion() {
    return Math.floor(Math.random() * 11)
  }

  componentDidMount() {
    this.restartGame()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.emojis}>
          {this.state.emojis.length && this.state.emojis[this.state.currentQuestion].question}
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(input) => this.setState({input})}
          value={this.state.input}
        />
        <Text style={styles.score}>
          Score: {this.state.score}
        </Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: '#AAA',
 },
 score: {
   color: '#F55',
   fontSize: 25
 },
 input: {
   backgroundColor: '#333',
   color: '#FFF',
   height: '7%',
   width: '60%',
   marginTop: '5%',
   marginBottom: '5%',
   textAlign: 'center',
   fontSize: 20
 },
 emojis: {
   fontSize: 40
 }
})

export default Game

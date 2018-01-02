import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
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
     score: 0
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
        <Text>
          {this.state.emojis.length && this.state.emojis[this.state.currentQuestion].question}
        </Text>
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
   backgroundColor: '#AAA'
 },
 score: {
   color: '#F55'
 }
})

export default Game

import React, {Component} from 'react'
import {StyleSheet, Text, View, Button, TextInput} from 'react-native'
import {StackNavigator} from 'react-navigation'
import {emojis} from '../utils/emojis.js'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emojis: [],
      currentQuestion: this.pickRandomIndex(emojis),
      score: 0,
      isActive: true
    }

    this.restartGame = this.restartGame.bind(this)
    this.checkGuess = this.checkGuess.bind(this)
  }

  restartGame() {
   let randomQuestion = this.pickRandomIndex(this.state.emojis)
   this.setState({
     emojis: [...emojis],
     currentQuestion: randomQuestion,
     score: 0,
     input: '',
     message: '',
     isActive: true
   })
  }

  checkGuess() {
    let userGuess = this.state.input.toLowerCase().replace(/[^a-z]/g, '')
    let answer = this.state.emojis[this.state.currentQuestion].answer.toLowerCase().replace(/[^a-z]/g, '')
    let {message, emojis, currentQuestion, score, isActive} = {...this.state}

    if (userGuess === answer) {
      emojis = this.state.emojis.filter((emoji, index) => index !== this.state.currentQuestion)
      currentQuestion = this.pickRandomIndex(emojis)
      message = 'Correct! Great job!!!'
      score = this.state.score + 10
    } else {
      message = 'Sorry, Try Again!'
    }

    if (!emojis.length) {
      isActive = false
      message = 'YOU WIN!!!!'
    }

    this.setState({
      emojis,
      message,
      currentQuestion,
      score,
      isActive
    })
  }

  pickRandomIndex(array) {
    return Math.floor(Math.random() * array.length)
  }

  componentDidMount() {
    this.restartGame()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.state.message}
        </Text>
        {this.state.isActive && (
          <View>
            <Text style={styles.emojis}>
              {this.state.emojis.length && this.state.emojis[this.state.currentQuestion].question}
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={(input) => this.setState({input})}
              value={this.state.input}
            />
            <Button
              title='Guess'
              style={styles.button}
              onPress={() => {
                this.checkGuess()
                this.setState({input: ''})
              }}
            />
          </View>
        )}
        <Text style={styles.score}>
          Score: {this.state.score}
        </Text>
        <Button
          title='Reset the Game'
          onPress={() => this.restartGame()}
        />
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
 },
 button: {
   color: '#555',
 }
})

export default Game

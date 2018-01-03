import React, {Component} from 'react'
import {StyleSheet, Text, View, Button, TextInput, Image} from 'react-native'
import {StackNavigator} from 'react-navigation'
import {emojis} from '../utils/emojis.js'
import Globe from '../assets/globeVector.png'

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
        <Image
          source={Globe}
          style={styles.globe}
        />
        <View style={styles.container}>
          <View style={styles.gameInfo}>
            <Text style={styles.score}>
              Score: {this.state.score}
            </Text>
            <Text style={{fontSize: 20}}>
              {this.state.message}
            </Text>
          </View>
          {this.state.isActive ? (
            <View style={styles.gamePlay}>
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
                color='#FFF'
                style={styles.button}
                onPress={() => {
                  this.checkGuess()
                  this.setState({input: ''})
                }}
              />
            </View>
          ) : null}
          <View style={styles.gameManager}>
            <Button
              title='Reset the Game'
              color='#FFF'
              onPress={() => this.restartGame()}
            />
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
 globe: {
   position: 'absolute',
   width: '100%'
 },
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: 'rgba(0,0,0,0)',
 },
 gameInfo: {
   flex: 1,
   alignItems: 'center',
   marginTop: 50
 },
 gamePlay: {
   flex: 1.5,
   alignItems: 'center'
 },
 gameManager: {
   marginBottom: 50
 },
 score: {
   color: '#F55',
   fontSize: 25,
   marginBottom: 150
 },
 input: {
   textAlign: 'center',
   fontSize: 20,
   backgroundColor: '#333',
   height: 40,
   width: 250,
   color: '#FFF',
   marginTop: 20,
   marginBottom: 20
 },

 emojis: {
   fontSize: 40
 },
 button: {
   color: '#555',
 }
})

export default Game

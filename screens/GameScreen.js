import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'
import Card from '../components/Card'
import Header from '../components/Header';

export default function GameScreen({ phone, onRestart }) {
    // state variables
    const [gameNumber, setGameNumber] = useState(null);
    const [timer, setTimer] = useState(60);
    const [attempts, setAttempts] = useState(4);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [guess, setGuess] = useState('');

    // Function to generate the number to guess
    const generateNumber = () => {
        const lastDigit = parseInt(phone.slice(-1), 10);
        const multiples = [];

        for (let i = 1; i <= 100; i++) {
            if (i % lastDigit === 0) {
                multiples.push(i);
            }
        }
        return multiples[Math.floor(Math.random() * multiples.length)];
    };

    // Function to handle the start of the game
    const handleStartGame = () => {
        setGameNumber(generateNumber());
        setIsGameStarted(true);
    };

    // Function to handle the user's guess
    const handleGuess = () => {
        if (attempts === 0) {
            Alert.alert('Game Over', 'No more attempts left.');
            return;
        }
        setAttempts(attempts - 1);
        if (parseInt(guess) === gameNumber) {
            Alert.alert('Congratulations', 'You guessed the correct number!');
            setIsGameStarted(false);
        } else {
            Alert.alert('Try Again', `Incorrect guess. You have ${attempts - 1} attempts left.`);
        }
    };
    
    return (
        <View style={styles.container}>
            <Header />
            {/* Restart Button on the top right */}
            <View style={styles.restartButtonContainer}>
                <Text style={styles.restartText} onPress={onRestart}>Restart</Text>
            </View>

            <Card>
                <Text style={styles.cardText}>
                Guess a number between 1 & 100 that is a multiple of 9
                </Text>
                
                {/* Start Button */}
                <Button title="Start Game" onPress={handleStartGame} />
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    restartButtonContainer: {
        position: 'absolute',
        top: 20,
        right: 20, // position the button on the top right
    },
    restartText: {
        color: 'blue',
        fontSize: 18,
        fontWeight: 'bold',
      },
    modalText: {
        fontSize: 16,
        color: 'purple',
        marginBottom: 10,
        textAlign: 'center',
    },
})
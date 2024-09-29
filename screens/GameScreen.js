import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React from 'react'
import { useState, useEffect, hint } from 'react'
import Card from '../components/Card'
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient';

export default function GameScreen({ phone, onRestart }) {
    // state variables
    const [gameNumber, setGameNumber] = useState(null);
    const [timer, setTimer] = useState(60);
    const [attempts, setAttempts] = useState(4);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [guess, setGuess] = useState('');
    const [hint, setHint] = useState(null);
    const [hintRange, setHintRange] = useState({ low: 0, high: 100 }); // Initial range
    const [hintsUsed, setHintsUsed] = useState(0); // Number of hints used

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
        setTimer(60);
    };

    // Function to handle the user's guess
    const handleGuess = () => {
        const numericGuess = parseInt(guess, 10);

        if (isNaN(numericGuess) || numericGuess < 1 || numericGuess > 100) {
            Alert.alert('Invalid input', 'Please enter a number between 1 and 100.');
            return;
        }

        if (attempts === 0) {
            Alert.alert('Game Over', 'No more attempts left.');
            return;
        }

        setAttempts(attempts - 1);

        if (numericGuess === gameNumber) {
            Alert.alert('Congratulations', 'You guessed the correct number!');
            setIsGameStarted(false);  // End the game
        } else {
            Alert.alert('Try Again', `Incorrect guess. You have ${attempts - 1} attempts left.`);
        }
    };

    // Function to provide a range hint, which halves with each hint request
    const handleHint = () => {
        const { low, high } = hintRange;

        // For the first hint, split the range into [0, 50] and [50, 100]
        if (hintsUsed === 0) {
            if (gameNumber > 50) {
                setHint('The number is between 50 and 100.');
                setHintRange({ low: 50, high: 100 });
            } else {
                setHint('The number is between 0 and 50.');
                setHintRange({ low: 0, high: 50 });
            }
        } else {
            // For subsequent hints, halve the range
            const mid = Math.floor((low + high) / 2);
            if (gameNumber > mid) {
                setHint(`The number is between ${mid} and ${high}.`);
                setHintRange({ low: mid, high });
            } else {
                setHint(`The number is between ${low} and ${mid}.`);
                setHintRange({ low, high: mid });
            }
        }
        setHintsUsed(hintsUsed + 1); // Increase the number of hints used
    };
    

               

    // Timer logic
    useEffect(() => {
        if (isGameStarted && timer > 0) {
            const intervalId = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        } else if (timer === 0) {
            Alert.alert('Time Up', 'You ran out of time!');
            setIsGameStarted(false);
        }
    }, [timer, isGameStarted]);
    
    return (
        
        <LinearGradient colors={['#00A8E8', '#B0E0E6']}  style={styles.container}>
            {/* Restart Button */}
            <View style={styles.restartButtonContainer}>
                <Text style={styles.restartText} onPress={onRestart}>Restart</Text>
            </View>

            {/* Game Card */}
            <View style={styles.customCard}>
                <Text style={styles.cardText}>Guess a number between 1 & 100 that is a multiple of {phone.slice(-1)}</Text>

                {isGameStarted ? (
                    <View style={styles.cardGame}>
                        {/* Timer and Attempts */}
                        <Text style={styles.infoText}>Attempts left: {attempts}</Text>
                        <Text style={styles.infoText}>Time: {timer}s</Text>

                        {/* Text Input for Guess */}
                        <TextInput
                            style={styles.input}
                            value={guess}
                            onChangeText={setGuess}
                            placeholder="Enter your guess"
                            keyboardType="numeric"
                        />

                        {/* Use a Hint and Submit Guess Buttons */}
                        <View style={styles.buttonRow}>
                            <Button title="Use a Hint" onPress={handleHint} />
                            <Button title="Submit Guess" onPress={handleGuess} />
                        </View>

                        {/* Display Hint if available */}
                        {hint && <Text style={styles.hintText}>{hint}</Text>}
                    </View>
                ) : (
                    <Button title="Start" onPress={handleStartGame} />
                )}
            </View>
        </LinearGradient>
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
        top: 100,
        right: 40, // position the button on the top right
    },
    restartText: {
        color: 'blue',
        fontSize: 18,
        
    },

    customCard: {
        width: '80%',
        height: 300,
        padding: 20,
        backgroundColor: 'grey',  // Semi-transparent white
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',

    },
    cardGame: {
        width: '100%',
        alignItems: 'center',
    },
    cardText: {
        fontSize: 16,
        color: 'purple',
        textAlign: 'center',
        marginBottom: 20,
    },
    startText: {
        fontSize: 18,
        color: 'blue',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    modalText: {
        fontSize: 16,
        color: 'purple',
        marginBottom: 10,
        textAlign: 'center',
    },

    infoText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    hintText: {
        fontSize: 14,
        color: 'green',
        textAlign: 'center',
        marginTop: 10,
    },
    input: {
        height: 40,
        borderColor: 'purple',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: '100%',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
})
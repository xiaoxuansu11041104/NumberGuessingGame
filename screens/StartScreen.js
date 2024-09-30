import { StyleSheet, Text, View, TextInput, Button, Alert, Modal } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import Checkbox from 'expo-checkbox'; 
import { LinearGradient } from 'expo-linear-gradient';
import GameScreen from './GameScreen';


export default function StartScreen() {
    // Create state variables for name and nameError
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')

    // Create state variables for email and emailError
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    // Create state variables for phone and phoneError
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');

    // Create state variables for the checkbox
    const [isSelected, setSelection] = useState(false);

    // Create state variables for the modal
    const [showModal, setShowModal] = useState(false); 

    // Create a state variable to continue to the game screen
    const [continueToGame, setContinueToGame] = useState(false);

    // Create a function to handle the name input
    const handleNameChange = (text) => {
        // Set the name state variable to the text input
        setName(text);
        // Check if the name is empty or a number
        if (text.length < 2 || !isNaN(text)) {
            setNameError('Please enter a valid name');
        } else {
            // Clear the error message
            setNameError('');

        }
    };

    // Create a function to handle the email input
    const handleEmailChange = (text) => {
        setEmail(text);
        // Simple email regex for validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(text)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    // Function to handle and validate the phone number input
    const handlePhoneChange = (text) => {
        setPhone(text);
        const phoneRegex = /^[0-9]{10}$/;  // Validate that the input has exactly 10 digits
        const lastDigit = text.charAt(text.length - 1);  // Get the last digit of the phone number

        if (!phoneRegex.test(text)) {
            setPhoneError('Phone number must be exactly 10 digits');
        } else if (lastDigit === '0' || lastDigit === '1') {
            setPhoneError('The last digit of the phone number cannot be 0 or 1');
        } else {
            setPhoneError('');
        }
    };

    // Function to handle the reset button
    const handleReset = () => {
        setName('');
        setEmail('');
        setPhone('');
        setSelection(false);
        setNameError('');
        setEmailError('');
        setPhoneError('');
    };

    // Function to validate inputs and navigate to the Confirm screen or show an alert
    const handleRegister = () => {
        // Validate inputs
        if (nameError || emailError || phoneError || !name || !email || !phone || !isSelected) {
            Alert.alert('Invalid Input', 'Please fill out all fields correctly and check the checkbox.');
        } else {
            setShowModal(true);

        }
    };

    // Reset state on restart
    const handleRestart = () => {
        setContinueToGame(false); // Navigate back to StartScreen
        setName(''); // Clear name
        setEmail(''); // Clear email
        setPhone(''); // Clear phone number
        setSelection(false); // Uncheck the checkbox
        
    };


    // Conditionally render the GameScreen when `continueToGame` is true
    if (continueToGame) {
        return <GameScreen phone={phone} onRestart={handleRestart} />;
    }

    // Return the start screen
    return (
        <View style={styles.container}>
            {/* display the header here */}
            <Header /> 
            {/* display the card here */}
            <Card>
                {/* Name Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleNameChange}
                        value={name}
                        placeholder="Enter your name"
                    />
                    {/* display the name error message here */}
                    {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
                </View>
                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleEmailChange}
                        value={email}
                        placeholder="Enter your email"
                    />
                    {/* display the email error message here */}
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                </View>
                {/* Phone Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handlePhoneChange}
                        value={phone}
                        placeholder="Enter your phone number"
                        keyboardType="numeric"
                    />
                    {/* display the phone error message here */}
                    {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
                    {/* Checkbox and label */}
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            value={isSelected}
                            onValueChange={setSelection}
                            color={isSelected ? 'blue' : undefined}
                        />
                        <Text style={styles.checkboxLabel}>I am not a robot</Text>
                    </View>
                    {/* View to align Reset and Register buttons in a row */}
                    <View style={styles.buttonRow}>
                        {/* Reset Button */}
                        <Button
                            title="Reset"
                            onPress={handleReset}
                            color="red" // Red button for reset action
                            style={styles.resetButton}
                        />

                        {/* Register Button */}
                        <Button
                            title="Register"
                            onPress={handleRegister}
                            color={isSelected ? 'blue' : 'gray'}
                            disabled={!isSelected} // Disable the button if the checkbox is not checked
                            style={styles.resetButton}
                        />
                    </View>

                </View>
            </Card>
            {/* Modal for Confirm screen */}
            <Modal visible={showModal} transparent={true} animationType="fade">
                <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.2)']} style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Hello {name}</Text>
                        <Text style={styles.modalText}>Here is the information you entered:</Text>
                        <Text style={styles.modalText}>Email: {email}</Text>
                        <Text style={styles.modalText}>Phone: {phone}</Text>
                        <Text style={styles.modalText}>If this is incorrect, please go back and edit.</Text>
                        
                        {/* Go Back and Continue Buttons */}
                        <View style={styles.modalButtonContainer}>
                            <Button title="Go Back" onPress={() => setShowModal(false)} color="red" />
                            <Button title="Continue" onPress={() => {
                                setShowModal(false);
                                setContinueToGame(true);
                            }} color="blue" />
                        </View>
                    </View>
                </LinearGradient>
            </Modal>          
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // take up the whole screen
        backgroundColor: '#ADD8E6', // light blue background   
        alignItems: 'center', // center items horizontally
        justifyContent: 'flex-start', // align items to the top
        paddingTop: 50, // add padding to the top
    },
    text: {
        fontSize: 20,
    },
    label: {
        fontSize: 16,
        color: 'purple',
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'left', // align text to the left
    },
    
    inputContainer: {
        width: '90%',
        alignItems: 'flex-start', // align items to the left
    },
    input: {
        height: 40,
        borderBottomColor: 'purple',
        borderBottomWidth: 2,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'purple',
        width: '100%',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxLabel: {
        marginLeft: 8,
        color: 'purple',
    },
    resetButton: {
        marginTop: 20,
    },
    registerButton: {
        marginTop: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 20,
        borderRadius: 10,
        alignItems: 'left',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'left',
        color: 'purple',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '80%',
    },
});

import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import Card from '../components/Card'

export default function StartScreen() {
    // Create state variables for name and nameError
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')

    // Create state variables for email and emailError
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    // 

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
        // Set the email state variable to the text input
        setEmail(text);
        // Check if the email is valid
        if (!text.includes('@') || !text.includes('.')) {
            setEmailError('Please enter a valid email');
        } else {
            // Clear the error message
            setEmailError('');
        }
    }
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
            </Card>
            
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
});

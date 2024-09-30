import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';





export default function App() {
  return (
    
    <View style={styles.container}>
      <StartScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

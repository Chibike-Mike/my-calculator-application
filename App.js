import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

// Reusable Button Component (No Changes)
const Button = ({ onPress, text, size, theme }) => {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  if (size === 'double') {
    buttonStyles.push(styles.buttonDouble);
  }

  if (theme === 'secondary') {
    buttonStyles.push(styles.buttonSecondary);
    textStyles.push(styles.textSecondary);
  } else if (theme === 'accent') {
    buttonStyles.push(styles.buttonAccent);
  }

  return (
    <TouchableOpacity onPress={() => onPress(text)} style={buttonStyles}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};


export default function App() {
  const [currentValue, setCurrentValue] = useState("0");
  const [history, setHistory] = useState([]);
  const confettiRef = useRef(null);

  const handleTap = (value) => {
    if (value === "AC") {
      setCurrentValue("0");
      setHistory([]);
      return;
    }
    
    if (value === "C") {
      setCurrentValue(currentValue.slice(0, -1) || "0");
      return;
    }

    if (value === "=") {
      try {
        const expression = currentValue.replace(/×/g, "*").replace(/÷/g, "/");
        // Use eval carefully, for a simple calculator it's okay.
        const result = eval(expression);
        const newEntry = `${currentValue} = ${result}`;

        setHistory([newEntry, ...history.slice(0, 4)]); // Keep last 5 history items
        setCurrentValue(String(result));
        if (confettiRef.current) {
          confettiRef.current.start();
        }
      } catch (e) {
        setCurrentValue("Error");
      }
      return;
    }

    if (currentValue === "0" || currentValue === "Error") {
      setCurrentValue(value);
    } else {
      setCurrentValue(currentValue + value);
    }
  };

  return (
    <View style={styles.container}>
        
      {/* Your Name Displayed Here */}
      <Text style={styles.appName}>Michael's Calc</Text>

      {/* History View */}
      <ScrollView style={styles.historyContainer}>
        {history.map((item, index) => (
          <Text key={index} style={styles.historyText}>{item}</Text>
        ))}
      </ScrollView>
      
      {/* Display Area */}
      <View style={styles.resultContainer}>
        <Text style={styles.resultValue}>{currentValue}</Text>
      </View>

      {/* Button Container */}
      <View style={styles.buttonContainer}>
        {/* All buttons now call handleTap */}
        <View style={styles.row}>
          <Button text="AC" theme="secondary" onPress={handleTap} />
          <Button text="C" theme="secondary" onPress={handleTap} />
          <Button text="%" theme="secondary" onPress={handleTap} />
          <Button text="÷" theme="accent" onPress={handleTap} />
        </View>
        <View style={styles.row}>
          <Button text="7" onPress={handleTap} />
          <Button text="8" onPress={handleTap} />
          <Button text="9" onPress={handleTap} />
          <Button text="×" theme="accent" onPress={handleTap} />
        </View>
        <View style={styles.row}>
          <Button text="4" onPress={handleTap} />
          <Button text="5" onPress={handleTap} />
          <Button text="6" onPress={handleTap} />
          <Button text="-" theme="accent" onPress={handleTap} />
        </View>
        <View style={styles.row}>
          <Button text="1" onPress={handleTap} />
          <Button text="2" onPress={handleTap} />
          <Button text="3" onPress={handleTap} />
          <Button text="+" theme="accent" onPress={handleTap} />
        </View>
        <View style={styles.row}>
          <Button text="0" size="double" onPress={handleTap} />
          <Button text="." onPress={handleTap} />
          <Button text="=" theme="accent" onPress={handleTap} />
        </View>
      </View>
      
      {/* Confetti Cannon */}
      <ConfettiCannon
        count={200}
        origin={{ x: -10, y: 0 }}
        autoStart={false}
        ref={confettiRef}
        fadeOut={true}
      />
    </View>
  );
}

// Styles with additions for App Name and History
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    justifyContent: 'flex-end',
  },
  appName: {
    color: '#555',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 40,
  },
  historyContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  historyText: {
    color: '#888',
    fontSize: 24,
    textAlign: 'right',
    marginBottom: 10,
  },
  resultContainer: {
    paddingBottom: 30,
    paddingRight: 30,
    alignItems: 'flex-end',
  },
  resultValue: {
    color: '#fff',
    fontSize: 80,
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#333333',
    flex: 1,
    height: 80,
    margin: 5,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 32,
  },
  buttonDouble: {
    flex: 2.2,
  },
  buttonSecondary: {
    backgroundColor: '#A6A6A6',
  },
  textSecondary: {
    color: '#000',
  },
  buttonAccent: {
    backgroundColor: '#FF9500',
  },
});
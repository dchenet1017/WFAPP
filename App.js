import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import Map from './Map';
import Profile from './Profile';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registration from './Registration'; 


export default function App() {
  const[email, setEmail] = useState('Dimitri')
  const [password, setPassword] = useState('30')
  return (
    
    <View style={styles.container}>
      <Text> Enter Email:</Text>
      <TextInput 
        style= {styles.input}
        placeholder= 'e.g. John Doe'
        onChangeText={(val) => setEmail(val)}/>

      <Text> Enter Password:</Text>
      <TextInput 
        style= {styles.input}
        placeholder= 'e.g. ****'
        onChangeText={(val) => setPassword(val)}/>

      <Text>email: {email}, password: {password}</Text>
      <Text>Open up App.js to red start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );

}

<NavigationContainer>
<Stack.Navigator>
<Stack.Screen
name="Home"
componet={Homescreen}
options={{title: 'Welcome'}}
/>
<Stack.Screen name="Registration" component={Registration}/>
<Stack.Screen name="Map" component={Map}/>
<Stack.Screen name="Profile" component={Profile}/>
</Stack.Navigator>
  </NavigationContainer> 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    borderWidth: 1,
    borderColor: '#777',
    padding:8,
    margin:10,
    width:200,
  }
  
});

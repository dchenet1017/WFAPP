<NavigationContainer>
<Stack.Navigator>
<Stack.Screen
name="Home"
componet={Homescreen}
options={{title: 'Welcome'}}
/>
<Stack.Screen name="Registration" component={Registration}/>
<Stack.Screen name="ViroCamera" component={Viro}/>
<Stack.Screen name="Ecom" component={Ecom}/>
<Stack.Screen name="Profile" component={ProfileScreen}/>
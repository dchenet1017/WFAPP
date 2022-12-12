
export default function Registration() {
    return (
        <View style={styles.container}>
      <TextInput 
        style= {styles.input}
        placeholder= 'UserName '
        onChangeText={(val) => setEmail(val)}/>

      <TextInput 
        style= {styles.input}
        placeholder= 'Password'
        onChangeText={(val) => setPassword(val)}/>

      <TextInput 
        style= {styles.input}
        placeholder= 'Email' />
       

      <TextInput 
        style= {styles.input}
        placeholder= 'First Name ' />
        

      <TextInput 
        style= {styles.input}
        placeholder= 'Last Name ' />
        

      <TextInput 
        style= {styles.input}
        placeholder= 'Phone' />
        

      <TextInput 
        style= {styles.input}
        placeholder= 'Address'
        />
      <StatusBar style="auto" />
    </View>
    )
}

import { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native-web';
import {db} from './firebase-config';
import {addDoc, collection, getDocs} from "firebase/firestore"
import { async } from '@firebase/util';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {
  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newUrl, setNewUrl] = useState("")
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");


  const createUser = async () =>{
      await addDoc(usersCollectionRef, {name: newName, email: newEmail, url: newUrl});
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);


  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: "Welcome"}}
        />
        <div className='App'> 
            <input placeholder='Name...'  onChange={(event) => {setNewName(event.target.value);}}/>
            <input placeholder='Email' onChange={(event) => {setNewEmail(event.target.value);}}/>
            <input placeholder='URL' onChange={(event) => {setNewUrl(event.target.value);}}/>
            <button onClick={createUser}>Create User</button>
              {users.map((user) => {
                return (
                  <div>
                    <h1>Name: {user.name}</h1>          
                    <h1>E-Mail: {user.email}</h1>
                    <Image
                        style={{width: 50, height: 50}}
                        source={{uri : user.url}}
                    />
                  </div>
                  );
              })}  
            </div>
            </Stack.Navigator>
    </NavigationContainer>

  );
}


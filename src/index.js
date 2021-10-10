import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddItem from './screens/AddItem';
import Home from './screens/Home';
import ItemDetails from './screens/ItemDetails';


const Stack = createNativeStackNavigator();


export default function App() {

    return (

        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home}
                    options={{
                        headerLeft: () => {
                            return null;
                        },
                        headerTitle: 'Simpsons'
                    }} />
                <Stack.Screen name="ItemDetails" component={ItemDetails}
                    options={{
                        headerTitle: 'Details'
                    }}
                />
                <Stack.Screen name="AddItem" component={AddItem}
                    options={{
                        headerTitle: 'Add New Character'
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}


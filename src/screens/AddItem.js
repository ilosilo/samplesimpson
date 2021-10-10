import * as React from 'react';
import { useState } from 'react';
import { StackActions } from '@react-navigation/native';
import { listItem, textColor, addButton, buttonTextColor } from '../config/color'
import { saveItem, getAllKeys } from '../config/Storage';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';

const AddItem = ({route,  navigation }) => {
    const [name, setName] = useState('');
    const [job, setJob] = useState('');
    const [about, setAbout] = useState('');
    const [avatar, setAvatar] = useState('');

    const item = {
        id: '',
        name: '',
        avatar: '',
        job: '',
        about: ''
    }
    
    const saveItemTostorage = () => {
        item.name = name;
        item.avatar = avatar;
        item.job = job;
        item.about = about;

        getAllKeys().then((allKeys) => {

            var max = -1;
            allKeys.forEach(key => {
                if (parseInt(key.valueOf()) > parseInt(max.valueOf())) {
                    max = key.valueOf();
                }
            });
            max = parseInt(max)+parseInt(1);
            
            item.id =(max).toString();
            saveItem(item).then(() => {
                navigation.dispatch(StackActions.popToTop())
                let newItems = route.params.items;
                newItems.push(item),
                route.params.setRendItems(newItems),
                route.params.onRefresh()
            })
        })
    }




    return (
        <View>
            <ScrollView>
            <Text style={st.inputText}>Name Surname</Text>
            <TextInput style={st.input}
                onChangeText={text => setName(text)}></TextInput>

            <Text style={st.inputText}>Job Title</Text>
            <TextInput style={st.input}
                onChangeText={text => setJob(text)}></TextInput>

            <Text style={st.inputText}>About Him/Her</Text>
            <TextInput style={st.input}
                multiline
                numberOfLines={4}
                onChangeText={text => setAbout(text)}></TextInput>

            <Text style={st.inputText}>Image Link</Text>
            <TextInput style={st.input}
                onChangeText={text => setAvatar(text)}></TextInput>
                </ScrollView>

            <TouchableOpacity style={st.submitButton}
                onPress={() => saveItemTostorage()}>
                <Text style={st.buttonText}>Add Character</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddItem;

const st = StyleSheet.create({
    input: {
        width: '90%',
        margin: 10,
        borderBottomColor: addButton,
        borderBottomWidth: 2,
        borderColor: listItem,
        borderWidth: 1,
    },
    inputText: {
        marginLeft: 12,
        marginTop: 15,
        color: textColor
    },
    submitButton: {
        backgroundColor: addButton,
        width: 220,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 30,
    },
    buttonText: {
        color: buttonTextColor,
        fontWeight: 'normal',
        fontSize: 20
    },
    addButtonTextStyle: {
        fontSize: 30,
        color: 'white',
    },
    textStyle: {
        color: textColor,
        marginLeft: 15,
        fontWeight: 'bold'
    }
});

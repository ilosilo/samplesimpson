import * as React from 'react';
import { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    TextInput
} from 'react-native';
import { saveItem, deleteItem } from '../../config/Storage';

const TitleContainer = (props) => {
    const { item } = props;
    const [title, setTitle] = useState(props.item.job);
    const [changeTitle, setChangeTitle] = useState(false)

    const newItem = {
        id: '',
        name: '',
        avatar: '',
        job: '',
        about: ''
    }
    const setNewTitle = () => {
        newItem.id = item.id;
        newItem.name = item.name;
        newItem.avatar = item.avatar;
        newItem.job = title;
        newItem.about = item.about;
        deleteItem(item).then(() => (saveItem(newItem)));
        item.job = title;
        setChangeTitle(false);
    }
    return (

        <View style={st.titleContainerStyle}>
            <TouchableOpacity
                onPress={() => setChangeTitle(true)}
            >
                {item.name ? <Text style={st.titleNameStyle}>{item.name}</Text> : <Text style={st.titleNameStyle}>Name Unknown</Text>}
                {item.job ? <Text style={st.titleJobStyle}>{item.job}</Text> : <Text style={st.titleJobStyle}>Job Unknown</Text>}
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={changeTitle}
                onRequestClose={() => {
                    setChangeTitle(!changeTitle);
                }}
            >
                <View style={st.modalStyle}>
                    <Text> Job: </Text>
                    <TextInput style={st.input}

                        value={title}
                        onChangeText={text => setTitle(text)}></TextInput>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => { setNewTitle() }}
                            style={st.boxStyle}>
                            <Text> Change Job </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setChangeTitle(false)}
                            style={st.boxStyle}>
                            <Text> Cancel </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        </View>
    );
};
export default TitleContainer;

const st = StyleSheet.create({
    titleContainerStyle: {
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    modalStyle: {
        backgroundColor: 'white',
        width: '90%',
        height: 150,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 50,
        borderRadius: 30,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: 'gray',
        padding: 30
    },
    boxStyle: {
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: 'gray',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 30,
        padding: 10,
        width: '50%'
    },
    titleNameStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        flexWrap: 'wrap',
        alignSelf: 'center'
    },
    titleJobStyle: {
        fontSize: 15,
        flexWrap: 'wrap',
        alignSelf: 'center'
    },
});

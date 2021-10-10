import * as React from 'react';
import { useState } from 'react';
import { textColor, addButton, listItem } from '../../config/color';

import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    View,
} from 'react-native';
import { saveItem, deleteItem } from '../../config/Storage';

const ParagraphContainer = (props) => {

    const [paragraph, setParagraph] = useState(props.item.about);
    const [changeParagraph, setChangeParagraph] = useState(false)
    const { item } = props;
    const newItem = {
        id: '',
        name: '',
        avatar: '',
        job: '',
        about: ''
    }

    const setNewParagraph = () => {
        newItem.id = item.id;
        newItem.name = item.name;
        newItem.avatar = item.avatar;
        newItem.job = item.job;
        newItem.about = paragraph;
        deleteItem(item).then(() => (saveItem(newItem)));
        item.about = paragraph;
        setChangeParagraph(false);
    }

    return (
        <ScrollView style={st.paragraphContainerStyle}>
            <TouchableOpacity onPress={() => setChangeParagraph(true)}>
                {
                    item.about ?
                        <Text style={st.paragraphTextStyle}>{item.about}</Text>
                        :
                        <Text style={st.paragraphTextStyle}>There is no more information</Text>
                }
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={changeParagraph}
                onRequestClose={() => {
                    setChangeParagraph(!changeParagraph);
                }}
            >
                <View style={st.modalStyle}>
                    <Text> About: </Text>
                    <TextInput style={st.input}
                        multiline
                        numberOfLines={10}
                        value={paragraph}
                        onChangeText={text => setParagraph(text)}></TextInput>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => { setNewParagraph() }}
                            style={st.boxStyle}>
                            <Text> Change About </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setChangeParagraph(false)}
                            style={st.boxStyle}>
                            <Text> Cancel </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        </ScrollView>
    );
};

export default ParagraphContainer;

const st = StyleSheet.create({
    input: {
        width: '100%',
        borderBottomColor: addButton,
        borderBottomWidth: 2,
        borderColor: listItem,
        borderWidth: 1,
        color: 'black'
    },
    modalStyle: {
        backgroundColor: 'white',
        width: '90%',
        height: 350,
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
    input: {
        borderWidth: 1,
        borderColor: 'lightgray',
        width: '90%'
    },
    paragraphContainerStyle: {
        alignSelf: 'center',
        alignContent: 'center',
        padding: 10
    },
    paragraphTextStyle: {
        fontSize: 15,
        flexWrap: 'wrap',
        alignSelf: 'center',
        color: textColor
    },
});

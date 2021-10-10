import * as React from 'react';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import IconRemoveAll from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    Modal,
} from 'react-native';
import DeleteItem from '../components/DeleteItem';
import { loadItem, saveItem, getAllKeys, deleteItem, clearAll} from '../config/Storage';
import { listItem, addButton, colorGray, buttonTextColor, textColor } from '../config/color';

const Home = ({ navigation }) => {

    const items = [];
    const [refreshing, setRefreshing] = useState(false);
    const [rendItems, setRendItems] = useState();
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteNow, setDeleteNow] = useState(new Object);
    const [modalClearAllVisible, setModalClearAllVisible] = useState(false);

    const refresh = () => {
        setRefreshing(true);
        getAllKeys().then((allKeys) => {
            fetch('https://5fc9346b2af77700165ae514.mockapi.io/simpsons')
                .then(response => response.json())
                .then(json => {
                    json.map(item => {
                        if (allKeys.length >= 1) {
                            if (!allKeys.includes(item.id)) {
                                saveItem(item)
                            }
                        } else {
                            saveItem(item)
                        }
                    })
                    setRefreshing(false);
                    getItemsFromStorage();
                })
                .catch(error => console.error(error));
        })
    };

    const goDetails = (item) => {
        /**
         * goes to details screen with item param that pressed
         */
        navigation.navigate('ItemDetails', { item: item });
    }
    const goAddItem = () => {
        /**
         * goes to add item screen with items and refresh func
         */
        navigation.push('AddItem', { onRefresh: refresh, items: rendItems, setRendItems: setRendItems });
    }

    const onRefresh = React.useCallback(() => {
        refresh();
    }, []);

    const removeItem = () => {
        /**
         * remove item that assigned to deleteNow state,
         * update render list, refresh screen and turn modal invisible
         */
        deleteItem(deleteNow).then(() => {
            let newitems = rendItems;
            let index = newitems.indexOf(deleteNow);
            newitems.splice(index, 1);
            setRendItems(newitems)
            refresh();
        })
        setDeleteModal(false);
    }

    const renderItem = (a) => {
        return (
            <View style={st.listItemContainerStyle}>
                <View style={{ flex: 7, flexDirection: 'row' }}>
                    <Image
                        source={{ uri: a.avatar }}
                        style={{ width: 25, height: 25 }} />
                </View>
                <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => goDetails(a)}
                    >
                        <Text> {a.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setDeleteModal(true); setDeleteNow(a) }}>
                        <DeleteItem />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    const getItemsFromStorage = () => {
        /**
         * fst get all keys from storage,
         * then with every key in array
         * get all abjects, and push them into items array.
         * finally, for re render set set-render-items state.
         */

        getAllKeys().then((allIDs) => {
            allIDs.map((id, index) => (
                loadItem(id).then((item) => {
                    var a = {
                        id: '',
                        name: '',
                        avatar: '',
                        job: '',
                        about: ''
                    }
                    a.id = item.id
                    a.name = item.name
                    a.avatar = item.avatar
                    a.job = item.job
                    a.about = item.about
                    let flag = false;
                    items.forEach(item => {
                        if (item.id == a.id) {
                            flag = true;
                        }
                    });
                    if (!flag) {
                        items.push(a);
                    }
                    if (allIDs.length - 1 == index) {
                        setRendItems(items);
                    }
                })
            ));
        })

    }

    useEffect(() => {
        refresh();
    }, []);

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <View style={st.addButtonStyle}>
                <TouchableOpacity onPress={() => goAddItem()}>
                    <Icon name="add-sharp" size={30} color={buttonTextColor} />
                </TouchableOpacity>
            </View>
            <View style={{ height: '90%' }}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    style={{ width: '100%', marginTop: 12 }}>
                    {rendItems && rendItems.map((item) => renderItem(item))}
                </ScrollView>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteModal}
                onRequestClose={() => {
                    setDeleteModal(!deleteModal);
                }}
            >
                <View style={st.deleteModalStyle}>
                    <Text> {deleteNow.name} Sure? </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => { removeItem(); }}
                            style={st.boxStyle}>
                            <Text> Yes </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setDeleteModal(false)}
                            style={st.boxStyle}>
                            <Text> No </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalClearAllVisible}
                onRequestClose={() => {
                    setModalClearAllVisible(!modalClearAllVisible);
                }}
            >
                <View style={st.deleteModalStyle}>
                    <Text> Clear All Items? </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => { clearAll(); refresh(); setModalClearAllVisible(false) }}
                            style={st.boxStyle}>
                            <Text> Yes </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalClearAllVisible(false)}
                            style={st.boxStyle}>
                            <Text> No </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
            {navigation.setOptions({
                headerRight: () => (
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => setModalClearAllVisible(true)}
                            style={{
                                borderRadius: 12,
                                alignItems: 'center',
                                alignContent: 'center',
                                justifyContent: 'center',
                                marginHorizontal: 5,
                            }}>
                            <IconRemoveAll name="delete-sweep" size={30} color={textColor} />
                        </TouchableOpacity>
                    </View>
                ),
            })}
        </View>
    );
};
export default Home;

const st = StyleSheet.create({
    listItemContainerStyle: {
        backgroundColor: listItem,
        marginVertical: 8,
        paddingVertical: 12,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'stretch',
        width: '100%',
        marginTop: 12,
    },
    addButtonStyle: {
        backgroundColor: addButton,
        position: 'absolute',
        bottom: 15,
        alignSelf: 'center',
        width: 80,
        height: 40,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteModalStyle: {
        backgroundColor: buttonTextColor,
        width: 250,
        height: 150,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 300,
        borderRadius: 30,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: colorGray,
        padding: 30
    },
    boxStyle: {
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: colorGray,
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 30,
        padding: 10,
        width: '50%'
    }
});

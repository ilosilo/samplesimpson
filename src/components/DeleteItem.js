import * as React from 'react';

import { deleteItem } from '../config/Storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    View,
} from 'react-native';

const DeleteItem = (props) => {

    

    return (
        <View>
            <Icon name='delete' size={30} color='white' />
        </View>
    );
};

export default DeleteItem;

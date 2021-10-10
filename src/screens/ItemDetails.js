import * as React from 'react';
import {View} from 'react-native';

import ImageContainer from '../components/details/ImageContainer';
import TitleContainer from '../components/details/TitleContainer';
import ParagraphContainer from '../components/details/ParagraphContainer';

const ItemDetails = ({ route, navigation }) => {
    const { item } = route.params;
    return (
        <View style={{ width: '100%', height: '100%' }}>
        <ImageContainer item= {item}/>
        <TitleContainer item= {item}/>
        <ParagraphContainer item = {item} />
    </View>
    );
};
export default ItemDetails;

import * as React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text
} from 'react-native';

const ImageContainer = (props) => {
    return (
        <View style={st.imageContainerStyle} >
            {props.item.avatar? 
            <Image
                style={{ width: 200, height: 200 }}
                source={{ uri: props.item.avatar }}
            /> : 
            <Text style={st.noImageText}> Image Not Found </Text>}
        </View>
    );
};
export default ImageContainer;

const st = StyleSheet.create({
    imageContainerStyle: {
        width: '100%',
        height: 220,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    noImageText:{
        color:'gray',
        fontStyle:'italic',
        fontSize:14,
        alignSelf:'center'
    }

});

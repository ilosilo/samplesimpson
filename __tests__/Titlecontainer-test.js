
 import 'react-native';
 import React from 'react';
 import TitleContainer from '../src/components/details/TitleContainer';
 import renderer from 'react-test-renderer';
 
 test('renders correctly', () => {
    const item = {"id":"3","name":"Bart Simpson","avatar":"https://static.wikia.nocookie.net/simpsons/images/6/65/Bart_Simpson.png/revision/latest/scale-to-width-down/250?cb=20190409004756","job":"Student","about":"Bartholomew JoJo \"Bart\" Simpson "}
    
    const tree = renderer.create(<TitleContainer item={item}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
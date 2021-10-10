
 import 'react-native';
 import React from 'react';
 import AddItem from '../src/screens/AddItem';
 
 import renderer from 'react-test-renderer';
 
 test('renders correctly', () => {
    const tree = renderer.create(<AddItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });
 
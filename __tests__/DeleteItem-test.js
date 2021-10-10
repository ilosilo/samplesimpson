
 import 'react-native';
 import React from 'react';
 import DeleteItem from '../src/components/DeleteItem';
 import renderer from 'react-test-renderer';
 
 test('renders correctly', () => {
    const tree = renderer.create(<DeleteItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });
import 'react-native';
import React from 'react';
import loadItem from '../src/config/Storage';
import renderer from 'react-test-renderer';

test('no items return -1', () => {
    expect(loadItem(124235)).toBe(-1);
  });
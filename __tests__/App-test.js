/**
 * @format
 */

import 'react-native';
import React from 'react';
import Index from '../src/index';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Index />);
});

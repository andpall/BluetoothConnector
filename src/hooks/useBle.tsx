import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {makeDevice, reset} from '../actions/index';

const useBle = () => {
  const dispatch = useDispatch();
  const values = useSelector(state => state.bluetooth);
  const makeDefaultDevice = () => dispatch(makeDevice());
  const resetState = () => dispatch(reset());
  return {...values, dispatch, makeDefaultDevice, resetState};
};

export default useBle;
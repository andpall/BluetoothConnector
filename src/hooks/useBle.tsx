import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {reset} from '../actions/index';
import { RootState } from '../store';

const useBle = () => {
  const dispatch = useDispatch();
  const values = useSelector((state: RootState) => state.ble);
  const resetState = () => dispatch(reset());
  return {...values, dispatch, resetState};
};

export default useBle;

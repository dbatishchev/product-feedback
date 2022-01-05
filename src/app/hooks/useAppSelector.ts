import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '../store';

// it saves you the need to type (state: RootState) every time
// @see https://redux-toolkit.js.org/tutorials/typescript

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;

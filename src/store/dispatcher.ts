import { bindActionCreators } from 'redux';
import store from './store';
import actionCreators from './actionCreators/actionCreators';

const dispatch = bindActionCreators(actionCreators, store.dispatch);
export default dispatch;

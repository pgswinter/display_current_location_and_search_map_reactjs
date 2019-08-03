import { combineReducers } from 'redux';
import location from './reducers/LocationMap';
import locale from './reducers/Locale';
import searchMap from './reducers/SearchMap';

export default combineReducers({
    locale,
    location,
    searchMap,
});
import * as owen from '../../owenAxios';
import * as firebase from '../../firebaseAxios';
import {formatTitleOfValue} from '../../shared/commonFunction';
import * as action from './actionType';


export const deleteSelectedParameter = (id) => ({
    type: action.DELETE_SELECTED_PARAMETER,
    value: {id}
});

export const toggleSelectedParameter = (param) => ({
    type: action.TOGGLE_SELECTED_PARAMETER,
    value: param
});

export const setNewConfiguration = (value) => ({
    type: action.SET_NEW_CONFIGURATION,
    value: value
});

export const cleanState = () => ({
    type: action.CLEAN_STATE,
});

export const sortSelectedParameters = (from, to) => ({
    type: action.SORT_SELECTED_PARAMETERS,
    value: {from, to}
});

export const sortCategories = (from, to) => ({
    type: action.SORT_CATEGORIES,
    value: {from, to}
});


export const addValuesToParameters = (values) => ({
    type: action.ADD_VALUES_TO_SELECTED_PARAMETERS,
    value: {values}
});

const saveChanged = () => ({
    type: action.SAVE_CHANGED,
});

export const renameCategory = (index,newName)=>({
    type: action.RENAME_CATEGORY,
    value: {index,newName}
})

export const getValues = (parameters) => {
    return dispatch => {
        if (parameters.length) {
            owen.getValuesForParameters(parameters)
                .then(resp => {
                    const valueData = resp.data.map(val => formatTitleOfValue(val.values[0]?.f));
                    dispatch(addValuesToParameters(valueData));
                });
        }
    };
};

export const saveConfiguration = (configuration) => {
    return dispatch => {
        firebase.saveConfiguration(configuration)
            .then(()=>dispatch(saveChanged()))
            .catch(err => console.log(err));
    };
};

export const getConfiguration = () => {
    return dispatch => {
        firebase.getConfiguration()
            .then(resp => {
                if (resp.data) {
                    dispatch(setNewConfiguration(resp.data));
                }
            })
            .catch(err => console.log(err));
    };
};
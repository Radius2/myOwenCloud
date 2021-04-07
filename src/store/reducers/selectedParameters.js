import * as actionTypes from '../actions/actionType';

const initState = {
    isChanged: false,
    category: [],
    parameters: []
};

const setNewConfiguration = (state, value) => {
    return {
        ...state,
        ...value
    };
};

const toggleSelectedParameters = (state, value) => {
    if (state.parameters.some((param) => param.id === value.id)) {
        return deleteSelectedParameters(state, value);
    }
    return addSelectedParameters(state, value);
};

const deleteSelectedParameters = (state, value) => {
    const newParameters = state.parameters.filter(param => param.id !== value.id);
    return cleanEmptyCategory({...state, isChanged: true, parameters: newParameters});
};

const addSelectedParameters = (state, value) => {
    const newState = addCategory(state, value.ofDevice);
    const newParameters = [...state.parameters];
    newParameters.push({
        id: value.id,
        name: value.name,
        categoryId: value.ofDevice.id,
        value: value.value,
        inChart: value.in_graphs
    });
    return {...newState, isChanged: true, parameters: newParameters};
};

const addValuesToSelectedParameters = (state, value) => {
    const newParameters = [...state.parameters];
    newParameters.forEach((param, id, arr) => arr[id].value = value.values[id]);
    return {...state, parameters: newParameters};
};

const sortSelectedParameters = (state, {from, to}) => {
    const newParameters = [...state.parameters];
    const [removed] = newParameters.splice(from.index, 1);
    const newIndex = (to.index > from.index && +from.droppableId !== +to.droppableId) ? to.index - 1 : to.index;
    removed.categoryId = +to.droppableId;
    console.log(to.droppableId);
    newParameters.splice(newIndex, 0, removed);
    return cleanEmptyCategory({...state, isChanged: true, parameters: newParameters});
};

const sortCategories = (state, {from, to}) => {
    const newCategories = [...state.category];
    const [removed] = newCategories.splice(from.index, 1);
    newCategories.splice(to.index, 0, removed);
    return cleanEmptyCategory({...state, isChanged: true, category: newCategories});
};

const addCategory = (state, value) => {
    console.log(value);
    const newCategory = [...state.category];
    if (newCategory.some((category) => category.id === value.id)) {
        return state;
    }
    newCategory.push({id: value.id, name: value.name});
    console.log(newCategory);
    return {...state, isChanged: true, category: newCategory};
};

const cleanEmptyCategory = (state) => {
    const {parameters, category} = state;
    const cleanedCategories = category.filter(category => parameters.some(parameter => parameter.categoryId === category.id))
    return {...state, isChanged: true, category: cleanedCategories}
}

const renameCategory = (state, value) => {
    const {index, newName} = value;
    const newCategories = [...state.category];
    newCategories[index] = {...newCategories[index], name: newName};
    return {...state, isChanged: true, category: newCategories}
}

const cleanState = () => {
    return initState;
};

const saveChanged = (state) => {
    return {...state, isChanged: false};
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.DELETE_SELECTED_PARAMETER :
            return deleteSelectedParameters(state, action.value);
        case actionTypes.TOGGLE_SELECTED_PARAMETER:
            return toggleSelectedParameters(state, action.value);
        case actionTypes.ADD_VALUES_TO_SELECTED_PARAMETERS:
            return addValuesToSelectedParameters(state, action.value);
        case actionTypes.SET_NEW_CONFIGURATION:
            return setNewConfiguration(state, action.value);
        case actionTypes.CLEAN_STATE:
            return cleanState();
        case actionTypes.SORT_SELECTED_PARAMETERS:
            return sortSelectedParameters(state, action.value);
        case  actionTypes.SAVE_CHANGED :
            return saveChanged(state);
        case actionTypes.RENAME_CATEGORY:
            return renameCategory(state, action.value);
        case actionTypes.SORT_CATEGORIES:
            return sortCategories(state, action.value)
        default :
            return state;
    }
}

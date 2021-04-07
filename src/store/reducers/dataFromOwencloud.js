import * as actionTypes from '../actions/actionType';

const initOwenCloud = {
    devices: [
        {
            id: '',
            name: '',
            last_dt: '',
            online: '',
            categories: [
                {
                    id: '',
                    name: '',
                },
            ],
            parameters: [
                {
                    id: '',
                    name: '',
                    value: '',
                    title: '',
                    category_id: '',
                },
            ],
        },
    ],
};

const setDevices = (state = initOwenCloud, devices) => {
    const newDevices = devices.map(device => ({
        id: device.id,
        name: device.name,
        online: device.is_online,
    }));
    return {...state, devices: newDevices};
};

const setDeviceWithDescription = (state, device) => {
    const {id, name, parameters, parameter_categories: categories, last_dt: lastUpdate} = device;
    const newDevices = state.devices.map(oldDevice => {
        if (oldDevice.id === id) {
            return {...oldDevice, id, name, parameters, categories, lastUpdate};
        }
        return oldDevice;
    });
    return {...state, devices: newDevices};
};

const deleteDevices = state => ({...state, devices: []});

const cleanState = () => {
    return initOwenCloud;
};

export default function owenCloudReducer(state = {}, action) {
    switch (action.type) {
        case actionTypes.SET_DEVICES:
            return setDevices(state, action.value);
        case actionTypes.SET_DEVICE_WITH_DESCRIPTION:
            return setDeviceWithDescription(state, action.value);
        case actionTypes.DELETE_DEVICES:
            return deleteDevices();
        case actionTypes.CLEAN_STATE:
            return cleanState();
        default:
            return state;
    }
}

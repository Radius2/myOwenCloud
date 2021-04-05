import * as actionType from "./actionType";
import * as owen from "../../owenAxios";

 const setDevices = devices => {
  return {
    type: actionType.SET_DEVICES,
    value: devices,
  };
};

const setDeviceWithDescription = device => {
  return {
    type: actionType.SET_DEVICE_WITH_DESCRIPTION,
    value: device,
  };
};

const deleteDevices = ()=>{
  return {
    type: actionType.DELETE_DEVICES
  }
}

export const requestDevices = () => {
  return dispatch => {
    dispatch(deleteDevices);
    owen.getDeviceList()
      .then(resp => {
        dispatch(setDevices(resp.data));
        resp.data.forEach(element => dispatch(requestDeviceWithDescriptions(element.id)));
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const requestDeviceWithDescriptions = id => {
  return dispatch => {
    owen.getDeviceDescriptions(id)
      .then(resp => {
        dispatch(setDeviceWithDescription(resp.data));
      })
      .catch(err => console.log(err.message));
  };
};

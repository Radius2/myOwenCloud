import React from 'react';
import {connect} from 'react-redux';
import Device from './Device/Device';
import {useHistory} from 'react-router-dom'

const DeviceList = props => {
    const history=useHistory();
    const {devices} = props;


    const linkGoBack = () => {
        history.goBack();
    };


    return !devices
        ? null
        : devices.map(device => <Device key={device.id} device={device}/>);
};

const mapStateToProps = state => {
    return {
        devices: state.owenCloud.devices,
    };
};
export default connect(mapStateToProps)(DeviceList);

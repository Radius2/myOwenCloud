import React from 'react';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import Device from './Device/Device';

const DeviceList = props => {
    const {devices} = props;
    const history = useHistory();

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

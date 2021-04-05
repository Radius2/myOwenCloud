import {Container} from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux'
import MonitoringListOfParameters from './MonitoringListOfParameters/MonitoringListOfParameters';



const Monitoring = (props) =>{
     return <Container maxWidth='md'>
         {
             props.category.map(category=><MonitoringListOfParameters key={category.id} name={category.name} categoryId={category.id}/>)
         }
    </Container>
}

const mapStateToProps = (state)=>({
    category: state.selectedParameters.category
})

export default connect(mapStateToProps)(Monitoring);
import {Button, Container, Typography, makeStyles} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React, {useEffect, useState} from 'react';
import {Chart} from 'react-charts';
import {useLocation} from 'react-router-dom';
import * as owen from '../owenAxios';

const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap:'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        padding:theme.spacing(1),
    },
    chartContainer: {
        width: theme.breakpoints.values.xs+'px',
        flexGrow:'1',
        height: '600px',
    }
}))


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ChartContainer = (props) => {
        const query = useQuery();
        const classes = useStyle();

        const [data, setData] = useState([
            {
                label: 'Series 1',
                data: [
                    {primary: 1, secondary: 10},
                    {primary: 2, secondary: 10},
                    {primary: 3, secondary: 10},
                ],
            },
            {
                label: 'Series 2',
                data: [
                    {primary: 1, secondary: 10},
                    {primary: 2, secondary: 10},
                    {primary: 3, secondary: 10},
                ],
            },
            {
                label: 'Series 3',
                data: [
                    {primary: 1, secondary: 10},
                    {primary: 2, secondary: 10},
                    {primary: 3, secondary: 10},
                ],
            },
        ]);
        console.log('chart');

        const ids = query.getAll('ids[]');

        useEffect(() => {
                owen.getValuesForChart(ids).then(data => setData(data));
            }
            , [ids.length]);

        const series = React.useMemo(
            () => ({
                showPoints: false
            }),
            []
        );
        const axes = React.useMemo(
            () => [
                {primary: true, type: 'time', position: 'bottom'},
                {type: 'linear', position: 'left'}
            ],
            []
        );

        return (
            <Container className={classes.root} maxWidth={'md'}>
                {/*<Typography>Раздел в разработке</Typography>*/}
                <Paper className={classes.chartContainer}>
                    <Chart
                        data={data}
                        series={series}
                        axes={axes}
                        tooltip
                        primaryCursor
                        secondaryCursor
                    />
                    <Button onClick={owen.getValuesForChart}>Get</Button>
                </Paper>
            </Container>
        )
    }
;

export default ChartContainer;
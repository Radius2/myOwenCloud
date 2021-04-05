import Button from '@material-ui/core/Button';
import React, {useEffect, useState} from 'react';
import {Chart} from 'react-charts';
import * as owen from '../owenAxios';

const ChartContainer = (props) => {
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
        useEffect(() => {
                owen.getValuesForChart().then(data => setData(data));
            }
            , []);

    const series = React.useMemo(
        () => ({
            showPoints: false
        }),
        []
    );
    const axes = React.useMemo(
        () => [
            { primary: true, type: "time", position: "bottom" },
            { type: "linear", position: "left" }
        ],
        []
    );

        return (
            <div style={{
                width: '100%',
                maxWidth: '700px',
                height: '600px',
            }}>
                <Chart
                    data={data}
                    series={series}
                    axes={axes}
                    tooltip
                    primaryCursor
                    secondaryCursor
                />
                <Button onClick={owen.getValuesForChart}>Get</Button>
            </div>
        );
    }
;

export default ChartContainer;
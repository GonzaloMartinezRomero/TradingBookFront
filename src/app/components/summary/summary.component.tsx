"use client";

import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import { SummaryDto } from '../../domain/summary/summary.model';
import { getSummary } from '../../services/summary.service';


export function Summary() {

    const [summary, setSummary] = useState<SummaryDto>();

    const currencyFormatter = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
    }).format;

    useEffect(() => {
        getSummary().then(x => setSummary(x));
    }, []);

    return (<>
        <div className="row">
            <div className="col-10">
                <BarChart
                    sx={(theme) => ({
                        //[`.${barElementClasses.root}`]: {
                        //    fill: theme.palette.background.paper,
                        //    strokeWidth: 2,
                        //},
                        //[`.MuiBarElement-series-l_id`]: {
                        //    stroke: '#FFFFFF',
                        //},
                        //[`.MuiBarElement-series-r_id`]: {
                        //    stroke: '#FFFFFF',
                        //},
                        [`.${axisClasses.root}`]: {
                            [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                                stroke: '#FFFFFF',
                                strokeWidth: 4,
                                fontSize: 15
                            },
                            [`.${axisClasses.tickLabel}`]: {
                                fill: '#FFFFFF',
                            },
                        },
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        //backgroundImage:
                        //    'linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
                        //backgroundSize: '35px 35px',
                        //backgroundPosition: '20px 20px, 20px 20px',
                        //...theme.applyStyles('dark', {
                        //    borderColor: 'rgba(255,255,255, 0.1)',
                        //    backgroundImage:
                        //        'linear-gradient(rgba(255,255,255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255, 0.1) 1px, transparent 1px)',
                        //}),
                    })}
                    xAxis={[
                        {
                            data: ['Deposits','Earnings','Stocks Active'],
                            scaleType: 'band',
                            colorMap: {
                                type: 'ordinal',
                                colors: ['#7b7f82e5', '#38d737d6','#532f64e5']
                            },
                        },
                    ]}
                    series={[
                        {
                            data: [summary?.deposits ?? 0,                              
                                summary?.earnStocksSelled ?? 0,
                                summary?.returnStocksActive ?? 0],
                            valueFormatter: (v) => (v === null ? '' : currencyFormatter(v)),
                           
                        },
                    ]}
                    width={1200}
                    height={700}
                />
            </div>
        </div>
    </>);
}
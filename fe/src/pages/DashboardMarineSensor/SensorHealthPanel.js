import React from 'react';
import { Card, CardBody, CardHeader, Row, Col, Progress } from 'reactstrap';

import getChartColorsArray from "../../Components/Common/ChartsDynamicColor";
import ReactApexChart from 'react-apexcharts';

const SensorHealthPanel = () => {
    const chartRadialColors = getChartColorsArray("#0ab39c_#f06548_#ffbe0b");

    // Individual sensor data
    const sensors = [
        { id: 1, name: 'Temperature Sensor', status: 'Operational', health: 92, lastCalibration: '15 days ago' },
        { id: 2, name: 'Barometric Sensor', status: 'Operational', health: 86, lastCalibration: '30 days ago' },
        { id: 3, name: 'GPS Module', status: 'Operational', health: 94, lastCalibration: '7 days ago' },
        { id: 4, name: 'Wind Sensor', status: 'Operational', health: 89, lastCalibration: '21 days ago' },
        { id: 5, name: 'Wave Height Sensor', status: 'Warning', health: 72, lastCalibration: '45 days ago' },
        { id: 6, name: 'Water Quality Module', status: 'Critical', health: 58, lastCalibration: '60 days ago' },
    ];

    // Helper function to determine health status color
    const getHealthColor = (health) => {
        if (health > 85) return 'success';
        if (health > 65) return 'warning';
        return 'danger';
    };

    // Calculate overall health statistics for radial chart
    const totalSensors = sensors.length;
    const operationalSensors = sensors.filter(sensor => sensor.status === 'Operational').length;
    const warningSensors = sensors.filter(sensor => sensor.status === 'Warning').length;
    const criticalSensors = sensors.filter(sensor => sensor.status === 'Critical').length;

    // Radial chart config
    const sensorStatusOptions = {
        chart: {
            height: 280,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined,
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        show: false,
                    }
                },
                track: {
                    show: true,
                    background: '#f2f2f2',
                }
            }
        },
        colors: chartRadialColors,
        labels: ['Operational', 'Warning', 'Critical'],
        legend: {
            show: true,
            floating: true,
            fontSize: '12px',
            position: 'left',
            offsetX: 80,
            offsetY: 10,
            labels: {
                useSeriesColors: true,
            },
            markers: {
                size: 0
            },
            formatter: function (seriesName, opts) {
                let count = 0;
                if (seriesName === 'Operational') count = operationalSensors;
                if (seriesName === 'Warning') count = warningSensors;
                if (seriesName === 'Critical') count = criticalSensors;
                return seriesName + ": " + count;
            },
            itemMargin: {
                vertical: 3
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    show: false
                }
            }
        }]
    };

    // Radial chart series - percentages of each status
    const sensorStatusSeries = [
        (operationalSensors / totalSensors) * 100,
        (warningSensors / totalSensors) * 100,
        (criticalSensors / totalSensors) * 100
    ];

    return (
        <React.Fragment>
            <Card>
                <CardHeader className="align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">Sensor Health Status</h4>
                    <div className="flex-shrink-0">
                        <button type="button" className="btn btn-soft-secondary btn-sm">
                            <i className="ri-refresh-line align-middle"></i> Refresh
                        </button>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="text-center mb-4">
                        <ReactApexChart
                            dir="ltr"
                            className="apex-charts"
                            options={sensorStatusOptions}
                            series={sensorStatusSeries}
                            type="radialBar"
                            height={220}
                        />
                    </div>

                    <h5 className="fs-15 mb-3">Sensor Details</h5>

                    <div className="sensor-list" style={{ maxHeight: '280px', overflowY: 'auto' }}>
                        {sensors.map((sensor) => (
                            <div key={sensor.id} className="d-flex p-2 border-bottom">
                                <div className="flex-grow-1">
                                    <h6 className="mb-1 fw-semibold">{sensor.name}</h6>
                                    <div className="d-flex mb-2">
                                        <div className="me-3">
                                            <span className={`badge badge-soft-${
                                                sensor.status === 'Operational' ? 'success' : 
                                                sensor.status === 'Warning' ? 'warning' : 'danger'
                                            } fs-11`}>
                                                {sensor.status}
                                            </span>
                                        </div>
                                        <div className="text-muted small">
                                            Last Calibration: {sensor.lastCalibration}
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1">
                                            <Progress
                                                color={getHealthColor(sensor.health)}
                                                value={sensor.health}
                                                className="animated-progress custom-progress progress-sm"
                                            />
                                        </div>
                                        <div className="flex-shrink-0 ms-2 fw-medium small">
                                            {sensor.health}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default SensorHealthPanel; 
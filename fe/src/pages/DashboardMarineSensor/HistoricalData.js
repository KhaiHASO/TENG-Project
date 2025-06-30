import React, { useState } from 'react';
import { Card, CardBody, CardHeader, ButtonGroup, Button, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ReactApexChart from "react-apexcharts";

import getChartColorsArray from "../../Components/Common/ChartsDynamicColor";

const HistoricalData = () => {
    const [timeRange, setTimeRange] = useState('24h');
    const [dataType, setDataType] = useState('wave-height');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    // Chart color arrays for different chart types
    const waveHeightColors = getChartColorsArray('["#3577f1"]');
    const windSpeedColors = getChartColorsArray('["#0ab39c"]');
    const waterTempColors = getChartColorsArray('["#f7b84b"]');

    // Time range options
    const timeRangeOptions = {
        '3h': { label: '3 Hours', dataPoints: 12 },
        '24h': { label: '24 Hours', dataPoints: 24 },
        '7d': { label: '7 Days', dataPoints: 28 },
        '30d': { label: '30 Days', dataPoints: 30 },
        'custom': { label: 'Custom Range', dataPoints: 60 }
    };

    // Helper to generate dates for historical data
    const generateDates = (range) => {
        const dataPoints = timeRangeOptions[range].dataPoints;
        const dates = [];
        const currentDate = new Date();
        
        if (range === '3h') {
            // Generate hourly timestamps for the past 3 hours
            for (let i = dataPoints - 1; i >= 0; i--) {
                const date = new Date(currentDate);
                date.setMinutes(0, 0, 0);
                date.setMinutes(date.getMinutes() - i * 15);
                dates.push(date.getTime());
            }
        } else if (range === '24h') {
            // Generate hourly timestamps for the past 24 hours
            for (let i = dataPoints - 1; i >= 0; i--) {
                const date = new Date(currentDate);
                date.setMinutes(0, 0, 0);
                date.setHours(date.getHours() - i);
                dates.push(date.getTime());
            }
        } else if (range === '7d') {
            // Generate 4 timestamps per day for the past 7 days
            for (let i = dataPoints - 1; i >= 0; i--) {
                const date = new Date(currentDate);
                date.setHours(0, 0, 0, 0);
                date.setHours(date.getHours() - (i * 6));
                dates.push(date.getTime());
            }
        } else if (range === '30d') {
            // Generate daily timestamps for the past 30 days
            for (let i = dataPoints - 1; i >= 0; i--) {
                const date = new Date(currentDate);
                date.setHours(0, 0, 0, 0);
                date.setDate(date.getDate() - i);
                dates.push(date.getTime());
            }
        } else {
            // Generate 2-month daily data for custom view
            for (let i = dataPoints - 1; i >= 0; i--) {
                const date = new Date(currentDate);
                date.setHours(0, 0, 0, 0);
                date.setDate(date.getDate() - i);
                dates.push(date.getTime());
            }
        }

        return dates;
    };

    // Generate random data with realistic patterns
    const generateHistoricalData = (type, range) => {
        const dataPoints = timeRangeOptions[range].dataPoints;
        const data = [];
        
        if (type === 'wave-height') {
            // Wave height typically 1-5 meters with some fluctuation
            let value = 2.5;
            for (let i = 0; i < dataPoints; i++) {
                // Add some random variation but maintain realistic patterns
                const change = (Math.random() - 0.5) * 0.8;
                value = Math.max(0.5, Math.min(6, value + change));
                data.push(parseFloat(value.toFixed(1)));
            }
        } else if (type === 'wind-speed') {
            // Wind speed typically 5-30 km/h
            let value = 15;
            for (let i = 0; i < dataPoints; i++) {
                const change = (Math.random() - 0.5) * 6;
                value = Math.max(2, Math.min(40, value + change));
                data.push(parseFloat(value.toFixed(1)));
            }
        } else if (type === 'water-temp') {
            // Water temp typically 18-25°C with slow changes
            let value = 21;
            for (let i = 0; i < dataPoints; i++) {
                const change = (Math.random() - 0.5) * 0.4;
                value = Math.max(16, Math.min(28, value + change));
                data.push(parseFloat(value.toFixed(1)));
            }
        }
        
        return data;
    };

    // Get chart data based on selected data type and time range
    const getChartData = () => {
        const dates = generateDates(timeRange);
        const data = generateHistoricalData(dataType, timeRange);
        
        let chartTitle, yAxisTitle, chartColors;
        
        switch (dataType) {
            case 'wave-height':
                chartTitle = 'Wave Height History';
                yAxisTitle = 'Height (m)';
                chartColors = waveHeightColors;
                break;
            case 'wind-speed':
                chartTitle = 'Wind Speed History';
                yAxisTitle = 'Speed (km/h)';
                chartColors = windSpeedColors;
                break;
            case 'water-temp':
                chartTitle = 'Water Temperature History';
                yAxisTitle = 'Temperature (°C)';
                chartColors = waterTempColors;
                break;
            default:
                chartTitle = 'Historical Data';
                yAxisTitle = 'Value';
                chartColors = waveHeightColors;
        }

        return {
            options: {
                chart: {
                    type: 'area',
                    height: 350,
                    zoom: {
                        enabled: true
                    },
                    toolbar: {
                        show: true,
                        tools: {
                            download: true,
                            selection: true,
                            zoom: true,
                            zoomin: true,
                            zoomout: true,
                            pan: true,
                        }
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth',
                    width: 3,
                },
                title: {
                    text: chartTitle,
                    align: 'left',
                    style: {
                        fontWeight: 500,
                    },
                },
                colors: chartColors,
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0.45,
                        opacityTo: 0.05,
                        stops: [20, 100, 100, 100]
                    },
                },
                markers: {
                    size: 3,
                    strokeWidth: 3,
                    hover: {
                        size: 6,
                    }
                },
                grid: {
                    row: {
                        colors: ['transparent', 'transparent'],
                        opacity: 0.2
                    },
                    borderColor: '#f1f1f1'
                },
                xaxis: {
                    type: 'datetime',
                    categories: dates,
                    labels: {
                        formatter: function(value, timestamp, opts) {
                            const date = new Date(timestamp);
                            if (timeRange === '3h') {
                                return `${date.getHours()}:${date.getMinutes() === 0 ? '00' : date.getMinutes()}`;
                            } else if (timeRange === '24h') {
                                return `${date.getHours()}:00`;
                            } else {
                                return `${date.getDate()}/${date.getMonth() + 1}`;
                            }
                        }
                    },
                    title: {
                        text: 'Time',
                    }
                },
                yaxis: {
                    title: {
                        text: yAxisTitle
                    },
                },
                tooltip: {
                    shared: false,
                    y: {
                        formatter: function (val) {
                            if (dataType === 'wave-height') return val + " m";
                            if (dataType === 'wind-speed') return val + " km/h";
                            if (dataType === 'water-temp') return val + "°C";
                            return val;
                        }
                    },
                    x: {
                        format: timeRange === '3h' || timeRange === '24h' ? 
                            'dd MMM, HH:mm' : 'dd MMM'
                    }
                }
            },
            series: [{
                name: chartTitle,
                data: data
            }]
        };
    };

    const chartData = getChartData();

    return (
        <React.Fragment>
            <Card>
                <CardHeader className="border-0 d-flex align-items-center">
                    <h4 className="card-title mb-0 flex-grow-1">Historical Data Analysis</h4>
                    
                    <div className="d-flex gap-2">
                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                            <DropdownToggle tag="button" className="btn btn-soft-secondary btn-sm">
                                <i className="ri-settings-3-line align-middle me-1"></i>
                                {dataType === 'wave-height' && 'Wave Height'}
                                {dataType === 'wind-speed' && 'Wind Speed'}
                                {dataType === 'water-temp' && 'Water Temp'}
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem onClick={() => setDataType('wave-height')} active={dataType === 'wave-height'}>
                                    Wave Height
                                </DropdownItem>
                                <DropdownItem onClick={() => setDataType('wind-speed')} active={dataType === 'wind-speed'}>
                                    Wind Speed
                                </DropdownItem>
                                <DropdownItem onClick={() => setDataType('water-temp')} active={dataType === 'water-temp'}>
                                    Water Temperature
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="mb-3">
                        <ButtonGroup>
                            <Button 
                                color={timeRange === '3h' ? 'primary' : 'light'} 
                                size="sm"
                                onClick={() => setTimeRange('3h')}
                            >
                                3H
                            </Button>
                            <Button 
                                color={timeRange === '24h' ? 'primary' : 'light'}
                                size="sm"
                                onClick={() => setTimeRange('24h')}
                            >
                                24H
                            </Button>
                            <Button 
                                color={timeRange === '7d' ? 'primary' : 'light'}
                                size="sm"
                                onClick={() => setTimeRange('7d')}
                            >
                                7D
                            </Button>
                            <Button 
                                color={timeRange === '30d' ? 'primary' : 'light'}
                                size="sm"
                                onClick={() => setTimeRange('30d')}
                            >
                                30D
                            </Button>
                            <Button 
                                color={timeRange === 'custom' ? 'primary' : 'light'}
                                size="sm"
                                onClick={() => setTimeRange('custom')}
                            >
                                <i className="ri-calendar-line align-bottom"></i> Custom
                            </Button>
                        </ButtonGroup>
                    </div>

                    <ReactApexChart
                        dir="ltr"
                        options={chartData.options}
                        series={chartData.series}
                        type="area"
                        height={350}
                        className="apex-charts"
                    />

                    <Row className="text-center mt-3">
                        <Col md={4}>
                            <div className="p-2">
                                <h5 className="fs-15 mb-1">{chartData.series[0].data[chartData.series[0].data.length - 1]}</h5>
                                <p className="text-muted mb-0">Current Value</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="p-2">
                                <h5 className="fs-15 mb-1">
                                    {Math.max(...chartData.series[0].data)}
                                </h5>
                                <p className="text-muted mb-0">Max Value</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="p-2">
                                <h5 className="fs-15 mb-1">
                                    {(chartData.series[0].data.reduce((a, b) => a + b, 0) / chartData.series[0].data.length).toFixed(1)}
                                </h5>
                                <p className="text-muted mb-0">Average</p>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default HistoricalData; 
import classnames from 'classnames';
import getChartColorsArray from "../../Components/Common/ChartsDynamicColor";
import ReactApexChart from "react-apexcharts";
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';

const WeatherData = () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    // Chart Color Arrays
    const windSpeedChartColors = getChartColorsArray('["#0ab39c"]');
    const waveHeightChartColors = getChartColorsArray('["#299cdb"]');
    const waterTempChartColors = getChartColorsArray('["#f06548"]');
    const salinityChartColors = getChartColorsArray('["#405189"]');
    

    // Wind Speed Chart
    const windSpeedOptions = {
        chart: {
            height: 350,
            type: 'radialBar',
            offsetY: -20,
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                dataLabels: {
                    name: {
                        fontSize: '16px',
                        color: undefined,
                        offsetY: 120
                    },
                    value: {
                        offsetY: 76,
                        fontSize: '22px',
                        color: undefined,
                        formatter: function (val) {
                            return val + " m/s";
                        }
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                shadeIntensity: 0.15,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 65, 91]
            },
        },
        stroke: {
            dashArray: 4
        },
        colors: windSpeedChartColors,
        labels: ['Wind Speed'],
        title: {
            text: 'Current Wind Speed',
            align: 'center',
            style: {
                fontWeight: 500,
            },
        },
    };
    const windSpeedSeries = [76]; // 76% of max speed (100%)

    // Wind Direction Chart
    const windDirectionOptions = {
        chart: {
            height: 350,
            type: 'radar',
        },
        series: [{
            name: 'Wind Direction',
            data: [20, 100, 40, 30, 50, 80, 33, 30],
        }],
        labels: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
        plotOptions: {
            radar: {
                size: 140,
            }
        },
        title: {
            text: 'Wind Direction (Compass)',
            align: 'center',
            style: {
                fontWeight: 500,
            },
        },
        colors: ['#FF4560'],
        markers: {
            size: 4,
            colors: ['#fff'],
            strokeColor: '#FF4560',
            strokeWidth: 2,
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " km/h";
                }
            }
        },
        yaxis: {
            tickAmount: 7,
        }
    };

    // Wave Height Chart
    const waveHeightOptions = {
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false,
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        colors: waveHeightChartColors,
        xaxis: {
            type: 'datetime',
            categories: ["2023-09-19T00:00:00.000Z", "2023-09-19T01:30:00.000Z", "2023-09-19T02:30:00.000Z", "2023-09-19T03:30:00.000Z", "2023-09-19T04:30:00.000Z", "2023-09-19T05:30:00.000Z", "2023-09-19T06:30:00.000Z"]
        },
        yaxis: {
            title: {
                text: 'Wave Height (m)'
            }
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
        title: {
            text: 'Wave Height over Time',
            align: 'left',
            style: {
                fontWeight: 500,
            },
        },
    };
    const waveHeightSeries = [{
        name: 'Wave Height',
        data: [2.3, 2.1, 2.7, 3.9, 3.2, 2.8, 2.1]
    }];

    // Wave Frequency Chart
    const waveFreqOptions = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '45%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        colors: ['#2ab57d'],
        xaxis: {
            categories: ['0.1-0.2', '0.2-0.3', '0.3-0.4', '0.4-0.5', '0.5-0.6', '0.6-0.7', '0.7-0.8', '0.8-0.9'],
            title: {
                text: 'Frequency (Hz)'
            }
        },
        yaxis: {
            title: {
                text: 'Power Spectral Density'
            }
        },
        fill: {
            opacity: 1
        },
        title: {
            text: 'Wave Frequency Distribution',
            align: 'left',
            style: {
                fontWeight: 500,
            },
        },
    };
    const waveFreqSeries = [{
        name: 'Power Spectral Density',
        data: [12, 43, 76, 35, 22, 15, 7, 2]
    }];

    // Water Temperature Chart
    const waterTempOptions = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight',
            width: 3,
        },
        colors: waterTempChartColors,
        title: {
            text: 'Water Temperature (24h)',
            align: 'left',
            style: {
                fontWeight: 500,
            },
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', 'Now'],
        },
        yaxis: {
            title: {
                text: 'Temperature (°C)'
            }
        }
    };
    const waterTempSeries = [{
        name: "Water Temp",
        data: [21.2, 20.8, 20.5, 20.7, 21.3, 22.1, 22.8, 22.5, 22.1]
    }];

    // Salinity & pH Chart
    const salinityOptions = {
        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            toolbar: {
                show: false
            }
        },
        colors: salinityChartColors,
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Water Quality Measurements',
            align: 'left',
            style: {
                fontWeight: 500,
            },
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            title: {
                text: 'Month'
            }
        },
        yaxis: [
            {
                title: {
                    text: 'Salinity (ppt)',
                },
            },
            {
                opposite: true,
                title: {
                    text: 'pH'
                }
            }
        ],
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        }
    };
    const salinitySeries = [
        {
            name: "Salinity",
            data: [34.2, 34.1, 33.9, 34.0, 34.2, 34.5, 34.3]
        },
        {
            name: "pH",
            data: [8.1, 8.0, 8.1, 8.2, 8.1, 8.0, 8.0]
        }
    ];

    return (
        <React.Fragment>
            <Card>
                <CardHeader className="border-0 align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">Sea & Weather Data</h4>
                    <div>
                        <button type="button" className="btn btn-soft-primary btn-sm">
                            <i className="ri-file-list-3-line align-middle"></i> Reports
                        </button>
                    </div>
                </CardHeader>
                <CardBody>
                    <Nav pills className="nav nav-pills arrow-navtabs nav-success bg-light mb-3">
                        <NavItem>
                            <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggleTab('1'); }}
                            >
                                <i className="ri-wind-line me-1 align-middle"></i> Wind
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggleTab('2'); }}
                            >
                                <i className="ri-water-flash-line me-1 align-middle"></i> Waves
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({ active: activeTab === '3' })}
                                onClick={() => { toggleTab('3'); }}
                            >
                                <i className="ri-celsius-line me-1 align-middle"></i> Temperature
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({ active: activeTab === '4' })}
                                onClick={() => { toggleTab('4'); }}
                            >
                                <i className="ri-test-tube-line me-1 align-middle"></i> Water Quality
                            </NavLink>
                        </NavItem>
                    </Nav>

                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col lg={6}>
                                    <ReactApexChart dir="ltr" className="apex-charts" options={windSpeedOptions} series={windSpeedSeries} type="radialBar" height={328} />
                                </Col>
                                <Col lg={6}>
                                    <ReactApexChart dir="ltr" className="apex-charts" options={windDirectionOptions} series={windDirectionOptions.series} type="radar" height={328} />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col lg={6}>
                                    <ReactApexChart dir="ltr" className="apex-charts" options={waveHeightOptions} series={waveHeightSeries} type="area" height={328} />
                                </Col>
                                <Col lg={6}>
                                    <ReactApexChart dir="ltr" className="apex-charts" options={waveFreqOptions} series={waveFreqSeries} type="bar" height={328} />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="3">
                            <ReactApexChart dir="ltr" className="apex-charts" options={waterTempOptions} series={waterTempSeries} type="line" height={350} />
                        </TabPane>
                        <TabPane tabId="4">
                            <ReactApexChart dir="ltr" className="apex-charts" options={salinityOptions} series={salinitySeries} type="line" height={350} />
                        </TabPane>
                    </TabContent>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default WeatherData; 
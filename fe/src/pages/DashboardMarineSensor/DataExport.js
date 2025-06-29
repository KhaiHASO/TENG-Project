import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Button, Row, Col, Form, FormGroup, Label, Input, InputGroup, UncontrolledTooltip } from 'reactstrap';

const DataExport = () => {
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: ''
    });
    const [selectedFormat, setSelectedFormat] = useState('csv');
    const [selectedSensors, setSelectedSensors] = useState(['buoy1', 'buoy2', 'buoy3']);
    const [selectedMetrics, setSelectedMetrics] = useState(['wave-height', 'wind-speed', 'water-temp']);

    // Available sensors and metrics for selection
    const availableSensors = [
        { id: 'buoy1', name: 'Buoy #1' },
        { id: 'buoy2', name: 'Buoy #2' },
        { id: 'buoy3', name: 'Buoy #3' },
    ];
    
    const availableMetrics = [
        { id: 'wave-height', name: 'Wave Height' },
        { id: 'wind-speed', name: 'Wind Speed' },
        { id: 'wind-direction', name: 'Wind Direction' },
        { id: 'water-temp', name: 'Water Temperature' },
        { id: 'salinity', name: 'Salinity' },
        { id: 'ph', name: 'pH Level' },
        { id: 'battery', name: 'Battery Status' },
    ];

    // Format options
    const formatOptions = [
        { id: 'csv', name: 'CSV (.csv)', icon: 'ri-file-excel-2-line' },
        { id: 'json', name: 'JSON (.json)', icon: 'ri-file-code-line' },
        { id: 'excel', name: 'Excel (.xlsx)', icon: 'ri-file-excel-line' },
    ];

    // Handle toggle sensor selection
    const handleSensorToggle = (sensorId) => {
        if (selectedSensors.includes(sensorId)) {
            setSelectedSensors(selectedSensors.filter(id => id !== sensorId));
        } else {
            setSelectedSensors([...selectedSensors, sensorId]);
        }
    };

    // Handle toggle metric selection
    const handleMetricToggle = (metricId) => {
        if (selectedMetrics.includes(metricId)) {
            setSelectedMetrics(selectedMetrics.filter(id => id !== metricId));
        } else {
            setSelectedMetrics([...selectedMetrics, metricId]);
        }
    };

    // Handle date changes
    const handleDateChange = (e) => {
        setDateRange({
            ...dateRange,
            [e.target.name]: e.target.value
        });
    };

    // Quick date range selections
    const quickDateRanges = [
        { id: 'today', name: 'Today' },
        { id: 'yesterday', name: 'Yesterday' },
        { id: 'last7days', name: 'Last 7 Days' },
        { id: 'last30days', name: 'Last 30 Days' },
        { id: 'thismonth', name: 'This Month' },
        { id: 'lastmonth', name: 'Last Month' }
    ];

    // Apply quick date range
    const applyQuickDateRange = (rangeId) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        const last7days = new Date(today);
        last7days.setDate(last7days.getDate() - 7);
        
        const last30days = new Date(today);
        last30days.setDate(last30days.getDate() - 30);
        
        const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        
        const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        
        const formatDate = (date) => {
            return date.toISOString().split('T')[0];
        };
        
        switch (rangeId) {
            case 'today':
                setDateRange({
                    startDate: formatDate(today),
                    endDate: formatDate(today)
                });
                break;
            case 'yesterday':
                setDateRange({
                    startDate: formatDate(yesterday),
                    endDate: formatDate(yesterday)
                });
                break;
            case 'last7days':
                setDateRange({
                    startDate: formatDate(last7days),
                    endDate: formatDate(today)
                });
                break;
            case 'last30days':
                setDateRange({
                    startDate: formatDate(last30days),
                    endDate: formatDate(today)
                });
                break;
            case 'thismonth':
                setDateRange({
                    startDate: formatDate(thisMonthStart),
                    endDate: formatDate(today)
                });
                break;
            case 'lastmonth':
                setDateRange({
                    startDate: formatDate(lastMonthStart),
                    endDate: formatDate(lastMonthEnd)
                });
                break;
            default:
                break;
        }
    };

    // Generate export filename
    const generateFilename = () => {
        const format = selectedFormat;
        const date = new Date().toISOString().split('T')[0];
        return `marine_sensor_data_${date}.${format}`;
    };

    // Handle export
    const handleExport = () => {
        // In a real application, this would trigger an API call to get the data
        console.log('Exporting data with the following parameters:');
        console.log('Date Range:', dateRange);
        console.log('Format:', selectedFormat);
        console.log('Sensors:', selectedSensors);
        console.log('Metrics:', selectedMetrics);
        
        // Mock export - in real app would download file
        alert(`Data would be downloaded as ${generateFilename()}`);
    };

    return (
        <React.Fragment>
            <Card>
                <CardHeader className="d-flex align-items-center">
                    <h4 className="card-title mb-0 flex-grow-1">Export Data</h4>
                    <div className="flex-shrink-0">
                        <Button color="success" size="sm" onClick={handleExport}>
                            <i className="ri-download-2-line align-middle me-1"></i> Export
                        </Button>
                    </div>
                </CardHeader>
                <CardBody>
                    <Form>
                        {/* Date Range Section */}
                        <div className="mb-4">
                            <Label className="form-label text-muted text-uppercase fw-semibold mb-3">Date Range</Label>
                            <Row className="g-3">
                                <Col md={6}>
                                    <InputGroup>
                                        <span className="input-group-text">From</span>
                                        <Input 
                                            type="date" 
                                            name="startDate"
                                            value={dateRange.startDate}
                                            onChange={handleDateChange}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col md={6}>
                                    <InputGroup>
                                        <span className="input-group-text">To</span>
                                        <Input 
                                            type="date" 
                                            name="endDate"
                                            value={dateRange.endDate}
                                            onChange={handleDateChange}
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <div className="mt-2">
                                <div className="d-flex flex-wrap gap-2">
                                    {quickDateRanges.map((range) => (
                                        <Button 
                                            key={range.id}
                                            color="soft-secondary" 
                                            size="sm"
                                            onClick={() => applyQuickDateRange(range.id)}
                                        >
                                            {range.name}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Export Format Section */}
                        <div className="mb-4">
                            <Label className="form-label text-muted text-uppercase fw-semibold mb-3">Export Format</Label>
                            <div className="d-flex flex-wrap gap-2">
                                {formatOptions.map((format) => (
                                    <Button 
                                        key={format.id}
                                        color={selectedFormat === format.id ? "primary" : "light"} 
                                        onClick={() => setSelectedFormat(format.id)}
                                        className="btn-icon"
                                    >
                                        <i className={`${format.icon} fs-20 mb-1 d-block`}></i>
                                        <span>{format.name}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Data Selection Section */}
                        <Row>
                            {/* Sensor Selection */}
                            <Col md={6}>
                                <div className="mb-4">
                                    <Label className="form-label text-muted text-uppercase fw-semibold mb-3">Select Sensors</Label>
                                    <div className="d-flex flex-column gap-2">
                                        {availableSensors.map((sensor) => (
                                            <div className="form-check" key={sensor.id}>
                                                <Input 
                                                    className="form-check-input" 
                                                    type="checkbox"
                                                    id={`sensor-${sensor.id}`}
                                                    checked={selectedSensors.includes(sensor.id)}
                                                    onChange={() => handleSensorToggle(sensor.id)}
                                                />
                                                <Label className="form-check-label" for={`sensor-${sensor.id}`}>
                                                    {sensor.name}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Col>

                            {/* Metrics Selection */}
                            <Col md={6}>
                                <div className="mb-4">
                                    <Label className="form-label text-muted text-uppercase fw-semibold mb-3">Select Metrics</Label>
                                    <div className="d-flex flex-column gap-2">
                                        {availableMetrics.map((metric) => (
                                            <div className="form-check" key={metric.id}>
                                                <Input 
                                                    className="form-check-input" 
                                                    type="checkbox"
                                                    id={`metric-${metric.id}`}
                                                    checked={selectedMetrics.includes(metric.id)}
                                                    onChange={() => handleMetricToggle(metric.id)}
                                                />
                                                <Label className="form-check-label" for={`metric-${metric.id}`}>
                                                    {metric.name}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        {/* Recent Exports */}
                        <div className="mt-2">
                            <h6 className="text-muted text-uppercase fw-semibold mb-3">Recent Exports</h6>
                            <div className="table-responsive">
                                <table className="table table-borderless table-sm table-centered align-middle table-nowrap mb-0">
                                    <tbody>
                                        <tr>
                                            <td style={{ width: "40px" }}>
                                                <div className="avatar-sm">
                                                    <div className="avatar-title rounded-circle bg-soft-primary text-primary fs-24">
                                                        <i className="ri-file-excel-2-line"></i>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h6 className="mb-0">marine_sensor_data_2023-09-01.csv</h6>
                                                <small className="text-muted">5.3 MB • 2 days ago</small>
                                            </td>
                                            <td>
                                                <Button color="link" className="p-0" id="downloadCSV">
                                                    <i className="ri-download-2-line fs-17"></i>
                                                </Button>
                                                <UncontrolledTooltip target="downloadCSV">Download</UncontrolledTooltip>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "40px" }}>
                                                <div className="avatar-sm">
                                                    <div className="avatar-title rounded-circle bg-soft-info text-info fs-24">
                                                        <i className="ri-file-excel-line"></i>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h6 className="mb-0">marine_sensor_data_2023-08-15.xlsx</h6>
                                                <small className="text-muted">8.7 MB • 2 weeks ago</small>
                                            </td>
                                            <td>
                                                <Button color="link" className="p-0" id="downloadXLSX">
                                                    <i className="ri-download-2-line fs-17"></i>
                                                </Button>
                                                <UncontrolledTooltip target="downloadXLSX">Download</UncontrolledTooltip>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default DataExport; 
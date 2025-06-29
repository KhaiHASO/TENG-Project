import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import CountUp from "react-countup";

// Import Images
import { MarkerIcon, BatteryIcon, ClockIcon, AlertIcon } from './Icons';

const SensorOverview = () => {

    const sensorData = {
        gpsCoordinates: { lat: 20.5937, lng: 78.9629 },
        lastUpdate: "2 mins ago",
        batteryLevel: 78,
        sensorStatus: "Online",
        warnings: 0
    };

    // Function to determine battery color based on level
    const getBatteryColor = (level) => {
        if (level > 70) return "success";
        if (level > 30) return "warning";
        return "danger";
    };

    return (
        <React.Fragment>
            <Card>
                <CardHeader className="border-0 align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">Buoy Sensor Overview</h4>
                    <div>
                        <button type="button" className="btn btn-soft-secondary btn-sm">
                            <i className="ri-refresh-line align-middle"></i> Refresh
                        </button>
                    </div>
                </CardHeader>
                <CardBody>
                    <Row className="g-3">
                        {/* GPS Coordinates */}
                        <Col xl={3} md={6}>
                            <Card className="mini-stats-wid card-height-100 border-0">
                                <CardBody>
                                    <div className="d-flex align-items-center">
                                        <div className="avatar-sm flex-shrink-0">
                                            <span className="avatar-title bg-primary-subtle text-primary rounded-2 fs-2">
                                                <i className="ri-map-pin-2-line"></i>
                                            </span>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <p className="text-uppercase fw-medium text-muted mb-1">GPS Coordinates</p>
                                            <h4 className="fs-14 mb-0">
                                                Lat: {sensorData.gpsCoordinates.lat}, Lng: {sensorData.gpsCoordinates.lng}
                                            </h4>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        {/* Last Update */}
                        <Col xl={3} md={6}>
                            <Card className="mini-stats-wid card-height-100 border-0">
                                <CardBody>
                                    <div className="d-flex align-items-center">
                                        <div className="avatar-sm flex-shrink-0">
                                            <span className="avatar-title bg-info-subtle text-info rounded-2 fs-2">
                                                <i className="ri-time-line"></i>
                                            </span>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <p className="text-uppercase fw-medium text-muted mb-1">Last Update</p>
                                            <h4 className="fs-14 mb-0">{sensorData.lastUpdate}</h4>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        {/* Battery Level */}
                        <Col xl={3} md={6}>
                            <Card className="mini-stats-wid card-height-100 border-0">
                                <CardBody>
                                    <div className="d-flex align-items-center">
                                        <div className="avatar-sm flex-shrink-0">
                                            <span className={`avatar-title bg-${getBatteryColor(sensorData.batteryLevel)}-subtle text-${getBatteryColor(sensorData.batteryLevel)} rounded-2 fs-2`}>
                                                <i className="ri-battery-2-charge-line"></i>
                                            </span>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <p className="text-uppercase fw-medium text-muted mb-1">Battery</p>
                                            <h4 className="fs-14 mb-0">
                                                <CountUp
                                                    start={0}
                                                    end={sensorData.batteryLevel}
                                                    duration={1}
                                                    separator=","
                                                    suffix="%"
                                                />
                                            </h4>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        {/* Sensor Status */}
                        <Col xl={3} md={6}>
                            <Card className="mini-stats-wid card-height-100 border-0">
                                <CardBody>
                                    <div className="d-flex align-items-center">
                                        <div className="avatar-sm flex-shrink-0">
                                            <span className="avatar-title bg-success-subtle text-success rounded-2 fs-2">
                                                <i className="ri-pulse-line"></i>
                                            </span>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <p className="text-uppercase fw-medium text-muted mb-1">Status</p>
                                            <h4 className="fs-14 mb-0">{sensorData.sensorStatus}</h4>
                                            {sensorData.warnings > 0 && (
                                                <span className="badge badge-soft-danger mt-1">
                                                    {sensorData.warnings} Warning(s)
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default SensorOverview; 
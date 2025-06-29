import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Badge, Button, Alert, Table } from 'reactstrap';

const AlertSystem = () => {
    const [alerts, setAlerts] = useState([
        {
            id: 1,
            type: 'danger',
            title: 'High Wave Alert',
            message: 'Wave height exceeded threshold (4.5m)',
            sensor: 'Buoy #3',
            timestamp: '10 minutes ago',
            acknowledged: false
        },
        {
            id: 2,
            type: 'warning',
            title: 'Battery Warning',
            message: 'Battery level below 25%',
            sensor: 'Buoy #3',
            timestamp: '30 minutes ago',
            acknowledged: false
        },
        {
            id: 3,
            type: 'info',
            title: 'GPS Signal Weak',
            message: 'GPS signal strength fluctuating',
            sensor: 'Buoy #2',
            timestamp: '2 hours ago',
            acknowledged: true
        },
        {
            id: 4,
            type: 'warning',
            title: 'Temperature Spike',
            message: 'Water temperature increased by 2°C in 1 hour',
            sensor: 'Buoy #1',
            timestamp: '3 hours ago',
            acknowledged: true
        },
        {
            id: 5,
            type: 'danger',
            title: 'Communication Error',
            message: 'Lost connection with sensor module',
            sensor: 'Buoy #3',
            timestamp: '1 day ago',
            acknowledged: true
        }
    ]);

    // Function to acknowledge an alert
    const acknowledgeAlert = (id) => {
        setAlerts(alerts.map(alert => 
            alert.id === id ? { ...alert, acknowledged: true } : alert
        ));
    };

    // Count unacknowledged alerts
    const unacknowledgedCount = alerts.filter(alert => !alert.acknowledged).length;

    return (
        <React.Fragment>
            <Card>
                <CardHeader className="d-flex align-items-center">
                    <h4 className="card-title mb-0 flex-grow-1">Alert System</h4>
                    {unacknowledgedCount > 0 && (
                        <Badge color="danger" className="me-2">
                            {unacknowledgedCount} New
                        </Badge>
                    )}
                    <div className="flex-shrink-0">
                        <Button color="soft-primary" size="sm">
                            <i className="ri-notification-4-line me-1 align-middle"></i> Configure Alerts
                        </Button>
                    </div>
                </CardHeader>
                <CardBody>
                    {/* Active Alerts Section */}
                    {alerts.filter(alert => !alert.acknowledged).length > 0 ? (
                        <div className="mb-4">
                            <h5 className="fs-14 mb-3 text-uppercase fw-semibold">Active Alerts</h5>
                            {alerts.filter(alert => !alert.acknowledged).map((alert) => (
                                <Alert
                                    key={alert.id}
                                    color={alert.type}
                                    className="alert-dismissible fade show"
                                    role="alert"
                                >
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <h5 className="alert-heading">{alert.title}</h5>
                                            <p className="mb-0">{alert.message}</p>
                                            <div className="mt-1 text-muted small">
                                                <span className="me-2">{alert.sensor}</span>
                                                <span>{alert.timestamp}</span>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <Button
                                                color="soft-secondary"
                                                size="sm"
                                                onClick={() => acknowledgeAlert(alert.id)}
                                            >
                                                Acknowledge
                                            </Button>
                                        </div>
                                    </div>
                                </Alert>
                            ))}
                        </div>
                    ) : (
                        <div className="mb-4 text-center p-3 border border-dashed rounded">
                            <i className="ri-check-double-line display-5 text-success"></i>
                            <h5 className="mt-2">No active alerts</h5>
                            <p className="text-muted mb-0">All systems operating normally</p>
                        </div>
                    )}

                    {/* Alert History Section */}
                    <div>
                        <h5 className="fs-14 mb-3 text-uppercase fw-semibold">Alert History</h5>
                        <div className="table-responsive" style={{ maxHeight: '220px' }}>
                            <Table className="align-middle table-nowrap mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col">Alert</th>
                                        <th scope="col">Sensor</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alerts.map((alert) => (
                                        <tr key={alert.id}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className={`flex-shrink-0 avatar-xs me-2 bg-soft-${alert.type} rounded d-flex align-items-center justify-content-center`}>
                                                        <i className={`ri-${
                                                            alert.type === 'danger' ? 'alarm-warning-line' :
                                                            alert.type === 'warning' ? 'error-warning-line' : 'information-line'
                                                        } text-${alert.type}`}></i>
                                                    </div>
                                                    <div>
                                                        <span className="fs-13 fw-medium">{alert.title}</span>
                                                        <div className="text-muted fs-12">{alert.message}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{alert.sensor}</td>
                                            <td>{alert.timestamp}</td>
                                            <td>
                                                {alert.acknowledged ? (
                                                    <Badge color="soft-success">Acknowledged</Badge>
                                                ) : (
                                                    <Badge color="soft-danger">New</Badge>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>

                        <div className="text-center mt-3">
                            <Button color="soft-secondary" size="sm">
                                View All Alerts <i className="ri-arrow-right-line align-middle ms-1"></i>
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default AlertSystem; 
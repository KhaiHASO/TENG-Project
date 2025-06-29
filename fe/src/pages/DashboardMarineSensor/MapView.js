import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Row, Col, Button, Tooltip, UncontrolledTooltip } from 'reactstrap';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapView = () => {
    const [selected, setSelected] = useState(null);

    // Center point for the map (Bay of Bengal example)
    const center = { lat: 16.7689, lng: 85.3496 };

    // Multiple buoy locations
    const buoys = [
        { 
            id: 1, 
            position: { lat: 16.7689, lng: 85.3496 }, 
            name: "Buoy #1", 
            status: "Online", 
            lastUpdate: "5 mins ago",
            batteryLevel: 78,
            measurements: {
                waveHeight: "2.3m",
                windSpeed: "15km/h",
                waterTemp: "22°C"
            }
        },
        { 
            id: 2, 
            position: { lat: 17.1689, lng: 84.9496 }, 
            name: "Buoy #2", 
            status: "Online", 
            lastUpdate: "12 mins ago",
            batteryLevel: 65,
            measurements: {
                waveHeight: "1.8m",
                windSpeed: "12km/h",
                waterTemp: "21.5°C"
            }
        },
        { 
            id: 3, 
            position: { lat: 16.3689, lng: 85.7496 }, 
            name: "Buoy #3", 
            status: "Warning", 
            lastUpdate: "30 mins ago",
            batteryLevel: 22,
            measurements: {
                waveHeight: "3.1m",
                windSpeed: "22km/h",
                waterTemp: "23.1°C"
            }
        }
    ];

    const onSelect = (buoy) => {
        setSelected(buoy);
    };

    // Function to determine marker icon color based on status
    const getMarkerIcon = (status) => {
        if (status === "Online") {
            return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
        } else if (status === "Warning") {
            return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
        } else {
            return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
        }
    };

    return (
        <React.Fragment>
            <Card>
                <CardHeader className="border-0 align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">Buoy Locations</h4>
                    <div>
                        <Button size='sm' color="soft-primary">
                            <i className="ri-map-pin-range-line align-middle me-1"></i> Locate All
                        </Button>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="live-preview">
                        <div className="map-container" style={{ height: "400px", position: "relative" }}>
                            <LoadScript googleMapsApiKey="AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE">
                                <GoogleMap 
                                    mapContainerStyle={{ width: "100%", height: "100%" }} 
                                    center={center} 
                                    zoom={6}
                                    options={{
                                        styles: [
                                            { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
                                            { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
                                            { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
                                            { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
                                            { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9c9c9" }] },
                                            { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] }
                                        ]
                                    }}
                                >
                                    {buoys.map(buoy => (
                                        <Marker
                                            key={buoy.id}
                                            position={buoy.position}
                                            onClick={() => onSelect(buoy)}
                                            icon={{
                                                url: getMarkerIcon(buoy.status),
                                                scaledSize: { width: 25, height: 25 }
                                            }}
                                        />
                                    ))}
                                    {selected && (
                                        <InfoWindow
                                            position={selected.position}
                                            onCloseClick={() => setSelected(null)}
                                        >
                                            <div className="p-2" style={{ maxWidth: "200px" }}>
                                                <h6 className="fw-semibold">{selected.name}</h6>
                                                <p className="text-muted mb-1">Last update: {selected.lastUpdate}</p>
                                                <div className={`badge bg-${selected.status === 'Online' ? 'success' : 'warning'} mb-2`}>
                                                    {selected.status}
                                                </div>
                                                <div className="small">
                                                    <div><i className="ri-battery-2-line me-1"></i> Battery: {selected.batteryLevel}%</div>
                                                    <div><i className="ri-contrast-drop-line me-1"></i> Wave: {selected.measurements.waveHeight}</div>
                                                    <div><i className="ri-wind-line me-1"></i> Wind: {selected.measurements.windSpeed}</div>
                                                    <div><i className="ri-temp-hot-line me-1"></i> Temp: {selected.measurements.waterTemp}</div>
                                                </div>
                                                <div className="mt-2">
                                                    <a href="#" className="link-info small">View Details</a>
                                                </div>
                                            </div>
                                        </InfoWindow>
                                    )}
                                </GoogleMap>
                            </LoadScript>
                        </div>
                    </div>

                    <Row className="mt-3">
                        <Col md={4}>
                            <div className="d-flex align-items-center mb-2">
                                <div className="flex-shrink-0 me-1">
                                    <div className="avatar-xs">
                                        <div className="avatar-title bg-success rounded-circle">
                                            <i className="ri-checkbox-blank-circle-fill"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <span>Online</span>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="d-flex align-items-center mb-2">
                                <div className="flex-shrink-0 me-1">
                                    <div className="avatar-xs">
                                        <div className="avatar-title bg-warning rounded-circle">
                                            <i className="ri-checkbox-blank-circle-fill"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <span>Warning</span>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="d-flex align-items-center mb-2">
                                <div className="flex-shrink-0 me-1">
                                    <div className="avatar-xs">
                                        <div className="avatar-title bg-danger rounded-circle">
                                            <i className="ri-checkbox-blank-circle-fill"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <span>Offline</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default MapView; 
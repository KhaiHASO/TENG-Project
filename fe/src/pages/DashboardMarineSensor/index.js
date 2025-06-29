import React from 'react';
import { Container, Row, Col } from 'reactstrap';

//import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import SensorOverview from './SensorOverview';
import WeatherData from './WeatherData';
import SensorHealthPanel from './SensorHealthPanel';
import MapView from './MapView';
import HistoricalData from './HistoricalData';
import AlertSystem from './AlertSystem';
import DataExport from './DataExport';
import ResearchInfo from './ResearchInfo';

const DashboardMarineSensor = () => {
    document.title = "Marine Sensor Dashboard | TENG - Research Platform";
    
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Marine Sensor Dashboard" pageTitle="Dashboards" />
                    
                    {/* Overview Panel */}
                    <Row>
                        <Col xl={12}>
                            <SensorOverview />
                        </Col>
                    </Row>

                    {/* Weather Data and Map View */}
                    <Row>
                        <Col xl={8}>
                            <WeatherData />
                        </Col>
                        <Col xl={4}>
                            <MapView />
                        </Col>
                    </Row>

                    {/* Historical Data & Sensor Health */}
                    <Row>
                        <Col xl={8}>
                            <HistoricalData />
                        </Col>
                        <Col xl={4}>
                            <SensorHealthPanel />
                        </Col>
                    </Row>

                    {/* Alerts and Data Export */}
                    <Row>
                        <Col xl={6}>
                            <AlertSystem />
                        </Col>
                        <Col xl={6}>
                            <DataExport />
                        </Col>
                    </Row>

                    {/* Research Info */}
                    <Row>
                        <Col xl={12}>
                            <ResearchInfo />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default DashboardMarineSensor; 
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, ListGroup, ListGroupItem } from 'reactstrap';

const ResearchInfo = () => {
    // Research team data
    const researchTeam = [
        { name: 'Dr. Sarah Johnson', role: 'Principal Investigator', affiliation: 'Ocean Research Institute', email: 'sjohnson@oceanic.edu' },
        { name: 'Dr. Robert Chen', role: 'Lead Engineer', affiliation: 'Marine Tech Solutions', email: 'rchen@marinetech.com' },
        { name: 'Dr. Amina Patel', role: 'Data Scientist', affiliation: 'Ocean Research Institute', email: 'apatel@oceanic.edu' },
        { name: 'Michael Torres', role: 'Field Technician', affiliation: 'Marine Tech Solutions', email: 'mtorres@marinetech.com' }
    ];

    // Project details
    const projectDetails = {
        name: 'Marine Environmental Monitoring Network',
        code: 'MEMN-2023',
        duration: 'January 2023 - December 2025',
        funded_by: 'National Oceanographic Foundation',
        grant_code: 'NOF-2023-00892',
        locations: 'Bay of Bengal, Indian Ocean (3 buoy network)',
        firmware: 'v2.3.7 (Updated: August 15, 2023)'
    };

    // Publications list
    const publications = [
        {
            title: 'Real-time monitoring systems for marine environments: Challenges and opportunities',
            authors: 'Johnson, S., Chen, R., Patel, A.',
            journal: 'Journal of Marine Technology',
            year: 2023,
            doi: '10.1234/jmt.2023.00123'
        },
        {
            title: 'Data fusion techniques for oceanic sensor networks',
            authors: 'Patel, A., Johnson, S., Kumar, N.',
            journal: 'Oceanography Data Science',
            year: 2022,
            doi: '10.1234/ods.2022.00456'
        }
    ];

    return (
        <React.Fragment>
            <Card>
                <CardHeader className="d-flex align-items-center">
                    <h4 className="card-title mb-0 flex-grow-1">Research Project Information</h4>
                </CardHeader>
                <CardBody>
                    <Row>
                        {/* Project Details */}
                        <Col lg={6}>
                            <div className="mb-4">
                                <h5 className="fs-14 mb-3 text-uppercase fw-semibold">Project Details</h5>
                                <ListGroup flush className="border-dashed">
                                    <ListGroupItem className="px-0">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 me-3">
                                                <i className="ri-file-list-3-line text-muted fs-16"></i>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">Project Name</h6>
                                                <p className="fs-13 text-muted mb-0">{projectDetails.name}</p>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem className="px-0">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 me-3">
                                                <i className="ri-calendar-line text-muted fs-16"></i>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">Duration</h6>
                                                <p className="fs-13 text-muted mb-0">{projectDetails.duration}</p>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem className="px-0">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 me-3">
                                                <i className="ri-money-dollar-circle-line text-muted fs-16"></i>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">Funded By</h6>
                                                <p className="fs-13 text-muted mb-0">{projectDetails.funded_by}</p>
                                                <p className="fs-13 text-muted mb-0">Grant: {projectDetails.grant_code}</p>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem className="px-0">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 me-3">
                                                <i className="ri-map-pin-line text-muted fs-16"></i>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">Deployment Locations</h6>
                                                <p className="fs-13 text-muted mb-0">{projectDetails.locations}</p>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem className="px-0">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 me-3">
                                                <i className="ri-code-box-line text-muted fs-16"></i>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">Firmware Version</h6>
                                                <p className="fs-13 text-muted mb-0">{projectDetails.firmware}</p>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                </ListGroup>
                            </div>
                        </Col>

                        {/* Research Team */}
                        <Col lg={6}>
                            <div className="mb-4">
                                <h5 className="fs-14 mb-3 text-uppercase fw-semibold">Research Team</h5>
                                <div className="table-responsive">
                                    <table className="table align-middle table-nowrap mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Role</th>
                                                <th scope="col">Affiliation</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {researchTeam.map((member, index) => (
                                                <tr key={index}>
                                                    <td>{member.name}</td>
                                                    <td>{member.role}</td>
                                                    <td>{member.affiliation}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Col>

                        {/* Publications */}
                        <Col lg={12}>
                            <div className="mt-2">
                                <h5 className="fs-14 mb-3 text-uppercase fw-semibold">Related Publications</h5>
                                <ListGroup>
                                    {publications.map((publication, index) => (
                                        <ListGroupItem key={index}>
                                            <h6 className="mb-1">{publication.title}</h6>
                                            <p className="fs-13 text-muted mb-0">{publication.authors}</p>
                                            <p className="fs-13 text-muted mb-0">
                                                <i>{publication.journal}</i>, {publication.year}. DOI: {publication.doi}
                                            </p>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            </div>
                        </Col>

                        {/* Contact Info */}
                        <Col lg={12} className="mt-4">
                            <div className="p-3 bg-light rounded">
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0 me-3">
                                        <i className="ri-information-line text-muted fs-24"></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <h6 className="mb-0">For more information about this project</h6>
                                        <p className="fs-13 text-muted mb-0">Contact: Dr. Sarah Johnson (sjohnson@oceanic.edu)</p>
                                        <p className="fs-13 text-muted mb-0">Technical Support: support@marinetech.com</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default ResearchInfo; 
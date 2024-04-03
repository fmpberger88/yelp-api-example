import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './BusinessList.module.css';

import Business from "../Business/Business";

function BusinessList( {businesses} ) {
    return (
        <Row className={`justify-content-center ${styles.BusinessList}`}>
            {businesses.length > 0 ? (
                businesses.map((business, index) => (
                    <Col
                        key={index}
                        md={5}
                        lg={3}
                        className={`mb-4 ${styles.CustomCol}`}
                    >
                        <Business business={business} />
                    </Col>
                ))
            ) : (
                <Col xs={12} className="text-center">
                    <p>No result</p>
                </Col>
            )}
        </Row>
    );
}

export default BusinessList;

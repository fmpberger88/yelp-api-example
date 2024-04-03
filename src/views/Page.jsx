import { useState } from "react";
import styles from './Page.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Hier noch SearchBar und BusinessList importieren
import SearchBar from "../components/SearchBar/SearchBar";
import BusinessList from "../components/BusinessList/BusinessList";



function Page() {
    const [businesses, setBusinesses] = useState([])

    return (
        <Container fluid className="d-flex justify-content-center align-items-center flex-column">
            <Row className="mb-4">
                <Col xs={10} className="text-center">
                    <h1 className={`display-2 ${styles.Title}`}>GLEIPNIR</h1>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col xs={12} className="text-center">
                    <p>This app is using the Yelp API to find restaurants, cafes, and more.<br/>Start your search now!</p>
                </Col>
            </Row>
            <Row className={styles.searchBarRow}>
                <Col xs={12}>
                    <SearchBar setBusinesses={setBusinesses}/>
                    <BusinessList businesses={businesses}/>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col xs={12} className="text-center">
                    <footer>
                        <p>Copyright &copy; fmpberger 2023</p>
                        <p><a href="https://www.fmpberger.com">www.fmpberger.com</a></p>
                    </footer>
                </Col>
            </Row>
        </Container>
    );
}

export default Page;

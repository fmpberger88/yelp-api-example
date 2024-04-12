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
        <Container className={styles.container}>
            <Row className={styles.row}>
                <Col xs={10} className="text-center">
                    <h1 className={`display-2 ${styles.Title}`}>Yelp API</h1>
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
                        <p><a className={styles.footerLink} href="https://www.fmpberger.com">www.fmpberger.com</a></p>
                    </footer>
                </Col>
            </Row>
        </Container>
    );
}

export default Page;

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./Business.module.css";

// import yelp stars
import star0 from './yelp_stars/small_0@2x.png'
import star1 from './yelp_stars/small_1@2x.png'
import star1_half from './yelp_stars/small_1_half@2x.png'
import star2 from './yelp_stars/small_2@2x.png'
import star2_half from './yelp_stars/small_2_half@2x.png'
import star3 from './yelp_stars/small_3@2x.png'
import star3_half from './yelp_stars/small_3_half@2x.png'
import star4 from './yelp_stars/small_4@2x.png'
import star4_half from './yelp_stars/small_4_half@2x.png'
import star5 from './yelp_stars/small_5@2x.png'

const starImages = {
    0: star0,
    1: star1,
    1.5: star1_half,
    2: star2,
    2.5: star2_half,
    3: star3,
    3.5: star3_half,
    4: star4,
    4.5: star4_half,
    5: star5
}

function Business(businesses) {
    const rating = businesses.business.rating;
    const starImage = starImages[rating];
    return (
        <Card className={styles.BusinessCard}>
            <Card.Img variant="top" src={businesses.business.image_url} className={styles.CardImage}/>
            <Card.Body className={styles.CardBody}>
                <Card.Title className={styles.CardTitle}>{businesses.business.name}</Card.Title>
                <Card.Text className={styles.CardText}>
                    <div>
                        <p>{businesses.business.price}</p>
                        <p>{businesses.business.location.display_address[0]}</p> {/* First line: Street and Number */}
                        <p>{businesses.business.location.zip_code} {businesses.business.location.city}</p> {/* Second line: ZIP and City */}
                    </div>
                    <div>
                        <img src={starImage} alt={`${rating} stars`} />
                        <p>{`Based on ${businesses.business.review_count} reviews`}</p>
                    </div>
                </Card.Text>
                <a href={businesses.business.url} target="_blank" rel="noopener noreferrer">
                    <Button className={styles.btn}>More Information</Button>
                </a>
            </Card.Body>
        </Card>
    );
}

export default Business;

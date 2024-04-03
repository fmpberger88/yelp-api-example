import express from 'express';
import axios from 'axios';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config();

const YELP_API_KEY = process.env.YELP_API_KEY;
const YELP_BASE_URL = 'https://api.yelp.com/v3/businesses/search';
const YELP_AUTOCOMPLETE_URL = 'https://api.yelp.com/v3/autocomplete';

const app = express();

// *** Middleware *** //

// Helmet middleware
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                ...helmet.contentSecurityPolicy.getDefaultDirectives(),
                "img-src": ["'self'", "data:", "https: *.fl.yelpcdn.com"],
                "report-uri": ["/csp-violation-report-endpoint"]
            },
        },
    })
);

// cors middleware
app.use(cors());

// loggin middleware
app.use(morgan('dev'))

// rate limiting middleware
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10 // limit each IP to 10 requests per windowMs
})
// Apply rate limiting to the search API
app.use('/search', limiter);

// *** Routes *** //

// search yelp api route
app.get('/search', async (req, res) => {
    try {
        const { term, location, sort_by } = req.query;
        if (!term || typeof(term) !== "string" ||
            !location || typeof(location) !== "string" ||
            !sort_by || typeof(sort_by) !== "string"
        ) {
            return res.status(400).json({ error: 'Invalid parameters' });
        }
        const headers = {
            Authorization: `Bearer ${YELP_API_KEY}`
        };
        const yelpRes = await axios.get(YELP_BASE_URL, {
            headers,
            params: { term, location, sort_by }
        });
        res.json(yelpRes.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            // Der Request wurde ausgeführt und der Server antwortete mit einem Statuscode
            // der außerhalb des Bereichs von 2xx liegt
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
        } else if (error.request) {
            // Der Request wurde gesendet, aber es kam keine Antwort
            console.error(error.request);
        } else {
            // Etwas anderes beim Einrichten des Requests verursachte den Fehler
            console.error('Error', error.message);
        }
        res.status(500).json({ error: 'Ein interner Serverfehler ist aufgetreten.' });
    }
});

// api yelp autocomplete route
app.get('/autocomplete', async (req, res) => {
    try {
        const { text } = req.query;
        if (!text) {
           return res.status(400).send('missing parameter');
        }

        const headers = {
            Authorization: `Bearer ${YELP_API_KEY}`
        };

        const response = await axios.get(YELP_AUTOCOMPLETE_URL, { headers, params: { text }});

        res.status(200).json(response.data);

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

// health status
app.get('/api/health', (req, res) => {
    res.status(200).send("OK");
});

// *** Serve static files *** //
app.use(express.static(path.join(__dirname, 'dist')));

// get landing page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// error handling
app.use((err, req, res) => {
    console.error(err);
    res.status(500).send("Internal Server Error");
});

// *** Server Setup *** //
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


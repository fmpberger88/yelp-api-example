const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

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

// *** Routes *** //

// search yelp api route
app.get('/api/search', limiter, async (req, res) => {
    try {
        const { term, location, sort_by } = req.query; // extrat params from request
        if (!term || !location || !sort_by) {
            res.status(400).send("parameters missing");

            // Define headers
            const headers = {
                Authorization: `Bearer ${YELP_API_KEY}`
            }

            // fetch data
            const response = await axios.get(YELP_BASE_URL, { headers, params: { term, location, sort_by } });
            res.status(200).json(response.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error')
    }
});

// api yelp autocomplete route
app.get('/api/autocomplete', limiter, async (req, res) => {
    try {
        const { text } = req.query;
        if (!text) {
            res.status(400).send('missing parameter');
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
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
});

// *** Server Setup *** //
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


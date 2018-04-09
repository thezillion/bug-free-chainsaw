const express = require('express');
const server = express();
const PORT = 3000;
const pg = require('pg');

const conString = {
    database: 'practicedocker',
    port: 5432,
    host: 'postgres',
    user: 'postgres',
    password: 'toor'
};

var app = express();

var pool = new pg.Pool(conString);

app.use(function(req, res, next) {
    pool.connect(function (err, client, done) {
        if (err) {
            console.log('error fetching client from pool ', err)
        }
    })
    next();
});

app.get('/', (req, res, next) => {
    (async () => {
        const client = await pool.connect();
        try {
            const result = await client.query('INSERT INTO names (id, name) VALUES (DEFAULT, $1)', ['yay']);
            res.json(result.rows[0])
        } finally {
            client.release()
            next();
        }
    })().catch(e => console.log(e.stack));
});

app.use(function(req, res) {
    // pool.end();
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
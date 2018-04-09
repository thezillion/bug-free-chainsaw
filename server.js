const express = require('express');
const server = express();
const PORT = 3000;
const pg = require('pg');

pg.connect('postgres://postgres:toor@localhost:5432/practicedocker');

server.listen(PORT, () => console.log(`Server running on ${PORT}`));

server.get('/', (req, res) => {
    pg.connect(conString, function (err, client, done) {
        if (err) {
            res.send('error fetching client from pool ' + err)
        }
        client.query('SELECT $1::varchar AS my_first_query', ['names'], function (err, result) {
            done()
    
            if (err) {
             return res.send('error happened during query '+err)
            }
            res.json(result.rows[0])
            process.exit(0)
        })
    });
});

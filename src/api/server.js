const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
console.log(`Server is running on port`);

const dbConfig = {
  host: 'sql10.freesqldatabase.com',
  user: 'sql10639303',
  password: 'rB9pGq5qX6',
  database: 'sql10639303',
};

const pool = mysql.createPool(dbConfig);

app.get('/api/skills', (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Database Connection Error' });
    }

    connection.query('SELECT * FROM agr-skills', (queryError, results) => {
      connection.release();

      if (queryError) {
        console.error(queryError);
        return res.status(500).json({ error: 'Query Error' });
      }

      res.json(results);
    });
  });
});

const port = 3306;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

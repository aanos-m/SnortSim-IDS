// const express = require('express');
// const cors = require('cors');
// const sqlite3 = require('sqlite3').verbose();

// const app = express();
// const port = 5000;

// const db = new sqlite3.Database(':memory:'); // In-memory database for demonstration purposes

// app.use(cors());
// app.use(express.json()); // Middleware to parse JSON request bodies


// // Create the modules table if it doesn't exist
// db.run("CREATE TABLE IF NOT EXISTS modules (id INTEGER PRIMARY KEY, name TEXT, description TEXT)");


// // Add a module
// app.post('/modules', (req, res) => {
//     const { name, description } = req.body;

//     // Insert new module into the modules table
//     db.run("INSERT INTO modules (name, description) VALUES (?, ?)", [name, description], function(err) {
//         if (err) {
//             console.error(err.message);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         res.status(201).json({ message: 'Module added successfully', moduleId: this.lastID,});
//     });
// });

// // Delete a module by ID
// app.delete('/modules/:id', (req, res) => {
//     const moduleId = req.params.id;

//     // Delete module from the modules table
//     db.run("DELETE FROM modules WHERE id = ?", moduleId, function(err) {
//         if (err) {
//             console.error(err.message);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         res.status(200).json({ message: 'Module deleted successfully' });
//     });
// });

// app.get('/data', (req, res) => {
//      // Retrieve data from the modules table
//      db.all("SELECT id, name, description FROM modules", (err, rows) => {
//         if (err) {
//             console.error(err.message);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         res.json(rows);
//     });
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });



const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 5000;

const db = new sqlite3.Database('modules.db'); // File-based SQLite database

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Create the modules table if it doesn't exist
db.run("CREATE TABLE IF NOT EXISTS modules (id INTEGER PRIMARY KEY, name TEXT, description TEXT)");

// Retrieve data from the modules table when the server starts
let modules = [];
db.all("SELECT id, name, description FROM modules", (err, rows) => {
    if (err) {
        console.error(err.message);
    } else {
        modules = rows;
    }
});

// Add a module
app.post('/modules', (req, res) => {
    const { name, description } = req.body;

    // Insert new module into the modules table
    db.run("INSERT INTO modules (name, description) VALUES (?, ?)", [name, description], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        const moduleId = this.lastID;
        const newModule = { id: moduleId, name, description };
        modules.push(newModule); // Add the new module to the in-memory modules array
        res.status(201).json({ message: 'Module added successfully', moduleId });
    });
});

// Delete a module by ID
app.delete('/modules/:id', (req, res) => {
    const moduleId = req.params.id;

    // Delete module from the modules table
    db.run("DELETE FROM modules WHERE id = ?", moduleId, function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        const index = modules.findIndex(module => module.id === parseInt(moduleId));
        if (index !== -1) {
            modules.splice(index, 1); // Remove the deleted module from the in-memory modules array
        }
        res.status(200).json({ message: 'Module deleted successfully' });
    });
});

// Retrieve all modules
app.get('/modules', (req, res) => {
    res.json(modules);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

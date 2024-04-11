const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const basePath = process.cwd();
const dataDirectory = path.join(basePath, 'data');
const jsonOutputPath = path.join(dataDirectory, 'addresses.json');
const csvFilePath = path.join(dataDirectory, 'addresses.csv');

const results = [];

fs.createReadStream(csvFilePath)
    .pipe(csv()) // Now expecting headers
    .on('data', (row) => {
        // Use the correct key to access the value, depending on your CSV header
        results.push(row.address);
    })
    .on('end', () => {
        // This will only write if all entries are defined (none are undefined)
        if (results.every(entry => entry !== undefined)) {
            fs.writeFile(jsonOutputPath, JSON.stringify(results, null, 4), (err) => {
                if (err) {
                    console.error('Error writing JSON file:', err);
                } else {
                    console.log('Successfully converted CSV to JSON at:', jsonOutputPath);
                }
            });
        } else {
            console.error('Some addresses could not be read correctly, please check CSV format.');
        }
    });

const basePath = process.cwd();
const fs = require('fs');
const path = require('path');

// Specify the directory where your JSON files are stored
const jsonDirectory = path.join(basePath, 'build/json');

// Read the directory contents
fs.readdir(jsonDirectory, (err, files) => {
    if (err) {
        console.error('Could not list the directory.', err);
        process.exit(1);
    }

    // Filter JSON files and exclude _metadata.json
    const jsonFiles = files.filter(file => file.endsWith('.json') && file !== '_metadata.json');

    // Initialize an array to hold all the data
    const allData = [];

    // Process each JSON file
    jsonFiles.forEach(file => {
        // Read the JSON file
        const rawdata = fs.readFileSync(path.join(jsonDirectory, file));
        // Parse the JSON data
        const data = JSON.parse(rawdata);

        // Add the data to the allData array
        allData.push(data);
    });

    // Write the combined data to _metadata.json
    fs.writeFileSync(
        path.join(jsonDirectory, '_metadata.json'),
        JSON.stringify(allData, null, 2)
    );

    console.log('Successfully created _metadata.json with combined JSON data.');
});

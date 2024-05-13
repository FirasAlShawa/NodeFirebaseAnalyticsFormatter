const fs = require('fs');
const csv = require('csv-parser');
const { createObjectCsvWriter } = require('csv-writer');

// Function to read CSV file
function readCSV(filePath, callback) {
    const results = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            callback(null, results);
        })
        .on('error', (error) => {
            callback(error, null);
        });
}

// Function to edit CSV data
function editCSV(data) {
    // Edit your CSV data here
    // For example, let's add a new column called 'edited_column' with some data
    console.log(data);
    data.forEach((row) => {
        row.edited_column = 'edited_data';
    });
    return data;
}

// Function to write CSV file
function writeCSV(data, outputPath, callback) {
    const csvWriter = createObjectCsvWriter({
        path: outputPath,
        header: Object.keys(data[0]).map((key) => ({ id: key, title: key })),
    });

    csvWriter
        .writeRecords(data)
        .then(() => {
            callback(null);
        })
        .catch((error) => {
            callback(error);
        });
}

// Function to remove a line from CSV data
function removeLine(data, lineToRemove) {
    return data.filter((row) => {
        // Assuming lineToRemove is an object representing the line to be removed
        // You can define your own logic for identifying the line to remove
        // Here, we are removing the line if all the values match
        return Object.keys(row).every((key) => row[key] !== lineToRemove[key]);
    });
}

// Example usage
const inputFilePath = './csvs/data-export (33).csv';
const outputFilePath = 'output.csv';

readCSV(inputFilePath, (error, data) => {
    if (error) {
        console.error('Error reading CSV:', error);
        return;
    }

    // Edit CSV data
    const editedData = editCSV(data);

    // Write edited data to a new CSV file
    writeCSV(editedData, outputFilePath, (writeError) => {
        if (writeError) {
            console.error('Error writing CSV:', writeError);
            return;
        }
        console.log('CSV file saved successfully.');
    });
});

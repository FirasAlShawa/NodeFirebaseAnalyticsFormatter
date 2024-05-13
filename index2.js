const fs = require('fs');
var startDate = '';
var endDate = '';

// Function to remove specific lines from an array of lines
function removeLines(lines, lineNumbersToRemove) {
    return lines.filter((_, index) => !lineNumbersToRemove.includes(index));
}

// Function to remove specific lines from an array of lines
function addStartAndEndDate(lines,startDate,endDate) {
    lines.map((val)=>console.log(val));
}


// Function to save modified content back to the file
function saveToFile(filePath, content) {
    fs.writeFile(filePath, content.join('\n'), (err) => {
        if (err) {
            console.error('Error saving file:', err);
            return;
        }
        console.log('File saved successfully.');
    });
}

// Example usage
const filePath = './csvs/data-export (33).csv';
const lineNumbersToRemove = [0,1,2,3,4]; // Specify line numbers to remove

// Read the CSV file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Split the file content into lines
    const lines = data.split('\n');

    // Remove specific lines
    const modifiedLines = removeLines(lines, lineNumbersToRemove);
    
    addStartAndEndDate(modifiedLines,modifiedLines[0].split(":")[1].trim(),modifiedLines[1].split(":")[1].trim());

    // Save modified content back to the file
    saveToFile(filePath, modifiedLines);
    
    addStartAndEndDate(modifiedLines,modifiedLines[0].split(":")[1].trim(),modifiedLines[1].split(":")[1].trim());
});

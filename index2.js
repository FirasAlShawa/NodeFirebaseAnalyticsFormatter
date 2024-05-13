const fs = require('fs');
const path = require('path');


// Function to remove specific lines from an array of lines
function removeLines(lines, lineNumbersToRemove) {
    return lines.filter((_, index) => !lineNumbersToRemove.includes(index));
}

// Function to remove specific lines from an array of lines
function addStartAndEndDate(lines,startDate,endDate) {
    var updatedList = [];
    lines.forEach((element,index) => {
        if(index == 0){
            // updatedList.push(`${element.replace(/\r/g, "")},Start Date,End Date`);
            return;
        }
        updatedList.push(element.replace(/\r/g, "")+","+startDate+","+endDate);
    });
    return updatedList;
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

// Function to read files from a folder
function readFilesFromFolder(folderPath, callback) {
    saveTextfile(['Event name,Event count,Total users,Event count per user,Total revenue,Start Date,End Date']);
    fs.readdir(folderPath, (err, files) => {

        if (err) {
            callback(err, null);
            return;
        }

        // Iterate through each file in the folder
        files.forEach((file,index) => {
            const filePath = path.join(folderPath, file);
            var globalList = [];
            if(index == 0){
                globalList.push('\n');
            }

            // Read each file
            fs.readFile(filePath, 'utf8', (readErr, data) => {
                if (readErr) {
                    callback(readErr, null);
                    return;
                }
                
                // Split the file content into lines
                const lines = data.split('\n');

                // Remove specific lines
                var modifiedLines = removeLines(lines, lineNumbersToRemove);

                const startDate = modifiedLines[0].split(":")[1].trim();
                const endDate = modifiedLines[0].split(":")[1].trim();
                
                modifiedLines = removeLines(modifiedLines, [0,1]);

                // console.log(modifiedLines);

                const finalResults = addStartAndEndDate(modifiedLines,startDate,endDate);
               
                // console.log(finalResults);
                globalList.push(...finalResults);
                globalList.push('\n');
                // Save modified content back to the file
                saveToFile(filePath, finalResults);
                saveTextfile(globalList);

                // You can pass the file data to the callback if needed
                // callback(null, data);
            });
        });
    });


    // saveToFile('./output.csv',globalList.toString());
}

// Example usage
const filePath = './csvs/data-export (33).csv';
const lineNumbersToRemove = [0,1,2,3,4]; // Specify line numbers to remove

// Read the CSV file
// fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading file:', err);
//         return;
//     }

//     // Split the file content into lines
//     const lines = data.split('\n');

//     // Remove specific lines
//     var modifiedLines = removeLines(lines, lineNumbersToRemove);

//     const startDate = modifiedLines[0].split(":")[1].trim();
//     const endDate = modifiedLines[0].split(":")[1].trim();
    
//     modifiedLines = removeLines(modifiedLines, [0,1]);
//     console.log(modifiedLines);
//     const finalResults = addStartAndEndDate(modifiedLines,startDate,endDate);
//     console.log(finalResults);
//     // Save modified content back to the file
//     saveToFile(filePath, finalResults);    
// });


// Example usage
const folderPath = './csvs';

// saveToFile("./output.csv",['hi','tw','hssdfdf'].toString());

readFilesFromFolder(folderPath, (err, data) => {
    if (err) {
        console.error('Error reading files:', err);
        return;
    }
    // Handle data if needed
});

// File path
function saveTextfile(content){
    const filePath = './output.txt';

// Write the content to the file
console.log(content);
fs.appendFile(filePath, content.join('\n'), 'utf8', (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File updated successfully.');
});
}
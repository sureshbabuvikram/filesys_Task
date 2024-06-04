const express = require('express');
const fs = require('fs');
const { format } = require('date-fns');

const app = express();

// Set the time zone environment variable
process.env.TZ = 'UTC';

app.get('/', (req, res) => {
    const currentDate = new Date();
    const today = format(currentDate, "dd-MM-yyyy-HH-mm-ss", { timeZone: "UTC" });

    const filePath = `TimeStamp/${today}.txt`;

    // Write the timestamp to the file asynchronously
    fs.writeFile(filePath, `${today}`, 'utf8', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
            return;
        }

        // Read the file asynchronously after it has been written
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal server error');
                return;
            }

            try {
                res.status(200).send(data);
            } catch (error) {
                res.status(500).send('Internal server error');
            }
        });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
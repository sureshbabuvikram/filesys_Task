const express = require('express');
const fs = require('fs');
const { format } = require('date-fns');

const app = express();

app.get('/', (req, res) => {
    const currentDate = new Date();
    const today = format(currentDate, "dd-MM-yyyy-HH-mm-ss", { timeZone: "UTC" });

    const filePath = `TimeStamp/${today}.txt`;
    fs.writeFileSync(filePath, `${today}`, 'utf8');
    let data = fs.readFileSync(filePath, 'utf8');

    try {
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;

    // Here, add your code to upload the file to IPFS and get the CID.
    // For demonstration, let's just return a mock CID.
    const mockCID = 'QmXXXXXX'; // Replace with actual CID from IPFS upload

    res.send({ cid: mockCID });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

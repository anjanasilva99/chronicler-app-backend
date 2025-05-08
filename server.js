const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(cors());

function calculateTotalDistance(list1, list2) {
  const sortedList1 = [...list1].sort((a, b) => a - b);
  const sortedList2 = [...list2].sort((a, b) => a - b);
  
  if (sortedList1.length !== sortedList2.length) {
    throw new Error("Lists must be of equal length");
  }
  
  let totalDistance = 0;
  for (let i = 0; i < sortedList1.length; i++) {
    const distance = Math.abs(sortedList1[i] - sortedList2[i]);
    totalDistance += distance;
  }
  
  return totalDistance;
}

function parseInputFile(filename) {
  const list1 = [];
  const list2 = [];
  
  const content = fs.readFileSync(filename, 'utf8');
  const lines = content.trim().split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {
      const parts = line.split(/\s+/);
      if (parts.length >= 2) {
        list1.push(parseInt(parts[0], 10));
        list2.push(parseInt(parts[1], 10));
      }
    }
  }
  
  return [list1, list2];
}

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(null, 'input-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post('/api/calculate', upload.single('inputFile'), (req, res) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }
    
    const filePath = req.file.path;
    
    const [list1, list2] = parseInputFile(filePath);
    
    const totalDistance = calculateTotalDistance(list1, list2);
    
    const sortedList1 = [...list1].sort((a, b) => a - b);
    const sortedList2 = [...list2].sort((a, b) => a - b);
    
    const distances = sortedList1.map((val, idx) => Math.abs(val - sortedList2[idx]));
    
    res.json({
      success: true,
      data: {
        originalList1: list1,
        originalList2: list2,
        sortedList1,
        sortedList2,
        distances,
        totalDistance,
        count: list1.length,
        averageDistance: (totalDistance / list1.length).toFixed(2),
        maxDistance: Math.max(...distances)
      }
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
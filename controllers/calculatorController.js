import { parseInputFile } from '../utils/fileParser.js';
import { processResults } from '../services/calculatorService.js';

function calculate(req, res) {
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }
    
    const filePath = req.file.path;
    
    const [list1, list2] = parseInputFile(filePath);
    const results = processResults(list1, list2);
    
    res.json({
      success: true,
      data: results
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

export { calculate };
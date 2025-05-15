import fs from "fs";

function parseInputFile(filename) {
  try {
    const list1 = [];
    const list2 = [];

    const content = fs.readFileSync(filename, "utf8");
    const lines = content.trim().split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const parts = line.split(/\s+/);
        if (parts.length >= 2) {
          const num1 = parseInt(parts[0], 10);
          const num2 = parseInt(parts[1], 10);

          // Check if the parsed values are valid integers
          if (isNaN(num1) || isNaN(num2)) {
            throw new Error(
              `Invalid number found at line ${
                i + 1
              }. Only integers are allowed.`
            );
          }

          list1.push(num1);
          list2.push(num2);
        } else {
          throw new Error(
            `Invalid format at line ${
              i + 1
            }. Each line must contain two numbers.`
          );
        }
      }
    }

    // Check if lists are empty
    if (list1.length === 0 || list2.length === 0) {
      throw new Error("No valid data found in the file.");
    }

    return [list1, list2];
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`File not found: ${filename}`);
    } else if (error.code === "EISDIR") {
      throw new Error(`Expected a file but got a directory: ${filename}`);
    } else if (error.message.includes("Invalid")) {
      // Re-throw validation errors
      throw error;
    } else {
      throw new Error(`Error parsing input file: ${error.message}`);
    }
  }
}

export { parseInputFile };
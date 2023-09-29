const express = require('express');
const bodyParser = require('body-parser');
const nlp = require('compromise');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Function to parse voice commands and return actionable commands
function parseVoiceCommand(audio) {
  try {
    // Use compromise to process the voice command and extract meaningful information
    const doc = nlp(audio);

    // Implement logic to classify and extract actionable commands based on parsed data
    const actionableCommand = classifyVoiceCommand(doc);

    return actionableCommand;
  } catch (error) {
    console.error('Error parsing voice command:', error);
    return null;
  }
}

// Function to classify and extract actionable commands
function classifyVoiceCommand(doc) {
  // Implement your logic here to classify and extract actionable commands
  // For this example, we'll use a simplified mock
  const text = doc.out('text').toLowerCase();

  if (text.includes('add') && text.includes('blue box')) {
    return 'addBox("blue")';
  } else if (text.includes('switch') && text.includes('dark mode')) {
    return 'switchToDarkMode()';
  } else {
    return 'unrecognizedCommand()';
  }
}

app.post('/voice-command', (req, res) => {
  const { audio } = req.body;

  // Parse the voice command
  const actionableCommand = parseVoiceCommand(audio);

  // Execute the parsed actionable command (this is a mock for demonstration)
  const response = executeActionableCommand(actionableCommand);

  res.json(response);
});

// Mock function to execute the parsed actionable command (customize this for your app)
function executeActionableCommand(actionableCommand) {
  try {
    // In a real application, you would execute the corresponding actions here
    // For this example, we'll return a simple success message
    console.log('Executing actionable command:', actionableCommand);
    return { success: true, message: 'Command executed successfully' };
  } catch (error) {
    console.error('Error executing command:', error);
    return { success: false, error: 'Error executing command' };
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

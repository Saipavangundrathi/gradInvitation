// Script to run the project locally with a specified port
// Run with: node local-start.js

import { exec } from 'child_process';

// Set a default port that's different from 5000 to avoid conflicts
const port = process.env.PORT || 3000;

console.log(`Starting the application on port ${port}...`);
console.log('------------------------------------------');
console.log(`Once started, access the app at: http://localhost:${port}`);
console.log('Press Ctrl+C to stop the server');
console.log('------------------------------------------');

// Run the server with the specified port
const server = exec(`PORT=${port} npm run dev`);

// Forward stdout and stderr to the console
server.stdout.on('data', (data) => {
  console.log(data.toString().trim());
});

server.stderr.on('data', (data) => {
  console.error(data.toString().trim());
});

// Handle server exit
server.on('exit', (code) => {
  console.log(`Server process exited with code ${code}`);
});

// Handle the script being terminated
process.on('SIGINT', () => {
  console.log('Stopping server...');
  server.kill();
  process.exit();
});
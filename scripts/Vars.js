import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const variableMapping = {
  // SQL related
  sqlEditor: 'detectiveQueryEditor',
  sqlWorkspace: 'investigationWorkspace',
  sqlResults: 'queryFindings',
  sqlQuery: 'detectiveQuery',
  executeQuery: 'runInvestigation',

  // Database related
  db: 'evidenceDB',
  dbInstance: 'caseDatabase',
  dbConnection: 'evidenceConnection',

  // State related
  isLoading: 'isInvestigating',
  error: 'investigationError',
  results: 'evidence'
};

function renameInFile(filePath) {
  console.log(`Processing: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');

  Object.entries(variableMapping).forEach(([oldName, newName]) => {
    const regex = new RegExp(`\\b${oldName}\\b`, 'g');
    content = content.replace(regex, newName);
  });

  fs.writeFileSync(filePath, content);
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
      renameInFile(fullPath);
    }
  });
}

const srcPath = path.join(process.cwd(), 'src');
processDirectory(srcPath);
console.log('Variable renaming completed!');
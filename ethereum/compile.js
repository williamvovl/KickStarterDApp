const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

// ensure this path exists. if not, it will create the path
fs.ensureDirSync(buildPath);

for (const contract in output) {
  fs.outputJsonSync(path.resolve(buildPath, `${contract.replace(':', '')}.json`), output[contract]);
}

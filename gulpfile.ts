/* eslint-disable node/no-unpublished-import */
import * as path from 'path';
import {
  accessSync,
  readFileSync,
  writeFileSync,
  PathLike,
  constants,
} from 'fs';
import { task } from 'gulp';
import * as minimist from 'minimist';
import { spawn } from 'promisify-child-process';

const FILE_NAME = 'python-libraries.json';
const FILE_PATH = path.join(__dirname, FILE_NAME);

const isExists = (path: PathLike) => {
  try {
    accessSync(path, constants.F_OK);
  } catch (error) {
    return false;
  }
  return true;
};

const getFile = (path: PathLike) =>
  JSON.parse(JSON.stringify(readFileSync(path, 'utf8')));

const writeDependencies = (libName: string, version = '') => {
  let content = {};
  if (isExists(FILE_PATH)) content = JSON.parse(getFile(FILE_PATH));
  content[libName] = version;
  writeFileSync(FILE_PATH, JSON.stringify(content, null, 4));
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const install = async (libName: string, version = '') => {
  const { stdout, stderr } = await spawn(
    path.join(__dirname, '.', 'node_modules', '.bin', 'bip'),
    ['install', libName],
    { encoding: 'utf8' }
  );
  console.log(stdout);
  console.log(stderr);
};

task('pip install', async done => {
  const argv = minimist(process.argv.slice(2));
  if ('lib' in argv) {
    const pkg = argv['lib'] as string;
    const libName = pkg.split('@')[0];
    const version = pkg.split('@')[1];
    await install(libName, version);
    writeDependencies(libName, version);
  }
  done();
});

task('pip sync', async done => {
  if (isExists(FILE_PATH)) {
    const content = JSON.parse(getFile(FILE_PATH));
    for (const libName in content) {
      const version = content[libName];
      await install(libName, version);
    }
  }
  done();
});

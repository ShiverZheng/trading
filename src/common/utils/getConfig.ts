import * as fs from 'fs';
import path from 'path';
import { parse } from 'yaml';

interface Config {
  service: {
    port: number;
    keys: string;
  };
  joinQuant: {
    account: string;
    password: string;
  };
}

let cachedConfig: Config | null = null;

const getConfig = () => {
  if (cachedConfig) return cachedConfig;
  const configPath = path.join(process.cwd(), 'config.yml');
  const file = fs.readFileSync(configPath, 'utf-8');
  const config = parse(file) as Config;
  cachedConfig = config;
  return cachedConfig;
};

export default getConfig;

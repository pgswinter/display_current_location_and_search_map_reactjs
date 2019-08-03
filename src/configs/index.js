import _envs from './envs';
export const appName = 'location_map';
export const currentEnvName = process.env.REACT_APP_STAGE || 'development';
export const envs = _envs;
export const currentEnv = _envs[currentEnvName];

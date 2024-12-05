import type { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/test', '<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleNameMapper: {
    '^application/(.*)$': '<rootDir>/src/application/$1',
    '^domain/(.*)$': '<rootDir>/src/domain/$1',
    '^infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
  },
};

export default config;

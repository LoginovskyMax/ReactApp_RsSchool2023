/// <reference types="jest" />
import '@testing-library/jest-dom';
import fetch, { Request, Response } from 'cross-fetch';
import { mockServer } from './utils';

global.fetch = fetch;
global.Request = Request;
global.Response = Response;

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

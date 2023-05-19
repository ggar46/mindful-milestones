import { expect, afterEach} from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';


//extends expect meethod from react-testing-library
expect.extend(matchers);

//runs a cleanup aftr each test
afterEach(() => {
    cleanup();
})
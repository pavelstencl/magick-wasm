// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { Quantum } from '../../src/quantum';

beforeAll(() => { ImageMagick._api = global.native; });

describe('Quantum#depth', () => {
    it('should return the correct value', () => {
        expect(Quantum.depth).toBe(8);
    });
});

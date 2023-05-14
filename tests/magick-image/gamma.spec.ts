// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestFiles } from '../test-files';

describe('MagickImage#gamma', () => {
    it('should return the gamma of the image', async () => {
        await TestFiles.Builtin.logo.read(image => {
            expect(image.gamma).toBeCloseTo(0.4545);
        });
    });
});

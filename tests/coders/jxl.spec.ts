// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickFormat } from '../../src/magick-format';
import { TestFiles } from '../test-files';

describe('Coders#jxl', () => {
    it('should be able to write jxl image', async () => {
        await TestFiles.Builtin.logo.read((image) => {
            image.write(MagickFormat.Jxl, data => {
                expect(data.length).toBe(31570);
            });
        });
    });
});

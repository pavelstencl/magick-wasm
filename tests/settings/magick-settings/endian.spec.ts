// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Endian } from '../../../src/endian';
import { ImageMagick } from '../../../src/image-magick';
import { MagickFormat } from '../../../src/magick-format';
import { TestImages } from '../../test-images';

describe('MagickSettings#endian', () => {
    it('should be used when writing the image', () => {
        TestImages.redPng.use(input => {
            expect(input.endian).toBe(Endian.Undefined);

            input.settings.endian = Endian.LSB;

            input.write(MagickFormat.Ipl, (data) => {
                ImageMagick.read(data, MagickFormat.Ipl, output => {
                    expect(output.endian).toBe(Endian.LSB);
                });
            });
        });
    });
});

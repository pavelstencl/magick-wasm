// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { Interlace } from '../../src/interlace';
import { MagickFormat } from '../../src/magick-format';
import { TestFiles } from '../test-files';

describe('MagickSettings#interlace', () => {
    it('should change the interlace of the image', async () => {
        await TestFiles.redPng.read(input => {
            input.settings.interlace = Interlace.Gif;
            input.write(MagickFormat.Gif, (data) => {
                ImageMagick.read(data, output => {
                    expect(output.interlace).toBe(Interlace.Gif);
                });
            });
        });
    });
});

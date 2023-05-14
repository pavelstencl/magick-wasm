// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickColors } from '../../src/magick-colors';
import { TestFiles } from '../test-files';

describe('MagickImage#boundingBox', () => {
    it('should return the correct rectangle', async () => {
        await TestFiles.Builtin.wizard.read(image => {
            const rectangle = image.boundingBox;

            expect(rectangle).not.toBeNull();
            if (rectangle !== null) {
                expect(rectangle.width).toBe(480);
                expect(rectangle.height).toBe(629);
                expect(rectangle.x).toBe(0);
                expect(rectangle.y).toBe(11);
            }
        });
    });

    it('should return null when there is no bounding box', async () => {
        await TestFiles.Builtin.wizard.read(image => {
           image.inverseOpaque(MagickColors.Purple, MagickColors.Black);

            const rectangle = image.boundingBox;

            expect(rectangle).toBeNull();
         });
    });
});

/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { DistortSettings } from '../../../src/settings/distort-settings';
import { ImageMagick } from '../../../src/image-magick';
import { MagickGeometry } from '../../../src/magick-geometry';
import { MagickImage } from '../../../src/magick-image';

beforeEach(() => { ImageMagick._api = (global as any).native; });

describe('DistortSettings#setArtifacts', () => {
    it('should not add the artifacts to the image when properties are not set', () => {
        const image = MagickImage.create();
        const settings = new DistortSettings();

        settings._setArtifacts(image);

        expect(image.artifactNames.length).toBe(0);
    });

    it('should add the scale artifact to the image', () => {
        const image = MagickImage.create();
        const settings = new DistortSettings();

        settings.scale = 4.5;
        settings._setArtifacts(image);

        expect(image.getArtifact('distort:scale')).toBe('4.5');
    });

    it('should add the viewport artifact to the image', () => {
        const image = MagickImage.create();
        const settings = new DistortSettings();

        settings.viewport = new MagickGeometry(1, 2, 3, 4);
        settings._setArtifacts(image);

        expect(image.getArtifact('distort:viewport')).toBe('3x4+1+2');
    });
});
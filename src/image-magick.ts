// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import MagickNative, { ImageMagickApi } from '@dlemstra/magick-native/magick';
import { IMagickImage, MagickImage } from './magick-image';
import { IMagickImageCollection, MagickImageCollection } from './magick-image-collection';
import { MagickColor } from './magick-color';
import { MagickError } from './magick-error';
import { MagickReadSettings } from './settings/magick-read-settings';
import { _withNativeString } from './internal/native/string';

export class ImageMagick {
    private readonly loader: () => Promise<void>;
    private api?: ImageMagickApi;

    private constructor() {
        this.loader = () => new Promise(resolve => {
            if (this.api !== undefined) {
                resolve();
                return;
            }

            MagickNative().then(api => {
                _withNativeString(api, 'MAGICK_CONFIGURE_PATH', name => {
                    _withNativeString(api, '/xml', value => {
                        api._Environment_SetEnv(name, value);
                        this.api = api;
                    });
                });
                resolve();
            });
        });
    }

    static _create = (): ImageMagick => new ImageMagick();

    /** @internal */
    async _initialize(): Promise<void> { await this.loader(); }

    /** @internal */
    static get _api(): ImageMagickApi {
        if (!instance.api)
            throw new MagickError('`await initializeImageMagick` should be called to initialize the library');

        return instance.api;
    }

    /** @internal */
    static set _api(value: ImageMagickApi) {
        instance.api = value;
    }

    static read(color: MagickColor, width: number, height: number, func: (image: IMagickImage) => void | Promise<void>): (void | Promise<void>);
    static read(array: Uint8Array, settings: MagickReadSettings, func: (image: IMagickImage) => void | Promise<void>): (void | Promise<void>);
    static read(array: Uint8Array, func: (image: IMagickImage) => void | Promise<void>): (void | Promise<void>);
    static read(fileName: string, settings: MagickReadSettings, func: (image: IMagickImage) => void | Promise<void>): (void | Promise<void>);
    static read(fileName: string, func: (image: IMagickImage) => void | Promise<void>): (void | Promise<void>);
    static read(colorOrArrayOrFileName: MagickColor | Uint8Array | string, widthOrSettingsOrFunc: number | MagickReadSettings | ((image: IMagickImage) => void | Promise<void>) , heightOrFunc?: number | ((image: IMagickImage) => void | Promise<void>), func?: (image: IMagickImage) => void | Promise<void>): void | Promise<void> {
        MagickImage._use(image => {
            if (colorOrArrayOrFileName instanceof MagickColor) {
                if (typeof widthOrSettingsOrFunc === 'number' && typeof heightOrFunc === 'number')
                    image.read(colorOrArrayOrFileName, widthOrSettingsOrFunc, heightOrFunc);

                if (func !== undefined)
                    return func(image);
            } else if (widthOrSettingsOrFunc instanceof MagickReadSettings) {
                if (typeof colorOrArrayOrFileName === 'string')
                    image.read(colorOrArrayOrFileName, widthOrSettingsOrFunc);
                else
                    image.read(colorOrArrayOrFileName, widthOrSettingsOrFunc);

                if (heightOrFunc !== undefined && typeof heightOrFunc !== 'number')
                    return heightOrFunc(image);
            } else {
                if (typeof colorOrArrayOrFileName === 'string')
                    image.read(colorOrArrayOrFileName);
                else
                    image.read(colorOrArrayOrFileName);

                if (typeof widthOrSettingsOrFunc !== 'number')
                    return widthOrSettingsOrFunc(image);
            }
        });
    }

    static readCollection(fileName: string, func: (images: IMagickImageCollection) => void| Promise<void>): Promise<void>;
    static readCollection(array: Uint8Array, func: (images: IMagickImageCollection) => void): void;
    static readCollection(array: Uint8Array, func: (image: IMagickImageCollection) => Promise<void>): Promise<void>;
    static readCollection(fileName: string, settings: MagickReadSettings, func: (images: IMagickImageCollection) => void): void;
    static readCollection(fileName: string, settings: MagickReadSettings, func: (images: IMagickImageCollection) => Promise<void>): Promise<void>;
    static readCollection(array: Uint8Array, settings: MagickReadSettings, func: (images: IMagickImageCollection) => void): void;
    static readCollection(array: Uint8Array, settings: MagickReadSettings, func: (images: IMagickImageCollection) => Promise<void>): Promise<void>;
    static readCollection(fileNameOrArray: string | Uint8Array , funcOrSettings: MagickReadSettings | ((images: IMagickImageCollection) => void | Promise<void>), func?: (images: IMagickImageCollection) => void | Promise<void>): void | Promise<void> {
        const collection = MagickImageCollection.create();
        return collection._use(images => {
            if (funcOrSettings instanceof MagickReadSettings) {
                if (typeof fileNameOrArray === 'string')
                    images.read(fileNameOrArray, funcOrSettings);
                else
                    images.read(fileNameOrArray, funcOrSettings);

                if (func !== undefined)
                    return func(images);
            } else {
                if (typeof fileNameOrArray === 'string')
                    images.read(fileNameOrArray);
                else
                    images.read(fileNameOrArray);

                return funcOrSettings(images);
            }
        });
    }

    static readFromCanvas(canvas: HTMLCanvasElement, func: (image: IMagickImage) => void): void;
    static readFromCanvas(canvas: HTMLCanvasElement, func: (image: IMagickImage) => Promise<void>): Promise<void>;
    static readFromCanvas(canvas: HTMLCanvasElement, func: (image: IMagickImage) => void | Promise<void>): void | Promise<void> {
        return MagickImage._use(image => {
            image.readFromCanvas(canvas);
            return func(image);
        });
    }
}

/** @internal */
const instance = ImageMagick._create();

export async function initializeImageMagick(): Promise<void> { await instance._initialize() }

// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawingSettings } from '../settings/drawing-settings';
import { Exception } from '../internal/exception/exception';
import { Gravity } from '../gravity';
import { IDisposable } from '../disposable';
import { IDrawable } from './drawable';
import { ImageMagick } from '../image-magick';
import { IMagickImage } from '../magick-image';
import { MagickColor } from '../magick-color';
import { MagickSettings } from '../settings/magick-settings';
import { NativeInstance } from '../native-instance';
import { PaintMethod } from '../paint-method';
import { TextAlignment } from '../text-alignment';
import { TextDecoration } from '../text-decoration';
import { _withString } from '../internal/native/string';

export interface IDrawingWand extends IDisposable {
    color(x: number, y: number, paintMethod: number): void;
    draw(drawables: IDrawable[]): void;
    fillColor(value: MagickColor): void;
    fillOpacity(value: number): void;
    font(family: string): void;
    fontPointSize(value: number): void;
    gravity(value: Gravity): void;
    rectangle(upperLeftX: number, upperLeftY: number, lowerRightX: number, lowerRightY: number): void;
    roundRectangle(upperLeftX: number, upperLeftY: number, lowerRightX: number, lowerRightY: number, cornerWidth: number, cornerHeight: number): void;
    text(x: number, y: number, value: string): void;
    textAlignment(value: TextAlignment): void;
    textAntialias(value: boolean): void;
    textDecoration(value: TextDecoration): void;
    textInterlineSpacing(value: number): void;
    textInterwordspacing(value: number): void;
    textKerning(value: number): void;
    textUnderColor(value: MagickColor): void;
}

export class DrawingWand extends NativeInstance implements IDrawingWand {
    private constructor(image: IMagickImage, magickSettings: MagickSettings) {
        const drawingSettings = DrawingSettings._create(magickSettings);
        const instance = drawingSettings._use(settings => {
            return ImageMagick._api._DrawingWand_Create(image._instance, settings._instance);
        });
        const disposeMethod = ImageMagick._api._DrawingWand_Dispose;
        super(instance, disposeMethod);
    }

    color(x: number, y: number, paintMethod: PaintMethod): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_Color(this._instance, x, y, paintMethod, exception);
        });
    }

    draw(drawables: IDrawable[]): void {
        drawables.forEach(drawable => {
            drawable.draw(this);
        });

        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_Render(this._instance, exception);
        });
    }

    fillColor(value: MagickColor): void {
        Exception.usePointer(exception => {
            value._use(valuePtr => {
                ImageMagick._api._DrawingWand_FillColor(this._instance, valuePtr, exception);
            });
        });
    }

    fillOpacity(value: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_FillOpacity(this._instance, value, exception);
        });
    }

    font(fileName: string): void {
        Exception.usePointer(exception => {
            _withString(fileName, ptr => {
                ImageMagick._api._DrawingWand_Font(this._instance, ptr, exception);
            });
        });
    }

    fontPointSize(value: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_FontPointSize(this._instance, value, exception);
        });
    }

    gravity(value: Gravity): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_Gravity(this._instance, value, exception);
        });
    }

    rectangle(upperLeftX: number, upperLeftY: number, lowerRightX: number, lowerRightY: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_Rectangle(this._instance, upperLeftX, upperLeftY, lowerRightX, lowerRightY, exception);
        });
    }

    roundRectangle(upperLeftX: number, upperLeftY: number, lowerRightX: number, lowerRightY: number, cornerWidth: number, cornerHeight: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_RoundRectangle(this._instance, upperLeftX, upperLeftY, lowerRightX, lowerRightY, cornerWidth, cornerHeight, exception);
        });
    }

    text(x: number, y: number, value: string): void {
        Exception.usePointer(exception => {
            _withString(value, valuePtr => {
                ImageMagick._api._DrawingWand_Text(this._instance, x, y, valuePtr, exception);
            });
        });
    }

    textAlignment(value: TextAlignment): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_TextAlignment(this._instance, value, exception);
        });
    }

    textAntialias(value: boolean): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_TextAntialias(this._instance, value ? 1 : 0, exception);
        });
    }

    textDecoration(value: TextDecoration): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_TextDecoration(this._instance, value, exception);
        });
    }

    textInterlineSpacing(value: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_TextInterlineSpacing(this._instance, value, exception);
        });
    }

    textInterwordspacing(value: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_TextInterwordSpacing(this._instance, value, exception);
        });
    }

    textKerning(value: number): void {
        Exception.usePointer(exception => {
            ImageMagick._api._DrawingWand_TextKerning(this._instance, value, exception);
        });
    }

    textUnderColor(value: MagickColor): void {
        Exception.usePointer(exception => {
            value._use(valuePtr => {
                ImageMagick._api._DrawingWand_TextUnderColor(this._instance, valuePtr, exception);
            });
        });
    }

    /** @internal */
    static _create(image: IMagickImage, settings: MagickSettings): DrawingWand {
        return new DrawingWand(image, settings);
    }
}

/*
 * JavaScript Load Image Test 1.7
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*global window, describe, it, expect, Blob */

(function (expect, loadImage) {
    'use strict';

    var canCreateBlob = !!window.dataURLtoBlob,
        // 80x60px GIF image (color black, base64 data):
        b64DataGIF = 'R0lGODdhUAA8AIABAAAAAP///ywAAAAAUAA8AAACS4SPqcvtD6' +
            'OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofE' +
            'ovGITCqXzKbzCY1Kp9Sq9YrNarfcrvcLDovH5PKsAAA7',
        imageUrlGIF = 'data:image/gif;base64,' + b64DataGIF,
        blobGIF = canCreateBlob && window.dataURLtoBlob(imageUrlGIF),
        // 1x2px JPEG (color white, with the Exif orientation flag set to 6):
        b64DataJPEG = '/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAASUkqAAgAAA' +
            'ABABIBAwABAAAABgASAAAAAAD/2wBDAAEBAQEBAQEBAQEBAQEB' +
            'AQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ' +
            'EBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEB' +
            'AQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ' +
            'EBAQEBAQH/wAARCAABAAIDASIAAhEBAxEB/8QAHwAAAQUBAQEB' +
            'AQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBA' +
            'QAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAk' +
            'M2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1' +
            'hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKj' +
            'pKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+' +
            'Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAA' +
            'AAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAx' +
            'EEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl' +
            '8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2' +
            'hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmq' +
            'srO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8v' +
            'P09fb3+Pn6/9oADAMBAAIRAxEAPwD+/iiiigD/2Q==',
        imageUrlJPEG = 'data:image/jpeg;base64,' + b64DataJPEG,
        blobJPEG = canCreateBlob && window.dataURLtoBlob(imageUrlJPEG);

    describe('Loading', function () {

        it('Return the img element or FileReader object to allow aborting the image load', function () {
            var img = loadImage(blobGIF, function () {
                return;
            });
            expect(img).to.be.an(Object);
            expect(img.onload).to.be.a('function');
            expect(img.onerror).to.be.a('function');
        });

        it('Load image url', function (done) {
            expect(loadImage(imageUrlGIF, function (img) {
                done();
                expect(img.width).to.be(80);
                expect(img.height).to.be(60);
            })).to.be.ok();
        });

        it('Load image blob', function (done) {
            expect(loadImage(blobGIF, function (img) {
                done();
                expect(img.width).to.be(80);
                expect(img.height).to.be(60);
            })).to.be.ok();
        });

        it('Return image loading error to callback', function (done) {
            expect(loadImage('404', function (img) {
                done();
                expect(img).to.be.a(window.Event);
                expect(img.type).to.be('error');
            })).to.be.ok();
        });

        it('Keep object URL if options.noRevoke is true', function (done) {
            expect(loadImage(blobGIF, function (img) {
                loadImage(img.src, function (img2) {
                    done();
                    expect(img.width).to.be(img2.width);
                    expect(img.height).to.be(img2.height);
                });
            }, {noRevoke: true})).to.be.ok();
        });

        it('Discard object URL if options.noRevoke is undefined or false', function (done) {
            expect(loadImage(blobGIF, function (img) {
                loadImage(img.src, function (img2) {
                    done();
                    expect(img2).to.be.a(window.Event);
                    expect(img2.type).to.be('error');
                });
            })).to.be.ok();
        });

    });

    describe('Scaling', function () {

        it('Scale to options.maxWidth', function (done) {
            expect(loadImage(blobGIF, function (img) {
                done();
                expect(img.width).to.be(40);
                expect(img.height).to.be(30);
            }, {maxWidth: 40})).to.be.ok();
        });

        it('Scale to options.maxHeight', function (done) {
            expect(loadImage(blobGIF, function (img) {
                done();
                expect(img.width).to.be(20);
                expect(img.height).to.be(15);
            }, {maxHeight: 15})).to.be.ok();
        });

        it('Scale to options.minWidth', function (done) {
            expect(loadImage(blobGIF, function (img) {
                done();
                expect(img.width).to.be(160);
                expect(img.height).to.be(120);
            }, {minWidth: 160})).to.be.ok();
        });

        it('Scale to options.minHeight', function (done) {
            expect(loadImage(blobGIF, function (img) {
                done();
                expect(img.width).to.be(320);
                expect(img.height).to.be(240);
            }, {minHeight: 240})).to.be.ok();
        });

        it('Scale to options.minWidth but respect options.maxWidth', function (done) {
            expect(loadImage(blobGIF, function (img) {
                done();
                expect(img.width).to.be(160);
                expect(img.height).to.be(120);
            }, {minWidth: 240, maxWidth: 160})).to.be.ok();
        });

        it('Scale to options.minHeight but respect options.maxHeight', function (done) {
            expect(loadImage(blobGIF, function (img) {
                done();
                expect(img.width).to.be(160);
                expect(img.height).to.be(120);
            }, {minHeight: 180, maxHeight: 120})).to.be.ok();
        });

        it('Scale to options.minWidth but respect options.maxHeight', function (done) {
            expect(loadImage(blobGIF, function (img) {
                done();
                expect(img.width).to.be(160);
                expect(img.height).to.be(120);
            }, {minWidth: 240, maxHeight: 120})).to.be.ok();
        });

        it('Scale to options.minHeight but respect options.maxWidth', function (done) {
            expect(loadImage(blobGIF, function (img) {
                done();
                expect(img.width).to.be(160);
                expect(img.height).to.be(120);
            }, {minHeight: 180, maxWidth: 160})).to.be.ok();
        });

        it('Do not scale to max settings without min settings', function (done) {
            expect(loadImage(blobGIF, function (img) {
                done();
                expect(img.width).to.be(80);
                expect(img.height).to.be(60);
            }, {maxWidth: 160, maxHeight: 120})).to.be.ok();
        });

        it('Do not scale to min settings without max settings', function (done) {
            expect(loadImage(blobGIF, function (img) {
                done();
                expect(img.width).to.be(80);
                expect(img.height).to.be(60);
            }, {minWidth: 40, minHeight: 30})).to.be.ok();
        });

    });


    describe('Cropping', function () {

        it('Crop to same values for options.maxWidth and options.maxHeight', function (done) {
            expect(loadImage(blobGIF, function (img) {
                done();
                expect(img.width).to.be(40);
                expect(img.height).to.be(40);
            }, {maxWidth: 40, maxHeight: 40, crop: true})).to.be.ok();
        });

        it('Crop to different values for options.maxWidth and options.maxHeight', function (done) {
            expect(loadImage(blobGIF, function (img) {
                done();
                expect(img.width).to.be(40);
                expect(img.height).to.be(60);
            }, {maxWidth: 40, maxHeight: 60, crop: true})).to.be.ok();
        });

    });

    describe('Orientation', function () {

        it('Should keep the orientation', function (done) {
            expect(loadImage(blobGIF, function (img) {
                done();
                expect(img.width).to.be(80);
                expect(img.height).to.be(60);
            }, {orientation: 1})).to.be.ok();
        });

        it('Should rotate right', function (done) {
            expect(loadImage(blobGIF, function (img) {
                done();
                expect(img.width).to.be(60);
                expect(img.height).to.be(80);
            }, {orientation: 6})).to.be.ok();
        });

        it('Should rotate left', function (done) {
            expect(loadImage(blobGIF, function (img) {
                done();
                expect(img.width).to.be(60);
                expect(img.height).to.be(80);
            }, {orientation: 8})).to.be.ok();
        });

        it('Should adjust constraints to new coordinates', function (done) {
            expect(loadImage(blobGIF, function (img) {
                done();
                expect(img.width).to.be(60);
                expect(img.height).to.be(80);
            }, {orientation: 6, maxWidth: 60, maxHeight: 80})).to.be.ok();
        });

    });

    describe('Canvas', function () {

        it('Return img element to callback if options.canvas is not true', function (done) {
            expect(loadImage(blobGIF, function (img) {
                done();
                expect(img.getContext).to.not.be.ok();
                expect(img.nodeName.toLowerCase()).to.be('img');
            })).to.be.ok();
        });

        it('Return canvas element to callback if options.canvas is true', function (done) {
            expect(loadImage(blobGIF, function (img) {
                done();
                expect(img.getContext).to.be.ok();
                expect(img.nodeName.toLowerCase()).to.be('canvas');
            }, {canvas: true})).to.be.ok();
        });

        it('Return scaled canvas element to callback', function (done) {
            expect(loadImage(blobGIF, function (img) {
                done();
                expect(img.getContext).to.be.ok();
                expect(img.nodeName.toLowerCase()).to.be('canvas');
                expect(img.width).to.be(40);
                expect(img.height).to.be(30);
            }, {canvas: true, maxWidth: 40})).to.be.ok();
        });

        it('Accept a canvas element as parameter for loadImage.scale', function (done) {
            expect(loadImage(blobGIF, function (img) {
                done();
                img = loadImage.scale(img, {
                    maxWidth: 40
                });
                expect(img.getContext).to.be.ok();
                expect(img.nodeName.toLowerCase()).to.be('canvas');
                expect(img.width).to.be(40);
                expect(img.height).to.be(30);
            }, {canvas: true})).to.be.ok();
        });

    });

    describe('Metadata', function () {

        it('Should parse Exif information', function (done) {
            loadImage.parseMetaData(blobJPEG, function (data) {
                done();
                expect(data.exif).to.be.ok();
                expect(data.exif.get('Orientation')).to.be(6);
            });
        });

        it('Should parse the complete image head', function (done) {
            loadImage.parseMetaData(blobJPEG, function (data) {
                expect(data.imageHead).to.be.ok();
                loadImage.parseMetaData(
                    new Blob([data.imageHead], {type: 'image/jpeg'}),
                    function (data) {
                        done();
                        expect(data.exif).to.be.ok();
                        expect(data.exif.get('Orientation')).to.be(6);
                    }
                );
            });
        });

    });

}(
    this.expect,
    this.loadImage
));

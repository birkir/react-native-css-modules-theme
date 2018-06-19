"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock('react-native', function () { return ({
    StyleSheet: {
        create: function (styles) {
            var cache = [];
            var result = {};
            for (var key in styles) {
                var cacheKey = cache.length;
                cache[cacheKey] = styles[key];
                result[key] = cacheKey;
            }
            return result;
        },
    },
}); });
var index_1 = require("../index");
var themes = {
    light: {
        '--primary-color': '#123456',
    },
    dark: {
        '--primary-color': '#654321',
    },
};
var theme = index_1.default(themes, false);
test('uninterrupted results', function () {
    var styles = {
        sample: {
            fontSize: 12,
            color: '#001122',
        },
    };
    var s = theme(styles);
    expect(s.sample[0].fontSize).toBe(12);
    expect(s.sample[0].color).toBe('#001122');
});
test('result object', function () {
    var styles = {
        sample: {
            fontSize: 12,
            color: 'var(--primary-color)',
        },
    };
    var s = theme(styles);
    expect(s).toHaveProperty('sample__theme_light');
    expect(s).toHaveProperty('sample__theme_dark');
    expect(s.sample__theme_light[0].color).toBe(themes.light['--primary-color']);
    expect(s.sample__theme_dark[0].color).toBe(themes.dark['--primary-color']);
});
test('theme selection', function () {
    var styles = {
        sample: {
            fontSize: 12,
            color: 'var(--primary-color)',
        },
    };
    var s = theme(styles);
    s.theme = 'light';
    expect(s.sample).toHaveLength(2);
    expect(s.sample[1].color).toBe(themes.light['--primary-color']);
    s.theme = 'dark';
    expect(s.sample[1].color).toBe(themes.dark['--primary-color']);
});
test('non-existing themes', function () {
    var styles = {
        sample: {
            fontSize: 12,
            color: 'var(--primary-color)',
        },
    };
    var s = theme(styles);
    expect(s.sample).toHaveLength(1);
    expect(s.sample[0].color).toBeUndefined();
});
test('non-existing variables', function () {
    var styles = {
        sample: {
            fontSize: 12,
            color0: 'var(--does-not-exist)',
            color1: 'var(--does-not-exist, orange)',
        },
    };
    var s = theme(styles);
    s.theme = 'light';
    expect(s.sample[0].color0).toBeUndefined();
    expect(s.sample[0].color1).toBe('orange');
});
test('default value', function () {
    var styles = {
        sample: {
            fontSize: 12,
            color0: 'var(--primary-color,blue)',
            color1: 'var(--primary-color, blue )',
            color2: 'var(--primary-color, #001122 )',
        },
    };
    var s = theme(styles);
    expect(s.sample).toHaveLength(1);
    expect(s.sample[0].color0).toBe('blue');
    expect(s.sample[0].color1).toBe('blue');
    expect(s.sample[0].color2).toBe('#001122');
});
test('StyleSheet', function () {
    var theme = index_1.default(themes, true);
    var styles = {
        sample: {
            fontSize: 12,
            color: 'var(--primary-color)',
        },
    };
    var s = theme(styles);
    expect(s.sample).toHaveLength(1);
    expect(s.sample[0]).toBe(0);
    s.theme = 'light';
    expect(s.sample).toHaveLength(2);
    expect(s.sample[0]).toBe(0);
    expect(s.sample[1]).toBe(1);
    s.theme = 'dark';
    expect(s.sample).toHaveLength(2);
    expect(s.sample[0]).toBe(0);
    expect(s.sample[1]).toBe(2);
});

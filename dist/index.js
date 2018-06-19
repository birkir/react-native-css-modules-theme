"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
function themer(themes, useSheet) {
    if (useSheet === void 0) { useSheet = true; }
    return function theme(styles) {
        var cache = {};
        for (var key in styles) {
            cache[key] = {};
            for (var name_1 in styles[key]) {
                var value = styles[key][name_1];
                cache[key][name_1] = value;
                if (typeof value === 'string') {
                    var matchVar = value.match(/var\((.*?)(,.*?)?\)/);
                    if (matchVar) {
                        var varName = matchVar[1].trim();
                        for (var theme_1 in themes) {
                            if (themes[theme_1][varName]) {
                                var themeKey = key + "__theme_" + theme_1;
                                var themeValue = themes[theme_1][varName];
                                cache[themeKey] = cache[themeKey] || {};
                                cache[themeKey][name_1] = themeValue;
                            }
                        }
                        if (matchVar[2]) {
                            var defaultValue = matchVar[2].replace(/^,/, '').trim();
                            cache[key][name_1] = defaultValue;
                        }
                        else {
                            delete cache[key][name_1];
                        }
                    }
                }
            }
        }
        function themeSolver() {
            // classNames?
        }
        ;
        themeSolver.theme = undefined;
        var sheet = useSheet ? react_native_1.StyleSheet.create(cache) : cache;
        var _loop_1 = function (key) {
            themeSolver[key] = sheet[key];
            Object.defineProperty(themeSolver, key, {
                get: function () {
                    var result = [sheet[key]];
                    if (themeSolver.theme) {
                        result.push(sheet[key + "__theme_" + themeSolver.theme]);
                    }
                    return result;
                },
            });
        };
        for (var key in sheet) {
            _loop_1(key);
        }
        return themeSolver;
    };
}
exports.default = themer;
;

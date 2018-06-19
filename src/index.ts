import { StyleSheet } from 'react-native';

export default function themer(themes: any, selectedTheme: any, useSheet: boolean = true): object {

  return function theme(styles: any) {

    const cache = {};

    for (const key in styles) {
      (cache as any)[key] = {};
      for (const name in styles[key]) {
        const value = styles[key][name];
        (cache as any)[key][name] = value;
        if (typeof value === 'string') {
          const matchVar = value.match(/var\((.*?)(,.*?)?\)/);
          if (matchVar) {
            const varName = matchVar[1].trim();
            for (const theme in themes) {
              if (themes[theme][varName]) {
                const themeKey = `${key}__theme_${theme}`;
                const themeValue = themes[theme][varName];
                (cache as any)[themeKey] = (cache as any)[themeKey] || {};
                (cache as any)[themeKey][name] = themeValue;
              }
            }
            if (matchVar[2]) {
              const defaultValue = matchVar[2].replace(/^,/, '').trim();
              (cache as any)[key][name] = defaultValue;
            } else {
              delete (cache as any)[key][name];
            }
          }
        }
      }
    }

    function themeSolver() {
      // classNames?
    };

    (themeSolver as any).theme = selectedTheme;

    const sheet = useSheet ? StyleSheet.create(cache) : cache;

    for (const key in sheet) {
      (themeSolver as any)[key] = (sheet as any)[key];
      Object.defineProperty(themeSolver, key, {
        get() {
          const result = [(sheet as any)[key]];
          if ((themeSolver as any).theme) {
            result.push(
              (sheet as any)[`${key}__theme_${(themeSolver as any).theme}`],
            );
          }
          return result;
        },
      });
    }

    return themeSolver;
      
  };
};


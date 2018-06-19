jest.mock('react-native', () => ({
  StyleSheet: {
    create(styles: any) {
      const cache = [];
      const result = {} as any;
      for (const key in styles) {
        const cacheKey: number = cache.length;
        cache[cacheKey] =styles[key];
        result[key] = cacheKey;
      }
      return result;
    },
  },
}));

import themer from '../index';

const themes = {
  light: {
    '--primary-color': '#123456',
  },
  dark: {
    '--primary-color': '#654321',
  },
};

const theme = themer(themes, undefined, false) as any;

test('uninterrupted results', () => {
  const styles = {
    sample: {
      fontSize: 12,
      color: '#001122',
    },
  };

  const s = theme(styles) as any;
  expect(s.sample[0].fontSize).toBe(12);
  expect(s.sample[0].color).toBe('#001122');
});

test('result object', () => {

  const styles = {
    sample: {
      fontSize: 12,
      color: 'var(--primary-color)',
    },
  };

  const s = theme(styles) as any;

  expect(s).toHaveProperty('sample__theme_light');
  expect(s).toHaveProperty('sample__theme_dark');
  expect(s.sample__theme_light[0].color).toBe(themes.light['--primary-color']);
  expect(s.sample__theme_dark[0].color).toBe(themes.dark['--primary-color']);
});

test('theme selection', () => {
  const styles = {
    sample: {
      fontSize: 12,
      color: 'var(--primary-color)',
    },
  };

  const s = theme(styles) as any;
  s.theme = 'light';
  expect(s.sample).toHaveLength(2);
  expect(s.sample[1].color).toBe(themes.light['--primary-color']);
  s.theme = 'dark';
  expect(s.sample[1].color).toBe(themes.dark['--primary-color']);
});

test('non-existing themes', () => {
  const styles = {
    sample: {
      fontSize: 12,
      color: 'var(--primary-color)',
    },
  };

  const s = theme(styles) as any;
  expect(s.sample).toHaveLength(1);
  expect(s.sample[0].color).toBeUndefined();
});

test('non-existing variables', () => {
  const styles = {
    sample: {
      fontSize: 12,
      color0: 'var(--does-not-exist)',
      color1: 'var(--does-not-exist, orange)',
    },
  };

  const s = theme(styles) as any;
  s.theme = 'light';
  expect(s.sample[0].color0).toBeUndefined();
  expect(s.sample[0].color1).toBe('orange');
});

test('default value', () => {
  const styles = {
    sample: {
      fontSize: 12,
      color0: 'var(--primary-color,blue)',
      color1: 'var(--primary-color, blue )',
      color2: 'var(--primary-color, #001122 )',
    },
  };

  const s = theme(styles) as any;
  expect(s.sample).toHaveLength(1);
  expect(s.sample[0].color0).toBe('blue');
  expect(s.sample[0].color1).toBe('blue');
  expect(s.sample[0].color2).toBe('#001122');
});

test('StyleSheet', () => {
  const theme = themer(themes, undefined, true) as any;
  const styles = {
    sample: {
      fontSize: 12,
      color: 'var(--primary-color)',
    },
  };
  const s = theme(styles);
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

test('default theme', () => {
  const theme = themer(themes, 'light', false) as any;
  const styles = {
    sample: {
      fontSize: 12,
      color: 'var(--primary-color)',
    },
  };
  const s = theme(styles);
  expect(s.sample).toHaveLength(2);
  expect(s.sample[1].color).toBe('#123456');
})
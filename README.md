react-native-css-modules-theme
==============================

## API

```js
import theme from 'react-native-css-modules-themes';

theme(
  /**
   * Variables as object of objects.
   *
   * example: {
   *   light: {
   *     '--my-var': 'blue',
   *   },
   * }
   * 
   * or direct file of css files like:
   * 
   * .light {
   *   --my-var: blue;
   * }
   */
  themeVariables: object, // (required)

  /**
   * Selected theme or computed property like mobx observable value
   */
  theme: string | observable | any, // default undefined

  /**
   * Wether to return a StyleSheet.create or javascript object.
   */
  useStyleSheet: boolean; // default true
)
```

## Example

```jsx
import theme from 'react-native-css-modules-themes';
const themes = require('./themes.css');

const withTheme = theme(themes);
const styles = withTheme(require('./Button.css'));

styles.theme = 'dark';

export default () => <View style={styles.button} />;

// Will output:
//
// <View style={[{ fontSize: 12 }, { color: 'black' }]} />
```

```styl
// themes.css
.light {
  --primary-color: white;
}
.dark {
  --primary-color: black;
}

// Button.css
.button {
  font-size: 12px;
  background-color: var(--primary-color);
}
```

Context Provider example

```jsx
// theme.js
import theme from 'react-native-css-modules-themes';
const themes = require('./themes.css');
export default theme(themes);

// Button.js
import theme from './theme';
const styles = theme(require('./Button.css'));

export default () => (
  <ThemeContext.Consumer>
    {theme => {
      styles.theme = theme;
      return <View style={styles.button} />
    }}
  </ThemeContext.Consumer>
)


// App.js
export default () => (
  <ThemeContext.Provider value="dark">
    <Button />
  </ThemeContext.Provider>
);
```

Mobx example

```jsx
// theme.js
import theme from 'react-native-css-modules-themes';
const themes = require('./themes.css');
export default theme(themes);

// Button.js
import theme from './theme';
const styles = theme(require('./Button.css'));

@inject('theme')
@observer
class Button extends Component {
  render() {
    styles.theme = this.props.theme;
    return (
      <View style={styles.button} />
    );
  }
}
```

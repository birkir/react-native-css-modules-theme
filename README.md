react-native-css-modules-theme
==============================

Example

```jsx
import theme from 'react-native-css-modules-themes';
const themes = require('./themes.css');

const withTheme = theme(themes);
const styles = withTheme(require('./Button.css'));

export default () => <View style={styles.button} />;
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
<ThemeContext.Consumer>
  {theme => {
    styles.theme = theme;
    return <View style={styles.button} />
  }}
</ThemeContext.Consumer>


// App.js
<ThemeContext.Provider value="dark">
  <Button />
</ThemeContext.Provider>
```

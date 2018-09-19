# umi-plugin-lodash

Easy to ues lodash in UmiJS.

```js
// config in umi config file
export default {
  plugins: [
    ['umi-plugin-lodash', {
      version: '4.0.0',
      external: true,
    }]
  ]
}
```

Then You can use in your code:

```js
import { uniq } from 'umi/lodash';

uniq([1, 2, 2]);
```

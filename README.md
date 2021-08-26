## Changes
Support Vue 3

Remove binding modifiers: push, avoid, forcus, once, propagate, native

Only listen to the element which has `v-shortkey` directive and when they are focused

Some keys are removed, check `Key list`  section
## Install
npm install vue-shortkey --save

## Usage
```javascript
Vue.use(require('vue-shortkey'))
```
Add the shortkey directive to the elements that accept the shortcut.
The shortkey must have explicitly which keys will be used.

#### Running functions
<sub>The code below ensures that the key combination ctrl + alt + o will perform the 'theAction' method.</sub>

```html
<button v-shortkey="['ctrl', 'alt', 'o']" @shortkey="theAction()">Open</button>
```
The function in the modifier __@shortkey__ will be called repeatedly while the key is pressed. To call the function only once, use the __once__ modifier
```html
<button v-shortkey.once="['ctrl', 'alt', 'o']" @shortkey="theAction()">Open</button>
```

#### Multi keys
```html
<button v-shortkey="{up: ['arrowup'], down: ['arrowdown']}" @shortkey="theAction">Joystick</button>
```
... and your method will be called with the key in the  parameter
```javascript
methods: {
  theAction (event) {
    switch (event.srcKey) {
      case 'up':
        ...
        break
      case 'down':
        ...
        break
```

#### Multiple listeners
Use the modifier `propagate` to let the event propagate to other listeners
```html
 <my-component v-shortkey="['ctrl', 'alt', 'o']" @shortkey.propagate="anAction()"></my-component>
 <my-component v-shortkey="['ctrl', 'alt', 'o']" @shortkey.propagate="aDifferentAction()"></my-component>
```

#### Key list
| Key                        | Shortkey Name |
|----------------------------|---------------|
| Shift                      | shift         |
| Control                    | ctrl          |
| Alt                        | alt           |
| Super (Windows or Mac Cmd) | meta          |
| Enter                      | enter         |
| Space                      | space         |
| A - Z                      | a-z           |
| 0-9                        | 0-9           |
| F1-F12                     | f1-f12        |

You can make any combination of keys as well as reserve a single key.
```html
<input type="text" v-shortkey="['q']" @shortkey="foo()"/>
<button v-shortkey="['ctrl', 'p']" @shortkey="bar()"></button>
<button v-shortkey="['f1']" @shortkey="help()"></button>
<textarea v-shortkey="['ctrl', 'v']" @shortkey="dontPaste()"></textarea>
```

#### Avoided fields
* Generalizing type of element that will not perform shortcut. To do this, insert a list of elements in the global method.

```javascript
Vue.use('vue-shortkey', { prevent: ['input', 'textarea'] })
```

* Or even by class
```javascript
Vue.use('vue-shortkey', { prevent: ['.my-class-name', 'textarea.class-of-textarea'] })
```
### Unit Test
```
npm test
```

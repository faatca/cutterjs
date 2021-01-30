# Cutter Javascript Bindings

This project gives some javascript bindings for the Visionary Exams application automation.
This enables custom external scripts and applications to automate workflows in the Visionary Exams application.


## Getting started

This project isn't packaged up for npm.
Right now it's just a solitary js file, cutter.js.
The easiest way to integrate it into your solution is just to copy it over.

Here's an example of starting a rough script to work with the platform.
First we need a directory to do our work in.

```cmd
mkdir D:\source
cd /d D:\source
```

Then we get a recent copy of this package from GitHub.

```cmd
git clone https://github.com/faatca/cutterjs.git
````

Next we can start our project and copy over the `cutter.js` module.

```cmd
mkdir fancybuttons
cd fancybuttons
copy ..\cutterjs\cutter.js .
```

The cutter.js module does require [axios](https://github.com/axios/axios) to work, so we'll need to install it.

```cmd
npm install axios
```

Now, we're free to develop our script and create a file `go.py` with content like the following.

```js
cutter = require("./cutter.js");

async function main() {
  api = await cutter.connect();
  await api.signIn("aaron", "secret");
}

main().then(() => console.log("Yes!")).catch(err => console.log("Oh no!", err));
```

And we can run it.

```cmd
node go.py
```

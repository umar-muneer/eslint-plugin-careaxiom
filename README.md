# eslint-plugin-careaxiom

eslint rules used in careaxiom

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-careaxiom`:

```
$ npm install eslint-plugin-careaxiom --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-careaxiom` globally.

## Usage

Add `careaxiom` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "careaxiom"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "careaxiom/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here






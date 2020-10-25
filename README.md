# JSMAN 

JavaScript Map alternative notation

A simpler and more readable format for creating a Map, weakMap or map-style array.

####Creating a map using JSMAN VS creating a map using arrays
```
const $$ = require('jsman')

//Using JSMAN
const map = $$.mapFrom({
    [$$(()=>'keyMethod')]: {
        [$$(()=>'key2Method')]: 'some value 1',

        [$$({ objKey: 'keyValue' })]: {
            [$$({ objKey2: 'key2Value' })]: 'some value 2',
        },

        [$$(['keyArrA', 'keyArrB'])]: {
            [$$(['key2ArrA', 'key2ArrB'])]: 'some value 3',
        },
    }
}); 

//Using array
const mapClassic = new Map([
    [()=>'keyMethod', new Map([
        [()=>'key2Method', 'some value 1'],

        [{ objKey: 'keyValue' }, new Map([
            [{ objKey2: 'key2Value' }, 'some value 2'],
        ])],

        [['keyArrA', 'keyArrB'], new Map([
            [['key2ArrA', 'key2ArrB'], 'some value 3'],
        ])],
    ])]
]);
```

####Creating a map-style array using JSMAN VS creating a map-style array using arrays
```
const $$ = require('jsman')

//Using JSMAN
const arr = $$.arrayFrom({
    [$$(()=>'keyMethod')]: {
        [$$(()=>'key2Method')]: 'some value 1',

        [$$({ objKey: 'keyValue' })]: {
            [$$({ objKey2: 'key2Value' })]: 'some value 2',
        },

        [$$(['keyArrA', 'keyArrB'])]: {
            [$$(['key2ArrA', 'key2ArrB'])]: 'some value 3',
        },
    },
});

//Using arrays
const arrClassic = [
    [()=>'keyMethod', [
        [()=>'key2Method', 'some value 1'],

        [{ objKey: 'keyValue' }, [
            [{ objKey2: 'key2Value' }, 'some value 2'],
        ]],

        [['keyArrA', 'keyArrB'], [
            [['key2ArrA', 'key2ArrB'], 'some value 3'],
        ]],
    ]],
];
```

####Docs
```
const $$ = require('jsman')

$$(/*Some object*/)              //Return a temporary pointer to an object
$$.mapFrom(/*jsman object*/)     //Create Map from jsman
$$.weakMapFrom(/*jsman object*/) //Create WeakMap from jsman
$$.arrayFrom(/*jsman object*/)   //Create Array from jsman
```

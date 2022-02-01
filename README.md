# JSMAN 

JavaScript Map alternative notation

A simpler and more readable format for creating a Map, weakMap or map-style array.

####Creating a map using JSMAN VS creating a map using arrays
```
import $$, { mapFrom } from 'jsman'

const method1 = ()=>'keyMethod';
const method2 = ()=>'key2Method;
const object1 = { objKey: 'keyValue' };
const object2 = { objKey2: 'key2Value' };
const array1  = ['keyArrA', 'keyArrB'];
const array2  = ['key2ArrA', 'key2ArrB'];

//Using JSMAN
const map = mapFrom({
    [$$(method1)]: {
        [$$(method2)]: 'some value 1',

        [$$(object1)]: {
            [$$(object2)]: 'some value 2',
        },

        [$$(array1)]: {
            [$$(array2)]: 'some value 3',
        },
    }
}); 

//Using array
const mapClassic = new Map([
    [method1, new Map([
        [method2, 'some value 1'],

        [object1, new Map([
            [object2, 'some value 2'],
        ])],

        [array1, new Map([
            [array2, 'some value 3'],
        ])],
    ])]
]);
```

####Docs
```
$$(/*Some object*/)           //Return a temporary pointer to an object

mapFrom(/*jsman object*/)     //Create Map from jsman

weakMapFrom(/*jsman object*/) //Create WeakMap from jsman

arrayFrom(/*jsman object*/)   //Create Array from jsman
```

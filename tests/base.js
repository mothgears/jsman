const $$ = process.env.NODE_ENV === 'development' ? require('../src/index.mjs').default : require('../jsman.lib.js');

const f = ()=>'keyMethod';
const f2 = ()=>'key2Method';

test('Map test', () => {
	const map = $$.mapFrom({
		[$$(f)]: {
			[$$(f2)]: 'some value 1',

			[$$({ objKey: 'keyValue' })]: {
				[$$({ objKey2: 'key2Value' })]: 'some value 2',
			},
			[$$(['keyArrA', 'keyArrB'])]: {
				[$$(['key2ArrA', 'key2ArrB'])]: 'some value 3',
			},
		}
	});

	const mapClassic = new Map([
		[f, new Map([
			[f2, 'some value 1'],

			[{ objKey: 'keyValue' }, new Map([
				[{ objKey2: 'key2Value' }, 'some value 2'],
			])],
			[['keyArrA', 'keyArrB'], new Map([
				[['key2ArrA', 'key2ArrB'], 'some value 3'],
			])],
		])]
	]);

	expect(map).toEqual(mapClassic);
});

test('WeakMap test', () => {
	const map = $$.weakMapFrom({
		[$$(f)]: {
			[$$(f2)]: 'some value 1',

			[$$({ objKey: 'keyValue' })]: {
				[$$({ objKey2: 'key2Value' })]: 'some value 2',
			},
			[$$(['keyArrA', 'keyArrB'])]: {
				[$$(['key2ArrA', 'key2ArrB'])]: 'some value 3',
			},
		}
	});

	const mapClassic = new WeakMap([
		[f, new WeakMap([
			[f2, 'some value 1'],

			[{ objKey: 'keyValue' }, new WeakMap([
				[{ objKey2: 'key2Value' }, 'some value 2'],
			])],
			[['keyArrA', 'keyArrB'], new WeakMap([
				[['key2ArrA', 'key2ArrB'], 'some value 3'],
			])],
		])]
	]);

	expect(map).toEqual(mapClassic);
});


test('Array test', () => {
	const arr = $$.arrayFrom({
		[$$(f)]: {
			strkey1: 'some value 0',
			[$$(f2)]: 'some value 1',

			[$$({ objKey: 'keyValue' })]: {
				[$$({ objKey2: 'key2Value' })]: 'some value 2',
			},
			[$$(['keyArrA', 'keyArrB'])]: {
				[$$(['key2ArrA', 'key2ArrB'])]: 'some value 3',
			},
			strkey2: 'some value 4',
		},
	});

	const arrClassic = [
		[f, [
			['strkey1', 'some value 0'],
			['strkey2', 'some value 4'],
			[f2, 'some value 1'],

			[{ objKey: 'keyValue' }, [
				[{ objKey2: 'key2Value' }, 'some value 2'],
			]],
			[['keyArrA', 'keyArrB'], [
				[['key2ArrA', 'key2ArrB'], 'some value 3'],
			]],
		]],
	];

	expect(arr).toEqual(arrClassic);
});
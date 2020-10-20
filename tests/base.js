const $$ = process.env.NODE_ENV === 'development' ? require('../src/index.mjs').default : require('../lib/index.js');

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

test('Array test', () => {
	const arr = $$.arrayFrom({
		[$$(f)]: {
			[$$(f2)]: 'some value 1',

			[$$({ objKey: 'keyValue' })]: {
				[$$({ objKey2: 'key2Value' })]: 'some value 2',
			},
			[$$(['keyArrA', 'keyArrB'])]: {
				[$$(['key2ArrA', 'key2ArrB'])]: 'some value 3',
			},
		},
	});

	const arrClassic = [
		[f, [
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
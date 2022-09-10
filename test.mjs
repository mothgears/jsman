import $$, { mapFrom, weakMapFrom, arrayFrom } from './lib.mjs';

const f = ()=>'keyMethod';
const f2 = ()=>'key2Method';

test('Map deep test', () => {
	const map = mapFrom({
		[$$(f)]: {
			[$$(f2)]: 'some value 1',

			[$$({ objKey: 'keyValue' })]: {
				[$$({ objKey2: 'key2Value' })]: 'some value 2',
			},
			[$$(['keyArrA', 'keyArrB'])]: {
				[$$(['key2ArrA', 'key2ArrB'])]: 'some value 3',
			},

			simpleKey1: {
				simpleKey1_2: 'simple value 1.2',

				simpleKey1_3: {
					[$$({ objKey2_1: 'obj key 2.1' })]: {
						simpleKey3_1: 'simple value 3.1',

						[$$({ objKey3_1: 'obj key 3.1' })]: {
							simpleKey4_1: 'simple value 4.1',
							simpleKey4_2: 'simple value 4.2',
						},
					},

					simpleKey2_1: 'simple value 2.1',
				}
			}
		}
	});

	const mapClassic = new Map([
		[f, new Map([
			['simpleKey1', {
				simpleKey1_2: 'simple value 1.2',

				simpleKey1_3: new Map([
					['simpleKey2_1', 'simple value 2.1'],
					[{ objKey2_1: 'obj key 2.1' }, new Map([
						['simpleKey3_1', 'simple value 3.1'],
						[{ objKey3_1: 'obj key 3.1' }, {
							simpleKey4_1: 'simple value 4.1',
							simpleKey4_2: 'simple value 4.2',
						}]
					])],
				]),
			}],

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
	const map = weakMapFrom({
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
	const arr = arrayFrom({
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
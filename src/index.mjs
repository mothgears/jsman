const targets = {
	ARRAY    : Symbol(),
	MAP      : Symbol(),
	WEAK_MAP : Symbol(),
};

let _data = {};

function $$ (object) {
	let key = Symbol();
	_data[key] = object;
	return key;
}

function parse (jsman, target) {
	let mapSrc = [];
	for (let key of Reflect.ownKeys(jsman)) {
		let content = jsman[key];
		let originalKey = key;

		if (_data[key] !== undefined) {
			originalKey = _data[key];
			delete _data[key];
			if (typeof content === 'object' && !Array.isArray(content)) {
				content = parse(content, target);
			}
		}

		mapSrc.push([originalKey, content]);
	}

	if (target === targets.ARRAY)    return mapSrc;
	if (target === targets.MAP)      return new Map(mapSrc);
	if (target === targets.WEAK_MAP) return new WeakMap(mapSrc);
}

$$.arrayFrom   = jsman => parse(jsman, targets.ARRAY);
$$.mapFrom     = jsman => parse(jsman, targets.MAP);
$$.weakMapFrom = jsman => parse(jsman, targets.WEAK_MAP);

export default $$;
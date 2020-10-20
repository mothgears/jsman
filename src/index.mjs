const CONTINUE_IDX = Symbol();
const TO_MAP       = Symbol();

let
	_index = 0,
	_data = {};

function $$ (object) {
	let key = 'JSMAN_' + _index++;
	_data[key] = object;
	return key;
}

function parse (jsman, toMap = null, continueIndex = null) {
	let mapSrc = [];
	for (let key of Object.keys(jsman)) {
		let content = jsman[key];
		let originalKey = key;

		if (_data[key] !== undefined) {
			originalKey = _data[key];
			delete _data[key];
			if (typeof content === 'object' && !Array.isArray(content)) {
				content = parse(content, toMap, CONTINUE_IDX);
			}
		}

		mapSrc.push([originalKey, content]);
	}

	if (continueIndex !== CONTINUE_IDX) _index = 0;

	return (toMap === TO_MAP)?new Map(mapSrc):mapSrc;
}

$$.arrayFrom = jsman => parse(jsman);
$$.mapFrom   = jsman => parse(jsman, TO_MAP);

export default $$;
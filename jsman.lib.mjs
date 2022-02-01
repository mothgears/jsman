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

function parse (srcObj, target, detectChange = false) {
	let asArr = [];
	let isChanged = false;
	let isJsman = false;
	for (let key of Reflect.ownKeys(srcObj)) {
		let content = srcObj[key];
		let originalKey = key;

		if (typeof key === 'symbol' && _data[key] !== undefined) {
			isJsman = true;
			originalKey = _data[key];
			delete _data[key];
		}

		if (content &&
			typeof content === 'object' &&
			(content.constructor||{}).name === 'Object'
		) {
			let parsedContent = parse(content, target, true);
			if (parsedContent) {
				isChanged = true;
				content = parsedContent;
				srcObj[key] = content;
			}
		}

		asArr.push([originalKey, content]);
	}

	if (isJsman) {
		if (target === targets.ARRAY)    return asArr;
		if (target === targets.MAP)      return new Map(asArr);
		if (target === targets.WEAK_MAP) return new WeakMap(asArr);
	} else {
		if (isChanged || !detectChange) return srcObj;
		return null;
	}
}

export const arrayFrom   = jsman => parse(jsman, targets.ARRAY);
export const mapFrom     = jsman => parse(jsman, targets.MAP);
export const weakMapFrom = jsman => parse(jsman, targets.WEAK_MAP);
export default $$;
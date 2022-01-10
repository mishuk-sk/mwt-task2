function task(x) {
	return new Promise((res, rej) => { x < 13 ? res('yes') : rej('no')})
}

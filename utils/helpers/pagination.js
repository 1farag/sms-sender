export function paginate(page, size) {
	const pageAsNumber = Number.parseInt(page);
	const sizeAsNumber = Number.parseInt(size);

	if (!page || Number.isNaN(pageAsNumber) || page <= 0) {
		page = 1;
	}
	if (!size || Number.isNaN(sizeAsNumber) || size <= 0) {
		size = 5;
	}
	const offset = (page - 1) * size;
	return { limit: size, offset };
}
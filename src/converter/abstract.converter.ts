export abstract class AbstractConverter<S, T> {

	abstract convert(source: S): T;

	convertArray(sources: S []): T[] {
		return Array.from(sources)
			.map(element => this.convert(element));
	}
}

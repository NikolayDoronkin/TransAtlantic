export abstract class AbstractConverter<T, S> {

  abstract convert(source: T): Promise<S>;

  convertArray(sources: T []): Promise<S>[] {
    return Array.from(sources).map(element => this.convert(element));
  }
}
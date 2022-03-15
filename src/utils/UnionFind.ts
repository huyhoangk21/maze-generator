export class UnionFind {
  private _id: number[];
  private _numComponents: number;

  constructor(size: number) {
    this._id = Array.from(Array(size * size).keys());
    this._numComponents = size * size;
  }

  public get numComponents() {
    return this._numComponents;
  }

  public find(key: number) {
    let root = key;
    while (root !== this._id[root]) root = this._id[root];

    while (key !== root) {
      const next = this._id[key];
      this._id[key] = root;
      key = next;
    }

    return root;
  }

  public connected(key1: number, key2: number) {
    return this.find(key1) === this.find(key2);
  }

  public union(key1: number, key2: number) {
    if (this.connected(key1, key2)) return;

    const root1 = this.find(key1);
    const root2 = this.find(key2);

    this._id[root1] = root2;
    this._numComponents--;
  }
}

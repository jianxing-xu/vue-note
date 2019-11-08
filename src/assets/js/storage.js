const storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return this.get(key);
  },
  get (key, def = []) {
    return JSON.parse(localStorage.getItem(key)) || def;
  }
}
export default storage;
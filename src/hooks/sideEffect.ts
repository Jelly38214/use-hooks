export const sideEffect = {
  id: "",
  start(id: string) {
    this.id = id;
  },
  stop(id: string) {
    this.id = "";
  },
  get(newId: string) {
    return newId === this.id;
  }
};

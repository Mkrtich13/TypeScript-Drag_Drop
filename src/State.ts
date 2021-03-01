import { Listener } from "./shared/types";

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
  }
}

export default State
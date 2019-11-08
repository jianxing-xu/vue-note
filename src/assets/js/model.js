
import storage from './storage'
const key = '__note__';
class Note {
  constructor(tid, title, group, innerT) {
    this.tid = tid;
    this.title = title;
    this.time = Date.now();
    this.group = group;
    this.innerT = innerT;
  }
}
function findIndex(list, compair) {
  return list.findIndex(compair);
}

function newNote(option) {
  return new Note(option.tid,option.title,option.group,option.innerT);
}
//AdD
function add(note) {
  let list = storage.get(key);
  list.unshift(note);
  storage.set(key,list);
  return list;
}
//修改
function mdy(note) {
  let list = storage.get(key);
  let i = findIndex(list, item => {
    return item.tid === note.tid;
  });
  if (~i) {
    list.splice(i, 1, note);
    storage.set(key,list);
  }
  return list;
}
//移除
function remo(note) {
  let list = storage.get(key);
  let i = findIndex(list, item => {
    return item.tid === note.tid;
  });
  if (~i) {
    list.splice(i, 1);
    storage.set(key,list);
  }
  return list;
}

export {
  newNote,
  add,
  mdy,
  remo
}
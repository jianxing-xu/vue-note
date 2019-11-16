
import storage from './storage'
const key = '__note__';
const gKey = '__group__'
class Note {
  constructor(tid, title, group, innerT, normalPos, isTop) {
    this.tid = tid;
    this.title = title;
    this.time = Date.now();
    this.group = group;
    this.innerT = innerT;
    this.normalPos = normalPos,
      this.isTop = isTop
  }
}
function findIndex(list, compair) {
  return list.findIndex(compair);
}

function newNote(option) {
  return new Note(option.tid, option.title, option.group, option.innerT, option.normalPos, option.isTop);
}
//AdD
function add(note) {
  let list = storage.get(key);
  list.unshift(note);
  storage.set(key, list);
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
    storage.set(key, list);
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
    storage.set(key, list);
  }
  return list;
}


//只能置顶无法取消哦耶 !!!??? 我是面条
function toggleToTop(note) {
  let list = storage.get(key);
  let i = findIndex(list, item => {
    return item.tid === note.tid;
  })
  if (~i) {
    let n = list.splice(i, 1)[0];
    list.unshift(n);
  }
  storage.set(key, list);
  return list;
}

function addGroup(val) {
  let list = storage.get(gKey);
  list.push(val);
  storage.set(gKey, list);
  return list;
}
function deleteGroup(groups) {
  let list = storage.get(gKey);
  let arr1 = new Set(list);
  let arr2 = new Set(groups);
  let ret = [];
  for (let item of arr1) {
    if (!arr2.has(item)) {
      ret.push(item);
    }
  }
  storage.set(gKey, ret);
  return ret;
}
function rename(oldName,newName) {
  let gs = [...storage.get(gKey)];
  let i = gs.findIndex(item=>{
    return item === oldName;
  });
  gs[i] = newName;
  storage.set(gKey,gs);
  return gs;
}

export {
  newNote,
  add,
  mdy,
  remo,
  toggleToTop,
  addGroup,
  deleteGroup,
  rename
}
export function extractNameToPath(name: string) {
  let path = "";
  name = name.toLowerCase();
  for(let i = 0; i < name.length; i++){
    if(name[i] === " ") {
      path += "-";
    }
    if(name[i] >= 'a' && name[i] <= 'z') {
      path += name[i];
    }
  }
  return path;
}

export function getSectionId(pathName: string) {
  let id = 0, i = 0;
  // id will start after '.'
  // ex: this-example.1
  for (; i < pathName.length; i++) {
    if(pathName[i] === '.') {
      i++;
      break;
    }
  }
  for (; i < pathName.length; i++) {
    if(pathName[i] < '0' || pathName[i] > '9') {
      break;
    } else {
      id = id*10 + parseInt(pathName[i]);
    }
  }
  return id;
}
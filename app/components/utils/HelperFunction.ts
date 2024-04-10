import { differenceInMinutes, differenceInSeconds, format, isThisWeek, isToday, isYesterday } from "date-fns";

export function extractNameToPath(name: string) {
  let path = "";
  name = name.toLowerCase();
  for(let i = 0; i < name.length; i++){
    if(name[i] === " ") {
      path += "-";
    }
    if((name[i] >= 'a' && name[i] <= 'z') || (parseInt(name[i]) >= 0 && parseInt(name[i]) <= 9)) {
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

export function smartTimeConvert(time: Date) {
  if(isToday(time)) {
    let min_dif = differenceInMinutes(Date.now(), time);
    if(min_dif < 1) {
      return `${differenceInSeconds(Date.now(), time)} seconds ago`;
    } else if(min_dif < 60) {
      if(min_dif == 1) {
        return "1 minute ago";
      } else {
        return `${min_dif} minutes ago`;
      }
    } else {
      return format(time, "'Today, at' p");
    }
  } else if(isYesterday(time)) {
    return format(time, "'Yesterday, at' p");
  } else if(isThisWeek(time)) {
    return format(time, "eee', at' p")
  } else {
    return format(time, "MMM dd, yyyy");
  }
}
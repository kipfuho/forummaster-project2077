import { differenceInMinutes, differenceInSeconds, format, isThisWeek, isToday, isYesterday } from "date-fns";

/**
 * Convert a string to usable url path
 * @param name 
 * @returns non-space string
 */
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

/**
 * Return the number after '.' of a section
 * @param pathName 
 * @returns Section's id
 */
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

/**
 * Convert time to comprehensive string
 * @param time 
 * @returns converted time string
 */
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

/**
 * Return all the texts inside <p> tag of a given string
 * @param content 
 * @returns string[]
 */
export function getPTagText(content: string) {
  const regex = /<p>(.*?)<\/p>/g;
  const matches = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    matches.push(match[1]);
  }

  return matches;
}

/**
 * Clip the text to the last word, clipped text's length < maxLength
 * @param text 
 * @param maxLength 
 * @param pad 
 * @returns Clipped text + pad
 */
export function clipText(text: string, maxLength: number, pad: string) {
  if (text.length <= maxLength) {
    return text;
  }
  while(text[maxLength] != ' ') {
    maxLength--;
  }
  return text.slice(0, maxLength) + pad;
}

/**
 * Return role name for user
 * @param classes 
 * @returns Role name
 */
export function getRoleName(classes: number) {
  switch (classes) {
    case 0:
      return "Unverified Member";

    case 1:
      return "New Member";

    case 2:
      return "Uploader";

    case 3:
      return "Moderator";

    case 4:
      return "Admin";
  
    default:
      return "Unknown";
  }
}

/**
 * Return file name from a link (the link must contain file name)
 * @param link 
 * @returns File's name
 */
export function getFileName(link: string) {
	if(!link) {
		return "";
	}
	try {
		const urlObj = new URL(link);
		const pathname = urlObj.pathname;
		const parts = pathname.split('/');
		return parts[parts.length - 1];
	} catch(err) {
		console.log(err);
		return "";
	}
}
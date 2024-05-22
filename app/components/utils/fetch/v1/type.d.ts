// contain various type for data on the website

export type UserProfileType = {
  id: number;
	username: string;
	email: string;
  messages: number;
  likes: number;
  avatar: string;
  date_of_birth: Date;
  location: string;
  website: string;
  about: string;
  twofa: boolean;
  class: number;
  create_time: Date;
}

export type PublicUserType = {
  id: number;
	username: string;
	email: string;
  messages: number;
  likes: number;
  avatar: string;
  date_of_birth: Date;
  location: string;
  website: string;
  about: string;
  class: number;
  create_time: Date;
}

export type UserSessionType = {
  id: number;
	username: string;
	email: string;
  avatar: string;
}

export type MessageType = {
  id: number;
	thread_id: number;
	user_id: number;
	send_time: Date;
	content: string;
  reactions: number[];
	last_update_time: Date;
  delete: boolean;
}

export type ThreadType = {
  id: number;
  forum_id: number;
  user_id: number;
  thread_title: string;
  tag: string[];
  create_time: Date;
  last_update_time: Date;
  replies: number;
  views: number;
  delete: boolean;
  privilege: number;
}

export type ForumType = {
	id: number;
	category: string; 
	forum_name: string; 
	about: string;
	threads: number; 
	messages: number;
}

export type CategoryType = {
  name: string;
  path: string;
  category: string;
};

// Make sure typescript read the key as string
export type CategoryDataType = {
  [key: string]: CategoryType;
};
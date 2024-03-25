// contain various type for data on the website

export type ThreadType = {
  id: number;
  forum_id: number;
  author_email: string;
  thread_title: string;
  tag: string[];
  content: string;
  create_time: Date;
  last_update_time: Date;
  replies: number;
  views: number;
  last_message_id: number;
}

export type MessageType = {
  id: number;
	thread_id: number;
	sender_email: string;
	send_time: Date;
	content: string;
	last_update_time: Date;
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
'use client'
import FontSizePicker from "../../components/editor/FontSizePicker"
import ThreadBody from "../threads/[thread]/component/ThreadBody"

 // use client for fetch so it will also send cookie

export default async function Test() {
	
	return(
		<main>
			<ThreadBody item={{
				thread: {
					id: 1,
					forum_id: 1,
					author_email: "root@root.com",
					thread_title: "Test thread",
					tag: ["first", "second"],
					content: "<p>Hello world</p>",
					create_time: new Date(),
					last_update_time: new Date(),
					replies: 0,
					views: 1,
					last_message_id: -1
				},
				messages: [
					{
						id: 1,
						thread_id: 1,
						sender_email: "root@root.com",
						send_time: new Date(),
						content: "<p>Message 1</p>",
						last_update_time: new Date(),
					},
					{
						id: 2,
						thread_id: 1,
						sender_email: "root@root.com",
						send_time: new Date(),
						content: "<p>Message 2</p>",
						last_update_time: new Date(),
					},
					{
						id: 3,
						thread_id: 1,
						sender_email: "root@root.com",
						send_time: new Date(),
						content: "<p>Message 3</p>",
						last_update_time: new Date(),
					},
					{
						id: 4,
						thread_id: 1,
						sender_email: "root@root.com",
						send_time: new Date(),
						content: "<p>Message 4</p>",
						last_update_time: new Date(),
					},
					{
						id: 5,
						thread_id: 1,
						sender_email: "root@root.com",
						send_time: new Date(),
						content: "<p>Message 5</p>",
						last_update_time: new Date(),
					},
					{
						id: 6,
						thread_id: 1,
						sender_email: "root@root.com",
						send_time: new Date(),
						content: "<p>Message 6</p>",
						last_update_time: new Date(),
					}
				]
			}}
			/>
		</main>
	)
}
async function getThreadId(threadName: string) {
  var thread_id = 0;
  for (var i = threadName.length - 1; i >= 0; i--) {
    var num = parseInt(threadName[i]);
    if(num < 0 || num > 9) {
      return 0;
    }
    if(threadName[i] === '.') {
      break;
    }
    thread_id = thread_id + 10**(threadName.length - 1 - i)*num;
  }
  return thread_id;
}

export default async function Thread({params}: {params: {thread: string}}) {
	var thread_id = await getThreadId(params.thread);
	return(
		<main>
			{params.thread}
		</main>
	)
}
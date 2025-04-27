if (window.location.href.startsWith(
	"https://scratch.mit.edu/users/")) {
	var messagescounter_url = new URL(window.location.href),
		messagescounter_username = messagescounter_url.pathname.replace("/users/",
			"").replace("/", "");
	fetch("https://api.scratch.mit.edu/users/"
		+ messagescounter_username + "/messages/count/").then((e => e.json())).then((e =>
			alert(messagescounter_username + "のメッセージ数は、"
				+ e.count.toString()
				+ "です")))
} else if (window.location.href.startsWith(
	"https://scratch.mit.edu/projects/")) {
	var messagescounter_url = new URL(window.location.href);
	fetch("https://api.scratch.mit.edu" + messagescounter_url.pathname)
		.then(res => res.json()).then(data => {
			var messagescounter_username = data.author.username;
			fetch("https://api.scratch.mit.edu/users/" + messagescounter_username + "/messages/count/")
				.then((e => e.json()))
				.then((e =>
					alert(messagescounter_username + "のメッセージ数は、"
						+ e.count.toString()
						+ "です")
				))
		}
		)

} else if (window.location.href.startsWith("https://scratch.mit.edu")) {
	var messagescounter_username = prompt("ユーザー名を入力してください。");
	fetch("https://api.scratch.mit.edu/users/"
		+ messagescounter_username + "/messages/count/").then((e => e.json())).then((e =>
			alert(messagescounter_username + "のメッセージ数は、"
				+ e.count.toString()
				+ "です")))
} elsealert(
	"https://scratch.mit.eduのURLで使用してください。(by messagescounter)"
);


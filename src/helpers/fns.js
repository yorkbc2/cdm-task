export const generateUID = (counter=3) => {
	let uid = "";
	for (let i = 0 ; i < counter; i++) {
		uid += btoa(("" + Math.floor((1+Math.random()) * 0x10000)).toString(16).substring(1))
	}
	return uid.replace(/\=/g, "");
}
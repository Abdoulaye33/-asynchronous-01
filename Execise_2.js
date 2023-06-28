const select = document.querySelector("select")
const add = document.getElementById("click")
const store = document.getElementById("store")
const refresh = document.getElementById("refresh")
const ul = document.querySelector("ul")

const data = JSON.parse(localStorage.getItem("ulValue"))
if (data != null) {
	for (let i = 0; i < data.length; i++) {
		const li = document.createElement("li")
		li.textContent = data[i]
		
		ul.append(li)
	}
}

const fetchAllCategories = () => fetch("https://api.chucknorris.io/jokes/categories")

fetchAllCategories().then((response) => response.json()).then((json) => {
	for (let item of json) {
		const option = document.createElement("option")
		
		option.setAttribute('value', item)
		option.textContent = item
		
		select.append(option)
	}
	const option = document.createElement("option")
	
	option.setAttribute('value', undefined)
	option.setAttribute('selected', 'select')
	option.textContent = 'none'
	
	select.prepend(option)
})

add.onclick = () => {
	const value = select.value
	
	if (value == "undefined") {
		
		const fetchNorris = () => fetch("https://api.chucknorris.io/jokes/random")
		
		fetchNorris().then((response) => response.json()).then((json) => {
			const newDiv = document.createElement("div")
			newDiv.textContent = json.value
			
			document.body.append(newDiv)
		})
		
	} else {
		
		const fetchCategories = (value) => fetch("https://api.chucknorris.io/jokes/random?category=" + value)
		
		fetchCategories(value).then((response) => response.json()).then((json) => {
			const li = document.createElement('li')
			li.textContent = value + " : " + json.value

			ul.append(li)
		})
	}
}

store.onclick = () => {
	let data = []
	let lis = ul.querySelectorAll("li")
	for (let li of lis) {
		let item = li.textContent
		data.push(item)
	}
	localStorage.setItem("ulValue", JSON.stringify(data))
}

refresh.onclick = () => {
	localStorage.removeItem("ulValue")
	location.reload()
}
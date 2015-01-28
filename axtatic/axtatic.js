(function () {

	var password = ""
	var elementPanel = document.createElement("DIV")
	var elementButtonSave = document.createElement("BUTTON")

	var request = function(url, handle, post) {
		var	xh = new XMLHttpRequest()
		var	body = ""

		xh.open(post ? "POST" : "GET", url, true)
		xh.onload = handle

		if (post) {
			xh.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
			for (var i in post) {
				body += (body ? "&" : "") + i + "=" + encodeURIComponent(post[i])
			}
		}

		xh.send(body)
		return undefined
	}

	var login = function () {
		var initialContent = ""

		withOriginalContent(function () {
			initialContent = document.body.textContent
		})

		password = prompt("Log in to AXTATIC. Please enter the password:")

		elementPanel.style.display = "block"

		document.body.contentEditable = true

		// protect from html code pasting
		document.body.onpaste = function (event) {
			event.preventDefault()
			document.execCommand("inserttext", false, event.clipboardData.getData("text"))
		}

		var onchange = function () {
			withOriginalContent(function () {
				if (document.body.textContent !== initialContent) {
					elementButtonSave.style.backgroundColor = "#911"
					elementButtonSave.innerHTML = "* Save!"
				} else {
					elementButtonSave.style.backgroundColor = "#59e"
					elementButtonSave.innerHTML = "Save"
				}
			})
		}

		document.body.onkeyup = onchange
		document.body.onclick = onchange
	}

	var save = function () {
		var content = ""

		withOriginalNonEditableContent(function () {
			content = document.documentElement.innerHTML
		})

		var save_handle = function (response) {
			var text = response.target.responseText
			if (text.substr(0,2) == "Ok") {
				elementButtonSave.style.backgroundColor = "#291"
				elementButtonSave.innerHTML = "Saved"
			} else {
				alert(response.target.responseText)
			}
		}

		var saveTo = document.location.pathname
		if (saveTo === "/") {
			saveTo = "/index.html"
		}

		request("/axtatic/axtatic.php", save_handle, {html: content, password: password, saveTo: saveTo})
	}

	var init = function () {
		elementPanel.style = "position: fixed; right: 0; display: none;"

		elementButtonSave.addEventListener("click", save)
		elementButtonSave.innerHTML = "Save"
		elementButtonSave.title = "Powered by AXTATIC 1.0\n© Anton Matviichuk 2014\ngithub/aanto"
		elementButtonSave.style = "font-size: 14pt; background-color: #59e; color: #fff; border: 2px solid #fff; border-right: none; border-radius: 3ex 0 0 3ex; padding: 1ex 2ex 1ex 2.6ex; cursor: pointer;"
		elementPanel.appendChild(elementButtonSave)

		var elementButtonLogin = document.createElement("BUTTON")
		elementButtonLogin.accessKey = "L"
		elementButtonLogin.style = "display: none"
		elementButtonLogin.addEventListener("click", login)
		elementPanel.appendChild(elementButtonLogin)

		document.body.insertBefore(elementPanel, document.body.firstChild)
	}

	var withOriginalContent = function (func) {
		document.body.removeChild(elementPanel)
		func()
		document.body.insertBefore(elementPanel, document.body.firstChild)
	}

	var withOriginalNonEditableContent = function (func) {
		document.body.contentEditable = false
		document.body.removeAttribute("contentEditable")
		withOriginalContent(func)
		document.body.contentEditable = true
	}

	init()

})()

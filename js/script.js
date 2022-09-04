function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});;

function ibg() {
	let ibgs = document.querySelectorAll('.ibg');

	if (ibgs.length > 0) {

		for (let index = 0; index < ibgs.length; index++) {
			const ibg = ibgs[index];

			if (ibg.querySelector("img")) {
				ibg.style.backgroundImage = 'url("' + ibg.querySelector('img').src + '")';
			}

			if (ibg.querySelectorAll("source")[0] && document.querySelector("body").classList.contains("webp")) {
				if (ibg.querySelectorAll("source")[0].type === "image/webp") {
					ibg.style.backgroundImage = 'url("' + ibg.querySelectorAll("source")[0].srcset + '")';
				}
			}
		}
	}
}
setTimeout(ibg, 10); // чтобы класс .webp успел примениться
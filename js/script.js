// это всё лишнее, потому как https://caniuse.com/webp 97%, причем я бы оформил это всё как полифилл

function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		// что есть 2 здесь? магические цифры не приняты в коде
		// а если вся эта функция откуда-то со stackoverflow то нужен и коммент со ссылкой на первоисточник
		callback(webP.height == 2);
	};
	// Обычно выносится в константу, что это 1х1 пиксель
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
	// if (support)
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}

	// можно лучше этот же код сделать
	// const bodyEl = document.querySelector('body'); // и этот bodyEl куда-нибудь наверх, вижу что ты его ещё ниже по коду используешь
	// const classes = support ? 'webp' : 'no-webp';
	// bodyEl.classList.add(classes);
});

// всё ещё не знаю что такое ibg
function ibg() {
	// так, а здесь уже let, но выше видел var, определитесь
	let ibgs = document.querySelectorAll('.ibg');

	// лишняя проверка, цикл ни разу не выполнится на пустом ibgs
	if (ibgs.length > 0) {
		// есть перебор по querySelectorAll удобнее
		// https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
		for (let index = 0; index < ibgs.length; index++) {
			const ibg = ibgs[index];

			if (ibg.querySelector("img")) {
				ibg.style.backgroundImage = 'url("' + ibg.querySelector('img').src + '")';
			}

			// мне не нравится этот участок кода, он перегружен проверками, каждую из которых стоит
			// вынести в отдельную переменную, а то это сложно к чтению, такой код не должен будет пройти мимо твоего лида в будущем

			// более того проверку
			// document.querySelector("body").classList.contains("webp")
			// можно сделать однажды ещё до запуска этой функции ibg

			// ibg.querySelectorAll("source")[0]
			// дублируешь трижды, не надо так
			if (ibg.querySelectorAll("source")[0] && document.querySelector("body").classList.contains("webp")) {
				if (ibg.querySelectorAll("source")[0].type === "image/webp") {
					ibg.style.backgroundImage = 'url("' + ibg.querySelectorAll("source")[0].srcset + '")';
				}
			}
		}
	}
}

// не, это плохо по многим причинам.
// 1) достаточно написать setTimeout(ibg, 0), ноль а не десять
// это относится к макротаскам и event loop
// https://learn.javascript.ru/event-loop
// 2) Зачем так изощряться, когда у тебя в js уже известен результат из функции testWebP (просто сделай return этого значения),
// т.е. известно есть ли поддержка webp или нет
setTimeout(ibg, 10); // чтобы класс .webp успел примениться
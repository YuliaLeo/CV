// это всё лишнее, потому как https://caniuse.com/webp 97%, причем я бы оформил это всё как полифилл
//*Поняла, не смотрела, что поддержка уже почти 100%
//*На счет полифилла, еще их сама не писала, посморю, как это делается

const bodyEl = document.querySelector('body');

function testWebP(callback) {
	let webP = new Image();
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	const webpHeight = webP.height;

	webP.onload = webP.onerror = function () {
		// что есть 2 здесь? магические цифры не приняты в коде
		// а если вся эта функция откуда-то со stackoverflow то нужен и коммент со ссылкой на первоисточник
		//* Она вот отсюда https://pastebin.com/CNgBiPz3, нашла достаточно давно, просто привыкла ее использовать
		//* Цифра 2, потому что изображение 2x2, но сейчас понимаю, что она тут вообще не к чему
		callback(webpHeight);
	};

	return webpHeight;
}
let webpSupport = testWebP(function (support) {
	const classes = support ? 'webp' : 'no-webp';
	bodyEl.classList.add(classes);
	// можно лучше этот же код сделать
	// const bodyEl = document.querySelector('body'); // и этот bodyEl куда-нибудь наверх, вижу что ты его ещё ниже по коду используешь
	// const classes = support ? 'webp' : 'no-webp';
	// bodyEl.classList.add(classes);
	// *Да, так намного лучше, хотя я немного изменила код и теперь этот блок уже в принципе не нужен
});

// всё ещё не знаю что такое ibg
// *В html написала
function ibg() {
	// так, а здесь уже let, но выше видел var, определитесь
	// *Та просто старая функция и я ее совсем не меняла, взяла, как она была, исправила
	let ibgs = document.querySelectorAll('.ibg');

	// есть перебор по querySelectorAll удобнее
	// https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/

	ibgs.forEach(ibg => {
		const webpSource = ibg.querySelector("source[type='image/webp']");
		const imgSource = ibg.querySelector('img');

		if (webpSupport && webpSource) {
			ibg.style.backgroundImage = 'url("' + webpSource.srcset + '")';
		}
		else if (imgSource) {
			ibg.style.backgroundImage = 'url("' + imgSource.src + '")';
		}
	});
	// мне не нравится этот участок кода, он перегружен проверками, каждую из которых стоит
	// вынести в отдельную переменную, а то это сложно к чтению, такой код не должен будет пройти мимо твоего лида в будущем

	// более того проверку
	// document.querySelector("body").classList.contains("webp")
	// можно сделать однажды ещё до запуска этой функции ibg

	// ibg.querySelectorAll("source")[0]
	// дублируешь трижды, не надо так
	//*Да, согласна, я тут намудрила очень много не нужного (вообще функцию ibg я брала из туториала на Ютуб около года назад 
	// и модифицировала её под себя)
}

// не, это плохо по многим причинам.
// 1) достаточно написать setTimeout(ibg, 0), ноль а не десять
// это относится к макротаскам и event loop
// https://learn.javascript.ru/event-loop
// 2) Зачем так изощряться, когда у тебя в js уже известен результат из функции testWebP (просто сделай return этого значения),
// т.е. известно есть ли поддержка webp или нет
ibg();
import debounce from 'lodash.debounce';

const element = document.querySelector('#app');

function screenTestExample() {
	// this is not dynamic, after changing vieweport, you need to re-load the page to see the effect
	if (window.matchMedia('(min-width: 600px)').matches) {
		element.style.color = 'red';
	}
}
// screenTestExample();

function screenTestExampleResize() {
	// RESIZE EVENTS
	// we can execute media query check on each resize
	function screenTest() {
		console.log('running the screen test...');

		if (window.matchMedia('(min-width: 600px)').matches) {
			element.style.color = 'red';
		} else {
			element.style.color = '';
		}
	}

	screenTest();
	window.addEventListener('resize', screenTest);
}
// screenTestExampleResize();

// now when we resize the page, the logic will be applied, but resize runs too often
// to fix this we can use debounce
function screenTestExampleResizeDebounce() {
	// RESIZE EVENTS + DEBOUNCE
	function screenTest() {
		console.log('running the screen test...');
		if (window.matchMedia('(min-width: 600px)').matches) {
			element.style.color = 'red';
		} else {
			element.style.color = '';
		}
	}
	screenTest();
	window.addEventListener('resize', debounce(screenTest, 400));
}
// screenTestExampleResizeDebounce();

// but a better way is provided by matchMedia API:
//  you can attach an event listener to meduaQueryList object, returned by matchMedia
function screenTestExampleMediaQueryListListener() {
	const mediaQueryList = window.matchMedia('(min-width: 600px)');

	function screenTest(matches) {
		console.log('running the screen test...');

		if (matches) {
			element.style.color = 'red';
		} else {
			element.style.color = '';
		}
	}

	screenTest(mediaQueryList.matches);

	mediaQueryList.addEventListener(
		'change',
		(event) => screenTest(event.matches),
		{ once: true }, // without this option our 'matches' callback to be re-executed multiple times (not good e.g. if we make AJAX request to download something)
	);
}
screenTestExampleMediaQueryListListener();

// TODO setup / defer setup - enquire

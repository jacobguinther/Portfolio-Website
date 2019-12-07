
const logo = document.getElementById('logo');
const menu = document.querySelector('.burger-menu');
const menuBars = document.querySelectorAll('.menu-bar');
const hamburgerContainer = document.querySelector('.hamburger-container');

menu.addEventListener('click', () => {
  menuBars.forEach((bar) => bar.classList.remove('no-animation'));
  if (menu.classList.contains('active')) {
    menu.classList.remove('active');
  } else {
    menu.classList.add('active');
  }
});
hamburgerContainer.addEventListener('click', () => {
  document.querySelector('.menu').classList.toggle('menu-visible');
});

logo.addEventListener('mouseenter', e => {
	console.log("ENTER")
	if(!logo.classList.contains('rotate')){
		logo.classList.add('rotate');
		setTimeout(()=>logo.classList.remove('rotate'), 1500);
	}else{console.log("NOOOO")}

});
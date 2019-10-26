console.log("hello")
const menu = document.querySelector(".burger-menu");
const menuBars = document.querySelectorAll(".menu-bar");

menu.addEventListener("click", () => {
	menuBars.forEach(bar => bar.classList.remove("no-animation"));
	if (menu.classList.contains("active")) {
		menu.classList.remove("active");
	} else {
		menu.classList.add("active");
	}
});

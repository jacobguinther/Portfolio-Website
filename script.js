document.addEventListener('DOMContentLoaded', function () {
  const logo = document.getElementById('logo');
  const menu = document.querySelector('.nav__burger');
  const menuBars = document.querySelectorAll('.nav__burger-bar');
  const hamburgerContainer = document.querySelector(
    '.nav__container-hamburger',
  );
  const nav = document.querySelector('nav');
  const projects = document.querySelectorAll('.project');

  document.addEventListener('click', (e) => {
    projects.forEach((project) => {
      if (!project.contains(e.target)) {
        project.parentElement.classList.remove('card__active');
      }
    })
  });

  projects.forEach((project) => {
    project.addEventListener('click', (e) => {
      if (!e.target.classList.contains('project--close')) {
        project.querySelector('.overlay').classList.add('overlay__active');
        projects.forEach((project) => {
          project.parentElement.classList.remove('card__active');
        });
      }
      project.parentElement.classList.toggle('card__active');
    });
  });

  if (menu) {
    menu.addEventListener('click', () => {
      menuBars.forEach((bar) => bar.classList.remove('no-animation'));
      if (menu.classList.contains('active')) {
        console.log(event);
        menu.classList.remove('active');
      } else {
        menu.classList.add('active');
      }
    });
  }

  if (hamburgerContainer) {
    hamburgerContainer.addEventListener('click', () => {
      let bars = document.querySelector('.nav__burger').children;
      bars[0].classList.toggle('nav__burger-bar--active');
      bars[1].classList.toggle('nav__burger-bar--active');
      bars[2].classList.toggle('nav__burger-bar--active');
      bars[0].classList.toggle('nav__burger-bar');
      bars[1].classList.toggle('nav__burger-bar');
      bars[2].classList.toggle('nav__burger-bar');
      document.querySelector('.nav__menu').classList.toggle('nav__menu--visible');
    });
  }

  if (logo) {
    logo.addEventListener('mouseenter', (e) => {
      var rect = logo.getBoundingClientRect();
      var x = e.clientX;
      var y = e.clientY;
      rightOrLeft = x > (rect.left + rect.right) / 2 ? 'Right' : 'Left';
      topOrBottom = y > (rect.top + rect.bottom) / 2 ? 'Bottom' : 'Top';
      if (
        !logo.classList.contains('rotateRight') &&
        !logo.classList.contains('rotateLeft')
      ) {
        switch (direction) {
          case 'North':
            rightOrLeft === 'Left'
              ? logo.classList.add('rotateRight')
              : logo.classList.add('rotateLeft');
            break;
          case 'South':
            rightOrLeft === 'Left'
              ? logo.classList.add('rotateLeft')
              : logo.classList.add('rotateRight');
            break;
          case 'East':
            topOrBottom === 'Top'
              ? logo.classList.add('rotateRight')
              : logo.classList.add('rotateLeft');
            break;
          case 'West':
            topOrBottom === 'Top'
              ? logo.classList.add('rotateLeft')
              : logo.classList.add('rotateRight');
            break;
        }
        setTimeout(() => {
          logo.classList.remove('rotateRight', 'rotateLeft');
        }, 1500);
      } else {
        console.log('NOOOO');
      }
    });
  }
  if (nav) {
    nav.addEventListener('mouseenter', () => {
      document.addEventListener('mousemove', mousemovemethod);
    });

    nav.addEventListener('mouseleave', (e) => {
      document.removeEventListener('mousemove', mousemovemethod);
    });
  }


  var direction = '';
  var oldx = 0;
  var oldy = 0;
  mousemovemethod = function (e) {
    if (e.pageX > oldx && e.pageY == oldy) {
      direction = 'East';
    } else if (e.pageX == oldx && e.pageY > oldy) {
      direction = 'South';
    } else if (e.pageX == oldx && e.pageY < oldy) {
      direction = 'North';
    } else if (e.pageX < oldx && e.pageY == oldy) {
      direction = 'West';
    }
    oldx = e.pageX;
    oldy = e.pageY;
  };

  // AOS AND ChartJS
  if(AOS){
    AOS.init({
      duration: 1000,
      once: true,
    });
  }

  if (document.getElementById('myChart')) {
    const style = getComputedStyle(document.body);
    const colorGrayDark = style.getPropertyValue('--color-gray-dark');
    const colorPrimary = style.getPropertyValue('--color-primary');
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: ['CSS', 'HTML', 'Javascript', 'React', 'MySQL'],
        datasets: [
          {
            label: 'Pluralsight SkillsIQ',
            backgroundColor: colorGrayDark,
            data: [212, 168, 197, 150, 156],
          },
        ],
      },
      options: {
        events: [],
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              type: 'linear',
              ticks: {
                min: 0,
                max: 200,
                stepSize: 100,
                fontColor: colorPrimary,
                fontSize: 15,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: colorPrimary,
                fontSize: 15,
              },
            },
          ],
        },
        plugins: {
          deferred: {
            xOffset: 150,
            yOffset: '50%',
            delay: 500,
          },
        },
      },
    });
  }

  // Form
  const form = document.getElementById('form__contact');
  const submit = document.querySelector('.form--submit');
  if (submit) {
    submit.addEventListener('click', submitToAPI);
  }

  function submitToAPI(e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      for (let i = 1; i < document.querySelectorAll('input').length; i++) {
        if (!document.querySelectorAll('input')[i].checkValidity()) {
          console.log('true on input');
          document.querySelectorAll('input')[i].focus();
          return;
        }
      }
      if (!document.querySelectorAll('textarea')[0].checkValidity()) {
        console.log('true on textarea');
        document.querySelectorAll('textarea')[0].focus();
        return;
      }
      return form.reportValidity();
    }
    var URL =
      'https://sa6nwuo697.execute-api.us-west-2.amazonaws.com/dev/contact';

    var name = document.querySelector('#name').value;
    var email = document.querySelector('#email').value;
    var message = document.querySelector('#message').value;
    var data = {
      name,
      email,
      message,
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', URL);
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function () {
      var DONE = 4;
      var OK = 200;
      if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
          window.location.href = '../success.html';
        } else {
          console.log('Error: ' + xhr.status);
          alert('Sorry, Form Submission Failed');
        }
      }
    };
  }

  const invalidClassName = 'invalid';
  const validationErrorClass = 'validation-text';
  const parentErrorClass = 'has-validation-error';
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(function (input) {
    function checkValidity(options) {
      const insertError = options.insertError;
      const parent = input.parentNode;
      const error =
        parent.querySelector(`.${validationErrorClass}`) ||
        document.createElement('div');

      if (!input.validity.valid && input.validationMessage) {
        error.className = validationErrorClass;
        error.textContent = input.validationMessage;

        if (insertError) {
          parent.firstElementChild.append(error);
          parent.firstElementChild.classList.add(parentErrorClass);
        }
      } else {
        parent.classList.remove(parentErrorClass);
        error.remove();
      }
    }
    input.addEventListener('input', function () {
      input.setCustomValidity('');
      if (input.validity.valid) {
        input.classList.remove(invalidClassName);
      }
      if (input.id === 'email' && input.validationMessage.length > 30) {
        if (screen.width > 450) {
          input.setCustomValidity('Enter an email address.');
        } else {
          input.setCustomValidity('Enter an email address');
        }
      }
      checkValidity({ insertError: false });
    });
    input.addEventListener('invalid', function (e) {
      input.classList.add(invalidClassName);
      e.preventDefault();
      checkValidity({ insertError: true });
    });
  });
});

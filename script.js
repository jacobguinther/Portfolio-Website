document.addEventListener('DOMContentLoaded', function(){
  const logo = document.getElementById('logo');
  const menu = document.querySelector('.burger-menu');
  const menuBars = document.querySelectorAll('.menu-bar');
  const hamburgerContainer = document.querySelector('.hamburger-container');
  const nav = document.querySelector('nav');

  menu.addEventListener('click', () => {
    menuBars.forEach((bar) => bar.classList.remove('no-animation'));
    if (menu.classList.contains('active')) {
      menu.classList.remove('active');
    } else {
      menu.classList.add('active');
    }
  });

  hamburgerContainer.addEventListener('click', () => {
    console.log("fired")
    let bars = document.querySelector('.burger-menu').children;
    bars[0].classList.toggle('menu-bar-active')
    bars[1].classList.toggle('menu-bar-active')
    bars[2].classList.toggle('menu-bar-active')
    bars[0].classList.toggle('menu-bar')
    bars[1].classList.toggle('menu-bar')
    bars[2].classList.toggle('menu-bar')
    document.querySelector('.menu').classList.toggle('menu-visible');
  });

  logo.addEventListener('mouseenter', (e) => {
    var rect = logo.getBoundingClientRect();
    var x = e.clientX; // Get the horizontal coordinate
    var y = e.clientY;
    rightOrLeft = x > (rect.left + rect.right) / 2 ? 'Right' : 'Left';
    topOrBottom = y > (rect.top + rect.bottom) / 2 ? 'Bottom' : 'Top';
    // console.log(rightOrLeft,topOrBottom)
    if (
      !logo.classList.contains('rotateRight') &&
      !logo.classList.contains('rotateLeft')
    ) {
      // console.log('THIS IS DIREECTION: ', direction);
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
  nav.addEventListener('mouseenter', () => {
    document.addEventListener('mousemove', mousemovemethod);
  });

  nav.addEventListener('mouseleave', (e) => {
    document.removeEventListener('mousemove', mousemovemethod);
  });

  var direction = '';
  var oldx = 0;
  var oldy = 0;
  mousemovemethod = function(e){
    if (e.pageX > oldx && e.pageY == oldy) {
      direction = 'East';
      // console.log(direction);
    } else if (e.pageX == oldx && e.pageY > oldy) {
      direction = 'South';
      // console.log(direction);
    } else if (e.pageX == oldx && e.pageY < oldy) {
      direction = 'North';
      // console.log(direction);
    } else if (e.pageX < oldx && e.pageY == oldy) {
      direction = 'West';
      // console.log(direction);
    }
    // document.body.innerHTML = direction;
    oldx = e.pageX;
    oldy = e.pageY;
  };

  // AOS AND ChartJS
  AOS.init({
    duration: 1000,
    once: true,
  });
  if (document.getElementById('myChart')) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'horizontalBar',

      // The data for our dataset
      data: {
        labels: [ 'CSS', 'HTML', 'Javascript', 'React', 'MySQL' ],
        datasets: [
          {
            label: 'Pluralsight SkillsIQ',
            backgroundColor: '#767676',
            data: [ 212, 168, 197, 150, 156 ],
          },
        ],
      },
      // Configuration options go here
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              type: 'linear',
              ticks: {
                min: 0,
                max: 300,
                fontColor: '#242424',
                fontSize: 15,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: '#242424',
                fontSize: 15,
              },
            },
          ],
        },
        plugins: {
          deferred: {
            xOffset: 150, // defer until 150px of the canvas width are inside the viewport
            yOffset: '50%', // defer until 50% of the canvas height are inside the viewport
            delay: 500, // delay of 500 ms after the canvas is considered inside the viewport
          },
        },
      },
    });
  }

  // Form
  var form = document.getElementById('contact-form');
  var submit = document.querySelector('.input-submit');
  submit.addEventListener('click', submitToAPI);
  function submitToAPI(e){
    e.preventDefault();
    if (!form.checkValidity()) {
      for (let i = 1; i < document.querySelectorAll('input').length; i++) {
        if (!document.querySelectorAll('input')[i].checkValidity()) {
          console.log("true on input")
          document.querySelectorAll('input')[i].focus();
          return;
        }
      }
      if(!document.querySelectorAll('textarea')[0].checkValidity()){
        console.log("true on textarea")
        document.querySelectorAll('textarea')[0].focus();
        return;
      }
      return form.reportValidity();
    }
    var URL =
      'https://sa6nwuo697.execute-api.us-west-2.amazonaws.com/dev/contact';

    var name = document.querySelector('#name-input').value;
    var email = document.querySelector('#email-input').value;
    var desc = document.querySelector('#description-input').value;
    var data = {
      name: name,
      email: email,
      desc: desc,
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', URL);
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function(){
      var DONE = 4; // readyState 4 means the request is done.
      var OK = 200; // status 200 is a successful return.
      if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
          console.log(xhr.responseText); // 'This is the returned text.'
          // alert('Your message has been sent successfully!');
          // document.getElementById('contact-form').reset();
          // location.reload();
          window.location.href = '../success.html';
        } else {
          console.log('Error: ' + xhr.status); // An error occurred during the request.
          alert('Sorry, Form Submission Failed');
        }
      }
    };
  }

  const invalidClassName = 'invalid';
  const validationErrorClass = 'validation-text';
  const parentErrorClass = 'has-validation-error';
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(function(input){
    function checkValidity(options){
      const insertError = options.insertError;
      const parent = input.parentNode;
      // console.log(parent.firstElementChild)
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
    input.addEventListener('input', function(){
      input.setCustomValidity('');
      // Remove the class when the input becomes valid.
      // 'input' will fire each time the user types
      if (input.validity.valid) {
        input.classList.remove(invalidClassName);
      }
      if (input.id === 'email-input' && input.validationMessage.length > 30) {
        if (screen.width > 450) {
          input.setCustomValidity('Enter an email address.');
        } else {
          input.setCustomValidity('Enter an email address');
        }
      }
      // We can only update the error or hide it on input.
      // Otherwise it will show when typing.
      checkValidity({ insertError: false });
    });
    input.addEventListener('invalid', function(e){
      // Add a css class on submit when the input is invalid.
      input.classList.add(invalidClassName);
      // prevent showing the default display
      e.preventDefault();
      // We can also create the error in invalid.
      checkValidity({ insertError: true });
    });
  });
});

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
  // document.querySelector('body').addEventListener('click', (e)=>{
  // 	var x = event.clientX;     // Get the horizontal coordinate
  // 	var y = event.clientY;     // Get the vertical coordinate
  // 	var coor = "X : " + x + ", Y : " + y;
  // 	console.log("Coor ",coor);
  // });

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
            // borderColor: '#000',
            data: [ 212, 168, 197, 150, 156 ],
          },
        ],
      },
      // Configuration options go here
      options: {
        legend: {
          display: false,
        },
        // tooltips: {
        //     callbacks: {
        //        label: function(tooltipItem) {
        //               return tooltipItem.yLabel;
        //        }
        //     }
        // },
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
});

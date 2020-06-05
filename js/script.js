document.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    
    function hedeTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hedeTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            
            tabs.forEach((item, i) => {
                if (target == item) {
                    hedeTabContent();
                    showTabContent(i);
                } 
            }); 
        }
    });

    //Timer
    const deadline = '2020-06-09';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
        
    }

    function getZero(num) {
        if (num <= 0 || num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();
        
        function updateClock() {
            const t = getTimeRemaining(endtime);
              

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            
            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.innerHTML = 'aк';
                hours.innerHTML = 'ци';
                minutes.innerHTML = 'йн';
                seconds.innerHTML = 'ет';
            }
        }
    }

    setClock('.timer', deadline);

    //Modal window

    const btnmodal = document.querySelectorAll('[data-modal]'),
          modalWindow = document.querySelector('.modal'),
          close = document.querySelector('[data-close]');

        function openModal() {
            btnmodal.forEach(item => {
            item.addEventListener('click', () => {
                modalWindow.classList.add('show', 'fade');
                modalWindow.classList.remove('hide');
                document.body.style.overflow = 'hidden';   // untouchable site
                });
            });
        }
        openModal();
        modalWindow.addEventListener('click', (e) => {   // event on the backing
            if (e.target === modalWindow) {
                closeModal();
            }
        });

        close.addEventListener('click', closeModal);

        function closeModal() {
                modalWindow.classList.remove('show');
                modalWindow.classList.add('hide');
                document.body.style.overflow = '';
        }

        document.addEventListener('keydown', (e) => {    // key connection 'Escape'
            if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
                closeModal();
            }
        });
        
        // Modal window two - work with inLine styles
          
        //   function openModal(i) {             
        //       i.forEach(item => {
        //           item.addEventListener('click', (e) => {
        //               e.preventDefault();
        //               modalWindow.style.display = 'block';
        //           });
        //       });
        //   }
        //   function closeModal() {
        //       close.addEventListener('click', e => {
        //           e.preventDefault();
        //         modalWindow.style.display = 'none';
        //       });
        //   }
        //   openModal(btnmodal);
        //   closeModal();
          

});




//"use strict";

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
                modalWindow.classList.add('show', 'fade');
                modalWindow.classList.remove('hide');
                document.body.style.overflow = 'hidden';   // untouchable site
                clearInterval(modalTimerId);   // excludes re-display
        }
        
        btnmodal.forEach(item => {
            item.addEventListener('click', openModal);
            });

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
        
        //const modalTimerId = setTimeout(openModal, 5000); // open modal window after 5s
        
        function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
            }
        }
        //window.addEventListener('scroll', showModalByScroll);
        

        // Used class for cards

        class MenuCard {
            constructor(src, alt, title, descr, price, parentSelector) {
                this.src = src;
                this.alt = alt;
                this.title = title;
                this.descr = descr;
                this.price = price;
                this.parent = document.querySelector(parentSelector);
                this.transfer = 27;
                this.changeToUAH();
            }

            changeToUAH() {
                this.price = this.price * this.transfer;
            }

            render() {
                const element = document.createElement('div');
                element.innerHTML =  `
                    <div class="menu__item">
                        <img src="${this.src}" alt="${this.alt}">
                        <h3 class="menu__item-subtitle">Меню “${this.title}”</h3>
                        <div class="menu__item-descr">В меню “${this.title}” ${this.descr}
                        </div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                        </div>
                    </div>
                `;
                this.parent.append(element);
            }
        }


        new MenuCard(
             "https://f1.ds-ua.net/u_dirs/002/2659/0d03f55d7a5632e1f9ae2ecc19da8c15.jpg", 
             "vegy",
             "Ожиряшка",
            ",мы используем не только много майонеза и жира как наполнитель, но и качественное сало как украшение, которое кстати при этом не содержит  ни капли мяса - это самое белое меню",
            23,
            ".menu .container"
        ).render();
        new MenuCard(
            "https://c7.hotpng.com/preview/521/365/115/earthworms-wikia-digital-pet-others.jpg", 
            "vegy",
            "Букашка",
           ",мы используем не только много жуков и  и мух как наполнитель, но и толстых дождевых червей как украшение, которое кстати при этом содержат много земли при минимуму каллорий  - это самое землистое меню",
           22,
           ".menu .container"
       ).render();

          
});


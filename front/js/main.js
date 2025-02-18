(function (){
    const apiURL = 'https://fav-prom.com/api_shanghai';
    const resultsTable = document.querySelector('#results-table');
    const resultsTableHead = resultsTable.querySelector('.tableResults__head');
    const topResultsTable = document.querySelector('#top-users');
    const resultsTableOther = document.querySelector('#results-table-other');

    let locale = 'en';
    let users;
    let i18nData = {};
    let userId;
    userId = 100300268;

    const PRIZES_CSS = ['place1', 'place2', 'place3'];


    function loadTranslations() {
        return fetch(`${apiURL}/translates/${locale}`).then(res => res.json())
            .then(json => {
                i18nData = json;
                // translate();

                // var mutationObserver = new MutationObserver(function (mutations) {
                //     translate();
                // });
                // mutationObserver.observe(document.getElementById('sportTour'), {
                //     childList: true,
                //     subtree: true,
                // });

            });
    }

    function translate() {
        const elems = document.querySelectorAll('[data-translate]')
        if (elems && elems.length) {
            elems.forEach(elem => {
                const key = elem.getAttribute('data-translate');
                elem.innerHTML = i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
                elem.removeAttribute('data-translate');
            })
        }
        refreshLocalizedClass();
    }

    function refreshLocalizedClass(element, baseCssClass) {
        if (!element) {
            return;
        }
        for (const lang of ['uk', 'en']) {
            element.classList.remove(baseCssClass + lang);
        }
        element.classList.add(baseCssClass + locale);
    }

    const request = function (link, extraOptions) {
        return fetch(apiURL + link, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            ...(extraOptions || {})
        }).then(res => res.json())
    }


    function getData() {
        return Promise.all([
            request('/users?nocache=1'),
        ])
    }

    const InitPage = () => {
        getData().then(res => {
            users = res[0].sort((a, b) => b.points - a.points);
            // users = users.slice(0, 10)
            renderUsers(users);
            // translate();
        })
    }

    function init() {
        if (window.store) {
            var state = window.store.getState();
            userId = state.auth.isAuthorized && state.auth.id || '';
            InitPage();
        } else {
            InitPage();
            let c = 0;
            var i = setInterval(function () {
                if (c < 50) {
                    if (!!window.g_user_id) {
                        userId = window.g_user_id;
                        InitPage();
                        // checkUserAuth();
                        clearInterval(i);
                    }
                } else {
                    clearInterval(i);
                }
            }, 200);
        }}


    function renderUsers(users) {
        populateUsersTable(users, userId);
    }

    function populateUsersTable(users, currentUserId) {
        resultsTable.innerHTML = '';
        resultsTableOther.innerHTML = '';

        if (!users || !users.length) return;

        let topUsers = users.slice(0, 10);
        topUsers.forEach(user => displayUser(user, user.userid === currentUserId, resultsTable, users));

        const currentUser = users.find(user => user.userid === currentUserId);
        const currentUserIndex = currentUser ? users.indexOf(currentUser) : -1;

        if (currentUserIndex >= 10) {
            let otherUsers = users.slice(Math.max(10, currentUserIndex - 1), currentUserIndex + 2);
            otherUsers.forEach(user => displayUser(user, user.userid === currentUserId, resultsTableOther, users));
        }
    }

    function displayUser(user, isCurrentUser, table, allUsers) {
        const additionalUserRow = document.createElement('div');
        additionalUserRow.classList.add('tableResults__row');

        if (isCurrentUser) {
            additionalUserRow.classList.add('_yourPlace');
        }

        const place = allUsers.indexOf(user) + 1;
        const prizePlaceCss = PRIZES_CSS[place - 1];
        if (prizePlaceCss) {
            additionalUserRow.classList.add(prizePlaceCss);
        }

        const prizeKey = getPrizeTranslationKey(place);
        additionalUserRow.innerHTML = `
        <div class="tableResults__row-item">${place}</div>
        <div class="tableResults__row-item">${isCurrentUser ? user.userid : maskUserId(user.userid)}</div>
        <div class="tableResults__row-item">${user.points}</div>
        <div class="tableResults__row-item">${user.multiplier}</div>
        <div class="tableResults__row-item">${user.totalPoints}</div>
        <div class="tableResults__row-item">${prizeKey ? translateKey(prizeKey) : ' - '}</div>
    `;
        table.append(additionalUserRow);
    }
    function maskUserId(userId) {
        return "**" + userId.toString().slice(2);
    }

    function translateKey(key) {
        if (!key) {
            return;
        }
        return i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
    }

    function getPrizeTranslationKey(place) {
        if (place <= 5) {
            return `prize_${place}`
        } else if (place <= 10) {
            return `prize_6-10`
        } else if (place <= 20) {
            return `prize_11-20`
        } else if (place <= 35) {
            return `prize_21-35`
        } else if (place <= 50) {
            return `prize_36-50`
        } else if (place <= 75) {
            return `prize_51-75`
        } else if (place <= 100) {
            return `prize_76-100`
        } else if (place <= 125) {
            return `prize_101-125`
        } else if (place <= 150) {
            return `prize_126-150`
        } else if (place <= 175) {
            return `prize_151-175`
        } else if (place <= 200) {
            return `prize_176-200`
        }
    }

    const popupBtns = document.querySelectorAll(".info__item-btn")
    const popups = document.querySelectorAll(".info__item-popup")


    popups.forEach((popup, i) =>{
        const close = popup.querySelector(".info__item-popup-close")
        const open = popup.parentNode.querySelector(".info__item-btn")
        setPopup(open, close, popup)
    })

    function setPopup(open, close, popup){
        open.addEventListener("click", () =>{
            popup.classList.remove("opacity")
        })
        close.addEventListener("click", () =>{
            popup.classList.add("opacity")
        })
        document.addEventListener("click", (e) =>{
            if(!popup.contains(e.target) && e.target !== open){
                popup.classList.add("opacity")
            }
        })
    }



    loadTranslations()
        .then(init);

})()


(function (){
    const apiURL = 'https://fav-prom.com/api_legendary_trophy';
    // const apiURL = 'https://fav-prom.com/api_shanghai';
    const resultsTable = document.querySelector('#results-table'),
        unauthMsgs = document.querySelectorAll('.unauth-msg'),
        participateBtns = document.querySelectorAll('.btn-join'),
        youAreInBtns = document.querySelectorAll('.took-part'),
        predictionBtns = document.querySelectorAll('.confirmBtn'),
        multiplierSpans = document.querySelectorAll('.predict__multiplier-num'),
        resultsTableHead = resultsTable.querySelector('.tableResults__head'),
        topResultsTable = document.querySelector('#top-users'),
        resultsTableOther = document.querySelector('#results-table-other'),
        tableNav = document.querySelectorAll(".results__nav-item"),
        predictColumns = document.querySelectorAll(".table__column"),
        moveLeft = document.querySelector(".table__move-left"),
        moveRight = document.querySelector(".table__move-right"),
        moveLeftResult = document.querySelector(".results__move-left"),
        moveRightResult = document.querySelector(".results__move-right"),
        tabsResult = document.querySelectorAll(".results__tab-item"),
        tabsContainer = document.querySelector('.results__tab');


    let tournamentStage = 2

    let columnIndex = tournamentStage - 1

    let userInfo = {};

    let translateState = false

    let locale = 'en';
    let users;
    let i18nData = {};
    let userId;
    userId = 100300268;

    const PRIZES_CSS = ['place1', 'place2', 'place3'];

    let predictData = JSON.parse(localStorage.getItem("predictData")) || [];
    console.log(predictData)

    let checkUserAuth = () => {
        if (userId) {
            console.log(userId)
            for (const unauthMes of unauthMsgs) {
                unauthMes.classList.add('hide');
            }
            request(`/favuser/${userId}`)
                .then(res => {
                    if (res.userid) {
                        participateBtns.forEach(item => item.classList.add('hide'));
                        youAreInBtns.forEach(item => item.classList.remove('hide'));
                        predictionBtns.forEach(item => item.classList.remove('hide'));
                        refreshUserInfo(res);
                    } else {
                        participateBtns.forEach(item => item.classList.remove('hide'));
                    }
                })
        } else {
            for (let participateBtn of participateBtns) {
                participateBtn.classList.add('hide');
            }
            for (const unauthMes of unauthMsgs) {
                console.log(unauthMes)
                unauthMes.classList.remove('hide');
            }
        }
    }

    function refreshUserInfo(user) {
        if (!user) {
            return;
        }
        userInfo = user;
        console.log(userInfo)

        // Оновлюємо всі multiplierSpans
        multiplierSpans.forEach((span, index) => {
            span.innerHTML = userInfo.multiplier || 0;
        });

        // let openingBet = {
        //     bigWinner: {team: 'APEKS', outcome: false},
        //     bigLoser: {team: 'CLOUD9', outcome: true},
        //     teamsBet: [{team: 'ENCE'}, {team: 'HEROIC'}, {team: 'SAW', outcome: true}, {team: 'FURIA'}, {team: 'KOI', outcome: false}, {team: 'AMKAL'}, {team: 'LEGACY'}]
        // };
        // refreshBets(user.openingBet, promoStages[0]);
        // refreshBets(user.eliminationBet, promoStages[1]);
        // refreshBets(user.winnerBet, promoStages[2]);

        // if (activePhase && isValidBet(userInfo[activePhase.betFieldName])) {
        //     predictionBtns.forEach(item => item.classList.remove('blockBtn'));
        // }
    }

    function loadTranslations() {
        return fetch(`${apiURL}/new-translates/${locale}`).then(res => res.json())
            .then(json => {
                i18nData = json;
                translate();
                var mutationObserver = new MutationObserver(function (mutations) {
                    translate();
                });
                mutationObserver.observe(document.getElementById('legendary-trophy'), {
                    childList: true,
                    subtree: true,
                });
            });
    }

    function translate() {
        const elems = document.querySelectorAll('[data-translate]')
        if(translateState){
            elems.forEach(elem => {
                const key = elem.getAttribute('data-translate');
                elem.innerHTML = i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
                elem.removeAttribute('data-translate');
            })
        }else{
            console.log("translation work!")
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
        if(window.innerWidth <= 500){
            updateActiveStage(predictColumns);
        }
        predictColumns.forEach((column, i) =>{
            if(i + 1 > tournamentStage){
                column.classList.add("_lock")
            }
            if(i + 1 < tournamentStage){
                column.classList.add("_done")
            }
            setPredictColumn(column)
            if(column.classList.contains("_lock")){
                const teams = column.querySelectorAll('.table__team-name')
                const date = column.querySelectorAll('.table__chose-date')
                const time = column.querySelectorAll('.table__chose-time')
                teams.forEach(team => {
                    team.textContent = "—"
                })
                date.forEach(date => {
                    date.textContent = "—"
                })
                time.forEach(time => {
                    time.textContent = "—"
                })
            }
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
                        checkUserAuth();
                        clearInterval(i);
                    }
                } else {
                    clearInterval(i);
                }
            }, 200);

        }
        checkUserAuth();

        participateBtns.forEach((authBtn, i) => {
            authBtn.addEventListener('click', (e) => {
                e.preventDefault();
                participate();
            });
        });
    }

    function participate() {
        if (!userId) {
            return;
        }

        const params = {userid: userId};

        request('/user', {
            method: 'POST',
            body: JSON.stringify(params)
        }).then(res => {
            participateBtns.forEach(item => item.classList.add('hide'));
            youAreInBtns.forEach(item => item.classList.remove('hide'));
            predictionBtns.forEach(item => item.classList.remove('hide'));
            participate = true;
            checkUserAuth();
            InitPage();
        });
    }

    function renderUsers(users) {
        populateUsersTable(users, userId);
    }

    function populateUsersTable(users, currentUserId) {
        resultsTable.innerHTML = '';
        resultsTableOther.innerHTML = '';

        if (!users || !users.length) return;

        let topUsers = users.slice(0, 20);
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
        if (isCurrentUser) {
            const youBlock = document.createElement('div');
            youBlock.setAttribute('data-translate', 'you');
            youBlock.textContent = "Ти" // для тесту поки нема транслейтів
            youBlock.classList.add('_your');
            additionalUserRow.append(youBlock)
            additionalUserRow.classList.add("_your")

        }
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
        if(i === 0){
            popup.classList.add("_left")
        }
        if(i === popups.length - 1){
            popup.classList.add("_right")
        }
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


    tabsContainer.innerHTML = '';

    for (let i = 0; i < tournamentStage; i++) {
        const tab = document.createElement('div');
        tab.classList.add('results__tab-item');
        tabsContainer.appendChild(tab);
    }

    const tableNavTab = document.querySelectorAll(".results__tab-item");

    tableNav.forEach((item, i) =>{
        if(i + 1 > tournamentStage){
            item.classList.add("_lock")
        }

        // console.log(i + 1, tournamentStage)

        if(i + 1 === tournamentStage){
            item.classList.add("_active")
        }

        item.addEventListener("click", (e) =>{
            if(e.target.classList.contains("_lock")){
                return
            }
            tableNav.forEach(nav =>{
                nav.classList.remove("_active")
            })
            e.target.classList.add("_active")
        })
    })
    tableNavTab.forEach((item, i) =>{
        if(i + 1 === tournamentStage){
            item.classList.add("_active")
        }
    })

    const tableTab = document.querySelectorAll('.table__tab-item')

    tableTab.forEach((item, i) =>{
        if(i + 1 === tournamentStage){
            item.classList.add("_active")
        }
    })


    function activateSelectedTeams(storedPredictData) {

        // Проходимося по всіх елементах predictData
        storedPredictData.forEach(data => {
            const { stage, team } = data;

            // Знаходимо всі колонки, які відповідають даному етапу (stage)
            const columns = document.querySelectorAll(`.${getStageClass(stage)}`);

            columns.forEach(column => {
                // Знаходимо всі блоки з командами в цій колонці
                const teamBlocks = column.querySelectorAll(".table__chose");

                teamBlocks.forEach(block => {
                    // Знаходимо всі радіокнопки та назви команд в цьому блоку
                    const teamRadios = block.querySelectorAll(".table__team-radio");
                    const teams = block.querySelectorAll(".table__team-name");

                    // Проходимося по всіх командах в блоку
                    teams.forEach((teamElement, index) => {
                        // Якщо назва команди співпадає з вибраною командою з predictData
                        if (teamElement.textContent.trim() === team) {
                            // Активуємо відповідну радіокнопку
                            teamRadios[index].classList.add("_active");
                        }
                    });
                });
            });
        });
    }

// Допоміжна функція для отримання класу етапу на основі його назви
    function getStageClass(stage) {
        switch (stage) {
            case "Opening Stage":
                return "stage1-8";
            case "Quarterfinals":
                return "stage1-4";
            case "Semifinals":
                return "stage1-2";
            case "Final":
                return "stage-final";
            default:
                return "";
        }
    }

    document.addEventListener("DOMContentLoaded", () => activateSelectedTeams(predictData));

    function updateLocalStorage() {
        localStorage.setItem("predictData", JSON.stringify(predictData));
    }

    function getTeamName(teamBlock, stage, column) {
        if(column.classList.contains("_done") || column.classList.contains("_active")){
            return
        }
        const teamRadios = teamBlock.querySelectorAll(".table__team-radio");
        const teams = teamBlock.querySelectorAll(".table__team-name");

        teamRadios.forEach((radio, index) => {
            radio.addEventListener("click", (e) => {
                teamRadios.forEach(item => item.classList.remove("_active"))
                e.target.classList.add("_active")
                const selectedTeam = teams[index].textContent.trim();

                // Видаляємо попередню команду з цього блоку
                predictData = predictData.filter(item => {
                    if (item.stage !== stage) return true;

                    return !Array.from(teams).some(team => team.textContent.trim() === item.team);
                });

                // Додаємо нову команду
                predictData.push({ stage: stage, team: selectedTeam });

                // Оновлюємо localStorage
                updateLocalStorage();

                console.log(predictData); // Перевіряємо, чи правильно працює
            });
        });
    }


    function setPredictColumn(column) {
        console.log(column.classList.contains("_lock") )
        let stage = ""

        column.classList.contains("stage1-8") ? stage = "Opening Stage" : null;
        column.classList.contains("stage1-4") ? stage = "Quarterfinals" : null;
        column.classList.contains("stage1-2") ? stage = "Semifinals" : null;
        column.classList.contains("stage-final") ? stage = "Final" : null;

        const teamBlocks = column.querySelectorAll(".table__chose");

        teamBlocks.forEach(block => getTeamName(block, stage, column));


    }


    function updateActiveStage(stages) {
        stages.forEach((stage, index) => {

            stage.classList.remove("_active")
            if(index === columnIndex){
                console.log("sadas")
                stage.classList.add("_active")
            }
        });
    }

    moveLeft.addEventListener("click", () => {
        if (columnIndex >= 0) {
            columnIndex--;
            updateActiveStage(predictColumns);
        }
        if (columnIndex < 0) {
            columnIndex = predictColumns.length - 1;
            updateActiveStage(predictColumns);
            tableTab.forEach((item, i) =>{
                item.classList.remove("_active")
                if(i + 1 === columnIndex){
                    item.classList.add("_active")
                }
            })
        }
        tableTab.forEach((item, i) =>{
            item.classList.remove("_active")
            if(i === columnIndex){
                item.classList.add("_active")
            }
        })
    });

    moveRight.addEventListener("click", () => {
        if (columnIndex < predictColumns.length - 1 || columnIndex >= 0) {
            columnIndex++;
            updateActiveStage(predictColumns);
        }
        if(columnIndex === predictColumns.length){
            columnIndex = 0
            updateActiveStage(predictColumns);
        }
        tableTab.forEach((item, i) =>{
            item.classList.remove("_active")
            if(i === columnIndex){
                item.classList.add("_active")
            }
        })
    });

    moveLeftResult.addEventListener("click", () => {
        if (columnIndex > 0) {
            columnIndex--;
        } else {
            columnIndex = tabsResult.length - 1;
        }
        // updateActiveStage(tabsResult);
        tableNav.forEach((item, i) =>{
            item.classList.remove("_active")
            if(columnIndex < 1){
                columnIndex = tournamentStage
            }

            if(i + 1 === columnIndex){
                item.classList.add("_active")
            }

        })
        tableNavTab.forEach((item, i) =>{
            item.classList.remove("_active")
            if(i + 1 === columnIndex){
                item.classList.add("_active")
            }
        })
    });

    moveRightResult.addEventListener("click", () => {
        if (columnIndex < tabsResult.length - 1) {
            columnIndex++;
        } else {
            columnIndex = 0;
        }
        tableNav.forEach((item, i) =>{
            item.classList.remove("_active")
            if(columnIndex > tournamentStage){
                columnIndex = 1
            }

            if(i + 1 === columnIndex){
                item.classList.add("_active")
            }

        })
        tableNavTab.forEach((item, i) =>{
            item.classList.remove("_active")
            if(i + 1 === columnIndex){
                item.classList.add("_active")
            }
        })
    });

    loadTranslations()
        .then(init);

})()


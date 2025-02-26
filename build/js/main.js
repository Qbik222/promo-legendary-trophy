"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
(function () {
  var _sessionStorage$getIt;
  var apiURL = 'https://fav-prom.com/api_legendary_trophy';
  var apiURLTable = 'https://fav-prom.com/api_shanghai';
  var resultsTable = document.querySelector('#results-table'),
    mainPage = document.querySelector(".fav-page"),
    unauthMsgs = document.querySelectorAll('.unauth-msg'),
    participateBtns = document.querySelectorAll('.btn-join'),
    youAreInBtns = document.querySelectorAll('.took-part'),
    predictionBtns = document.querySelectorAll('.confirmBtn'),
    multiplierSpans = document.querySelectorAll('.predict__multiplier-num'),
    resultsTableHead = resultsTable.querySelector('.tableResults__head'),
    topResultsTable = document.querySelector('#results-table'),
    resultsTableOther = document.querySelector('#results-table-other'),
    tableNav = document.querySelectorAll(".results__nav-item"),
    predictColumns = document.querySelectorAll(".table__column"),
    moveLeft = document.querySelector(".table__move-left"),
    moveRight = document.querySelector(".table__move-right"),
    moveLeftResult = document.querySelector(".results__move-left"),
    moveRightResult = document.querySelector(".results__move-right"),
    tabsResult = document.querySelectorAll(".results__tab-item"),
    tabsContainer = document.querySelector('.results__tab');
  var tournamentStage = 2;
  var columnIndex = tournamentStage - 1;
  var userInfo = {};
  var translateState = true;
  var debug = true;
  // let locale = 'uk';
  var locale = (_sessionStorage$getIt = sessionStorage.getItem("locale")) !== null && _sessionStorage$getIt !== void 0 ? _sessionStorage$getIt : "uk";
  var users;
  var i18nData = {};
  var i18nDataTable = {};
  var userId;
  userId = sessionStorage.getItem("userId") ? Number(sessionStorage.getItem("userId")) : null;
  var PRIZES_CSS = ['place1', 'place2', 'place3'];
  var predictData = JSON.parse(localStorage.getItem("predictData")) || [];
  console.log(predictData);
  var checkUserAuth = function checkUserAuth() {
    if (userId) {
      console.log(userId);
      var _iterator = _createForOfIteratorHelper(unauthMsgs),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var unauthMes = _step.value;
          unauthMes.classList.add('hide');
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      request("/favuser/".concat(userId)).then(function (res) {
        if (res.userid) {
          participateBtns.forEach(function (item) {
            return item.classList.add('hide');
          });
          youAreInBtns.forEach(function (item) {
            return item.classList.remove('hide');
          });
          predictionBtns.forEach(function (item) {
            return item.classList.remove('hide');
          });
          refreshUserInfo(res);
        } else {
          participateBtns.forEach(function (item) {
            return item.classList.remove('hide');
          });
        }
      });
    } else {
      var _iterator2 = _createForOfIteratorHelper(participateBtns),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var participateBtn = _step2.value;
          participateBtn.classList.add('hide');
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var _iterator3 = _createForOfIteratorHelper(unauthMsgs),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _unauthMes = _step3.value;
          console.log(_unauthMes);
          _unauthMes.classList.remove('hide');
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  };
  function refreshUserInfo(user) {
    if (!user) {
      return;
    }
    userInfo = user;
    console.log(userInfo);

    // Оновлюємо всі multiplierSpans
    multiplierSpans.forEach(function (span, index) {
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
    return fetch("".concat(apiURL, "/new-translates/").concat(locale)).then(function (res) {
      return res.json();
    }).then(function (json) {
      i18nData = json;
      translate();
      var mutationObserver = new MutationObserver(function (mutations) {
        translate();
      });
      mutationObserver.observe(document.getElementById('legendary-trophy'), {
        childList: true,
        subtree: true
      });
    });
  }
  function translate() {
    var elems = document.querySelectorAll('[data-translate]');
    if (translateState) {
      elems.forEach(function (elem) {
        var key = elem.getAttribute('data-translate');
        elem.innerHTML = i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
        elem.removeAttribute('data-translate');
      });
    } else {
      console.log("translation work!");
    }
    refreshLocalizedClass(mainPage);
  }
  function refreshLocalizedClass(element) {
    if (!element) {
      return;
    }
    for (var _i = 0, _arr = ['uk', 'en']; _i < _arr.length; _i++) {
      var lang = _arr[_i];
      element.classList.remove(lang);
    }
    element.classList.add(locale);
  }
  var request = function request(link, extraOptions) {
    return fetch(apiURL + link, _objectSpread({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }, extraOptions || {})).then(function (res) {
      return res.json();
    });
  };
  function getData() {
    return Promise.all([request('/users?nocache=1')]);
  }
  var InitPage = function InitPage() {
    if (debug) {
      Promise.all([requestTable('/users?nocache=1')]).then(function (res) {
        users = res[0].sort(function (a, b) {
          return b.points - a.points;
        });
        renderUsers(users);
      });
    }
    getData().then(function (res) {
      users = res[0].sort(function (a, b) {
        return b.points - a.points;
      });
      // users = users.slice(0, 10)
      if (!debug) {
        renderUsers(users);
      }
      // translate();
    });

    if (window.innerWidth <= 500) {
      updateActiveStage(predictColumns);
    }
    predictColumns.forEach(function (column, i) {
      if (i + 1 > tournamentStage) {
        column.classList.add("_lock");
      }
      if (i + 1 < tournamentStage) {
        column.classList.add("_done");
      }
      setPredictColumn(column);
      if (column.classList.contains("_lock")) {
        var teams = column.querySelectorAll('.table__team-name');
        var date = column.querySelectorAll('.table__chose-date');
        var time = column.querySelectorAll('.table__chose-time');
        teams.forEach(function (team) {
          team.textContent = "—";
        });
        date.forEach(function (date) {
          date.textContent = "—";
        });
        time.forEach(function (time) {
          time.textContent = "—";
        });
      }
    });
  };
  function init() {
    if (window.store) {
      var state = window.store.getState();
      userId = state.auth.isAuthorized && state.auth.id || '';
      InitPage();
    } else {
      InitPage();
      var c = 0;
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
    participateBtns.forEach(function (authBtn, i) {
      authBtn.addEventListener('click', function (e) {
        e.preventDefault();
        participate();
      });
    });
  }
  function participate() {
    if (!userId) {
      return;
    }
    var params = {
      userid: userId
    };
    request('/user', {
      method: 'POST',
      body: JSON.stringify(params)
    }).then(function (res) {
      participateBtns.forEach(function (item) {
        return item.classList.add('hide');
      });
      youAreInBtns.forEach(function (item) {
        return item.classList.remove('hide');
      });
      predictionBtns.forEach(function (item) {
        return item.classList.remove('hide');
      });
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
    var topUsers = users.slice(0, 20);
    topUsers.forEach(function (user) {
      return displayUser(user, user.userid === currentUserId, resultsTable, users);
    });
    var currentUser = users.find(function (user) {
      return user.userid === currentUserId;
    });
    var currentUserIndex = currentUser ? users.indexOf(currentUser) : -1;
    if (currentUserIndex >= 10) {
      var otherUsers = users.slice(Math.max(10, currentUserIndex - 1), currentUserIndex + 2);
      otherUsers.forEach(function (user) {
        return displayUser(user, user.userid === currentUserId, resultsTableOther, users);
      });
    }
  }
  function displayUser(user, isCurrentUser, table, allUsers) {
    var additionalUserRow = document.createElement('div');
    additionalUserRow.classList.add('tableResults__row');
    var place = allUsers.indexOf(user) + 1;
    var prizePlaceCss = PRIZES_CSS[place - 1];
    if (prizePlaceCss) {
      additionalUserRow.classList.add(prizePlaceCss);
    }
    var prizeKey;
    if (debug) {
      prizeKey = getPrizeTranslationKeyTest(place);
    } else {
      prizeKey = getPrizeTranslationKey(place);
    }
    console.log(prizeKey);
    additionalUserRow.innerHTML = "\n        <div class=\"tableResults__row-item\">".concat(place, "</div>\n        <div class=\"tableResults__row-item\">").concat(isCurrentUser ? user.userid : maskUserId(user.userid), "</div>\n        <div class=\"tableResults__row-item\">").concat(user.points, "</div>\n        <div class=\"tableResults__row-item\">").concat(user.multiplier, "</div>\n        <div class=\"tableResults__row-item\">").concat(user.totalPoints, "</div>\n        <div class=\"tableResults__row-item\">").concat(prizeKey ? translateKey(prizeKey) : ' - ', "</div>\n    ");
    if (isCurrentUser) {
      var youBlock = document.createElement('div');
      youBlock.setAttribute('data-translate', 'you');
      youBlock.textContent = "Ти"; // для тесту поки нема транслейтів
      youBlock.classList.add('_your');
      additionalUserRow.append(youBlock);
      additionalUserRow.classList.add("_your");
    }
    table.append(additionalUserRow);
    translateTable();
  }
  function maskUserId(userId) {
    return "**" + userId.toString().slice(2);
  }
  function translateKey(key) {
    if (!key) {
      return;
    }
    return debug ? i18nDataTable[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key : i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
  }
  function getPrizeTranslationKey(place) {
    if (place <= 5) {
      return "prize_".concat(place);
    } else if (place <= 10) {
      return "prize_6-10";
    } else if (place <= 20) {
      return "prize_11-20";
    } else if (place <= 35) {
      return "prize_21-35";
    } else if (place <= 50) {
      return "prize_36-50";
    } else if (place <= 75) {
      return "prize_51-75";
    } else if (place <= 100) {
      return "prize_76-100";
    } else if (place <= 125) {
      return "prize_101-125";
    } else if (place <= 150) {
      return "prize_126-150";
    } else if (place <= 175) {
      return "prize_151-175";
    } else if (place <= 200) {
      return "prize_176-200";
    }
  }
  var popupBtns = document.querySelectorAll(".info__item-btn");
  var popups = document.querySelectorAll(".info__item-popup");
  popups.forEach(function (popup, i) {
    if (i === 0) {
      popup.classList.add("_left");
    }
    if (i === popups.length - 1) {
      popup.classList.add("_right");
    }
    var close = popup.querySelector(".info__item-popup-close");
    var open = popup.parentNode.querySelector(".info__item-btn");
    setPopup(open, close, popup);
  });
  function setPopup(open, close, popup) {
    open.addEventListener("click", function () {
      popup.classList.remove("opacity");
    });
    close.addEventListener("click", function () {
      popup.classList.add("opacity");
    });
    document.addEventListener("click", function (e) {
      if (!popup.contains(e.target) && e.target !== open) {
        popup.classList.add("opacity");
      }
    });
  }
  tabsContainer.innerHTML = '';
  for (var i = 0; i < tournamentStage; i++) {
    var tab = document.createElement('div');
    tab.classList.add('results__tab-item');
    tabsContainer.appendChild(tab);
  }
  var tableNavTab = document.querySelectorAll(".results__tab-item");
  tableNav.forEach(function (item, i) {
    if (i + 1 > tournamentStage) {
      item.classList.add("_lock");
    }

    // console.log(i + 1, tournamentStage)

    if (i + 1 === tournamentStage) {
      item.classList.add("_active");
    }
    item.addEventListener("click", function (e) {
      if (e.target.classList.contains("_lock")) {
        return;
      }
      tableNav.forEach(function (nav) {
        nav.classList.remove("_active");
      });
      e.target.classList.add("_active");
    });
  });
  tableNavTab.forEach(function (item, i) {
    if (i + 1 === tournamentStage) {
      item.classList.add("_active");
    }
  });
  var tableTab = document.querySelectorAll('.table__tab-item');
  tableTab.forEach(function (item, i) {
    if (i + 1 === tournamentStage) {
      item.classList.add("_active");
    }
  });
  function activateSelectedTeams(storedPredictData) {
    // Проходимося по всіх елементах predictData
    storedPredictData.forEach(function (data) {
      var stage = data.stage,
        team = data.team;

      // Знаходимо всі колонки, які відповідають даному етапу (stage)
      var columns = document.querySelectorAll(".".concat(getStageClass(stage)));
      columns.forEach(function (column) {
        // Знаходимо всі блоки з командами в цій колонці
        var teamBlocks = column.querySelectorAll(".table__chose");
        teamBlocks.forEach(function (block) {
          // Знаходимо всі радіокнопки та назви команд в цьому блоку
          var teamRadios = block.querySelectorAll(".table__team-radio");
          var teams = block.querySelectorAll(".table__team-name");

          // Проходимося по всіх командах в блоку
          teams.forEach(function (teamElement, index) {
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
  document.addEventListener("DOMContentLoaded", function () {
    return activateSelectedTeams(predictData);
  });
  function updateLocalStorage() {
    localStorage.setItem("predictData", JSON.stringify(predictData));
  }
  function getTeamName(teamBlock, stage, column) {
    if (column.classList.contains("_done") || column.classList.contains("_active")) {
      return;
    }
    var teamRadios = teamBlock.querySelectorAll(".table__team-radio");
    var teams = teamBlock.querySelectorAll(".table__team-name");
    teamRadios.forEach(function (radio, index) {
      radio.addEventListener("click", function (e) {
        teamRadios.forEach(function (item) {
          return item.classList.remove("_active");
        });
        e.target.classList.add("_active");
        var selectedTeam = teams[index].textContent.trim();

        // Видаляємо попередню команду з цього блоку
        predictData = predictData.filter(function (item) {
          if (item.stage !== stage) return true;
          return !Array.from(teams).some(function (team) {
            return team.textContent.trim() === item.team;
          });
        });

        // Додаємо нову команду
        predictData.push({
          stage: stage,
          team: selectedTeam
        });

        // Оновлюємо localStorage
        updateLocalStorage();
        console.log(predictData); // Перевіряємо, чи правильно працює
      });
    });
  }

  function setPredictColumn(column) {
    console.log(column.classList.contains("_lock"));
    var stage = "";
    column.classList.contains("stage1-8") ? stage = "Opening Stage" : null;
    column.classList.contains("stage1-4") ? stage = "Quarterfinals" : null;
    column.classList.contains("stage1-2") ? stage = "Semifinals" : null;
    column.classList.contains("stage-final") ? stage = "Final" : null;
    var teamBlocks = column.querySelectorAll(".table__chose");
    teamBlocks.forEach(function (block) {
      return getTeamName(block, stage, column);
    });
  }
  function updateActiveStage(stages) {
    stages.forEach(function (stage, index) {
      stage.classList.remove("_active");
      if (index === columnIndex) {
        console.log("sadas");
        stage.classList.add("_active");
      }
    });
  }
  moveLeft.addEventListener("click", function () {
    if (columnIndex >= 0) {
      columnIndex--;
      updateActiveStage(predictColumns);
    }
    if (columnIndex < 0) {
      columnIndex = predictColumns.length - 1;
      updateActiveStage(predictColumns);
      tableTab.forEach(function (item, i) {
        item.classList.remove("_active");
        if (i + 1 === columnIndex) {
          item.classList.add("_active");
        }
      });
    }
    tableTab.forEach(function (item, i) {
      item.classList.remove("_active");
      if (i === columnIndex) {
        item.classList.add("_active");
      }
    });
  });
  moveRight.addEventListener("click", function () {
    if (columnIndex < predictColumns.length - 1 || columnIndex >= 0) {
      columnIndex++;
      updateActiveStage(predictColumns);
    }
    if (columnIndex === predictColumns.length) {
      columnIndex = 0;
      updateActiveStage(predictColumns);
    }
    tableTab.forEach(function (item, i) {
      item.classList.remove("_active");
      if (i === columnIndex) {
        item.classList.add("_active");
      }
    });
  });
  moveLeftResult.addEventListener("click", function () {
    if (columnIndex > 0) {
      columnIndex--;
    } else {
      columnIndex = tabsResult.length - 1;
    }
    // updateActiveStage(tabsResult);
    tableNav.forEach(function (item, i) {
      item.classList.remove("_active");
      if (columnIndex < 1) {
        columnIndex = tournamentStage;
      }
      if (i + 1 === columnIndex) {
        item.classList.add("_active");
      }
    });
    tableNavTab.forEach(function (item, i) {
      item.classList.remove("_active");
      if (i + 1 === columnIndex) {
        item.classList.add("_active");
      }
    });
  });
  moveRightResult.addEventListener("click", function () {
    if (columnIndex < tabsResult.length - 1) {
      columnIndex++;
    } else {
      columnIndex = 0;
    }
    tableNav.forEach(function (item, i) {
      item.classList.remove("_active");
      if (columnIndex > tournamentStage) {
        columnIndex = 1;
      }
      if (i + 1 === columnIndex) {
        item.classList.add("_active");
      }
    });
    tableNavTab.forEach(function (item, i) {
      item.classList.remove("_active");
      if (i + 1 === columnIndex) {
        item.classList.add("_active");
      }
    });
  });
  loadTranslations().then(init).then(loadTranslationsTable);
  document.querySelector(".dark-btn").addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });
  var lngBtn = document.querySelector(".lng-btn");
  lngBtn.addEventListener("click", function () {
    if (sessionStorage.getItem("locale")) {
      sessionStorage.removeItem("locale");
    } else {
      sessionStorage.setItem("locale", "en");
    }
    window.location.reload();
  });
  var authBtn = document.querySelector(".auth-btn");
  authBtn.addEventListener("click", function () {
    if (userId) {
      sessionStorage.removeItem("userId");
    } else {
      sessionStorage.setItem("userId", '100300268');
    }
    window.location.reload();
  });

  // for test
  var requestTable = function requestTable(link, extraOptions) {
    return fetch(apiURLTable + link, _objectSpread({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }, extraOptions || {})).then(function (res) {
      return res.json();
    });
  };
  function getPrizeTranslationKeyTest(place) {
    if (place <= 5) {
      return "prize_".concat(place);
    } else if (place <= 10) {
      return "prize_6-10";
    } else if (place <= 20) {
      return "prize_11-20";
    } else if (place <= 35) {
      return "prize_21-35";
    } else if (place <= 50) {
      return "prize_36-50";
    } else if (place <= 75) {
      return "prize_51-75";
    } else if (place <= 100) {
      return "prize_76-100";
    } else if (place <= 125) {
      return "prize_101-125";
    } else if (place <= 150) {
      return "prize_126-150";
    } else if (place <= 175) {
      return "prize_151-175";
    } else if (place <= 200) {
      return "prize_176-200";
    }
  }
  function loadTranslationsTable() {
    return fetch("".concat(apiURLTable, "/translates/").concat(locale)).then(function (res) {
      return res.json();
    }).then(function (json) {
      i18nDataTable = json;
    });
  }
  function translateTable() {
    var elems = topResultsTable.querySelectorAll('[data-translate]');
    if (translateState) {
      elems.forEach(function (elem) {
        var key = elem.getAttribute('data-translate');
        elem.innerHTML = i18nDataTable[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
        elem.removeAttribute('data-translate');
      });
    } else {
      console.log("translation work!");
    }
    refreshLocalizedClass(mainPage);
  }

  // for test
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwiYXBpVVJMVGFibGUiLCJyZXN1bHRzVGFibGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJtYWluUGFnZSIsInVuYXV0aE1zZ3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFydGljaXBhdGVCdG5zIiwieW91QXJlSW5CdG5zIiwicHJlZGljdGlvbkJ0bnMiLCJtdWx0aXBsaWVyU3BhbnMiLCJyZXN1bHRzVGFibGVIZWFkIiwidG9wUmVzdWx0c1RhYmxlIiwicmVzdWx0c1RhYmxlT3RoZXIiLCJ0YWJsZU5hdiIsInByZWRpY3RDb2x1bW5zIiwibW92ZUxlZnQiLCJtb3ZlUmlnaHQiLCJtb3ZlTGVmdFJlc3VsdCIsIm1vdmVSaWdodFJlc3VsdCIsInRhYnNSZXN1bHQiLCJ0YWJzQ29udGFpbmVyIiwidG91cm5hbWVudFN0YWdlIiwiY29sdW1uSW5kZXgiLCJ1c2VySW5mbyIsInRyYW5zbGF0ZVN0YXRlIiwiZGVidWciLCJsb2NhbGUiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJ1c2VycyIsImkxOG5EYXRhIiwiaTE4bkRhdGFUYWJsZSIsInVzZXJJZCIsIk51bWJlciIsIlBSSVpFU19DU1MiLCJwcmVkaWN0RGF0YSIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImNvbnNvbGUiLCJsb2ciLCJjaGVja1VzZXJBdXRoIiwidW5hdXRoTWVzIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVxdWVzdCIsInRoZW4iLCJyZXMiLCJ1c2VyaWQiLCJmb3JFYWNoIiwiaXRlbSIsInJlbW92ZSIsInJlZnJlc2hVc2VySW5mbyIsInBhcnRpY2lwYXRlQnRuIiwidXNlciIsInNwYW4iLCJpbmRleCIsImlubmVySFRNTCIsIm11bHRpcGxpZXIiLCJsb2FkVHJhbnNsYXRpb25zIiwiZmV0Y2giLCJqc29uIiwidHJhbnNsYXRlIiwibXV0YXRpb25PYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnMiLCJvYnNlcnZlIiwiZ2V0RWxlbWVudEJ5SWQiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwiZWxlbXMiLCJlbGVtIiwia2V5IiwiZ2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwicmVmcmVzaExvY2FsaXplZENsYXNzIiwiZWxlbWVudCIsImxhbmciLCJsaW5rIiwiZXh0cmFPcHRpb25zIiwiaGVhZGVycyIsImdldERhdGEiLCJQcm9taXNlIiwiYWxsIiwiSW5pdFBhZ2UiLCJyZXF1ZXN0VGFibGUiLCJzb3J0IiwiYSIsImIiLCJwb2ludHMiLCJyZW5kZXJVc2VycyIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJ1cGRhdGVBY3RpdmVTdGFnZSIsImNvbHVtbiIsImkiLCJzZXRQcmVkaWN0Q29sdW1uIiwiY29udGFpbnMiLCJ0ZWFtcyIsImRhdGUiLCJ0aW1lIiwidGVhbSIsInRleHRDb250ZW50IiwiaW5pdCIsInN0b3JlIiwic3RhdGUiLCJnZXRTdGF0ZSIsImF1dGgiLCJpc0F1dGhvcml6ZWQiLCJpZCIsImMiLCJzZXRJbnRlcnZhbCIsImdfdXNlcl9pZCIsImNsZWFySW50ZXJ2YWwiLCJhdXRoQnRuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInBhcnRpY2lwYXRlIiwicGFyYW1zIiwibWV0aG9kIiwiYm9keSIsInN0cmluZ2lmeSIsInBvcHVsYXRlVXNlcnNUYWJsZSIsImN1cnJlbnRVc2VySWQiLCJsZW5ndGgiLCJ0b3BVc2VycyIsInNsaWNlIiwiZGlzcGxheVVzZXIiLCJjdXJyZW50VXNlciIsImZpbmQiLCJjdXJyZW50VXNlckluZGV4IiwiaW5kZXhPZiIsIm90aGVyVXNlcnMiLCJNYXRoIiwibWF4IiwiaXNDdXJyZW50VXNlciIsInRhYmxlIiwiYWxsVXNlcnMiLCJhZGRpdGlvbmFsVXNlclJvdyIsImNyZWF0ZUVsZW1lbnQiLCJwbGFjZSIsInByaXplUGxhY2VDc3MiLCJwcml6ZUtleSIsImdldFByaXplVHJhbnNsYXRpb25LZXlUZXN0IiwiZ2V0UHJpemVUcmFuc2xhdGlvbktleSIsIm1hc2tVc2VySWQiLCJ0b3RhbFBvaW50cyIsInRyYW5zbGF0ZUtleSIsInlvdUJsb2NrIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kIiwidHJhbnNsYXRlVGFibGUiLCJ0b1N0cmluZyIsInBvcHVwQnRucyIsInBvcHVwcyIsInBvcHVwIiwiY2xvc2UiLCJvcGVuIiwicGFyZW50Tm9kZSIsInNldFBvcHVwIiwidGFyZ2V0IiwidGFiIiwiYXBwZW5kQ2hpbGQiLCJ0YWJsZU5hdlRhYiIsIm5hdiIsInRhYmxlVGFiIiwiYWN0aXZhdGVTZWxlY3RlZFRlYW1zIiwic3RvcmVkUHJlZGljdERhdGEiLCJkYXRhIiwic3RhZ2UiLCJjb2x1bW5zIiwiZ2V0U3RhZ2VDbGFzcyIsInRlYW1CbG9ja3MiLCJibG9jayIsInRlYW1SYWRpb3MiLCJ0ZWFtRWxlbWVudCIsInRyaW0iLCJ1cGRhdGVMb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZ2V0VGVhbU5hbWUiLCJ0ZWFtQmxvY2siLCJyYWRpbyIsInNlbGVjdGVkVGVhbSIsImZpbHRlciIsIkFycmF5IiwiZnJvbSIsInNvbWUiLCJwdXNoIiwic3RhZ2VzIiwibG9hZFRyYW5zbGF0aW9uc1RhYmxlIiwidG9nZ2xlIiwibG5nQnRuIiwicmVtb3ZlSXRlbSIsImxvY2F0aW9uIiwicmVsb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLENBQUMsWUFBVztFQUFBO0VBQ1IsSUFBTUEsTUFBTSxHQUFHLDJDQUEyQztFQUMxRCxJQUFNQyxXQUFXLEdBQUcsbUNBQW1DO0VBQ3ZELElBQU1DLFlBQVksR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7SUFDekRDLFFBQVEsR0FBR0YsUUFBUSxDQUFDQyxhQUFhLENBQUMsV0FBVyxDQUFDO0lBQzlDRSxVQUFVLEdBQUdILFFBQVEsQ0FBQ0ksZ0JBQWdCLENBQUMsYUFBYSxDQUFDO0lBQ3JEQyxlQUFlLEdBQUdMLFFBQVEsQ0FBQ0ksZ0JBQWdCLENBQUMsV0FBVyxD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QUFDO01BQ2Q4QyxLQUFLLENBQUNyQixPQUFPLENBQUMsVUFBQXNCLElBQUksRUFBSTtRQUNsQixJQUFNQyxHQUFHLEdBQUdELElBQUksQ0FBQ0UsWUFBWSxDQUFDLGdCQUFnQixDQUFDO1FBQy9DRixJQUFJLENBQUNkLFNBQVMsR0FBRzFCLGFBQWEsQ0FBQ3lDLEdBQUcsQ0FBQyxJQUFJLDBDQUEwQyxHQUFHQSxHQUFHO1FBQ3ZGRCxJQUFJLENBQUNHLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztNQUMxQyxDQUFDLENBQUM7SUFDTixDQUFDLE1BQUk7TUFDRG5DLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLG1CQUFtQixDQUFDO0lBQ3BDO0lBQ0FtQyxxQkFBcUIsQ0FBQ3hFLFFBQVEsQ0FBQztFQUNuQzs7RUFFQTtBQUVKLENBQUMsR0FBRyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpe1xuICAgIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL2Zhdi1wcm9tLmNvbS9hcGlfbGVnZW5kYXJ5X3Ryb3BoeSc7XG4gICAgY29uc3QgYXBpVVJMVGFibGUgPSAnaHR0cHM6Ly9mYXYtcHJvbS5jb20vYXBpX3NoYW5naGFpJztcbiAgICBjb25zdCByZXN1bHRzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdWx0cy10YWJsZScpLFxuICAgICAgICBtYWluUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmF2LXBhZ2VcIiksXG4gICAgICAgIHVuYXV0aE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5hdXRoLW1zZycpLFxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWpvaW4nKSxcbiAgICAgICAgeW91QXJlSW5CdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvb2stcGFydCcpLFxuICAgICAgICBwcmVkaWN0aW9uQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb25maXJtQnRuJyksXG4gICAgICAgIG11bHRpcGxpZXJTcGFucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X19tdWx0aXBsaWVyLW51bScpLFxuICAgICAgICByZXN1bHRzVGFibGVIZWFkID0gcmVzdWx0c1RhYmxlLnF1ZXJ5U2VsZWN0b3IoJy50YWJsZVJlc3VsdHNfX2hlYWQnKSxcbiAgICAgICAgdG9wUmVzdWx0c1RhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHMtdGFibGUnKSxcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdWx0cy10YWJsZS1vdGhlcicpLFxuICAgICAgICB0YWJsZU5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmVzdWx0c19fbmF2LWl0ZW1cIiksXG4gICAgICAgIHByZWRpY3RDb2x1bW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9fY29sdW1uXCIpLFxuICAgICAgICBtb3ZlTGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVfX21vdmUtbGVmdFwiKSxcbiAgICAgICAgbW92ZVJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZV9fbW92ZS1yaWdodFwiKSxcbiAgICAgICAgbW92ZUxlZnRSZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3VsdHNfX21vdmUtbGVmdFwiKSxcbiAgICAgICAgbW92ZVJpZ2h0UmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXN1bHRzX19tb3ZlLXJpZ2h0XCIpLFxuICAgICAgICB0YWJzUmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yZXN1bHRzX190YWItaXRlbVwiKSxcbiAgICAgICAgdGFic0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRzX190YWInKTtcblxuXG4gICAgbGV0IHRvdXJuYW1lbnRTdGFnZSA9IDJcblxuICAgIGxldCBjb2x1bW5JbmRleCA9IHRvdXJuYW1lbnRTdGFnZSAtIDFcblxuICAgIGxldCB1c2VySW5mbyA9IHt9O1xuXG4gICAgbGV0IHRyYW5zbGF0ZVN0YXRlID0gdHJ1ZVxuICAgIGxldCBkZWJ1ZyA9IHRydWVcbiAgICAvLyBsZXQgbG9jYWxlID0gJ3VrJztcbiAgICBsZXQgbG9jYWxlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImxvY2FsZVwiKSA/PyBcInVrXCJcbiAgICBsZXQgdXNlcnM7XG4gICAgbGV0IGkxOG5EYXRhID0ge307XG4gICAgbGV0IGkxOG5EYXRhVGFibGUgPSB7fVxuICAgIGxldCB1c2VySWQ7XG4gICAgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKSA/IE51bWJlcihzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpKSA6IG51bGxcblxuICAgIGNvbnN0IFBSSVpFU19DU1MgPSBbJ3BsYWNlMScsICdwbGFjZTInLCAncGxhY2UzJ107XG5cbiAgICBsZXQgcHJlZGljdERhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJlZGljdERhdGFcIikpIHx8IFtdO1xuICAgIGNvbnNvbGUubG9nKHByZWRpY3REYXRhKVxuXG4gICAgbGV0IGNoZWNrVXNlckF1dGggPSAoKSA9PiB7XG4gICAgICAgIGlmICh1c2VySWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXJJZClcbiAgICAgICAgICAgIGZvciAoY29uc3QgdW5hdXRoTWVzIG9mIHVuYXV0aE1zZ3MpIHtcbiAgICAgICAgICAgICAgICB1bmF1dGhNZXMuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxdWVzdChgL2ZhdnVzZXIvJHt1c2VySWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnVzZXJpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB5b3VBcmVJbkJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWRpY3Rpb25CdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoVXNlckluZm8ocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IHBhcnRpY2lwYXRlQnRuIG9mIHBhcnRpY2lwYXRlQnRucykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgdW5hdXRoTWVzIG9mIHVuYXV0aE1zZ3MpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1bmF1dGhNZXMpXG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hVc2VySW5mbyh1c2VyKSB7XG4gICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHVzZXJJbmZvID0gdXNlcjtcbiAgICAgICAgY29uc29sZS5sb2codXNlckluZm8pXG5cbiAgICAgICAgLy8g0J7QvdC+0LLQu9GO0ZTQvNC+INCy0YHRliBtdWx0aXBsaWVyU3BhbnNcbiAgICAgICAgbXVsdGlwbGllclNwYW5zLmZvckVhY2goKHNwYW4sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9IHVzZXJJbmZvLm11bHRpcGxpZXIgfHwgMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gbGV0IG9wZW5pbmdCZXQgPSB7XG4gICAgICAgIC8vICAgICBiaWdXaW5uZXI6IHt0ZWFtOiAnQVBFS1MnLCBvdXRjb21lOiBmYWxzZX0sXG4gICAgICAgIC8vICAgICBiaWdMb3Nlcjoge3RlYW06ICdDTE9VRDknLCBvdXRjb21lOiB0cnVlfSxcbiAgICAgICAgLy8gICAgIHRlYW1zQmV0OiBbe3RlYW06ICdFTkNFJ30sIHt0ZWFtOiAnSEVST0lDJ30sIHt0ZWFtOiAnU0FXJywgb3V0Y29tZTogdHJ1ZX0sIHt0ZWFtOiAnRlVSSUEnfSwge3RlYW06ICdLT0knLCBvdXRjb21lOiBmYWxzZX0sIHt0ZWFtOiAnQU1LQUwnfSwge3RlYW06ICdMRUdBQ1knfV1cbiAgICAgICAgLy8gfTtcbiAgICAgICAgLy8gcmVmcmVzaEJldHModXNlci5vcGVuaW5nQmV0LCBwcm9tb1N0YWdlc1swXSk7XG4gICAgICAgIC8vIHJlZnJlc2hCZXRzKHVzZXIuZWxpbWluYXRpb25CZXQsIHByb21vU3RhZ2VzWzFdKTtcbiAgICAgICAgLy8gcmVmcmVzaEJldHModXNlci53aW5uZXJCZXQsIHByb21vU3RhZ2VzWzJdKTtcblxuICAgICAgICAvLyBpZiAoYWN0aXZlUGhhc2UgJiYgaXNWYWxpZEJldCh1c2VySW5mb1thY3RpdmVQaGFzZS5iZXRGaWVsZE5hbWVdKSkge1xuICAgICAgICAvLyAgICAgcHJlZGljdGlvbkJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYmxvY2tCdG4nKSk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMfS9uZXctdHJhbnNsYXRlcy8ke2xvY2FsZX1gKS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgaTE4bkRhdGEgPSBqc29uO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIHZhciBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlZ2VuZGFyeS10cm9waHknKSwge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGUoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHJhbnNsYXRlXScpXG4gICAgICAgIGlmKHRyYW5zbGF0ZVN0YXRlKXtcbiAgICAgICAgICAgIGVsZW1zLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICAgICAgZWxlbS5pbm5lckhUTUwgPSBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICAgICAgICAgICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0cmFuc2xhdGlvbiB3b3JrIVwiKVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhtYWluUGFnZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaExvY2FsaXplZENsYXNzKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBsYW5nIG9mIFsndWsnLCAnZW4nXSkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGxhbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChsb2NhbGUpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3QgPSBmdW5jdGlvbiAobGluaywgZXh0cmFPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChhcGlVUkwgKyBsaW5rLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uKGV4dHJhT3B0aW9ucyB8fCB7fSlcbiAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICB9XG5cblxuXG5cbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgcmVxdWVzdCgnL3VzZXJzP25vY2FjaGU9MScpLFxuICAgICAgICBdKVxuICAgIH1cblxuICAgIGNvbnN0IEluaXRQYWdlID0gKCkgPT4ge1xuICAgICAgICBpZihkZWJ1Zyl7XG4gICAgICAgICAgICBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgcmVxdWVzdFRhYmxlKCcvdXNlcnM/bm9jYWNoZT0xJyksXG4gICAgICAgICAgICBdKS50aGVuKHJlcyA9PntcbiAgICAgICAgICAgICAgICB1c2VycyA9IHJlc1swXS5zb3J0KChhLCBiKSA9PiBiLnBvaW50cyAtIGEucG9pbnRzKTtcbiAgICAgICAgICAgICAgICByZW5kZXJVc2Vycyh1c2Vycyk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH1cbiAgICAgICAgZ2V0RGF0YSgpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHVzZXJzID0gcmVzWzBdLnNvcnQoKGEsIGIpID0+IGIucG9pbnRzIC0gYS5wb2ludHMpO1xuICAgICAgICAgICAgLy8gdXNlcnMgPSB1c2Vycy5zbGljZSgwLCAxMClcbiAgICAgICAgICAgIGlmKCFkZWJ1Zykge1xuICAgICAgICAgICAgICAgIHJlbmRlclVzZXJzKHVzZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRyYW5zbGF0ZSgpO1xuICAgICAgICB9KVxuICAgICAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA8PSA1MDApe1xuICAgICAgICAgICAgdXBkYXRlQWN0aXZlU3RhZ2UocHJlZGljdENvbHVtbnMpO1xuICAgICAgICB9XG4gICAgICAgIHByZWRpY3RDb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgaSkgPT57XG4gICAgICAgICAgICBpZihpICsgMSA+IHRvdXJuYW1lbnRTdGFnZSl7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNsYXNzTGlzdC5hZGQoXCJfbG9ja1wiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoaSArIDEgPCB0b3VybmFtZW50U3RhZ2Upe1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jbGFzc0xpc3QuYWRkKFwiX2RvbmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldFByZWRpY3RDb2x1bW4oY29sdW1uKVxuICAgICAgICAgICAgaWYoY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcIl9sb2NrXCIpKXtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZWFtcyA9IGNvbHVtbi5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfX3RlYW0tbmFtZScpXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IGNvbHVtbi5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfX2Nob3NlLWRhdGUnKVxuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBjb2x1bW4ucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX19jaG9zZS10aW1lJylcbiAgICAgICAgICAgICAgICB0ZWFtcy5mb3JFYWNoKHRlYW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICB0ZWFtLnRleHRDb250ZW50ID0gXCLigJRcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgZGF0ZS5mb3JFYWNoKGRhdGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkYXRlLnRleHRDb250ZW50ID0gXCLigJRcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgdGltZS5mb3JFYWNoKHRpbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aW1lLnRleHRDb250ZW50ID0gXCLigJRcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG5cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuc3RvcmUpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHdpbmRvdy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgdXNlcklkID0gc3RhdGUuYXV0aC5pc0F1dGhvcml6ZWQgJiYgc3RhdGUuYXV0aC5pZCB8fCAnJztcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICAgICAgbGV0IGMgPSAwO1xuICAgICAgICAgICAgdmFyIGkgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISF3aW5kb3cuZ191c2VyX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQgPSB3aW5kb3cuZ191c2VyX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgfVxuICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG5cblxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaCgoYXV0aEJ0biwgaSkgPT4ge1xuICAgICAgICAgICAgYXV0aEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFydGljaXBhdGUoKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7dXNlcmlkOiB1c2VySWR9O1xuXG4gICAgICAgIHJlcXVlc3QoJy91c2VyJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgeW91QXJlSW5CdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICBwcmVkaWN0aW9uQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgcGFydGljaXBhdGUgPSB0cnVlO1xuICAgICAgICAgICAgY2hlY2tVc2VyQXV0aCgpO1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyVXNlcnModXNlcnMpIHtcbiAgICAgICAgcG9wdWxhdGVVc2Vyc1RhYmxlKHVzZXJzLCB1c2VySWQpO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcG9wdWxhdGVVc2Vyc1RhYmxlKHVzZXJzLCBjdXJyZW50VXNlcklkKSB7XG4gICAgICAgIHJlc3VsdHNUYWJsZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgICAgaWYgKCF1c2VycyB8fCAhdXNlcnMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgbGV0IHRvcFVzZXJzID0gdXNlcnMuc2xpY2UoMCwgMjApO1xuICAgICAgICB0b3BVc2Vycy5mb3JFYWNoKHVzZXIgPT4gZGlzcGxheVVzZXIodXNlciwgdXNlci51c2VyaWQgPT09IGN1cnJlbnRVc2VySWQsIHJlc3VsdHNUYWJsZSwgdXNlcnMpKTtcblxuICAgICAgICBjb25zdCBjdXJyZW50VXNlciA9IHVzZXJzLmZpbmQodXNlciA9PiB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VySW5kZXggPSBjdXJyZW50VXNlciA/IHVzZXJzLmluZGV4T2YoY3VycmVudFVzZXIpIDogLTE7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRVc2VySW5kZXggPj0gMTApIHtcbiAgICAgICAgICAgIGxldCBvdGhlclVzZXJzID0gdXNlcnMuc2xpY2UoTWF0aC5tYXgoMTAsIGN1cnJlbnRVc2VySW5kZXggLSAxKSwgY3VycmVudFVzZXJJbmRleCArIDIpO1xuICAgICAgICAgICAgb3RoZXJVc2Vycy5mb3JFYWNoKHVzZXIgPT4gZGlzcGxheVVzZXIodXNlciwgdXNlci51c2VyaWQgPT09IGN1cnJlbnRVc2VySWQsIHJlc3VsdHNUYWJsZU90aGVyLCB1c2VycykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlzcGxheVVzZXIodXNlciwgaXNDdXJyZW50VXNlciwgdGFibGUsIGFsbFVzZXJzKSB7XG4gICAgICAgIGNvbnN0IGFkZGl0aW9uYWxVc2VyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoJ3RhYmxlUmVzdWx0c19fcm93Jyk7XG5cblxuXG4gICAgICAgIGNvbnN0IHBsYWNlID0gYWxsVXNlcnMuaW5kZXhPZih1c2VyKSArIDE7XG4gICAgICAgIGNvbnN0IHByaXplUGxhY2VDc3MgPSBQUklaRVNfQ1NTW3BsYWNlIC0gMV07XG4gICAgICAgIGlmIChwcml6ZVBsYWNlQ3NzKSB7XG4gICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKHByaXplUGxhY2VDc3MpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwcml6ZUtleTtcblxuICAgICAgICBpZiAoZGVidWcpe1xuICAgICAgICAgICAgICAgIHByaXplS2V5ID0gZ2V0UHJpemVUcmFuc2xhdGlvbktleVRlc3QocGxhY2UpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcHJpemVLZXkgPSBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5KHBsYWNlKVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHByaXplS2V5KVxuXG4gICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke3BsYWNlfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19yb3ctaXRlbVwiPiR7aXNDdXJyZW50VXNlciA/IHVzZXIudXNlcmlkIDogbWFza1VzZXJJZCh1c2VyLnVzZXJpZCl9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHt1c2VyLnBvaW50c308L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke3VzZXIubXVsdGlwbGllcn08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke3VzZXIudG90YWxQb2ludHN9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHtwcml6ZUtleSA/IHRyYW5zbGF0ZUtleShwcml6ZUtleSkgOiAnIC0gJ308L2Rpdj5cbiAgICBgO1xuICAgICAgICBpZiAoaXNDdXJyZW50VXNlcikge1xuICAgICAgICAgICAgY29uc3QgeW91QmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHlvdUJsb2NrLnNldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnLCAneW91Jyk7XG4gICAgICAgICAgICB5b3VCbG9jay50ZXh0Q29udGVudCA9IFwi0KLQuFwiIC8vINC00LvRjyDRgtC10YHRgtGDINC/0L7QutC4INC90LXQvNCwINGC0YDQsNC90YHQu9C10LnRgtGW0LJcbiAgICAgICAgICAgIHlvdUJsb2NrLmNsYXNzTGlzdC5hZGQoJ195b3VyJyk7XG4gICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5hcHBlbmQoeW91QmxvY2spXG4gICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKFwiX3lvdXJcIilcblxuICAgICAgICB9XG4gICAgICAgIHRhYmxlLmFwcGVuZChhZGRpdGlvbmFsVXNlclJvdyk7XG4gICAgICAgIHRyYW5zbGF0ZVRhYmxlKClcbiAgICB9XG4gICAgZnVuY3Rpb24gbWFza1VzZXJJZCh1c2VySWQpIHtcbiAgICAgICAgcmV0dXJuIFwiKipcIiArIHVzZXJJZC50b1N0cmluZygpLnNsaWNlKDIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUtleShrZXkpIHtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVidWcgPyBpMThuRGF0YVRhYmxlW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5IDogaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJpemVUcmFuc2xhdGlvbktleShwbGFjZSkge1xuICAgICAgICBpZiAocGxhY2UgPD0gNSkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8ke3BsYWNlfWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV82LTEwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDIwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzExLTIwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDM1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzIxLTM1YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzM2LTUwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDc1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzUxLTc1YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV83Ni0xMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTI1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzEwMS0xMjVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzEyNi0xNTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTc1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzE1MS0xNzVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzE3Ni0yMDBgXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbnN0IHBvcHVwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5mb19faXRlbS1idG5cIilcbiAgICBjb25zdCBwb3B1cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmluZm9fX2l0ZW0tcG9wdXBcIilcblxuXG4gICAgcG9wdXBzLmZvckVhY2goKHBvcHVwLCBpKSA9PntcbiAgICAgICAgaWYoaSA9PT0gMCl7XG4gICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFwiX2xlZnRcIilcbiAgICAgICAgfVxuICAgICAgICBpZihpID09PSBwb3B1cHMubGVuZ3RoIC0gMSl7XG4gICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFwiX3JpZ2h0XCIpXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2xvc2UgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX2l0ZW0tcG9wdXAtY2xvc2VcIilcbiAgICAgICAgY29uc3Qgb3BlbiA9IHBvcHVwLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi5pbmZvX19pdGVtLWJ0blwiKVxuICAgICAgICBzZXRQb3B1cChvcGVuLCBjbG9zZSwgcG9wdXApXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIHNldFBvcHVwKG9wZW4sIGNsb3NlLCBwb3B1cCl7XG4gICAgICAgIG9wZW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcIm9wYWNpdHlcIilcbiAgICAgICAgfSlcbiAgICAgICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZChcIm9wYWNpdHlcIilcbiAgICAgICAgfSlcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgIGlmKCFwb3B1cC5jb250YWlucyhlLnRhcmdldCkgJiYgZS50YXJnZXQgIT09IG9wZW4pe1xuICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJvcGFjaXR5XCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICB0YWJzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3VybmFtZW50U3RhZ2U7IGkrKykge1xuICAgICAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGFiLmNsYXNzTGlzdC5hZGQoJ3Jlc3VsdHNfX3RhYi1pdGVtJyk7XG4gICAgICAgIHRhYnNDb250YWluZXIuYXBwZW5kQ2hpbGQodGFiKTtcbiAgICB9XG5cbiAgICBjb25zdCB0YWJsZU5hdlRhYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmVzdWx0c19fdGFiLWl0ZW1cIik7XG5cbiAgICB0YWJsZU5hdi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgaWYoaSArIDEgPiB0b3VybmFtZW50U3RhZ2Upe1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiX2xvY2tcIilcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGkgKyAxLCB0b3VybmFtZW50U3RhZ2UpXG5cbiAgICAgICAgaWYoaSArIDEgPT09IHRvdXJuYW1lbnRTdGFnZSl7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgIH1cblxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJfbG9ja1wiKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWJsZU5hdi5mb3JFYWNoKG5hdiA9PntcbiAgICAgICAgICAgICAgICBuYXYuY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICB9KVxuICAgIH0pXG4gICAgdGFibGVOYXZUYWIuZm9yRWFjaCgoaXRlbSwgaSkgPT57XG4gICAgICAgIGlmKGkgKyAxID09PSB0b3VybmFtZW50U3RhZ2Upe1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHRhYmxlVGFiID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX190YWItaXRlbScpXG5cbiAgICB0YWJsZVRhYi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgaWYoaSArIDEgPT09IHRvdXJuYW1lbnRTdGFnZSl7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgIH1cbiAgICB9KVxuXG5cbiAgICBmdW5jdGlvbiBhY3RpdmF0ZVNlbGVjdGVkVGVhbXMoc3RvcmVkUHJlZGljdERhdGEpIHtcblxuICAgICAgICAvLyDQn9GA0L7RhdC+0LTQuNC80L7RgdGPINC/0L4g0LLRgdGW0YUg0LXQu9C10LzQtdC90YLQsNGFIHByZWRpY3REYXRhXG4gICAgICAgIHN0b3JlZFByZWRpY3REYXRhLmZvckVhY2goZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHN0YWdlLCB0ZWFtIH0gPSBkYXRhO1xuXG4gICAgICAgICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0LLRgdGWINC60L7Qu9C+0L3QutC4LCDRj9C60ZYg0LLRltC00L/QvtCy0ZbQtNCw0Y7RgtGMINC00LDQvdC+0LzRgyDQtdGC0LDQv9GDIChzdGFnZSlcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtnZXRTdGFnZUNsYXNzKHN0YWdlKX1gKTtcblxuICAgICAgICAgICAgY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICAgICAgLy8g0JfQvdCw0YXQvtC00LjQvNC+INCy0YHRliDQsdC70L7QutC4INC3INC60L7QvNCw0L3QtNCw0LzQuCDQsiDRhtGW0Lkg0LrQvtC70L7QvdGG0ZZcbiAgICAgICAgICAgICAgICBjb25zdCB0ZWFtQmxvY2tzID0gY29sdW1uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2Nob3NlXCIpO1xuXG4gICAgICAgICAgICAgICAgdGVhbUJsb2Nrcy5mb3JFYWNoKGJsb2NrID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8g0JfQvdCw0YXQvtC00LjQvNC+INCy0YHRliDRgNCw0LTRltC+0LrQvdC+0L/QutC4INGC0LAg0L3QsNC30LLQuCDQutC+0LzQsNC90LQg0LIg0YbRjNC+0LzRgyDQsdC70L7QutGDXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRlYW1SYWRpb3MgPSBibG9jay5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX190ZWFtLXJhZGlvXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZWFtcyA9IGJsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX3RlYW0tbmFtZVwiKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyDQn9GA0L7RhdC+0LTQuNC80L7RgdGPINC/0L4g0LLRgdGW0YUg0LrQvtC80LDQvdC00LDRhSDQsiDQsdC70L7QutGDXG4gICAgICAgICAgICAgICAgICAgIHRlYW1zLmZvckVhY2goKHRlYW1FbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0K/QutGJ0L4g0L3QsNC30LLQsCDQutC+0LzQsNC90LTQuCDRgdC/0ZbQstC/0LDQtNCw0ZQg0Lcg0LLQuNCx0YDQsNC90L7RjiDQutC+0LzQsNC90LTQvtGOINC3IHByZWRpY3REYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVhbUVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpID09PSB0ZWFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g0JDQutGC0LjQstGD0ZTQvNC+INCy0ZbQtNC/0L7QstGW0LTQvdGDINGA0LDQtNGW0L7QutC90L7Qv9C60YNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZWFtUmFkaW9zW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4vLyDQlNC+0L/QvtC80ZbQttC90LAg0YTRg9C90LrRhtGW0Y8g0LTQu9GPINC+0YLRgNC40LzQsNC90L3RjyDQutC70LDRgdGDINC10YLQsNC/0YMg0L3QsCDQvtGB0L3QvtCy0ZYg0LnQvtCz0L4g0L3QsNC30LLQuFxuICAgIGZ1bmN0aW9uIGdldFN0YWdlQ2xhc3Moc3RhZ2UpIHtcbiAgICAgICAgc3dpdGNoIChzdGFnZSkge1xuICAgICAgICAgICAgY2FzZSBcIk9wZW5pbmcgU3RhZ2VcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFnZTEtOFwiO1xuICAgICAgICAgICAgY2FzZSBcIlF1YXJ0ZXJmaW5hbHNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFnZTEtNFwiO1xuICAgICAgICAgICAgY2FzZSBcIlNlbWlmaW5hbHNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFnZTEtMlwiO1xuICAgICAgICAgICAgY2FzZSBcIkZpbmFsXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RhZ2UtZmluYWxcIjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiBhY3RpdmF0ZVNlbGVjdGVkVGVhbXMocHJlZGljdERhdGEpKTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxvY2FsU3RvcmFnZSgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcmVkaWN0RGF0YVwiLCBKU09OLnN0cmluZ2lmeShwcmVkaWN0RGF0YSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRlYW1OYW1lKHRlYW1CbG9jaywgc3RhZ2UsIGNvbHVtbikge1xuICAgICAgICBpZihjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiX2RvbmVcIikgfHwgY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcIl9hY3RpdmVcIikpe1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGVhbVJhZGlvcyA9IHRlYW1CbG9jay5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX190ZWFtLXJhZGlvXCIpO1xuICAgICAgICBjb25zdCB0ZWFtcyA9IHRlYW1CbG9jay5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX190ZWFtLW5hbWVcIik7XG5cbiAgICAgICAgdGVhbVJhZGlvcy5mb3JFYWNoKChyYWRpbywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRlYW1SYWRpb3MuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIikpXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRlYW0gPSB0ZWFtc1tpbmRleF0udGV4dENvbnRlbnQudHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgLy8g0JLQuNC00LDQu9GP0ZTQvNC+INC/0L7Qv9C10YDQtdC00L3RjiDQutC+0LzQsNC90LTRgyDQtyDRhtGM0L7Qs9C+INCx0LvQvtC60YNcbiAgICAgICAgICAgICAgICBwcmVkaWN0RGF0YSA9IHByZWRpY3REYXRhLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uc3RhZ2UgIT09IHN0YWdlKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIUFycmF5LmZyb20odGVhbXMpLnNvbWUodGVhbSA9PiB0ZWFtLnRleHRDb250ZW50LnRyaW0oKSA9PT0gaXRlbS50ZWFtKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vINCU0L7QtNCw0ZTQvNC+INC90L7QstGDINC60L7QvNCw0L3QtNGDXG4gICAgICAgICAgICAgICAgcHJlZGljdERhdGEucHVzaCh7IHN0YWdlOiBzdGFnZSwgdGVhbTogc2VsZWN0ZWRUZWFtIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8g0J7QvdC+0LLQu9GO0ZTQvNC+IGxvY2FsU3RvcmFnZVxuICAgICAgICAgICAgICAgIHVwZGF0ZUxvY2FsU3RvcmFnZSgpO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHJlZGljdERhdGEpOyAvLyDQn9C10YDQtdCy0ZbRgNGP0ZTQvNC+LCDRh9C4INC/0YDQsNCy0LjQu9GM0L3QviDQv9GA0LDRhtGO0ZRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHNldFByZWRpY3RDb2x1bW4oY29sdW1uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJfbG9ja1wiKSApXG4gICAgICAgIGxldCBzdGFnZSA9IFwiXCJcblxuICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwic3RhZ2UxLThcIikgPyBzdGFnZSA9IFwiT3BlbmluZyBTdGFnZVwiIDogbnVsbDtcbiAgICAgICAgY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcInN0YWdlMS00XCIpID8gc3RhZ2UgPSBcIlF1YXJ0ZXJmaW5hbHNcIiA6IG51bGw7XG4gICAgICAgIGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJzdGFnZTEtMlwiKSA/IHN0YWdlID0gXCJTZW1pZmluYWxzXCIgOiBudWxsO1xuICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwic3RhZ2UtZmluYWxcIikgPyBzdGFnZSA9IFwiRmluYWxcIiA6IG51bGw7XG5cbiAgICAgICAgY29uc3QgdGVhbUJsb2NrcyA9IGNvbHVtbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19jaG9zZVwiKTtcblxuICAgICAgICB0ZWFtQmxvY2tzLmZvckVhY2goYmxvY2sgPT4gZ2V0VGVhbU5hbWUoYmxvY2ssIHN0YWdlLCBjb2x1bW4pKTtcblxuXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiB1cGRhdGVBY3RpdmVTdGFnZShzdGFnZXMpIHtcbiAgICAgICAgc3RhZ2VzLmZvckVhY2goKHN0YWdlLCBpbmRleCkgPT4ge1xuXG4gICAgICAgICAgICBzdGFnZS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgaWYoaW5kZXggPT09IGNvbHVtbkluZGV4KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNhZGFzXCIpXG4gICAgICAgICAgICAgICAgc3RhZ2UuY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbW92ZUxlZnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgaWYgKGNvbHVtbkluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGNvbHVtbkluZGV4LS07XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVTdGFnZShwcmVkaWN0Q29sdW1ucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbHVtbkluZGV4IDwgMCkge1xuICAgICAgICAgICAgY29sdW1uSW5kZXggPSBwcmVkaWN0Q29sdW1ucy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgdXBkYXRlQWN0aXZlU3RhZ2UocHJlZGljdENvbHVtbnMpO1xuICAgICAgICAgICAgdGFibGVUYWIuZm9yRWFjaCgoaXRlbSwgaSkgPT57XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGlmKGkgKyAxID09PSBjb2x1bW5JbmRleCl7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHRhYmxlVGFiLmZvckVhY2goKGl0ZW0sIGkpID0+e1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgaWYoaSA9PT0gY29sdW1uSW5kZXgpe1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTtcblxuICAgIG1vdmVSaWdodC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoY29sdW1uSW5kZXggPCBwcmVkaWN0Q29sdW1ucy5sZW5ndGggLSAxIHx8IGNvbHVtbkluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGNvbHVtbkluZGV4Kys7XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVTdGFnZShwcmVkaWN0Q29sdW1ucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoY29sdW1uSW5kZXggPT09IHByZWRpY3RDb2x1bW5zLmxlbmd0aCl7XG4gICAgICAgICAgICBjb2x1bW5JbmRleCA9IDBcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZVN0YWdlKHByZWRpY3RDb2x1bW5zKTtcbiAgICAgICAgfVxuICAgICAgICB0YWJsZVRhYi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIGlmKGkgPT09IGNvbHVtbkluZGV4KXtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICBtb3ZlTGVmdFJlc3VsdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoY29sdW1uSW5kZXggPiAwKSB7XG4gICAgICAgICAgICBjb2x1bW5JbmRleC0tO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sdW1uSW5kZXggPSB0YWJzUmVzdWx0Lmxlbmd0aCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdXBkYXRlQWN0aXZlU3RhZ2UodGFic1Jlc3VsdCk7XG4gICAgICAgIHRhYmxlTmF2LmZvckVhY2goKGl0ZW0sIGkpID0+e1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgaWYoY29sdW1uSW5kZXggPCAxKXtcbiAgICAgICAgICAgICAgICBjb2x1bW5JbmRleCA9IHRvdXJuYW1lbnRTdGFnZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihpICsgMSA9PT0gY29sdW1uSW5kZXgpe1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgICAgICB0YWJsZU5hdlRhYi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIGlmKGkgKyAxID09PSBjb2x1bW5JbmRleCl7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pO1xuXG4gICAgbW92ZVJpZ2h0UmVzdWx0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChjb2x1bW5JbmRleCA8IHRhYnNSZXN1bHQubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgY29sdW1uSW5kZXgrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbHVtbkluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0YWJsZU5hdi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIGlmKGNvbHVtbkluZGV4ID4gdG91cm5hbWVudFN0YWdlKXtcbiAgICAgICAgICAgICAgICBjb2x1bW5JbmRleCA9IDFcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoaSArIDEgPT09IGNvbHVtbkluZGV4KXtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICAgICAgdGFibGVOYXZUYWIuZm9yRWFjaCgoaXRlbSwgaSkgPT57XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICBpZihpICsgMSA9PT0gY29sdW1uSW5kZXgpe1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTtcblxuICAgIGxvYWRUcmFuc2xhdGlvbnMoKVxuICAgICAgICAudGhlbihpbml0KVxuICAgICAgICAudGhlbihsb2FkVHJhbnNsYXRpb25zVGFibGUpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXJrLWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShcImRhcmtcIilcbiAgICB9KVxuXG4gICAgY29uc3QgbG5nQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sbmctYnRuXCIpXG5cbiAgICBsbmdCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJsb2NhbGVcIikpIHtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJsb2NhbGVcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwibG9jYWxlXCIsIFwiZW5cIik7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgYXV0aEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXV0aC1idG5cIilcblxuICAgIGF1dGhCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpZih1c2VySWQpe1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShcInVzZXJJZFwiKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgJzEwMDMwMDI2OCcpXG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG4gICAgfSlcblxuICAgIC8vIGZvciB0ZXN0XG4gICAgY29uc3QgcmVxdWVzdFRhYmxlID0gZnVuY3Rpb24gKGxpbmssIGV4dHJhT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gZmV0Y2goYXBpVVJMVGFibGUgKyBsaW5rLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uKGV4dHJhT3B0aW9ucyB8fCB7fSlcbiAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5VGVzdChwbGFjZSkge1xuICAgICAgICBpZiAocGxhY2UgPD0gNSkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8ke3BsYWNlfWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV82LTEwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDIwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzExLTIwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDM1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzIxLTM1YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzM2LTUwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDc1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzUxLTc1YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV83Ni0xMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTI1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzEwMS0xMjVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzEyNi0xNTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTc1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzE1MS0xNzVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzE3Ni0yMDBgXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGxvYWRUcmFuc2xhdGlvbnNUYWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2FwaVVSTFRhYmxlfS90cmFuc2xhdGVzLyR7bG9jYWxlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YVRhYmxlID0ganNvbjtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZVRhYmxlKCkge1xuXG4gICAgICAgIGNvbnN0IGVsZW1zID0gdG9wUmVzdWx0c1RhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKVxuXG5cbiAgICAgICAgaWYodHJhbnNsYXRlU3RhdGUpe1xuICAgICAgICAgICAgZWxlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IGkxOG5EYXRhVGFibGVba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHJhbnNsYXRpb24gd29yayFcIilcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoTG9jYWxpemVkQ2xhc3MobWFpblBhZ2UpO1xuICAgIH1cblxuICAgIC8vIGZvciB0ZXN0XG5cbn0pKClcblxuIl19

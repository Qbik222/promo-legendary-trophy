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
    predictionBtn = document.querySelector('.confirmBtn'),
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
  var tournamentStage = sessionStorage.getItem("tournamentStage") ? Number(sessionStorage.getItem("tournamentStage")) : 1;
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
          predictionBtn.classList.remove('hide');
          refreshUserInfo(res);
        } else {
          participateBtns.forEach(function (item) {
            return item.classList.remove('hide');
          });
          topResultsTable.classList.add("auth");
        }
      });
    } else {
      topResultsTable.classList.add("auth");
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
      if (i + 1 === tournamentStage) {
        column.classList.add("_active");
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
    checkButtonState();
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
      predictionBtn.remove('hide');
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
  function checkButtonState() {
    var activeColumn = document.querySelector(".table__column._active");
    if (!activeColumn || !localStorage.getItem("predictData")) return;
    var stageClass = Array.from(activeColumn.classList).find(function (cls) {
      return cls.startsWith('stage');
    });
    console.log(stageClass);
    var predictData = JSON.parse(localStorage.getItem("predictData"));
    var stage = getStageClassColumn(stageClass);
    console.log(stage);
    var selectedTeams = predictData.filter(function (item) {
      return item.stage === stage;
    }).length;
    console.log(predictData.filter(function (item) {
      return item.stage === stage;
    }));
    var totalSelectable = activeColumn.querySelectorAll(".table__chose").length;
    console.log(selectedTeams, totalSelectable);

    // Якщо всі можливі варіанти вибрані, розблоковуємо кнопку, інакше блокуємо
    if (selectedTeams >= totalSelectable) {
      predictionBtn.classList.remove("_lock");
    } else {
      predictionBtn.classList.add("_lock");
    }
  }
  function activateSelectedTeams(storedPredictData) {
    // Проходимося по всіх елементах predictData
    storedPredictData.forEach(function (data) {
      var stage = data.stage,
        team = data.team;

      // Знаходимо всі колонки, які відповідають даному етапу (stage)
      console.log(stage);
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
  function getStageClassColumn(stage) {
    switch (stage) {
      case "stage1-8":
        return "Opening Stage";
      case "stage1-4":
        return "Quarterfinals";
      case "stage1-2":
        return "Semifinals";
      case "stage-final":
        return "Final";
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
    if (column.classList.contains("_done")) {
      return;
    }
    var teamRadios = teamBlock.querySelectorAll(".table__team-radio");
    var teams = teamBlock.querySelectorAll(".table__team-name");
    console.log(teamBlock);
    teamRadios.forEach(function (radio, index) {
      console.log(radio);
      radio.addEventListener("click", function (e) {
        setTimeout(function () {
          checkButtonState();
        }, 50);
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
    console.log(teamBlocks);
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
  var tournamentBtn = document.querySelector(".stage-btn");
  tournamentBtn.textContent = "stage ".concat(tournamentStage);
  tournamentBtn.addEventListener("click", function () {
    tournamentStage += 1;
    if (tournamentStage > 5) {
      tournamentStage = 1;
    }
    sessionStorage.setItem("tournamentStage", tournamentStage);
    window.location.reload();
  });
  var clearButton = document.querySelector(".clear-btn");
  clearButton.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwiYXBpVVJMVGFibGUiLCJyZXN1bHRzVGFibGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJtYWluUGFnZSIsInVuYXV0aE1zZ3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFydGljaXBhdGVCdG5zIiwieW91QXJlSW5CdG5zIiwicHJlZGljdGlvbkJ0biIsIm11bHRpcGxpZXJTcGFucyIsInJlc3VsdHNUYWJsZUhlYWQiLCJ0b3BSZXN1bHRzVGFibGUiLCJyZXN1bHRzVGFibGVPdGhlciIsInRhYmxlTmF2IiwicHJlZGljdENvbHVtbnMiLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsIm1vdmVMZWZ0UmVzdWx0IiwibW92ZVJpZ2h0UmVzdWx0IiwidGFic1Jlc3VsdCIsInRhYnNDb250YWluZXIiLCJ0b3VybmFtZW50U3RhZ2UiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJOdW1iZXIiLCJjb2x1bW5JbmRleCIsInVzZXJJbmZvIiwidHJhbnNsYXRlU3RhdGUiLCJkZWJ1ZyIsImxvY2FsZSIsInVzZXJzIiwiaTE4bkRhdGEiLCJpMThuRGF0YVRhYmxlIiwidXNlcklkIiwiUFJJWkVTX0NTUyIsInByZWRpY3REYXRhIiwiSlNPTiIsInBhcnNlIiwibG9jYWxTdG9yYWdlIiwiY29uc29sZSIsImxvZyIsImNoZWNrVXNlckF1dGgiLCJ1bmF1dGhNZXMiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZXF1ZXN0IiwidGhlbiIsInJlcyIsInVzZXJpZCIsImZvckVhY2giLCJpdGVtIiwicmVtb3ZlIiwicmVmcmVzaFVzZXJJbmZvIiwicGFydGljaXBhdGVCdG4iLCJ1c2VyIiwic3BhbiIsImluZGV4IiwiaW5uZXJIVE1MIiwibXVsdGlwbGllciIsImxvYWRUcmFuc2xhdGlvbnMiLCJmZXRjaCIsImpzb24iLCJ0cmFuc2xhdGUiLCJtdXRhdGlvbk9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9ucyIsIm9ic2VydmUiLCJnZXRFbGVtZW50QnlJZCIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJlbGVtcyIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJyZWZyZXNoTG9jYWxpemVkQ2xhc3MiLCJlbGVtZW50IiwibGFuZyIsImxpbmsiLCJleHRyYU9wdGlvbnMiLCJoZWFkZXJzIiwiZ2V0RGF0YSIsIlByb21pc2UiLCJhbGwiLCJJbml0UGFnZSIsInJlcXVlc3RUYWJsZSIsInNvcnQiLCJhIiwiYiIsInBvaW50cyIsInJlbmRlclVzZXJzIiwid2luZG93IiwiaW5uZXJXaWR0aCIsInVwZGF0ZUFjdGl2ZVN0YWdlIiwiY29sdW1uIiwiaSIsInNldFByZWRpY3RDb2x1bW4iLCJjb250YWlucyIsInRlYW1zIiwiZGF0ZSIsInRpbWUiLCJ0ZWFtIiwidGV4dENvbnRlbnQiLCJjaGVja0J1dHRvblN0YXRlIiwiaW5pdCIsInN0b3JlIiwic3RhdGUiLCJnZXRTdGF0ZSIsImF1dGgiLCJpc0F1dGhvcml6ZWQiLCJpZCIsImMiLCJzZXRJbnRlcnZhbCIsImdfdXNlcl9pZCIsImNsZWFySW50ZXJ2YWwiLCJhdXRoQnRuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInBhcnRpY2lwYXRlIiwicGFyYW1zIiwibWV0aG9kIiwiYm9keSIsInN0cmluZ2lmeSIsInBvcHVsYXRlVXNlcnNUYWJsZSIsImN1cnJlbnRVc2VySWQiLCJsZW5ndGgiLCJ0b3BVc2VycyIsInNsaWNlIiwiZGlzcGxheVVzZXIiLCJjdXJyZW50VXNlciIsImZpbmQiLCJjdXJyZW50VXNlckluZGV4IiwiaW5kZXhPZiIsIm90aGVyVXNlcnMiLCJNYXRoIiwibWF4IiwiaXNDdXJyZW50VXNlciIsInRhYmxlIiwiYWxsVXNlcnMiLCJhZGRpdGlvbmFsVXNlclJvdyIsImNyZWF0ZUVsZW1lbnQiLCJwbGFjZSIsInByaXplUGxhY2VDc3MiLCJwcml6ZUtleSIsImdldFByaXplVHJhbnNsYXRpb25LZXlUZXN0IiwiZ2V0UHJpemVUcmFuc2xhdGlvbktleSIsIm1hc2tVc2VySWQiLCJ0b3RhbFBvaW50cyIsInRyYW5zbGF0ZUtleSIsInlvdUJsb2NrIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kIiwidHJhbnNsYXRlVGFibGUiLCJ0b1N0cmluZyIsInBvcHVwQnRucyIsInBvcHVwcyIsInBvcHVwIiwiY2xvc2UiLCJvcGVuIiwicGFyZW50Tm9kZSIsInNldFBvcHVwIiwidGFyZ2V0IiwidGFiIiwiYXBwZW5kQ2hpbGQiLCJ0YWJsZU5hdlRhYiIsIm5hdiIsInRhYmxlVGFiIiwiYWN0aXZlQ29sdW1uIiwic3RhZ2VDbGFzcyIsIkFycmF5IiwiZnJvbSIsImNscyIsInN0YXJ0c1dpdGgiLCJzdGFnZSIsImdldFN0YWdlQ2xhc3NDb2x1bW4iLCJzZWxlY3RlZFRlYW1zIiwiZmlsdGVyIiwidG90YWxTZWxlY3RhYmxlIiwiYWN0aXZhdGVTZWxlY3RlZFRlYW1zIiwic3RvcmVkUHJlZGljdERhdGEiLCJkYXRhIiwiY29sdW1ucyIsImdldFN0YWdlQ2xhc3MiLCJ0ZWFtQmxvY2tzIiwiYmxvY2siLCJ0ZWFtUmFkaW9zIiwidGVhbUVsZW1lbnQiLCJ0cmltIiwidXBkYXRlTG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImdldFRlYW1OYW1lIiwidGVhbUJsb2NrIiwicmFkaW8iLCJzZXRUaW1lb3V0Iiwic2VsZWN0ZWRUZWFtIiwic29tZSIsInB1c2giLCJzdGFnZXMiLCJsb2FkVHJhbnNsYXRpb25zVGFibGUiLCJ0b2dnbGUiLCJsbmdCdG4iLCJyZW1vdmVJdGVtIiwibG9jYXRpb24iLCJyZWxvYWQiLCJ0b3VybmFtZW50QnRuIiwiY2xlYXJCdXR0b24iLCJjbGVhciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxDQUFDLFlBQVc7RUFBQTtFQUNSLElBQU1BLE1BQU0sR0FBRywyQ0FBMkM7RUFDMUQsSUFBTUMsV0FBVyxHQUFHLG1DQUFtQztFQUN2RCxJQUFNQyxZQUFZLEdBQUdDLFFBQVEsQ0FB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biAoKXtcbiAgICBjb25zdCBhcGlVUkwgPSAnaHR0cHM6Ly9mYXYtcHJvbS5jb20vYXBpX2xlZ2VuZGFyeV90cm9waHknO1xuICAgIGNvbnN0IGFwaVVSTFRhYmxlID0gJ2h0dHBzOi8vZmF2LXByb20uY29tL2FwaV9zaGFuZ2hhaSc7XG4gICAgY29uc3QgcmVzdWx0c1RhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHMtdGFibGUnKSxcbiAgICAgICAgbWFpblBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhdi1wYWdlXCIpLFxuICAgICAgICB1bmF1dGhNc2dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVuYXV0aC1tc2cnKSxcbiAgICAgICAgcGFydGljaXBhdGVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1qb2luJyksXG4gICAgICAgIHlvdUFyZUluQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b29rLXBhcnQnKSxcbiAgICAgICAgcHJlZGljdGlvbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtQnRuJyksXG4gICAgICAgIG11bHRpcGxpZXJTcGFucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X19tdWx0aXBsaWVyLW51bScpLFxuICAgICAgICByZXN1bHRzVGFibGVIZWFkID0gcmVzdWx0c1RhYmxlLnF1ZXJ5U2VsZWN0b3IoJy50YWJsZVJlc3VsdHNfX2hlYWQnKSxcbiAgICAgICAgdG9wUmVzdWx0c1RhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHMtdGFibGUnKSxcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdWx0cy10YWJsZS1vdGhlcicpLFxuICAgICAgICB0YWJsZU5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmVzdWx0c19fbmF2LWl0ZW1cIiksXG4gICAgICAgIHByZWRpY3RDb2x1bW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9fY29sdW1uXCIpLFxuICAgICAgICBtb3ZlTGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVfX21vdmUtbGVmdFwiKSxcbiAgICAgICAgbW92ZVJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZV9fbW92ZS1yaWdodFwiKSxcbiAgICAgICAgbW92ZUxlZnRSZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3VsdHNfX21vdmUtbGVmdFwiKSxcbiAgICAgICAgbW92ZVJpZ2h0UmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXN1bHRzX19tb3ZlLXJpZ2h0XCIpLFxuICAgICAgICB0YWJzUmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yZXN1bHRzX190YWItaXRlbVwiKSxcbiAgICAgICAgdGFic0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRzX190YWInKTtcblxuXG4gICAgbGV0IHRvdXJuYW1lbnRTdGFnZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ0b3VybmFtZW50U3RhZ2VcIikgPyBOdW1iZXIoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInRvdXJuYW1lbnRTdGFnZVwiKSkgOiAxXG5cbiAgICBsZXQgY29sdW1uSW5kZXggPSB0b3VybmFtZW50U3RhZ2UgLSAxXG5cbiAgICBsZXQgdXNlckluZm8gPSB7fTtcblxuICAgIGxldCB0cmFuc2xhdGVTdGF0ZSA9IHRydWVcbiAgICBsZXQgZGVidWcgPSB0cnVlXG4gICAgLy8gbGV0IGxvY2FsZSA9ICd1ayc7XG4gICAgbGV0IGxvY2FsZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJsb2NhbGVcIikgPz8gXCJ1a1wiXG4gICAgbGV0IHVzZXJzO1xuICAgIGxldCBpMThuRGF0YSA9IHt9O1xuICAgIGxldCBpMThuRGF0YVRhYmxlID0ge31cbiAgICBsZXQgdXNlcklkO1xuICAgIHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIikgPyBOdW1iZXIoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKSkgOiBudWxsXG5cbiAgICBjb25zdCBQUklaRVNfQ1NTID0gWydwbGFjZTEnLCAncGxhY2UyJywgJ3BsYWNlMyddO1xuXG4gICAgbGV0IHByZWRpY3REYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByZWRpY3REYXRhXCIpKSB8fCBbXTtcbiAgICBjb25zb2xlLmxvZyhwcmVkaWN0RGF0YSlcblxuICAgIGxldCBjaGVja1VzZXJBdXRoID0gKCkgPT4ge1xuICAgICAgICBpZiAodXNlcklkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VySWQpXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3QoYC9mYXZ1c2VyLyR7dXNlcklkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy51c2VyaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeW91QXJlSW5CdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVkaWN0aW9uQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hVc2VySW5mbyhyZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcFJlc3VsdHNUYWJsZS5jbGFzc0xpc3QuYWRkKFwiYXV0aFwiKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvcFJlc3VsdHNUYWJsZS5jbGFzc0xpc3QuYWRkKFwiYXV0aFwiKVxuICAgICAgICAgICAgZm9yIChsZXQgcGFydGljaXBhdGVCdG4gb2YgcGFydGljaXBhdGVCdG5zKSB7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVuYXV0aE1lcylcbiAgICAgICAgICAgICAgICB1bmF1dGhNZXMuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFVzZXJJbmZvKHVzZXIpIHtcbiAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdXNlckluZm8gPSB1c2VyO1xuICAgICAgICBjb25zb2xlLmxvZyh1c2VySW5mbylcblxuICAgICAgICAvLyDQntC90L7QstC70Y7RlNC80L4g0LLRgdGWIG11bHRpcGxpZXJTcGFuc1xuICAgICAgICBtdWx0aXBsaWVyU3BhbnMuZm9yRWFjaCgoc3BhbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gdXNlckluZm8ubXVsdGlwbGllciB8fCAwO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBsZXQgb3BlbmluZ0JldCA9IHtcbiAgICAgICAgLy8gICAgIGJpZ1dpbm5lcjoge3RlYW06ICdBUEVLUycsIG91dGNvbWU6IGZhbHNlfSxcbiAgICAgICAgLy8gICAgIGJpZ0xvc2VyOiB7dGVhbTogJ0NMT1VEOScsIG91dGNvbWU6IHRydWV9LFxuICAgICAgICAvLyAgICAgdGVhbXNCZXQ6IFt7dGVhbTogJ0VOQ0UnfSwge3RlYW06ICdIRVJPSUMnfSwge3RlYW06ICdTQVcnLCBvdXRjb21lOiB0cnVlfSwge3RlYW06ICdGVVJJQSd9LCB7dGVhbTogJ0tPSScsIG91dGNvbWU6IGZhbHNlfSwge3RlYW06ICdBTUtBTCd9LCB7dGVhbTogJ0xFR0FDWSd9XVxuICAgICAgICAvLyB9O1xuICAgICAgICAvLyByZWZyZXNoQmV0cyh1c2VyLm9wZW5pbmdCZXQsIHByb21vU3RhZ2VzWzBdKTtcbiAgICAgICAgLy8gcmVmcmVzaEJldHModXNlci5lbGltaW5hdGlvbkJldCwgcHJvbW9TdGFnZXNbMV0pO1xuICAgICAgICAvLyByZWZyZXNoQmV0cyh1c2VyLndpbm5lckJldCwgcHJvbW9TdGFnZXNbMl0pO1xuXG4gICAgICAgIC8vIGlmIChhY3RpdmVQaGFzZSAmJiBpc1ZhbGlkQmV0KHVzZXJJbmZvW2FjdGl2ZVBoYXNlLmJldEZpZWxkTmFtZV0pKSB7XG4gICAgICAgIC8vICAgICBwcmVkaWN0aW9uQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdibG9ja0J0bicpKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWRUcmFuc2xhdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgJHthcGlVUkx9L25ldy10cmFuc2xhdGVzLyR7bG9jYWxlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YSA9IGpzb247XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgdmFyIG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVnZW5kYXJ5LXRyb3BoeScpLCB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZSgpIHtcbiAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10cmFuc2xhdGVdJylcbiAgICAgICAgaWYodHJhbnNsYXRlU3RhdGUpe1xuICAgICAgICAgICAgZWxlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRyYW5zbGF0aW9uIHdvcmshXCIpXG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaExvY2FsaXplZENsYXNzKG1haW5QYWdlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoTG9jYWxpemVkQ2xhc3MoZWxlbWVudCkge1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGxhbmcgb2YgWyd1aycsICdlbiddKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobGFuZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGxvY2FsZSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVxdWVzdCA9IGZ1bmN0aW9uIChsaW5rLCBleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGFwaVVSTCArIGxpbmssIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi4oZXh0cmFPcHRpb25zIHx8IHt9KVxuICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIH1cblxuXG5cblxuICAgIGZ1bmN0aW9uIGdldERhdGEoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICByZXF1ZXN0KCcvdXNlcnM/bm9jYWNoZT0xJyksXG4gICAgICAgIF0pXG4gICAgfVxuXG4gICAgY29uc3QgSW5pdFBhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGlmKGRlYnVnKXtcbiAgICAgICAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICByZXF1ZXN0VGFibGUoJy91c2Vycz9ub2NhY2hlPTEnKSxcbiAgICAgICAgICAgIF0pLnRoZW4ocmVzID0+e1xuICAgICAgICAgICAgICAgIHVzZXJzID0gcmVzWzBdLnNvcnQoKGEsIGIpID0+IGIucG9pbnRzIC0gYS5wb2ludHMpO1xuICAgICAgICAgICAgICAgIHJlbmRlclVzZXJzKHVzZXJzKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfVxuICAgICAgICBnZXREYXRhKCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgdXNlcnMgPSByZXNbMF0uc29ydCgoYSwgYikgPT4gYi5wb2ludHMgLSBhLnBvaW50cyk7XG4gICAgICAgICAgICAvLyB1c2VycyA9IHVzZXJzLnNsaWNlKDAsIDEwKVxuICAgICAgICAgICAgaWYoIWRlYnVnKSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyVXNlcnModXNlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdHJhbnNsYXRlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIGlmKHdpbmRvdy5pbm5lcldpZHRoIDw9IDUwMCl7XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVTdGFnZShwcmVkaWN0Q29sdW1ucyk7XG4gICAgICAgIH1cbiAgICAgICAgcHJlZGljdENvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBpKSA9PntcbiAgICAgICAgICAgIGlmKGkgKyAxID4gdG91cm5hbWVudFN0YWdlKXtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmFkZChcIl9sb2NrXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihpICsgMSA8IHRvdXJuYW1lbnRTdGFnZSl7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNsYXNzTGlzdC5hZGQoXCJfZG9uZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoaSArIDEgPT09IHRvdXJuYW1lbnRTdGFnZSl7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRQcmVkaWN0Q29sdW1uKGNvbHVtbilcbiAgICAgICAgICAgIGlmKGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJfbG9ja1wiKSl7XG4gICAgICAgICAgICAgICAgY29uc3QgdGVhbXMgPSBjb2x1bW4ucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX190ZWFtLW5hbWUnKVxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBjb2x1bW4ucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX19jaG9zZS1kYXRlJylcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lID0gY29sdW1uLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9fY2hvc2UtdGltZScpXG4gICAgICAgICAgICAgICAgdGVhbXMuZm9yRWFjaCh0ZWFtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGVhbS50ZXh0Q29udGVudCA9IFwi4oCUXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGRhdGUuZm9yRWFjaChkYXRlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZS50ZXh0Q29udGVudCA9IFwi4oCUXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRpbWUuZm9yRWFjaCh0aW1lID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGltZS50ZXh0Q29udGVudCA9IFwi4oCUXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBjaGVja0J1dHRvblN0YXRlKClcbiAgICB9XG5cblxuXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5zdG9yZSkge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gd2luZG93LnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICAgICAgICB1c2VySWQgPSBzdGF0ZS5hdXRoLmlzQXV0aG9yaXplZCAmJiBzdGF0ZS5hdXRoLmlkIHx8ICcnO1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgICAgICBsZXQgYyA9IDA7XG4gICAgICAgICAgICB2YXIgaSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXdpbmRvdy5nX3VzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCA9IHdpbmRvdy5nX3VzZXJfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tVc2VyQXV0aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMjAwKTtcblxuICAgICAgICB9XG4gICAgICAgIGNoZWNrVXNlckF1dGgoKTtcblxuXG4gICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKChhdXRoQnRuLCBpKSA9PiB7XG4gICAgICAgICAgICBhdXRoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJ0aWNpcGF0ZSgpIHtcbiAgICAgICAgaWYgKCF1c2VySWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHt1c2VyaWQ6IHVzZXJJZH07XG5cbiAgICAgICAgcmVxdWVzdCgnL3VzZXInLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBhcmFtcylcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgICAgICB5b3VBcmVJbkJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgIHByZWRpY3Rpb25CdG4ucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICBwYXJ0aWNpcGF0ZSA9IHRydWU7XG4gICAgICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJVc2Vycyh1c2Vycykge1xuICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIHVzZXJJZCk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQpIHtcbiAgICAgICAgcmVzdWx0c1RhYmxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICByZXN1bHRzVGFibGVPdGhlci5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBpZiAoIXVzZXJzIHx8ICF1c2Vycy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBsZXQgdG9wVXNlcnMgPSB1c2Vycy5zbGljZSgwLCAyMCk7XG4gICAgICAgIHRvcFVzZXJzLmZvckVhY2godXNlciA9PiBkaXNwbGF5VXNlcih1c2VyLCB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCwgcmVzdWx0c1RhYmxlLCB1c2VycykpO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gdXNlcnMuZmluZCh1c2VyID0+IHVzZXIudXNlcmlkID09PSBjdXJyZW50VXNlcklkKTtcbiAgICAgICAgY29uc3QgY3VycmVudFVzZXJJbmRleCA9IGN1cnJlbnRVc2VyID8gdXNlcnMuaW5kZXhPZihjdXJyZW50VXNlcikgOiAtMTtcblxuICAgICAgICBpZiAoY3VycmVudFVzZXJJbmRleCA+PSAxMCkge1xuICAgICAgICAgICAgbGV0IG90aGVyVXNlcnMgPSB1c2Vycy5zbGljZShNYXRoLm1heCgxMCwgY3VycmVudFVzZXJJbmRleCAtIDEpLCBjdXJyZW50VXNlckluZGV4ICsgMik7XG4gICAgICAgICAgICBvdGhlclVzZXJzLmZvckVhY2godXNlciA9PiBkaXNwbGF5VXNlcih1c2VyLCB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCwgcmVzdWx0c1RhYmxlT3RoZXIsIHVzZXJzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNwbGF5VXNlcih1c2VyLCBpc0N1cnJlbnRVc2VyLCB0YWJsZSwgYWxsVXNlcnMpIHtcbiAgICAgICAgY29uc3QgYWRkaXRpb25hbFVzZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgndGFibGVSZXN1bHRzX19yb3cnKTtcblxuXG5cbiAgICAgICAgY29uc3QgcGxhY2UgPSBhbGxVc2Vycy5pbmRleE9mKHVzZXIpICsgMTtcbiAgICAgICAgY29uc3QgcHJpemVQbGFjZUNzcyA9IFBSSVpFU19DU1NbcGxhY2UgLSAxXTtcbiAgICAgICAgaWYgKHByaXplUGxhY2VDc3MpIHtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQocHJpemVQbGFjZUNzcyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHByaXplS2V5O1xuXG4gICAgICAgIGlmIChkZWJ1Zyl7XG4gICAgICAgICAgICAgICAgcHJpemVLZXkgPSBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5VGVzdChwbGFjZSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBwcml6ZUtleSA9IGdldFByaXplVHJhbnNsYXRpb25LZXkocGxhY2UpXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2cocHJpemVLZXkpXG5cbiAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19yb3ctaXRlbVwiPiR7cGxhY2V9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHtpc0N1cnJlbnRVc2VyID8gdXNlci51c2VyaWQgOiBtYXNrVXNlcklkKHVzZXIudXNlcmlkKX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke3VzZXIucG9pbnRzfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19yb3ctaXRlbVwiPiR7dXNlci5tdWx0aXBsaWVyfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19yb3ctaXRlbVwiPiR7dXNlci50b3RhbFBvaW50c308L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke3ByaXplS2V5ID8gdHJhbnNsYXRlS2V5KHByaXplS2V5KSA6ICcgLSAnfTwvZGl2PlxuICAgIGA7XG4gICAgICAgIGlmIChpc0N1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICBjb25zdCB5b3VCbG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgeW91QmxvY2suc2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScsICd5b3UnKTtcbiAgICAgICAgICAgIHlvdUJsb2NrLnRleHRDb250ZW50ID0gXCLQotC4XCIgLy8g0LTQu9GPINGC0LXRgdGC0YMg0L/QvtC60Lgg0L3QtdC80LAg0YLRgNCw0L3RgdC70LXQudGC0ZbQslxuICAgICAgICAgICAgeW91QmxvY2suY2xhc3NMaXN0LmFkZCgnX3lvdXInKTtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmFwcGVuZCh5b3VCbG9jaylcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoXCJfeW91clwiKVxuXG4gICAgICAgIH1cbiAgICAgICAgdGFibGUuYXBwZW5kKGFkZGl0aW9uYWxVc2VyUm93KTtcbiAgICAgICAgdHJhbnNsYXRlVGFibGUoKVxuICAgIH1cbiAgICBmdW5jdGlvbiBtYXNrVXNlcklkKHVzZXJJZCkge1xuICAgICAgICByZXR1cm4gXCIqKlwiICsgdXNlcklkLnRvU3RyaW5nKCkuc2xpY2UoMik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlS2V5KGtleSkge1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWJ1ZyA/IGkxOG5EYXRhVGFibGVba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXkgOiBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5KHBsYWNlKSB7XG4gICAgICAgIGlmIChwbGFjZSA8PSA1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXyR7cGxhY2V9YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzYtMTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTEtMjBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMjEtMzVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMzYtNTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNTEtNzVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzc2LTEwMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMjUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTAxLTEyNWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxNTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTI2LTE1MGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTUxLTE3NWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAyMDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTc2LTIwMGBcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29uc3QgcG9wdXBCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbmZvX19pdGVtLWJ0blwiKVxuICAgIGNvbnN0IHBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5mb19faXRlbS1wb3B1cFwiKVxuXG5cbiAgICBwb3B1cHMuZm9yRWFjaCgocG9wdXAsIGkpID0+e1xuICAgICAgICBpZihpID09PSAwKXtcbiAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJfbGVmdFwiKVxuICAgICAgICB9XG4gICAgICAgIGlmKGkgPT09IHBvcHVwcy5sZW5ndGggLSAxKXtcbiAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJfcmlnaHRcIilcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjbG9zZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb19faXRlbS1wb3B1cC1jbG9zZVwiKVxuICAgICAgICBjb25zdCBvcGVuID0gcG9wdXAucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX2l0ZW0tYnRuXCIpXG4gICAgICAgIHNldFBvcHVwKG9wZW4sIGNsb3NlLCBwb3B1cClcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gc2V0UG9wdXAob3BlbiwgY2xvc2UsIHBvcHVwKXtcbiAgICAgICAgb3Blbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwib3BhY2l0eVwiKVxuICAgICAgICB9KVxuICAgICAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFwib3BhY2l0eVwiKVxuICAgICAgICB9KVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgICAgaWYoIXBvcHVwLmNvbnRhaW5zKGUudGFyZ2V0KSAmJiBlLnRhcmdldCAhPT0gb3Blbil7XG4gICAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZChcIm9wYWNpdHlcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cblxuICAgIHRhYnNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdXJuYW1lbnRTdGFnZTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0YWIuY2xhc3NMaXN0LmFkZCgncmVzdWx0c19fdGFiLWl0ZW0nKTtcbiAgICAgICAgdGFic0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YWIpO1xuICAgIH1cblxuICAgIGNvbnN0IHRhYmxlTmF2VGFiID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yZXN1bHRzX190YWItaXRlbVwiKTtcblxuICAgIHRhYmxlTmF2LmZvckVhY2goKGl0ZW0sIGkpID0+e1xuICAgICAgICBpZihpICsgMSA+IHRvdXJuYW1lbnRTdGFnZSl7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfbG9ja1wiKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coaSArIDEsIHRvdXJuYW1lbnRTdGFnZSlcblxuICAgICAgICBpZihpICsgMSA9PT0gdG91cm5hbWVudFN0YWdlKXtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgIGlmKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIl9sb2NrXCIpKXtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhYmxlTmF2LmZvckVhY2gobmF2ID0+e1xuICAgICAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgIH0pXG4gICAgfSlcbiAgICB0YWJsZU5hdlRhYi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgaWYoaSArIDEgPT09IHRvdXJuYW1lbnRTdGFnZSl7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgdGFibGVUYWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfX3RhYi1pdGVtJylcblxuICAgIHRhYmxlVGFiLmZvckVhY2goKGl0ZW0sIGkpID0+e1xuICAgICAgICBpZihpICsgMSA9PT0gdG91cm5hbWVudFN0YWdlKXtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBjaGVja0J1dHRvblN0YXRlKCkge1xuICAgICAgICBjb25zdCBhY3RpdmVDb2x1bW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlX19jb2x1bW4uX2FjdGl2ZVwiKTtcbiAgICAgICAgaWYgKCFhY3RpdmVDb2x1bW4gfHwgIWxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJlZGljdERhdGFcIikpIHJldHVybjtcblxuICAgICAgICBjb25zdCBzdGFnZUNsYXNzID0gQXJyYXkuZnJvbShhY3RpdmVDb2x1bW4uY2xhc3NMaXN0KS5maW5kKGNscyA9PiBjbHMuc3RhcnRzV2l0aCgnc3RhZ2UnKSlcbiAgICAgICAgY29uc29sZS5sb2coc3RhZ2VDbGFzcylcbiAgICAgICAgY29uc3QgcHJlZGljdERhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJlZGljdERhdGFcIikpO1xuICAgICAgICBjb25zdCBzdGFnZSA9IGdldFN0YWdlQ2xhc3NDb2x1bW4oc3RhZ2VDbGFzcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHN0YWdlKVxuICAgICAgICBjb25zdCBzZWxlY3RlZFRlYW1zID0gcHJlZGljdERhdGEuZmlsdGVyKGl0ZW0gPT4gaXRlbS5zdGFnZSA9PT0gc3RhZ2UpLmxlbmd0aFxuXG4gICAgICAgIGNvbnNvbGUubG9nKHByZWRpY3REYXRhLmZpbHRlcihpdGVtID0+IGl0ZW0uc3RhZ2UgPT09IHN0YWdlKSlcblxuXG4gICAgICAgIGNvbnN0IHRvdGFsU2VsZWN0YWJsZSA9IGFjdGl2ZUNvbHVtbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19jaG9zZVwiKS5sZW5ndGg7XG5cbiAgICAgICAgY29uc29sZS5sb2coc2VsZWN0ZWRUZWFtcywgdG90YWxTZWxlY3RhYmxlKTtcblxuICAgICAgICAvLyDQr9C60YnQviDQstGB0ZYg0LzQvtC20LvQuNCy0ZYg0LLQsNGA0ZbQsNC90YLQuCDQstC40LHRgNCw0L3Rliwg0YDQvtC30LHQu9C+0LrQvtCy0YPRlNC80L4g0LrQvdC+0L/QutGDLCDRltC90LDQutGI0LUg0LHQu9C+0LrRg9GU0LzQvlxuICAgICAgICBpZiAoc2VsZWN0ZWRUZWFtcyA+PSB0b3RhbFNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgIHByZWRpY3Rpb25CdG4uY2xhc3NMaXN0LnJlbW92ZShcIl9sb2NrXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJlZGljdGlvbkJ0bi5jbGFzc0xpc3QuYWRkKFwiX2xvY2tcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhY3RpdmF0ZVNlbGVjdGVkVGVhbXMoc3RvcmVkUHJlZGljdERhdGEpIHtcblxuICAgICAgICAvLyDQn9GA0L7RhdC+0LTQuNC80L7RgdGPINC/0L4g0LLRgdGW0YUg0LXQu9C10LzQtdC90YLQsNGFIHByZWRpY3REYXRhXG4gICAgICAgIHN0b3JlZFByZWRpY3REYXRhLmZvckVhY2goZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHN0YWdlLCB0ZWFtIH0gPSBkYXRhO1xuXG4gICAgICAgICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0LLRgdGWINC60L7Qu9C+0L3QutC4LCDRj9C60ZYg0LLRltC00L/QvtCy0ZbQtNCw0Y7RgtGMINC00LDQvdC+0LzRgyDQtdGC0LDQv9GDIChzdGFnZSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0YWdlKVxuICAgICAgICAgICAgY29uc3QgY29sdW1ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2dldFN0YWdlQ2xhc3Moc3RhZ2UpfWApO1xuXG4gICAgICAgICAgICBjb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcbiAgICAgICAgICAgICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0LLRgdGWINCx0LvQvtC60Lgg0Lcg0LrQvtC80LDQvdC00LDQvNC4INCyINGG0ZbQuSDQutC+0LvQvtC90YbRllxuICAgICAgICAgICAgICAgIGNvbnN0IHRlYW1CbG9ja3MgPSBjb2x1bW4ucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9fY2hvc2VcIik7XG5cbiAgICAgICAgICAgICAgICB0ZWFtQmxvY2tzLmZvckVhY2goYmxvY2sgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0LLRgdGWINGA0LDQtNGW0L7QutC90L7Qv9C60Lgg0YLQsCDQvdCw0LfQstC4INC60L7QvNCw0L3QtCDQsiDRhtGM0L7QvNGDINCx0LvQvtC60YNcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVhbVJhZGlvcyA9IGJsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX3RlYW0tcmFkaW9cIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRlYW1zID0gYmxvY2sucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9fdGVhbS1uYW1lXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vINCf0YDQvtGF0L7QtNC40LzQvtGB0Y8g0L/QviDQstGB0ZbRhSDQutC+0LzQsNC90LTQsNGFINCyINCx0LvQvtC60YNcbiAgICAgICAgICAgICAgICAgICAgdGVhbXMuZm9yRWFjaCgodGVhbUVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQr9C60YnQviDQvdCw0LfQstCwINC60L7QvNCw0L3QtNC4INGB0L/RltCy0L/QsNC00LDRlCDQtyDQstC40LHRgNCw0L3QvtGOINC60L7QvNCw0L3QtNC+0Y4g0LcgcHJlZGljdERhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZWFtRWxlbWVudC50ZXh0Q29udGVudC50cmltKCkgPT09IHRlYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQkNC60YLQuNCy0YPRlNC80L4g0LLRltC00L/QvtCy0ZbQtNC90YMg0YDQsNC00ZbQvtC60L3QvtC/0LrRg1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlYW1SYWRpb3NbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbi8vINCU0L7Qv9C+0LzRltC20L3QsCDRhNGD0L3QutGG0ZbRjyDQtNC70Y8g0L7RgtGA0LjQvNCw0L3QvdGPINC60LvQsNGB0YMg0LXRgtCw0L/RgyDQvdCwINC+0YHQvdC+0LLRliDQudC+0LPQviDQvdCw0LfQstC4XG4gICAgZnVuY3Rpb24gZ2V0U3RhZ2VDbGFzcyhzdGFnZSkge1xuICAgICAgICBzd2l0Y2ggKHN0YWdlKSB7XG4gICAgICAgICAgICBjYXNlIFwiT3BlbmluZyBTdGFnZVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YWdlMS04XCI7XG4gICAgICAgICAgICBjYXNlIFwiUXVhcnRlcmZpbmFsc1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YWdlMS00XCI7XG4gICAgICAgICAgICBjYXNlIFwiU2VtaWZpbmFsc1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YWdlMS0yXCI7XG4gICAgICAgICAgICBjYXNlIFwiRmluYWxcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFnZS1maW5hbFwiO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFN0YWdlQ2xhc3NDb2x1bW4oc3RhZ2UpIHtcbiAgICAgICAgc3dpdGNoIChzdGFnZSkge1xuICAgICAgICAgICAgY2FzZSBcInN0YWdlMS04XCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiT3BlbmluZyBTdGFnZVwiO1xuICAgICAgICAgICAgY2FzZSBcInN0YWdlMS00XCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiUXVhcnRlcmZpbmFsc1wiO1xuICAgICAgICAgICAgY2FzZSBcInN0YWdlMS0yXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiU2VtaWZpbmFsc1wiO1xuICAgICAgICAgICAgY2FzZSBcInN0YWdlLWZpbmFsXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiRmluYWxcIjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiBhY3RpdmF0ZVNlbGVjdGVkVGVhbXMocHJlZGljdERhdGEpKTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxvY2FsU3RvcmFnZSgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcmVkaWN0RGF0YVwiLCBKU09OLnN0cmluZ2lmeShwcmVkaWN0RGF0YSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRlYW1OYW1lKHRlYW1CbG9jaywgc3RhZ2UsIGNvbHVtbikge1xuICAgICAgICBpZihjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiX2RvbmVcIikpe1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGVhbVJhZGlvcyA9IHRlYW1CbG9jay5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX190ZWFtLXJhZGlvXCIpO1xuICAgICAgICBjb25zdCB0ZWFtcyA9IHRlYW1CbG9jay5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX190ZWFtLW5hbWVcIik7XG5cbiAgICAgICAgY29uc29sZS5sb2codGVhbUJsb2NrKVxuXG4gICAgICAgIHRlYW1SYWRpb3MuZm9yRWFjaCgocmFkaW8sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyYWRpbylcbiAgICAgICAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQnV0dG9uU3RhdGUoKVxuICAgICAgICAgICAgICAgIH0sIDUwKVxuXG4gICAgICAgICAgICAgICAgdGVhbVJhZGlvcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKSlcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVGVhbSA9IHRlYW1zW2luZGV4XS50ZXh0Q29udGVudC50cmltKCk7XG5cbiAgICAgICAgICAgICAgICAvLyDQktC40LTQsNC70Y/RlNC80L4g0L/QvtC/0LXRgNC10LTQvdGOINC60L7QvNCw0L3QtNGDINC3INGG0YzQvtCz0L4g0LHQu9C+0LrRg1xuICAgICAgICAgICAgICAgIHByZWRpY3REYXRhID0gcHJlZGljdERhdGEuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5zdGFnZSAhPT0gc3RhZ2UpIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhQXJyYXkuZnJvbSh0ZWFtcykuc29tZSh0ZWFtID0+IHRlYW0udGV4dENvbnRlbnQudHJpbSgpID09PSBpdGVtLnRlYW0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8g0JTQvtC00LDRlNC80L4g0L3QvtCy0YMg0LrQvtC80LDQvdC00YNcbiAgICAgICAgICAgICAgICBwcmVkaWN0RGF0YS5wdXNoKHsgc3RhZ2U6IHN0YWdlLCB0ZWFtOiBzZWxlY3RlZFRlYW0gfSk7XG5cbiAgICAgICAgICAgICAgICAvLyDQntC90L7QstC70Y7RlNC80L4gbG9jYWxTdG9yYWdlXG4gICAgICAgICAgICAgICAgdXBkYXRlTG9jYWxTdG9yYWdlKCk7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcmVkaWN0RGF0YSk7IC8vINCf0LXRgNC10LLRltGA0Y/RlNC80L4sINGH0Lgg0L/RgNCw0LLQuNC70YzQvdC+INC/0YDQsNGG0Y7RlFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gc2V0UHJlZGljdENvbHVtbihjb2x1bW4pIHtcbiAgICAgICAgY29uc29sZS5sb2coY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcIl9sb2NrXCIpIClcbiAgICAgICAgbGV0IHN0YWdlID0gXCJcIlxuXG4gICAgICAgIGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJzdGFnZTEtOFwiKSA/IHN0YWdlID0gXCJPcGVuaW5nIFN0YWdlXCIgOiBudWxsO1xuICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwic3RhZ2UxLTRcIikgPyBzdGFnZSA9IFwiUXVhcnRlcmZpbmFsc1wiIDogbnVsbDtcbiAgICAgICAgY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcInN0YWdlMS0yXCIpID8gc3RhZ2UgPSBcIlNlbWlmaW5hbHNcIiA6IG51bGw7XG4gICAgICAgIGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJzdGFnZS1maW5hbFwiKSA/IHN0YWdlID0gXCJGaW5hbFwiIDogbnVsbDtcblxuICAgICAgICBjb25zdCB0ZWFtQmxvY2tzID0gY29sdW1uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2Nob3NlXCIpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRlYW1CbG9ja3MpXG5cbiAgICAgICAgdGVhbUJsb2Nrcy5mb3JFYWNoKGJsb2NrID0+IGdldFRlYW1OYW1lKGJsb2NrLCBzdGFnZSwgY29sdW1uKSk7XG5cblxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQWN0aXZlU3RhZ2Uoc3RhZ2VzKSB7XG4gICAgICAgIHN0YWdlcy5mb3JFYWNoKChzdGFnZSwgaW5kZXgpID0+IHtcblxuICAgICAgICAgICAgc3RhZ2UuY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIGlmKGluZGV4ID09PSBjb2x1bW5JbmRleCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzYWRhc1wiKVxuICAgICAgICAgICAgICAgIHN0YWdlLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1vdmVMZWZ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChjb2x1bW5JbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBjb2x1bW5JbmRleC0tO1xuICAgICAgICAgICAgdXBkYXRlQWN0aXZlU3RhZ2UocHJlZGljdENvbHVtbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2x1bW5JbmRleCA8IDApIHtcbiAgICAgICAgICAgIGNvbHVtbkluZGV4ID0gcHJlZGljdENvbHVtbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZVN0YWdlKHByZWRpY3RDb2x1bW5zKTtcbiAgICAgICAgICAgIHRhYmxlVGFiLmZvckVhY2goKGl0ZW0sIGkpID0+e1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBpZihpICsgMSA9PT0gY29sdW1uSW5kZXgpe1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICB0YWJsZVRhYi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIGlmKGkgPT09IGNvbHVtbkluZGV4KXtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICBtb3ZlUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgaWYgKGNvbHVtbkluZGV4IDwgcHJlZGljdENvbHVtbnMubGVuZ3RoIC0gMSB8fCBjb2x1bW5JbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBjb2x1bW5JbmRleCsrO1xuICAgICAgICAgICAgdXBkYXRlQWN0aXZlU3RhZ2UocHJlZGljdENvbHVtbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGNvbHVtbkluZGV4ID09PSBwcmVkaWN0Q29sdW1ucy5sZW5ndGgpe1xuICAgICAgICAgICAgY29sdW1uSW5kZXggPSAwXG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVTdGFnZShwcmVkaWN0Q29sdW1ucyk7XG4gICAgICAgIH1cbiAgICAgICAgdGFibGVUYWIuZm9yRWFjaCgoaXRlbSwgaSkgPT57XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICBpZihpID09PSBjb2x1bW5JbmRleCl7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pO1xuXG4gICAgbW92ZUxlZnRSZXN1bHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgaWYgKGNvbHVtbkluZGV4ID4gMCkge1xuICAgICAgICAgICAgY29sdW1uSW5kZXgtLTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbHVtbkluZGV4ID0gdGFic1Jlc3VsdC5sZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgICAgIC8vIHVwZGF0ZUFjdGl2ZVN0YWdlKHRhYnNSZXN1bHQpO1xuICAgICAgICB0YWJsZU5hdi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIGlmKGNvbHVtbkluZGV4IDwgMSl7XG4gICAgICAgICAgICAgICAgY29sdW1uSW5kZXggPSB0b3VybmFtZW50U3RhZ2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoaSArIDEgPT09IGNvbHVtbkluZGV4KXtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICAgICAgdGFibGVOYXZUYWIuZm9yRWFjaCgoaXRlbSwgaSkgPT57XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICBpZihpICsgMSA9PT0gY29sdW1uSW5kZXgpe1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTtcblxuICAgIG1vdmVSaWdodFJlc3VsdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoY29sdW1uSW5kZXggPCB0YWJzUmVzdWx0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIGNvbHVtbkluZGV4Kys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2x1bW5JbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGFibGVOYXYuZm9yRWFjaCgoaXRlbSwgaSkgPT57XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICBpZihjb2x1bW5JbmRleCA+IHRvdXJuYW1lbnRTdGFnZSl7XG4gICAgICAgICAgICAgICAgY29sdW1uSW5kZXggPSAxXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGkgKyAxID09PSBjb2x1bW5JbmRleCl7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgICAgIHRhYmxlTmF2VGFiLmZvckVhY2goKGl0ZW0sIGkpID0+e1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgaWYoaSArIDEgPT09IGNvbHVtbkluZGV4KXtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICBsb2FkVHJhbnNsYXRpb25zKClcbiAgICAgICAgLnRoZW4oaW5pdClcbiAgICAgICAgLnRoZW4obG9hZFRyYW5zbGF0aW9uc1RhYmxlKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGFyay1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJkYXJrXCIpXG4gICAgfSlcblxuICAgIGNvbnN0IGxuZ0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG5nLWJ0blwiKVxuXG4gICAgbG5nQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwibG9jYWxlXCIpKSB7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwibG9jYWxlXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImxvY2FsZVwiLCBcImVuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGF1dGhCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF1dGgtYnRuXCIpXG5cbiAgICBhdXRoQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgaWYodXNlcklkKXtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJ1c2VySWRcIilcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwidXNlcklkXCIsICcxMDAzMDAyNjgnKVxuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgIH0pXG5cbiAgICBjb25zdCB0b3VybmFtZW50QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFnZS1idG5cIilcbiAgICB0b3VybmFtZW50QnRuLnRleHRDb250ZW50ID0gYHN0YWdlICR7dG91cm5hbWVudFN0YWdlfWBcblxuICAgIHRvdXJuYW1lbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdG91cm5hbWVudFN0YWdlICs9IDE7XG4gICAgICAgIGlmICh0b3VybmFtZW50U3RhZ2UgPiA1KSB7XG4gICAgICAgICAgICB0b3VybmFtZW50U3RhZ2UgPSAxO1xuICAgICAgICB9XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ0b3VybmFtZW50U3RhZ2VcIiwgdG91cm5hbWVudFN0YWdlKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG4gICAgfSk7XG5cbiAgICBjb25zdCBjbGVhckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xlYXItYnRuXCIpO1xuICAgIGNsZWFyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcblxuICAgIC8vIGZvciB0ZXN0XG4gICAgY29uc3QgcmVxdWVzdFRhYmxlID0gZnVuY3Rpb24gKGxpbmssIGV4dHJhT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gZmV0Y2goYXBpVVJMVGFibGUgKyBsaW5rLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uKGV4dHJhT3B0aW9ucyB8fCB7fSlcbiAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5VGVzdChwbGFjZSkge1xuICAgICAgICBpZiAocGxhY2UgPD0gNSkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8ke3BsYWNlfWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV82LTEwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDIwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzExLTIwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDM1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzIxLTM1YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzM2LTUwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDc1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzUxLTc1YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV83Ni0xMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTI1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzEwMS0xMjVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzEyNi0xNTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTc1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzE1MS0xNzVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzE3Ni0yMDBgXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGxvYWRUcmFuc2xhdGlvbnNUYWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2FwaVVSTFRhYmxlfS90cmFuc2xhdGVzLyR7bG9jYWxlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YVRhYmxlID0ganNvbjtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZVRhYmxlKCkge1xuXG4gICAgICAgIGNvbnN0IGVsZW1zID0gdG9wUmVzdWx0c1RhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKVxuXG5cbiAgICAgICAgaWYodHJhbnNsYXRlU3RhdGUpe1xuICAgICAgICAgICAgZWxlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IGkxOG5EYXRhVGFibGVba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHJhbnNsYXRpb24gd29yayFcIilcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoTG9jYWxpemVkQ2xhc3MobWFpblBhZ2UpO1xuICAgIH1cblxuICAgIC8vIGZvciB0ZXN0XG5cbn0pKClcblxuIl19

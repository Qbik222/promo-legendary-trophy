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
  var tableTab = document.querySelectorAll('.table__tab-item');
  var tournamentStage = sessionStorage.getItem("tournamentStage") ? Number(sessionStorage.getItem("tournamentStage")) : 1;
  var stageIndex = tournamentStage >= 5 ? 4 : tournamentStage;
  var columnIndex = tournamentStage >= 5 ? 4 : tournamentStage;
  console.log(stageIndex);
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
  // userId = 101107121

  var PRIZES_CSS = ['place1', 'place2', 'place3'];
  var predictData = JSON.parse(localStorage.getItem("predictData")) || [];
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
          // console.log(unauthMes)
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
        // console.log(users)
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

    predictColumns.forEach(function (column, i) {
      console.log(i);
      if (i + 1 > stageIndex) {
        column.classList.add("_lock");
      }
      if (i + 1 < stageIndex) {
        column.classList.add("_done");
      }
      if (i + 1 === stageIndex) {
        column.classList.add("_active");
      }
      if (tournamentStage === 5) {
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
    if (window.innerWidth <= 500) {
      // console.log(predictColumns)
      updateActiveStage(predictColumns);
      tableTab.forEach(function (item, i) {
        if (i === stageIndex - 1) {
          item.classList.add("_active");
        }
      });
    }
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
    if (topUsers.some(function (user) {
      return user.userid === currentUserId;
    })) return;
    var currentUserIndex = users.findIndex(function (user) {
      return user.userid === currentUserId;
    });
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
    // console.log(prizeKey)

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
  for (var i = 0; i < tournamentStage && i < 4; i++) {
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
    if (tournamentStage >= 5 && i === 3) {
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
    if (tournamentStage >= 5 && i === 3) {
      item.classList.add("_active");
    }
  });
  function checkButtonState() {
    var activeColumn = document.querySelector(".table__column._active");
    if (!activeColumn || !localStorage.getItem("predictData")) return;
    var stageClass = Array.from(activeColumn.classList).find(function (cls) {
      return cls.startsWith('stage');
    });
    var predictData = JSON.parse(localStorage.getItem("predictData"));
    var stage = getStageClassColumn(stageClass);
    var selectedTeams = predictData.filter(function (item) {
      return item.stage === stage;
    }).length;
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

    // console.log(teamBlock)

    teamRadios.forEach(function (radio, index) {
      // console.log(radio)
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
    // console.log(column.classList.contains("_lock") )
    var stage = "";
    column.classList.contains("stage1-8") ? stage = "Opening Stage" : null;
    column.classList.contains("stage1-4") ? stage = "Quarterfinals" : null;
    column.classList.contains("stage1-2") ? stage = "Semifinals" : null;
    column.classList.contains("stage-final") ? stage = "Final" : null;
    var teamBlocks = column.querySelectorAll(".table__chose");

    // console.log(teamBlocks)

    teamBlocks.forEach(function (block) {
      return getTeamName(block, stage, column);
    });
  }
  function updateActiveStage(stages) {
    stages.forEach(function (stage, index) {
      if (index + 1 === stageIndex) {
        stage.classList.add("_active");
      } else {
        stage.classList.remove("_active");
      }
    });
  }
  moveLeft.addEventListener("click", function () {
    if (stageIndex > 1) {
      stageIndex--;
    } else {
      stageIndex = predictColumns.length; // Перехід до останнього елемента
    }

    updateActiveStage(predictColumns);
    updateTabsStage();
  });
  moveRight.addEventListener("click", function () {
    if (stageIndex < predictColumns.length) {
      stageIndex++;
    } else {
      stageIndex = 1; // Перехід до першого елемента
    }

    updateActiveStage(predictColumns);
    updateTabsStage();
  });
  function updateTabsStage() {
    tableTab.forEach(function (item, i) {
      console.log(i, stageIndex);
      item.classList.remove("_active");
      if (i + 1 === stageIndex) {
        item.classList.add("_active");
      }
    });
  }
  moveLeftResult.addEventListener("click", function () {
    if (columnIndex >= 1) {
      columnIndex--;
    }
    if (columnIndex < 1 && tournamentStage <= 4) {
      columnIndex = tournamentStage;
    }
    if (columnIndex < 1 && tournamentStage > 4) {
      columnIndex = 4;
    }
    updateTableTabs();
  });
  moveRightResult.addEventListener("click", function () {
    // console.log(columnIndex, tournamentStage)
    if (columnIndex <= tournamentStage) {
      columnIndex++;
    }
    if (columnIndex > tournamentStage && tournamentStage <= 4) {
      // console.log("2")
      columnIndex = 1;
    }
    if (columnIndex > 4 && tournamentStage > 4) {
      columnIndex = 1;
    }
    updateTableTabs();
  });
  function updateTableTabs() {
    // console.log(columnIndex, tournamentStage)
    tableNav.forEach(function (item, i) {
      item.classList.remove("_active");
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
  }

  // moveLeftResult.addEventListener("click", () => {
  //     if (stageIndex > 1) {
  //         stageIndex--;
  //     } else {
  //         stageIndex = Math.min(tabsResult.length, 4); // Обмежуємо до 4 табів
  //     }
  //     updateTabs();
  // });

  // moveLeftResult.addEventListener("click", () => {
  //     if (stageIndex > 1) {
  //         stageIndex--;
  //     } else {
  //         stageIndex = Math.min(tabsResult.length, 4); // Обмежуємо до 4 табів
  //     }
  //     updateTabs();
  // });
  //
  // moveRightResult.addEventListener("click", () => {
  //     let maxIndex = Math.min(tabsResult.length, 4);
  //     console.log(stageIndex)
  //     if (stageIndex < maxIndex) {
  //         stageIndex++;
  //     } else {
  //         stageIndex = 1;
  //     }
  //     updateTabs();
  // });
  //
  //
  // function updateTabs() {
  //     tableNav.forEach((item, i) => {
  //         item.classList.remove("_active");
  //         if (i + 1 === stageIndex) {
  //             item.classList.add("_active");
  //         }
  //     });
  //
  //     // Оновлюємо активний стан для tableNavTab
  //     tableNavTab.forEach((item, i) => {
  //         item.classList.remove("_active");
  //         if (i + 1 === stageIndex) {
  //             item.classList.add("_active");
  //         }
  //     });
  //
  //     // Оновлюємо активний стан для tabsResult
  //     tabsResult.forEach((item, i) => {
  //         item.classList.remove("_active");
  //         if (i + 1 === stageIndex) {
  //             item.classList.add("_active");
  //         }
  //     });
  // }

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwiYXBpVVJMVGFibGUiLCJyZXN1bHRzVGFibGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJtYWluUGFnZSIsInVuYXV0aE1zZ3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGFydGljaXBhdGVCdG5zIiwieW91QXJlSW5CdG5zIiwicHJlZGljdGlvbkJ0biIsIm11bHRpcGxpZXJTcGFucyIsInJlc3VsdHNUYWJsZUhlYWQiLCJ0b3BSZXN1bHRzVGFibGUiLCJyZXN1bHRzVGFibGVPdGhlciIsInRhYmxlTmF2IiwicHJlZGljdENvbHVtbnMiLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsIm1vdmVMZWZ0UmVzdWx0IiwibW92ZVJpZ2h0UmVzdWx0IiwidGFic1Jlc3VsdCIsInRhYnNDb250YWluZXIiLCJ0YWJsZVRhYiIsInRvdXJuYW1lbnRTdGFnZSIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsIk51bWJlciIsInN0YWdlSW5kZXgiLCJjb2x1bW5JbmRleCIsImNvbnNvbGUiLCJsb2ciLCJ1c2VySW5mbyIsInRyYW5zbGF0ZVN0YXRlIiwiZGVidWciLCJsb2NhbGUiLCJ1c2VycyIsImkxOG5EYXRhIiwiaTE4bkRhdGFUYWJsZSIsInVzZXJJZCIsIlBSSVpFU19DU1MiLCJwcmVkaWN0RGF0YSIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImNoZWNrVXNlckF1dGgiLCJ1bmF1dGhNZXMiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZXF1ZXN0IiwidGhlbiIsInJlcyIsInVzZXJpZCIsImZvckVhY2giLCJpdGVtIiwicmVtb3ZlIiwicmVmcmVzaFVzZXJJbmZvIiwicGFydGljaXBhdGVCdG4iLCJ1c2VyIiwic3BhbiIsImluZGV4IiwiaW5uZXJIVE1MIiwibXVsdGlwbGllciIsImxvYWRUcmFuc2xhdGlvbnMiLCJmZXRjaCIsImpzb24iLCJ0cmFuc2xhdGUiLCJtdXRhdGlvbk9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9ucyIsIm9ic2VydmUiLCJnZXRFbGVtZW50QnlJZCIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJlbGVtcyIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJyZWZyZXNoTG9jYWxpemVkQ2xhc3MiLCJlbGVtZW50IiwibGFuZyIsImxpbmsiLCJleHRyYU9wdGlvbnMiLCJoZWFkZXJzIiwiZ2V0RGF0YSIsIlByb21pc2UiLCJhbGwiLCJJbml0UGFnZSIsInJlcXVlc3RUYWJsZSIsInNvcnQiLCJhIiwiYiIsInBvaW50cyIsInJlbmRlclVzZXJzIiwiY29sdW1uIiwiaSIsInNldFByZWRpY3RDb2x1bW4iLCJjb250YWlucyIsInRlYW1zIiwiZGF0ZSIsInRpbWUiLCJ0ZWFtIiwidGV4dENvbnRlbnQiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwidXBkYXRlQWN0aXZlU3RhZ2UiLCJjaGVja0J1dHRvblN0YXRlIiwiaW5pdCIsInN0b3JlIiwic3RhdGUiLCJnZXRTdGF0ZSIsImF1dGgiLCJpc0F1dGhvcml6ZWQiLCJpZCIsImMiLCJzZXRJbnRlcnZhbCIsImdfdXNlcl9pZCIsImNsZWFySW50ZXJ2YWwiLCJhdXRoQnRuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInBhcnRpY2lwYXRlIiwicGFyYW1zIiwibWV0aG9kIiwiYm9keSIsInN0cmluZ2lmeSIsInBvcHVsYXRlVXNlcnNUYWJsZSIsImN1cnJlbnRVc2VySWQiLCJsZW5ndGgiLCJ0b3BVc2VycyIsInNsaWNlIiwiZGlzcGxheVVzZXIiLCJzb21lIiwiY3VycmVudFVzZXJJbmRleCIsImZpbmRJbmRleCIsIm90aGVyVXNlcnMiLCJNYXRoIiwibWF4IiwiaXNDdXJyZW50VXNlciIsInRhYmxlIiwiYWxsVXNlcnMiLCJhZGRpdGlvbmFsVXNlclJvdyIsImNyZWF0ZUVsZW1lbnQiLCJwbGFjZSIsImluZGV4T2YiLCJwcml6ZVBsYWNlQ3NzIiwicHJpemVLZXkiLCJnZXRQcml6ZVRyYW5zbGF0aW9uS2V5VGVzdCIsImdldFByaXplVHJhbnNsYXRpb25LZXkiLCJtYXNrVXNlcklkIiwidG90YWxQb2ludHMiLCJ0cmFuc2xhdGVLZXkiLCJ5b3VCbG9jayIsInNldEF0dHJpYnV0ZSIsImFwcGVuZCIsInRyYW5zbGF0ZVRhYmxlIiwidG9TdHJpbmciLCJwb3B1cEJ0bnMiLCJwb3B1cHMiLCJwb3B1cCIsImNsb3NlIiwib3BlbiIsInBhcmVudE5vZGUiLCJzZXRQb3B1cCIsInRhcmdldCIsInRhYiIsImFwcGVuZENoaWxkIiwidGFibGVOYXZUYWIiLCJuYXYiLCJhY3RpdmVDb2x1bW4iLCJzdGFnZUNsYXNzIiwiQXJyYXkiLCJmcm9tIiwiZmluZCIsImNscyIsInN0YXJ0c1dpdGgiLCJzdGFnZSIsImdldFN0YWdlQ2xhc3NDb2x1bW4iLCJzZWxlY3RlZFRlYW1zIiwiZmlsdGVyIiwidG90YWxTZWxlY3RhYmxlIiwiYWN0aXZhdGVTZWxlY3RlZFRlYW1zIiwic3RvcmVkUHJlZGljdERhdGEiLCJkYXRhIiwiY29sdW1ucyIsImdldFN0YWdlQ2xhc3MiLCJ0ZWFtQmxvY2tzIiwiYmxvY2siLCJ0ZWFtUmFkaW9zIiwidGVhbUVsZW1lbnQiLCJ0cmltIiwidXBkYXRlTG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImdldFRlYW1OYW1lIiwidGVhbUJsb2NrIiwicmFkaW8iLCJzZXRUaW1lb3V0Iiwic2VsZWN0ZWRUZWFtIiwicHVzaCIsInN0YWdlcyIsInVwZGF0ZVRhYnNTdGFnZSIsInVwZGF0ZVRhYmxlVGFicyIsImxvYWRUcmFuc2xhdGlvbnNUYWJsZSIsInRvZ2dsZSIsImxuZ0J0biIsInJlbW92ZUl0ZW0iLCJsb2NhdGlvbiIsInJlbG9hZCIsInRvdXJuYW1lbnRCdG4iLCJjbGVhckJ1dHRvbiIsImNsZWFyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLENBQUMsWUFBVztFQUFBO0VBQ1IsSUFBTUEsTUFBTSxHQUFHLDJDQUEyQztFQUMxRCxJQUFNQyxX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QWMsR0FBRztJQUV0QixJQUFNbkYsS0FBSyxHQUFHN0QsZUFBZSxDQUFDTixnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQztJQUdsRSxJQUFHMEIsY0FBYyxFQUFDO01BQ2R5QyxLQUFLLENBQUNyQixPQUFPLENBQUMsVUFBQXNCLElBQUksRUFBSTtRQUNsQixJQUFNQyxHQUFHLEdBQUdELElBQUksQ0FBQ0UsWUFBWSxDQUFDLGdCQUFnQixDQUFDO1FBQy9DRixJQUFJLENBQUNkLFNBQVMsR0FBR3ZCLGFBQWEsQ0FBQ3NDLEdBQUcsQ0FBQyxJQUFJLDBDQUEwQyxHQUFHQSxHQUFHO1FBQ3ZGRCxJQUFJLENBQUNHLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztNQUMxQyxDQUFDLENBQUM7SUFDTixDQUFDLE1BQUk7TUFDRGhELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLG1CQUFtQixDQUFDO0lBQ3BDO0lBQ0FnRCxxQkFBcUIsQ0FBQzFFLFFBQVEsQ0FBQztFQUNuQzs7RUFFQTtBQUVKLENBQUMsR0FBRyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpe1xuICAgIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL2Zhdi1wcm9tLmNvbS9hcGlfbGVnZW5kYXJ5X3Ryb3BoeSc7XG4gICAgY29uc3QgYXBpVVJMVGFibGUgPSAnaHR0cHM6Ly9mYXYtcHJvbS5jb20vYXBpX3NoYW5naGFpJztcbiAgICBjb25zdCByZXN1bHRzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdWx0cy10YWJsZScpLFxuICAgICAgICBtYWluUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmF2LXBhZ2VcIiksXG4gICAgICAgIHVuYXV0aE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5hdXRoLW1zZycpLFxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWpvaW4nKSxcbiAgICAgICAgeW91QXJlSW5CdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvb2stcGFydCcpLFxuICAgICAgICBwcmVkaWN0aW9uQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmZpcm1CdG4nKSxcbiAgICAgICAgbXVsdGlwbGllclNwYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX211bHRpcGxpZXItbnVtJyksXG4gICAgICAgIHJlc3VsdHNUYWJsZUhlYWQgPSByZXN1bHRzVGFibGUucXVlcnlTZWxlY3RvcignLnRhYmxlUmVzdWx0c19faGVhZCcpLFxuICAgICAgICB0b3BSZXN1bHRzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdWx0cy10YWJsZScpLFxuICAgICAgICByZXN1bHRzVGFibGVPdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN1bHRzLXRhYmxlLW90aGVyJyksXG4gICAgICAgIHRhYmxlTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yZXN1bHRzX19uYXYtaXRlbVwiKSxcbiAgICAgICAgcHJlZGljdENvbHVtbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19jb2x1bW5cIiksXG4gICAgICAgIG1vdmVMZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZV9fbW92ZS1sZWZ0XCIpLFxuICAgICAgICBtb3ZlUmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlX19tb3ZlLXJpZ2h0XCIpLFxuICAgICAgICBtb3ZlTGVmdFJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzdWx0c19fbW92ZS1sZWZ0XCIpLFxuICAgICAgICBtb3ZlUmlnaHRSZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3VsdHNfX21vdmUtcmlnaHRcIiksXG4gICAgICAgIHRhYnNSZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJlc3VsdHNfX3RhYi1pdGVtXCIpLFxuICAgICAgICB0YWJzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdHNfX3RhYicpO1xuXG4gICAgY29uc3QgdGFibGVUYWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfX3RhYi1pdGVtJylcblxuXG5cbiAgICBsZXQgdG91cm5hbWVudFN0YWdlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInRvdXJuYW1lbnRTdGFnZVwiKSA/IE51bWJlcihzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidG91cm5hbWVudFN0YWdlXCIpKSA6IDFcblxuICAgIGxldCBzdGFnZUluZGV4ID0gdG91cm5hbWVudFN0YWdlID49IDUgPyA0IDogdG91cm5hbWVudFN0YWdlXG4gICAgbGV0IGNvbHVtbkluZGV4ID0gdG91cm5hbWVudFN0YWdlID49IDUgPyA0IDogdG91cm5hbWVudFN0YWdlXG5cbiAgICBjb25zb2xlLmxvZyhzdGFnZUluZGV4KVxuXG4gICAgbGV0IHVzZXJJbmZvID0ge307XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhdGUgPSB0cnVlXG4gICAgbGV0IGRlYnVnID0gdHJ1ZVxuICAgIC8vIGxldCBsb2NhbGUgPSAndWsnO1xuICAgIGxldCBsb2NhbGUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwibG9jYWxlXCIpID8/IFwidWtcIlxuICAgIGxldCB1c2VycztcbiAgICBsZXQgaTE4bkRhdGEgPSB7fTtcbiAgICBsZXQgaTE4bkRhdGFUYWJsZSA9IHt9XG4gICAgbGV0IHVzZXJJZDtcbiAgICB1c2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpID8gTnVtYmVyKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIikpIDogbnVsbFxuICAgIC8vIHVzZXJJZCA9IDEwMTEwNzEyMVxuXG4gICAgY29uc3QgUFJJWkVTX0NTUyA9IFsncGxhY2UxJywgJ3BsYWNlMicsICdwbGFjZTMnXTtcblxuICAgIGxldCBwcmVkaWN0RGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcmVkaWN0RGF0YVwiKSkgfHwgW107XG5cbiAgICBsZXQgY2hlY2tVc2VyQXV0aCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHVzZXJJZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2codXNlcklkKVxuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0KGAvZmF2dXNlci8ke3VzZXJJZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMudXNlcmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlvdUFyZUluQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJlZGljdGlvbkJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoVXNlckluZm8ocmVzKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3BSZXN1bHRzVGFibGUuY2xhc3NMaXN0LmFkZChcImF1dGhcIilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b3BSZXN1bHRzVGFibGUuY2xhc3NMaXN0LmFkZChcImF1dGhcIilcbiAgICAgICAgICAgIGZvciAobGV0IHBhcnRpY2lwYXRlQnRuIG9mIHBhcnRpY2lwYXRlQnRucykge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgdW5hdXRoTWVzIG9mIHVuYXV0aE1zZ3MpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh1bmF1dGhNZXMpXG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hVc2VySW5mbyh1c2VyKSB7XG4gICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHVzZXJJbmZvID0gdXNlcjtcbiAgICAgICAgY29uc29sZS5sb2codXNlckluZm8pXG5cbiAgICAgICAgLy8g0J7QvdC+0LLQu9GO0ZTQvNC+INCy0YHRliBtdWx0aXBsaWVyU3BhbnNcbiAgICAgICAgbXVsdGlwbGllclNwYW5zLmZvckVhY2goKHNwYW4sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9IHVzZXJJbmZvLm11bHRpcGxpZXIgfHwgMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gbGV0IG9wZW5pbmdCZXQgPSB7XG4gICAgICAgIC8vICAgICBiaWdXaW5uZXI6IHt0ZWFtOiAnQVBFS1MnLCBvdXRjb21lOiBmYWxzZX0sXG4gICAgICAgIC8vICAgICBiaWdMb3Nlcjoge3RlYW06ICdDTE9VRDknLCBvdXRjb21lOiB0cnVlfSxcbiAgICAgICAgLy8gICAgIHRlYW1zQmV0OiBbe3RlYW06ICdFTkNFJ30sIHt0ZWFtOiAnSEVST0lDJ30sIHt0ZWFtOiAnU0FXJywgb3V0Y29tZTogdHJ1ZX0sIHt0ZWFtOiAnRlVSSUEnfSwge3RlYW06ICdLT0knLCBvdXRjb21lOiBmYWxzZX0sIHt0ZWFtOiAnQU1LQUwnfSwge3RlYW06ICdMRUdBQ1knfV1cbiAgICAgICAgLy8gfTtcbiAgICAgICAgLy8gcmVmcmVzaEJldHModXNlci5vcGVuaW5nQmV0LCBwcm9tb1N0YWdlc1swXSk7XG4gICAgICAgIC8vIHJlZnJlc2hCZXRzKHVzZXIuZWxpbWluYXRpb25CZXQsIHByb21vU3RhZ2VzWzFdKTtcbiAgICAgICAgLy8gcmVmcmVzaEJldHModXNlci53aW5uZXJCZXQsIHByb21vU3RhZ2VzWzJdKTtcblxuICAgICAgICAvLyBpZiAoYWN0aXZlUGhhc2UgJiYgaXNWYWxpZEJldCh1c2VySW5mb1thY3RpdmVQaGFzZS5iZXRGaWVsZE5hbWVdKSkge1xuICAgICAgICAvLyAgICAgcHJlZGljdGlvbkJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYmxvY2tCdG4nKSk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMfS9uZXctdHJhbnNsYXRlcy8ke2xvY2FsZX1gKS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgaTE4bkRhdGEgPSBqc29uO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIHZhciBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xlZ2VuZGFyeS10cm9waHknKSwge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGUoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHJhbnNsYXRlXScpXG4gICAgICAgIGlmKHRyYW5zbGF0ZVN0YXRlKXtcbiAgICAgICAgICAgIGVsZW1zLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICAgICAgZWxlbS5pbm5lckhUTUwgPSBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICAgICAgICAgICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0cmFuc2xhdGlvbiB3b3JrIVwiKVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhtYWluUGFnZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaExvY2FsaXplZENsYXNzKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBsYW5nIG9mIFsndWsnLCAnZW4nXSkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGxhbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChsb2NhbGUpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3QgPSBmdW5jdGlvbiAobGluaywgZXh0cmFPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChhcGlVUkwgKyBsaW5rLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uKGV4dHJhT3B0aW9ucyB8fCB7fSlcbiAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICB9XG5cblxuXG5cbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgcmVxdWVzdCgnL3VzZXJzP25vY2FjaGU9MScpLFxuICAgICAgICBdKVxuICAgIH1cblxuICAgIGNvbnN0IEluaXRQYWdlID0gKCkgPT4ge1xuICAgICAgICBpZihkZWJ1Zyl7XG4gICAgICAgICAgICBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgcmVxdWVzdFRhYmxlKCcvdXNlcnM/bm9jYWNoZT0xJyksXG4gICAgICAgICAgICBdKS50aGVuKHJlcyA9PntcbiAgICAgICAgICAgICAgICB1c2VycyA9IHJlc1swXS5zb3J0KChhLCBiKSA9PiBiLnBvaW50cyAtIGEucG9pbnRzKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh1c2VycylcbiAgICAgICAgICAgICAgICByZW5kZXJVc2Vycyh1c2Vycyk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH1cbiAgICAgICAgZ2V0RGF0YSgpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHVzZXJzID0gcmVzWzBdLnNvcnQoKGEsIGIpID0+IGIucG9pbnRzIC0gYS5wb2ludHMpO1xuICAgICAgICAgICAgLy8gdXNlcnMgPSB1c2Vycy5zbGljZSgwLCAxMClcbiAgICAgICAgICAgIGlmKCFkZWJ1Zykge1xuICAgICAgICAgICAgICAgIHJlbmRlclVzZXJzKHVzZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRyYW5zbGF0ZSgpO1xuICAgICAgICB9KVxuXG4gICAgICAgIHByZWRpY3RDb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgaSkgPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpKVxuICAgICAgICAgICAgaWYoaSArIDEgPiBzdGFnZUluZGV4KXtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmFkZChcIl9sb2NrXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihpICsgMSA8IHN0YWdlSW5kZXgpe1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jbGFzc0xpc3QuYWRkKFwiX2RvbmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGkgKyAxID09PSBzdGFnZUluZGV4KXtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRvdXJuYW1lbnRTdGFnZSA9PT0gNSl7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNsYXNzTGlzdC5hZGQoXCJfZG9uZVwiKVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRQcmVkaWN0Q29sdW1uKGNvbHVtbilcbiAgICAgICAgICAgIGlmKGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJfbG9ja1wiKSl7XG4gICAgICAgICAgICAgICAgY29uc3QgdGVhbXMgPSBjb2x1bW4ucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX190ZWFtLW5hbWUnKVxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBjb2x1bW4ucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX19jaG9zZS1kYXRlJylcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lID0gY29sdW1uLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9fY2hvc2UtdGltZScpXG4gICAgICAgICAgICAgICAgdGVhbXMuZm9yRWFjaCh0ZWFtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGVhbS50ZXh0Q29udGVudCA9IFwi4oCUXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGRhdGUuZm9yRWFjaChkYXRlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZS50ZXh0Q29udGVudCA9IFwi4oCUXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRpbWUuZm9yRWFjaCh0aW1lID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGltZS50ZXh0Q29udGVudCA9IFwi4oCUXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA8PSA1MDApe1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocHJlZGljdENvbHVtbnMpXG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVTdGFnZShwcmVkaWN0Q29sdW1ucyk7XG4gICAgICAgICAgICB0YWJsZVRhYi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgICAgICAgICBpZihpID09PSBzdGFnZUluZGV4IC0gMSl7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH1cblxuICAgICAgICBjaGVja0J1dHRvblN0YXRlKClcbiAgICB9XG5cblxuXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5zdG9yZSkge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gd2luZG93LnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICAgICAgICB1c2VySWQgPSBzdGF0ZS5hdXRoLmlzQXV0aG9yaXplZCAmJiBzdGF0ZS5hdXRoLmlkIHx8ICcnO1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgICAgICBsZXQgYyA9IDA7XG4gICAgICAgICAgICB2YXIgaSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXdpbmRvdy5nX3VzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCA9IHdpbmRvdy5nX3VzZXJfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tVc2VyQXV0aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMjAwKTtcblxuICAgICAgICB9XG4gICAgICAgIGNoZWNrVXNlckF1dGgoKTtcblxuXG4gICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKChhdXRoQnRuLCBpKSA9PiB7XG4gICAgICAgICAgICBhdXRoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJ0aWNpcGF0ZSgpIHtcbiAgICAgICAgaWYgKCF1c2VySWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHt1c2VyaWQ6IHVzZXJJZH07XG5cbiAgICAgICAgcmVxdWVzdCgnL3VzZXInLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBhcmFtcylcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgICAgICB5b3VBcmVJbkJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgIHByZWRpY3Rpb25CdG4ucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICBwYXJ0aWNpcGF0ZSA9IHRydWU7XG4gICAgICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJVc2Vycyh1c2Vycykge1xuICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIHVzZXJJZCk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQpIHtcbiAgICAgICAgcmVzdWx0c1RhYmxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICByZXN1bHRzVGFibGVPdGhlci5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBpZiAoIXVzZXJzIHx8ICF1c2Vycy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBsZXQgdG9wVXNlcnMgPSB1c2Vycy5zbGljZSgwLCAyMCk7XG4gICAgICAgIHRvcFVzZXJzLmZvckVhY2godXNlciA9PiBkaXNwbGF5VXNlcih1c2VyLCB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCwgcmVzdWx0c1RhYmxlLCB1c2VycykpO1xuXG4gICAgICAgIGlmICh0b3BVc2Vycy5zb21lKHVzZXIgPT4gdXNlci51c2VyaWQgPT09IGN1cnJlbnRVc2VySWQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgY3VycmVudFVzZXJJbmRleCA9IHVzZXJzLmZpbmRJbmRleCh1c2VyID0+IHVzZXIudXNlcmlkID09PSBjdXJyZW50VXNlcklkKTtcbiAgICAgICAgaWYgKGN1cnJlbnRVc2VySW5kZXggPj0gMTApIHtcbiAgICAgICAgICAgIGxldCBvdGhlclVzZXJzID0gdXNlcnMuc2xpY2UoTWF0aC5tYXgoMTAsIGN1cnJlbnRVc2VySW5kZXggLSAxKSwgY3VycmVudFVzZXJJbmRleCArIDIpO1xuICAgICAgICAgICAgb3RoZXJVc2Vycy5mb3JFYWNoKHVzZXIgPT4gZGlzcGxheVVzZXIodXNlciwgdXNlci51c2VyaWQgPT09IGN1cnJlbnRVc2VySWQsIHJlc3VsdHNUYWJsZU90aGVyLCB1c2VycykpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBkaXNwbGF5VXNlcih1c2VyLCBpc0N1cnJlbnRVc2VyLCB0YWJsZSwgYWxsVXNlcnMpIHtcbiAgICAgICAgY29uc3QgYWRkaXRpb25hbFVzZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgndGFibGVSZXN1bHRzX19yb3cnKTtcblxuXG5cbiAgICAgICAgY29uc3QgcGxhY2UgPSBhbGxVc2Vycy5pbmRleE9mKHVzZXIpICsgMTtcbiAgICAgICAgY29uc3QgcHJpemVQbGFjZUNzcyA9IFBSSVpFU19DU1NbcGxhY2UgLSAxXTtcbiAgICAgICAgaWYgKHByaXplUGxhY2VDc3MpIHtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQocHJpemVQbGFjZUNzcyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHByaXplS2V5O1xuXG4gICAgICAgIGlmIChkZWJ1Zyl7XG4gICAgICAgICAgICAgICAgcHJpemVLZXkgPSBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5VGVzdChwbGFjZSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBwcml6ZUtleSA9IGdldFByaXplVHJhbnNsYXRpb25LZXkocGxhY2UpXG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2cocHJpemVLZXkpXG5cbiAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19yb3ctaXRlbVwiPiR7cGxhY2V9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHtpc0N1cnJlbnRVc2VyID8gdXNlci51c2VyaWQgOiBtYXNrVXNlcklkKHVzZXIudXNlcmlkKX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke3VzZXIucG9pbnRzfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19yb3ctaXRlbVwiPiR7dXNlci5tdWx0aXBsaWVyfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19yb3ctaXRlbVwiPiR7dXNlci50b3RhbFBvaW50c308L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke3ByaXplS2V5ID8gdHJhbnNsYXRlS2V5KHByaXplS2V5KSA6ICcgLSAnfTwvZGl2PlxuICAgIGA7XG4gICAgICAgIGlmIChpc0N1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICBjb25zdCB5b3VCbG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgeW91QmxvY2suc2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScsICd5b3UnKTtcbiAgICAgICAgICAgIHlvdUJsb2NrLnRleHRDb250ZW50ID0gXCLQotC4XCIgLy8g0LTQu9GPINGC0LXRgdGC0YMg0L/QvtC60Lgg0L3QtdC80LAg0YLRgNCw0L3RgdC70LXQudGC0ZbQslxuICAgICAgICAgICAgeW91QmxvY2suY2xhc3NMaXN0LmFkZCgnX3lvdXInKTtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmFwcGVuZCh5b3VCbG9jaylcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoXCJfeW91clwiKVxuXG4gICAgICAgIH1cbiAgICAgICAgdGFibGUuYXBwZW5kKGFkZGl0aW9uYWxVc2VyUm93KTtcbiAgICAgICAgdHJhbnNsYXRlVGFibGUoKVxuICAgIH1cbiAgICBmdW5jdGlvbiBtYXNrVXNlcklkKHVzZXJJZCkge1xuICAgICAgICByZXR1cm4gXCIqKlwiICsgdXNlcklkLnRvU3RyaW5nKCkuc2xpY2UoMik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlS2V5KGtleSkge1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWJ1ZyA/IGkxOG5EYXRhVGFibGVba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXkgOiBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5KHBsYWNlKSB7XG4gICAgICAgIGlmIChwbGFjZSA8PSA1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXyR7cGxhY2V9YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzYtMTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTEtMjBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMjEtMzVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMzYtNTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNTEtNzVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzc2LTEwMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMjUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTAxLTEyNWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxNTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTI2LTE1MGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTUxLTE3NWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAyMDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTc2LTIwMGBcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29uc3QgcG9wdXBCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbmZvX19pdGVtLWJ0blwiKVxuICAgIGNvbnN0IHBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5mb19faXRlbS1wb3B1cFwiKVxuXG5cbiAgICBwb3B1cHMuZm9yRWFjaCgocG9wdXAsIGkpID0+e1xuICAgICAgICBpZihpID09PSAwKXtcbiAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJfbGVmdFwiKVxuICAgICAgICB9XG4gICAgICAgIGlmKGkgPT09IHBvcHVwcy5sZW5ndGggLSAxKXtcbiAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJfcmlnaHRcIilcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjbG9zZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb19faXRlbS1wb3B1cC1jbG9zZVwiKVxuICAgICAgICBjb25zdCBvcGVuID0gcG9wdXAucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX2l0ZW0tYnRuXCIpXG4gICAgICAgIHNldFBvcHVwKG9wZW4sIGNsb3NlLCBwb3B1cClcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gc2V0UG9wdXAob3BlbiwgY2xvc2UsIHBvcHVwKXtcbiAgICAgICAgb3Blbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwib3BhY2l0eVwiKVxuICAgICAgICB9KVxuICAgICAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFwib3BhY2l0eVwiKVxuICAgICAgICB9KVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgICAgaWYoIXBvcHVwLmNvbnRhaW5zKGUudGFyZ2V0KSAmJiBlLnRhcmdldCAhPT0gb3Blbil7XG4gICAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZChcIm9wYWNpdHlcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cblxuICAgIHRhYnNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdXJuYW1lbnRTdGFnZSAmJiBpIDwgNDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0YWIuY2xhc3NMaXN0LmFkZCgncmVzdWx0c19fdGFiLWl0ZW0nKTtcbiAgICAgICAgdGFic0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YWIpO1xuICAgIH1cblxuICAgIGNvbnN0IHRhYmxlTmF2VGFiID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yZXN1bHRzX190YWItaXRlbVwiKTtcblxuICAgIHRhYmxlTmF2LmZvckVhY2goKGl0ZW0sIGkpID0+e1xuICAgICAgICBpZihpICsgMSA+IHRvdXJuYW1lbnRTdGFnZSl7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfbG9ja1wiKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coaSArIDEsIHRvdXJuYW1lbnRTdGFnZSlcblxuICAgICAgICBpZihpICsgMSA9PT0gdG91cm5hbWVudFN0YWdlKXtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgfVxuICAgICAgICBpZih0b3VybmFtZW50U3RhZ2UgPj0gNSAmJiBpID09PSAzKXtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgIGlmKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIl9sb2NrXCIpKXtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhYmxlTmF2LmZvckVhY2gobmF2ID0+e1xuICAgICAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgIH0pXG4gICAgfSlcbiAgICB0YWJsZU5hdlRhYi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgaWYoaSArIDEgPT09IHRvdXJuYW1lbnRTdGFnZSl7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgIH1cbiAgICAgICAgaWYodG91cm5hbWVudFN0YWdlID49IDUgJiYgaSA9PT0gMyl7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgIH1cblxuICAgIH0pXG5cblxuXG4gICAgZnVuY3Rpb24gY2hlY2tCdXR0b25TdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlQ29sdW1uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZV9fY29sdW1uLl9hY3RpdmVcIik7XG4gICAgICAgIGlmICghYWN0aXZlQ29sdW1uIHx8ICFsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByZWRpY3REYXRhXCIpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgc3RhZ2VDbGFzcyA9IEFycmF5LmZyb20oYWN0aXZlQ29sdW1uLmNsYXNzTGlzdCkuZmluZChjbHMgPT4gY2xzLnN0YXJ0c1dpdGgoJ3N0YWdlJykpXG4gICAgICAgIGNvbnN0IHByZWRpY3REYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByZWRpY3REYXRhXCIpKTtcbiAgICAgICAgY29uc3Qgc3RhZ2UgPSBnZXRTdGFnZUNsYXNzQ29sdW1uKHN0YWdlQ2xhc3MpO1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRlYW1zID0gcHJlZGljdERhdGEuZmlsdGVyKGl0ZW0gPT4gaXRlbS5zdGFnZSA9PT0gc3RhZ2UpLmxlbmd0aFxuXG4gICAgICAgIGNvbnN0IHRvdGFsU2VsZWN0YWJsZSA9IGFjdGl2ZUNvbHVtbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19jaG9zZVwiKS5sZW5ndGg7XG5cbiAgICAgICAgY29uc29sZS5sb2coc2VsZWN0ZWRUZWFtcywgdG90YWxTZWxlY3RhYmxlKTtcblxuICAgICAgICAvLyDQr9C60YnQviDQstGB0ZYg0LzQvtC20LvQuNCy0ZYg0LLQsNGA0ZbQsNC90YLQuCDQstC40LHRgNCw0L3Rliwg0YDQvtC30LHQu9C+0LrQvtCy0YPRlNC80L4g0LrQvdC+0L/QutGDLCDRltC90LDQutGI0LUg0LHQu9C+0LrRg9GU0LzQvlxuICAgICAgICBpZiAoc2VsZWN0ZWRUZWFtcyA+PSB0b3RhbFNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgIHByZWRpY3Rpb25CdG4uY2xhc3NMaXN0LnJlbW92ZShcIl9sb2NrXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJlZGljdGlvbkJ0bi5jbGFzc0xpc3QuYWRkKFwiX2xvY2tcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhY3RpdmF0ZVNlbGVjdGVkVGVhbXMoc3RvcmVkUHJlZGljdERhdGEpIHtcblxuICAgICAgICAvLyDQn9GA0L7RhdC+0LTQuNC80L7RgdGPINC/0L4g0LLRgdGW0YUg0LXQu9C10LzQtdC90YLQsNGFIHByZWRpY3REYXRhXG4gICAgICAgIHN0b3JlZFByZWRpY3REYXRhLmZvckVhY2goZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHN0YWdlLCB0ZWFtIH0gPSBkYXRhO1xuXG4gICAgICAgICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0LLRgdGWINC60L7Qu9C+0L3QutC4LCDRj9C60ZYg0LLRltC00L/QvtCy0ZbQtNCw0Y7RgtGMINC00LDQvdC+0LzRgyDQtdGC0LDQv9GDIChzdGFnZSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0YWdlKVxuICAgICAgICAgICAgY29uc3QgY29sdW1ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2dldFN0YWdlQ2xhc3Moc3RhZ2UpfWApO1xuXG4gICAgICAgICAgICBjb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcbiAgICAgICAgICAgICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0LLRgdGWINCx0LvQvtC60Lgg0Lcg0LrQvtC80LDQvdC00LDQvNC4INCyINGG0ZbQuSDQutC+0LvQvtC90YbRllxuICAgICAgICAgICAgICAgIGNvbnN0IHRlYW1CbG9ja3MgPSBjb2x1bW4ucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9fY2hvc2VcIik7XG5cbiAgICAgICAgICAgICAgICB0ZWFtQmxvY2tzLmZvckVhY2goYmxvY2sgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0LLRgdGWINGA0LDQtNGW0L7QutC90L7Qv9C60Lgg0YLQsCDQvdCw0LfQstC4INC60L7QvNCw0L3QtCDQsiDRhtGM0L7QvNGDINCx0LvQvtC60YNcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVhbVJhZGlvcyA9IGJsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX3RlYW0tcmFkaW9cIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRlYW1zID0gYmxvY2sucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9fdGVhbS1uYW1lXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vINCf0YDQvtGF0L7QtNC40LzQvtGB0Y8g0L/QviDQstGB0ZbRhSDQutC+0LzQsNC90LTQsNGFINCyINCx0LvQvtC60YNcbiAgICAgICAgICAgICAgICAgICAgdGVhbXMuZm9yRWFjaCgodGVhbUVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQr9C60YnQviDQvdCw0LfQstCwINC60L7QvNCw0L3QtNC4INGB0L/RltCy0L/QsNC00LDRlCDQtyDQstC40LHRgNCw0L3QvtGOINC60L7QvNCw0L3QtNC+0Y4g0LcgcHJlZGljdERhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZWFtRWxlbWVudC50ZXh0Q29udGVudC50cmltKCkgPT09IHRlYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQkNC60YLQuNCy0YPRlNC80L4g0LLRltC00L/QvtCy0ZbQtNC90YMg0YDQsNC00ZbQvtC60L3QvtC/0LrRg1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlYW1SYWRpb3NbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTdGFnZUNsYXNzKHN0YWdlKSB7XG4gICAgICAgIHN3aXRjaCAoc3RhZ2UpIHtcbiAgICAgICAgICAgIGNhc2UgXCJPcGVuaW5nIFN0YWdlXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RhZ2UxLThcIjtcbiAgICAgICAgICAgIGNhc2UgXCJRdWFydGVyZmluYWxzXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RhZ2UxLTRcIjtcbiAgICAgICAgICAgIGNhc2UgXCJTZW1pZmluYWxzXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RhZ2UxLTJcIjtcbiAgICAgICAgICAgIGNhc2UgXCJGaW5hbFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YWdlLWZpbmFsXCI7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U3RhZ2VDbGFzc0NvbHVtbihzdGFnZSkge1xuICAgICAgICBzd2l0Y2ggKHN0YWdlKSB7XG4gICAgICAgICAgICBjYXNlIFwic3RhZ2UxLThcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJPcGVuaW5nIFN0YWdlXCI7XG4gICAgICAgICAgICBjYXNlIFwic3RhZ2UxLTRcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJRdWFydGVyZmluYWxzXCI7XG4gICAgICAgICAgICBjYXNlIFwic3RhZ2UxLTJcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJTZW1pZmluYWxzXCI7XG4gICAgICAgICAgICBjYXNlIFwic3RhZ2UtZmluYWxcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJGaW5hbFwiO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IGFjdGl2YXRlU2VsZWN0ZWRUZWFtcyhwcmVkaWN0RGF0YSkpO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlTG9jYWxTdG9yYWdlKCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByZWRpY3REYXRhXCIsIEpTT04uc3RyaW5naWZ5KHByZWRpY3REYXRhKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VGVhbU5hbWUodGVhbUJsb2NrLCBzdGFnZSwgY29sdW1uKSB7XG4gICAgICAgIGlmKGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJfZG9uZVwiKSl7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0ZWFtUmFkaW9zID0gdGVhbUJsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX3RlYW0tcmFkaW9cIik7XG4gICAgICAgIGNvbnN0IHRlYW1zID0gdGVhbUJsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX3RlYW0tbmFtZVwiKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZWFtQmxvY2spXG5cbiAgICAgICAgdGVhbVJhZGlvcy5mb3JFYWNoKChyYWRpbywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJhZGlvKVxuICAgICAgICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tCdXR0b25TdGF0ZSgpXG4gICAgICAgICAgICAgICAgfSwgNTApXG5cbiAgICAgICAgICAgICAgICB0ZWFtUmFkaW9zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpKVxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZWFtID0gdGVhbXNbaW5kZXhdLnRleHRDb250ZW50LnRyaW0oKTtcblxuICAgICAgICAgICAgICAgIC8vINCS0LjQtNCw0LvRj9GU0LzQviDQv9C+0L/QtdGA0LXQtNC90Y4g0LrQvtC80LDQvdC00YMg0Lcg0YbRjNC+0LPQviDQsdC70L7QutGDXG4gICAgICAgICAgICAgICAgcHJlZGljdERhdGEgPSBwcmVkaWN0RGF0YS5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnN0YWdlICE9PSBzdGFnZSkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFBcnJheS5mcm9tKHRlYW1zKS5zb21lKHRlYW0gPT4gdGVhbS50ZXh0Q29udGVudC50cmltKCkgPT09IGl0ZW0udGVhbSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyDQlNC+0LTQsNGU0LzQviDQvdC+0LLRgyDQutC+0LzQsNC90LTRg1xuICAgICAgICAgICAgICAgIHByZWRpY3REYXRhLnB1c2goeyBzdGFnZTogc3RhZ2UsIHRlYW06IHNlbGVjdGVkVGVhbSB9KTtcblxuICAgICAgICAgICAgICAgIC8vINCe0L3QvtCy0LvRjtGU0LzQviBsb2NhbFN0b3JhZ2VcbiAgICAgICAgICAgICAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoKTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHByZWRpY3REYXRhKTsgLy8g0J/QtdGA0LXQstGW0YDRj9GU0LzQviwg0YfQuCDQv9GA0LDQstC40LvRjNC90L4g0L/RgNCw0YbRjtGUXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBzZXRQcmVkaWN0Q29sdW1uKGNvbHVtbikge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiX2xvY2tcIikgKVxuICAgICAgICBsZXQgc3RhZ2UgPSBcIlwiXG5cbiAgICAgICAgY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcInN0YWdlMS04XCIpID8gc3RhZ2UgPSBcIk9wZW5pbmcgU3RhZ2VcIiA6IG51bGw7XG4gICAgICAgIGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJzdGFnZTEtNFwiKSA/IHN0YWdlID0gXCJRdWFydGVyZmluYWxzXCIgOiBudWxsO1xuICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwic3RhZ2UxLTJcIikgPyBzdGFnZSA9IFwiU2VtaWZpbmFsc1wiIDogbnVsbDtcbiAgICAgICAgY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcInN0YWdlLWZpbmFsXCIpID8gc3RhZ2UgPSBcIkZpbmFsXCIgOiBudWxsO1xuXG4gICAgICAgIGNvbnN0IHRlYW1CbG9ja3MgPSBjb2x1bW4ucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9fY2hvc2VcIik7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2codGVhbUJsb2NrcylcblxuICAgICAgICB0ZWFtQmxvY2tzLmZvckVhY2goYmxvY2sgPT4gZ2V0VGVhbU5hbWUoYmxvY2ssIHN0YWdlLCBjb2x1bW4pKTtcblxuXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiB1cGRhdGVBY3RpdmVTdGFnZShzdGFnZXMpIHtcbiAgICAgICAgc3RhZ2VzLmZvckVhY2goKHN0YWdlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ICsgMSA9PT0gc3RhZ2VJbmRleCkge1xuICAgICAgICAgICAgICAgIHN0YWdlLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc3RhZ2UuY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1vdmVMZWZ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChzdGFnZUluZGV4ID4gMSkge1xuICAgICAgICAgICAgc3RhZ2VJbmRleC0tO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhZ2VJbmRleCA9IHByZWRpY3RDb2x1bW5zLmxlbmd0aDsgLy8g0J/QtdGA0LXRhdGW0LQg0LTQviDQvtGB0YLQsNC90L3RjNC+0LPQviDQtdC70LXQvNC10L3RgtCwXG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlQWN0aXZlU3RhZ2UocHJlZGljdENvbHVtbnMpO1xuICAgICAgICB1cGRhdGVUYWJzU3RhZ2UoKTtcbiAgICB9KTtcblxuICAgIG1vdmVSaWdodC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoc3RhZ2VJbmRleCA8IHByZWRpY3RDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgc3RhZ2VJbmRleCsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhZ2VJbmRleCA9IDE7IC8vINCf0LXRgNC10YXRltC0INC00L4g0L/QtdGA0YjQvtCz0L4g0LXQu9C10LzQtdC90YLQsFxuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZUFjdGl2ZVN0YWdlKHByZWRpY3RDb2x1bW5zKTtcbiAgICAgICAgdXBkYXRlVGFic1N0YWdlKCk7XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gdXBkYXRlVGFic1N0YWdlKCkge1xuICAgICAgICB0YWJsZVRhYi5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpLCBzdGFnZUluZGV4KVxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKTtcbiAgICAgICAgICAgIGlmIChpICsgMSA9PT0gc3RhZ2VJbmRleCkge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1vdmVMZWZ0UmVzdWx0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cbiAgICAgICAgaWYgKGNvbHVtbkluZGV4ID49IDEpIHtcbiAgICAgICAgICAgIGNvbHVtbkluZGV4LS07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbHVtbkluZGV4IDwgMSAmJiB0b3VybmFtZW50U3RhZ2UgPD0gNCl7XG4gICAgICAgICAgICBjb2x1bW5JbmRleCA9IHRvdXJuYW1lbnRTdGFnZVxuICAgICAgICB9XG4gICAgICAgIGlmIChjb2x1bW5JbmRleCA8IDEgJiYgdG91cm5hbWVudFN0YWdlID4gNCl7XG4gICAgICAgICAgICBjb2x1bW5JbmRleCA9IDRcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVUYWJsZVRhYnMoKVxuXG4gICAgfSk7XG5cbiAgICBtb3ZlUmlnaHRSZXN1bHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY29sdW1uSW5kZXgsIHRvdXJuYW1lbnRTdGFnZSlcbiAgICAgICAgaWYgKGNvbHVtbkluZGV4IDw9IHRvdXJuYW1lbnRTdGFnZSkge1xuICAgICAgICAgICAgY29sdW1uSW5kZXgrKztcblxuICAgICAgICB9XG4gICAgICAgIGlmIChjb2x1bW5JbmRleCA+IHRvdXJuYW1lbnRTdGFnZSAmJiB0b3VybmFtZW50U3RhZ2UgPD0gNCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIyXCIpXG4gICAgICAgICAgICBjb2x1bW5JbmRleCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbHVtbkluZGV4ID4gNCAmJiB0b3VybmFtZW50U3RhZ2UgPiA0KSB7XG4gICAgICAgICAgICBjb2x1bW5JbmRleCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlVGFibGVUYWJzKCk7XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gdXBkYXRlVGFibGVUYWJzKCl7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNvbHVtbkluZGV4LCB0b3VybmFtZW50U3RhZ2UpXG4gICAgICAgIHRhYmxlTmF2LmZvckVhY2goKGl0ZW0sIGkpID0+e1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgaWYgKGkgKyAxID09PSBjb2x1bW5JbmRleCl7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICB0YWJsZU5hdlRhYi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIGlmIChpICsgMSA9PT0gY29sdW1uSW5kZXgpe1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cblxuICAgIC8vIG1vdmVMZWZ0UmVzdWx0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgLy8gICAgIGlmIChzdGFnZUluZGV4ID4gMSkge1xuICAgIC8vICAgICAgICAgc3RhZ2VJbmRleC0tO1xuICAgIC8vICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgc3RhZ2VJbmRleCA9IE1hdGgubWluKHRhYnNSZXN1bHQubGVuZ3RoLCA0KTsgLy8g0J7QsdC80LXQttGD0ZTQvNC+INC00L4gNCDRgtCw0LHRltCyXG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgdXBkYXRlVGFicygpO1xuICAgIC8vIH0pO1xuXG4gICAgLy8gbW92ZUxlZnRSZXN1bHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAvLyAgICAgaWYgKHN0YWdlSW5kZXggPiAxKSB7XG4gICAgLy8gICAgICAgICBzdGFnZUluZGV4LS07XG4gICAgLy8gICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICBzdGFnZUluZGV4ID0gTWF0aC5taW4odGFic1Jlc3VsdC5sZW5ndGgsIDQpOyAvLyDQntCx0LzQtdC20YPRlNC80L4g0LTQviA0INGC0LDQsdGW0LJcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICB1cGRhdGVUYWJzKCk7XG4gICAgLy8gfSk7XG4gICAgLy9cbiAgICAvLyBtb3ZlUmlnaHRSZXN1bHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAvLyAgICAgbGV0IG1heEluZGV4ID0gTWF0aC5taW4odGFic1Jlc3VsdC5sZW5ndGgsIDQpO1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhzdGFnZUluZGV4KVxuICAgIC8vICAgICBpZiAoc3RhZ2VJbmRleCA8IG1heEluZGV4KSB7XG4gICAgLy8gICAgICAgICBzdGFnZUluZGV4Kys7XG4gICAgLy8gICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICBzdGFnZUluZGV4ID0gMTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICB1cGRhdGVUYWJzKCk7XG4gICAgLy8gfSk7XG4gICAgLy9cbiAgICAvL1xuICAgIC8vIGZ1bmN0aW9uIHVwZGF0ZVRhYnMoKSB7XG4gICAgLy8gICAgIHRhYmxlTmF2LmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAvLyAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIik7XG4gICAgLy8gICAgICAgICBpZiAoaSArIDEgPT09IHN0YWdlSW5kZXgpIHtcbiAgICAvLyAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KTtcbiAgICAvL1xuICAgIC8vICAgICAvLyDQntC90L7QstC70Y7RlNC80L4g0LDQutGC0LjQstC90LjQuSDRgdGC0LDQvSDQtNC70Y8gdGFibGVOYXZUYWJcbiAgICAvLyAgICAgdGFibGVOYXZUYWIuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xuICAgIC8vICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKTtcbiAgICAvLyAgICAgICAgIGlmIChpICsgMSA9PT0gc3RhZ2VJbmRleCkge1xuICAgIC8vICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIik7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pO1xuICAgIC8vXG4gICAgLy8gICAgIC8vINCe0L3QvtCy0LvRjtGU0LzQviDQsNC60YLQuNCy0L3QuNC5INGB0YLQsNC9INC00LvRjyB0YWJzUmVzdWx0XG4gICAgLy8gICAgIHRhYnNSZXN1bHQuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xuICAgIC8vICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKTtcbiAgICAvLyAgICAgICAgIGlmIChpICsgMSA9PT0gc3RhZ2VJbmRleCkge1xuICAgIC8vICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIik7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH1cblxuICAgIGxvYWRUcmFuc2xhdGlvbnMoKVxuICAgICAgICAudGhlbihpbml0KVxuICAgICAgICAudGhlbihsb2FkVHJhbnNsYXRpb25zVGFibGUpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXJrLWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShcImRhcmtcIilcbiAgICB9KVxuXG4gICAgY29uc3QgbG5nQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sbmctYnRuXCIpXG5cbiAgICBsbmdCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJsb2NhbGVcIikpIHtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJsb2NhbGVcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwibG9jYWxlXCIsIFwiZW5cIik7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgYXV0aEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXV0aC1idG5cIilcblxuICAgIGF1dGhCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpZih1c2VySWQpe1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShcInVzZXJJZFwiKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgJzEwMDMwMDI2OCcpXG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG4gICAgfSlcblxuICAgIGNvbnN0IHRvdXJuYW1lbnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YWdlLWJ0blwiKVxuICAgIHRvdXJuYW1lbnRCdG4udGV4dENvbnRlbnQgPSBgc3RhZ2UgJHt0b3VybmFtZW50U3RhZ2V9YFxuXG4gICAgdG91cm5hbWVudEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0b3VybmFtZW50U3RhZ2UgKz0gMTtcbiAgICAgICAgaWYgKHRvdXJuYW1lbnRTdGFnZSA+IDUpIHtcbiAgICAgICAgICAgIHRvdXJuYW1lbnRTdGFnZSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInRvdXJuYW1lbnRTdGFnZVwiLCB0b3VybmFtZW50U3RhZ2UpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICB9KTtcblxuICAgIGNvbnN0IGNsZWFyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbGVhci1idG5cIik7XG4gICAgY2xlYXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuXG4gICAgLy8gZm9yIHRlc3RcbiAgICBjb25zdCByZXF1ZXN0VGFibGUgPSBmdW5jdGlvbiAobGluaywgZXh0cmFPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChhcGlVUkxUYWJsZSArIGxpbmssIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi4oZXh0cmFPcHRpb25zIHx8IHt9KVxuICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByaXplVHJhbnNsYXRpb25LZXlUZXN0KHBsYWNlKSB7XG4gICAgICAgIGlmIChwbGFjZSA8PSA1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXyR7cGxhY2V9YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzYtMTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTEtMjBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMjEtMzVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMzYtNTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNTEtNzVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzc2LTEwMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMjUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTAxLTEyNWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxNTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTI2LTE1MGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTUxLTE3NWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAyMDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTc2LTIwMGBcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gbG9hZFRyYW5zbGF0aW9uc1RhYmxlKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMVGFibGV9L3RyYW5zbGF0ZXMvJHtsb2NhbGV9YCkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKGpzb24gPT4ge1xuICAgICAgICAgICAgICAgIGkxOG5EYXRhVGFibGUgPSBqc29uO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlVGFibGUoKSB7XG5cbiAgICAgICAgY29uc3QgZWxlbXMgPSB0b3BSZXN1bHRzVGFibGUucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHJhbnNsYXRlXScpXG5cblxuICAgICAgICBpZih0cmFuc2xhdGVTdGF0ZSl7XG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gaTE4bkRhdGFUYWJsZVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICAgICAgICAgICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0cmFuc2xhdGlvbiB3b3JrIVwiKVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhtYWluUGFnZSk7XG4gICAgfVxuXG4gICAgLy8gZm9yIHRlc3RcblxufSkoKVxuXG4iXX0=

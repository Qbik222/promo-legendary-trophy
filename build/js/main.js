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
  var apiURL = 'https://fav-prom.com/api_legendary_trophy';
  // const apiURL = 'https://fav-prom.com/api_shanghai';
  var resultsTable = document.querySelector('#results-table'),
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
  var tournamentStage = 2;
  var columnIndex = tournamentStage - 1;
  var userInfo = {};
  var translateState = true;
  var locale = 'en';
  var users;
  var i18nData = {};
  var userId;
  userId = 100300268;
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
    refreshLocalizedClass();
  }
  function refreshLocalizedClass(element, baseCssClass) {
    if (!element) {
      return;
    }
    for (var _i = 0, _arr = ['uk', 'en']; _i < _arr.length; _i++) {
      var lang = _arr[_i];
      element.classList.remove(baseCssClass + lang);
    }
    element.classList.add(baseCssClass + locale);
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
    getData().then(function (res) {
      users = res[0].sort(function (a, b) {
        return b.points - a.points;
      });
      // users = users.slice(0, 10)
      renderUsers(users);
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
    var prizeKey = getPrizeTranslationKey(place);
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
  loadTranslations().then(init);
  document.querySelector(".dark-btn").addEventListener("click", function () {
    console.log('dasdas');
    document.body.classList.toggle("dark");
  });
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwicmVzdWx0c1RhYmxlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidW5hdXRoTXNncyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwYXJ0aWNpcGF0ZUJ0bnMiLCJ5b3VBcmVJbkJ0bnMiLCJwcmVkaWN0aW9uQnRucyIsIm11bHRpcGxpZXJTcGFucyIsInJlc3VsdHNUYWJsZUhlYWQiLCJ0b3BSZXN1bHRzVGFibGUiLCJyZXN1bHRzVGFibGVPdGhlciIsInRhYmxlTmF2IiwicHJlZGljdENvbHVtbnMiLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsIm1vdmVMZWZ0UmVzdWx0IiwibW92ZVJpZ2h0UmVzdWx0IiwidGFic1Jlc3VsdCIsInRhYnNDb250YWluZXIiLCJ0b3VybmFtZW50U3RhZ2UiLCJjb2x1bW5JbmRleCIsInVzZXJJbmZvIiwidHJhbnNsYXRlU3RhdGUiLCJsb2NhbGUiLCJ1c2VycyIsImkxOG5EYXRhIiwidXNlcklkIiwiUFJJWkVTX0NTUyIsInByZWRpY3REYXRhIiwiSlNPTiIsInBhcnNlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImNvbnNvbGUiLCJsb2ciLCJjaGVja1VzZXJBdXRoIiwidW5hdXRoTWVzIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVxdWVzdCIsInRoZW4iLCJyZXMiLCJ1c2VyaWQiLCJmb3JFYWNoIiwiaXRlbSIsInJlbW92ZSIsInJlZnJlc2hVc2VySW5mbyIsInBhcnRpY2lwYXRlQnRuIiwidXNlciIsInNwYW4iLCJpbmRleCIsImlubmVySFRNTCIsIm11bHRpcGxpZXIiLCJsb2FkVHJhbnNsYXRpb25zIiwiZmV0Y2giLCJqc29uIiwidHJhbnNsYXRlIiwibXV0YXRpb25PYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnMiLCJvYnNlcnZlIiwiZ2V0RWxlbWVudEJ5SWQiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwiZWxlbXMiLCJlbGVtIiwia2V5IiwiZ2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwicmVmcmVzaExvY2FsaXplZENsYXNzIiwiZWxlbWVudCIsImJhc2VDc3NDbGFzcyIsImxhbmciLCJsaW5rIiwiZXh0cmFPcHRpb25zIiwiaGVhZGVycyIsImdldERhdGEiLCJQcm9taXNlIiwiYWxsIiwiSW5pdFBhZ2UiLCJzb3J0IiwiYSIsImIiLCJwb2ludHMiLCJyZW5kZXJVc2VycyIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJ1cGRhdGVBY3RpdmVTdGFnZSIsImNvbHVtbiIsImkiLCJzZXRQcmVkaWN0Q29sdW1uIiwiY29udGFpbnMiLCJ0ZWFtcyIsImRhdGUiLCJ0aW1lIiwidGVhbSIsInRleHRDb250ZW50IiwiaW5pdCIsInN0b3JlIiwic3RhdGUiLCJnZXRTdGF0ZSIsImF1dGgiLCJpc0F1dGhvcml6ZWQiLCJpZCIsImMiLCJzZXRJbnRlcnZhbCIsImdfdXNlcl9pZCIsImNsZWFySW50ZXJ2YWwiLCJhdXRoQnRuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInBhcnRpY2lwYXRlIiwicGFyYW1zIiwibWV0aG9kIiwiYm9keSIsInN0cmluZ2lmeSIsInBvcHVsYXRlVXNlcnNUYWJsZSIsImN1cnJlbnRVc2VySWQiLCJsZW5ndGgiLCJ0b3BVc2VycyIsInNsaWNlIiwiZGlzcGxheVVzZXIiLCJjdXJyZW50VXNlciIsImZpbmQiLCJjdXJyZW50VXNlckluZGV4IiwiaW5kZXhPZiIsIm90aGVyVXNlcnMiLCJNYXRoIiwibWF4IiwiaXNDdXJyZW50VXNlciIsInRhYmxlIiwiYWxsVXNlcnMiLCJhZGRpdGlvbmFsVXNlclJvdyIsImNyZWF0ZUVsZW1lbnQiLCJwbGFjZSIsInByaXplUGxhY2VDc3MiLCJwcml6ZUtleSIsImdldFByaXplVHJhbnNsYXRpb25LZXkiLCJtYXNrVXNlcklkIiwidG90YWxQb2ludHMiLCJ0cmFuc2xhdGVLZXkiLCJ5b3VCbG9jayIsInNldEF0dHJpYnV0ZSIsImFwcGVuZCIsInRvU3RyaW5nIiwicG9wdXBCdG5zIiwicG9wdXBzIiwicG9wdXAiLCJjbG9zZSIsIm9wZW4iLCJwYXJlbnROb2RlIiwic2V0UG9wdXAiLCJ0YXJnZXQiLCJ0YWIiLCJhcHBlbmRDaGlsZCIsInRhYmxlTmF2VGFiIiwibmF2IiwidGFibGVUYWIiLCJhY3RpdmF0ZVNlbGVjdGVkVGVhbXMiLCJzdG9yZWRQcmVkaWN0RGF0YSIsImRhdGEiLCJzdGFnZSIsImNvbHVtbnMiLCJnZXRTdGFnZUNsYXNzIiwidGVhbUJsb2NrcyIsImJsb2NrIiwidGVhbVJhZGlvcyIsInRlYW1FbGVtZW50IiwidHJpbSIsInVwZGF0ZUxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJnZXRUZWFtTmFtZSIsInRlYW1CbG9jayIsInJhZGlvIiwic2VsZWN0ZWRUZWFtIiwiZmlsdGVyIiwiQXJyYXkiLCJmcm9tIiwic29tZSIsInB1c2giLCJzdGFnZXMiLCJ0b2dnbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsQ0FBQyxZQUFXO0VBQ1IsSUFBTUEsTUFBTSxHQUFHLDJDQUEyQztFQUMxRDtFQUNBLElBQU1DLFlBQVksR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7SUFDekRDLFVBQVUsR0FBR0YsUUFBUSxDQUFDRyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7SUFDckRDLGVBQWUsR0FBR0osUUFBUSxDQUFDRyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7SUFDeERFLFlBQVksR0FBR0wsUUFBUSxDQUFDRyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7SUFDdERHLGNBQWMsR0FBR04sUUFBUSxDQUFDRyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7SUFDekRJLGVBQWUsR0FBR1AsUUFBUSxDQUFDRyxnQkFBZ0IsQ0FBQywwQkFBMEIsQ0FBQztJQUN2RUssZ0JBQWdCLEdBQUdULFlBQVksQ0FBQ0UsYUFBYSxDQUFDLHFCQUFxQixDQUFDO0lBQ3BFUSxlQUFlLEdBQUdULFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFlBQVksQ0FBQztJQUN0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dCBhcGlVUkwgPSAnaHR0cHM6Ly9mYXYtcHJvbS5jb20vYXBpX2xlZ2VuZGFyeV90cm9waHknO1xuICAgIC8vIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL2Zhdi1wcm9tLmNvbS9hcGlfc2hhbmdoYWknO1xuICAgIGNvbnN0IHJlc3VsdHNUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN1bHRzLXRhYmxlJyksXG4gICAgICAgIHVuYXV0aE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5hdXRoLW1zZycpLFxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWpvaW4nKSxcbiAgICAgICAgeW91QXJlSW5CdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvb2stcGFydCcpLFxuICAgICAgICBwcmVkaWN0aW9uQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb25maXJtQnRuJyksXG4gICAgICAgIG11bHRpcGxpZXJTcGFucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X19tdWx0aXBsaWVyLW51bScpLFxuICAgICAgICByZXN1bHRzVGFibGVIZWFkID0gcmVzdWx0c1RhYmxlLnF1ZXJ5U2VsZWN0b3IoJy50YWJsZVJlc3VsdHNfX2hlYWQnKSxcbiAgICAgICAgdG9wUmVzdWx0c1RhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvcC11c2VycycpLFxuICAgICAgICByZXN1bHRzVGFibGVPdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN1bHRzLXRhYmxlLW90aGVyJyksXG4gICAgICAgIHRhYmxlTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yZXN1bHRzX19uYXYtaXRlbVwiKSxcbiAgICAgICAgcHJlZGljdENvbHVtbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19jb2x1bW5cIiksXG4gICAgICAgIG1vdmVMZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZV9fbW92ZS1sZWZ0XCIpLFxuICAgICAgICBtb3ZlUmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlX19tb3ZlLXJpZ2h0XCIpLFxuICAgICAgICBtb3ZlTGVmdFJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzdWx0c19fbW92ZS1sZWZ0XCIpLFxuICAgICAgICBtb3ZlUmlnaHRSZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3VsdHNfX21vdmUtcmlnaHRcIiksXG4gICAgICAgIHRhYnNSZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJlc3VsdHNfX3RhYi1pdGVtXCIpLFxuICAgICAgICB0YWJzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdHNfX3RhYicpO1xuXG5cbiAgICBsZXQgdG91cm5hbWVudFN0YWdlID0gMlxuXG4gICAgbGV0IGNvbHVtbkluZGV4ID0gdG91cm5hbWVudFN0YWdlIC0gMVxuXG4gICAgbGV0IHVzZXJJbmZvID0ge307XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhdGUgPSB0cnVlXG5cbiAgICBsZXQgbG9jYWxlID0gJ2VuJztcbiAgICBsZXQgdXNlcnM7XG4gICAgbGV0IGkxOG5EYXRhID0ge307XG4gICAgbGV0IHVzZXJJZDtcbiAgICB1c2VySWQgPSAxMDAzMDAyNjg7XG5cbiAgICBjb25zdCBQUklaRVNfQ1NTID0gWydwbGFjZTEnLCAncGxhY2UyJywgJ3BsYWNlMyddO1xuXG4gICAgbGV0IHByZWRpY3REYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByZWRpY3REYXRhXCIpKSB8fCBbXTtcbiAgICBjb25zb2xlLmxvZyhwcmVkaWN0RGF0YSlcblxuICAgIGxldCBjaGVja1VzZXJBdXRoID0gKCkgPT4ge1xuICAgICAgICBpZiAodXNlcklkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VySWQpXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3QoYC9mYXZ1c2VyLyR7dXNlcklkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy51c2VyaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeW91QXJlSW5CdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVkaWN0aW9uQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFVzZXJJbmZvKHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwYXJ0aWNpcGF0ZUJ0biBvZiBwYXJ0aWNpcGF0ZUJ0bnMpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codW5hdXRoTWVzKVxuICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoVXNlckluZm8odXNlcikge1xuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB1c2VySW5mbyA9IHVzZXI7XG4gICAgICAgIGNvbnNvbGUubG9nKHVzZXJJbmZvKVxuXG4gICAgICAgIC8vINCe0L3QvtCy0LvRjtGU0LzQviDQstGB0ZYgbXVsdGlwbGllclNwYW5zXG4gICAgICAgIG11bHRpcGxpZXJTcGFucy5mb3JFYWNoKChzcGFuLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSB1c2VySW5mby5tdWx0aXBsaWVyIHx8IDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGxldCBvcGVuaW5nQmV0ID0ge1xuICAgICAgICAvLyAgICAgYmlnV2lubmVyOiB7dGVhbTogJ0FQRUtTJywgb3V0Y29tZTogZmFsc2V9LFxuICAgICAgICAvLyAgICAgYmlnTG9zZXI6IHt0ZWFtOiAnQ0xPVUQ5Jywgb3V0Y29tZTogdHJ1ZX0sXG4gICAgICAgIC8vICAgICB0ZWFtc0JldDogW3t0ZWFtOiAnRU5DRSd9LCB7dGVhbTogJ0hFUk9JQyd9LCB7dGVhbTogJ1NBVycsIG91dGNvbWU6IHRydWV9LCB7dGVhbTogJ0ZVUklBJ30sIHt0ZWFtOiAnS09JJywgb3V0Y29tZTogZmFsc2V9LCB7dGVhbTogJ0FNS0FMJ30sIHt0ZWFtOiAnTEVHQUNZJ31dXG4gICAgICAgIC8vIH07XG4gICAgICAgIC8vIHJlZnJlc2hCZXRzKHVzZXIub3BlbmluZ0JldCwgcHJvbW9TdGFnZXNbMF0pO1xuICAgICAgICAvLyByZWZyZXNoQmV0cyh1c2VyLmVsaW1pbmF0aW9uQmV0LCBwcm9tb1N0YWdlc1sxXSk7XG4gICAgICAgIC8vIHJlZnJlc2hCZXRzKHVzZXIud2lubmVyQmV0LCBwcm9tb1N0YWdlc1syXSk7XG5cbiAgICAgICAgLy8gaWYgKGFjdGl2ZVBoYXNlICYmIGlzVmFsaWRCZXQodXNlckluZm9bYWN0aXZlUGhhc2UuYmV0RmllbGROYW1lXSkpIHtcbiAgICAgICAgLy8gICAgIHByZWRpY3Rpb25CdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2Jsb2NrQnRuJykpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZFRyYW5zbGF0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2FwaVVSTH0vbmV3LXRyYW5zbGF0ZXMvJHtsb2NhbGV9YCkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKGpzb24gPT4ge1xuICAgICAgICAgICAgICAgIGkxOG5EYXRhID0ganNvbjtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICB2YXIgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWdlbmRhcnktdHJvcGh5JyksIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKCkge1xuICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKVxuICAgICAgICBpZih0cmFuc2xhdGVTdGF0ZSl7XG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHJhbnNsYXRpb24gd29yayFcIilcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoTG9jYWxpemVkQ2xhc3MoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoTG9jYWxpemVkQ2xhc3MoZWxlbWVudCwgYmFzZUNzc0NsYXNzKSB7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBbJ3VrJywgJ2VuJ10pIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShiYXNlQ3NzQ2xhc3MgKyBsYW5nKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYmFzZUNzc0NsYXNzICsgbG9jYWxlKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gZnVuY3Rpb24gKGxpbmssIGV4dHJhT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gZmV0Y2goYXBpVVJMICsgbGluaywge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLihleHRyYU9wdGlvbnMgfHwge30pXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgcmVxdWVzdCgnL3VzZXJzP25vY2FjaGU9MScpLFxuICAgICAgICBdKVxuICAgIH1cblxuICAgIGNvbnN0IEluaXRQYWdlID0gKCkgPT4ge1xuICAgICAgICBnZXREYXRhKCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgdXNlcnMgPSByZXNbMF0uc29ydCgoYSwgYikgPT4gYi5wb2ludHMgLSBhLnBvaW50cyk7XG4gICAgICAgICAgICAvLyB1c2VycyA9IHVzZXJzLnNsaWNlKDAsIDEwKVxuICAgICAgICAgICAgcmVuZGVyVXNlcnModXNlcnMpO1xuICAgICAgICAgICAgLy8gdHJhbnNsYXRlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIGlmKHdpbmRvdy5pbm5lcldpZHRoIDw9IDUwMCl7XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVTdGFnZShwcmVkaWN0Q29sdW1ucyk7XG4gICAgICAgIH1cbiAgICAgICAgcHJlZGljdENvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBpKSA9PntcbiAgICAgICAgICAgIGlmKGkgKyAxID4gdG91cm5hbWVudFN0YWdlKXtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmFkZChcIl9sb2NrXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihpICsgMSA8IHRvdXJuYW1lbnRTdGFnZSl7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNsYXNzTGlzdC5hZGQoXCJfZG9uZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0UHJlZGljdENvbHVtbihjb2x1bW4pXG4gICAgICAgICAgICBpZihjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiX2xvY2tcIikpe1xuICAgICAgICAgICAgICAgIGNvbnN0IHRlYW1zID0gY29sdW1uLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9fdGVhbS1uYW1lJylcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gY29sdW1uLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9fY2hvc2UtZGF0ZScpXG4gICAgICAgICAgICAgICAgY29uc3QgdGltZSA9IGNvbHVtbi5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfX2Nob3NlLXRpbWUnKVxuICAgICAgICAgICAgICAgIHRlYW1zLmZvckVhY2godGVhbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRlYW0udGV4dENvbnRlbnQgPSBcIuKAlFwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBkYXRlLmZvckVhY2goZGF0ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGUudGV4dENvbnRlbnQgPSBcIuKAlFwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aW1lLmZvckVhY2godGltZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWUudGV4dENvbnRlbnQgPSBcIuKAlFwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cblxuXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5zdG9yZSkge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gd2luZG93LnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICAgICAgICB1c2VySWQgPSBzdGF0ZS5hdXRoLmlzQXV0aG9yaXplZCAmJiBzdGF0ZS5hdXRoLmlkIHx8ICcnO1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgICAgICBsZXQgYyA9IDA7XG4gICAgICAgICAgICB2YXIgaSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXdpbmRvdy5nX3VzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCA9IHdpbmRvdy5nX3VzZXJfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tVc2VyQXV0aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMjAwKTtcblxuICAgICAgICB9XG4gICAgICAgIGNoZWNrVXNlckF1dGgoKTtcblxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaCgoYXV0aEJ0biwgaSkgPT4ge1xuICAgICAgICAgICAgYXV0aEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFydGljaXBhdGUoKSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7dXNlcmlkOiB1c2VySWR9O1xuXG4gICAgICAgIHJlcXVlc3QoJy91c2VyJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJhbXMpXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICAgICAgeW91QXJlSW5CdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICBwcmVkaWN0aW9uQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgcGFydGljaXBhdGUgPSB0cnVlO1xuICAgICAgICAgICAgY2hlY2tVc2VyQXV0aCgpO1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyVXNlcnModXNlcnMpIHtcbiAgICAgICAgcG9wdWxhdGVVc2Vyc1RhYmxlKHVzZXJzLCB1c2VySWQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBvcHVsYXRlVXNlcnNUYWJsZSh1c2VycywgY3VycmVudFVzZXJJZCkge1xuICAgICAgICByZXN1bHRzVGFibGUuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIGlmICghdXNlcnMgfHwgIXVzZXJzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCB0b3BVc2VycyA9IHVzZXJzLnNsaWNlKDAsIDIwKTtcbiAgICAgICAgdG9wVXNlcnMuZm9yRWFjaCh1c2VyID0+IGRpc3BsYXlVc2VyKHVzZXIsIHVzZXIudXNlcmlkID09PSBjdXJyZW50VXNlcklkLCByZXN1bHRzVGFibGUsIHVzZXJzKSk7XG5cbiAgICAgICAgY29uc3QgY3VycmVudFVzZXIgPSB1c2Vycy5maW5kKHVzZXIgPT4gdXNlci51c2VyaWQgPT09IGN1cnJlbnRVc2VySWQpO1xuICAgICAgICBjb25zdCBjdXJyZW50VXNlckluZGV4ID0gY3VycmVudFVzZXIgPyB1c2Vycy5pbmRleE9mKGN1cnJlbnRVc2VyKSA6IC0xO1xuXG4gICAgICAgIGlmIChjdXJyZW50VXNlckluZGV4ID49IDEwKSB7XG4gICAgICAgICAgICBsZXQgb3RoZXJVc2VycyA9IHVzZXJzLnNsaWNlKE1hdGgubWF4KDEwLCBjdXJyZW50VXNlckluZGV4IC0gMSksIGN1cnJlbnRVc2VySW5kZXggKyAyKTtcbiAgICAgICAgICAgIG90aGVyVXNlcnMuZm9yRWFjaCh1c2VyID0+IGRpc3BsYXlVc2VyKHVzZXIsIHVzZXIudXNlcmlkID09PSBjdXJyZW50VXNlcklkLCByZXN1bHRzVGFibGVPdGhlciwgdXNlcnMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc3BsYXlVc2VyKHVzZXIsIGlzQ3VycmVudFVzZXIsIHRhYmxlLCBhbGxVc2Vycykge1xuICAgICAgICBjb25zdCBhZGRpdGlvbmFsVXNlclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKCd0YWJsZVJlc3VsdHNfX3JvdycpO1xuXG5cblxuICAgICAgICBjb25zdCBwbGFjZSA9IGFsbFVzZXJzLmluZGV4T2YodXNlcikgKyAxO1xuICAgICAgICBjb25zdCBwcml6ZVBsYWNlQ3NzID0gUFJJWkVTX0NTU1twbGFjZSAtIDFdO1xuICAgICAgICBpZiAocHJpemVQbGFjZUNzcykge1xuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZChwcml6ZVBsYWNlQ3NzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByaXplS2V5ID0gZ2V0UHJpemVUcmFuc2xhdGlvbktleShwbGFjZSk7XG4gICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke3BsYWNlfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19yb3ctaXRlbVwiPiR7aXNDdXJyZW50VXNlciA/IHVzZXIudXNlcmlkIDogbWFza1VzZXJJZCh1c2VyLnVzZXJpZCl9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHt1c2VyLnBvaW50c308L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke3VzZXIubXVsdGlwbGllcn08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke3VzZXIudG90YWxQb2ludHN9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHtwcml6ZUtleSA/IHRyYW5zbGF0ZUtleShwcml6ZUtleSkgOiAnIC0gJ308L2Rpdj5cbiAgICBgO1xuICAgICAgICBpZiAoaXNDdXJyZW50VXNlcikge1xuICAgICAgICAgICAgY29uc3QgeW91QmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHlvdUJsb2NrLnNldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnLCAneW91Jyk7XG4gICAgICAgICAgICB5b3VCbG9jay50ZXh0Q29udGVudCA9IFwi0KLQuFwiIC8vINC00LvRjyDRgtC10YHRgtGDINC/0L7QutC4INC90LXQvNCwINGC0YDQsNC90YHQu9C10LnRgtGW0LJcbiAgICAgICAgICAgIHlvdUJsb2NrLmNsYXNzTGlzdC5hZGQoJ195b3VyJyk7XG4gICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5hcHBlbmQoeW91QmxvY2spXG4gICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKFwiX3lvdXJcIilcblxuICAgICAgICB9XG4gICAgICAgIHRhYmxlLmFwcGVuZChhZGRpdGlvbmFsVXNlclJvdyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1hc2tVc2VySWQodXNlcklkKSB7XG4gICAgICAgIHJldHVybiBcIioqXCIgKyB1c2VySWQudG9TdHJpbmcoKS5zbGljZSgyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVLZXkoa2V5KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByaXplVHJhbnNsYXRpb25LZXkocGxhY2UpIHtcbiAgICAgICAgaWYgKHBsYWNlIDw9IDUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfJHtwbGFjZX1gXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNi0xMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAyMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8xMS0yMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAzNSkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8yMS0zNWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSA1MCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8zNi01MGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSA3NSkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV81MS03NWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNzYtMTAwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEyNSkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8xMDEtMTI1YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDE1MCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8xMjYtMTUwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDE3NSkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8xNTEtMTc1YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDIwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8xNzYtMjAwYFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcG9wdXBCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbmZvX19pdGVtLWJ0blwiKVxuICAgIGNvbnN0IHBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5mb19faXRlbS1wb3B1cFwiKVxuXG5cbiAgICBwb3B1cHMuZm9yRWFjaCgocG9wdXAsIGkpID0+e1xuICAgICAgICBpZihpID09PSAwKXtcbiAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJfbGVmdFwiKVxuICAgICAgICB9XG4gICAgICAgIGlmKGkgPT09IHBvcHVwcy5sZW5ndGggLSAxKXtcbiAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJfcmlnaHRcIilcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjbG9zZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb19faXRlbS1wb3B1cC1jbG9zZVwiKVxuICAgICAgICBjb25zdCBvcGVuID0gcG9wdXAucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX2l0ZW0tYnRuXCIpXG4gICAgICAgIHNldFBvcHVwKG9wZW4sIGNsb3NlLCBwb3B1cClcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gc2V0UG9wdXAob3BlbiwgY2xvc2UsIHBvcHVwKXtcbiAgICAgICAgb3Blbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwib3BhY2l0eVwiKVxuICAgICAgICB9KVxuICAgICAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFwib3BhY2l0eVwiKVxuICAgICAgICB9KVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgICAgaWYoIXBvcHVwLmNvbnRhaW5zKGUudGFyZ2V0KSAmJiBlLnRhcmdldCAhPT0gb3Blbil7XG4gICAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZChcIm9wYWNpdHlcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cblxuICAgIHRhYnNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdXJuYW1lbnRTdGFnZTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0YWIuY2xhc3NMaXN0LmFkZCgncmVzdWx0c19fdGFiLWl0ZW0nKTtcbiAgICAgICAgdGFic0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YWIpO1xuICAgIH1cblxuICAgIGNvbnN0IHRhYmxlTmF2VGFiID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yZXN1bHRzX190YWItaXRlbVwiKTtcblxuICAgIHRhYmxlTmF2LmZvckVhY2goKGl0ZW0sIGkpID0+e1xuICAgICAgICBpZihpICsgMSA+IHRvdXJuYW1lbnRTdGFnZSl7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfbG9ja1wiKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coaSArIDEsIHRvdXJuYW1lbnRTdGFnZSlcblxuICAgICAgICBpZihpICsgMSA9PT0gdG91cm5hbWVudFN0YWdlKXtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgIGlmKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIl9sb2NrXCIpKXtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhYmxlTmF2LmZvckVhY2gobmF2ID0+e1xuICAgICAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgIH0pXG4gICAgfSlcbiAgICB0YWJsZU5hdlRhYi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgaWYoaSArIDEgPT09IHRvdXJuYW1lbnRTdGFnZSl7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgdGFibGVUYWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfX3RhYi1pdGVtJylcblxuICAgIHRhYmxlVGFiLmZvckVhY2goKGl0ZW0sIGkpID0+e1xuICAgICAgICBpZihpICsgMSA9PT0gdG91cm5hbWVudFN0YWdlKXtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgfVxuICAgIH0pXG5cblxuICAgIGZ1bmN0aW9uIGFjdGl2YXRlU2VsZWN0ZWRUZWFtcyhzdG9yZWRQcmVkaWN0RGF0YSkge1xuXG4gICAgICAgIC8vINCf0YDQvtGF0L7QtNC40LzQvtGB0Y8g0L/QviDQstGB0ZbRhSDQtdC70LXQvNC10L3RgtCw0YUgcHJlZGljdERhdGFcbiAgICAgICAgc3RvcmVkUHJlZGljdERhdGEuZm9yRWFjaChkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhZ2UsIHRlYW0gfSA9IGRhdGE7XG5cbiAgICAgICAgICAgIC8vINCX0L3QsNGF0L7QtNC40LzQviDQstGB0ZYg0LrQvtC70L7QvdC60LgsINGP0LrRliDQstGW0LTQv9C+0LLRltC00LDRjtGC0Ywg0LTQsNC90L7QvNGDINC10YLQsNC/0YMgKHN0YWdlKVxuICAgICAgICAgICAgY29uc3QgY29sdW1ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2dldFN0YWdlQ2xhc3Moc3RhZ2UpfWApO1xuXG4gICAgICAgICAgICBjb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcbiAgICAgICAgICAgICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0LLRgdGWINCx0LvQvtC60Lgg0Lcg0LrQvtC80LDQvdC00LDQvNC4INCyINGG0ZbQuSDQutC+0LvQvtC90YbRllxuICAgICAgICAgICAgICAgIGNvbnN0IHRlYW1CbG9ja3MgPSBjb2x1bW4ucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9fY2hvc2VcIik7XG5cbiAgICAgICAgICAgICAgICB0ZWFtQmxvY2tzLmZvckVhY2goYmxvY2sgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0LLRgdGWINGA0LDQtNGW0L7QutC90L7Qv9C60Lgg0YLQsCDQvdCw0LfQstC4INC60L7QvNCw0L3QtCDQsiDRhtGM0L7QvNGDINCx0LvQvtC60YNcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVhbVJhZGlvcyA9IGJsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX3RlYW0tcmFkaW9cIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRlYW1zID0gYmxvY2sucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9fdGVhbS1uYW1lXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vINCf0YDQvtGF0L7QtNC40LzQvtGB0Y8g0L/QviDQstGB0ZbRhSDQutC+0LzQsNC90LTQsNGFINCyINCx0LvQvtC60YNcbiAgICAgICAgICAgICAgICAgICAgdGVhbXMuZm9yRWFjaCgodGVhbUVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQr9C60YnQviDQvdCw0LfQstCwINC60L7QvNCw0L3QtNC4INGB0L/RltCy0L/QsNC00LDRlCDQtyDQstC40LHRgNCw0L3QvtGOINC60L7QvNCw0L3QtNC+0Y4g0LcgcHJlZGljdERhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZWFtRWxlbWVudC50ZXh0Q29udGVudC50cmltKCkgPT09IHRlYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQkNC60YLQuNCy0YPRlNC80L4g0LLRltC00L/QvtCy0ZbQtNC90YMg0YDQsNC00ZbQvtC60L3QvtC/0LrRg1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlYW1SYWRpb3NbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbi8vINCU0L7Qv9C+0LzRltC20L3QsCDRhNGD0L3QutGG0ZbRjyDQtNC70Y8g0L7RgtGA0LjQvNCw0L3QvdGPINC60LvQsNGB0YMg0LXRgtCw0L/RgyDQvdCwINC+0YHQvdC+0LLRliDQudC+0LPQviDQvdCw0LfQstC4XG4gICAgZnVuY3Rpb24gZ2V0U3RhZ2VDbGFzcyhzdGFnZSkge1xuICAgICAgICBzd2l0Y2ggKHN0YWdlKSB7XG4gICAgICAgICAgICBjYXNlIFwiT3BlbmluZyBTdGFnZVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YWdlMS04XCI7XG4gICAgICAgICAgICBjYXNlIFwiUXVhcnRlcmZpbmFsc1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YWdlMS00XCI7XG4gICAgICAgICAgICBjYXNlIFwiU2VtaWZpbmFsc1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YWdlMS0yXCI7XG4gICAgICAgICAgICBjYXNlIFwiRmluYWxcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFnZS1maW5hbFwiO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IGFjdGl2YXRlU2VsZWN0ZWRUZWFtcyhwcmVkaWN0RGF0YSkpO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlTG9jYWxTdG9yYWdlKCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByZWRpY3REYXRhXCIsIEpTT04uc3RyaW5naWZ5KHByZWRpY3REYXRhKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VGVhbU5hbWUodGVhbUJsb2NrLCBzdGFnZSwgY29sdW1uKSB7XG4gICAgICAgIGlmKGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJfZG9uZVwiKSB8fCBjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiX2FjdGl2ZVwiKSl7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0ZWFtUmFkaW9zID0gdGVhbUJsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX3RlYW0tcmFkaW9cIik7XG4gICAgICAgIGNvbnN0IHRlYW1zID0gdGVhbUJsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX3RlYW0tbmFtZVwiKTtcblxuICAgICAgICB0ZWFtUmFkaW9zLmZvckVhY2goKHJhZGlvLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGVhbVJhZGlvcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKSlcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVGVhbSA9IHRlYW1zW2luZGV4XS50ZXh0Q29udGVudC50cmltKCk7XG5cbiAgICAgICAgICAgICAgICAvLyDQktC40LTQsNC70Y/RlNC80L4g0L/QvtC/0LXRgNC10LTQvdGOINC60L7QvNCw0L3QtNGDINC3INGG0YzQvtCz0L4g0LHQu9C+0LrRg1xuICAgICAgICAgICAgICAgIHByZWRpY3REYXRhID0gcHJlZGljdERhdGEuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5zdGFnZSAhPT0gc3RhZ2UpIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhQXJyYXkuZnJvbSh0ZWFtcykuc29tZSh0ZWFtID0+IHRlYW0udGV4dENvbnRlbnQudHJpbSgpID09PSBpdGVtLnRlYW0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8g0JTQvtC00LDRlNC80L4g0L3QvtCy0YMg0LrQvtC80LDQvdC00YNcbiAgICAgICAgICAgICAgICBwcmVkaWN0RGF0YS5wdXNoKHsgc3RhZ2U6IHN0YWdlLCB0ZWFtOiBzZWxlY3RlZFRlYW0gfSk7XG5cbiAgICAgICAgICAgICAgICAvLyDQntC90L7QstC70Y7RlNC80L4gbG9jYWxTdG9yYWdlXG4gICAgICAgICAgICAgICAgdXBkYXRlTG9jYWxTdG9yYWdlKCk7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcmVkaWN0RGF0YSk7IC8vINCf0LXRgNC10LLRltGA0Y/RlNC80L4sINGH0Lgg0L/RgNCw0LLQuNC70YzQvdC+INC/0YDQsNGG0Y7RlFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gc2V0UHJlZGljdENvbHVtbihjb2x1bW4pIHtcbiAgICAgICAgY29uc29sZS5sb2coY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcIl9sb2NrXCIpIClcbiAgICAgICAgbGV0IHN0YWdlID0gXCJcIlxuXG4gICAgICAgIGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJzdGFnZTEtOFwiKSA/IHN0YWdlID0gXCJPcGVuaW5nIFN0YWdlXCIgOiBudWxsO1xuICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwic3RhZ2UxLTRcIikgPyBzdGFnZSA9IFwiUXVhcnRlcmZpbmFsc1wiIDogbnVsbDtcbiAgICAgICAgY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcInN0YWdlMS0yXCIpID8gc3RhZ2UgPSBcIlNlbWlmaW5hbHNcIiA6IG51bGw7XG4gICAgICAgIGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJzdGFnZS1maW5hbFwiKSA/IHN0YWdlID0gXCJGaW5hbFwiIDogbnVsbDtcblxuICAgICAgICBjb25zdCB0ZWFtQmxvY2tzID0gY29sdW1uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2Nob3NlXCIpO1xuXG4gICAgICAgIHRlYW1CbG9ja3MuZm9yRWFjaChibG9jayA9PiBnZXRUZWFtTmFtZShibG9jaywgc3RhZ2UsIGNvbHVtbikpO1xuXG5cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUFjdGl2ZVN0YWdlKHN0YWdlcykge1xuICAgICAgICBzdGFnZXMuZm9yRWFjaCgoc3RhZ2UsIGluZGV4KSA9PiB7XG5cbiAgICAgICAgICAgIHN0YWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICBpZihpbmRleCA9PT0gY29sdW1uSW5kZXgpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2FkYXNcIilcbiAgICAgICAgICAgICAgICBzdGFnZS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtb3ZlTGVmdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoY29sdW1uSW5kZXggPj0gMCkge1xuICAgICAgICAgICAgY29sdW1uSW5kZXgtLTtcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZVN0YWdlKHByZWRpY3RDb2x1bW5zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sdW1uSW5kZXggPCAwKSB7XG4gICAgICAgICAgICBjb2x1bW5JbmRleCA9IHByZWRpY3RDb2x1bW5zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVTdGFnZShwcmVkaWN0Q29sdW1ucyk7XG4gICAgICAgICAgICB0YWJsZVRhYi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgaWYoaSArIDEgPT09IGNvbHVtbkluZGV4KXtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgdGFibGVUYWIuZm9yRWFjaCgoaXRlbSwgaSkgPT57XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICBpZihpID09PSBjb2x1bW5JbmRleCl7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pO1xuXG4gICAgbW92ZVJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChjb2x1bW5JbmRleCA8IHByZWRpY3RDb2x1bW5zLmxlbmd0aCAtIDEgfHwgY29sdW1uSW5kZXggPj0gMCkge1xuICAgICAgICAgICAgY29sdW1uSW5kZXgrKztcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZVN0YWdlKHByZWRpY3RDb2x1bW5zKTtcbiAgICAgICAgfVxuICAgICAgICBpZihjb2x1bW5JbmRleCA9PT0gcHJlZGljdENvbHVtbnMubGVuZ3RoKXtcbiAgICAgICAgICAgIGNvbHVtbkluZGV4ID0gMFxuICAgICAgICAgICAgdXBkYXRlQWN0aXZlU3RhZ2UocHJlZGljdENvbHVtbnMpO1xuICAgICAgICB9XG4gICAgICAgIHRhYmxlVGFiLmZvckVhY2goKGl0ZW0sIGkpID0+e1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgaWYoaSA9PT0gY29sdW1uSW5kZXgpe1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTtcblxuICAgIG1vdmVMZWZ0UmVzdWx0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChjb2x1bW5JbmRleCA+IDApIHtcbiAgICAgICAgICAgIGNvbHVtbkluZGV4LS07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2x1bW5JbmRleCA9IHRhYnNSZXN1bHQubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1cGRhdGVBY3RpdmVTdGFnZSh0YWJzUmVzdWx0KTtcbiAgICAgICAgdGFibGVOYXYuZm9yRWFjaCgoaXRlbSwgaSkgPT57XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICBpZihjb2x1bW5JbmRleCA8IDEpe1xuICAgICAgICAgICAgICAgIGNvbHVtbkluZGV4ID0gdG91cm5hbWVudFN0YWdlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGkgKyAxID09PSBjb2x1bW5JbmRleCl7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgICAgIHRhYmxlTmF2VGFiLmZvckVhY2goKGl0ZW0sIGkpID0+e1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgaWYoaSArIDEgPT09IGNvbHVtbkluZGV4KXtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICBtb3ZlUmlnaHRSZXN1bHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgaWYgKGNvbHVtbkluZGV4IDwgdGFic1Jlc3VsdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBjb2x1bW5JbmRleCsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sdW1uSW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRhYmxlTmF2LmZvckVhY2goKGl0ZW0sIGkpID0+e1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgaWYoY29sdW1uSW5kZXggPiB0b3VybmFtZW50U3RhZ2Upe1xuICAgICAgICAgICAgICAgIGNvbHVtbkluZGV4ID0gMVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihpICsgMSA9PT0gY29sdW1uSW5kZXgpe1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgICAgICB0YWJsZU5hdlRhYi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIGlmKGkgKyAxID09PSBjb2x1bW5JbmRleCl7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pO1xuXG4gICAgbG9hZFRyYW5zbGF0aW9ucygpXG4gICAgICAgIC50aGVuKGluaXQpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXJrLWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgIGNvbnNvbGUubG9nKCdkYXNkYXMnKVxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJkYXJrXCIpXG4gICAgfSlcblxuXG59KSgpXG5cbiJdfQ==

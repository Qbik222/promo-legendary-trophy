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
  var translateState = false;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwicmVzdWx0c1RhYmxlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidW5hdXRoTXNncyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwYXJ0aWNpcGF0ZUJ0bnMiLCJ5b3VBcmVJbkJ0bnMiLCJwcmVkaWN0aW9uQnRucyIsIm11bHRpcGxpZXJTcGFucyIsInJlc3VsdHNUYWJsZUhlYWQiLCJ0b3BSZXN1bHRzVGFibGUiLCJyZXN1bHRzVGFibGVPdGhlciIsInRhYmxlTmF2IiwicHJlZGljdENvbHVtbnMiLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsIm1vdmVMZWZ0UmVzdWx0IiwibW92ZVJpZ2h0UmVzdWx0IiwidGFic1Jlc3VsdCIsInRhYnNDb250YWluZXIiLCJ0b3VybmFtZW50U3RhZ2UiLCJjb2x1bW5JbmRleCIsInVzZXJJbmZvIiwidHJhbnNsYXRlU3RhdGUiLCJsb2NhbGUiLCJ1c2VycyIsImkxOG5EYXRhIiwidXNlcklkIiwiUFJJWkVTX0NTUyIsInByZWRpY3REYXRhIiwiSlNPTiIsInBhcnNlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImNvbnNvbGUiLCJsb2ciLCJjaGVja1VzZXJBdXRoIiwidW5hdXRoTWVzIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVxdWVzdCIsInRoZW4iLCJyZXMiLCJ1c2VyaWQiLCJmb3JFYWNoIiwiaXRlbSIsInJlbW92ZSIsInJlZnJlc2hVc2VySW5mbyIsInBhcnRpY2lwYXRlQnRuIiwidXNlciIsInNwYW4iLCJpbmRleCIsImlubmVySFRNTCIsIm11bHRpcGxpZXIiLCJsb2FkVHJhbnNsYXRpb25zIiwiZmV0Y2giLCJqc29uIiwidHJhbnNsYXRlIiwibXV0YXRpb25PYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnMiLCJvYnNlcnZlIiwiZ2V0RWxlbWVudEJ5SWQiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwiZWxlbXMiLCJlbGVtIiwia2V5IiwiZ2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwicmVmcmVzaExvY2FsaXplZENsYXNzIiwiZWxlbWVudCIsImJhc2VDc3NDbGFzcyIsImxhbmciLCJsaW5rIiwiZXh0cmFPcHRpb25zIiwiaGVhZGVycyIsImdldERhdGEiLCJQcm9taXNlIiwiYWxsIiwiSW5pdFBhZ2UiLCJzb3J0IiwiYSIsImIiLCJwb2ludHMiLCJyZW5kZXJVc2VycyIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJ1cGRhdGVBY3RpdmVTdGFnZSIsImNvbHVtbiIsImkiLCJzZXRQcmVkaWN0Q29sdW1uIiwiY29udGFpbnMiLCJ0ZWFtcyIsImRhdGUiLCJ0aW1lIiwidGVhbSIsInRleHRDb250ZW50IiwiaW5pdCIsInN0b3JlIiwic3RhdGUiLCJnZXRTdGF0ZSIsImF1dGgiLCJpc0F1dGhvcml6ZWQiLCJpZCIsImMiLCJzZXRJbnRlcnZhbCIsImdfdXNlcl9pZCIsImNsZWFySW50ZXJ2YWwiLCJhdXRoQnRuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInBhcnRpY2lwYXRlIiwicGFyYW1zIiwibWV0aG9kIiwiYm9keSIsInN0cmluZ2lmeSIsInBvcHVsYXRlVXNlcnNUYWJsZSIsImN1cnJlbnRVc2VySWQiLCJsZW5ndGgiLCJ0b3BVc2VycyIsInNsaWNlIiwiZGlzcGxheVVzZXIiLCJjdXJyZW50VXNlciIsImZpbmQiLCJjdXJyZW50VXNlckluZGV4IiwiaW5kZXhPZiIsIm90aGVyVXNlcnMiLCJNYXRoIiwibWF4IiwiaXNDdXJyZW50VXNlciIsInRhYmxlIiwiYWxsVXNlcnMiLCJhZGRpdGlvbmFsVXNlclJvdyIsImNyZWF0ZUVsZW1lbnQiLCJwbGFjZSIsInByaXplUGxhY2VDc3MiLCJwcml6ZUtleSIsImdldFByaXplVHJhbnNsYXRpb25LZXkiLCJtYXNrVXNlcklkIiwidG90YWxQb2ludHMiLCJ0cmFuc2xhdGVLZXkiLCJ5b3VCbG9jayIsInNldEF0dHJpYnV0ZSIsImFwcGVuZCIsInRvU3RyaW5nIiwicG9wdXBCdG5zIiwicG9wdXBzIiwicG9wdXAiLCJjbG9zZSIsIm9wZW4iLCJwYXJlbnROb2RlIiwic2V0UG9wdXAiLCJ0YXJnZXQiLCJ0YWIiLCJhcHBlbmRDaGlsZCIsInRhYmxlTmF2VGFiIiwibmF2IiwidGFibGVUYWIiLCJhY3RpdmF0ZVNlbGVjdGVkVGVhbXMiLCJzdG9yZWRQcmVkaWN0RGF0YSIsImRhdGEiLCJzdGFnZSIsImNvbHVtbnMiLCJnZXRTdGFnZUNsYXNzIiwidGVhbUJsb2NrcyIsImJsb2NrIiwidGVhbVJhZGlvcyIsInRlYW1FbGVtZW50IiwidHJpbSIsInVwZGF0ZUxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJnZXRUZWFtTmFtZSIsInRlYW1CbG9jayIsInJhZGlvIiwic2VsZWN0ZWRUZWFtIiwiZmlsdGVyIiwiQXJyYXkiLCJmcm9tIiwic29tZSIsInB1c2giLCJzdGFnZXMiLCJ0b2dnbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsQ0FBQyxZQUFXO0VBQ1IsSUFBTUEsTUFBTSxHQUFHLDJDQUEyQztFQUMxRDtFQUNBLElBQU1DLFlBQVksR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7SUFDekRDLFVBQVUsR0FBR0YsUUFBUSxDQUFDRyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7SUFDckRDLGVBQWUsR0FBR0osUUFBUSxDQUFDRyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7SUFDeERFLFlBQVksR0FBR0wsUUFBUSxDQUFDRyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7SUFDdERHLGNBQWMsR0FBR04sUUFBUSxDQUFDRyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7SUFDekRJLGVBQWUsR0FBR1AsUUFBUSxDQUFDRyxnQkFBZ0IsQ0FBQywwQkFBMEIsQ0FBQztJQUN2RUssZ0JBQWdCLEdBQUdULFlBQVksQ0FBQ0UsYUFBYSxDQUFDLHFCQUFxQixDQUFDO0lBQ3BFUSxlQUFlLEdBQUdULFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFlBQVksQ0FBQztJQUN0RFMsaUJBQWlCLEdBQUdWLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLHNCQUFzQixDQUFDO0lBQ2xFVSxRQUFRLEdBQUdYLFFBQVEsQ0FBQ0csZ0JBQWdCLENBQUMsb0JBQW9CLENBQUM7SUFDMURTLGNBQWMsR0FBR1osUUFBUSxDQUFDRyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQztJQUM1RFUsUUFBUSxHQUFHYixRQUFRLENBQUNDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztJQUN0RGEsU0FBUyxHQUFHZCxRQUFRLENBQUNDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztJQUN4RGMsY0FBYyxHQUFHZixRQUFRLENBQUNDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztJQUM5RGUsZUFBZSxHQUFHaEIsUUFBUSxDQUFDQyxhQUFhLENBQUMsc0JBQXNCLENBQUM7SUFDaEVnQixVQUFVLEdBQUdqQixRQUFRLENBQUNHLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDO0lBQzVEZSxhQUFhLEdBQUdsQixRQUFRLENBQUNDLGFBQWEsQ0FBQyxlQUFlLENBQUM7RUFHM0QsSUFBSWtCLGVBQWUsR0FBRyxDQUFDO0VBRXZCLElBQUlDLFdBQVcsR0FBR0QsZUFBZSxHQUFHLENBQUM7RUFFckMsSUFBSUUsUUFBUSxHQUFHLENBQUMsQ0FBQztFQUVqQixJQUFJQyxjQUFjLEdBQUcsS0FBSztFQUUxQixJQUFJQyxNQUFNLEdBQUcsSUFBSTtFQUNqQixJQUFJQyxLQUFLO0VBQ1QsSUFBSUMsUUFBUSxHQUFHLENBQUMsQ0FBQztFQUNqQixJQUFJQyxNQUFNO0VBQ1ZBLE1BQU0sR0FBRyxTQUFTO0VBRWxCLElBQU1DLFVBQVUsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO0VBRWpELElBQUlDLFdBQVcsR0FBR0MsSUFBSSxDQUFDQyxLQUFLLENBQUNDLFlBQVksQ0FBQ0MsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksRUFBRTtFQUN2RUMsT0FBTyxDQUFDQyxHQUFHLENBQUNOLFdBQVcsQ0FBQztFQUV4QixJQUFJTyxhQUFhLEdBQUcsU0FBaEJBLGFBQWEsR0FBUztJQUN0QixJQUFJVCxNQUFNLEVBQUU7TUFDUk8sT0FBTyxDQUFDQyxHQUFHLENBQUNSLE1BQU0sQ0FBQztNQUFBLDJDQUNLeEIsVUFBVTtRQUFBO01BQUE7UUFBbEMsb0RBQW9DO1VBQUEsSUFBekJrQyxTQUFTO1VBQ2hCQSxTQUFTLENBQUNDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNuQztNQUFDO1FBQUE7TUFBQTtRQUFBO01BQUE7TUFDREMsT0FBTyxvQkFBYWIsTUFBTSxFQUFHLENBQ3hCYyxJQUFJLENBQUMsVUFBQUMsR0FBRyxFQUFJO1FBQ1QsSUFBSUEsR0FBRyxDQUFDQyxNQUFNLEVBQUU7VUFDWnRDLGVBQWUsQ0FBQ3VDLE9BQU8sQ0FBQyxVQUFBQyxJQUFJO1lBQUEsT0FBSUEsSUFBSSxDQUFDUCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7VUFBQSxFQUFDO1VBQzNEakMsWUFBWSxDQUFDc0MsT0FBTyxDQUFDLFVBQUFDLElBQUk7WUFBQSxPQUFJQSxJQUFJLENBQUNQLFNBQVMsQ0FBQ1EsTUFBTSxDQUFDLE1BQU0sQ0FBQztVQUFBLEVBQUM7VUFDM0R2QyxjQUFjLENBQUNxQyxPQUFPLENBQUMsVUFBQUMsSUFBSTtZQUFBLE9BQUlBLElBQUksQ0FBQ1AsU0FBUyxDQUFDUSxNQUFNLENBQUMsTUFBTSxDQUFDO1VBQUEsRUFBQztVQUM3REMsZUFBZSxDQUFDTCxHQUFHLENBQUM7UUFDeEIsQ0FBQyxNQUFNO1VBQ0hyQyxlQUFlLENBQUN1QyxPQUFPLENBQUMsVUFBQUMsSUFBSTtZQUFBLE9BQUlBLElBQUksQ0FBQ1AsU0FBUyxDQUFDUSxNQUFNLENBQUMsTUFBTSxDQUFDO1VBQUEsRUFBQztRQUNsRTtNQUNKLENBQUMsQ0FBQztJQUNWLENBQUMsTUFBTTtNQUFBLDRDQUN3QnpDLGVBQWU7UUFBQTtNQUFBO1FBQTFDLHVEQUE0QztVQUFBLElBQW5DMkMsY0FBYztVQUNuQkEsY0FBYyxDQUFDVixTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDeEM7TUFBQztRQUFBO01BQUE7UUFBQTtNQUFBO01BQUEsNENBQ3VCcEMsVUFBVTtRQUFBO01BQUE7UUFBbEMsdURBQW9DO1VBQUEsSUFBekJrQyxVQUFTO1VBQ2hCSCxPQUFPLENBQUNDLEdBQUcsQ0FBQ0UsVUFBUyxDQUFDO1VBQ3RCQSxVQUFTLENBQUNDLFNBQVMsQ0FBQ1EsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN0QztNQUFDO1FBQUE7TUFBQTtRQUFBO01BQUE7SUFDTDtFQUNKLENBQUM7RUFFRCxTQUFTQyxlQUFlLENBQUNFLElBQUksRUFBRTtJQUMzQixJQUFJLENBQUNBLElBQUksRUFBRTtNQUNQO0lBQ0o7SUFDQTNCLFFBQVEsR0FBRzJCLElBQUk7SUFDZmYsT0FBTyxDQUFDQyxHQUFHLENBQUNiLFFBQVEsQ0FBQzs7SUFFckI7SUFDQWQsZUFBZSxDQUFDb0MsT0FBTyxDQUFDLFVBQUNNLElBQUksRUFBRUMsS0FBSyxFQUFLO01BQ3JDRCxJQUFJLENBQUNFLFNBQVMsR0FBRzlCLFFBQVEsQ0FBQytCLFVBQVUsSUFBSSxDQUFDO0lBQzdDLENBQUMsQ0FBQzs7SUFFRjtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUVBO0lBQ0E7SUFDQTtFQUNKOztFQUVBLFNBQVNDLGdCQUFnQixHQUFHO0lBQ3hCLE9BQU9DLEtBQUssV0FBSXhELE1BQU0sNkJBQW1CeUIsTUFBTSxFQUFHLENBQUNpQixJQUFJLENBQUMsVUFBQUMsR0FBRztNQUFBLE9BQUlBLEdBQUcsQ0FBQ2MsSUFBSSxFQUFFO0lBQUEsRUFBQyxDQUNyRWYsSUFBSSxDQUFDLFVBQUFlLElBQUksRUFBSTtNQUNWOUIsUUFBUSxHQUFHOEIsSUFBSTtNQUNmQyxTQUFTLEVBQUU7TUFDWCxJQUFJQyxnQkFBZ0IsR0FBRyxJQUFJQyxnQkFBZ0IsQ0FBQyxVQUFVQyxTQUFTLEVBQUU7UUFDN0RILFNBQVMsRUFBRTtNQUNmLENBQUMsQ0FBQztNQUNGQyxnQkFBZ0IsQ0FBQ0csT0FBTyxDQUFDNUQsUUFBUSxDQUFDNkQsY0FBYyxDQUFDLGtCQUFrQixDQUFDLEVBQUU7UUFDbEVDLFNBQVMsRUFBRSxJQUFJO1FBQ2ZDLE9BQU8sRUFBRTtNQUNiLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztFQUNWO0VBRUEsU0FBU1AsU0FBUyxHQUFHO0lBQ2pCLElBQU1RLEtBQUssR0FBR2hFLFFBQVEsQ0FBQ0csZ0JBQWdCLENBQUMsa0JBQWtCLENBQUM7SUFDM0QsSUFBR21CLGNBQWMsRUFBQztNQUNkMEMsS0FBSyxDQUFDckIsT0FBTyxDQUFDLFVBQUFzQixJQUFJLEVBQUk7UUFDbEIsSUFBTUMsR0FBRyxHQUFHRCxJQUFJLENBQUNFLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztRQUMvQ0YsSUFBSSxDQUFDZCxTQUFTLEdBQUcxQixRQUFRLENBQUN5QyxHQUFHLENBQUMsSUFBSSwwQ0FBMEMsR0FBR0EsR0FBRztRQUNsRkQsSUFBSSxDQUFDRyxlQUFlLENBQUMsZ0JBQWdCLENBQUM7TUFDMUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxNQUFJO01BQ0RuQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztJQUNwQztJQUNBbUMscUJBQXFCLEVBQUU7RUFDM0I7RUFFQSxTQUFTQSxxQkFBcUIsQ0FBQ0MsT0FBTyxFQUFFQyxZQUFZLEVBQUU7SUFDbEQsSUFBSSxDQUFDRCxPQUFPLEVBQUU7TUFDVjtJQUNKO0lBQ0Esd0JBQW1CLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQywwQkFBRTtNQUE1QixJQUFNRSxJQUFJO01BQ1hGLE9BQU8sQ0FBQ2pDLFNBQVMsQ0FBQ1EsTUFBTSxDQUFDMEIsWUFBWSxHQUFHQyxJQUFJLENBQUM7SUFDakQ7SUFDQUYsT0FBTyxDQUFDakMsU0FBUyxDQUFDQyxHQUFHLENBQUNpQyxZQUFZLEdBQUdoRCxNQUFNLENBQUM7RUFDaEQ7RUFFQSxJQUFNZ0IsT0FBTyxHQUFHLFNBQVZBLE9BQU8sQ0FBYWtDLElBQUksRUFBRUMsWUFBWSxFQUFFO0lBQzFDLE9BQU9wQixLQUFLLENBQUN4RCxNQUFNLEdBQUcyRSxJQUFJO01BQ3RCRSxPQUFPLEVBQUU7UUFDTCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLGNBQWMsRUFBRTtNQUNwQjtJQUFDLEdBQ0dELFlBQVksSUFBSSxDQUFDLENBQUMsRUFDeEIsQ0FBQ2xDLElBQUksQ0FBQyxVQUFBQyxHQUFHO01BQUEsT0FBSUEsR0FBRyxDQUFDYyxJQUFJLEVBQUU7SUFBQSxFQUFDO0VBQzlCLENBQUM7RUFHRCxTQUFTcUIsT0FBTyxHQUFHO0lBQ2YsT0FBT0MsT0FBTyxDQUFDQyxHQUFHLENBQUMsQ0FDZnZDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUM5QixDQUFDO0VBQ047RUFFQSxJQUFNd0MsUUFBUSxHQUFHLFNBQVhBLFFBQVEsR0FBUztJQUNuQkgsT0FBTyxFQUFFLENBQUNwQyxJQUFJLENBQUMsVUFBQUMsR0FBRyxFQUFJO01BQ2xCakIsS0FBSyxHQUFHaUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDdUMsSUFBSSxDQUFDLFVBQUNDLENBQUMsRUFBRUMsQ0FBQztRQUFBLE9BQUtBLENBQUMsQ0FBQ0MsTUFBTSxHQUFHRixDQUFDLENBQUNFLE1BQU07TUFBQSxFQUFDO01BQ2xEO01BQ0FDLFdBQVcsQ0FBQzVELEtBQUssQ0FBQztNQUNsQjtJQUNKLENBQUMsQ0FBQzs7SUFDRixJQUFHNkQsTUFBTSxDQUFDQyxVQUFVLElBQUksR0FBRyxFQUFDO01BQ3hCQyxpQkFBaUIsQ0FBQzNFLGNBQWMsQ0FBQztJQUNyQztJQUNBQSxjQUFjLENBQUMrQixPQUFPLENBQUMsVUFBQzZDLE1BQU0sRUFBRUMsQ0FBQyxFQUFJO01BQ2pDLElBQUdBLENBQUMsR0FBRyxDQUFDLEdBQUd0RSxlQUFlLEVBQUM7UUFDdkJxRSxNQUFNLENBQUNuRCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUM7TUFDakM7TUFDQSxJQUFHbUQsQ0FBQyxHQUFHLENBQUMsR0FBR3RFLGVBQWUsRUFBQztRQUN2QnFFLE1BQU0sQ0FBQ25ELFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQztNQUNqQztNQUNBb0QsZ0JBQWdCLENBQUNGLE1BQU0sQ0FBQztNQUN4QixJQUFHQSxNQUFNLENBQUNuRCxTQUFTLENBQUNzRCxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUM7UUFDbEMsSUFBTUMsS0FBSyxHQUFHSixNQUFNLENBQUNyRixnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQztRQUMxRCxJQUFNMEYsSUFBSSxHQUFHTCxNQUFNLENBQUNyRixnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQztRQUMxRCxJQUFNMkYsSUFBSSxHQUFHTixNQUFNLENBQUNyRixnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQztRQUMxRHlGLEtBQUssQ0FBQ2pELE9BQU8sQ0FBQyxVQUFBb0QsSUFBSSxFQUFJO1VBQ2xCQSxJQUFJLENBQUNDLFdBQVcsR0FBRyxHQUFHO1FBQzFCLENBQUMsQ0FBQztRQUNGSCxJQUFJLENBQUNsRCxPQUFPLENBQUMsVUFBQWtELElBQUksRUFBSTtVQUNqQkEsSUFBSSxDQUFDRyxXQUFXLEdBQUcsR0FBRztRQUMxQixDQUFDLENBQUM7UUFDRkYsSUFBSSxDQUFDbkQsT0FBTyxDQUFDLFVBQUFtRCxJQUFJLEVBQUk7VUFDakJBLElBQUksQ0FBQ0UsV0FBVyxHQUFHLEdBQUc7UUFDMUIsQ0FBQyxDQUFDO01BQ047SUFDSixDQUFDLENBQUM7RUFDTixDQUFDO0VBSUQsU0FBU0MsSUFBSSxHQUFHO0lBQ1osSUFBSVosTUFBTSxDQUFDYSxLQUFLLEVBQUU7TUFDZCxJQUFJQyxLQUFLLEdBQUdkLE1BQU0sQ0FBQ2EsS0FBSyxDQUFDRSxRQUFRLEVBQUU7TUFDbkMxRSxNQUFNLEdBQUd5RSxLQUFLLENBQUNFLElBQUksQ0FBQ0MsWUFBWSxJQUFJSCxLQUFLLENBQUNFLElBQUksQ0FBQ0UsRUFBRSxJQUFJLEVBQUU7TUFDdkR4QixRQUFRLEVBQUU7SUFDZCxDQUFDLE1BQU07TUFDSEEsUUFBUSxFQUFFO01BQ1YsSUFBSXlCLENBQUMsR0FBRyxDQUFDO01BQ1QsSUFBSWYsQ0FBQyxHQUFHZ0IsV0FBVyxDQUFDLFlBQVk7UUFDNUIsSUFBSUQsQ0FBQyxHQUFHLEVBQUUsRUFBRTtVQUNSLElBQUksQ0FBQyxDQUFDbkIsTUFBTSxDQUFDcUIsU0FBUyxFQUFFO1lBQ3BCaEYsTUFBTSxHQUFHMkQsTUFBTSxDQUFDcUIsU0FBUztZQUN6QjNCLFFBQVEsRUFBRTtZQUNWNUMsYUFBYSxFQUFFO1lBQ2Z3RSxhQUFhLENBQUNsQixDQUFDLENBQUM7VUFDcEI7UUFDSixDQUFDLE1BQU07VUFDSGtCLGFBQWEsQ0FBQ2xCLENBQUMsQ0FBQztRQUNwQjtNQUNKLENBQUMsRUFBRSxHQUFHLENBQUM7SUFFWDtJQUNBdEQsYUFBYSxFQUFFO0lBRWYvQixlQUFlLENBQUN1QyxPQUFPLENBQUMsVUFBQ2lFLE9BQU8sRUFBRW5CLENBQUMsRUFBSztNQUNwQ21CLE9BQU8sQ0FBQ0MsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUNDLENBQUMsRUFBSztRQUNyQ0EsQ0FBQyxDQUFDQyxjQUFjLEVBQUU7UUFDbEJDLFdBQVcsRUFBRTtNQUNqQixDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDTjtFQUVBLFNBQVNBLFdBQVcsR0FBRztJQUNuQixJQUFJLENBQUN0RixNQUFNLEVBQUU7TUFDVDtJQUNKO0lBRUEsSUFBTXVGLE1BQU0sR0FBRztNQUFDdkUsTUFBTSxFQUFFaEI7SUFBTSxDQUFDO0lBRS9CYSxPQUFPLENBQUMsT0FBTyxFQUFFO01BQ2IyRSxNQUFNLEVBQUUsTUFBTTtNQUNkQyxJQUFJLEVBQUV0RixJQUFJLENBQUN1RixTQUFTLENBQUNILE1BQU07SUFDL0IsQ0FBQyxDQUFDLENBQUN6RSxJQUFJLENBQUMsVUFBQUMsR0FBRyxFQUFJO01BQ1hyQyxlQUFlLENBQUN1QyxPQUFPLENBQUMsVUFBQUMsSUFBSTtRQUFBLE9BQUlBLElBQUksQ0FBQ1AsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO01BQUEsRUFBQztNQUMzRGpDLFlBQVksQ0FBQ3NDLE9BQU8sQ0FBQyxVQUFBQyxJQUFJO1FBQUEsT0FBSUEsSUFBSSxDQUFDUCxTQUFTLENBQUNRLE1BQU0sQ0FBQyxNQUFNLENBQUM7TUFBQSxFQUFDO01BQzNEdkMsY0FBYyxDQUFDcUMsT0FBTyxDQUFDLFVBQUFDLElBQUk7UUFBQSxPQUFJQSxJQUFJLENBQUNQLFNBQVMsQ0FBQ1EsTUFBTSxDQUFDLE1BQU0sQ0FBQztNQUFBLEVBQUM7TUFDN0RtRSxXQUFXLEdBQUcsSUFBSTtNQUNsQjdFLGFBQWEsRUFBRTtNQUNmNEMsUUFBUSxFQUFFO0lBQ2QsQ0FBQyxDQUFDO0VBQ047RUFFQSxTQUFTSyxXQUFXLENBQUM1RCxLQUFLLEVBQUU7SUFDeEI2RixrQkFBa0IsQ0FBQzdGLEtBQUssRUFBRUUsTUFBTSxDQUFDO0VBQ3JDO0VBRUEsU0FBUzJGLGtCQUFrQixDQUFDN0YsS0FBSyxFQUFFOEYsYUFBYSxFQUFFO0lBQzlDdkgsWUFBWSxDQUFDb0QsU0FBUyxHQUFHLEVBQUU7SUFDM0J6QyxpQkFBaUIsQ0FBQ3lDLFNBQVMsR0FBRyxFQUFFO0lBRWhDLElBQUksQ0FBQzNCLEtBQUssSUFBSSxDQUFDQSxLQUFLLENBQUMrRixNQUFNLEVBQUU7SUFFN0IsSUFBSUMsUUFBUSxHQUFHaEcsS0FBSyxDQUFDaUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDakNELFFBQVEsQ0FBQzdFLE9BQU8sQ0FBQyxVQUFBSyxJQUFJO01BQUEsT0FBSTBFLFdBQVcsQ0FBQzFFLElBQUksRUFBRUEsSUFBSSxDQUFDTixNQUFNLEtBQUs0RSxhQUFhLEVBQUV2SCxZQUFZLEVBQUV5QixLQUFLLENBQUM7SUFBQSxFQUFDO0lBRS9GLElBQU1tRyxXQUFXLEdBQUduRyxLQUFLLENBQUNvRyxJQUFJLENBQUMsVUFBQTVFLElBQUk7TUFBQSxPQUFJQSxJQUFJLENBQUNOLE1BQU0sS0FBSzRFLGFBQWE7SUFBQSxFQUFDO0lBQ3JFLElBQU1PLGdCQUFnQixHQUFHRixXQUFXLEdBQUduRyxLQUFLLENBQUNzRyxPQUFPLENBQUNILFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV0RSxJQUFJRSxnQkFBZ0IsSUFBSSxFQUFFLEVBQUU7TUFDeEIsSUFBSUUsVUFBVSxHQUFHdkcsS0FBSyxDQUFDaUcsS0FBSyxDQUFDTyxJQUFJLENBQUNDLEdBQUcsQ0FBQyxFQUFFLEVBQUVKLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxFQUFFQSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7TUFDdEZFLFVBQVUsQ0FBQ3BGLE9BQU8sQ0FBQyxVQUFBSyxJQUFJO1FBQUEsT0FBSTBFLFdBQVcsQ0FBQzFFLElBQUksRUFBRUEsSUFBSSxDQUFDTixNQUFNLEtBQUs0RSxhQUFhLEVBQUU1RyxpQkFBaUIsRUFBRWMsS0FBSyxDQUFDO01BQUEsRUFBQztJQUMxRztFQUNKO0VBRUEsU0FBU2tHLFdBQVcsQ0FBQzFFLElBQUksRUFBRWtGLGFBQWEsRUFBRUMsS0FBSyxFQUFFQyxRQUFRLEVBQUU7SUFDdkQsSUFBTUMsaUJBQWlCLEdBQUdySSxRQUFRLENBQUNzSSxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ3ZERCxpQkFBaUIsQ0FBQ2hHLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLG1CQUFtQixDQUFDO0lBSXBELElBQU1pRyxLQUFLLEdBQUdILFFBQVEsQ0FBQ04sT0FBTyxDQUFDOUUsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUN4QyxJQUFNd0YsYUFBYSxHQUFHN0csVUFBVSxDQUFDNEcsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUMzQyxJQUFJQyxhQUFhLEVBQUU7TUFDZkgsaUJBQWlCLENBQUNoRyxTQUFTLENBQUNDLEdBQUcsQ0FBQ2tHLGFBQWEsQ0FBQztJQUNsRDtJQUVBLElBQU1DLFFBQVEsR0FBR0Msc0JBQXNCLENBQUNILEtBQUssQ0FBQztJQUM5Q0YsaUJBQWlCLENBQUNsRixTQUFTLDZEQUNXb0YsS0FBSyxtRUFDTEwsYUFBYSxHQUFHbEYsSUFBSSxDQUFDTixNQUFNLEdBQUdpRyxVQUFVLENBQUMzRixJQUFJLENBQUNOLE1BQU0sQ0FBQyxtRUFDckRNLElBQUksQ0FBQ21DLE1BQU0sbUVBQ1huQyxJQUFJLENBQUNJLFVBQVUsbUVBQ2ZKLElBQUksQ0FBQzRGLFdBQVcsbUVBQ2hCSCxRQUFRLEdBQUdJLFlBQVksQ0FBQ0osUUFBUSxDQUFDLEdBQUcsS0FBSyxpQkFDbEY7SUFDRyxJQUFJUCxhQUFhLEVBQUU7TUFDZixJQUFNWSxRQUFRLEdBQUc5SSxRQUFRLENBQUNzSSxhQUFhLENBQUMsS0FBSyxDQUFDO01BQzlDUSxRQUFRLENBQUNDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUM7TUFDOUNELFFBQVEsQ0FBQzlDLFdBQVcsR0FBRyxJQUFJLEVBQUM7TUFDNUI4QyxRQUFRLENBQUN6RyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUM7TUFDL0IrRixpQkFBaUIsQ0FBQ1csTUFBTSxDQUFDRixRQUFRLENBQUM7TUFDbENULGlCQUFpQixDQUFDaEcsU0FBUyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBRTVDO0lBQ0E2RixLQUFLLENBQUNhLE1BQU0sQ0FBQ1gsaUJBQWlCLENBQUM7RUFDbkM7RUFDQSxTQUFTTSxVQUFVLENBQUNqSCxNQUFNLEVBQUU7SUFDeEIsT0FBTyxJQUFJLEdBQUdBLE1BQU0sQ0FBQ3VILFFBQVEsRUFBRSxDQUFDeEIsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUM1QztFQUVBLFNBQVNvQixZQUFZLENBQUMzRSxHQUFHLEVBQUU7SUFDdkIsSUFBSSxDQUFDQSxHQUFHLEVBQUU7TUFDTjtJQUNKO0lBQ0EsT0FBT3pDLFFBQVEsQ0FBQ3lDLEdBQUcsQ0FBQyxJQUFJLDBDQUEwQyxHQUFHQSxHQUFHO0VBQzVFO0VBRUEsU0FBU3dFLHNCQUFzQixDQUFDSCxLQUFLLEVBQUU7SUFDbkMsSUFBSUEsS0FBSyxJQUFJLENBQUMsRUFBRTtNQUNaLHVCQUFnQkEsS0FBSztJQUN6QixDQUFDLE1BQU0sSUFBSUEsS0FBSyxJQUFJLEVBQUUsRUFBRTtNQUNwQjtJQUNKLENBQUMsTUFBTSxJQUFJQSxLQUFLLElBQUksRUFBRSxFQUFFO01BQ3BCO0lBQ0osQ0FBQyxNQUFNLElBQUlBLEtBQUssSUFBSSxFQUFFLEVBQUU7TUFDcEI7SUFDSixDQUFDLE1BQU0sSUFBSUEsS0FBSyxJQUFJLEVBQUUsRUFBRTtNQUNwQjtJQUNKLENBQUMsTUFBTSxJQUFJQSxLQUFLLElBQUksRUFBRSxFQUFFO01BQ3BCO0lBQ0osQ0FBQyxNQUFNLElBQUlBLEtBQUssSUFBSSxHQUFHLEVBQUU7TUFDckI7SUFDSixDQUFDLE1BQU0sSUFBSUEsS0FBSyxJQUFJLEdBQUcsRUFBRTtNQUNyQjtJQUNKLENBQUMsTUFBTSxJQUFJQSxLQUFLLElBQUksR0FBRyxFQUFFO01BQ3JCO0lBQ0osQ0FBQyxNQUFNLElBQUlBLEtBQUssSUFBSSxHQUFHLEVBQUU7TUFDckI7SUFDSixDQUFDLE1BQU0sSUFBSUEsS0FBSyxJQUFJLEdBQUcsRUFBRTtNQUNyQjtJQUNKO0VBQ0o7RUFFQSxJQUFNVyxTQUFTLEdBQUdsSixRQUFRLENBQUNHLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDO0VBQzlELElBQU1nSixNQUFNLEdBQUduSixRQUFRLENBQUNHLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDO0VBRzdEZ0osTUFBTSxDQUFDeEcsT0FBTyxDQUFDLFVBQUN5RyxLQUFLLEVBQUUzRCxDQUFDLEVBQUk7SUFDeEIsSUFBR0EsQ0FBQyxLQUFLLENBQUMsRUFBQztNQUNQMkQsS0FBSyxDQUFDL0csU0FBUyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ2hDO0lBQ0EsSUFBR21ELENBQUMsS0FBSzBELE1BQU0sQ0FBQzVCLE1BQU0sR0FBRyxDQUFDLEVBQUM7TUFDdkI2QixLQUFLLENBQUMvRyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFDakM7SUFDQSxJQUFNK0csS0FBSyxHQUFHRCxLQUFLLENBQUNuSixhQUFhLENBQUMseUJBQXlCLENBQUM7SUFDNUQsSUFBTXFKLElBQUksR0FBR0YsS0FBSyxDQUFDRyxVQUFVLENBQUN0SixhQUFhLENBQUMsaUJBQWlCLENBQUM7SUFDOUR1SixRQUFRLENBQUNGLElBQUksRUFBRUQsS0FBSyxFQUFFRCxLQUFLLENBQUM7RUFDaEMsQ0FBQyxDQUFDO0VBRUYsU0FBU0ksUUFBUSxDQUFDRixJQUFJLEVBQUVELEtBQUssRUFBRUQsS0FBSyxFQUFDO0lBQ2pDRSxJQUFJLENBQUN6QyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBSztNQUNoQ3VDLEtBQUssQ0FBQy9HLFNBQVMsQ0FBQ1EsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDLENBQUM7SUFDRndHLEtBQUssQ0FBQ3hDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFLO01BQ2pDdUMsS0FBSyxDQUFDL0csU0FBUyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBQ2xDLENBQUMsQ0FBQztJQUNGdEMsUUFBUSxDQUFDNkcsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUNDLENBQUMsRUFBSTtNQUNyQyxJQUFHLENBQUNzQyxLQUFLLENBQUN6RCxRQUFRLENBQUNtQixDQUFDLENBQUMyQyxNQUFNLENBQUMsSUFBSTNDLENBQUMsQ0FBQzJDLE1BQU0sS0FBS0gsSUFBSSxFQUFDO1FBQzlDRixLQUFLLENBQUMvRyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxTQUFTLENBQUM7TUFDbEM7SUFDSixDQUFDLENBQUM7RUFDTjtFQUdBcEIsYUFBYSxDQUFDaUMsU0FBUyxHQUFHLEVBQUU7RUFFNUIsS0FBSyxJQUFJc0MsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHdEUsZUFBZSxFQUFFc0UsQ0FBQyxFQUFFLEVBQUU7SUFDdEMsSUFBTWlFLEdBQUcsR0FBRzFKLFFBQVEsQ0FBQ3NJLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDekNvQixHQUFHLENBQUNySCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztJQUN0Q3BCLGFBQWEsQ0FBQ3lJLFdBQVcsQ0FBQ0QsR0FBRyxDQUFDO0VBQ2xDO0VBRUEsSUFBTUUsV0FBVyxHQUFHNUosUUFBUSxDQUFDRyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQztFQUVuRVEsUUFBUSxDQUFDZ0MsT0FBTyxDQUFDLFVBQUNDLElBQUksRUFBRTZDLENBQUMsRUFBSTtJQUN6QixJQUFHQSxDQUFDLEdBQUcsQ0FBQyxHQUFHdEUsZUFBZSxFQUFDO01BQ3ZCeUIsSUFBSSxDQUFDUCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUM7SUFDL0I7O0lBRUE7O0lBRUEsSUFBR21ELENBQUMsR0FBRyxDQUFDLEtBQUt0RSxlQUFlLEVBQUM7TUFDekJ5QixJQUFJLENBQUNQLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUNqQztJQUVBTSxJQUFJLENBQUNpRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQ0MsQ0FBQyxFQUFJO01BQ2pDLElBQUdBLENBQUMsQ0FBQzJDLE1BQU0sQ0FBQ3BILFNBQVMsQ0FBQ3NELFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBQztRQUNwQztNQUNKO01BQ0FoRixRQUFRLENBQUNnQyxPQUFPLENBQUMsVUFBQWtILEdBQUcsRUFBRztRQUNuQkEsR0FBRyxDQUFDeEgsU0FBUyxDQUFDUSxNQUFNLENBQUMsU0FBUyxDQUFDO01BQ25DLENBQUMsQ0FBQztNQUNGaUUsQ0FBQyxDQUFDMkMsTUFBTSxDQUFDcEgsU0FBUyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztFQUNGc0gsV0FBVyxDQUFDakgsT0FBTyxDQUFDLFVBQUNDLElBQUksRUFBRTZDLENBQUMsRUFBSTtJQUM1QixJQUFHQSxDQUFDLEdBQUcsQ0FBQyxLQUFLdEUsZUFBZSxFQUFDO01BQ3pCeUIsSUFBSSxDQUFDUCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFDakM7RUFDSixDQUFDLENBQUM7RUFFRixJQUFNd0gsUUFBUSxHQUFHOUosUUFBUSxDQUFDRyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQztFQUU5RDJKLFFBQVEsQ0FBQ25ILE9BQU8sQ0FBQyxVQUFDQyxJQUFJLEVBQUU2QyxDQUFDLEVBQUk7SUFDekIsSUFBR0EsQ0FBQyxHQUFHLENBQUMsS0FBS3RFLGVBQWUsRUFBQztNQUN6QnlCLElBQUksQ0FBQ1AsU0FBUyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBQ2pDO0VBQ0osQ0FBQyxDQUFDO0VBR0YsU0FBU3lILHFCQUFxQixDQUFDQyxpQkFBaUIsRUFBRTtJQUU5QztJQUNBQSxpQkFBaUIsQ0FBQ3JILE9BQU8sQ0FBQyxVQUFBc0gsSUFBSSxFQUFJO01BQzlCLElBQVFDLEtBQUssR0FBV0QsSUFBSSxDQUFwQkMsS0FBSztRQUFFbkUsSUFBSSxHQUFLa0UsSUFBSSxDQUFibEUsSUFBSTs7TUFFbkI7TUFDQSxJQUFNb0UsT0FBTyxHQUFHbkssUUFBUSxDQUFDRyxnQkFBZ0IsWUFBS2lLLGFBQWEsQ0FBQ0YsS0FBSyxDQUFDLEVBQUc7TUFFckVDLE9BQU8sQ0FBQ3hILE9BQU8sQ0FBQyxVQUFBNkMsTUFBTSxFQUFJO1FBQ3RCO1FBQ0EsSUFBTTZFLFVBQVUsR0FBRzdFLE1BQU0sQ0FBQ3JGLGdCQUFnQixDQUFDLGVBQWUsQ0FBQztRQUUzRGtLLFVBQVUsQ0FBQzFILE9BQU8sQ0FBQyxVQUFBMkgsS0FBSyxFQUFJO1VBQ3hCO1VBQ0EsSUFBTUMsVUFBVSxHQUFHRCxLQUFLLENBQUNuSyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQztVQUMvRCxJQUFNeUYsS0FBSyxHQUFHMEUsS0FBSyxDQUFDbkssZ0JBQWdCLENBQUMsbUJBQW1CLENBQUM7O1VBRXpEO1VBQ0F5RixLQUFLLENBQUNqRCxPQUFPLENBQUMsVUFBQzZILFdBQVcsRUFBRXRILEtBQUssRUFBSztZQUNsQztZQUNBLElBQUlzSCxXQUFXLENBQUN4RSxXQUFXLENBQUN5RSxJQUFJLEVBQUUsS0FBSzFFLElBQUksRUFBRTtjQUN6QztjQUNBd0UsVUFBVSxDQUFDckgsS0FBSyxDQUFDLENBQUNiLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztZQUM5QztVQUNKLENBQUMsQ0FBQztRQUNOLENBQUMsQ0FBQztNQUNOLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztFQUNOOztFQUVKO0VBQ0ksU0FBUzhILGFBQWEsQ0FBQ0YsS0FBSyxFQUFFO0lBQzFCLFFBQVFBLEtBQUs7TUFDVCxLQUFLLGVBQWU7UUFDaEIsT0FBTyxVQUFVO01BQ3JCLEtBQUssZUFBZTtRQUNoQixPQUFPLFVBQVU7TUFDckIsS0FBSyxZQUFZO1FBQ2IsT0FBTyxVQUFVO01BQ3JCLEtBQUssT0FBTztRQUNSLE9BQU8sYUFBYTtNQUN4QjtRQUNJLE9BQU8sRUFBRTtJQUFDO0VBRXRCO0VBRUFsSyxRQUFRLENBQUM2RyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRTtJQUFBLE9BQU1rRCxxQkFBcUIsQ0FBQ25JLFdBQVcsQ0FBQztFQUFBLEVBQUM7RUFFdkYsU0FBUzhJLGtCQUFrQixHQUFHO0lBQzFCM0ksWUFBWSxDQUFDNEksT0FBTyxDQUFDLGFBQWEsRUFBRTlJLElBQUksQ0FBQ3VGLFNBQVMsQ0FBQ3hGLFdBQVcsQ0FBQyxDQUFDO0VBQ3BFO0VBRUEsU0FBU2dKLFdBQVcsQ0FBQ0MsU0FBUyxFQUFFWCxLQUFLLEVBQUUxRSxNQUFNLEVBQUU7SUFDM0MsSUFBR0EsTUFBTSxDQUFDbkQsU0FBUyxDQUFDc0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJSCxNQUFNLENBQUNuRCxTQUFTLENBQUNzRCxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUM7TUFDMUU7SUFDSjtJQUNBLElBQU00RSxVQUFVLEdBQUdNLFNBQVMsQ0FBQzFLLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDO0lBQ25FLElBQU15RixLQUFLLEdBQUdpRixTQUFTLENBQUMxSyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQztJQUU3RG9LLFVBQVUsQ0FBQzVILE9BQU8sQ0FBQyxVQUFDbUksS0FBSyxFQUFFNUgsS0FBSyxFQUFLO01BQ2pDNEgsS0FBSyxDQUFDakUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUNDLENBQUMsRUFBSztRQUNuQ3lELFVBQVUsQ0FBQzVILE9BQU8sQ0FBQyxVQUFBQyxJQUFJO1VBQUEsT0FBSUEsSUFBSSxDQUFDUCxTQUFTLENBQUNRLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFBQSxFQUFDO1FBQzVEaUUsQ0FBQyxDQUFDMkMsTUFBTSxDQUFDcEgsU0FBUyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQ2pDLElBQU15SSxZQUFZLEdBQUduRixLQUFLLENBQUMxQyxLQUFLLENBQUMsQ0FBQzhDLFdBQVcsQ0FBQ3lFLElBQUksRUFBRTs7UUFFcEQ7UUFDQTdJLFdBQVcsR0FBR0EsV0FBVyxDQUFDb0osTUFBTSxDQUFDLFVBQUFwSSxJQUFJLEVBQUk7VUFDckMsSUFBSUEsSUFBSSxDQUFDc0gsS0FBSyxLQUFLQSxLQUFLLEVBQUUsT0FBTyxJQUFJO1VBRXJDLE9BQU8sQ0FBQ2UsS0FBSyxDQUFDQyxJQUFJLENBQUN0RixLQUFLLENBQUMsQ0FBQ3VGLElBQUksQ0FBQyxVQUFBcEYsSUFBSTtZQUFBLE9BQUlBLElBQUksQ0FBQ0MsV0FBVyxDQUFDeUUsSUFBSSxFQUFFLEtBQUs3SCxJQUFJLENBQUNtRCxJQUFJO1VBQUEsRUFBQztRQUNqRixDQUFDLENBQUM7O1FBRUY7UUFDQW5FLFdBQVcsQ0FBQ3dKLElBQUksQ0FBQztVQUFFbEIsS0FBSyxFQUFFQSxLQUFLO1VBQUVuRSxJQUFJLEVBQUVnRjtRQUFhLENBQUMsQ0FBQzs7UUFFdEQ7UUFDQUwsa0JBQWtCLEVBQUU7UUFFcEJ6SSxPQUFPLENBQUNDLEdBQUcsQ0FBQ04sV0FBVyxDQUFDLENBQUMsQ0FBQztNQUM5QixDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDTjs7RUFHQSxTQUFTOEQsZ0JBQWdCLENBQUNGLE1BQU0sRUFBRTtJQUM5QnZELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDc0QsTUFBTSxDQUFDbkQsU0FBUyxDQUFDc0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFFO0lBQ2hELElBQUl1RSxLQUFLLEdBQUcsRUFBRTtJQUVkMUUsTUFBTSxDQUFDbkQsU0FBUyxDQUFDc0QsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHdUUsS0FBSyxHQUFHLGVBQWUsR0FBRyxJQUFJO0lBQ3RFMUUsTUFBTSxDQUFDbkQsU0FBUyxDQUFDc0QsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHdUUsS0FBSyxHQUFHLGVBQWUsR0FBRyxJQUFJO0lBQ3RFMUUsTUFBTSxDQUFDbkQsU0FBUyxDQUFDc0QsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHdUUsS0FBSyxHQUFHLFlBQVksR0FBRyxJQUFJO0lBQ25FMUUsTUFBTSxDQUFDbkQsU0FBUyxDQUFDc0QsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHdUUsS0FBSyxHQUFHLE9BQU8sR0FBRyxJQUFJO0lBRWpFLElBQU1HLFVBQVUsR0FBRzdFLE1BQU0sQ0FBQ3JGLGdCQUFnQixDQUFDLGVBQWUsQ0FBQztJQUUzRGtLLFVBQVUsQ0FBQzFILE9BQU8sQ0FBQyxVQUFBMkgsS0FBSztNQUFBLE9BQUlNLFdBQVcsQ0FBQ04sS0FBSyxFQUFFSixLQUFLLEVBQUUxRSxNQUFNLENBQUM7SUFBQSxFQUFDO0VBR2xFO0VBR0EsU0FBU0QsaUJBQWlCLENBQUM4RixNQUFNLEVBQUU7SUFDL0JBLE1BQU0sQ0FBQzFJLE9BQU8sQ0FBQyxVQUFDdUgsS0FBSyxFQUFFaEgsS0FBSyxFQUFLO01BRTdCZ0gsS0FBSyxDQUFDN0gsU0FBUyxDQUFDUSxNQUFNLENBQUMsU0FBUyxDQUFDO01BQ2pDLElBQUdLLEtBQUssS0FBSzlCLFdBQVcsRUFBQztRQUNyQmEsT0FBTyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQ3BCZ0ksS0FBSyxDQUFDN0gsU0FBUyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO01BQ2xDO0lBQ0osQ0FBQyxDQUFDO0VBQ047RUFFQXpCLFFBQVEsQ0FBQ2dHLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0lBQ3JDLElBQUl6RixXQUFXLElBQUksQ0FBQyxFQUFFO01BQ2xCQSxXQUFXLEVBQUU7TUFDYm1FLGlCQUFpQixDQUFDM0UsY0FBYyxDQUFDO0lBQ3JDO0lBQ0EsSUFBSVEsV0FBVyxHQUFHLENBQUMsRUFBRTtNQUNqQkEsV0FBVyxHQUFHUixjQUFjLENBQUMyRyxNQUFNLEdBQUcsQ0FBQztNQUN2Q2hDLGlCQUFpQixDQUFDM0UsY0FBYyxDQUFDO01BQ2pDa0osUUFBUSxDQUFDbkgsT0FBTyxDQUFDLFVBQUNDLElBQUksRUFBRTZDLENBQUMsRUFBSTtRQUN6QjdDLElBQUksQ0FBQ1AsU0FBUyxDQUFDUSxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2hDLElBQUc0QyxDQUFDLEdBQUcsQ0FBQyxLQUFLckUsV0FBVyxFQUFDO1VBQ3JCd0IsSUFBSSxDQUFDUCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDakM7TUFDSixDQUFDLENBQUM7SUFDTjtJQUNBd0gsUUFBUSxDQUFDbkgsT0FBTyxDQUFDLFVBQUNDLElBQUksRUFBRTZDLENBQUMsRUFBSTtNQUN6QjdDLElBQUksQ0FBQ1AsU0FBUyxDQUFDUSxNQUFNLENBQUMsU0FBUyxDQUFDO01BQ2hDLElBQUc0QyxDQUFDLEtBQUtyRSxXQUFXLEVBQUM7UUFDakJ3QixJQUFJLENBQUNQLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztNQUNqQztJQUNKLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztFQUVGeEIsU0FBUyxDQUFDK0YsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07SUFDdEMsSUFBSXpGLFdBQVcsR0FBR1IsY0FBYyxDQUFDMkcsTUFBTSxHQUFHLENBQUMsSUFBSW5HLFdBQVcsSUFBSSxDQUFDLEVBQUU7TUFDN0RBLFdBQVcsRUFBRTtNQUNibUUsaUJBQWlCLENBQUMzRSxjQUFjLENBQUM7SUFDckM7SUFDQSxJQUFHUSxXQUFXLEtBQUtSLGNBQWMsQ0FBQzJHLE1BQU0sRUFBQztNQUNyQ25HLFdBQVcsR0FBRyxDQUFDO01BQ2ZtRSxpQkFBaUIsQ0FBQzNFLGNBQWMsQ0FBQztJQUNyQztJQUNBa0osUUFBUSxDQUFDbkgsT0FBTyxDQUFDLFVBQUNDLElBQUksRUFBRTZDLENBQUMsRUFBSTtNQUN6QjdDLElBQUksQ0FBQ1AsU0FBUyxDQUFDUSxNQUFNLENBQUMsU0FBUyxDQUFDO01BQ2hDLElBQUc0QyxDQUFDLEtBQUtyRSxXQUFXLEVBQUM7UUFDakJ3QixJQUFJLENBQUNQLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztNQUNqQztJQUNKLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztFQUVGdkIsY0FBYyxDQUFDOEYsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07SUFDM0MsSUFBSXpGLFdBQVcsR0FBRyxDQUFDLEVBQUU7TUFDakJBLFdBQVcsRUFBRTtJQUNqQixDQUFDLE1BQU07TUFDSEEsV0FBVyxHQUFHSCxVQUFVLENBQUNzRyxNQUFNLEdBQUcsQ0FBQztJQUN2QztJQUNBO0lBQ0E1RyxRQUFRLENBQUNnQyxPQUFPLENBQUMsVUFBQ0MsSUFBSSxFQUFFNkMsQ0FBQyxFQUFJO01BQ3pCN0MsSUFBSSxDQUFDUCxTQUFTLENBQUNRLE1BQU0sQ0FBQyxTQUFTLENBQUM7TUFDaEMsSUFBR3pCLFdBQVcsR0FBRyxDQUFDLEVBQUM7UUFDZkEsV0FBVyxHQUFHRCxlQUFlO01BQ2pDO01BRUEsSUFBR3NFLENBQUMsR0FBRyxDQUFDLEtBQUtyRSxXQUFXLEVBQUM7UUFDckJ3QixJQUFJLENBQUNQLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztNQUNqQztJQUVKLENBQUMsQ0FBQztJQUNGc0gsV0FBVyxDQUFDakgsT0FBTyxDQUFDLFVBQUNDLElBQUksRUFBRTZDLENBQUMsRUFBSTtNQUM1QjdDLElBQUksQ0FBQ1AsU0FBUyxDQUFDUSxNQUFNLENBQUMsU0FBUyxDQUFDO01BQ2hDLElBQUc0QyxDQUFDLEdBQUcsQ0FBQyxLQUFLckUsV0FBVyxFQUFDO1FBQ3JCd0IsSUFBSSxDQUFDUCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxTQUFTLENBQUM7TUFDakM7SUFDSixDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7RUFFRnRCLGVBQWUsQ0FBQzZGLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0lBQzVDLElBQUl6RixXQUFXLEdBQUdILFVBQVUsQ0FBQ3NHLE1BQU0sR0FBRyxDQUFDLEVBQUU7TUFDckNuRyxXQUFXLEVBQUU7SUFDakIsQ0FBQyxNQUFNO01BQ0hBLFdBQVcsR0FBRyxDQUFDO0lBQ25CO0lBQ0FULFFBQVEsQ0FBQ2dDLE9BQU8sQ0FBQyxVQUFDQyxJQUFJLEVBQUU2QyxDQUFDLEVBQUk7TUFDekI3QyxJQUFJLENBQUNQLFNBQVMsQ0FBQ1EsTUFBTSxDQUFDLFNBQVMsQ0FBQztNQUNoQyxJQUFHekIsV0FBVyxHQUFHRCxlQUFlLEVBQUM7UUFDN0JDLFdBQVcsR0FBRyxDQUFDO01BQ25CO01BRUEsSUFBR3FFLENBQUMsR0FBRyxDQUFDLEtBQUtyRSxXQUFXLEVBQUM7UUFDckJ3QixJQUFJLENBQUNQLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztNQUNqQztJQUVKLENBQUMsQ0FBQztJQUNGc0gsV0FBVyxDQUFDakgsT0FBTyxDQUFDLFVBQUNDLElBQUksRUFBRTZDLENBQUMsRUFBSTtNQUM1QjdDLElBQUksQ0FBQ1AsU0FBUyxDQUFDUSxNQUFNLENBQUMsU0FBUyxDQUFDO01BQ2hDLElBQUc0QyxDQUFDLEdBQUcsQ0FBQyxLQUFLckUsV0FBVyxFQUFDO1FBQ3JCd0IsSUFBSSxDQUFDUCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxTQUFTLENBQUM7TUFDakM7SUFDSixDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7RUFFRmUsZ0JBQWdCLEVBQUUsQ0FDYmIsSUFBSSxDQUFDeUQsSUFBSSxDQUFDO0VBRWZqRyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQzRHLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFLO0lBQy9ENUUsT0FBTyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQ3JCbEMsUUFBUSxDQUFDbUgsSUFBSSxDQUFDOUUsU0FBUyxDQUFDaUosTUFBTSxDQUFDLE1BQU0sQ0FBQztFQUMxQyxDQUFDLENBQUM7QUFHTixDQUFDLEdBQUciLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKXtcbiAgICBjb25zdCBhcGlVUkwgPSAnaHR0cHM6Ly9mYXYtcHJvbS5jb20vYXBpX2xlZ2VuZGFyeV90cm9waHknO1xuICAgIC8vIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL2Zhdi1wcm9tLmNvbS9hcGlfc2hhbmdoYWknO1xuICAgIGNvbnN0IHJlc3VsdHNUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN1bHRzLXRhYmxlJyksXG4gICAgICAgIHVuYXV0aE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5hdXRoLW1zZycpLFxuICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWpvaW4nKSxcbiAgICAgICAgeW91QXJlSW5CdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvb2stcGFydCcpLFxuICAgICAgICBwcmVkaWN0aW9uQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb25maXJtQnRuJyksXG4gICAgICAgIG11bHRpcGxpZXJTcGFucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X19tdWx0aXBsaWVyLW51bScpLFxuICAgICAgICByZXN1bHRzVGFibGVIZWFkID0gcmVzdWx0c1RhYmxlLnF1ZXJ5U2VsZWN0b3IoJy50YWJsZVJlc3VsdHNfX2hlYWQnKSxcbiAgICAgICAgdG9wUmVzdWx0c1RhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvcC11c2VycycpLFxuICAgICAgICByZXN1bHRzVGFibGVPdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN1bHRzLXRhYmxlLW90aGVyJyksXG4gICAgICAgIHRhYmxlTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yZXN1bHRzX19uYXYtaXRlbVwiKSxcbiAgICAgICAgcHJlZGljdENvbHVtbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19jb2x1bW5cIiksXG4gICAgICAgIG1vdmVMZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZV9fbW92ZS1sZWZ0XCIpLFxuICAgICAgICBtb3ZlUmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlX19tb3ZlLXJpZ2h0XCIpLFxuICAgICAgICBtb3ZlTGVmdFJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzdWx0c19fbW92ZS1sZWZ0XCIpLFxuICAgICAgICBtb3ZlUmlnaHRSZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3VsdHNfX21vdmUtcmlnaHRcIiksXG4gICAgICAgIHRhYnNSZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJlc3VsdHNfX3RhYi1pdGVtXCIpLFxuICAgICAgICB0YWJzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdHNfX3RhYicpO1xuXG5cbiAgICBsZXQgdG91cm5hbWVudFN0YWdlID0gMlxuXG4gICAgbGV0IGNvbHVtbkluZGV4ID0gdG91cm5hbWVudFN0YWdlIC0gMVxuXG4gICAgbGV0IHVzZXJJbmZvID0ge307XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhdGUgPSBmYWxzZVxuXG4gICAgbGV0IGxvY2FsZSA9ICdlbic7XG4gICAgbGV0IHVzZXJzO1xuICAgIGxldCBpMThuRGF0YSA9IHt9O1xuICAgIGxldCB1c2VySWQ7XG4gICAgdXNlcklkID0gMTAwMzAwMjY4O1xuXG4gICAgY29uc3QgUFJJWkVTX0NTUyA9IFsncGxhY2UxJywgJ3BsYWNlMicsICdwbGFjZTMnXTtcblxuICAgIGxldCBwcmVkaWN0RGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcmVkaWN0RGF0YVwiKSkgfHwgW107XG4gICAgY29uc29sZS5sb2cocHJlZGljdERhdGEpXG5cbiAgICBsZXQgY2hlY2tVc2VyQXV0aCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHVzZXJJZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2codXNlcklkKVxuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0KGAvZmF2dXNlci8ke3VzZXJJZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMudXNlcmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlvdUFyZUluQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJlZGljdGlvbkJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hVc2VySW5mbyhyZXMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgcGFydGljaXBhdGVCdG4gb2YgcGFydGljaXBhdGVCdG5zKSB7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhdGVCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVuYXV0aE1lcylcbiAgICAgICAgICAgICAgICB1bmF1dGhNZXMuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFVzZXJJbmZvKHVzZXIpIHtcbiAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdXNlckluZm8gPSB1c2VyO1xuICAgICAgICBjb25zb2xlLmxvZyh1c2VySW5mbylcblxuICAgICAgICAvLyDQntC90L7QstC70Y7RlNC80L4g0LLRgdGWIG11bHRpcGxpZXJTcGFuc1xuICAgICAgICBtdWx0aXBsaWVyU3BhbnMuZm9yRWFjaCgoc3BhbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gdXNlckluZm8ubXVsdGlwbGllciB8fCAwO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBsZXQgb3BlbmluZ0JldCA9IHtcbiAgICAgICAgLy8gICAgIGJpZ1dpbm5lcjoge3RlYW06ICdBUEVLUycsIG91dGNvbWU6IGZhbHNlfSxcbiAgICAgICAgLy8gICAgIGJpZ0xvc2VyOiB7dGVhbTogJ0NMT1VEOScsIG91dGNvbWU6IHRydWV9LFxuICAgICAgICAvLyAgICAgdGVhbXNCZXQ6IFt7dGVhbTogJ0VOQ0UnfSwge3RlYW06ICdIRVJPSUMnfSwge3RlYW06ICdTQVcnLCBvdXRjb21lOiB0cnVlfSwge3RlYW06ICdGVVJJQSd9LCB7dGVhbTogJ0tPSScsIG91dGNvbWU6IGZhbHNlfSwge3RlYW06ICdBTUtBTCd9LCB7dGVhbTogJ0xFR0FDWSd9XVxuICAgICAgICAvLyB9O1xuICAgICAgICAvLyByZWZyZXNoQmV0cyh1c2VyLm9wZW5pbmdCZXQsIHByb21vU3RhZ2VzWzBdKTtcbiAgICAgICAgLy8gcmVmcmVzaEJldHModXNlci5lbGltaW5hdGlvbkJldCwgcHJvbW9TdGFnZXNbMV0pO1xuICAgICAgICAvLyByZWZyZXNoQmV0cyh1c2VyLndpbm5lckJldCwgcHJvbW9TdGFnZXNbMl0pO1xuXG4gICAgICAgIC8vIGlmIChhY3RpdmVQaGFzZSAmJiBpc1ZhbGlkQmV0KHVzZXJJbmZvW2FjdGl2ZVBoYXNlLmJldEZpZWxkTmFtZV0pKSB7XG4gICAgICAgIC8vICAgICBwcmVkaWN0aW9uQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdibG9ja0J0bicpKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWRUcmFuc2xhdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgJHthcGlVUkx9L25ldy10cmFuc2xhdGVzLyR7bG9jYWxlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YSA9IGpzb247XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgdmFyIG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVnZW5kYXJ5LXRyb3BoeScpLCB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZSgpIHtcbiAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10cmFuc2xhdGVdJylcbiAgICAgICAgaWYodHJhbnNsYXRlU3RhdGUpe1xuICAgICAgICAgICAgZWxlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRyYW5zbGF0aW9uIHdvcmshXCIpXG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaExvY2FsaXplZENsYXNzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaExvY2FsaXplZENsYXNzKGVsZW1lbnQsIGJhc2VDc3NDbGFzcykge1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGxhbmcgb2YgWyd1aycsICdlbiddKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYmFzZUNzc0NsYXNzICsgbGFuZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGJhc2VDc3NDbGFzcyArIGxvY2FsZSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVxdWVzdCA9IGZ1bmN0aW9uIChsaW5rLCBleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGFwaVVSTCArIGxpbmssIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi4oZXh0cmFPcHRpb25zIHx8IHt9KVxuICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gZ2V0RGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHJlcXVlc3QoJy91c2Vycz9ub2NhY2hlPTEnKSxcbiAgICAgICAgXSlcbiAgICB9XG5cbiAgICBjb25zdCBJbml0UGFnZSA9ICgpID0+IHtcbiAgICAgICAgZ2V0RGF0YSgpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHVzZXJzID0gcmVzWzBdLnNvcnQoKGEsIGIpID0+IGIucG9pbnRzIC0gYS5wb2ludHMpO1xuICAgICAgICAgICAgLy8gdXNlcnMgPSB1c2Vycy5zbGljZSgwLCAxMClcbiAgICAgICAgICAgIHJlbmRlclVzZXJzKHVzZXJzKTtcbiAgICAgICAgICAgIC8vIHRyYW5zbGF0ZSgpO1xuICAgICAgICB9KVxuICAgICAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA8PSA1MDApe1xuICAgICAgICAgICAgdXBkYXRlQWN0aXZlU3RhZ2UocHJlZGljdENvbHVtbnMpO1xuICAgICAgICB9XG4gICAgICAgIHByZWRpY3RDb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgaSkgPT57XG4gICAgICAgICAgICBpZihpICsgMSA+IHRvdXJuYW1lbnRTdGFnZSl7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNsYXNzTGlzdC5hZGQoXCJfbG9ja1wiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoaSArIDEgPCB0b3VybmFtZW50U3RhZ2Upe1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jbGFzc0xpc3QuYWRkKFwiX2RvbmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldFByZWRpY3RDb2x1bW4oY29sdW1uKVxuICAgICAgICAgICAgaWYoY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcIl9sb2NrXCIpKXtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZWFtcyA9IGNvbHVtbi5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfX3RlYW0tbmFtZScpXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IGNvbHVtbi5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfX2Nob3NlLWRhdGUnKVxuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBjb2x1bW4ucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX19jaG9zZS10aW1lJylcbiAgICAgICAgICAgICAgICB0ZWFtcy5mb3JFYWNoKHRlYW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICB0ZWFtLnRleHRDb250ZW50ID0gXCLigJRcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgZGF0ZS5mb3JFYWNoKGRhdGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkYXRlLnRleHRDb250ZW50ID0gXCLigJRcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgdGltZS5mb3JFYWNoKHRpbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aW1lLnRleHRDb250ZW50ID0gXCLigJRcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG5cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuc3RvcmUpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHdpbmRvdy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgdXNlcklkID0gc3RhdGUuYXV0aC5pc0F1dGhvcml6ZWQgJiYgc3RhdGUuYXV0aC5pZCB8fCAnJztcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICAgICAgbGV0IGMgPSAwO1xuICAgICAgICAgICAgdmFyIGkgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISF3aW5kb3cuZ191c2VyX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQgPSB3aW5kb3cuZ191c2VyX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgfVxuICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG5cbiAgICAgICAgcGFydGljaXBhdGVCdG5zLmZvckVhY2goKGF1dGhCdG4sIGkpID0+IHtcbiAgICAgICAgICAgIGF1dGhCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnRpY2lwYXRlKCkge1xuICAgICAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0ge3VzZXJpZDogdXNlcklkfTtcblxuICAgICAgICByZXF1ZXN0KCcvdXNlcicsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBwYXJ0aWNpcGF0ZUJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgICAgIHlvdUFyZUluQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgcHJlZGljdGlvbkJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgIHBhcnRpY2lwYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlclVzZXJzKHVzZXJzKSB7XG4gICAgICAgIHBvcHVsYXRlVXNlcnNUYWJsZSh1c2VycywgdXNlcklkKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQpIHtcbiAgICAgICAgcmVzdWx0c1RhYmxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICByZXN1bHRzVGFibGVPdGhlci5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBpZiAoIXVzZXJzIHx8ICF1c2Vycy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBsZXQgdG9wVXNlcnMgPSB1c2Vycy5zbGljZSgwLCAyMCk7XG4gICAgICAgIHRvcFVzZXJzLmZvckVhY2godXNlciA9PiBkaXNwbGF5VXNlcih1c2VyLCB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCwgcmVzdWx0c1RhYmxlLCB1c2VycykpO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gdXNlcnMuZmluZCh1c2VyID0+IHVzZXIudXNlcmlkID09PSBjdXJyZW50VXNlcklkKTtcbiAgICAgICAgY29uc3QgY3VycmVudFVzZXJJbmRleCA9IGN1cnJlbnRVc2VyID8gdXNlcnMuaW5kZXhPZihjdXJyZW50VXNlcikgOiAtMTtcblxuICAgICAgICBpZiAoY3VycmVudFVzZXJJbmRleCA+PSAxMCkge1xuICAgICAgICAgICAgbGV0IG90aGVyVXNlcnMgPSB1c2Vycy5zbGljZShNYXRoLm1heCgxMCwgY3VycmVudFVzZXJJbmRleCAtIDEpLCBjdXJyZW50VXNlckluZGV4ICsgMik7XG4gICAgICAgICAgICBvdGhlclVzZXJzLmZvckVhY2godXNlciA9PiBkaXNwbGF5VXNlcih1c2VyLCB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCwgcmVzdWx0c1RhYmxlT3RoZXIsIHVzZXJzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNwbGF5VXNlcih1c2VyLCBpc0N1cnJlbnRVc2VyLCB0YWJsZSwgYWxsVXNlcnMpIHtcbiAgICAgICAgY29uc3QgYWRkaXRpb25hbFVzZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgndGFibGVSZXN1bHRzX19yb3cnKTtcblxuXG5cbiAgICAgICAgY29uc3QgcGxhY2UgPSBhbGxVc2Vycy5pbmRleE9mKHVzZXIpICsgMTtcbiAgICAgICAgY29uc3QgcHJpemVQbGFjZUNzcyA9IFBSSVpFU19DU1NbcGxhY2UgLSAxXTtcbiAgICAgICAgaWYgKHByaXplUGxhY2VDc3MpIHtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQocHJpemVQbGFjZUNzcyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcml6ZUtleSA9IGdldFByaXplVHJhbnNsYXRpb25LZXkocGxhY2UpO1xuICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHtwbGFjZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke2lzQ3VycmVudFVzZXIgPyB1c2VyLnVzZXJpZCA6IG1hc2tVc2VySWQodXNlci51c2VyaWQpfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19yb3ctaXRlbVwiPiR7dXNlci5wb2ludHN9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHt1c2VyLm11bHRpcGxpZXJ9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHt1c2VyLnRvdGFsUG9pbnRzfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19yb3ctaXRlbVwiPiR7cHJpemVLZXkgPyB0cmFuc2xhdGVLZXkocHJpemVLZXkpIDogJyAtICd9PC9kaXY+XG4gICAgYDtcbiAgICAgICAgaWYgKGlzQ3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHlvdUJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB5b3VCbG9jay5zZXRBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJywgJ3lvdScpO1xuICAgICAgICAgICAgeW91QmxvY2sudGV4dENvbnRlbnQgPSBcItCi0LhcIiAvLyDQtNC70Y8g0YLQtdGB0YLRgyDQv9C+0LrQuCDQvdC10LzQsCDRgtGA0LDQvdGB0LvQtdC50YLRltCyXG4gICAgICAgICAgICB5b3VCbG9jay5jbGFzc0xpc3QuYWRkKCdfeW91cicpO1xuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuYXBwZW5kKHlvdUJsb2NrKVxuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZChcIl95b3VyXCIpXG5cbiAgICAgICAgfVxuICAgICAgICB0YWJsZS5hcHBlbmQoYWRkaXRpb25hbFVzZXJSb3cpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtYXNrVXNlcklkKHVzZXJJZCkge1xuICAgICAgICByZXR1cm4gXCIqKlwiICsgdXNlcklkLnRvU3RyaW5nKCkuc2xpY2UoMik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlS2V5KGtleSkge1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5KHBsYWNlKSB7XG4gICAgICAgIGlmIChwbGFjZSA8PSA1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXyR7cGxhY2V9YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzYtMTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTEtMjBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMjEtMzVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMzYtNTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNTEtNzVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzc2LTEwMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMjUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTAxLTEyNWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxNTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTI2LTE1MGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTUxLTE3NWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAyMDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTc2LTIwMGBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHBvcHVwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5mb19faXRlbS1idG5cIilcbiAgICBjb25zdCBwb3B1cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmluZm9fX2l0ZW0tcG9wdXBcIilcblxuXG4gICAgcG9wdXBzLmZvckVhY2goKHBvcHVwLCBpKSA9PntcbiAgICAgICAgaWYoaSA9PT0gMCl7XG4gICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFwiX2xlZnRcIilcbiAgICAgICAgfVxuICAgICAgICBpZihpID09PSBwb3B1cHMubGVuZ3RoIC0gMSl7XG4gICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFwiX3JpZ2h0XCIpXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2xvc2UgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX2l0ZW0tcG9wdXAtY2xvc2VcIilcbiAgICAgICAgY29uc3Qgb3BlbiA9IHBvcHVwLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi5pbmZvX19pdGVtLWJ0blwiKVxuICAgICAgICBzZXRQb3B1cChvcGVuLCBjbG9zZSwgcG9wdXApXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIHNldFBvcHVwKG9wZW4sIGNsb3NlLCBwb3B1cCl7XG4gICAgICAgIG9wZW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcIm9wYWNpdHlcIilcbiAgICAgICAgfSlcbiAgICAgICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZChcIm9wYWNpdHlcIilcbiAgICAgICAgfSlcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgIGlmKCFwb3B1cC5jb250YWlucyhlLnRhcmdldCkgJiYgZS50YXJnZXQgIT09IG9wZW4pe1xuICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJvcGFjaXR5XCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICB0YWJzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3VybmFtZW50U3RhZ2U7IGkrKykge1xuICAgICAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGFiLmNsYXNzTGlzdC5hZGQoJ3Jlc3VsdHNfX3RhYi1pdGVtJyk7XG4gICAgICAgIHRhYnNDb250YWluZXIuYXBwZW5kQ2hpbGQodGFiKTtcbiAgICB9XG5cbiAgICBjb25zdCB0YWJsZU5hdlRhYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmVzdWx0c19fdGFiLWl0ZW1cIik7XG5cbiAgICB0YWJsZU5hdi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgaWYoaSArIDEgPiB0b3VybmFtZW50U3RhZ2Upe1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiX2xvY2tcIilcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGkgKyAxLCB0b3VybmFtZW50U3RhZ2UpXG5cbiAgICAgICAgaWYoaSArIDEgPT09IHRvdXJuYW1lbnRTdGFnZSl7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgIH1cblxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJfbG9ja1wiKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWJsZU5hdi5mb3JFYWNoKG5hdiA9PntcbiAgICAgICAgICAgICAgICBuYXYuY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICB9KVxuICAgIH0pXG4gICAgdGFibGVOYXZUYWIuZm9yRWFjaCgoaXRlbSwgaSkgPT57XG4gICAgICAgIGlmKGkgKyAxID09PSB0b3VybmFtZW50U3RhZ2Upe1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHRhYmxlVGFiID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX190YWItaXRlbScpXG5cbiAgICB0YWJsZVRhYi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgaWYoaSArIDEgPT09IHRvdXJuYW1lbnRTdGFnZSl7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgIH1cbiAgICB9KVxuXG5cbiAgICBmdW5jdGlvbiBhY3RpdmF0ZVNlbGVjdGVkVGVhbXMoc3RvcmVkUHJlZGljdERhdGEpIHtcblxuICAgICAgICAvLyDQn9GA0L7RhdC+0LTQuNC80L7RgdGPINC/0L4g0LLRgdGW0YUg0LXQu9C10LzQtdC90YLQsNGFIHByZWRpY3REYXRhXG4gICAgICAgIHN0b3JlZFByZWRpY3REYXRhLmZvckVhY2goZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHN0YWdlLCB0ZWFtIH0gPSBkYXRhO1xuXG4gICAgICAgICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0LLRgdGWINC60L7Qu9C+0L3QutC4LCDRj9C60ZYg0LLRltC00L/QvtCy0ZbQtNCw0Y7RgtGMINC00LDQvdC+0LzRgyDQtdGC0LDQv9GDIChzdGFnZSlcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtnZXRTdGFnZUNsYXNzKHN0YWdlKX1gKTtcblxuICAgICAgICAgICAgY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICAgICAgLy8g0JfQvdCw0YXQvtC00LjQvNC+INCy0YHRliDQsdC70L7QutC4INC3INC60L7QvNCw0L3QtNCw0LzQuCDQsiDRhtGW0Lkg0LrQvtC70L7QvdGG0ZZcbiAgICAgICAgICAgICAgICBjb25zdCB0ZWFtQmxvY2tzID0gY29sdW1uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2Nob3NlXCIpO1xuXG4gICAgICAgICAgICAgICAgdGVhbUJsb2Nrcy5mb3JFYWNoKGJsb2NrID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8g0JfQvdCw0YXQvtC00LjQvNC+INCy0YHRliDRgNCw0LTRltC+0LrQvdC+0L/QutC4INGC0LAg0L3QsNC30LLQuCDQutC+0LzQsNC90LQg0LIg0YbRjNC+0LzRgyDQsdC70L7QutGDXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRlYW1SYWRpb3MgPSBibG9jay5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX190ZWFtLXJhZGlvXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZWFtcyA9IGJsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX3RlYW0tbmFtZVwiKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyDQn9GA0L7RhdC+0LTQuNC80L7RgdGPINC/0L4g0LLRgdGW0YUg0LrQvtC80LDQvdC00LDRhSDQsiDQsdC70L7QutGDXG4gICAgICAgICAgICAgICAgICAgIHRlYW1zLmZvckVhY2goKHRlYW1FbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0K/QutGJ0L4g0L3QsNC30LLQsCDQutC+0LzQsNC90LTQuCDRgdC/0ZbQstC/0LDQtNCw0ZQg0Lcg0LLQuNCx0YDQsNC90L7RjiDQutC+0LzQsNC90LTQvtGOINC3IHByZWRpY3REYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVhbUVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpID09PSB0ZWFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g0JDQutGC0LjQstGD0ZTQvNC+INCy0ZbQtNC/0L7QstGW0LTQvdGDINGA0LDQtNGW0L7QutC90L7Qv9C60YNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZWFtUmFkaW9zW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4vLyDQlNC+0L/QvtC80ZbQttC90LAg0YTRg9C90LrRhtGW0Y8g0LTQu9GPINC+0YLRgNC40LzQsNC90L3RjyDQutC70LDRgdGDINC10YLQsNC/0YMg0L3QsCDQvtGB0L3QvtCy0ZYg0LnQvtCz0L4g0L3QsNC30LLQuFxuICAgIGZ1bmN0aW9uIGdldFN0YWdlQ2xhc3Moc3RhZ2UpIHtcbiAgICAgICAgc3dpdGNoIChzdGFnZSkge1xuICAgICAgICAgICAgY2FzZSBcIk9wZW5pbmcgU3RhZ2VcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFnZTEtOFwiO1xuICAgICAgICAgICAgY2FzZSBcIlF1YXJ0ZXJmaW5hbHNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFnZTEtNFwiO1xuICAgICAgICAgICAgY2FzZSBcIlNlbWlmaW5hbHNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFnZTEtMlwiO1xuICAgICAgICAgICAgY2FzZSBcIkZpbmFsXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RhZ2UtZmluYWxcIjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiBhY3RpdmF0ZVNlbGVjdGVkVGVhbXMocHJlZGljdERhdGEpKTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxvY2FsU3RvcmFnZSgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcmVkaWN0RGF0YVwiLCBKU09OLnN0cmluZ2lmeShwcmVkaWN0RGF0YSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRlYW1OYW1lKHRlYW1CbG9jaywgc3RhZ2UsIGNvbHVtbikge1xuICAgICAgICBpZihjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiX2RvbmVcIikgfHwgY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcIl9hY3RpdmVcIikpe1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGVhbVJhZGlvcyA9IHRlYW1CbG9jay5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX190ZWFtLXJhZGlvXCIpO1xuICAgICAgICBjb25zdCB0ZWFtcyA9IHRlYW1CbG9jay5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX190ZWFtLW5hbWVcIik7XG5cbiAgICAgICAgdGVhbVJhZGlvcy5mb3JFYWNoKChyYWRpbywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRlYW1SYWRpb3MuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIikpXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRlYW0gPSB0ZWFtc1tpbmRleF0udGV4dENvbnRlbnQudHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgLy8g0JLQuNC00LDQu9GP0ZTQvNC+INC/0L7Qv9C10YDQtdC00L3RjiDQutC+0LzQsNC90LTRgyDQtyDRhtGM0L7Qs9C+INCx0LvQvtC60YNcbiAgICAgICAgICAgICAgICBwcmVkaWN0RGF0YSA9IHByZWRpY3REYXRhLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uc3RhZ2UgIT09IHN0YWdlKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIUFycmF5LmZyb20odGVhbXMpLnNvbWUodGVhbSA9PiB0ZWFtLnRleHRDb250ZW50LnRyaW0oKSA9PT0gaXRlbS50ZWFtKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vINCU0L7QtNCw0ZTQvNC+INC90L7QstGDINC60L7QvNCw0L3QtNGDXG4gICAgICAgICAgICAgICAgcHJlZGljdERhdGEucHVzaCh7IHN0YWdlOiBzdGFnZSwgdGVhbTogc2VsZWN0ZWRUZWFtIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8g0J7QvdC+0LLQu9GO0ZTQvNC+IGxvY2FsU3RvcmFnZVxuICAgICAgICAgICAgICAgIHVwZGF0ZUxvY2FsU3RvcmFnZSgpO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHJlZGljdERhdGEpOyAvLyDQn9C10YDQtdCy0ZbRgNGP0ZTQvNC+LCDRh9C4INC/0YDQsNCy0LjQu9GM0L3QviDQv9GA0LDRhtGO0ZRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHNldFByZWRpY3RDb2x1bW4oY29sdW1uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJfbG9ja1wiKSApXG4gICAgICAgIGxldCBzdGFnZSA9IFwiXCJcblxuICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwic3RhZ2UxLThcIikgPyBzdGFnZSA9IFwiT3BlbmluZyBTdGFnZVwiIDogbnVsbDtcbiAgICAgICAgY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcInN0YWdlMS00XCIpID8gc3RhZ2UgPSBcIlF1YXJ0ZXJmaW5hbHNcIiA6IG51bGw7XG4gICAgICAgIGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJzdGFnZTEtMlwiKSA/IHN0YWdlID0gXCJTZW1pZmluYWxzXCIgOiBudWxsO1xuICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwic3RhZ2UtZmluYWxcIikgPyBzdGFnZSA9IFwiRmluYWxcIiA6IG51bGw7XG5cbiAgICAgICAgY29uc3QgdGVhbUJsb2NrcyA9IGNvbHVtbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19jaG9zZVwiKTtcblxuICAgICAgICB0ZWFtQmxvY2tzLmZvckVhY2goYmxvY2sgPT4gZ2V0VGVhbU5hbWUoYmxvY2ssIHN0YWdlLCBjb2x1bW4pKTtcblxuXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiB1cGRhdGVBY3RpdmVTdGFnZShzdGFnZXMpIHtcbiAgICAgICAgc3RhZ2VzLmZvckVhY2goKHN0YWdlLCBpbmRleCkgPT4ge1xuXG4gICAgICAgICAgICBzdGFnZS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgaWYoaW5kZXggPT09IGNvbHVtbkluZGV4KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNhZGFzXCIpXG4gICAgICAgICAgICAgICAgc3RhZ2UuY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbW92ZUxlZnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgaWYgKGNvbHVtbkluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGNvbHVtbkluZGV4LS07XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVTdGFnZShwcmVkaWN0Q29sdW1ucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbHVtbkluZGV4IDwgMCkge1xuICAgICAgICAgICAgY29sdW1uSW5kZXggPSBwcmVkaWN0Q29sdW1ucy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgdXBkYXRlQWN0aXZlU3RhZ2UocHJlZGljdENvbHVtbnMpO1xuICAgICAgICAgICAgdGFibGVUYWIuZm9yRWFjaCgoaXRlbSwgaSkgPT57XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGlmKGkgKyAxID09PSBjb2x1bW5JbmRleCl7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHRhYmxlVGFiLmZvckVhY2goKGl0ZW0sIGkpID0+e1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgaWYoaSA9PT0gY29sdW1uSW5kZXgpe1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTtcblxuICAgIG1vdmVSaWdodC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoY29sdW1uSW5kZXggPCBwcmVkaWN0Q29sdW1ucy5sZW5ndGggLSAxIHx8IGNvbHVtbkluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGNvbHVtbkluZGV4Kys7XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVTdGFnZShwcmVkaWN0Q29sdW1ucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoY29sdW1uSW5kZXggPT09IHByZWRpY3RDb2x1bW5zLmxlbmd0aCl7XG4gICAgICAgICAgICBjb2x1bW5JbmRleCA9IDBcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZVN0YWdlKHByZWRpY3RDb2x1bW5zKTtcbiAgICAgICAgfVxuICAgICAgICB0YWJsZVRhYi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIGlmKGkgPT09IGNvbHVtbkluZGV4KXtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICBtb3ZlTGVmdFJlc3VsdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoY29sdW1uSW5kZXggPiAwKSB7XG4gICAgICAgICAgICBjb2x1bW5JbmRleC0tO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sdW1uSW5kZXggPSB0YWJzUmVzdWx0Lmxlbmd0aCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdXBkYXRlQWN0aXZlU3RhZ2UodGFic1Jlc3VsdCk7XG4gICAgICAgIHRhYmxlTmF2LmZvckVhY2goKGl0ZW0sIGkpID0+e1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgaWYoY29sdW1uSW5kZXggPCAxKXtcbiAgICAgICAgICAgICAgICBjb2x1bW5JbmRleCA9IHRvdXJuYW1lbnRTdGFnZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihpICsgMSA9PT0gY29sdW1uSW5kZXgpe1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgICAgICB0YWJsZU5hdlRhYi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIGlmKGkgKyAxID09PSBjb2x1bW5JbmRleCl7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pO1xuXG4gICAgbW92ZVJpZ2h0UmVzdWx0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChjb2x1bW5JbmRleCA8IHRhYnNSZXN1bHQubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgY29sdW1uSW5kZXgrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbHVtbkluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0YWJsZU5hdi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIGlmKGNvbHVtbkluZGV4ID4gdG91cm5hbWVudFN0YWdlKXtcbiAgICAgICAgICAgICAgICBjb2x1bW5JbmRleCA9IDFcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoaSArIDEgPT09IGNvbHVtbkluZGV4KXtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICAgICAgdGFibGVOYXZUYWIuZm9yRWFjaCgoaXRlbSwgaSkgPT57XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICBpZihpICsgMSA9PT0gY29sdW1uSW5kZXgpe1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTtcblxuICAgIGxvYWRUcmFuc2xhdGlvbnMoKVxuICAgICAgICAudGhlbihpbml0KTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGFyay1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBjb25zb2xlLmxvZygnZGFzZGFzJylcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwiZGFya1wiKVxuICAgIH0pXG5cblxufSkoKVxuXG4iXX0=

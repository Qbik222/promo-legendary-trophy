"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
(function () {
  var apiURL = 'https://fav-prom.com/api_shanghai';
  var resultsTable = document.querySelector('#results-table');
  var resultsTableHead = resultsTable.querySelector('.tableResults__head');
  var topResultsTable = document.querySelector('#top-users');
  var resultsTableOther = document.querySelector('#results-table-other');
  var tableNav = document.querySelectorAll(".results__nav-item");
  var predictColumns = document.querySelectorAll(".table__column");
  var moveLeft = document.querySelector(".table__move-left");
  var moveRight = document.querySelector(".table__move-right");
  var moveLeftResult = document.querySelector(".results__move-left");
  var moveRightResult = document.querySelector(".results__move-right");
  var tabsResult = document.querySelectorAll(".results__tab-item");
  var tabsContainer = document.querySelector('.results__tab');
  var tournamentStage = 2;
  var columnIndex = tournamentStage - 1;
  var locale = 'en';
  var users;
  var i18nData = {};
  var userId;
  userId = 100300268;
  var PRIZES_CSS = ['place1', 'place2', 'place3'];
  var predictData = JSON.parse(localStorage.getItem("predictData")) || [];
  console.log(predictData);
  function loadTranslations() {
    return fetch("".concat(apiURL, "/translates/").concat(locale)).then(function (res) {
      return res.json();
    }).then(function (json) {
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
    var elems = document.querySelectorAll('[data-translate]');
    if (elems && elems.length) {
      elems.forEach(function (elem) {
        var key = elem.getAttribute('data-translate');
        elem.innerHTML = i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
        elem.removeAttribute('data-translate');
      });
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
            // checkUserAuth();
            clearInterval(i);
          }
        } else {
          clearInterval(i);
        }
      }, 200);
    }
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
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwicmVzdWx0c1RhYmxlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicmVzdWx0c1RhYmxlSGVhZCIsInRvcFJlc3VsdHNUYWJsZSIsInJlc3VsdHNUYWJsZU90aGVyIiwidGFibGVOYXYiLCJxdWVyeVNlbGVjdG9yQWxsIiwicHJlZGljdENvbHVtbnMiLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsIm1vdmVMZWZ0UmVzdWx0IiwibW92ZVJpZ2h0UmVzdWx0IiwidGFic1Jlc3VsdCIsInRhYnNDb250YWluZXIiLCJ0b3VybmFtZW50U3RhZ2UiLCJjb2x1bW5JbmRleCIsImxvY2FsZSIsInVzZXJzIiwiaTE4bkRhdGEiLCJ1c2VySWQiLCJQUklaRVNfQ1NTIiwicHJlZGljdERhdGEiLCJKU09OIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiY29uc29sZSIsImxvZyIsImxvYWRUcmFuc2xhdGlvbnMiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJqc29uIiwidHJhbnNsYXRlIiwiZWxlbXMiLCJsZW5ndGgiLCJmb3JFYWNoIiwiZWxlbSIsImtleSIsImdldEF0dHJpYnV0ZSIsImlubmVySFRNTCIsInJlbW92ZUF0dHJpYnV0ZSIsInJlZnJlc2hMb2NhbGl6ZWRDbGFzcyIsImVsZW1lbnQiLCJiYXNlQ3NzQ2xhc3MiLCJsYW5nIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwicmVxdWVzdCIsImxpbmsiLCJleHRyYU9wdGlvbnMiLCJoZWFkZXJzIiwiZ2V0RGF0YSIsIlByb21pc2UiLCJhbGwiLCJJbml0UGFnZSIsInNvcnQiLCJhIiwiYiIsInBvaW50cyIsInJlbmRlclVzZXJzIiwid2luZG93IiwiaW5uZXJXaWR0aCIsInVwZGF0ZUFjdGl2ZVN0YWdlIiwiY29sdW1uIiwiaSIsInNldFByZWRpY3RDb2x1bW4iLCJjb250YWlucyIsInRlYW1zIiwiZGF0ZSIsInRpbWUiLCJ0ZWFtIiwidGV4dENvbnRlbnQiLCJpbml0Iiwic3RvcmUiLCJzdGF0ZSIsImdldFN0YXRlIiwiYXV0aCIsImlzQXV0aG9yaXplZCIsImlkIiwiYyIsInNldEludGVydmFsIiwiZ191c2VyX2lkIiwiY2xlYXJJbnRlcnZhbCIsInBvcHVsYXRlVXNlcnNUYWJsZSIsImN1cnJlbnRVc2VySWQiLCJ0b3BVc2VycyIsInNsaWNlIiwidXNlciIsImRpc3BsYXlVc2VyIiwidXNlcmlkIiwiY3VycmVudFVzZXIiLCJmaW5kIiwiY3VycmVudFVzZXJJbmRleCIsImluZGV4T2YiLCJvdGhlclVzZXJzIiwiTWF0aCIsIm1heCIsImlzQ3VycmVudFVzZXIiLCJ0YWJsZSIsImFsbFVzZXJzIiwiYWRkaXRpb25hbFVzZXJSb3ciLCJjcmVhdGVFbGVtZW50IiwicGxhY2UiLCJwcml6ZVBsYWNlQ3NzIiwicHJpemVLZXkiLCJnZXRQcml6ZVRyYW5zbGF0aW9uS2V5IiwibWFza1VzZXJJZCIsIm11bHRpcGxpZXIiLCJ0b3RhbFBvaW50cyIsInRyYW5zbGF0ZUtleSIsInlvdUJsb2NrIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kIiwidG9TdHJpbmciLCJwb3B1cEJ0bnMiLCJwb3B1cHMiLCJwb3B1cCIsImNsb3NlIiwib3BlbiIsInBhcmVudE5vZGUiLCJzZXRQb3B1cCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidGFyZ2V0IiwidGFiIiwiYXBwZW5kQ2hpbGQiLCJ0YWJsZU5hdlRhYiIsIml0ZW0iLCJuYXYiLCJ0YWJsZVRhYiIsImFjdGl2YXRlU2VsZWN0ZWRUZWFtcyIsInN0b3JlZFByZWRpY3REYXRhIiwiZGF0YSIsInN0YWdlIiwiY29sdW1ucyIsImdldFN0YWdlQ2xhc3MiLCJ0ZWFtQmxvY2tzIiwiYmxvY2siLCJ0ZWFtUmFkaW9zIiwidGVhbUVsZW1lbnQiLCJpbmRleCIsInRyaW0iLCJ1cGRhdGVMb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiZ2V0VGVhbU5hbWUiLCJ0ZWFtQmxvY2siLCJyYWRpbyIsInNlbGVj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LElBQUksQ0FBQ25GLFNBQVMsQ0FBQ0UsR0FBRyxDQUFDLFNBQVMsQ0FBQztNQUNqQztJQUNKLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztFQUVGcEIsZ0JBQWdCLEVBQUUsQ0FDYkUsSUFBSSxDQUFDNEMsSUFBSSxDQUFDO0FBRW5CLENBQUMsR0FBRyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpe1xuICAgIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL2Zhdi1wcm9tLmNvbS9hcGlfc2hhbmdoYWknO1xuICAgIGNvbnN0IHJlc3VsdHNUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN1bHRzLXRhYmxlJyk7XG4gICAgY29uc3QgcmVzdWx0c1RhYmxlSGVhZCA9IHJlc3VsdHNUYWJsZS5xdWVyeVNlbGVjdG9yKCcudGFibGVSZXN1bHRzX19oZWFkJyk7XG4gICAgY29uc3QgdG9wUmVzdWx0c1RhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvcC11c2VycycpO1xuICAgIGNvbnN0IHJlc3VsdHNUYWJsZU90aGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHMtdGFibGUtb3RoZXInKTtcbiAgICBjb25zdCB0YWJsZU5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmVzdWx0c19fbmF2LWl0ZW1cIik7XG4gICAgY29uc3QgcHJlZGljdENvbHVtbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19jb2x1bW5cIik7XG4gICAgY29uc3QgbW92ZUxlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlX19tb3ZlLWxlZnRcIik7XG4gICAgY29uc3QgbW92ZVJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZV9fbW92ZS1yaWdodFwiKTtcbiAgICBjb25zdCBtb3ZlTGVmdFJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzdWx0c19fbW92ZS1sZWZ0XCIpO1xuICAgIGNvbnN0IG1vdmVSaWdodFJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzdWx0c19fbW92ZS1yaWdodFwiKTtcbiAgICBjb25zdCB0YWJzUmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yZXN1bHRzX190YWItaXRlbVwiKTtcbiAgICBjb25zdCB0YWJzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdHNfX3RhYicpXG5cblxuICAgIGxldCB0b3VybmFtZW50U3RhZ2UgPSAyXG5cbiAgICBsZXQgY29sdW1uSW5kZXggPSB0b3VybmFtZW50U3RhZ2UgLSAxXG5cblxuXG4gICAgbGV0IGxvY2FsZSA9ICdlbic7XG4gICAgbGV0IHVzZXJzO1xuICAgIGxldCBpMThuRGF0YSA9IHt9O1xuICAgIGxldCB1c2VySWQ7XG4gICAgdXNlcklkID0gMTAwMzAwMjY4O1xuXG4gICAgY29uc3QgUFJJWkVTX0NTUyA9IFsncGxhY2UxJywgJ3BsYWNlMicsICdwbGFjZTMnXTtcblxuXG5cbiAgICBsZXQgcHJlZGljdERhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJlZGljdERhdGFcIikpIHx8IFtdO1xuICAgIGNvbnNvbGUubG9nKHByZWRpY3REYXRhKVxuICAgIGZ1bmN0aW9uIGxvYWRUcmFuc2xhdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgJHthcGlVUkx9L3RyYW5zbGF0ZXMvJHtsb2NhbGV9YCkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKGpzb24gPT4ge1xuICAgICAgICAgICAgICAgIGkxOG5EYXRhID0ganNvbjtcbiAgICAgICAgICAgICAgICAvLyB0cmFuc2xhdGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIHZhciBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICAgICAgICAgIC8vICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICAvLyBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nwb3J0VG91cicpLCB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAvLyAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKCkge1xuICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKVxuICAgICAgICBpZiAoZWxlbXMgJiYgZWxlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhlbGVtZW50LCBiYXNlQ3NzQ2xhc3MpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBsYW5nIG9mIFsndWsnLCAnZW4nXSkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGJhc2VDc3NDbGFzcyArIGxhbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChiYXNlQ3NzQ2xhc3MgKyBsb2NhbGUpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3QgPSBmdW5jdGlvbiAobGluaywgZXh0cmFPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChhcGlVUkwgKyBsaW5rLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uKGV4dHJhT3B0aW9ucyB8fCB7fSlcbiAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGdldERhdGEoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICByZXF1ZXN0KCcvdXNlcnM/bm9jYWNoZT0xJyksXG4gICAgICAgIF0pXG4gICAgfVxuXG4gICAgY29uc3QgSW5pdFBhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGdldERhdGEoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB1c2VycyA9IHJlc1swXS5zb3J0KChhLCBiKSA9PiBiLnBvaW50cyAtIGEucG9pbnRzKTtcbiAgICAgICAgICAgIC8vIHVzZXJzID0gdXNlcnMuc2xpY2UoMCwgMTApXG4gICAgICAgICAgICByZW5kZXJVc2Vycyh1c2Vycyk7XG4gICAgICAgICAgICAvLyB0cmFuc2xhdGUoKTtcbiAgICAgICAgfSlcbiAgICAgICAgaWYod2luZG93LmlubmVyV2lkdGggPD0gNTAwKXtcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZVN0YWdlKHByZWRpY3RDb2x1bW5zKTtcbiAgICAgICAgfVxuICAgICAgICBwcmVkaWN0Q29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGkpID0+e1xuICAgICAgICAgICAgaWYoaSArIDEgPiB0b3VybmFtZW50U3RhZ2Upe1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jbGFzc0xpc3QuYWRkKFwiX2xvY2tcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGkgKyAxIDwgdG91cm5hbWVudFN0YWdlKXtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmFkZChcIl9kb25lXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRQcmVkaWN0Q29sdW1uKGNvbHVtbilcbiAgICAgICAgICAgIGlmKGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJfbG9ja1wiKSl7XG4gICAgICAgICAgICAgICAgY29uc3QgdGVhbXMgPSBjb2x1bW4ucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX190ZWFtLW5hbWUnKVxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBjb2x1bW4ucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX19jaG9zZS1kYXRlJylcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lID0gY29sdW1uLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9fY2hvc2UtdGltZScpXG4gICAgICAgICAgICAgICAgdGVhbXMuZm9yRWFjaCh0ZWFtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGVhbS50ZXh0Q29udGVudCA9IFwi4oCUXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGRhdGUuZm9yRWFjaChkYXRlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZS50ZXh0Q29udGVudCA9IFwi4oCUXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRpbWUuZm9yRWFjaCh0aW1lID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGltZS50ZXh0Q29udGVudCA9IFwi4oCUXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuc3RvcmUpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHdpbmRvdy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgdXNlcklkID0gc3RhdGUuYXV0aC5pc0F1dGhvcml6ZWQgJiYgc3RhdGUuYXV0aC5pZCB8fCAnJztcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICAgICAgbGV0IGMgPSAwO1xuICAgICAgICAgICAgdmFyIGkgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISF3aW5kb3cuZ191c2VyX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQgPSB3aW5kb3cuZ191c2VyX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH19XG5cblxuICAgIGZ1bmN0aW9uIHJlbmRlclVzZXJzKHVzZXJzKSB7XG4gICAgICAgIHBvcHVsYXRlVXNlcnNUYWJsZSh1c2VycywgdXNlcklkKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQpIHtcbiAgICAgICAgcmVzdWx0c1RhYmxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICByZXN1bHRzVGFibGVPdGhlci5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBpZiAoIXVzZXJzIHx8ICF1c2Vycy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBsZXQgdG9wVXNlcnMgPSB1c2Vycy5zbGljZSgwLCAyMCk7XG4gICAgICAgIHRvcFVzZXJzLmZvckVhY2godXNlciA9PiBkaXNwbGF5VXNlcih1c2VyLCB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCwgcmVzdWx0c1RhYmxlLCB1c2VycykpO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gdXNlcnMuZmluZCh1c2VyID0+IHVzZXIudXNlcmlkID09PSBjdXJyZW50VXNlcklkKTtcbiAgICAgICAgY29uc3QgY3VycmVudFVzZXJJbmRleCA9IGN1cnJlbnRVc2VyID8gdXNlcnMuaW5kZXhPZihjdXJyZW50VXNlcikgOiAtMTtcblxuICAgICAgICBpZiAoY3VycmVudFVzZXJJbmRleCA+PSAxMCkge1xuICAgICAgICAgICAgbGV0IG90aGVyVXNlcnMgPSB1c2Vycy5zbGljZShNYXRoLm1heCgxMCwgY3VycmVudFVzZXJJbmRleCAtIDEpLCBjdXJyZW50VXNlckluZGV4ICsgMik7XG4gICAgICAgICAgICBvdGhlclVzZXJzLmZvckVhY2godXNlciA9PiBkaXNwbGF5VXNlcih1c2VyLCB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCwgcmVzdWx0c1RhYmxlT3RoZXIsIHVzZXJzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNwbGF5VXNlcih1c2VyLCBpc0N1cnJlbnRVc2VyLCB0YWJsZSwgYWxsVXNlcnMpIHtcbiAgICAgICAgY29uc3QgYWRkaXRpb25hbFVzZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgndGFibGVSZXN1bHRzX19yb3cnKTtcblxuXG5cbiAgICAgICAgY29uc3QgcGxhY2UgPSBhbGxVc2Vycy5pbmRleE9mKHVzZXIpICsgMTtcbiAgICAgICAgY29uc3QgcHJpemVQbGFjZUNzcyA9IFBSSVpFU19DU1NbcGxhY2UgLSAxXTtcbiAgICAgICAgaWYgKHByaXplUGxhY2VDc3MpIHtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQocHJpemVQbGFjZUNzcyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcml6ZUtleSA9IGdldFByaXplVHJhbnNsYXRpb25LZXkocGxhY2UpO1xuICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHtwbGFjZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke2lzQ3VycmVudFVzZXIgPyB1c2VyLnVzZXJpZCA6IG1hc2tVc2VySWQodXNlci51c2VyaWQpfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19yb3ctaXRlbVwiPiR7dXNlci5wb2ludHN9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHt1c2VyLm11bHRpcGxpZXJ9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHt1c2VyLnRvdGFsUG9pbnRzfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19yb3ctaXRlbVwiPiR7cHJpemVLZXkgPyB0cmFuc2xhdGVLZXkocHJpemVLZXkpIDogJyAtICd9PC9kaXY+XG4gICAgYDtcbiAgICAgICAgaWYgKGlzQ3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHlvdUJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB5b3VCbG9jay5zZXRBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJywgJ3lvdScpO1xuICAgICAgICAgICAgeW91QmxvY2sudGV4dENvbnRlbnQgPSBcItCi0LhcIiAvLyDQtNC70Y8g0YLQtdGB0YLRgyDQv9C+0LrQuCDQvdC10LzQsCDRgtGA0LDQvdGB0LvQtdC50YLRltCyXG4gICAgICAgICAgICB5b3VCbG9jay5jbGFzc0xpc3QuYWRkKCdfeW91cicpO1xuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuYXBwZW5kKHlvdUJsb2NrKVxuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZChcIl95b3VyXCIpXG5cbiAgICAgICAgfVxuICAgICAgICB0YWJsZS5hcHBlbmQoYWRkaXRpb25hbFVzZXJSb3cpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtYXNrVXNlcklkKHVzZXJJZCkge1xuICAgICAgICByZXR1cm4gXCIqKlwiICsgdXNlcklkLnRvU3RyaW5nKCkuc2xpY2UoMik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlS2V5KGtleSkge1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5KHBsYWNlKSB7XG4gICAgICAgIGlmIChwbGFjZSA8PSA1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXyR7cGxhY2V9YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzYtMTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTEtMjBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMjEtMzVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMzYtNTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNTEtNzVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzc2LTEwMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMjUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTAxLTEyNWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxNTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTI2LTE1MGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTUxLTE3NWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAyMDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTc2LTIwMGBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHBvcHVwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5mb19faXRlbS1idG5cIilcbiAgICBjb25zdCBwb3B1cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmluZm9fX2l0ZW0tcG9wdXBcIilcblxuXG4gICAgcG9wdXBzLmZvckVhY2goKHBvcHVwLCBpKSA9PntcbiAgICAgICAgaWYoaSA9PT0gMCl7XG4gICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFwiX2xlZnRcIilcbiAgICAgICAgfVxuICAgICAgICBpZihpID09PSBwb3B1cHMubGVuZ3RoIC0gMSl7XG4gICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFwiX3JpZ2h0XCIpXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2xvc2UgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX2l0ZW0tcG9wdXAtY2xvc2VcIilcbiAgICAgICAgY29uc3Qgb3BlbiA9IHBvcHVwLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi5pbmZvX19pdGVtLWJ0blwiKVxuICAgICAgICBzZXRQb3B1cChvcGVuLCBjbG9zZSwgcG9wdXApXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIHNldFBvcHVwKG9wZW4sIGNsb3NlLCBwb3B1cCl7XG4gICAgICAgIG9wZW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcIm9wYWNpdHlcIilcbiAgICAgICAgfSlcbiAgICAgICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZChcIm9wYWNpdHlcIilcbiAgICAgICAgfSlcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgIGlmKCFwb3B1cC5jb250YWlucyhlLnRhcmdldCkgJiYgZS50YXJnZXQgIT09IG9wZW4pe1xuICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJvcGFjaXR5XCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICB0YWJzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3VybmFtZW50U3RhZ2U7IGkrKykge1xuICAgICAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGFiLmNsYXNzTGlzdC5hZGQoJ3Jlc3VsdHNfX3RhYi1pdGVtJyk7XG4gICAgICAgIHRhYnNDb250YWluZXIuYXBwZW5kQ2hpbGQodGFiKTtcbiAgICB9XG5cbiAgICBjb25zdCB0YWJsZU5hdlRhYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmVzdWx0c19fdGFiLWl0ZW1cIik7XG5cbiAgICB0YWJsZU5hdi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgaWYoaSArIDEgPiB0b3VybmFtZW50U3RhZ2Upe1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiX2xvY2tcIilcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGkgKyAxLCB0b3VybmFtZW50U3RhZ2UpXG5cbiAgICAgICAgaWYoaSArIDEgPT09IHRvdXJuYW1lbnRTdGFnZSl7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgIH1cblxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJfbG9ja1wiKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWJsZU5hdi5mb3JFYWNoKG5hdiA9PntcbiAgICAgICAgICAgICAgICBuYXYuY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICB9KVxuICAgIH0pXG4gICAgdGFibGVOYXZUYWIuZm9yRWFjaCgoaXRlbSwgaSkgPT57XG4gICAgICAgIGlmKGkgKyAxID09PSB0b3VybmFtZW50U3RhZ2Upe1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHRhYmxlVGFiID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX190YWItaXRlbScpXG5cbiAgICB0YWJsZVRhYi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgaWYoaSArIDEgPT09IHRvdXJuYW1lbnRTdGFnZSl7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgIH1cbiAgICB9KVxuXG5cbiAgICBmdW5jdGlvbiBhY3RpdmF0ZVNlbGVjdGVkVGVhbXMoc3RvcmVkUHJlZGljdERhdGEpIHtcblxuICAgICAgICAvLyDQn9GA0L7RhdC+0LTQuNC80L7RgdGPINC/0L4g0LLRgdGW0YUg0LXQu9C10LzQtdC90YLQsNGFIHByZWRpY3REYXRhXG4gICAgICAgIHN0b3JlZFByZWRpY3REYXRhLmZvckVhY2goZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHN0YWdlLCB0ZWFtIH0gPSBkYXRhO1xuXG4gICAgICAgICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0LLRgdGWINC60L7Qu9C+0L3QutC4LCDRj9C60ZYg0LLRltC00L/QvtCy0ZbQtNCw0Y7RgtGMINC00LDQvdC+0LzRgyDQtdGC0LDQv9GDIChzdGFnZSlcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtnZXRTdGFnZUNsYXNzKHN0YWdlKX1gKTtcblxuICAgICAgICAgICAgY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICAgICAgLy8g0JfQvdCw0YXQvtC00LjQvNC+INCy0YHRliDQsdC70L7QutC4INC3INC60L7QvNCw0L3QtNCw0LzQuCDQsiDRhtGW0Lkg0LrQvtC70L7QvdGG0ZZcbiAgICAgICAgICAgICAgICBjb25zdCB0ZWFtQmxvY2tzID0gY29sdW1uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2Nob3NlXCIpO1xuXG4gICAgICAgICAgICAgICAgdGVhbUJsb2Nrcy5mb3JFYWNoKGJsb2NrID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8g0JfQvdCw0YXQvtC00LjQvNC+INCy0YHRliDRgNCw0LTRltC+0LrQvdC+0L/QutC4INGC0LAg0L3QsNC30LLQuCDQutC+0LzQsNC90LQg0LIg0YbRjNC+0LzRgyDQsdC70L7QutGDXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRlYW1SYWRpb3MgPSBibG9jay5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX190ZWFtLXJhZGlvXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZWFtcyA9IGJsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX3RlYW0tbmFtZVwiKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyDQn9GA0L7RhdC+0LTQuNC80L7RgdGPINC/0L4g0LLRgdGW0YUg0LrQvtC80LDQvdC00LDRhSDQsiDQsdC70L7QutGDXG4gICAgICAgICAgICAgICAgICAgIHRlYW1zLmZvckVhY2goKHRlYW1FbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0K/QutGJ0L4g0L3QsNC30LLQsCDQutC+0LzQsNC90LTQuCDRgdC/0ZbQstC/0LDQtNCw0ZQg0Lcg0LLQuNCx0YDQsNC90L7RjiDQutC+0LzQsNC90LTQvtGOINC3IHByZWRpY3REYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVhbUVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpID09PSB0ZWFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g0JDQutGC0LjQstGD0ZTQvNC+INCy0ZbQtNC/0L7QstGW0LTQvdGDINGA0LDQtNGW0L7QutC90L7Qv9C60YNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZWFtUmFkaW9zW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4vLyDQlNC+0L/QvtC80ZbQttC90LAg0YTRg9C90LrRhtGW0Y8g0LTQu9GPINC+0YLRgNC40LzQsNC90L3RjyDQutC70LDRgdGDINC10YLQsNC/0YMg0L3QsCDQvtGB0L3QvtCy0ZYg0LnQvtCz0L4g0L3QsNC30LLQuFxuICAgIGZ1bmN0aW9uIGdldFN0YWdlQ2xhc3Moc3RhZ2UpIHtcbiAgICAgICAgc3dpdGNoIChzdGFnZSkge1xuICAgICAgICAgICAgY2FzZSBcIk9wZW5pbmcgU3RhZ2VcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFnZTEtOFwiO1xuICAgICAgICAgICAgY2FzZSBcIlF1YXJ0ZXJmaW5hbHNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFnZTEtNFwiO1xuICAgICAgICAgICAgY2FzZSBcIlNlbWlmaW5hbHNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFnZTEtMlwiO1xuICAgICAgICAgICAgY2FzZSBcIkZpbmFsXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RhZ2UtZmluYWxcIjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiBhY3RpdmF0ZVNlbGVjdGVkVGVhbXMocHJlZGljdERhdGEpKTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxvY2FsU3RvcmFnZSgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcmVkaWN0RGF0YVwiLCBKU09OLnN0cmluZ2lmeShwcmVkaWN0RGF0YSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRlYW1OYW1lKHRlYW1CbG9jaywgc3RhZ2UsIGNvbHVtbikge1xuICAgICAgICBpZihjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiX2RvbmVcIikgfHwgY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcIl9hY3RpdmVcIikpe1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGVhbVJhZGlvcyA9IHRlYW1CbG9jay5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX190ZWFtLXJhZGlvXCIpO1xuICAgICAgICBjb25zdCB0ZWFtcyA9IHRlYW1CbG9jay5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX190ZWFtLW5hbWVcIik7XG5cbiAgICAgICAgdGVhbVJhZGlvcy5mb3JFYWNoKChyYWRpbywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRlYW1SYWRpb3MuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIikpXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRlYW0gPSB0ZWFtc1tpbmRleF0udGV4dENvbnRlbnQudHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgLy8g0JLQuNC00LDQu9GP0ZTQvNC+INC/0L7Qv9C10YDQtdC00L3RjiDQutC+0LzQsNC90LTRgyDQtyDRhtGM0L7Qs9C+INCx0LvQvtC60YNcbiAgICAgICAgICAgICAgICBwcmVkaWN0RGF0YSA9IHByZWRpY3REYXRhLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uc3RhZ2UgIT09IHN0YWdlKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIUFycmF5LmZyb20odGVhbXMpLnNvbWUodGVhbSA9PiB0ZWFtLnRleHRDb250ZW50LnRyaW0oKSA9PT0gaXRlbS50ZWFtKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vINCU0L7QtNCw0ZTQvNC+INC90L7QstGDINC60L7QvNCw0L3QtNGDXG4gICAgICAgICAgICAgICAgcHJlZGljdERhdGEucHVzaCh7IHN0YWdlOiBzdGFnZSwgdGVhbTogc2VsZWN0ZWRUZWFtIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8g0J7QvdC+0LLQu9GO0ZTQvNC+IGxvY2FsU3RvcmFnZVxuICAgICAgICAgICAgICAgIHVwZGF0ZUxvY2FsU3RvcmFnZSgpO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHJlZGljdERhdGEpOyAvLyDQn9C10YDQtdCy0ZbRgNGP0ZTQvNC+LCDRh9C4INC/0YDQsNCy0LjQu9GM0L3QviDQv9GA0LDRhtGO0ZRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHNldFByZWRpY3RDb2x1bW4oY29sdW1uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJfbG9ja1wiKSApXG4gICAgICAgIGxldCBzdGFnZSA9IFwiXCJcblxuICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwic3RhZ2UxLThcIikgPyBzdGFnZSA9IFwiT3BlbmluZyBTdGFnZVwiIDogbnVsbDtcbiAgICAgICAgY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcInN0YWdlMS00XCIpID8gc3RhZ2UgPSBcIlF1YXJ0ZXJmaW5hbHNcIiA6IG51bGw7XG4gICAgICAgIGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJzdGFnZTEtMlwiKSA/IHN0YWdlID0gXCJTZW1pZmluYWxzXCIgOiBudWxsO1xuICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwic3RhZ2UtZmluYWxcIikgPyBzdGFnZSA9IFwiRmluYWxcIiA6IG51bGw7XG5cbiAgICAgICAgY29uc3QgdGVhbUJsb2NrcyA9IGNvbHVtbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19jaG9zZVwiKTtcblxuICAgICAgICB0ZWFtQmxvY2tzLmZvckVhY2goYmxvY2sgPT4gZ2V0VGVhbU5hbWUoYmxvY2ssIHN0YWdlLCBjb2x1bW4pKTtcblxuXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiB1cGRhdGVBY3RpdmVTdGFnZShzdGFnZXMpIHtcbiAgICAgICAgc3RhZ2VzLmZvckVhY2goKHN0YWdlLCBpbmRleCkgPT4ge1xuXG4gICAgICAgICAgICBzdGFnZS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgaWYoaW5kZXggPT09IGNvbHVtbkluZGV4KXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNhZGFzXCIpXG4gICAgICAgICAgICAgICAgc3RhZ2UuY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbW92ZUxlZnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgaWYgKGNvbHVtbkluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGNvbHVtbkluZGV4LS07XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVTdGFnZShwcmVkaWN0Q29sdW1ucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbHVtbkluZGV4IDwgMCkge1xuICAgICAgICAgICAgY29sdW1uSW5kZXggPSBwcmVkaWN0Q29sdW1ucy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgdXBkYXRlQWN0aXZlU3RhZ2UocHJlZGljdENvbHVtbnMpO1xuICAgICAgICAgICAgdGFibGVUYWIuZm9yRWFjaCgoaXRlbSwgaSkgPT57XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGlmKGkgKyAxID09PSBjb2x1bW5JbmRleCl7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHRhYmxlVGFiLmZvckVhY2goKGl0ZW0sIGkpID0+e1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgaWYoaSA9PT0gY29sdW1uSW5kZXgpe1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTtcblxuICAgIG1vdmVSaWdodC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoY29sdW1uSW5kZXggPCBwcmVkaWN0Q29sdW1ucy5sZW5ndGggLSAxIHx8IGNvbHVtbkluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGNvbHVtbkluZGV4Kys7XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVTdGFnZShwcmVkaWN0Q29sdW1ucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoY29sdW1uSW5kZXggPT09IHByZWRpY3RDb2x1bW5zLmxlbmd0aCl7XG4gICAgICAgICAgICBjb2x1bW5JbmRleCA9IDBcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZVN0YWdlKHByZWRpY3RDb2x1bW5zKTtcbiAgICAgICAgfVxuICAgICAgICB0YWJsZVRhYi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIGlmKGkgPT09IGNvbHVtbkluZGV4KXtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICBtb3ZlTGVmdFJlc3VsdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoY29sdW1uSW5kZXggPiAwKSB7XG4gICAgICAgICAgICBjb2x1bW5JbmRleC0tO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sdW1uSW5kZXggPSB0YWJzUmVzdWx0Lmxlbmd0aCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdXBkYXRlQWN0aXZlU3RhZ2UodGFic1Jlc3VsdCk7XG4gICAgICAgIHRhYmxlTmF2LmZvckVhY2goKGl0ZW0sIGkpID0+e1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgaWYoY29sdW1uSW5kZXggPCAxKXtcbiAgICAgICAgICAgICAgICBjb2x1bW5JbmRleCA9IHRvdXJuYW1lbnRTdGFnZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihpICsgMSA9PT0gY29sdW1uSW5kZXgpe1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgICAgICB0YWJsZU5hdlRhYi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIGlmKGkgKyAxID09PSBjb2x1bW5JbmRleCl7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pO1xuXG4gICAgbW92ZVJpZ2h0UmVzdWx0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChjb2x1bW5JbmRleCA8IHRhYnNSZXN1bHQubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgY29sdW1uSW5kZXgrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbHVtbkluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0YWJsZU5hdi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIGlmKGNvbHVtbkluZGV4ID4gdG91cm5hbWVudFN0YWdlKXtcbiAgICAgICAgICAgICAgICBjb2x1bW5JbmRleCA9IDFcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoaSArIDEgPT09IGNvbHVtbkluZGV4KXtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICAgICAgdGFibGVOYXZUYWIuZm9yRWFjaCgoaXRlbSwgaSkgPT57XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICBpZihpICsgMSA9PT0gY29sdW1uSW5kZXgpe1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTtcblxuICAgIGxvYWRUcmFuc2xhdGlvbnMoKVxuICAgICAgICAudGhlbihpbml0KTtcblxufSkoKVxuXG4iXX0=

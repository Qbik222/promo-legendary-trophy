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
  tableNav.forEach(function (item, i) {
    if (i + 1 > tournamentStage) {
      item.classList.add("_lock");
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
    }
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
  });
  loadTranslations().then(init);
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwicmVzdWx0c1RhYmxlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicmVzdWx0c1RhYmxlSGVhZCIsInRvcFJlc3VsdHNUYWJsZSIsInJlc3VsdHNUYWJsZU90aGVyIiwidGFibGVOYXYiLCJxdWVyeVNlbGVjdG9yQWxsIiwicHJlZGljdENvbHVtbnMiLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsInRvdXJuYW1lbnRTdGFnZSIsImNvbHVtbkluZGV4IiwibG9jYWxlIiwidXNlcnMiLCJpMThuRGF0YSIsInVzZXJJZCIsIlBSSVpFU19DU1MiLCJwcmVkaWN0RGF0YSIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJjb25zb2xlIiwibG9nIiwibG9hZFRyYW5zbGF0aW9ucyIsImZldGNoIiwidGhlbiIsInJlcyIsImpzb24iLCJ0cmFuc2xhdGUiLCJlbGVtcyIsImxlbmd0aCIsImZvckVhY2giLCJlbGVtIiwia2V5IiwiZ2V0QXR0cmlidXRlIiwiaW5uZXJIVE1MIiwicmVtb3ZlQXR0cmlidXRlIiwicmVmcmVzaExvY2FsaXplZENsYXNzIiwiZWxlbWVudCIsImJhc2VDc3NDbGFzcyIsImxhbmciLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJyZXF1ZXN0IiwibGluayIsImV4dHJhT3B0aW9ucyIsImhlYWRlcnMiLCJnZXREYXRhIiwiUHJvbWlzZSIsImFsbCIsIkluaXRQYWdlIiwic29ydCIsImEiLCJiIiwicG9pbnRzIiwicmVuZGVyVXNlcnMiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwidXBkYXRlQWN0aXZlU3RhZ2UiLCJjb2x1bW4iLCJpIiwic2V0UHJlZGljdENvbHVtbiIsImNvbnRhaW5zIiwidGVhbXMiLCJkYXRlIiwidGltZSIsInRlYW0iLCJ0ZXh0Q29udGVudCIsImluaXQiLCJzdG9yZSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJhdXRoIiwiaXNBdXRob3JpemVkIiwiaWQiLCJjIiwic2V0SW50ZXJ2YWwiLCJnX3VzZXJfaWQiLCJjbGVhckludGVydmFsIiwicG9wdWxhdGVVc2Vyc1RhYmxlIiwiY3VycmVudFVzZXJJZCIsInRvcFVzZXJzIiwic2xpY2UiLCJ1c2VyIiwiZGlzcGxheVVzZXIiLCJ1c2VyaWQiLCJjdXJyZW50VXNlciIsImZpbmQiLCJjdXJyZW50VXNlckluZGV4IiwiaW5kZXhPZiIsIm90aGVyVXNlcnMiLCJNYXRoIiwibWF4IiwiaXNDdXJyZW50VXNlciIsInRhYmxlIiwiYWxsVXNlcnMiLCJhZGRpdGlvbmFsVXNlclJvdyIsImNyZWF0ZUVsZW1lbnQiLCJwbGFjZSIsInByaXplUGxhY2VDc3MiLCJwcml6ZUtleSIsImdldFByaXplVHJhbnNsYXRpb25LZXkiLCJtYXNrVXNlcklkIiwibXVsdGlwbGllciIsInRvdGFsUG9pbnRzIiwidHJhbnNsYXRlS2V5IiwieW91QmxvY2siLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmQiLCJ0b1N0cmluZyIsInBvcHVwQnRucyIsInBvcHVwcyIsInBvcHVwIiwiY2xvc2UiLCJvcGVuIiwicGFyZW50Tm9kZSIsInNldFBvcHVwIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJpdGVtIiwibmF2IiwiYWN0aXZhdGVTZWxlY3RlZFRlYW1zIiwic3RvcmVkUHJlZGljdERhdGEiLCJkYXRhIiwic3RhZ2UiLCJjb2x1bW5zIiwiZ2V0U3RhZ2VDbGFzcyIsInRlYW1CbG9ja3MiLCJibG9jayIsInRlYW1SYWRpb3MiLCJ0ZWFtRWxlbWVudCIsImluZGV4IiwidHJpbSIsInVwZGF0ZUxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJnZXRUZWFtTmFtZSIsInRlYW1CbG9jayIsInJhZGlvIiwic2VsZWN0ZWRUZWFtIiwiZmlsdGVyIiwiQXJyYXkiLCJmcm9tIiwic29tZSIsInB1c2giLCJzdGFnZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsQ0FBQyxZQUFXO0VBQ1IsSUFBTUEsTUFBTSxH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RSxZQUFNO0lBQ3RDLElBQUk1RyxXQUFXLEdBQUdKLGNBQWMsQ0FBQ3dCLE1BQU0sR0FBRyxDQUFDLElBQUlwQixXQUFXLElBQUksQ0FBQyxFQUFFO01BQzdEQSxXQUFXLEVBQUU7TUFDYmlELGlCQUFpQixDQUFDckQsY0FBYyxDQUFDO0lBQ3JDO0lBQ0EsSUFBR0ksV0FBVyxLQUFLSixjQUFjLENBQUN3QixNQUFNLEVBQUM7TUFDckNwQixXQUFXLEdBQUcsQ0FBQztNQUNmaUQsaUJBQWlCLENBQUNyRCxjQUFjLENBQUM7SUFDckM7RUFDSixDQUFDLENBQUM7RUFNRmlCLGdCQUFnQixFQUFFLENBQ2JFLElBQUksQ0FBQzRDLElBQUksQ0FBQztBQUVuQixDQUFDLEdBQUciLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKXtcbiAgICBjb25zdCBhcGlVUkwgPSAnaHR0cHM6Ly9mYXYtcHJvbS5jb20vYXBpX3NoYW5naGFpJztcbiAgICBjb25zdCByZXN1bHRzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdWx0cy10YWJsZScpO1xuICAgIGNvbnN0IHJlc3VsdHNUYWJsZUhlYWQgPSByZXN1bHRzVGFibGUucXVlcnlTZWxlY3RvcignLnRhYmxlUmVzdWx0c19faGVhZCcpO1xuICAgIGNvbnN0IHRvcFJlc3VsdHNUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b3AtdXNlcnMnKTtcbiAgICBjb25zdCByZXN1bHRzVGFibGVPdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN1bHRzLXRhYmxlLW90aGVyJyk7XG4gICAgY29uc3QgdGFibGVOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJlc3VsdHNfX25hdi1pdGVtXCIpO1xuICAgIGNvbnN0IHByZWRpY3RDb2x1bW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9fY29sdW1uXCIpO1xuICAgIGNvbnN0IG1vdmVMZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZV9fbW92ZS1sZWZ0XCIpO1xuICAgIGNvbnN0IG1vdmVSaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVfX21vdmUtcmlnaHRcIik7XG5cbiAgICBsZXQgdG91cm5hbWVudFN0YWdlID0gMlxuXG4gICAgbGV0IGNvbHVtbkluZGV4ID0gdG91cm5hbWVudFN0YWdlIC0gMVxuXG5cblxuICAgIGxldCBsb2NhbGUgPSAnZW4nO1xuICAgIGxldCB1c2VycztcbiAgICBsZXQgaTE4bkRhdGEgPSB7fTtcbiAgICBsZXQgdXNlcklkO1xuICAgIHVzZXJJZCA9IDEwMDMwMDI2ODtcblxuICAgIGNvbnN0IFBSSVpFU19DU1MgPSBbJ3BsYWNlMScsICdwbGFjZTInLCAncGxhY2UzJ107XG5cblxuXG4gICAgbGV0IHByZWRpY3REYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByZWRpY3REYXRhXCIpKSB8fCBbXTtcbiAgICBjb25zb2xlLmxvZyhwcmVkaWN0RGF0YSlcbiAgICBmdW5jdGlvbiBsb2FkVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMfS90cmFuc2xhdGVzLyR7bG9jYWxlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YSA9IGpzb247XG4gICAgICAgICAgICAgICAgLy8gdHJhbnNsYXRlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyB2YXIgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAgICAgLy8gbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcG9ydFRvdXInKSwge1xuICAgICAgICAgICAgICAgIC8vICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgLy8gICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZSgpIHtcbiAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10cmFuc2xhdGVdJylcbiAgICAgICAgaWYgKGVsZW1zICYmIGVsZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgZWxlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoTG9jYWxpemVkQ2xhc3MoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoTG9jYWxpemVkQ2xhc3MoZWxlbWVudCwgYmFzZUNzc0NsYXNzKSB7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBbJ3VrJywgJ2VuJ10pIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShiYXNlQ3NzQ2xhc3MgKyBsYW5nKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYmFzZUNzc0NsYXNzICsgbG9jYWxlKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gZnVuY3Rpb24gKGxpbmssIGV4dHJhT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gZmV0Y2goYXBpVVJMICsgbGluaywge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLihleHRyYU9wdGlvbnMgfHwge30pXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgcmVxdWVzdCgnL3VzZXJzP25vY2FjaGU9MScpLFxuICAgICAgICBdKVxuICAgIH1cblxuICAgIGNvbnN0IEluaXRQYWdlID0gKCkgPT4ge1xuICAgICAgICBnZXREYXRhKCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgdXNlcnMgPSByZXNbMF0uc29ydCgoYSwgYikgPT4gYi5wb2ludHMgLSBhLnBvaW50cyk7XG4gICAgICAgICAgICAvLyB1c2VycyA9IHVzZXJzLnNsaWNlKDAsIDEwKVxuICAgICAgICAgICAgcmVuZGVyVXNlcnModXNlcnMpO1xuICAgICAgICAgICAgLy8gdHJhbnNsYXRlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIGlmKHdpbmRvdy5pbm5lcldpZHRoIDw9IDUwMCl7XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVTdGFnZShwcmVkaWN0Q29sdW1ucyk7XG4gICAgICAgIH1cbiAgICAgICAgcHJlZGljdENvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBpKSA9PntcbiAgICAgICAgICAgIGlmKGkgKyAxID4gdG91cm5hbWVudFN0YWdlKXtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmFkZChcIl9sb2NrXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihpICsgMSA8IHRvdXJuYW1lbnRTdGFnZSl7XG4gICAgICAgICAgICAgICAgY29sdW1uLmNsYXNzTGlzdC5hZGQoXCJfZG9uZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0UHJlZGljdENvbHVtbihjb2x1bW4pXG4gICAgICAgICAgICBpZihjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiX2xvY2tcIikpe1xuICAgICAgICAgICAgICAgIGNvbnN0IHRlYW1zID0gY29sdW1uLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9fdGVhbS1uYW1lJylcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gY29sdW1uLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9fY2hvc2UtZGF0ZScpXG4gICAgICAgICAgICAgICAgY29uc3QgdGltZSA9IGNvbHVtbi5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfX2Nob3NlLXRpbWUnKVxuICAgICAgICAgICAgICAgIHRlYW1zLmZvckVhY2godGVhbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRlYW0udGV4dENvbnRlbnQgPSBcIuKAlFwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBkYXRlLmZvckVhY2goZGF0ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGUudGV4dENvbnRlbnQgPSBcIuKAlFwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aW1lLmZvckVhY2godGltZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWUudGV4dENvbnRlbnQgPSBcIuKAlFwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpZiAod2luZG93LnN0b3JlKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB3aW5kb3cuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIHVzZXJJZCA9IHN0YXRlLmF1dGguaXNBdXRob3JpemVkICYmIHN0YXRlLmF1dGguaWQgfHwgJyc7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgICAgIGxldCBjID0gMDtcbiAgICAgICAgICAgIHZhciBpID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjIDwgNTApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhd2luZG93LmdfdXNlcl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkID0gd2luZG93LmdfdXNlcl9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVja1VzZXJBdXRoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICB9fVxuXG5cbiAgICBmdW5jdGlvbiByZW5kZXJVc2Vycyh1c2Vycykge1xuICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIHVzZXJJZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcG9wdWxhdGVVc2Vyc1RhYmxlKHVzZXJzLCBjdXJyZW50VXNlcklkKSB7XG4gICAgICAgIHJlc3VsdHNUYWJsZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgICAgaWYgKCF1c2VycyB8fCAhdXNlcnMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgbGV0IHRvcFVzZXJzID0gdXNlcnMuc2xpY2UoMCwgMjApO1xuICAgICAgICB0b3BVc2Vycy5mb3JFYWNoKHVzZXIgPT4gZGlzcGxheVVzZXIodXNlciwgdXNlci51c2VyaWQgPT09IGN1cnJlbnRVc2VySWQsIHJlc3VsdHNUYWJsZSwgdXNlcnMpKTtcblxuICAgICAgICBjb25zdCBjdXJyZW50VXNlciA9IHVzZXJzLmZpbmQodXNlciA9PiB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VySW5kZXggPSBjdXJyZW50VXNlciA/IHVzZXJzLmluZGV4T2YoY3VycmVudFVzZXIpIDogLTE7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRVc2VySW5kZXggPj0gMTApIHtcbiAgICAgICAgICAgIGxldCBvdGhlclVzZXJzID0gdXNlcnMuc2xpY2UoTWF0aC5tYXgoMTAsIGN1cnJlbnRVc2VySW5kZXggLSAxKSwgY3VycmVudFVzZXJJbmRleCArIDIpO1xuICAgICAgICAgICAgb3RoZXJVc2Vycy5mb3JFYWNoKHVzZXIgPT4gZGlzcGxheVVzZXIodXNlciwgdXNlci51c2VyaWQgPT09IGN1cnJlbnRVc2VySWQsIHJlc3VsdHNUYWJsZU90aGVyLCB1c2VycykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlzcGxheVVzZXIodXNlciwgaXNDdXJyZW50VXNlciwgdGFibGUsIGFsbFVzZXJzKSB7XG4gICAgICAgIGNvbnN0IGFkZGl0aW9uYWxVc2VyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoJ3RhYmxlUmVzdWx0c19fcm93Jyk7XG5cblxuXG4gICAgICAgIGNvbnN0IHBsYWNlID0gYWxsVXNlcnMuaW5kZXhPZih1c2VyKSArIDE7XG4gICAgICAgIGNvbnN0IHByaXplUGxhY2VDc3MgPSBQUklaRVNfQ1NTW3BsYWNlIC0gMV07XG4gICAgICAgIGlmIChwcml6ZVBsYWNlQ3NzKSB7XG4gICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKHByaXplUGxhY2VDc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJpemVLZXkgPSBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5KHBsYWNlKTtcbiAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19yb3ctaXRlbVwiPiR7cGxhY2V9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHtpc0N1cnJlbnRVc2VyID8gdXNlci51c2VyaWQgOiBtYXNrVXNlcklkKHVzZXIudXNlcmlkKX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke3VzZXIucG9pbnRzfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19yb3ctaXRlbVwiPiR7dXNlci5tdWx0aXBsaWVyfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19yb3ctaXRlbVwiPiR7dXNlci50b3RhbFBvaW50c308L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke3ByaXplS2V5ID8gdHJhbnNsYXRlS2V5KHByaXplS2V5KSA6ICcgLSAnfTwvZGl2PlxuICAgIGA7XG4gICAgICAgIGlmIChpc0N1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICBjb25zdCB5b3VCbG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgeW91QmxvY2suc2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScsICd5b3UnKTtcbiAgICAgICAgICAgIHlvdUJsb2NrLnRleHRDb250ZW50ID0gXCLQotC4XCIgLy8g0LTQu9GPINGC0LXRgdGC0YMg0L/QvtC60Lgg0L3QtdC80LAg0YLRgNCw0L3RgdC70LXQudGC0ZbQslxuICAgICAgICAgICAgeW91QmxvY2suY2xhc3NMaXN0LmFkZCgnX3lvdXInKTtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmFwcGVuZCh5b3VCbG9jaylcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoXCJfeW91clwiKVxuXG4gICAgICAgIH1cbiAgICAgICAgdGFibGUuYXBwZW5kKGFkZGl0aW9uYWxVc2VyUm93KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWFza1VzZXJJZCh1c2VySWQpIHtcbiAgICAgICAgcmV0dXJuIFwiKipcIiArIHVzZXJJZC50b1N0cmluZygpLnNsaWNlKDIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUtleShrZXkpIHtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJpemVUcmFuc2xhdGlvbktleShwbGFjZSkge1xuICAgICAgICBpZiAocGxhY2UgPD0gNSkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8ke3BsYWNlfWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV82LTEwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDIwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzExLTIwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDM1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzIxLTM1YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzM2LTUwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDc1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzUxLTc1YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV83Ni0xMDBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTI1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzEwMS0xMjVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTUwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzEyNi0xNTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTc1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzE1MS0xNzVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzE3Ni0yMDBgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwb3B1cEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmluZm9fX2l0ZW0tYnRuXCIpXG4gICAgY29uc3QgcG9wdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbmZvX19pdGVtLXBvcHVwXCIpXG5cblxuICAgIHBvcHVwcy5mb3JFYWNoKChwb3B1cCwgaSkgPT57XG4gICAgICAgIGNvbnN0IGNsb3NlID0gcG9wdXAucXVlcnlTZWxlY3RvcihcIi5pbmZvX19pdGVtLXBvcHVwLWNsb3NlXCIpXG4gICAgICAgIGNvbnN0IG9wZW4gPSBwb3B1cC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb19faXRlbS1idG5cIilcbiAgICAgICAgc2V0UG9wdXAob3BlbiwgY2xvc2UsIHBvcHVwKVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBzZXRQb3B1cChvcGVuLCBjbG9zZSwgcG9wdXApe1xuICAgICAgICBvcGVuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGFjaXR5XCIpXG4gICAgICAgIH0pXG4gICAgICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJvcGFjaXR5XCIpXG4gICAgICAgIH0pXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgICBpZighcG9wdXAuY29udGFpbnMoZS50YXJnZXQpICYmIGUudGFyZ2V0ICE9PSBvcGVuKXtcbiAgICAgICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFwib3BhY2l0eVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRhYmxlTmF2LmZvckVhY2goKGl0ZW0sIGkpID0+e1xuICAgICAgICBpZihpICsgMSA+IHRvdXJuYW1lbnRTdGFnZSl7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJfbG9ja1wiKVxuICAgICAgICB9XG5cbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgICAgaWYoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiX2xvY2tcIikpe1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFibGVOYXYuZm9yRWFjaChuYXYgPT57XG4gICAgICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gYWN0aXZhdGVTZWxlY3RlZFRlYW1zKHN0b3JlZFByZWRpY3REYXRhKSB7XG5cbiAgICAgICAgLy8g0J/RgNC+0YXQvtC00LjQvNC+0YHRjyDQv9C+INCy0YHRltGFINC10LvQtdC80LXQvdGC0LDRhSBwcmVkaWN0RGF0YVxuICAgICAgICBzdG9yZWRQcmVkaWN0RGF0YS5mb3JFYWNoKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBzdGFnZSwgdGVhbSB9ID0gZGF0YTtcblxuICAgICAgICAgICAgLy8g0JfQvdCw0YXQvtC00LjQvNC+INCy0YHRliDQutC+0LvQvtC90LrQuCwg0Y/QutGWINCy0ZbQtNC/0L7QstGW0LTQsNGO0YLRjCDQtNCw0L3QvtC80YMg0LXRgtCw0L/RgyAoc3RhZ2UpXG4gICAgICAgICAgICBjb25zdCBjb2x1bW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7Z2V0U3RhZ2VDbGFzcyhzdGFnZSl9YCk7XG5cbiAgICAgICAgICAgIGNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICAgICAgICAgIC8vINCX0L3QsNGF0L7QtNC40LzQviDQstGB0ZYg0LHQu9C+0LrQuCDQtyDQutC+0LzQsNC90LTQsNC80Lgg0LIg0YbRltC5INC60L7Qu9C+0L3RhtGWXG4gICAgICAgICAgICAgICAgY29uc3QgdGVhbUJsb2NrcyA9IGNvbHVtbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19jaG9zZVwiKTtcblxuICAgICAgICAgICAgICAgIHRlYW1CbG9ja3MuZm9yRWFjaChibG9jayA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vINCX0L3QsNGF0L7QtNC40LzQviDQstGB0ZYg0YDQsNC00ZbQvtC60L3QvtC/0LrQuCDRgtCwINC90LDQt9Cy0Lgg0LrQvtC80LDQvdC0INCyINGG0YzQvtC80YMg0LHQu9C+0LrRg1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZWFtUmFkaW9zID0gYmxvY2sucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9fdGVhbS1yYWRpb1wiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVhbXMgPSBibG9jay5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX190ZWFtLW5hbWVcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8g0J/RgNC+0YXQvtC00LjQvNC+0YHRjyDQv9C+INCy0YHRltGFINC60L7QvNCw0L3QtNCw0YUg0LIg0LHQu9C+0LrRg1xuICAgICAgICAgICAgICAgICAgICB0ZWFtcy5mb3JFYWNoKCh0ZWFtRWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINCv0LrRidC+INC90LDQt9Cy0LAg0LrQvtC80LDQvdC00Lgg0YHQv9GW0LLQv9Cw0LTQsNGUINC3INCy0LjQsdGA0LDQvdC+0Y4g0LrQvtC80LDQvdC00L7RjiDQtyBwcmVkaWN0RGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlYW1FbGVtZW50LnRleHRDb250ZW50LnRyaW0oKSA9PT0gdGVhbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vINCQ0LrRgtC40LLRg9GU0LzQviDQstGW0LTQv9C+0LLRltC00L3RgyDRgNCw0LTRltC+0LrQvdC+0L/QutGDXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVhbVJhZGlvc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuLy8g0JTQvtC/0L7QvNGW0LbQvdCwINGE0YPQvdC60YbRltGPINC00LvRjyDQvtGC0YDQuNC80LDQvdC90Y8g0LrQu9Cw0YHRgyDQtdGC0LDQv9GDINC90LAg0L7RgdC90L7QstGWINC50L7Qs9C+INC90LDQt9Cy0LhcbiAgICBmdW5jdGlvbiBnZXRTdGFnZUNsYXNzKHN0YWdlKSB7XG4gICAgICAgIHN3aXRjaCAoc3RhZ2UpIHtcbiAgICAgICAgICAgIGNhc2UgXCJPcGVuaW5nIFN0YWdlXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RhZ2UxLThcIjtcbiAgICAgICAgICAgIGNhc2UgXCJRdWFydGVyZmluYWxzXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RhZ2UxLTRcIjtcbiAgICAgICAgICAgIGNhc2UgXCJTZW1pZmluYWxzXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RhZ2UxLTJcIjtcbiAgICAgICAgICAgIGNhc2UgXCJGaW5hbFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YWdlLWZpbmFsXCI7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4gYWN0aXZhdGVTZWxlY3RlZFRlYW1zKHByZWRpY3REYXRhKSk7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVMb2NhbFN0b3JhZ2UoKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJlZGljdERhdGFcIiwgSlNPTi5zdHJpbmdpZnkocHJlZGljdERhdGEpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUZWFtTmFtZSh0ZWFtQmxvY2ssIHN0YWdlLCBjb2x1bW4pIHtcbiAgICAgICAgaWYoY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcIl9kb25lXCIpIHx8IGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJfYWN0aXZlXCIpKXtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRlYW1SYWRpb3MgPSB0ZWFtQmxvY2sucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9fdGVhbS1yYWRpb1wiKTtcbiAgICAgICAgY29uc3QgdGVhbXMgPSB0ZWFtQmxvY2sucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9fdGVhbS1uYW1lXCIpO1xuXG4gICAgICAgIHRlYW1SYWRpb3MuZm9yRWFjaCgocmFkaW8sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByYWRpby5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICB0ZWFtUmFkaW9zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpKVxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZWFtID0gdGVhbXNbaW5kZXhdLnRleHRDb250ZW50LnRyaW0oKTtcblxuICAgICAgICAgICAgICAgIC8vINCS0LjQtNCw0LvRj9GU0LzQviDQv9C+0L/QtdGA0LXQtNC90Y4g0LrQvtC80LDQvdC00YMg0Lcg0YbRjNC+0LPQviDQsdC70L7QutGDXG4gICAgICAgICAgICAgICAgcHJlZGljdERhdGEgPSBwcmVkaWN0RGF0YS5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnN0YWdlICE9PSBzdGFnZSkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFBcnJheS5mcm9tKHRlYW1zKS5zb21lKHRlYW0gPT4gdGVhbS50ZXh0Q29udGVudC50cmltKCkgPT09IGl0ZW0udGVhbSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyDQlNC+0LTQsNGU0LzQviDQvdC+0LLRgyDQutC+0LzQsNC90LTRg1xuICAgICAgICAgICAgICAgIHByZWRpY3REYXRhLnB1c2goeyBzdGFnZTogc3RhZ2UsIHRlYW06IHNlbGVjdGVkVGVhbSB9KTtcblxuICAgICAgICAgICAgICAgIC8vINCe0L3QvtCy0LvRjtGU0LzQviBsb2NhbFN0b3JhZ2VcbiAgICAgICAgICAgICAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoKTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHByZWRpY3REYXRhKTsgLy8g0J/QtdGA0LXQstGW0YDRj9GU0LzQviwg0YfQuCDQv9GA0LDQstC40LvRjNC90L4g0L/RgNCw0YbRjtGUXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBzZXRQcmVkaWN0Q29sdW1uKGNvbHVtbikge1xuICAgICAgICBjb25zb2xlLmxvZyhjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiX2xvY2tcIikgKVxuICAgICAgICBsZXQgc3RhZ2UgPSBcIlwiXG5cbiAgICAgICAgY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcInN0YWdlMS04XCIpID8gc3RhZ2UgPSBcIk9wZW5pbmcgU3RhZ2VcIiA6IG51bGw7XG4gICAgICAgIGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJzdGFnZTEtNFwiKSA/IHN0YWdlID0gXCJRdWFydGVyZmluYWxzXCIgOiBudWxsO1xuICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwic3RhZ2UxLTJcIikgPyBzdGFnZSA9IFwiU2VtaWZpbmFsc1wiIDogbnVsbDtcbiAgICAgICAgY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcInN0YWdlLWZpbmFsXCIpID8gc3RhZ2UgPSBcIkZpbmFsXCIgOiBudWxsO1xuXG4gICAgICAgIGNvbnN0IHRlYW1CbG9ja3MgPSBjb2x1bW4ucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9fY2hvc2VcIik7XG5cbiAgICAgICAgdGVhbUJsb2Nrcy5mb3JFYWNoKGJsb2NrID0+IGdldFRlYW1OYW1lKGJsb2NrLCBzdGFnZSwgY29sdW1uKSk7XG5cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUFjdGl2ZVN0YWdlKHN0YWdlcykge1xuICAgICAgICBzdGFnZXMuZm9yRWFjaCgoc3RhZ2UsIGluZGV4KSA9PiB7XG5cbiAgICAgICAgICAgIHN0YWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICBpZihpbmRleCA9PT0gY29sdW1uSW5kZXgpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2FkYXNcIilcbiAgICAgICAgICAgICAgICBzdGFnZS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtb3ZlTGVmdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoY29sdW1uSW5kZXggPj0gMCkge1xuICAgICAgICAgICAgY29sdW1uSW5kZXgtLTtcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZVN0YWdlKHByZWRpY3RDb2x1bW5zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sdW1uSW5kZXggPCAwKSB7XG4gICAgICAgICAgICBjb2x1bW5JbmRleCA9IHByZWRpY3RDb2x1bW5zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVTdGFnZShwcmVkaWN0Q29sdW1ucyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIG1vdmVSaWdodC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoY29sdW1uSW5kZXggPCBwcmVkaWN0Q29sdW1ucy5sZW5ndGggLSAxIHx8IGNvbHVtbkluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGNvbHVtbkluZGV4Kys7XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVTdGFnZShwcmVkaWN0Q29sdW1ucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoY29sdW1uSW5kZXggPT09IHByZWRpY3RDb2x1bW5zLmxlbmd0aCl7XG4gICAgICAgICAgICBjb2x1bW5JbmRleCA9IDBcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZVN0YWdlKHByZWRpY3RDb2x1bW5zKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cblxuXG5cbiAgICBsb2FkVHJhbnNsYXRpb25zKClcbiAgICAgICAgLnRoZW4oaW5pdCk7XG5cbn0pKClcblxuIl19

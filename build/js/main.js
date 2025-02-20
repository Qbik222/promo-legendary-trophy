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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwicmVzdWx0c1RhYmxlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicmVzdWx0c1RhYmxlSGVhZCIsInRvcFJlc3VsdHNUYWJsZSIsInJlc3VsdHNUYWJsZU90aGVyIiwidGFibGVOYXYiLCJxdWVyeVNlbGVjdG9yQWxsIiwicHJlZGljdENvbHVtbnMiLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsInRvdXJuYW1lbnRTdGFnZSIsImNvbHVtbkluZGV4IiwibG9jYWxlIiwidXNlcnMiLCJpMThuRGF0YSIsInVzZXJJZCIsIlBSSVpFU19DU1MiLCJwcmVkaWN0RGF0YSIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJjb25zb2xlIiwibG9nIiwibG9hZFRyYW5zbGF0aW9ucyIsImZldGNoIiwidGhlbiIsInJlcyIsImpzb24iLCJ0cmFuc2xhdGUiLCJlbGVtcyIsImxlbmd0aCIsImZvckVhY2giLCJlbGVtIiwia2V5IiwiZ2V0QXR0cmlidXRlIiwiaW5uZXJIVE1MIiwicmVtb3ZlQXR0cmlidXRlIiwicmVmcmVzaExvY2FsaXplZENsYXNzIiwiZWxlbWVudCIsImJhc2VDc3NDbGFzcyIsImxhbmciLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJyZXF1ZXN0IiwibGluayIsImV4dHJhT3B0aW9ucyIsImhlYWRlcnMiLCJnZXREYXRhIiwiUHJvbWlzZSIsImFsbCIsIkluaXRQYWdlIiwic29ydCIsImEiLCJiIiwicG9pbnRzIiwicmVuZGVyVXNlcnMiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwidXBkYXRlQWN0aXZlU3RhZ2UiLCJjb2x1bW4iLCJpIiwic2V0UHJlZGljdENvbHVtbiIsImNvbnRhaW5zIiwidGVhbXMiLCJkYXRlIiwidGltZSIsInRlYW0iLCJ0ZXh0Q29udGVudCIsImluaXQiLCJzdG9yZSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJhdXRoIiwiaXNBdXRob3JpemVkIiwiaWQiLCJjIiwic2V0SW50ZXJ2YWwiLCJnX3VzZXJfaWQiLCJjbGVhckludGVydmFsIiwicG9wdWxhdGVVc2Vyc1RhYmxlIiwiY3VycmVudFVzZXJJZCIsInRvcFVzZXJzIiwic2xpY2UiLCJ1c2VyIiwiZGlzcGxheVVzZXIiLCJ1c2VyaWQiLCJjdXJyZW50VXNlciIsImZpbmQiLCJjdXJyZW50VXNlckluZGV4IiwiaW5kZXhPZiIsIm90aGVyVXNlcnMiLCJNYXRoIiwibWF4IiwiaXNDdXJyZW50VXNlciIsInRhYmxlIiwiYWxsVXNlcnMiLCJhZGRpdGlvbmFsVXNlclJvdyIsImNyZWF0ZUVsZW1lbnQiLCJwbGFjZSIsInByaXplUGxhY2VDc3MiLCJwcml6ZUtleSIsImdldFByaXplVHJhbnNsYXRpb25LZXkiLCJtYXNrVXNlcklkIiwibXVsdGlwbGllciIsInRvdGFsUG9pbnRzIiwidHJhbnNsYXRlS2V5IiwieW91QmxvY2siLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmQiLCJ0b1N0cmluZyIsInBvcHVwQnRucyIsInBvcHVwcyIsInBvcHVwIiwiY2xvc2UiLCJvcGVuIiwicGFyZW50Tm9kZSIsInNldFBvcHVwIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJpdGVtIiwibmF2IiwiYWN0aXZhdGVTZWxlY3RlZFRlYW1zIiwic3RvcmVkUHJlZGljdERhdGEiLCJkYXRhIiwic3RhZ2UiLCJjb2x1bW5zIiwiZ2V0U3RhZ2VDbGFzcyIsInRlYW1CbG9ja3MiLCJibG9jayIsInRlYW1SYWRpb3MiLCJ0ZWFtRWxlbWVudCIsImluZGV4IiwidHJpbSIsInVwZGF0ZUxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJnZXRUZWFtTmFtZSIsInRlYW1CbG9jayIsInJhZGlvIiwic2VsZWN0ZWRUZWFtIiwiZmlsdGVyIiwiQXJyYXkiLCJmcm9tIiwic29tZSIsInB1c2giLCJzdGFnZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsQ0FBQyxZQUFXO0VBQ1IsSUFBTUEsTUFBTSxH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aUQsaUJBQWlCLENBQUNyRCxjQUFjLENBQUM7SUFDckM7SUFDQSxJQUFJSSxXQUFXLEdBQUcsQ0FBQyxFQUFFO01BQ2pCQSxXQUFXLEdBQUdKLGNBQWMsQ0FBQ3dCLE1BQU0sR0FBRyxDQUFDO01BQ3ZDNkIsaUJBQWlCLENBQUNyRCxjQUFjLENBQUM7SUFDckM7RUFDSixDQUFDLENBQUM7RUFFRkUsU0FBUyxDQUFDOEcsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07SUFDdEMsSUFBSTVHLFdBQVcsR0FBR0osY0FBYyxDQUFDd0IsTUFBTSxHQUFHLENBQUMsSUFBSXBCLFdBQVcsSUFBSSxDQUFDLEVBQUU7TUFDN0RBLFdBQVcsRUFBRTtNQUNiaUQsaUJBQWlCLENBQUNyRCxjQUFjLENBQUM7SUFDckM7SUFDQSxJQUFHSSxXQUFXLEtBQUtKLGNBQWMsQ0FBQ3dCLE1BQU0sRUFBQztNQUNyQ3BCLFdBQVcsR0FBRyxDQUFDO01BQ2ZpRCxpQkFBaUIsQ0FBQ3JELGNBQWMsQ0FBQztJQUNyQztFQUNKLENBQUMsQ0FBQztFQU1GaUIsZ0JBQWdCLEVBQUUsQ0FDYkUsSUFBSSxDQUFDNEMsSUFBSSxDQUFDO0FBRW5CLENBQUMsR0FBRyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpe1xuICAgIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL2Zhdi1wcm9tLmNvbS9hcGlfc2hhbmdoYWknO1xuICAgIGNvbnN0IHJlc3VsdHNUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN1bHRzLXRhYmxlJyk7XG4gICAgY29uc3QgcmVzdWx0c1RhYmxlSGVhZCA9IHJlc3VsdHNUYWJsZS5xdWVyeVNlbGVjdG9yKCcudGFibGVSZXN1bHRzX19oZWFkJyk7XG4gICAgY29uc3QgdG9wUmVzdWx0c1RhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvcC11c2VycycpO1xuICAgIGNvbnN0IHJlc3VsdHNUYWJsZU90aGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHMtdGFibGUtb3RoZXInKTtcbiAgICBjb25zdCB0YWJsZU5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmVzdWx0c19fbmF2LWl0ZW1cIik7XG4gICAgY29uc3QgcHJlZGljdENvbHVtbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19jb2x1bW5cIik7XG4gICAgY29uc3QgbW92ZUxlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlX19tb3ZlLWxlZnRcIik7XG4gICAgY29uc3QgbW92ZVJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZV9fbW92ZS1yaWdodFwiKTtcblxuICAgIGxldCB0b3VybmFtZW50U3RhZ2UgPSAyXG5cbiAgICBsZXQgY29sdW1uSW5kZXggPSB0b3VybmFtZW50U3RhZ2UgLSAxXG5cblxuXG4gICAgbGV0IGxvY2FsZSA9ICdlbic7XG4gICAgbGV0IHVzZXJzO1xuICAgIGxldCBpMThuRGF0YSA9IHt9O1xuICAgIGxldCB1c2VySWQ7XG4gICAgdXNlcklkID0gMTAwMzAwMjY4O1xuXG4gICAgY29uc3QgUFJJWkVTX0NTUyA9IFsncGxhY2UxJywgJ3BsYWNlMicsICdwbGFjZTMnXTtcblxuXG5cbiAgICBsZXQgcHJlZGljdERhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJlZGljdERhdGFcIikpIHx8IFtdO1xuICAgIGNvbnNvbGUubG9nKHByZWRpY3REYXRhKVxuICAgIGZ1bmN0aW9uIGxvYWRUcmFuc2xhdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgJHthcGlVUkx9L3RyYW5zbGF0ZXMvJHtsb2NhbGV9YCkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKGpzb24gPT4ge1xuICAgICAgICAgICAgICAgIGkxOG5EYXRhID0ganNvbjtcbiAgICAgICAgICAgICAgICAvLyB0cmFuc2xhdGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIHZhciBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICAgICAgICAgIC8vICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICAvLyBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nwb3J0VG91cicpLCB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAvLyAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKCkge1xuICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKVxuICAgICAgICBpZiAoZWxlbXMgJiYgZWxlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhlbGVtZW50LCBiYXNlQ3NzQ2xhc3MpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBsYW5nIG9mIFsndWsnLCAnZW4nXSkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGJhc2VDc3NDbGFzcyArIGxhbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChiYXNlQ3NzQ2xhc3MgKyBsb2NhbGUpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3QgPSBmdW5jdGlvbiAobGluaywgZXh0cmFPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChhcGlVUkwgKyBsaW5rLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uKGV4dHJhT3B0aW9ucyB8fCB7fSlcbiAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGdldERhdGEoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICByZXF1ZXN0KCcvdXNlcnM/bm9jYWNoZT0xJyksXG4gICAgICAgIF0pXG4gICAgfVxuXG4gICAgY29uc3QgSW5pdFBhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGdldERhdGEoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB1c2VycyA9IHJlc1swXS5zb3J0KChhLCBiKSA9PiBiLnBvaW50cyAtIGEucG9pbnRzKTtcbiAgICAgICAgICAgIC8vIHVzZXJzID0gdXNlcnMuc2xpY2UoMCwgMTApXG4gICAgICAgICAgICByZW5kZXJVc2Vycyh1c2Vycyk7XG4gICAgICAgICAgICAvLyB0cmFuc2xhdGUoKTtcbiAgICAgICAgfSlcbiAgICAgICAgaWYod2luZG93LmlubmVyV2lkdGggPD0gNTAwKXtcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZVN0YWdlKHByZWRpY3RDb2x1bW5zKTtcbiAgICAgICAgfVxuICAgICAgICBwcmVkaWN0Q29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGkpID0+e1xuICAgICAgICAgICAgaWYoaSArIDEgPiB0b3VybmFtZW50U3RhZ2Upe1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jbGFzc0xpc3QuYWRkKFwiX2xvY2tcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGkgKyAxIDwgdG91cm5hbWVudFN0YWdlKXtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmFkZChcIl9kb25lXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRQcmVkaWN0Q29sdW1uKGNvbHVtbilcbiAgICAgICAgICAgIGlmKGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJfbG9ja1wiKSl7XG4gICAgICAgICAgICAgICAgY29uc3QgdGVhbXMgPSBjb2x1bW4ucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX190ZWFtLW5hbWUnKVxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBjb2x1bW4ucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX19jaG9zZS1kYXRlJylcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lID0gY29sdW1uLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9fY2hvc2UtdGltZScpXG4gICAgICAgICAgICAgICAgdGVhbXMuZm9yRWFjaCh0ZWFtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGVhbS50ZXh0Q29udGVudCA9IFwi4oCUXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGRhdGUuZm9yRWFjaChkYXRlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZS50ZXh0Q29udGVudCA9IFwi4oCUXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRpbWUuZm9yRWFjaCh0aW1lID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGltZS50ZXh0Q29udGVudCA9IFwi4oCUXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuc3RvcmUpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHdpbmRvdy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgdXNlcklkID0gc3RhdGUuYXV0aC5pc0F1dGhvcml6ZWQgJiYgc3RhdGUuYXV0aC5pZCB8fCAnJztcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICAgICAgbGV0IGMgPSAwO1xuICAgICAgICAgICAgdmFyIGkgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISF3aW5kb3cuZ191c2VyX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQgPSB3aW5kb3cuZ191c2VyX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH19XG5cblxuICAgIGZ1bmN0aW9uIHJlbmRlclVzZXJzKHVzZXJzKSB7XG4gICAgICAgIHBvcHVsYXRlVXNlcnNUYWJsZSh1c2VycywgdXNlcklkKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQpIHtcbiAgICAgICAgcmVzdWx0c1RhYmxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICByZXN1bHRzVGFibGVPdGhlci5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBpZiAoIXVzZXJzIHx8ICF1c2Vycy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBsZXQgdG9wVXNlcnMgPSB1c2Vycy5zbGljZSgwLCAyMCk7XG4gICAgICAgIHRvcFVzZXJzLmZvckVhY2godXNlciA9PiBkaXNwbGF5VXNlcih1c2VyLCB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCwgcmVzdWx0c1RhYmxlLCB1c2VycykpO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gdXNlcnMuZmluZCh1c2VyID0+IHVzZXIudXNlcmlkID09PSBjdXJyZW50VXNlcklkKTtcbiAgICAgICAgY29uc3QgY3VycmVudFVzZXJJbmRleCA9IGN1cnJlbnRVc2VyID8gdXNlcnMuaW5kZXhPZihjdXJyZW50VXNlcikgOiAtMTtcblxuICAgICAgICBpZiAoY3VycmVudFVzZXJJbmRleCA+PSAxMCkge1xuICAgICAgICAgICAgbGV0IG90aGVyVXNlcnMgPSB1c2Vycy5zbGljZShNYXRoLm1heCgxMCwgY3VycmVudFVzZXJJbmRleCAtIDEpLCBjdXJyZW50VXNlckluZGV4ICsgMik7XG4gICAgICAgICAgICBvdGhlclVzZXJzLmZvckVhY2godXNlciA9PiBkaXNwbGF5VXNlcih1c2VyLCB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCwgcmVzdWx0c1RhYmxlT3RoZXIsIHVzZXJzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNwbGF5VXNlcih1c2VyLCBpc0N1cnJlbnRVc2VyLCB0YWJsZSwgYWxsVXNlcnMpIHtcbiAgICAgICAgY29uc3QgYWRkaXRpb25hbFVzZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgndGFibGVSZXN1bHRzX19yb3cnKTtcblxuXG5cbiAgICAgICAgY29uc3QgcGxhY2UgPSBhbGxVc2Vycy5pbmRleE9mKHVzZXIpICsgMTtcbiAgICAgICAgY29uc3QgcHJpemVQbGFjZUNzcyA9IFBSSVpFU19DU1NbcGxhY2UgLSAxXTtcbiAgICAgICAgaWYgKHByaXplUGxhY2VDc3MpIHtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQocHJpemVQbGFjZUNzcyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcml6ZUtleSA9IGdldFByaXplVHJhbnNsYXRpb25LZXkocGxhY2UpO1xuICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHtwbGFjZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke2lzQ3VycmVudFVzZXIgPyB1c2VyLnVzZXJpZCA6IG1hc2tVc2VySWQodXNlci51c2VyaWQpfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19yb3ctaXRlbVwiPiR7dXNlci5wb2ludHN9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHt1c2VyLm11bHRpcGxpZXJ9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHt1c2VyLnRvdGFsUG9pbnRzfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19yb3ctaXRlbVwiPiR7cHJpemVLZXkgPyB0cmFuc2xhdGVLZXkocHJpemVLZXkpIDogJyAtICd9PC9kaXY+XG4gICAgYDtcbiAgICAgICAgaWYgKGlzQ3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHlvdUJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB5b3VCbG9jay5zZXRBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJywgJ3lvdScpO1xuICAgICAgICAgICAgeW91QmxvY2sudGV4dENvbnRlbnQgPSBcItCi0LhcIiAvLyDQtNC70Y8g0YLQtdGB0YLRgyDQv9C+0LrQuCDQvdC10LzQsCDRgtGA0LDQvdGB0LvQtdC50YLRltCyXG4gICAgICAgICAgICB5b3VCbG9jay5jbGFzc0xpc3QuYWRkKCdfeW91cicpO1xuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuYXBwZW5kKHlvdUJsb2NrKVxuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZChcIl95b3VyXCIpXG5cbiAgICAgICAgfVxuICAgICAgICB0YWJsZS5hcHBlbmQoYWRkaXRpb25hbFVzZXJSb3cpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtYXNrVXNlcklkKHVzZXJJZCkge1xuICAgICAgICByZXR1cm4gXCIqKlwiICsgdXNlcklkLnRvU3RyaW5nKCkuc2xpY2UoMik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlS2V5KGtleSkge1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5KHBsYWNlKSB7XG4gICAgICAgIGlmIChwbGFjZSA8PSA1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXyR7cGxhY2V9YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzYtMTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTEtMjBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMjEtMzVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMzYtNTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNTEtNzVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzc2LTEwMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMjUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTAxLTEyNWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxNTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTI2LTE1MGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTUxLTE3NWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAyMDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTc2LTIwMGBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHBvcHVwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5mb19faXRlbS1idG5cIilcbiAgICBjb25zdCBwb3B1cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmluZm9fX2l0ZW0tcG9wdXBcIilcblxuXG4gICAgcG9wdXBzLmZvckVhY2goKHBvcHVwLCBpKSA9PntcbiAgICAgICAgaWYoaSA9PT0gMCl7XG4gICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFwiX2xlZnRcIilcbiAgICAgICAgfVxuICAgICAgICBpZihpID09PSBwb3B1cHMubGVuZ3RoIC0gMSl7XG4gICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFwiX3JpZ2h0XCIpXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2xvc2UgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX2l0ZW0tcG9wdXAtY2xvc2VcIilcbiAgICAgICAgY29uc3Qgb3BlbiA9IHBvcHVwLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi5pbmZvX19pdGVtLWJ0blwiKVxuICAgICAgICBzZXRQb3B1cChvcGVuLCBjbG9zZSwgcG9wdXApXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIHNldFBvcHVwKG9wZW4sIGNsb3NlLCBwb3B1cCl7XG4gICAgICAgIG9wZW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcIm9wYWNpdHlcIilcbiAgICAgICAgfSlcbiAgICAgICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZChcIm9wYWNpdHlcIilcbiAgICAgICAgfSlcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgIGlmKCFwb3B1cC5jb250YWlucyhlLnRhcmdldCkgJiYgZS50YXJnZXQgIT09IG9wZW4pe1xuICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJvcGFjaXR5XCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdGFibGVOYXYuZm9yRWFjaCgoaXRlbSwgaSkgPT57XG4gICAgICAgIGlmKGkgKyAxID4gdG91cm5hbWVudFN0YWdlKXtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9sb2NrXCIpXG4gICAgICAgIH1cblxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJfbG9ja1wiKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWJsZU5hdi5mb3JFYWNoKG5hdiA9PntcbiAgICAgICAgICAgICAgICBuYXYuY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBhY3RpdmF0ZVNlbGVjdGVkVGVhbXMoc3RvcmVkUHJlZGljdERhdGEpIHtcblxuICAgICAgICAvLyDQn9GA0L7RhdC+0LTQuNC80L7RgdGPINC/0L4g0LLRgdGW0YUg0LXQu9C10LzQtdC90YLQsNGFIHByZWRpY3REYXRhXG4gICAgICAgIHN0b3JlZFByZWRpY3REYXRhLmZvckVhY2goZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHN0YWdlLCB0ZWFtIH0gPSBkYXRhO1xuXG4gICAgICAgICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0LLRgdGWINC60L7Qu9C+0L3QutC4LCDRj9C60ZYg0LLRltC00L/QvtCy0ZbQtNCw0Y7RgtGMINC00LDQvdC+0LzRgyDQtdGC0LDQv9GDIChzdGFnZSlcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtnZXRTdGFnZUNsYXNzKHN0YWdlKX1gKTtcblxuICAgICAgICAgICAgY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICAgICAgLy8g0JfQvdCw0YXQvtC00LjQvNC+INCy0YHRliDQsdC70L7QutC4INC3INC60L7QvNCw0L3QtNCw0LzQuCDQsiDRhtGW0Lkg0LrQvtC70L7QvdGG0ZZcbiAgICAgICAgICAgICAgICBjb25zdCB0ZWFtQmxvY2tzID0gY29sdW1uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2Nob3NlXCIpO1xuXG4gICAgICAgICAgICAgICAgdGVhbUJsb2Nrcy5mb3JFYWNoKGJsb2NrID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8g0JfQvdCw0YXQvtC00LjQvNC+INCy0YHRliDRgNCw0LTRltC+0LrQvdC+0L/QutC4INGC0LAg0L3QsNC30LLQuCDQutC+0LzQsNC90LQg0LIg0YbRjNC+0LzRgyDQsdC70L7QutGDXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRlYW1SYWRpb3MgPSBibG9jay5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX190ZWFtLXJhZGlvXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZWFtcyA9IGJsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX3RlYW0tbmFtZVwiKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyDQn9GA0L7RhdC+0LTQuNC80L7RgdGPINC/0L4g0LLRgdGW0YUg0LrQvtC80LDQvdC00LDRhSDQsiDQsdC70L7QutGDXG4gICAgICAgICAgICAgICAgICAgIHRlYW1zLmZvckVhY2goKHRlYW1FbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0K/QutGJ0L4g0L3QsNC30LLQsCDQutC+0LzQsNC90LTQuCDRgdC/0ZbQstC/0LDQtNCw0ZQg0Lcg0LLQuNCx0YDQsNC90L7RjiDQutC+0LzQsNC90LTQvtGOINC3IHByZWRpY3REYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVhbUVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpID09PSB0ZWFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g0JDQutGC0LjQstGD0ZTQvNC+INCy0ZbQtNC/0L7QstGW0LTQvdGDINGA0LDQtNGW0L7QutC90L7Qv9C60YNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZWFtUmFkaW9zW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4vLyDQlNC+0L/QvtC80ZbQttC90LAg0YTRg9C90LrRhtGW0Y8g0LTQu9GPINC+0YLRgNC40LzQsNC90L3RjyDQutC70LDRgdGDINC10YLQsNC/0YMg0L3QsCDQvtGB0L3QvtCy0ZYg0LnQvtCz0L4g0L3QsNC30LLQuFxuICAgIGZ1bmN0aW9uIGdldFN0YWdlQ2xhc3Moc3RhZ2UpIHtcbiAgICAgICAgc3dpdGNoIChzdGFnZSkge1xuICAgICAgICAgICAgY2FzZSBcIk9wZW5pbmcgU3RhZ2VcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFnZTEtOFwiO1xuICAgICAgICAgICAgY2FzZSBcIlF1YXJ0ZXJmaW5hbHNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFnZTEtNFwiO1xuICAgICAgICAgICAgY2FzZSBcIlNlbWlmaW5hbHNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFnZTEtMlwiO1xuICAgICAgICAgICAgY2FzZSBcIkZpbmFsXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RhZ2UtZmluYWxcIjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiBhY3RpdmF0ZVNlbGVjdGVkVGVhbXMocHJlZGljdERhdGEpKTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxvY2FsU3RvcmFnZSgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcmVkaWN0RGF0YVwiLCBKU09OLnN0cmluZ2lmeShwcmVkaWN0RGF0YSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRlYW1OYW1lKHRlYW1CbG9jaywgc3RhZ2UsIGNvbHVtbikge1xuICAgICAgICBpZihjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiX2RvbmVcIikgfHwgY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcIl9hY3RpdmVcIikpe1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGVhbVJhZGlvcyA9IHRlYW1CbG9jay5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX190ZWFtLXJhZGlvXCIpO1xuICAgICAgICBjb25zdCB0ZWFtcyA9IHRlYW1CbG9jay5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX190ZWFtLW5hbWVcIik7XG5cbiAgICAgICAgdGVhbVJhZGlvcy5mb3JFYWNoKChyYWRpbywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRlYW1SYWRpb3MuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIikpXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRlYW0gPSB0ZWFtc1tpbmRleF0udGV4dENvbnRlbnQudHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgLy8g0JLQuNC00LDQu9GP0ZTQvNC+INC/0L7Qv9C10YDQtdC00L3RjiDQutC+0LzQsNC90LTRgyDQtyDRhtGM0L7Qs9C+INCx0LvQvtC60YNcbiAgICAgICAgICAgICAgICBwcmVkaWN0RGF0YSA9IHByZWRpY3REYXRhLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uc3RhZ2UgIT09IHN0YWdlKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIUFycmF5LmZyb20odGVhbXMpLnNvbWUodGVhbSA9PiB0ZWFtLnRleHRDb250ZW50LnRyaW0oKSA9PT0gaXRlbS50ZWFtKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vINCU0L7QtNCw0ZTQvNC+INC90L7QstGDINC60L7QvNCw0L3QtNGDXG4gICAgICAgICAgICAgICAgcHJlZGljdERhdGEucHVzaCh7IHN0YWdlOiBzdGFnZSwgdGVhbTogc2VsZWN0ZWRUZWFtIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8g0J7QvdC+0LLQu9GO0ZTQvNC+IGxvY2FsU3RvcmFnZVxuICAgICAgICAgICAgICAgIHVwZGF0ZUxvY2FsU3RvcmFnZSgpO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHJlZGljdERhdGEpOyAvLyDQn9C10YDQtdCy0ZbRgNGP0ZTQvNC+LCDRh9C4INC/0YDQsNCy0LjQu9GM0L3QviDQv9GA0LDRhtGO0ZRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHNldFByZWRpY3RDb2x1bW4oY29sdW1uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJfbG9ja1wiKSApXG4gICAgICAgIGxldCBzdGFnZSA9IFwiXCJcblxuICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwic3RhZ2UxLThcIikgPyBzdGFnZSA9IFwiT3BlbmluZyBTdGFnZVwiIDogbnVsbDtcbiAgICAgICAgY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcInN0YWdlMS00XCIpID8gc3RhZ2UgPSBcIlF1YXJ0ZXJmaW5hbHNcIiA6IG51bGw7XG4gICAgICAgIGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJzdGFnZTEtMlwiKSA/IHN0YWdlID0gXCJTZW1pZmluYWxzXCIgOiBudWxsO1xuICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwic3RhZ2UtZmluYWxcIikgPyBzdGFnZSA9IFwiRmluYWxcIiA6IG51bGw7XG5cbiAgICAgICAgY29uc3QgdGVhbUJsb2NrcyA9IGNvbHVtbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19jaG9zZVwiKTtcblxuICAgICAgICB0ZWFtQmxvY2tzLmZvckVhY2goYmxvY2sgPT4gZ2V0VGVhbU5hbWUoYmxvY2ssIHN0YWdlLCBjb2x1bW4pKTtcblxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQWN0aXZlU3RhZ2Uoc3RhZ2VzKSB7XG4gICAgICAgIHN0YWdlcy5mb3JFYWNoKChzdGFnZSwgaW5kZXgpID0+IHtcblxuICAgICAgICAgICAgc3RhZ2UuY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIGlmKGluZGV4ID09PSBjb2x1bW5JbmRleCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzYWRhc1wiKVxuICAgICAgICAgICAgICAgIHN0YWdlLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1vdmVMZWZ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChjb2x1bW5JbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBjb2x1bW5JbmRleC0tO1xuICAgICAgICAgICAgdXBkYXRlQWN0aXZlU3RhZ2UocHJlZGljdENvbHVtbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2x1bW5JbmRleCA8IDApIHtcbiAgICAgICAgICAgIGNvbHVtbkluZGV4ID0gcHJlZGljdENvbHVtbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZVN0YWdlKHByZWRpY3RDb2x1bW5zKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbW92ZVJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChjb2x1bW5JbmRleCA8IHByZWRpY3RDb2x1bW5zLmxlbmd0aCAtIDEgfHwgY29sdW1uSW5kZXggPj0gMCkge1xuICAgICAgICAgICAgY29sdW1uSW5kZXgrKztcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZVN0YWdlKHByZWRpY3RDb2x1bW5zKTtcbiAgICAgICAgfVxuICAgICAgICBpZihjb2x1bW5JbmRleCA9PT0gcHJlZGljdENvbHVtbnMubGVuZ3RoKXtcbiAgICAgICAgICAgIGNvbHVtbkluZGV4ID0gMFxuICAgICAgICAgICAgdXBkYXRlQWN0aXZlU3RhZ2UocHJlZGljdENvbHVtbnMpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuXG5cblxuICAgIGxvYWRUcmFuc2xhdGlvbnMoKVxuICAgICAgICAudGhlbihpbml0KTtcblxufSkoKVxuXG4iXX0=

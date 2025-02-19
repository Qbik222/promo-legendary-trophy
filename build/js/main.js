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
  var tournamentStage = 1;
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

    predictColumns.forEach(function (column) {
      setPredictColumn(column);
      if (column.classList.contains("_lock")) {
        var teams = column.querySelectorAll('.table__team-name');
        teams.forEach(function (team) {
          team.textContent = "—";
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
  loadTranslations().then(init);
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwicmVzdWx0c1RhYmxlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicmVzdWx0c1RhYmxlSGVhZCIsInRvcFJlc3VsdHNUYWJsZSIsInJlc3VsdHNUYWJsZU90aGVyIiwidGFibGVOYXYiLCJxdWVyeVNlbGVjdG9yQWxsIiwicHJlZGljdENvbHVtbnMiLCJ0b3VybmFtZW50U3RhZ2UiLCJsb2NhbGUiLCJ1c2VycyIsImkxOG5EYXRhIiwidXNlcklkIiwiUFJJWkVTX0NTUyIsInByZWRpY3REYXRhIiwiSlNPTiIsInBhcnNlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImNvbnNvbGUiLCJsb2ciLCJsb2FkVHJhbnNsYXRpb25zIiwiZmV0Y2giLCJ0aGVuIiwicmVzIiwianNvbiIsInRyYW5zbGF0ZSIsImVsZW1zIiwibGVuZ3RoIiwiZm9yRWFjaCIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJyZWZyZXNoTG9jYWxpemVkQ2xhc3MiLCJlbGVtZW50IiwiYmFzZUNzc0NsYXNzIiwibGFuZyIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInJlcXVlc3QiLCJsaW5rIiwiZXh0cmFPcHRpb25zIiwiaGVhZGVycyIsImdldERhdGEiLCJQcm9taXNlIiwiYWxsIiwiSW5pdFBhZ2UiLCJzb3J0IiwiYSIsImIiLCJwb2ludHMiLCJyZW5kZXJVc2VycyIsImNvbHVtbiIsInNldFByZWRpY3RDb2x1bW4iLCJjb250YWlucyIsInRlYW1zIiwidGVhbSIsInRleHRDb250ZW50IiwiaW5pdCIsIndpbmRvdyIsInN0b3JlIiwic3RhdGUiLCJnZXRTdGF0ZSIsImF1dGgiLCJpc0F1dGhvcml6ZWQiLCJpZCIsImMiLCJpIiwic2V0SW50ZXJ2YWwiLCJnX3VzZXJfaWQiLCJjbGVhckludGVydmFsIiwicG9wdWxhdGVVc2Vyc1RhYmxlIiwiY3VycmVudFVzZXJJZCIsInRvcFVzZXJzIiwic2xpY2UiLCJ1c2VyIiwiZGlzcGxheVVzZXIiLCJ1c2VyaWQiLCJjdXJyZW50VXNlciIsImZpbmQiLCJjdXJyZW50VXNlckluZGV4IiwiaW5kZXhPZiIsIm90aGVyVXNlcnMiLCJNYXRoIiwibWF4IiwiaXNDdXJyZW50VXNlciIsInRhYmxlIiwiYWxsVXNlcnMiLCJhZGRpdGlvbmFsVXNlclJvdyIsImNyZWF0ZUVsZW1lbnQiLCJwbGFjZSIsInByaXplUGxhY2VDc3MiLCJwcml6ZUtleSIsImdldFByaXplVHJhbnNsYXRpb25LZXkiLCJtYXNrVXNlcklkIiwibXVsdGlwbGllciIsInRvdGFsUG9pbnRzIiwidHJhbnNsYXRlS2V5IiwieW91QmxvY2siLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmQiLCJ0b1N0cmluZyIsInBvcHVwQnRucyIsInBvcHVwcyIsInBvcHVwIiwiY2xvc2UiLCJvcGVuIiwicGFyZW50Tm9kZSIsInNldFBvcHVwIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJpdGVtIiwibmF2IiwiYWN0aXZhdGVTZWxlY3RlZFRlYW1zIiwic3RvcmVkUHJlZGljdERhdGEiLCJkYXRhIiwic3RhZ2UiLCJjb2x1bW5zIiwiZ2V0U3RhZ2VDbGFzcyIsInRlYW1CbG9ja3MiLCJibG9jayIsInRlYW1SYWRpb3MiLCJ0ZWFtRWxlbWVudCIsImluZGV4IiwidHJpbSIsInVwZGF0ZUxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJnZXRUZWFtTmFtZSIsInRlYW1CbG9jayIsInJhZGlvIiwic2VsZWN0ZWRUZWFtIiwiZmlsdGVyIiwiQXJyYXkiLCJmcm9tIiwic29tZSIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsQ0FBQyxZQUFXO0VBQ1IsSUFBTUEsTUFBTSxHQUFHLG1DQUFtQztFQUNsRCxJQUFNQyxZQUFZLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGdCQUFnQixDQUFDO0VBQzdELElBQU1DLGdCQUFnQixHQUFHSCxZ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QUFHLGVBQWUsR0FBRyxJQUFJO0lBQ3RFakUsTUFBTSxDQUFDaEIsU0FBUyxDQUFDa0IsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHK0QsS0FBSyxHQUFHLFlBQVksR0FBRyxJQUFJO0lBQ25FakUsTUFBTSxDQUFDaEIsU0FBUyxDQUFDa0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHK0QsS0FBSyxHQUFHLE9BQU8sR0FBRyxJQUFJO0lBRWpFLElBQU1HLFVBQVUsR0FBR3BFLE1BQU0sQ0FBQ2pELGdCQUFnQixDQUFDLGVBQWUsQ0FBQztJQUUzRHFILFVBQVUsQ0FBQzlGLE9BQU8sQ0FBQyxVQUFBK0YsS0FBSztNQUFBLE9BQUlRLFdBQVcsQ0FBQ1IsS0FBSyxFQUFFSixLQUFLLEVBQUVqRSxNQUFNLENBQUM7SUFBQSxFQUFDO0VBR2xFO0VBRUFsQyxnQkFBZ0IsRUFBRSxDQUNiRSxJQUFJLENBQUNzQyxJQUFJLENBQUM7QUFFbkIsQ0FBQyxHQUFHIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCl7XG4gICAgY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vZmF2LXByb20uY29tL2FwaV9zaGFuZ2hhaSc7XG4gICAgY29uc3QgcmVzdWx0c1RhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHMtdGFibGUnKTtcbiAgICBjb25zdCByZXN1bHRzVGFibGVIZWFkID0gcmVzdWx0c1RhYmxlLnF1ZXJ5U2VsZWN0b3IoJy50YWJsZVJlc3VsdHNfX2hlYWQnKTtcbiAgICBjb25zdCB0b3BSZXN1bHRzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9wLXVzZXJzJyk7XG4gICAgY29uc3QgcmVzdWx0c1RhYmxlT3RoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdWx0cy10YWJsZS1vdGhlcicpO1xuICAgIGNvbnN0IHRhYmxlTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yZXN1bHRzX19uYXYtaXRlbVwiKTtcbiAgICBjb25zdCBwcmVkaWN0Q29sdW1ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2NvbHVtblwiKVxuXG4gICAgbGV0IHRvdXJuYW1lbnRTdGFnZSA9IDFcblxuICAgIGxldCBsb2NhbGUgPSAnZW4nO1xuICAgIGxldCB1c2VycztcbiAgICBsZXQgaTE4bkRhdGEgPSB7fTtcbiAgICBsZXQgdXNlcklkO1xuICAgIHVzZXJJZCA9IDEwMDMwMDI2ODtcblxuICAgIGNvbnN0IFBSSVpFU19DU1MgPSBbJ3BsYWNlMScsICdwbGFjZTInLCAncGxhY2UzJ107XG5cblxuXG4gICAgbGV0IHByZWRpY3REYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByZWRpY3REYXRhXCIpKSB8fCBbXTtcbiAgICBjb25zb2xlLmxvZyhwcmVkaWN0RGF0YSlcbiAgICBmdW5jdGlvbiBsb2FkVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMfS90cmFuc2xhdGVzLyR7bG9jYWxlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YSA9IGpzb247XG4gICAgICAgICAgICAgICAgLy8gdHJhbnNsYXRlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyB2YXIgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAgICAgLy8gbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcG9ydFRvdXInKSwge1xuICAgICAgICAgICAgICAgIC8vICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgLy8gICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZSgpIHtcbiAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10cmFuc2xhdGVdJylcbiAgICAgICAgaWYgKGVsZW1zICYmIGVsZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgZWxlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoTG9jYWxpemVkQ2xhc3MoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoTG9jYWxpemVkQ2xhc3MoZWxlbWVudCwgYmFzZUNzc0NsYXNzKSB7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBbJ3VrJywgJ2VuJ10pIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShiYXNlQ3NzQ2xhc3MgKyBsYW5nKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYmFzZUNzc0NsYXNzICsgbG9jYWxlKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gZnVuY3Rpb24gKGxpbmssIGV4dHJhT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gZmV0Y2goYXBpVVJMICsgbGluaywge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLihleHRyYU9wdGlvbnMgfHwge30pXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgcmVxdWVzdCgnL3VzZXJzP25vY2FjaGU9MScpLFxuICAgICAgICBdKVxuICAgIH1cblxuICAgIGNvbnN0IEluaXRQYWdlID0gKCkgPT4ge1xuICAgICAgICBnZXREYXRhKCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgdXNlcnMgPSByZXNbMF0uc29ydCgoYSwgYikgPT4gYi5wb2ludHMgLSBhLnBvaW50cyk7XG4gICAgICAgICAgICAvLyB1c2VycyA9IHVzZXJzLnNsaWNlKDAsIDEwKVxuICAgICAgICAgICAgcmVuZGVyVXNlcnModXNlcnMpO1xuICAgICAgICAgICAgLy8gdHJhbnNsYXRlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIHByZWRpY3RDb2x1bW5zLmZvckVhY2goY29sdW1uID0+e1xuICAgICAgICAgICAgc2V0UHJlZGljdENvbHVtbihjb2x1bW4pXG4gICAgICAgICAgICBpZihjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiX2xvY2tcIikpe1xuICAgICAgICAgICAgICAgIGNvbnN0IHRlYW1zID0gY29sdW1uLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9fdGVhbS1uYW1lJylcbiAgICAgICAgICAgICAgICB0ZWFtcy5mb3JFYWNoKHRlYW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICB0ZWFtLnRleHRDb250ZW50ID0gXCLigJRcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5zdG9yZSkge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gd2luZG93LnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICAgICAgICB1c2VySWQgPSBzdGF0ZS5hdXRoLmlzQXV0aG9yaXplZCAmJiBzdGF0ZS5hdXRoLmlkIHx8ICcnO1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgICAgICBsZXQgYyA9IDA7XG4gICAgICAgICAgICB2YXIgaSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXdpbmRvdy5nX3VzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCA9IHdpbmRvdy5nX3VzZXJfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2tVc2VyQXV0aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfX1cblxuXG4gICAgZnVuY3Rpb24gcmVuZGVyVXNlcnModXNlcnMpIHtcbiAgICAgICAgcG9wdWxhdGVVc2Vyc1RhYmxlKHVzZXJzLCB1c2VySWQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBvcHVsYXRlVXNlcnNUYWJsZSh1c2VycywgY3VycmVudFVzZXJJZCkge1xuICAgICAgICByZXN1bHRzVGFibGUuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIGlmICghdXNlcnMgfHwgIXVzZXJzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCB0b3BVc2VycyA9IHVzZXJzLnNsaWNlKDAsIDIwKTtcbiAgICAgICAgdG9wVXNlcnMuZm9yRWFjaCh1c2VyID0+IGRpc3BsYXlVc2VyKHVzZXIsIHVzZXIudXNlcmlkID09PSBjdXJyZW50VXNlcklkLCByZXN1bHRzVGFibGUsIHVzZXJzKSk7XG5cbiAgICAgICAgY29uc3QgY3VycmVudFVzZXIgPSB1c2Vycy5maW5kKHVzZXIgPT4gdXNlci51c2VyaWQgPT09IGN1cnJlbnRVc2VySWQpO1xuICAgICAgICBjb25zdCBjdXJyZW50VXNlckluZGV4ID0gY3VycmVudFVzZXIgPyB1c2Vycy5pbmRleE9mKGN1cnJlbnRVc2VyKSA6IC0xO1xuXG4gICAgICAgIGlmIChjdXJyZW50VXNlckluZGV4ID49IDEwKSB7XG4gICAgICAgICAgICBsZXQgb3RoZXJVc2VycyA9IHVzZXJzLnNsaWNlKE1hdGgubWF4KDEwLCBjdXJyZW50VXNlckluZGV4IC0gMSksIGN1cnJlbnRVc2VySW5kZXggKyAyKTtcbiAgICAgICAgICAgIG90aGVyVXNlcnMuZm9yRWFjaCh1c2VyID0+IGRpc3BsYXlVc2VyKHVzZXIsIHVzZXIudXNlcmlkID09PSBjdXJyZW50VXNlcklkLCByZXN1bHRzVGFibGVPdGhlciwgdXNlcnMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc3BsYXlVc2VyKHVzZXIsIGlzQ3VycmVudFVzZXIsIHRhYmxlLCBhbGxVc2Vycykge1xuICAgICAgICBjb25zdCBhZGRpdGlvbmFsVXNlclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKCd0YWJsZVJlc3VsdHNfX3JvdycpO1xuXG5cblxuICAgICAgICBjb25zdCBwbGFjZSA9IGFsbFVzZXJzLmluZGV4T2YodXNlcikgKyAxO1xuICAgICAgICBjb25zdCBwcml6ZVBsYWNlQ3NzID0gUFJJWkVTX0NTU1twbGFjZSAtIDFdO1xuICAgICAgICBpZiAocHJpemVQbGFjZUNzcykge1xuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZChwcml6ZVBsYWNlQ3NzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByaXplS2V5ID0gZ2V0UHJpemVUcmFuc2xhdGlvbktleShwbGFjZSk7XG4gICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke3BsYWNlfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19yb3ctaXRlbVwiPiR7aXNDdXJyZW50VXNlciA/IHVzZXIudXNlcmlkIDogbWFza1VzZXJJZCh1c2VyLnVzZXJpZCl9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHt1c2VyLnBvaW50c308L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke3VzZXIubXVsdGlwbGllcn08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke3VzZXIudG90YWxQb2ludHN9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHtwcml6ZUtleSA/IHRyYW5zbGF0ZUtleShwcml6ZUtleSkgOiAnIC0gJ308L2Rpdj5cbiAgICBgO1xuICAgICAgICBpZiAoaXNDdXJyZW50VXNlcikge1xuICAgICAgICAgICAgY29uc3QgeW91QmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHlvdUJsb2NrLnNldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnLCAneW91Jyk7XG4gICAgICAgICAgICB5b3VCbG9jay50ZXh0Q29udGVudCA9IFwi0KLQuFwiIC8vINC00LvRjyDRgtC10YHRgtGDINC/0L7QutC4INC90LXQvNCwINGC0YDQsNC90YHQu9C10LnRgtGW0LJcbiAgICAgICAgICAgIHlvdUJsb2NrLmNsYXNzTGlzdC5hZGQoJ195b3VyJyk7XG4gICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5hcHBlbmQoeW91QmxvY2spXG4gICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKFwiX3lvdXJcIilcblxuICAgICAgICB9XG4gICAgICAgIHRhYmxlLmFwcGVuZChhZGRpdGlvbmFsVXNlclJvdyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1hc2tVc2VySWQodXNlcklkKSB7XG4gICAgICAgIHJldHVybiBcIioqXCIgKyB1c2VySWQudG9TdHJpbmcoKS5zbGljZSgyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVLZXkoa2V5KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByaXplVHJhbnNsYXRpb25LZXkocGxhY2UpIHtcbiAgICAgICAgaWYgKHBsYWNlIDw9IDUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfJHtwbGFjZX1gXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNi0xMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAyMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8xMS0yMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAzNSkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8yMS0zNWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSA1MCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8zNi01MGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSA3NSkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV81MS03NWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNzYtMTAwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEyNSkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8xMDEtMTI1YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDE1MCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8xMjYtMTUwYFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDE3NSkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8xNTEtMTc1YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDIwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBwcml6ZV8xNzYtMjAwYFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcG9wdXBCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbmZvX19pdGVtLWJ0blwiKVxuICAgIGNvbnN0IHBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5mb19faXRlbS1wb3B1cFwiKVxuXG5cbiAgICBwb3B1cHMuZm9yRWFjaCgocG9wdXAsIGkpID0+e1xuICAgICAgICBjb25zdCBjbG9zZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIuaW5mb19faXRlbS1wb3B1cC1jbG9zZVwiKVxuICAgICAgICBjb25zdCBvcGVuID0gcG9wdXAucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX2l0ZW0tYnRuXCIpXG4gICAgICAgIHNldFBvcHVwKG9wZW4sIGNsb3NlLCBwb3B1cClcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gc2V0UG9wdXAob3BlbiwgY2xvc2UsIHBvcHVwKXtcbiAgICAgICAgb3Blbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwib3BhY2l0eVwiKVxuICAgICAgICB9KVxuICAgICAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKFwib3BhY2l0eVwiKVxuICAgICAgICB9KVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgICAgaWYoIXBvcHVwLmNvbnRhaW5zKGUudGFyZ2V0KSAmJiBlLnRhcmdldCAhPT0gb3Blbil7XG4gICAgICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZChcIm9wYWNpdHlcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0YWJsZU5hdi5mb3JFYWNoKChpdGVtLCBpKSA9PntcbiAgICAgICAgaWYoaSArIDEgPiB0b3VybmFtZW50U3RhZ2Upe1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiX2xvY2tcIilcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgIGlmKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIl9sb2NrXCIpKXtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhYmxlTmF2LmZvckVhY2gobmF2ID0+e1xuICAgICAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpXG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIGFjdGl2YXRlU2VsZWN0ZWRUZWFtcyhzdG9yZWRQcmVkaWN0RGF0YSkge1xuXG4gICAgICAgIC8vINCf0YDQvtGF0L7QtNC40LzQvtGB0Y8g0L/QviDQstGB0ZbRhSDQtdC70LXQvNC10L3RgtCw0YUgcHJlZGljdERhdGFcbiAgICAgICAgc3RvcmVkUHJlZGljdERhdGEuZm9yRWFjaChkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhZ2UsIHRlYW0gfSA9IGRhdGE7XG5cbiAgICAgICAgICAgIC8vINCX0L3QsNGF0L7QtNC40LzQviDQstGB0ZYg0LrQvtC70L7QvdC60LgsINGP0LrRliDQstGW0LTQv9C+0LLRltC00LDRjtGC0Ywg0LTQsNC90L7QvNGDINC10YLQsNC/0YMgKHN0YWdlKVxuICAgICAgICAgICAgY29uc3QgY29sdW1ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2dldFN0YWdlQ2xhc3Moc3RhZ2UpfWApO1xuXG4gICAgICAgICAgICBjb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcbiAgICAgICAgICAgICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0LLRgdGWINCx0LvQvtC60Lgg0Lcg0LrQvtC80LDQvdC00LDQvNC4INCyINGG0ZbQuSDQutC+0LvQvtC90YbRllxuICAgICAgICAgICAgICAgIGNvbnN0IHRlYW1CbG9ja3MgPSBjb2x1bW4ucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9fY2hvc2VcIik7XG5cbiAgICAgICAgICAgICAgICB0ZWFtQmxvY2tzLmZvckVhY2goYmxvY2sgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0LLRgdGWINGA0LDQtNGW0L7QutC90L7Qv9C60Lgg0YLQsCDQvdCw0LfQstC4INC60L7QvNCw0L3QtCDQsiDRhtGM0L7QvNGDINCx0LvQvtC60YNcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVhbVJhZGlvcyA9IGJsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX3RlYW0tcmFkaW9cIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRlYW1zID0gYmxvY2sucXVlcnlTZWxlY3RvckFsbChcIi50YWJsZV9fdGVhbS1uYW1lXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vINCf0YDQvtGF0L7QtNC40LzQvtGB0Y8g0L/QviDQstGB0ZbRhSDQutC+0LzQsNC90LTQsNGFINCyINCx0LvQvtC60YNcbiAgICAgICAgICAgICAgICAgICAgdGVhbXMuZm9yRWFjaCgodGVhbUVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQr9C60YnQviDQvdCw0LfQstCwINC60L7QvNCw0L3QtNC4INGB0L/RltCy0L/QsNC00LDRlCDQtyDQstC40LHRgNCw0L3QvtGOINC60L7QvNCw0L3QtNC+0Y4g0LcgcHJlZGljdERhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZWFtRWxlbWVudC50ZXh0Q29udGVudC50cmltKCkgPT09IHRlYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQkNC60YLQuNCy0YPRlNC80L4g0LLRltC00L/QvtCy0ZbQtNC90YMg0YDQsNC00ZbQvtC60L3QvtC/0LrRg1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlYW1SYWRpb3NbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJfYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbi8vINCU0L7Qv9C+0LzRltC20L3QsCDRhNGD0L3QutGG0ZbRjyDQtNC70Y8g0L7RgtGA0LjQvNCw0L3QvdGPINC60LvQsNGB0YMg0LXRgtCw0L/RgyDQvdCwINC+0YHQvdC+0LLRliDQudC+0LPQviDQvdCw0LfQstC4XG4gICAgZnVuY3Rpb24gZ2V0U3RhZ2VDbGFzcyhzdGFnZSkge1xuICAgICAgICBzd2l0Y2ggKHN0YWdlKSB7XG4gICAgICAgICAgICBjYXNlIFwiT3BlbmluZyBTdGFnZVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YWdlMS04XCI7XG4gICAgICAgICAgICBjYXNlIFwiUXVhcnRlcmZpbmFsc1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YWdlMS00XCI7XG4gICAgICAgICAgICBjYXNlIFwiU2VtaWZpbmFsc1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YWdlMS0yXCI7XG4gICAgICAgICAgICBjYXNlIFwiRmluYWxcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFnZS1maW5hbFwiO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IGFjdGl2YXRlU2VsZWN0ZWRUZWFtcyhwcmVkaWN0RGF0YSkpO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlTG9jYWxTdG9yYWdlKCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByZWRpY3REYXRhXCIsIEpTT04uc3RyaW5naWZ5KHByZWRpY3REYXRhKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VGVhbU5hbWUodGVhbUJsb2NrLCBzdGFnZSwgY29sdW1uKSB7XG4gICAgICAgIGlmKGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJfZG9uZVwiKSB8fCBjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiX2FjdGl2ZVwiKSl7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0ZWFtUmFkaW9zID0gdGVhbUJsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX3RlYW0tcmFkaW9cIik7XG4gICAgICAgIGNvbnN0IHRlYW1zID0gdGVhbUJsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX3RlYW0tbmFtZVwiKTtcblxuICAgICAgICB0ZWFtUmFkaW9zLmZvckVhY2goKHJhZGlvLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGVhbVJhZGlvcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiX2FjdGl2ZVwiKSlcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVGVhbSA9IHRlYW1zW2luZGV4XS50ZXh0Q29udGVudC50cmltKCk7XG5cbiAgICAgICAgICAgICAgICAvLyDQktC40LTQsNC70Y/RlNC80L4g0L/QvtC/0LXRgNC10LTQvdGOINC60L7QvNCw0L3QtNGDINC3INGG0YzQvtCz0L4g0LHQu9C+0LrRg1xuICAgICAgICAgICAgICAgIHByZWRpY3REYXRhID0gcHJlZGljdERhdGEuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5zdGFnZSAhPT0gc3RhZ2UpIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhQXJyYXkuZnJvbSh0ZWFtcykuc29tZSh0ZWFtID0+IHRlYW0udGV4dENvbnRlbnQudHJpbSgpID09PSBpdGVtLnRlYW0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8g0JTQvtC00LDRlNC80L4g0L3QvtCy0YMg0LrQvtC80LDQvdC00YNcbiAgICAgICAgICAgICAgICBwcmVkaWN0RGF0YS5wdXNoKHsgc3RhZ2U6IHN0YWdlLCB0ZWFtOiBzZWxlY3RlZFRlYW0gfSk7XG5cbiAgICAgICAgICAgICAgICAvLyDQntC90L7QstC70Y7RlNC80L4gbG9jYWxTdG9yYWdlXG4gICAgICAgICAgICAgICAgdXBkYXRlTG9jYWxTdG9yYWdlKCk7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcmVkaWN0RGF0YSk7IC8vINCf0LXRgNC10LLRltGA0Y/RlNC80L4sINGH0Lgg0L/RgNCw0LLQuNC70YzQvdC+INC/0YDQsNGG0Y7RlFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gc2V0UHJlZGljdENvbHVtbihjb2x1bW4pIHtcbiAgICAgICAgY29uc29sZS5sb2coY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcIl9sb2NrXCIpIClcbiAgICAgICAgbGV0IHN0YWdlID0gXCJcIlxuXG4gICAgICAgIGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJzdGFnZTEtOFwiKSA/IHN0YWdlID0gXCJPcGVuaW5nIFN0YWdlXCIgOiBudWxsO1xuICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwic3RhZ2UxLTRcIikgPyBzdGFnZSA9IFwiUXVhcnRlcmZpbmFsc1wiIDogbnVsbDtcbiAgICAgICAgY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcInN0YWdlMS0yXCIpID8gc3RhZ2UgPSBcIlNlbWlmaW5hbHNcIiA6IG51bGw7XG4gICAgICAgIGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJzdGFnZS1maW5hbFwiKSA/IHN0YWdlID0gXCJGaW5hbFwiIDogbnVsbDtcblxuICAgICAgICBjb25zdCB0ZWFtQmxvY2tzID0gY29sdW1uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2Nob3NlXCIpO1xuXG4gICAgICAgIHRlYW1CbG9ja3MuZm9yRWFjaChibG9jayA9PiBnZXRUZWFtTmFtZShibG9jaywgc3RhZ2UsIGNvbHVtbikpO1xuXG5cbiAgICB9XG5cbiAgICBsb2FkVHJhbnNsYXRpb25zKClcbiAgICAgICAgLnRoZW4oaW5pdCk7XG5cbn0pKClcblxuIl19

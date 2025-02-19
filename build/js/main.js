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
  var tournamentStage = 2;
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
  loadTranslations().then(init);
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwicmVzdWx0c1RhYmxlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicmVzdWx0c1RhYmxlSGVhZCIsInRvcFJlc3VsdHNUYWJsZSIsInJlc3VsdHNUYWJsZU90aGVyIiwidGFibGVOYXYiLCJxdWVyeVNlbGVjdG9yQWxsIiwicHJlZGljdENvbHVtbnMiLCJ0b3VybmFtZW50U3RhZ2UiLCJsb2NhbGUiLCJ1c2VycyIsImkxOG5EYXRhIiwidXNlcklkIiwiUFJJWkVTX0NTUyIsInByZWRpY3REYXRhIiwiSlNPTiIsInBhcnNlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImNvbnNvbGUiLCJsb2ciLCJsb2FkVHJhbnNsYXRpb25zIiwiZmV0Y2giLCJ0aGVuIiwicmVzIiwianNvbiIsInRyYW5zbGF0ZSIsImVsZW1zIiwibGVuZ3RoIiwiZm9yRWFjaCIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJyZWZyZXNoTG9jYWxpemVkQ2xhc3MiLCJlbGVtZW50IiwiYmFzZUNzc0NsYXNzIiwibGFuZyIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInJlcXVlc3QiLCJsaW5rIiwiZXh0cmFPcHRpb25zIiwiaGVhZGVycyIsImdldERhdGEiLCJQcm9taXNlIiwiYWxsIiwiSW5pdFBhZ2UiLCJzb3J0IiwiYSIsImIiLCJwb2ludHMiLCJyZW5kZXJVc2VycyIsImNvbHVtbiIsImkiLCJzZXRQcmVkaWN0Q29sdW1uIiwiY29udGFpbnMiLCJ0ZWFtcyIsImRhdGUiLCJ0aW1lIiwidGVhbSIsInRleHRDb250ZW50IiwiaW5pdCIsIndpbmRvdyIsInN0b3JlIiwic3RhdGUiLCJnZXRTdGF0ZSIsImF1dGgiLCJpc0F1dGhvcml6ZWQiLCJpZCIsImMiLCJzZXRJbnRlcnZhbCIsImdfdXNlcl9pZCIsImNsZWFySW50ZXJ2YWwiLCJwb3B1bGF0ZVVzZXJzVGFibGUiLCJjdXJyZW50VXNlcklkIiwidG9wVXNlcnMiLCJzbGljZSIsInVzZXIiLCJkaXNwbGF5VXNlciIsInVzZXJpZCIsImN1cnJlbnRVc2VyIiwiZmluZCIsImN1cnJlbnRVc2VySW5kZXgiLCJpbmRleE9mIiwib3RoZXJVc2VycyIsIk1hdGgiLCJtYXgiLCJpc0N1cnJlbnRVc2VyIiwidGFibGUiLCJhbGxVc2VycyIsImFkZGl0aW9uYWxVc2VyUm93IiwiY3JlYXRlRWxlbWVudCIsInBsYWNlIiwicHJpemVQbGFjZUNzcyIsInByaXplS2V5IiwiZ2V0UHJpemVUcmFuc2xhdGlvbktleSIsIm1hc2tVc2VySWQiLCJtdWx0aXBsaWVyIiwidG90YWxQb2ludHMiLCJ0cmFuc2xhdGVLZXkiLCJ5b3VCbG9jayIsInNldEF0dHJpYnV0ZSIsImFwcGVuZCIsInRvU3RyaW5nIiwicG9wdXBCdG5zIiwicG9wdXBzIiwicG9wdXAiLCJjbG9zZSIsIm9wZW4iLCJwYXJlbnROb2RlIiwic2V0UG9wdXAiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsIml0ZW0iLCJuYXYiLCJhY3RpdmF0ZVNlbGVjdGVkVGVhbXMiLCJzdG9yZWRQcmVkaWN0RGF0YSIsImRhdGEiLCJzdGFnZSIsImNvbHVtbnMiLCJnZXRTdGFnZUNsYXNzIiwidGVhbUJsb2NrcyIsImJsb2NrIiwidGVhbVJhZGlvcyIsInRlYW1FbGVtZW50IiwiaW5kZXgiLCJ0cmltIiwidXBkYXRlTG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImdldFRlYW1OYW1lIiwidGVhbUJsb2NrIiwicmFkaW8iLCJzZWxlY3RlZFRlYW0iLCJmaWx0ZXIiLCJBcnJheSIsImZyb20iLCJzb21lIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxDQUFDLFlBQVc7RUFDUixJQUFNQSxNQUFNLEdBQUcsbUNBQW1DO0VBQ2xELElBQU1DLFlBQVksR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7RUFDN0QsSUFBTUMs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bEMsZ0JBQWdCLEVBQUUsQ0FDYkUsSUFBSSxDQUFDeUMsSUFBSSxDQUFDO0FBRW5CLENBQUMsR0FBRyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpe1xuICAgIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL2Zhdi1wcm9tLmNvbS9hcGlfc2hhbmdoYWknO1xuICAgIGNvbnN0IHJlc3VsdHNUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN1bHRzLXRhYmxlJyk7XG4gICAgY29uc3QgcmVzdWx0c1RhYmxlSGVhZCA9IHJlc3VsdHNUYWJsZS5xdWVyeVNlbGVjdG9yKCcudGFibGVSZXN1bHRzX19oZWFkJyk7XG4gICAgY29uc3QgdG9wUmVzdWx0c1RhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvcC11c2VycycpO1xuICAgIGNvbnN0IHJlc3VsdHNUYWJsZU90aGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHMtdGFibGUtb3RoZXInKTtcbiAgICBjb25zdCB0YWJsZU5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmVzdWx0c19fbmF2LWl0ZW1cIik7XG4gICAgY29uc3QgcHJlZGljdENvbHVtbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19jb2x1bW5cIilcblxuICAgIGxldCB0b3VybmFtZW50U3RhZ2UgPSAyXG5cbiAgICBsZXQgbG9jYWxlID0gJ2VuJztcbiAgICBsZXQgdXNlcnM7XG4gICAgbGV0IGkxOG5EYXRhID0ge307XG4gICAgbGV0IHVzZXJJZDtcbiAgICB1c2VySWQgPSAxMDAzMDAyNjg7XG5cbiAgICBjb25zdCBQUklaRVNfQ1NTID0gWydwbGFjZTEnLCAncGxhY2UyJywgJ3BsYWNlMyddO1xuXG5cblxuICAgIGxldCBwcmVkaWN0RGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcmVkaWN0RGF0YVwiKSkgfHwgW107XG4gICAgY29uc29sZS5sb2cocHJlZGljdERhdGEpXG4gICAgZnVuY3Rpb24gbG9hZFRyYW5zbGF0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2FwaVVSTH0vdHJhbnNsYXRlcy8ke2xvY2FsZX1gKS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgaTE4bkRhdGEgPSBqc29uO1xuICAgICAgICAgICAgICAgIC8vIHRyYW5zbGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gdmFyIG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgICAgIC8vIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3BvcnRUb3VyJyksIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIC8vICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgICAgIC8vIH0pO1xuXG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGUoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHJhbnNsYXRlXScpXG4gICAgICAgIGlmIChlbGVtcyAmJiBlbGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGVsZW1zLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICAgICAgZWxlbS5pbm5lckhUTUwgPSBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICAgICAgICAgICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaExvY2FsaXplZENsYXNzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaExvY2FsaXplZENsYXNzKGVsZW1lbnQsIGJhc2VDc3NDbGFzcykge1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGxhbmcgb2YgWyd1aycsICdlbiddKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYmFzZUNzc0NsYXNzICsgbGFuZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGJhc2VDc3NDbGFzcyArIGxvY2FsZSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVxdWVzdCA9IGZ1bmN0aW9uIChsaW5rLCBleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGFwaVVSTCArIGxpbmssIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi4oZXh0cmFPcHRpb25zIHx8IHt9KVxuICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gZ2V0RGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHJlcXVlc3QoJy91c2Vycz9ub2NhY2hlPTEnKSxcbiAgICAgICAgXSlcbiAgICB9XG5cbiAgICBjb25zdCBJbml0UGFnZSA9ICgpID0+IHtcbiAgICAgICAgZ2V0RGF0YSgpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHVzZXJzID0gcmVzWzBdLnNvcnQoKGEsIGIpID0+IGIucG9pbnRzIC0gYS5wb2ludHMpO1xuICAgICAgICAgICAgLy8gdXNlcnMgPSB1c2Vycy5zbGljZSgwLCAxMClcbiAgICAgICAgICAgIHJlbmRlclVzZXJzKHVzZXJzKTtcbiAgICAgICAgICAgIC8vIHRyYW5zbGF0ZSgpO1xuICAgICAgICB9KVxuICAgICAgICBwcmVkaWN0Q29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGkpID0+e1xuICAgICAgICAgICAgaWYoaSArIDEgPiB0b3VybmFtZW50U3RhZ2Upe1xuICAgICAgICAgICAgICAgIGNvbHVtbi5jbGFzc0xpc3QuYWRkKFwiX2xvY2tcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGkgKyAxIDwgdG91cm5hbWVudFN0YWdlKXtcbiAgICAgICAgICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmFkZChcIl9kb25lXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRQcmVkaWN0Q29sdW1uKGNvbHVtbilcbiAgICAgICAgICAgIGlmKGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJfbG9ja1wiKSl7XG4gICAgICAgICAgICAgICAgY29uc3QgdGVhbXMgPSBjb2x1bW4ucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX190ZWFtLW5hbWUnKVxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBjb2x1bW4ucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX19jaG9zZS1kYXRlJylcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lID0gY29sdW1uLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9fY2hvc2UtdGltZScpXG4gICAgICAgICAgICAgICAgdGVhbXMuZm9yRWFjaCh0ZWFtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGVhbS50ZXh0Q29udGVudCA9IFwi4oCUXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGRhdGUuZm9yRWFjaChkYXRlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZS50ZXh0Q29udGVudCA9IFwi4oCUXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRpbWUuZm9yRWFjaCh0aW1lID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGltZS50ZXh0Q29udGVudCA9IFwi4oCUXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuc3RvcmUpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHdpbmRvdy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgdXNlcklkID0gc3RhdGUuYXV0aC5pc0F1dGhvcml6ZWQgJiYgc3RhdGUuYXV0aC5pZCB8fCAnJztcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICAgICAgbGV0IGMgPSAwO1xuICAgICAgICAgICAgdmFyIGkgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISF3aW5kb3cuZ191c2VyX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQgPSB3aW5kb3cuZ191c2VyX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH19XG5cblxuICAgIGZ1bmN0aW9uIHJlbmRlclVzZXJzKHVzZXJzKSB7XG4gICAgICAgIHBvcHVsYXRlVXNlcnNUYWJsZSh1c2VycywgdXNlcklkKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQpIHtcbiAgICAgICAgcmVzdWx0c1RhYmxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICByZXN1bHRzVGFibGVPdGhlci5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBpZiAoIXVzZXJzIHx8ICF1c2Vycy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBsZXQgdG9wVXNlcnMgPSB1c2Vycy5zbGljZSgwLCAyMCk7XG4gICAgICAgIHRvcFVzZXJzLmZvckVhY2godXNlciA9PiBkaXNwbGF5VXNlcih1c2VyLCB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCwgcmVzdWx0c1RhYmxlLCB1c2VycykpO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gdXNlcnMuZmluZCh1c2VyID0+IHVzZXIudXNlcmlkID09PSBjdXJyZW50VXNlcklkKTtcbiAgICAgICAgY29uc3QgY3VycmVudFVzZXJJbmRleCA9IGN1cnJlbnRVc2VyID8gdXNlcnMuaW5kZXhPZihjdXJyZW50VXNlcikgOiAtMTtcblxuICAgICAgICBpZiAoY3VycmVudFVzZXJJbmRleCA+PSAxMCkge1xuICAgICAgICAgICAgbGV0IG90aGVyVXNlcnMgPSB1c2Vycy5zbGljZShNYXRoLm1heCgxMCwgY3VycmVudFVzZXJJbmRleCAtIDEpLCBjdXJyZW50VXNlckluZGV4ICsgMik7XG4gICAgICAgICAgICBvdGhlclVzZXJzLmZvckVhY2godXNlciA9PiBkaXNwbGF5VXNlcih1c2VyLCB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCwgcmVzdWx0c1RhYmxlT3RoZXIsIHVzZXJzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNwbGF5VXNlcih1c2VyLCBpc0N1cnJlbnRVc2VyLCB0YWJsZSwgYWxsVXNlcnMpIHtcbiAgICAgICAgY29uc3QgYWRkaXRpb25hbFVzZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgndGFibGVSZXN1bHRzX19yb3cnKTtcblxuXG5cbiAgICAgICAgY29uc3QgcGxhY2UgPSBhbGxVc2Vycy5pbmRleE9mKHVzZXIpICsgMTtcbiAgICAgICAgY29uc3QgcHJpemVQbGFjZUNzcyA9IFBSSVpFU19DU1NbcGxhY2UgLSAxXTtcbiAgICAgICAgaWYgKHByaXplUGxhY2VDc3MpIHtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQocHJpemVQbGFjZUNzcyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcml6ZUtleSA9IGdldFByaXplVHJhbnNsYXRpb25LZXkocGxhY2UpO1xuICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHtwbGFjZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke2lzQ3VycmVudFVzZXIgPyB1c2VyLnVzZXJpZCA6IG1hc2tVc2VySWQodXNlci51c2VyaWQpfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19yb3ctaXRlbVwiPiR7dXNlci5wb2ludHN9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHt1c2VyLm11bHRpcGxpZXJ9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHt1c2VyLnRvdGFsUG9pbnRzfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19yb3ctaXRlbVwiPiR7cHJpemVLZXkgPyB0cmFuc2xhdGVLZXkocHJpemVLZXkpIDogJyAtICd9PC9kaXY+XG4gICAgYDtcbiAgICAgICAgaWYgKGlzQ3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHlvdUJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB5b3VCbG9jay5zZXRBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJywgJ3lvdScpO1xuICAgICAgICAgICAgeW91QmxvY2sudGV4dENvbnRlbnQgPSBcItCi0LhcIiAvLyDQtNC70Y8g0YLQtdGB0YLRgyDQv9C+0LrQuCDQvdC10LzQsCDRgtGA0LDQvdGB0LvQtdC50YLRltCyXG4gICAgICAgICAgICB5b3VCbG9jay5jbGFzc0xpc3QuYWRkKCdfeW91cicpO1xuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuYXBwZW5kKHlvdUJsb2NrKVxuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZChcIl95b3VyXCIpXG5cbiAgICAgICAgfVxuICAgICAgICB0YWJsZS5hcHBlbmQoYWRkaXRpb25hbFVzZXJSb3cpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtYXNrVXNlcklkKHVzZXJJZCkge1xuICAgICAgICByZXR1cm4gXCIqKlwiICsgdXNlcklkLnRvU3RyaW5nKCkuc2xpY2UoMik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlS2V5KGtleSkge1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5KHBsYWNlKSB7XG4gICAgICAgIGlmIChwbGFjZSA8PSA1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXyR7cGxhY2V9YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzYtMTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTEtMjBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMjEtMzVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMzYtNTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNTEtNzVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzc2LTEwMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMjUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTAxLTEyNWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxNTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTI2LTE1MGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTUxLTE3NWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAyMDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTc2LTIwMGBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHBvcHVwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5mb19faXRlbS1idG5cIilcbiAgICBjb25zdCBwb3B1cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmluZm9fX2l0ZW0tcG9wdXBcIilcblxuXG4gICAgcG9wdXBzLmZvckVhY2goKHBvcHVwLCBpKSA9PntcbiAgICAgICAgY29uc3QgY2xvc2UgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX2l0ZW0tcG9wdXAtY2xvc2VcIilcbiAgICAgICAgY29uc3Qgb3BlbiA9IHBvcHVwLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi5pbmZvX19pdGVtLWJ0blwiKVxuICAgICAgICBzZXRQb3B1cChvcGVuLCBjbG9zZSwgcG9wdXApXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIHNldFBvcHVwKG9wZW4sIGNsb3NlLCBwb3B1cCl7XG4gICAgICAgIG9wZW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcIm9wYWNpdHlcIilcbiAgICAgICAgfSlcbiAgICAgICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZChcIm9wYWNpdHlcIilcbiAgICAgICAgfSlcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgIGlmKCFwb3B1cC5jb250YWlucyhlLnRhcmdldCkgJiYgZS50YXJnZXQgIT09IG9wZW4pe1xuICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJvcGFjaXR5XCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdGFibGVOYXYuZm9yRWFjaCgoaXRlbSwgaSkgPT57XG4gICAgICAgIGlmKGkgKyAxID4gdG91cm5hbWVudFN0YWdlKXtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIl9sb2NrXCIpXG4gICAgICAgIH1cblxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgICBpZihlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJfbG9ja1wiKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWJsZU5hdi5mb3JFYWNoKG5hdiA9PntcbiAgICAgICAgICAgICAgICBuYXYuY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBhY3RpdmF0ZVNlbGVjdGVkVGVhbXMoc3RvcmVkUHJlZGljdERhdGEpIHtcblxuICAgICAgICAvLyDQn9GA0L7RhdC+0LTQuNC80L7RgdGPINC/0L4g0LLRgdGW0YUg0LXQu9C10LzQtdC90YLQsNGFIHByZWRpY3REYXRhXG4gICAgICAgIHN0b3JlZFByZWRpY3REYXRhLmZvckVhY2goZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHN0YWdlLCB0ZWFtIH0gPSBkYXRhO1xuXG4gICAgICAgICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0LLRgdGWINC60L7Qu9C+0L3QutC4LCDRj9C60ZYg0LLRltC00L/QvtCy0ZbQtNCw0Y7RgtGMINC00LDQvdC+0LzRgyDQtdGC0LDQv9GDIChzdGFnZSlcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtnZXRTdGFnZUNsYXNzKHN0YWdlKX1gKTtcblxuICAgICAgICAgICAgY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICAgICAgLy8g0JfQvdCw0YXQvtC00LjQvNC+INCy0YHRliDQsdC70L7QutC4INC3INC60L7QvNCw0L3QtNCw0LzQuCDQsiDRhtGW0Lkg0LrQvtC70L7QvdGG0ZZcbiAgICAgICAgICAgICAgICBjb25zdCB0ZWFtQmxvY2tzID0gY29sdW1uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX2Nob3NlXCIpO1xuXG4gICAgICAgICAgICAgICAgdGVhbUJsb2Nrcy5mb3JFYWNoKGJsb2NrID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8g0JfQvdCw0YXQvtC00LjQvNC+INCy0YHRliDRgNCw0LTRltC+0LrQvdC+0L/QutC4INGC0LAg0L3QsNC30LLQuCDQutC+0LzQsNC90LQg0LIg0YbRjNC+0LzRgyDQsdC70L7QutGDXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRlYW1SYWRpb3MgPSBibG9jay5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX190ZWFtLXJhZGlvXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZWFtcyA9IGJsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFibGVfX3RlYW0tbmFtZVwiKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyDQn9GA0L7RhdC+0LTQuNC80L7RgdGPINC/0L4g0LLRgdGW0YUg0LrQvtC80LDQvdC00LDRhSDQsiDQsdC70L7QutGDXG4gICAgICAgICAgICAgICAgICAgIHRlYW1zLmZvckVhY2goKHRlYW1FbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0K/QutGJ0L4g0L3QsNC30LLQsCDQutC+0LzQsNC90LTQuCDRgdC/0ZbQstC/0LDQtNCw0ZQg0Lcg0LLQuNCx0YDQsNC90L7RjiDQutC+0LzQsNC90LTQvtGOINC3IHByZWRpY3REYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVhbUVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpID09PSB0ZWFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g0JDQutGC0LjQstGD0ZTQvNC+INCy0ZbQtNC/0L7QstGW0LTQvdGDINGA0LDQtNGW0L7QutC90L7Qv9C60YNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZWFtUmFkaW9zW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwiX2FjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4vLyDQlNC+0L/QvtC80ZbQttC90LAg0YTRg9C90LrRhtGW0Y8g0LTQu9GPINC+0YLRgNC40LzQsNC90L3RjyDQutC70LDRgdGDINC10YLQsNC/0YMg0L3QsCDQvtGB0L3QvtCy0ZYg0LnQvtCz0L4g0L3QsNC30LLQuFxuICAgIGZ1bmN0aW9uIGdldFN0YWdlQ2xhc3Moc3RhZ2UpIHtcbiAgICAgICAgc3dpdGNoIChzdGFnZSkge1xuICAgICAgICAgICAgY2FzZSBcIk9wZW5pbmcgU3RhZ2VcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFnZTEtOFwiO1xuICAgICAgICAgICAgY2FzZSBcIlF1YXJ0ZXJmaW5hbHNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFnZTEtNFwiO1xuICAgICAgICAgICAgY2FzZSBcIlNlbWlmaW5hbHNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFnZTEtMlwiO1xuICAgICAgICAgICAgY2FzZSBcIkZpbmFsXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RhZ2UtZmluYWxcIjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiBhY3RpdmF0ZVNlbGVjdGVkVGVhbXMocHJlZGljdERhdGEpKTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxvY2FsU3RvcmFnZSgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcmVkaWN0RGF0YVwiLCBKU09OLnN0cmluZ2lmeShwcmVkaWN0RGF0YSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRlYW1OYW1lKHRlYW1CbG9jaywgc3RhZ2UsIGNvbHVtbikge1xuICAgICAgICBpZihjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiX2RvbmVcIikgfHwgY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcIl9hY3RpdmVcIikpe1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGVhbVJhZGlvcyA9IHRlYW1CbG9jay5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX190ZWFtLXJhZGlvXCIpO1xuICAgICAgICBjb25zdCB0ZWFtcyA9IHRlYW1CbG9jay5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX190ZWFtLW5hbWVcIik7XG5cbiAgICAgICAgdGVhbVJhZGlvcy5mb3JFYWNoKChyYWRpbywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRlYW1SYWRpb3MuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIl9hY3RpdmVcIikpXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcIl9hY3RpdmVcIilcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRlYW0gPSB0ZWFtc1tpbmRleF0udGV4dENvbnRlbnQudHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgLy8g0JLQuNC00LDQu9GP0ZTQvNC+INC/0L7Qv9C10YDQtdC00L3RjiDQutC+0LzQsNC90LTRgyDQtyDRhtGM0L7Qs9C+INCx0LvQvtC60YNcbiAgICAgICAgICAgICAgICBwcmVkaWN0RGF0YSA9IHByZWRpY3REYXRhLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uc3RhZ2UgIT09IHN0YWdlKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIUFycmF5LmZyb20odGVhbXMpLnNvbWUodGVhbSA9PiB0ZWFtLnRleHRDb250ZW50LnRyaW0oKSA9PT0gaXRlbS50ZWFtKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vINCU0L7QtNCw0ZTQvNC+INC90L7QstGDINC60L7QvNCw0L3QtNGDXG4gICAgICAgICAgICAgICAgcHJlZGljdERhdGEucHVzaCh7IHN0YWdlOiBzdGFnZSwgdGVhbTogc2VsZWN0ZWRUZWFtIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8g0J7QvdC+0LLQu9GO0ZTQvNC+IGxvY2FsU3RvcmFnZVxuICAgICAgICAgICAgICAgIHVwZGF0ZUxvY2FsU3RvcmFnZSgpO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHJlZGljdERhdGEpOyAvLyDQn9C10YDQtdCy0ZbRgNGP0ZTQvNC+LCDRh9C4INC/0YDQsNCy0LjQu9GM0L3QviDQv9GA0LDRhtGO0ZRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHNldFByZWRpY3RDb2x1bW4oY29sdW1uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJfbG9ja1wiKSApXG4gICAgICAgIGxldCBzdGFnZSA9IFwiXCJcblxuICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwic3RhZ2UxLThcIikgPyBzdGFnZSA9IFwiT3BlbmluZyBTdGFnZVwiIDogbnVsbDtcbiAgICAgICAgY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcInN0YWdlMS00XCIpID8gc3RhZ2UgPSBcIlF1YXJ0ZXJmaW5hbHNcIiA6IG51bGw7XG4gICAgICAgIGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJzdGFnZTEtMlwiKSA/IHN0YWdlID0gXCJTZW1pZmluYWxzXCIgOiBudWxsO1xuICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwic3RhZ2UtZmluYWxcIikgPyBzdGFnZSA9IFwiRmluYWxcIiA6IG51bGw7XG5cbiAgICAgICAgY29uc3QgdGVhbUJsb2NrcyA9IGNvbHVtbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhYmxlX19jaG9zZVwiKTtcblxuICAgICAgICB0ZWFtQmxvY2tzLmZvckVhY2goYmxvY2sgPT4gZ2V0VGVhbU5hbWUoYmxvY2ssIHN0YWdlLCBjb2x1bW4pKTtcblxuXG4gICAgfVxuXG4gICAgbG9hZFRyYW5zbGF0aW9ucygpXG4gICAgICAgIC50aGVuKGluaXQpO1xuXG59KSgpXG5cbiJdfQ==

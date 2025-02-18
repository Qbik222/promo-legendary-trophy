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
  var locale = 'en';
  var users;
  var i18nData = {};
  var userId;
  userId = 100300268;
  var PRIZES_CSS = ['place1', 'place2', 'place3'];
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
    var topUsers = users.slice(0, 10);
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
    if (isCurrentUser) {
      additionalUserRow.classList.add('_yourPlace');
    }
    var place = allUsers.indexOf(user) + 1;
    var prizePlaceCss = PRIZES_CSS[place - 1];
    if (prizePlaceCss) {
      additionalUserRow.classList.add(prizePlaceCss);
    }
    var prizeKey = getPrizeTranslationKey(place);
    additionalUserRow.innerHTML = "\n        <div class=\"tableResults__row-item\">".concat(place, "</div>\n        <div class=\"tableResults__row-item\">").concat(isCurrentUser ? user.userid : maskUserId(user.userid), "</div>\n        <div class=\"tableResults__row-item\">").concat(user.points, "</div>\n        <div class=\"tableResults__row-item\">").concat(user.multiplier, "</div>\n        <div class=\"tableResults__row-item\">").concat(user.totalPoints, "</div>\n        <div class=\"tableResults__row-item\">").concat(prizeKey ? translateKey(prizeKey) : ' - ', "</div>\n    ");
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
  loadTranslations().then(init);
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwicmVzdWx0c1RhYmxlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicmVzdWx0c1RhYmxlSGVhZCIsInRvcFJlc3VsdHNUYWJsZSIsInJlc3VsdHNUYWJsZU90aGVyIiwibG9jYWxlIiwidXNlcnMiLCJpMThuRGF0YSIsInVzZXJJZCIsIlBSSVpFU19DU1MiLCJsb2FkVHJhbnNsYXRpb25zIiwiZmV0Y2giLCJ0aGVuIiwicmVzIiwianNvbiIsInRyYW5zbGF0ZSIsImVsZW1zIiwicXVlcnlTZWxlY3RvckFsbCIsImxlbmd0aCIsImZvckVhY2giLCJlbGVtIiwia2V5IiwiZ2V0QXR0cmlidXRlIiwiaW5uZXJIVE1MIiwicmVtb3ZlQXR0cmlidXRlIiwicmVmcmVzaExvY2FsaXplZENsYXNzIiwiZWxlbWVudCIsImJhc2VDc3NDbGFzcyIsImxhbmciLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJyZXF1ZXN0IiwibGluayIsImV4dHJhT3B0aW9ucyIsImhlYWRlcnMiLCJnZXREYXRhIiwiUHJvbWlzZSIsImFsbCIsIkluaXRQYWdlIiwic29ydCIsImEiLCJiIiwicG9pbnRzIiwicmVuZGVyVXNlcnMiLCJpbml0Iiwid2luZG93Iiwic3RvcmUiLCJzdGF0ZSIsImdldFN0YXRlIiwiYXV0aCIsImlzQXV0aG9yaXplZCIsImlkIiwiYyIsImkiLCJzZXRJbnRlcnZhbCIsImdfdXNlcl9pZCIsImNsZWFySW50ZXJ2YWwiLCJwb3B1bGF0ZVVzZXJzVGFibGUiLCJjdXJyZW50VXNlcklkIiwidG9wVXNlcnMiLCJzbGljZSIsInVzZXIiLCJkaXNwbGF5VXNlciIsInVzZXJpZCIsImN1cnJlbnRVc2VyIiwiZmluZCIsImN1cnJlbnRVc2VySW5kZXgiLCJpbmRleE9mIiwib3RoZXJVc2VycyIsIk1hdGgiLCJtYXgiLCJpc0N1cnJlbnRVc2VyIiwidGFibGUiLCJhbGxVc2VycyIsImFkZGl0aW9uYWxVc2VyUm93IiwiY3JlYXRlRWxlbWVudCIsInBsYWNlIiwicHJpemVQbGFjZUNzcyIsInByaXplS2V5IiwiZ2V0UHJpemVUcmFuc2xhdGlvbktleSIsIm1hc2tVc2VySWQiLCJtdWx0aXBsaWVyIiwidG90YWxQb2ludHMiLCJ0cmFuc2xhdGVLZXkiLCJhcHBlbmQiLCJ0b1N0cmluZyIsInBvcHVwQnRucyIsInBvcHVwcyIsInBvcHVwIiwiY2xvc2UiLCJvcGVuIiwicGFyZW50Tm9kZSIsInNldFBvcHVwIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJjb250YWlucyIsInRhcmdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxDQUFDLFlBQVc7RUFDUixJQUFNQSxNQUFNLEdBQUcsbUNBQW1DO0VBQ2xELElBQU1DLFlBQVksR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7RUFDN0QsSUFBTUMsZ0JBQWdCLEdBQUdILFlBQVksQ0FBQ0UsYUFBYSxDQUFDLHFCQUFxQixDQUFDO0VBQzFFLElBQU1FLGVBQWUsR0FBR0gsUUFBUSxDQUFDQyxhQUFhLENBQUMsWUFBWSxDQUFDO0VBQzVELElBQU1HLGlCQUFpQixHQUFHSixRQUFRLENBQUNDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztFQUV4RSxJQUFJSSxNQUFNLEdBQUcsSUFBSTtFQUNqQixJQUFJQyxLQUFLO0VBQ1QsSUFBSUMsUUFBUSxHQUFHLENBQUMsQ0FBQztFQUNqQixJQUFJQyxNQUFNO0VBQ1ZBLE1BQU0sR0FBRyxTQUFTO0VBRWxCLElBQU1DLFVBQVUsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO0VBR2pELFNBQVNDLGdCQUFnQixHQUFHO0lBQ3hCLE9BQU9DLEtBQUssV0FBSWIsTUFBTSx5QkFBZU8sTUFBTSxFQUFHLENBQUNPLElBQUksQ0FBQyxVQUFBQyxHQUFHO01BQUEsT0FBSUEsR0FBRyxDQUFDQyxJQUFJLEVBQUU7SUFBQSxFQUFDLENBQ2pFRixJQUFJLENBQUMsVUFBQUUsSUFBSSxFQUFJO01BQ1ZQ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Q0osQ0FBQyxDQUFDO0VBQ047RUFJQXJCLGdCQUFnQixFQUFFLENBQ2JFLElBQUksQ0FBQ2lDLElBQUksQ0FBQztBQUVuQixDQUFDLEdBQUciLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKXtcbiAgICBjb25zdCBhcGlVUkwgPSAnaHR0cHM6Ly9mYXYtcHJvbS5jb20vYXBpX3NoYW5naGFpJztcbiAgICBjb25zdCByZXN1bHRzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdWx0cy10YWJsZScpO1xuICAgIGNvbnN0IHJlc3VsdHNUYWJsZUhlYWQgPSByZXN1bHRzVGFibGUucXVlcnlTZWxlY3RvcignLnRhYmxlUmVzdWx0c19faGVhZCcpO1xuICAgIGNvbnN0IHRvcFJlc3VsdHNUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b3AtdXNlcnMnKTtcbiAgICBjb25zdCByZXN1bHRzVGFibGVPdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN1bHRzLXRhYmxlLW90aGVyJyk7XG5cbiAgICBsZXQgbG9jYWxlID0gJ2VuJztcbiAgICBsZXQgdXNlcnM7XG4gICAgbGV0IGkxOG5EYXRhID0ge307XG4gICAgbGV0IHVzZXJJZDtcbiAgICB1c2VySWQgPSAxMDAzMDAyNjg7XG5cbiAgICBjb25zdCBQUklaRVNfQ1NTID0gWydwbGFjZTEnLCAncGxhY2UyJywgJ3BsYWNlMyddO1xuXG5cbiAgICBmdW5jdGlvbiBsb2FkVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMfS90cmFuc2xhdGVzLyR7bG9jYWxlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YSA9IGpzb247XG4gICAgICAgICAgICAgICAgLy8gdHJhbnNsYXRlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyB2YXIgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAgICAgLy8gbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcG9ydFRvdXInKSwge1xuICAgICAgICAgICAgICAgIC8vICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgLy8gICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZSgpIHtcbiAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10cmFuc2xhdGVdJylcbiAgICAgICAgaWYgKGVsZW1zICYmIGVsZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgZWxlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoTG9jYWxpemVkQ2xhc3MoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoTG9jYWxpemVkQ2xhc3MoZWxlbWVudCwgYmFzZUNzc0NsYXNzKSB7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBbJ3VrJywgJ2VuJ10pIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShiYXNlQ3NzQ2xhc3MgKyBsYW5nKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYmFzZUNzc0NsYXNzICsgbG9jYWxlKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gZnVuY3Rpb24gKGxpbmssIGV4dHJhT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gZmV0Y2goYXBpVVJMICsgbGluaywge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLihleHRyYU9wdGlvbnMgfHwge30pXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgcmVxdWVzdCgnL3VzZXJzP25vY2FjaGU9MScpLFxuICAgICAgICBdKVxuICAgIH1cblxuICAgIGNvbnN0IEluaXRQYWdlID0gKCkgPT4ge1xuICAgICAgICBnZXREYXRhKCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgdXNlcnMgPSByZXNbMF0uc29ydCgoYSwgYikgPT4gYi5wb2ludHMgLSBhLnBvaW50cyk7XG4gICAgICAgICAgICAvLyB1c2VycyA9IHVzZXJzLnNsaWNlKDAsIDEwKVxuICAgICAgICAgICAgcmVuZGVyVXNlcnModXNlcnMpO1xuICAgICAgICAgICAgLy8gdHJhbnNsYXRlKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5zdG9yZSkge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gd2luZG93LnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICAgICAgICB1c2VySWQgPSBzdGF0ZS5hdXRoLmlzQXV0aG9yaXplZCAmJiBzdGF0ZS5hdXRoLmlkIHx8ICcnO1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgICAgICBsZXQgYyA9IDA7XG4gICAgICAgICAgICB2YXIgaSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXdpbmRvdy5nX3VzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCA9IHdpbmRvdy5nX3VzZXJfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2tVc2VyQXV0aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfX1cblxuXG4gICAgZnVuY3Rpb24gcmVuZGVyVXNlcnModXNlcnMpIHtcbiAgICAgICAgcG9wdWxhdGVVc2Vyc1RhYmxlKHVzZXJzLCB1c2VySWQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBvcHVsYXRlVXNlcnNUYWJsZSh1c2VycywgY3VycmVudFVzZXJJZCkge1xuICAgICAgICByZXN1bHRzVGFibGUuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIGlmICghdXNlcnMgfHwgIXVzZXJzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCB0b3BVc2VycyA9IHVzZXJzLnNsaWNlKDAsIDEwKTtcbiAgICAgICAgdG9wVXNlcnMuZm9yRWFjaCh1c2VyID0+IGRpc3BsYXlVc2VyKHVzZXIsIHVzZXIudXNlcmlkID09PSBjdXJyZW50VXNlcklkLCByZXN1bHRzVGFibGUsIHVzZXJzKSk7XG5cbiAgICAgICAgY29uc3QgY3VycmVudFVzZXIgPSB1c2Vycy5maW5kKHVzZXIgPT4gdXNlci51c2VyaWQgPT09IGN1cnJlbnRVc2VySWQpO1xuICAgICAgICBjb25zdCBjdXJyZW50VXNlckluZGV4ID0gY3VycmVudFVzZXIgPyB1c2Vycy5pbmRleE9mKGN1cnJlbnRVc2VyKSA6IC0xO1xuXG4gICAgICAgIGlmIChjdXJyZW50VXNlckluZGV4ID49IDEwKSB7XG4gICAgICAgICAgICBsZXQgb3RoZXJVc2VycyA9IHVzZXJzLnNsaWNlKE1hdGgubWF4KDEwLCBjdXJyZW50VXNlckluZGV4IC0gMSksIGN1cnJlbnRVc2VySW5kZXggKyAyKTtcbiAgICAgICAgICAgIG90aGVyVXNlcnMuZm9yRWFjaCh1c2VyID0+IGRpc3BsYXlVc2VyKHVzZXIsIHVzZXIudXNlcmlkID09PSBjdXJyZW50VXNlcklkLCByZXN1bHRzVGFibGVPdGhlciwgdXNlcnMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc3BsYXlVc2VyKHVzZXIsIGlzQ3VycmVudFVzZXIsIHRhYmxlLCBhbGxVc2Vycykge1xuICAgICAgICBjb25zdCBhZGRpdGlvbmFsVXNlclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKCd0YWJsZVJlc3VsdHNfX3JvdycpO1xuXG4gICAgICAgIGlmIChpc0N1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKCdfeW91clBsYWNlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwbGFjZSA9IGFsbFVzZXJzLmluZGV4T2YodXNlcikgKyAxO1xuICAgICAgICBjb25zdCBwcml6ZVBsYWNlQ3NzID0gUFJJWkVTX0NTU1twbGFjZSAtIDFdO1xuICAgICAgICBpZiAocHJpemVQbGFjZUNzcykge1xuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZChwcml6ZVBsYWNlQ3NzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByaXplS2V5ID0gZ2V0UHJpemVUcmFuc2xhdGlvbktleShwbGFjZSk7XG4gICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke3BsYWNlfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVSZXN1bHRzX19yb3ctaXRlbVwiPiR7aXNDdXJyZW50VXNlciA/IHVzZXIudXNlcmlkIDogbWFza1VzZXJJZCh1c2VyLnVzZXJpZCl9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHt1c2VyLnBvaW50c308L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke3VzZXIubXVsdGlwbGllcn08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlUmVzdWx0c19fcm93LWl0ZW1cIj4ke3VzZXIudG90YWxQb2ludHN9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVJlc3VsdHNfX3Jvdy1pdGVtXCI+JHtwcml6ZUtleSA/IHRyYW5zbGF0ZUtleShwcml6ZUtleSkgOiAnIC0gJ308L2Rpdj5cbiAgICBgO1xuICAgICAgICB0YWJsZS5hcHBlbmQoYWRkaXRpb25hbFVzZXJSb3cpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtYXNrVXNlcklkKHVzZXJJZCkge1xuICAgICAgICByZXR1cm4gXCIqKlwiICsgdXNlcklkLnRvU3RyaW5nKCkuc2xpY2UoMik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlS2V5KGtleSkge1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcml6ZVRyYW5zbGF0aW9uS2V5KHBsYWNlKSB7XG4gICAgICAgIGlmIChwbGFjZSA8PSA1KSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXyR7cGxhY2V9YFxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlIDw9IDEwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzYtMTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMjApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTEtMjBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMjEtMzVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMzYtNTBgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfNTEtNzVgXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2UgPD0gMTAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYHByaXplXzc2LTEwMGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxMjUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTAxLTEyNWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxNTApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTI2LTE1MGBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAxNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTUxLTE3NWBcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZSA8PSAyMDApIHtcbiAgICAgICAgICAgIHJldHVybiBgcHJpemVfMTc2LTIwMGBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHBvcHVwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5mb19faXRlbS1idG5cIilcbiAgICBjb25zdCBwb3B1cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmluZm9fX2l0ZW0tcG9wdXBcIilcblxuXG4gICAgcG9wdXBzLmZvckVhY2goKHBvcHVwLCBpKSA9PntcbiAgICAgICAgY29uc3QgY2xvc2UgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKFwiLmluZm9fX2l0ZW0tcG9wdXAtY2xvc2VcIilcbiAgICAgICAgY29uc3Qgb3BlbiA9IHBvcHVwLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi5pbmZvX19pdGVtLWJ0blwiKVxuICAgICAgICBzZXRQb3B1cChvcGVuLCBjbG9zZSwgcG9wdXApXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIHNldFBvcHVwKG9wZW4sIGNsb3NlLCBwb3B1cCl7XG4gICAgICAgIG9wZW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcIm9wYWNpdHlcIilcbiAgICAgICAgfSlcbiAgICAgICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZChcIm9wYWNpdHlcIilcbiAgICAgICAgfSlcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgIGlmKCFwb3B1cC5jb250YWlucyhlLnRhcmdldCkgJiYgZS50YXJnZXQgIT09IG9wZW4pe1xuICAgICAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoXCJvcGFjaXR5XCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG5cblxuICAgIGxvYWRUcmFuc2xhdGlvbnMoKVxuICAgICAgICAudGhlbihpbml0KTtcblxufSkoKVxuXG4iXX0=

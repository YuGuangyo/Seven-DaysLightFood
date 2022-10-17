(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = _interopRequireDefault(require("./utils"));

var _foodIframe = _interopRequireDefault(require("./component/foodIframe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var u = navigator.userAgent,
    ua = u.toLowerCase(),
    uaMatch = function uaMatch() {
  var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
  return {
    version: match[2] || "0"
  };
},
    $window = $(window),
    $html = $('html');

var app = {};
/* 访问终端
------------------------------------------------ */

app.browser = {
  platform: {
    windows: u.indexOf('Windows') > -1,
    macos: u.indexOf("Mac OS X") > -1,
    linux: u.indexOf("Linux") > -1,
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    mobile: !!u.match(/AppleWebKit.*Mobile.*/)
  },
  versions: {
    trident: u.indexOf('Trident') > -1,
    //IE内核
    presto: u.indexOf('Presto') > -1,
    //opera内核
    webKit: u.indexOf('AppleWebKit') > -1,
    //苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
    //火狐内核
    edge: u.indexOf('Edge') > -1,
    ie11: u.indexOf('rv:11') > -1,
    ie10: u.indexOf('MSIE 10') > -1,
    iPhone: u.indexOf('iPhone') > -1,
    iPad: function () {
      var isSafari = u.indexOf("Safari") != -1 && u.indexOf("Version") != -1;
      var isIphone = u.indexOf("iPhone") != -1 && u.indexOf("Version") != -1;
      return isSafari && !isIphone && 'ontouchend' in document;
    }(),
    weixin: u.indexOf('MicroMessenger') > -1,
    qq: u.match(/\sQQ/i) == 'qq'
  },
  isTouch: "ontouchstart" in window || ua.indexOf("touch") !== -1 || ua.indexOf("mobile") !== -1,
  version: uaMatch().version,
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
/* 获取设备宽高
------------------------------------------------ */

$window.resize(_utils["default"].throttle(function () {
  var p = app.browser.platform,
      v = app.browser.versions;
  app.screen = {
    vw: window.innerWidth,
    vh: window.innerHeight
  };
  app.device = {
    mobile: app.screen.vw < 768,
    pad_v: app.screen.vw >= 768 && app.screen.vw < 1024,
    pad_h: app.screen.vw > 768 && app.screen.vw <= 1366 && (p.android || v.iPad),
    desktop: app.screen.vw >= 1024 && !p.android && !v.iPad
  };
}, 500)).resize();
/* 动态加载JS/CSS[方法]
------------------------------------------------ */

app.loadFile = function (opt) {
  var options = {
    type: 'js',
    url: '',
    loadCallback: function loadCallback() {
      console.log('加载完毕回调');
    }
  };
  options = $.extend(options, opt);

  if (options.type == 'js') {
    var file = document.createElement('script');
    file.src = options.url;
  } else if (options.type == 'css') {
    var file = document.createElement('link');
    file.rel = 'stylesheet';
    file.href = options.url;
  } else if (options.type == 'style') {
    var file = document.createElement('style');
    file.rel = 'stylesheet';
    file.innerHTML = options.style;
  }

  document.getElementsByTagName('head')[0].appendChild(file);

  file.onload = function () {
    options.loadCallback();
  };
};
/* html浏览器标示
------------------------------------------------ */


app.addBrowserTag = {
  versions: function versions() {
    var versions = app.browser.versions;

    for (var key in versions) {
      versions[key] && $html.addClass('versions_' + key);
    }
  },
  platform: function platform() {
    var platform = app.browser.platform;

    for (var key in platform) {
      platform[key] && $html.addClass('platform_' + key);
    }
  },
  isTouch: function isTouch() {
    if (app.browser.isTouch) {
      $html.addClass('is-touch');
    } else {
      $html.addClass('no-touch');
    }
  },
  language: function language() {
    $html.addClass(app.browser.language);
  },
  cssSupport: function cssSupport() {
    var css = {
      'position': 'sticky'
    };

    for (var key in css) {
      _utils["default"].cssSupport(key, css[key], true);
    }
  }
};
/* 响应式common
------------------------------------------------ */

app.response = function () {
  var callback = app.response.callback;
  var fn = {
    desktop: function desktop() {
      if ($html.hasClass('is_desktop')) return;
      $html.addClass('is_desktop');
      callback.desktop && callback.desktop();
    },
    padH: function padH() {
      if ($html.hasClass('is_pad_h')) return;
      $html.addClass('is_pad_h');
      callback.padH && callback.padH();
    },
    padV: function padV() {
      if ($html.hasClass('is_pad_v')) return;
      $html.addClass('is_pad_v');
      callback.padV && callback.padV();
    },
    mobile: function mobile() {
      if ($html.hasClass('is_mobile')) return;
      $html.addClass('is_mobile');
      callback.mobile && callback.mobile();
    }
  };
  callback.all && callback.all();
  $window.resize(_utils["default"].throttle(function () {
    app.device.mobile ? fn.mobile() : $html.removeClass('is_mobile');
    app.device.pad_v ? fn.padV() : $html.removeClass('is_pad_v');
    app.device.pad_h ? fn.padH() : $html.removeClass('is_pad_h');
    app.device.desktop ? fn.desktop() : $html.removeClass('is_desktop');
  }, 500)).resize();
};
/* 初始化页面加载的方法
------------------------------------------------ */


app.pageInit = function () {
  app.response();
  app.addBrowserTag.platform();
  app.addBrowserTag.versions();
  app.addBrowserTag.isTouch();
  app.addBrowserTag.cssSupport();
  app.addBrowserTag.language();
};
/* 全局 jquery.dom
------------------------------------------------ */


app.dom = {
  $foodIframeBox: _foodIframe["default"]
};
var _default = app;
exports["default"] = _default;

},{"./component/foodIframe":2,"./utils":12}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var CLASS_IFRAME_SHOW = 'show';
var CLASS_SCROLLLOCK = 'lock';
var $foodIframeBox = $('.food-iframe-box');
var $html = $('html');
var HASIFRAMEBOX = $foodIframeBox.length > 0;

$foodIframeBox.show = function (relatedTarget) {
  if (!HASIFRAMEBOX) return;
  var showEvent = $.Event('onShow', {
    relatedTarget: relatedTarget
  });
  $foodIframeBox.trigger(showEvent);
  $foodIframeBox.addClass(CLASS_IFRAME_SHOW);
  $html.addClass(CLASS_SCROLLLOCK);
};

$foodIframeBox.hide = function (relatedTarget) {
  if (!HASIFRAMEBOX) return;
  var hideEvent = $.Event('onHide', {
    relatedTarget: relatedTarget
  });
  $foodIframeBox.trigger(hideEvent);
  $foodIframeBox.removeClass(CLASS_IFRAME_SHOW);
  $html.removeClass(CLASS_SCROLLLOCK);
};

if (HASIFRAMEBOX) $foodIframeBox.find('button').on('click', $foodIframeBox.hide);
var _default = $foodIframeBox;
exports["default"] = _default;

},{}],3:[function(require,module,exports){
"use strict";

$.fn.hoverGif = function () {
  function init($els) {
    $els.each(function (i, el) {
      var $el = $(el);
      if ($el.data('hoverGif')) return;
      $el.data('hoverGif', true);
      var $img = $el.find('img[data-src]'),
          jpgSrc = $img.attr('src'),
          gifSrc = $img.data('src');
      $el.hover(function () {
        $img.attr('src', gifSrc);
      }, function () {
        $img.attr('src', jpgSrc);
      });
    });
  }

  if (app.device.desktop) init(this);
};

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EVENT_POPSHOW = 'popupBackdrop.show';
var EVENT_POPHIDE = 'popupBackdrop.hide';
var $body = $('body');

var popupBackdrop = /*#__PURE__*/function () {
  function popupBackdrop() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      zIndex: 6100
    };

    _classCallCheck(this, popupBackdrop);

    var $popupBackdrop = $body.find('.popup-backdrop');

    if ($popupBackdrop.length > 0) {
      return $popupBackdrop[0].popupBackdrop;
    }

    this._zIndex = options.zIndex;
    this.init();
  }

  _createClass(popupBackdrop, [{
    key: "init",
    value: function init() {
      var $el = $("<div class=\"popup-backdrop\" style=\"z-index: ".concat(this.zIndex, "\"></div>"));
      this.$el = $el;
      $body.append($el);
      $el[0].popupBackdrop = this; // $el.on('click', () => this.hide())
    }
  }, {
    key: "zIndex",
    get: function get() {
      return this._zIndex;
    },
    set: function set(num) {
      num *= 1;
      if (isNaN(num)) return;
      this._zIndex = num;
      this.$el.css({
        'z-index': num
      });
    }
  }, {
    key: "show",
    value: function show() {
      var $el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el;
      var showEvent = $.Event(EVENT_POPSHOW);
      $el.trigger(showEvent);
      $el.show().addClass('fadeIn');
      this.lockBody();
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this = this;

      var $el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el;
      var hideEvent = $.Event(EVENT_POPHIDE);
      $(this).trigger(hideEvent);
      $el.addClass('fadeOut');
      setTimeout(function () {
        $el.removeClass('fadeIn fadeOut');
        $el.hide();

        _this.lockBody(false);
      }, 300);
    }
  }, {
    key: "lockBody",
    value: function lockBody() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (value) $body.addClass('modal-open');else $body.removeClass('modal-open');
    }
  }]);

  return popupBackdrop;
}();

exports["default"] = popupBackdrop;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = _interopRequireDefault(require("../app"));

var _video = _interopRequireDefault(require("./video"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function requestFullScreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}

function cancelFullScrren(element) {
  if (element.exitFullscreen) {
    element.exitFullscreen();
  } else if (element.cancelFullScrren) {
    element.cancelFullScrren();
  } else if (element.webkitCancelFullScreen) {
    element.webkitCancelFullScreen();
  } else if (element.mozCancelFullScreen) {
    element.mozCancelFullScreen();
  }
}

var $body = $('body');

var popupMedia = /*#__PURE__*/function () {
  function popupMedia(videoPath) {
    _classCallCheck(this, popupMedia);

    var $popupMedia = $body.find('.popup-media');

    if ($popupMedia.length > 0) {
      return $popupMedia[0].popupMedia.show(videoPath);
    }

    this.init(videoPath);
  }

  _createClass(popupMedia, [{
    key: "init",
    value: function init(videoPath) {
      var _this = this;

      var $el = $("<div class=\"media-box full popup-media ".concat(_app["default"].browser.platform.ios && 'is_ios', "\" style=\"display: none\">\n      <div class=\"inner\">\n        <button class=\"close\" data-dismiss=\"close\"><i class=\"iconfont\" data-dismiss=\"close\">&#xe627;</i></button>\n        <div class=\"mc-video\">\n          <video src=\"").concat(videoPath, "\" controls></video>\n        </div>\n      </div>\n    </div>"));
      this.$el = $el;
      $el.on('click', function (e) {
        var target = e.target;
        target.hasAttribute('data-dismiss') && _this.hide();
      });
      $body.append($el);
      $el[0].popupMedia = this;
      this.mcVideo = new _video["default"]($el.find('video')[0]);
      this.video = this.mcVideo.video;
      this.video.addEventListener('fullscreenchange', function (event) {
        if (!document.fullscreenElement) _this.video.pause();
      });
      this.show(videoPath);
    }
  }, {
    key: "show",
    value: function show(videoPath) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this,
          $el = _ref.$el,
          video = _ref.video;

      if (_app["default"].device.desktop) {
        $el.fadeIn();
        this.lockBody();
      }

      this.palyVideo(videoPath);
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this,
          $el = _ref2.$el,
          video = _ref2.video;

      video.pause();
      $el.fadeOut();
      setTimeout(function () {
        _this2.lockBody(false);
      }, 300);
    }
  }, {
    key: "palyVideo",
    value: function palyVideo(videoPath) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this,
          video = _ref3.video;

      if (videoPath) {
        this.changeVideoSrc(videoPath);
      }

      video.play();

      if (!_app["default"].device.desktop) {
        setTimeout(function () {
          return requestFullScreen(video);
        }, 200);
      }
    }
  }, {
    key: "changeVideoSrc",
    value: function changeVideoSrc(videoPath) {
      var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this,
          video = _ref4.video;

      if (video.currentSrc != videoPath) video.src = videoPath;
    }
  }, {
    key: "lockBody",
    value: function lockBody() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (value) $body.addClass('modal-open');else $body.removeClass('modal-open');
    }
  }]);

  return popupMedia;
}();

exports["default"] = popupMedia;

},{"../app":1,"./video":9}],6:[function(require,module,exports){
"use strict";

$.fn.position_callback = function (opt) {
  var selector = this.selector;
  $(this).each(function () {
    var $this = $(this);

    if (!$this.length) {
      console.log('元素 ' + selector + ' 未找到');
      return;
    }

    var ele = $this[0];
    var options = {
      offsetTop: 0,
      offsetBottom: 0,
      topUp: function topUp() {},
      topDown: function topDown() {},
      bottomUp: function bottomUp() {},
      bottomDown: function bottomDown() {}
    };
    options = $.extend(options, opt);
    var scroll_position_callback = '';
    var scroll_position_callback_flag = 'scroll_position_callback_' + (selector + '').replace(/[^a-zA-Z\d]/g, '_');

    if (!$this.data(scroll_position_callback_flag)) {
      var position_callback_uuid_count = $('body').data('position_callback_uuid_count');
      if (!position_callback_uuid_count) position_callback_uuid_count = 0;
      $('body').data('position_callback_uuid_count', ++position_callback_uuid_count);
      $this.data(scroll_position_callback_flag, scroll_position_callback_flag + '_' + position_callback_uuid_count);
    }

    scroll_position_callback = $this.data(scroll_position_callback_flag);
    var status;
    $(window).off('scroll.' + scroll_position_callback).on('scroll.' + scroll_position_callback, function () {
      if (ele.getBoundingClientRect().top < options.offsetTop) {
        if (!status || status == 'topDown') {
          status = 'topUp';
          options.topUp.call($this);
        }
      } else {
        if (status == 'topUp' || status == 'bottomDown') {
          status = 'topDown';
          options.topDown.call($this);
        }
      }

      if (ele.getBoundingClientRect().bottom < options.offsetBottom) {
        if (status == 'topUp' || status == 'bottomDown') {
          status = 'bottomUp';
          options.bottomUp.call($this);
        }
      } else {
        if (status == 'bottomUp') {
          status = 'bottomDown';
          options.bottomDown.call($this);
        }
      }
    });
  });
};

},{}],7:[function(require,module,exports){
"use strict";

var _popupBackdrop = _interopRequireDefault(require("./popupBackdrop"));

var _popupMedia = _interopRequireDefault(require("./popupMedia"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var $body = $('body');
var POPUPBACKDROP = new _popupBackdrop["default"]();

var Point = /*#__PURE__*/function () {
  function Point(el) {
    _classCallCheck(this, Point);

    this.el = el;
    this.$el = $(el);
    this.uuid = ((1 + Math.random()) * 0x1000000 | 0).toString(16).substring(1);
    this.pos = this.getPosition();
    this.init();
  }

  _createClass(Point, [{
    key: "init",
    value: function init() {
      var _this = this;

      var $el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el;
      $el.addClass("point--".concat(this.uuid));
      $el.on('click', function () {
        return _this.showPopup();
      });
      console.log($el.find('.hot-point-popup .btn'));
      $el.find('.hot-point-popup .btn').on('click', PointPopup.popupDetail);
      this.insetArrow();
    }
  }, {
    key: "insetArrow",
    value: function insetArrow() {
      var $el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el;
      var arrowDirection = $el.data('arrow');
      var $arrow = $("<i class=\"arrow--".concat(arrowDirection, "\"></i>"));
      $el.prepend($arrow);
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      var dataPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el.data('positions');

      if (dataPos) {
        var pos = this.$el.data('positions').split('|').map(function (item) {
          return item.split(':').map(function (item) {
            return item.split(',');
          });
        });
        return {
          sm: {
            x: pos[0][1][0],
            y: pos[0][1][1]
          },
          lg: {
            x: pos[1][1][0],
            y: pos[1][1][1]
          }
        };
      }

      return;
    }
  }, {
    key: "inlineStyle",
    value: function inlineStyle() {
      var pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.pos;

      if (pos) {
        var arrowDirection = this.$el.data('arrow');
        return "\n        .point--".concat(this.uuid, " {\n          ").concat(arrowDirection, ": ").concat(pos.sm.x, "%;\n          top: ").concat(pos.sm.y, "%;\n        }\n        @media (min-width: 992px) {\n          .point--").concat(this.uuid, " {\n            ").concat(arrowDirection, ": ").concat(pos.lg.x, "%;\n            top: ").concat(pos.lg.y, "%;\n          }\n        }\n      ");
      }

      return '';
    }
  }, {
    key: "showPopup",
    value: function showPopup() {
      var $el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el;
      var $popupConent = $el.find('.hot-point-popup');
      if (app.screen.vw >= 1420 || $popupConent.length == 0) return;
      POPUPBACKDROP.show();
      new PointPopup({
        content: $popupConent
      }).show();
    }
  }]);

  return Point;
}();

var PointPopup = /*#__PURE__*/function () {
  function PointPopup(options) {
    _classCallCheck(this, PointPopup);

    options = Object.assign({
      zIndex: 6110,
      closeBtn: true
    }, options);
    var $pointPopup = $body.find('.point-popup');

    if ($pointPopup.length > 0) {
      $pointPopup[0].pointPopup.fillContent(options.content);
      return $pointPopup[0].pointPopup;
    }

    this.zIndex = options.zIndex;
    this.init(options);
  }

  _createClass(PointPopup, [{
    key: "init",
    value: function init(options) {
      var _this2 = this;

      var $el = $("<div class=\"point-popup\" data-dismiss=\"close\" style=\"z-index: ".concat(this.zIndex, "\">\n        <div class=\"point-popup-content\" data-dismiss=\"close\">\n          <button class=\"point-popup-close iconfont icon-map-close\" type=\"button\" data-dismiss=\"close\"></button>\n          <div class=\"point-popup-content-template\"></div>\n        </div>\n      </div>"));
      this.$el = $el;
      this.$content = $el.find('.point-popup-content');
      this.$el.on('click', function (e) {
        var target = e.target;
        target.hasAttribute('data-dismiss') && _this2.hide();
        if (target.hasAttribute('href')) PointPopup.popupDetail(e);
      });
      $body.append($el);
      $el[0].pointPopup = this;
      this.fillContent(options.content);
    }
  }, {
    key: "fillContent",
    value: function fillContent(content) {
      this.$content.find('.point-popup-content-template').html($(content)[0].outerHTML);
    }
  }, {
    key: "show",
    value: function show() {
      var $el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el;
      POPUPBACKDROP.show();
      $el.show().addClass('scaleUp');
    }
  }, {
    key: "hide",
    value: function hide() {
      var $el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el;
      POPUPBACKDROP.hide();
      $el.addClass('scaleDown');
      setTimeout(function () {
        $el.removeClass('scaleUp scaleDown');
        $el.hide();
      }, 300);
    }
  }], [{
    key: "popupDetail",
    value: function popupDetail(e) {
      var _target$dataset, _target$dataset$linkT;

      var target = e.target;

      if ((_target$dataset = target.dataset) !== null && _target$dataset !== void 0 && (_target$dataset$linkT = _target$dataset.linkType) !== null && _target$dataset$linkT !== void 0 && _target$dataset$linkT.includes('video')) {
        e.preventDefault();
        var videoSrc = target.href;
        new _popupMedia["default"](videoSrc);
      }

      if (app.screen.vw < 991) return;
      var $foodIframeBox = app.dom.$foodIframeBox;

      if (target.target != '_blank') {
        e.preventDefault();
        console.log(e.target);
        $foodIframeBox.show(e.target);
      }
    }
  }]);

  return PointPopup;
}();

$.fn.productHotSpots = function (options) {
  if (this.hasClass('ready')) return;
  var points = options.points;
  var $points;
  if (points) $points = this.find(points);else $points = this.children();
  var pointStyles = '';
  $points.each(function (i, el) {
    var point = new Point(el);
    pointStyles += point.inlineStyle();
  });
  app.loadFile({
    type: 'style',
    style: pointStyles
  });
  this.addClass('ready');
};

},{"./popupBackdrop":4,"./popupMedia":5}],8:[function(require,module,exports){
"use strict";

$.fn.tableCalculator = function () {
  this.each(function () {
    var $table = $(this);
    if ($table.data('tableCalculator') || !$table.length) return;
    $table.data('tableCalculator', true);
    $table.wrap('<div class="table-responsive">');
    var $tableWrap = $table.parent();
    var $caption = $table.find('caption').hide();
    var $theadTh = $table.find('thead th');
    $tableWrap.before("<span class=\"table-calculator--caption\">".concat($caption.text(), "</span>"));
    $theadTh.each(function () {
      this.innerHTML = "<span class=\"vertical\">".concat(this.innerHTML, "</span>");
    });
  });
};

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var videoDefaultPropertys = {
  controls: false,
  loop: false
};
var VIDEO_PLAYING = 'video--playing';

var video = /*#__PURE__*/function () {
  function video(_video, propertys) {
    _classCallCheck(this, video);

    this.propertys = Object.assign(videoDefaultPropertys, propertys);
    this.video = _video;
    this.parentElement = _video.parentElement;
    this.init();
  }

  _createClass(video, [{
    key: "init",
    value: function init() {
      var _this = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this,
          _video2 = _ref.video,
          parentElement = _ref.parentElement;

      this.setPropertys();
      parentElement.addEventListener('click', function () {
        _this.toggle();
      });

      _video2.addEventListener('contextmenu', function (e) {
        return e.preventDefault();
      }); //取消右键事件


      _video2.onplay = function () {
        parentElement.classList.add(VIDEO_PLAYING);
      };

      _video2.onpause = function () {
        parentElement.classList.remove(VIDEO_PLAYING);
      };

      _video2.onended = function () {
        _video2.load(); //重新载入封面

      };
    }
  }, {
    key: "setPropertys",
    value: function setPropertys() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this,
          _video3 = _ref2.video,
          propertys = _ref2.propertys;

      for (var prop in propertys) {
        _video3[prop] = propertys[prop];
      }
    }
  }, {
    key: "toggle",
    value: function toggle() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this,
          _video4 = _ref3.video;

      if (_video4.paused) {
        _video4.play();
      } else {
        _video4.pause();
      }
    }
  }]);

  return video;
}();

var _default = video;
exports["default"] = _default;

},{}],10:[function(require,module,exports){
"use strict";

var _app = _interopRequireDefault(require("./app"));

require("./component/positionCallback");

require("./component/hoverGif");

require("./component/tableCalculator");

require("./pages/productDetail");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

window.app = _app["default"];
_app["default"].response.callback = {
  desktop: function desktop() {// 桌面端
  },
  padH: function padH() {// pad横版
  },
  padV: function padV() {// pad竖版
  },
  mobile: function mobile() {// 手机端
  },
  all: function all() {// 全端
  }
};

_app["default"].pageInit();

function shareInit() {
  //点赞
  $(".follows .bdsharebuttonbox button").click(function () {
    $(this).addClass("active");
  });
}

shareInit();
$(document).mouseup(function (e) {
  var pop = $('.popup-content');

  if (!pop.is(e.target) && pop.has(e.target).length === 0) {
    $('.popup-box').removeClass('pop-show');
    $('html').removeClass('lock');
  }
});
$('.popup-box .close-btn').click(function () {
  $('.popup-box').removeClass('pop-show');
  $('html').removeClass('lock');
});

},{"./app":1,"./component/hoverGif":3,"./component/positionCallback":6,"./component/tableCalculator":8,"./pages/productDetail":11}],11:[function(require,module,exports){
"use strict";

var _app = _interopRequireDefault(require("../app"));

require("../component/productHotSpots");

var _video = _interopRequireDefault(require("../component/video"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

$('.inlude-component').each(function () {
  var $componet = $(this);
  var type = $componet[0].firstElementChild.className;
  type && componentAutoInit(type, $componet);
});

function componentAutoInit(type, $componet) {
  var autoInit = {
    'product-hot-spots': productHotSpotsInit,
    'video': videoInit
  };
  autoInit[type]($componet);
}

function productHotSpotsInit($componet) {
  $componet.find('.hot-point-group').position_callback({
    offsetTop: _app["default"].screen.vh * 0.6,
    topUp: function topUp() {
      this.productHotSpots({
        points: '.hot-point'
      });
    }
  });
}

function videoInit($componet) {
  new _video["default"]($componet.find('video')[0]);
}

},{"../app":1,"../component/productHotSpots":7,"../component/video":9}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  // 加载内容：js，css，style
  loadFile: function loadFile(opt) {
    var options = {
      type: "js",
      url: "",
      loadCallback: function loadCallback() {
        console.log("加载完毕回调");
      }
    };
    options = $.extend(options, opt);

    if (options.type == "js") {
      var _file = document.createElement("script");

      _file.src = options.url;
    } else if (options.type == "css") {
      var _file2 = document.createElement("link");

      _file2.rel = "stylesheet";
      _file2.href = options.url;
    } else if (options.type == "style") {
      var _file3 = document.createElement("style");

      _file3.rel = "stylesheet";
      _file3.innerHTML = options.style;
    }

    document.getElementsByTagName("head")[0].appendChild(file);

    file.onload = function () {
      options.loadCallback();
    };
  },
  // 节流：是将多次执行变为每隔一段时间执行。
  throttle: function throttle(fn) {
    var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
    var lastTime = 0;
    return function () {
      var now = Date.now();

      if (now - lastTime >= interval) {
        lastTime = now;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        fn.apply(this, args);
      }
    };
  },
  // 防抖：是将多次执行变为最后一次执行
  debounce: function debounce(fn) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
    var timeout;
    return function () {
      var _this = this;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      clearTimeout(timeout);
      timeout = setTimeout(function () {
        fn.apply(_this, args);
      }, delay);
    };
  },
  //检查css支持
  cssSupport: function cssSupport(attr, value, needAddClass) {
    var element = document.createElement('div');

    var notSupport = function notSupport() {
      console.warn('css不支持' + attr + ':' + value);

      if (needAddClass) {
        var $html = document.querySelector('html');
        $html.classList.add('no-' + value);
      }

      return false;
    };

    if (attr in element.style) {
      element.style[attr] = value;

      if (element.style[attr] != value) {
        notSupport();
      } else {
        return true;
      }
    } else {
      notSupport();
    }
  },
  // 微信调用videoPlay
  wechatVideoPlay: function wechatVideoPlay(video) {
    if (window.WeixinJSBridge) {
      WeixinJSBridge.invoke("getNetworkType", {}, function (e) {
        video.play();
      }, false);
    } else {
      document.addEventListener("WeixinJSBridgeReady", function () {
        WeixinJSBridge.invoke("getNetworkType", {}, function (e) {
          video.play();
        });
      }, false);
    }
  }
};
exports["default"] = _default;

},{}]},{},[10]);

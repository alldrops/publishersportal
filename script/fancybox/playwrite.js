// Generated by CoffeeScript 1.4.0

/*global _:false
*/


/*jshint devel:true
*/


(function() {
  var oldAfter, oldEach, _ref;

  _ref = [_.each, _.after], oldEach = _ref[0], oldAfter = _ref[1];

  _.mixin({
    each: function(coll) {
      oldEach.apply(this, arguments);
      return coll;
    },
    after: function(callback, number) {
      if (_.isFunction(callback && _.isNumber(number))) {
        return oldAfter.call(this, number, callback);
      } else {
        return oldAfter.apply(this, arguments);
      }
    },
    preloadImages: function(URLList, callbacks) {
      var afterAllComplete, afterAllSuccess, listSize, noop, onceError, results, _callbacks;
      noop = function() {
        return null;
      };
      _callbacks = {
        success: noop,
        error: noop,
        complete: noop,
        fileSuccess: noop,
        fileError: noop,
        fileComplete: noop
      };
      if (_.isObject(callbacks)) {
        _.extend(_callbacks, callbacks);
      } else if (_.isFunction(callbacks)) {
        _callbacks.success = callbacks;
      }
      listSize = _.size(URLList);
      afterAllSuccess = _.after(listSize, _.once(_callbacks.success));
      afterAllComplete = _.after(listSize, _.once(_callbacks.complete));
      onceError = _.once(_callbacks.error);
      results = _.isArray(URLList) ? new Array(URLList.length) : {};
      return _.each(URLList, function(item, key) {
        var DE_imageItem;
        DE_imageItem = new Image();
        DE_imageItem.addEventListener('load', function() {
          results[key] = this;
          _callbacks.fileSuccess.apply(this);
          _callbacks.fileComplete.apply(this, ['success']);
          afterAllSuccess.apply(null, results);
          return afterAllComplete.apply(null, results);
        });
        DE_imageItem.addEventListener('error', function() {
          _callbacks.fileError.apply(this);
          _callbacks.fileComplete.apply(this, ['error']);
          onceError.apply(this);
          return afterAllComplete.apply(null, results);
        });
        return DE_imageItem.src = item;
      });
    }
  });

  $(function() {
    var $email_submit_form, $playwrite_animation, URLList, allDone;
    $playwrite_animation = $('.playwrite_animation');
    URLList = [];
    allDone = function() {
      return $playwrite_animation.addClass('done');
    };
    _.each(['topshadow', 'bottomshadow', 'ipad', 'book', 'logo'], function(item) {
      URLList.push("/images/playwrite_animation_" + item + ".png");
      URLList.push("/images/playwrite_animation_ipad_" + item + ".png");
      return URLList.push("/images/playwrite_animation_phone_" + item + ".png");
    });
    _.preloadImages(URLList, {
      complete: allDone,
      fileError: function() {
        return console.log(this);
      }
    });
    $playwrite_animation.find('.wundr_logo')[0].addEventListener('webkitAnimationEnd', function() {
      $playwrite_animation.addClass('done');
      return $playwrite_animation.removeClass('playing');
    });
    setTimeout(allDone, 5000);
    $email_submit_form = $('#email_submit_form');
    $email_submit_form.submit(function(e) {
      e.preventDefault();
      $.ajax("/playwrite_request?" + ($email_submit_form.serialize()));
      return $playwrite_animation.addClass('submitted');
    });
    return ($('.events_button')).click(function() {
      return document.location = "/event";
    });
  });

}).call(this);

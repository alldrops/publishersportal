###global _:false###
###jshint devel:true###
[oldEach, oldAfter] = [_.each, _.after]
_.mixin
	each: (coll) ->
		oldEach.apply @, arguments
		coll
	after: (callback, number)->
		if _.isFunction callback and _.isNumber number 
			oldAfter.call @, number, callback 
		else oldAfter.apply @, arguments
	preloadImages: (URLList, callbacks) ->
		noop = -> null
		_callbacks =
			success:noop, error:noop, complete:noop
			fileSuccess:noop, fileError:noop, fileComplete:noop
		if _.isObject callbacks then _.extend _callbacks, callbacks
		else if _.isFunction callbacks then _callbacks.success = callbacks

		listSize = _.size URLList
		afterAllSuccess = _.after listSize, _.once _callbacks.success
		afterAllComplete = _.after listSize, _.once _callbacks.complete
		onceError = _.once _callbacks.error
		results = if _.isArray URLList then new Array(URLList.length) else {}

		_.each URLList, (item, key) ->
			DE_imageItem = new Image()

			DE_imageItem.addEventListener 'load', ->
				results[key] = @
				_callbacks.fileSuccess.apply @
				_callbacks.fileComplete.apply @, ['success']
				afterAllSuccess.apply null, results
				afterAllComplete.apply null, results

			DE_imageItem.addEventListener 'error', ->
				_callbacks.fileError.apply @
				_callbacks.fileComplete.apply @, ['error']
				onceError.apply @
				afterAllComplete.apply null, results

			DE_imageItem.src = item;

$ ->
	$playwrite_animation = $ '.playwrite_animation'
	URLList = []
	# loopAudio = document.getElementById 'loop_audio'
	# loopAudio.volume = 0.1

	allDone = ->
		$playwrite_animation.addClass 'done'
		# loopAudio.play()
	_.each ['topshadow', 'bottomshadow', 'ipad', 'book', 'logo'], (item) ->
		URLList.push "/images/playwrite_animation_#{item}.png"
		URLList.push "/images/playwrite_animation_ipad_#{item}.png"
		URLList.push "/images/playwrite_animation_phone_#{item}.png"
	_.preloadImages URLList, complete: allDone, fileError: () ->
		console.log @

	$playwrite_animation.find('.wundr_logo')[0].addEventListener 'webkitAnimationEnd', ->
		$playwrite_animation.addClass 'done'
		$playwrite_animation.removeClass 'playing'

	# loopAudio.addEventListener 'canplaythrough', allDone
	# loopAudio.src = '/images/01 All for U.m4a'
	# allDone()
	setTimeout allDone, 5000

	$email_submit_form = $ '#email_submit_form'
	$email_submit_form.submit (e) ->
		e.preventDefault()
		$.ajax "/playwrite_request?#{$email_submit_form.serialize()}"
		$playwrite_animation.addClass 'submitted'

	($ '.events_button').click ->
		document.location = "/event"

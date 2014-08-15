###jshint eqnull:true loopfunc:true###
do ($) ->
	$.fn.easyPaginate = (options) ->
		defaults = 
			step:4, delay: 100, numeric: true, nextprev: true, loop:false, pause:4000
			clickstop:true, controls:'pagination', current:'current', randomstart:false
		options = $.extend defaults, options
		step = options.step
		children = $(@).children()
		count = children.length
		pages = Math.floor count/step
		page = if options.randomstart then (Math.floor Math.random() * pages) + 1 else 1
		timeout = lower = upper = obj = next = prev = clicked = null
		show = ->
			clearTimeout timeout
			lower = (page - 1) * step
			upper = lower + step
			$(children).each (i) ->
				child = $ @
				child.hide()
				if i >= lower and i < upper
					setTimeout ->
						child.fadeIn 'fast'
					, (i - step * Math.floor i / step) * options.delay
				if options.nextprev
					if upper >= count then next.fadeOut 'fast' else next.fadeIn 'fast'
					if lower >= 1 then prev.fadeIn 'fast' else prev.fadeOut 'fast'
			($ 'li', "##{options.controls}").removeClass options.current
			($ "li[data-index='#{page}']", "##{options.controls}").addClass options.current
			if options.auto
				unless options.clickstop and clicked
					timeout = setTimeout auto, options.pause
			@
		auto = ->
			if options.loop and upper >= count
				page = 0
				show()
			if upper < count
				page += 1
				show()
			@

		@each ->
			obj = this
			if count > step
				if (count / step) > pages then pages += 1
				ol = ($ "<ol id='#{options.controls}'></ol>").insertAfter @
				if options.nextprev
					prev = ($ "<li class='prev'>Previous</li>")
						.hide()
						.appendTo(ol)
						.click ->
							clicked = true
							page -= 1
							show()

				if options.numeric
					for idx, _page of pages
						($ "<li data-index='#{idx}'>#{idx}</li>")
							.appendTo(ol)
							.click ->
								clicked = true
								page = $(this).attr 'data-index'
								show()

				if options.nextprev
					next = ($ "<li class='next'>Next</li>")
						.hide()
						.appendTo(ol)
						.click ->
							clicked = true
							page += 1
							show()
				show()
			@

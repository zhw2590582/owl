jQuery(document).ready(function() {
	
	if(jQuery(".zancai").length>0){	
		jQuery(".zancai .jm-post-like .fa-heart").addClass("fa-thumbs-up").removeClass("fa-heart");
		jQuery(".zancai .jm-post-like .fa-heart-o").addClass("fa-thumbs-o-up").removeClass("fa-heart-o");
		
		jQuery("body").on("click", ".zancai .jm-post-like", function(event) {
			event.preventDefault();
			heart = jQuery(this);
			post_id = heart.data("post_id");
			heart.html("<i class='fa fa-thumbs-up'></i>&nbsp;<i class='fa fa-cog fa-spin'></i>");
			jQuery.ajax({
				type: "post",
				url: ajax_var.url,
				data: "action=jm-post-like&nonce=" + ajax_var.nonce + "&jm_post_like=&post_id=" + post_id,
				success: function(count) {
					if (count.indexOf("already") !== -1) {
						var lecount = count.replace("already", "");
						if (lecount === "0") {
							lecount = "0"
						}
						heart.prop("title", "Like");
						heart.removeClass("liked");
						heart.html("<i class='fa fa-thumbs-o-up'></i>&nbsp;" + lecount)
					} else {
						heart.prop("title", "Unlike");
						heart.addClass("liked");
						heart.html("<i class='fa fa-thumbs-up'></i>&nbsp;" + count)
					}
				}
			})
		});	
		
		jQuery("body").on("click", ".jm-post-hate", function(event) {
			event.preventDefault();
			heart = jQuery(this);
			post_id = heart.data("post_id");
			heart.html("<i class='fa fa-thumbs-down'></i>&nbsp;<i class='fa fa-cog fa-spin'></i>");
			jQuery.ajax({
				type: "post",
				url: ajax_var.url,
				data: "action=jm-post-hate&nonce=" + ajax_var.nonce + "&jm_post_hate=&post_id=" + post_id,
				success: function(count) {
					if (count.indexOf("already") !== -1) {
						var lecount = count.replace("already", "");
						if (lecount === "0") {
							lecount = "0"
						}
						heart.prop("title", "hate");
						heart.removeClass("hated");
						heart.html("<i class='fa fa-thumbs-o-down'></i>&nbsp;" + lecount)
					} else {
						heart.prop("title", "Unhate");
						heart.addClass("hated");
						heart.html("<i class='fa fa-thumbs-down'></i>&nbsp;" + count)
					}
				}
			})
		})		
		
	} else {
		jQuery("body").on("click", ".jm-post-like", function(event) {
			event.preventDefault();
			heart = jQuery(this);
			post_id = heart.data("post_id");
			heart.html("<i class='fa fa-heart'></i><i class='fa fa-cog fa-spin'></i>");
			jQuery.ajax({
				type: "post",
				url: ajax_var.url,
				data: "action=jm-post-like&nonce=" + ajax_var.nonce + "&jm_post_like=&post_id=" + post_id,
				success: function(count) {
					if (count.indexOf("already") !== -1) {
						var lecount = count.replace("already", "");
						if (lecount === "0") {
							lecount = "0"
						}
						heart.prop("title", "Like");
						heart.removeClass("liked");
						heart.html("<i class='fa fa-heart-o'></i>" + lecount)
					} else {
						heart.prop("title", "Unlike");
						heart.addClass("liked");
						heart.html("<i class='fa fa-heart'></i>" + count)
					}
				}
			})
		});			
	};			
	
})

var IASCallbacks = function() {
		return this.list = [], this.fireStack = [], this.isFiring = !1, this.isDisabled = !1, this.fire = function(a) {
			var b = a[0],
				c = a[1],
				d = a[2];
			this.isFiring = !0;
			for (var e = 0, f = this.list.length; f > e; e++) {
				if (void 0 != this.list[e] && !1 === this.list[e].fn.apply(b, d)) {
					c.reject();
					break
				}
			}
			this.isFiring = !1, c.resolve(), this.fireStack.length && this.fire(this.fireStack.shift())
		}, this.inList = function(a, b) {
			b = b || 0;
			for (var c = b, d = this.list.length; d > c; c++) {
				if (this.list[c].fn === a || a.guid && this.list[c].fn.guid && a.guid === this.list[c].fn.guid) {
					return c
				}
			}
			return -1
		}, this
	};
IASCallbacks.prototype = {
	add: function(a, b) {
		var c = {
			fn: a,
			priority: b
		};
		b = b || 0;
		for (var d = 0, e = this.list.length; e > d; d++) {
			if (b > this.list[d].priority) {
				return this.list.splice(d, 0, c), this
			}
		}
		return this.list.push(c), this
	},
	remove: function(a) {
		for (var b = 0;
		(b = this.inList(a, b)) > -1;) {
			this.list.splice(b, 1)
		}
		return this
	},
	has: function(a) {
		return this.inList(a) > -1
	},
	fireWith: function(a, b) {
		var c = jQuery.Deferred();
		return this.isDisabled ? c.reject() : (b = b || [], b = [a, c, b.slice ? b.slice() : b], this.isFiring ? this.fireStack.push(b) : this.fire(b), c)
	},
	disable: function() {
		this.isDisabled = !0
	},
	enable: function() {
		this.isDisabled = !1
	}
}, function(a) {
	var b = -1,
		c = function(c, d) {
			return this.itemsContainerSelector = d.container, this.itemSelector = d.item, this.nextSelector = d.next, this.paginationSelector = d.pagination, this.$scrollContainer = c, this.$container = window === c.get(0) ? a(document) : c, this.defaultDelay = d.delay, this.negativeMargin = d.negativeMargin, this.nextUrl = null, this.isBound = !1, this.isPaused = !1, this.listeners = {
				next: new IASCallbacks,
				load: new IASCallbacks,
				loaded: new IASCallbacks,
				render: new IASCallbacks,
				rendered: new IASCallbacks,
				scroll: new IASCallbacks,
				noneLeft: new IASCallbacks,
				ready: new IASCallbacks
			}, this.extensions = [], this.scrollHandler = function() {
				if (this.isBound && !this.isPaused) {
					var a = this.getCurrentScrollOffset(this.$scrollContainer),
						c = this.getScrollThreshold();
					b != c && (this.fire("scroll", [a, c]), a >= c && this.next())
				}
			}, this.getItemsContainer = function() {
				return a(this.itemsContainerSelector)
			}, this.getLastItem = function() {
				return a(this.itemSelector, this.getItemsContainer().get(0)).last()
			}, this.getFirstItem = function() {
				return a(this.itemSelector, this.getItemsContainer().get(0)).first()
			}, this.getScrollThreshold = function(a) {
				var c;
				return a = a || this.negativeMargin, a = a >= 0 ? -1 * a : a, c = this.getLastItem(), 0 === c.length ? b : c.offset().top + c.height() + a
			}, this.getCurrentScrollOffset = function(a) {
				var b = 0,
					c = a.height();
				return b = window === a.get(0) ? a.scrollTop() : a.offset().top, (-1 != navigator.platform.indexOf("iPhone") || -1 != navigator.platform.indexOf("iPod")) && (c += 80), b + c
			}, this.getNextUrl = function(b) {
				return b = b || this.$container, a(this.nextSelector, b).last().attr("href")
			}, this.load = function(b, c, d) {
				var e, f, g = this,
					h = [],
					i = +new Date;
				d = d || this.defaultDelay;
				var j = {
					url: b
				};
				return g.fire("load", [j]), a.get(j.url, null, a.proxy(function(b) {
					e = a(this.itemsContainerSelector, b).eq(0), 0 === e.length && (e = a(b).filter(this.itemsContainerSelector).eq(0)), e && e.find(this.itemSelector).each(function() {
						h.push(this)
					}), g.fire("loaded", [b, h]), c && (f = +new Date - i, d > f ? setTimeout(function() {
						c.call(g, b, h)
					}, d - f) : c.call(g, b, h))
				}, g), "html")
			}, this.render = function(b, c) {
				var d = this,
					e = this.getLastItem(),
					f = 0,
					g = this.fire("render", [b]);
				g.done(function() {
					a(b).hide(), e.after(b), a(b).fadeIn(400, function() {
						++f < b.length || (d.fire("rendered", [b]), c && c())
					})
				})
			}, this.hidePagination = function() {
				this.paginationSelector && a(this.paginationSelector, this.$container).hide()
			}, this.restorePagination = function() {
				this.paginationSelector && a(this.paginationSelector, this.$container).show()
			}, this.throttle = function(b, c) {
				var d, e, f = 0;
				return d = function() {
					function a() {
						f = +new Date, b.apply(d, g)
					}
					var d = this,
						g = arguments,
						h = +new Date - f;
					e ? clearTimeout(e) : a(), h > c ? a() : e = setTimeout(a, c)
				}, a.guid && (d.guid = b.guid = b.guid || a.guid++), d
			}, this.fire = function(a, b) {
				return this.listeners[a].fireWith(this, b)
			}, this.pause = function() {
				this.isPaused = !0
			}, this.resume = function() {
				this.isPaused = !1
			}, this
		};
	c.prototype.initialize = function() {
		var a = !! ("onscroll" in this.$scrollContainer.get(0)),
			b = this.getCurrentScrollOffset(this.$scrollContainer),
			c = this.getScrollThreshold();
		return a ? (this.hidePagination(), this.bind(), this.fire("ready"), this.nextUrl = this.getNextUrl(), b >= c && this.next(), this) : !1
	}, c.prototype.reinitialize = function() {
		this.unbind(), this.initialize()
	}, c.prototype.bind = function() {
		if (!this.isBound) {
			this.$scrollContainer.on("scroll", a.proxy(this.throttle(this.scrollHandler, 150), this));
			for (var b = 0, c = this.extensions.length; c > b; b++) {
				this.extensions[b].bind(this)
			}
			this.isBound = !0, this.resume()
		}
	}, c.prototype.unbind = function() {
		if (this.isBound) {
			this.$scrollContainer.off("scroll", this.scrollHandler);
			for (var a = 0, b = this.extensions.length; b > a; a++) {
				"undefined" != typeof this.extensions[a].unbind && this.extensions[a].unbind(this)
			}
			this.isBound = !1
		}
	}, c.prototype.destroy = function() {
		this.unbind(), this.$scrollContainer.data("ias", null)
	}, c.prototype.on = function(b, c, d) {
		if ("undefined" == typeof this.listeners[b]) {
			throw new Error('There is no event called "' + b + '"')
		}
		return d = d || 0, this.listeners[b].add(a.proxy(c, this), d), this
	}, c.prototype.one = function(a, b) {
		var c = this,
			d = function() {
				c.off(a, b), c.off(a, d)
			};
		return this.on(a, b), this.on(a, d), this
	}, c.prototype.off = function(a, b) {
		if ("undefined" == typeof this.listeners[a]) {
			throw new Error('There is no event called "' + a + '"')
		}
		return this.listeners[a].remove(b), this
	}, c.prototype.next = function() {
		var a = this.nextUrl,
			b = this;
		if (this.pause(), !a) {
			return this.fire("noneLeft", [this.getLastItem()]), this.listeners.noneLeft.disable(), b.resume(), !1
		}
		var c = this.fire("next", [a]);
		return c.done(function() {
			b.load(a, function(a, c) {
				b.render(c, function() {
					b.nextUrl = b.getNextUrl(a), b.resume()
				})
			})
		}), c.fail(function() {
			b.resume()
		}), !0
	}, c.prototype.extension = function(a) {
		if ("undefined" == typeof a.bind) {
			throw new Error('Extension doesn\'t have required method "bind"')
		}
		return "undefined" != typeof a.initialize && a.initialize(this), this.extensions.push(a), this.reinitialize(), this
	}, a.ias = function() {
		var b = a(window);
		return b.ias.apply(b, arguments)
	}, a.fn.ias = function(b) {
		var d = Array.prototype.slice.call(arguments),
			e = this;
		return this.each(function() {
			var f = a(this),
				g = f.data("ias"),
				h = a.extend({}, a.fn.ias.defaults, f.data(), "object" == typeof b && b);
			if (g || (f.data("ias", g = new c(f, h)), a(document).ready(a.proxy(g.initialize, g))), "string" == typeof b) {
				if ("function" != typeof g[b]) {
					throw new Error('There is no method called "' + b + '"')
				}
				d.shift(), g[b].apply(g, d)
			}
			e = g
		}), e
	}, a.fn.ias.defaults = {
		item: ".item",
		container: ".listing",
		next: ".next",
		pagination: !1,
		delay: 600,
		negativeMargin: 10
	}
}(jQuery);
var IASHistoryExtension = function(a) {
		return a = jQuery.extend({}, this.defaults, a), this.ias = null, this.prevSelector = a.prev, this.prevUrl = null, this.listeners = {
			prev: new IASCallbacks
		}, this.onPageChange = function(a, b, c) {
			if (window.history && window.history.replaceState) {
				var d = history.state;
				history.replaceState(d, document.title, c)
			}
		}, this.onScroll = function(a) {
			var b = this.getScrollThresholdFirstItem();
			this.prevUrl && (a -= this.ias.$scrollContainer.height(), b >= a && this.prev())
		}, this.onReady = function() {
			var a = this.ias.getCurrentScrollOffset(this.ias.$scrollContainer),
				b = this.getScrollThresholdFirstItem();
			a -= this.ias.$scrollContainer.height(), b >= a && this.prev()
		}, this.getPrevUrl = function(a) {
			return a || (a = this.ias.$container), jQuery(this.prevSelector, a).last().attr("href")
		}, this.getScrollThresholdFirstItem = function() {
			var a;
			return a = this.ias.getFirstItem(), 0 === a.length ? -1 : a.offset().top
		}, this.renderBefore = function(a, b) {
			var c = this.ias,
				d = c.getFirstItem(),
				e = 0;
			c.fire("render", [a]), jQuery(a).hide(), d.before(a), jQuery(a).fadeIn(400, function() {
				++e < a.length || (c.fire("rendered", [a]), b && b())
			})
		}, this
	};
IASHistoryExtension.prototype.initialize = function(a) {
	var b = this;
	this.ias = a, jQuery.extend(a.listeners, this.listeners), a.prev = function() {
		return b.prev()
	}, this.prevUrl = this.getPrevUrl()
}, IASHistoryExtension.prototype.bind = function(a) {
	a.on("pageChange", jQuery.proxy(this.onPageChange, this)), a.on("scroll", jQuery.proxy(this.onScroll, this)), a.on("ready", jQuery.proxy(this.onReady, this))
}, IASHistoryExtension.prototype.unbind = function(a) {
	a.off("pageChange", this.onPageChange), a.off("scroll", this.onScroll), a.off("ready", this.onReady)
}, IASHistoryExtension.prototype.prev = function() {
	var a = this.prevUrl,
		b = this,
		c = this.ias;
	if (!a) {
		return !1
	}
	c.pause();
	var d = c.fire("prev", [a]);
	return d.done(function() {
		c.load(a, function(a, d) {
			b.renderBefore(d, function() {
				b.prevUrl = b.getPrevUrl(a), c.resume(), b.prevUrl && b.prev()
			})
		})
	}), d.fail(function() {
		c.resume()
	}), !0
}, IASHistoryExtension.prototype.defaults = {
	prev: ".prev"
};
var IASNoneLeftExtension = function(a) {
		return a = jQuery.extend({}, this.defaults, a), this.ias = null, this.uid = (new Date).getTime(), this.html = a.html.replace("{text}", a.text), this.showNoneLeft = function() {
			var a = jQuery(this.html).attr("id", "ias_noneleft_" + this.uid),
				b = this.ias.getLastItem();
			b.after(a), a.fadeIn()
		}, this
	};
IASNoneLeftExtension.prototype.bind = function(a) {
	this.ias = a, a.on("noneLeft", jQuery.proxy(this.showNoneLeft, this))
}, IASNoneLeftExtension.prototype.unbind = function(a) {
	a.off("noneLeft", this.showNoneLeft)
}, IASNoneLeftExtension.prototype.defaults = {
	text: "You reached the end.",
	html: '<div class="ias-noneleft" style="text-align: center;">{text}</div>'
};
var IASPagingExtension = function() {
		return this.ias = null, this.pagebreaks = [
			[0, document.location.toString()]
		], this.lastPageNum = 1, this.enabled = !0, this.listeners = {
			pageChange: new IASCallbacks
		}, this.onScroll = function(a) {
			if (this.enabled) {
				var b, c = this.ias,
					d = this.getCurrentPageNum(a),
					e = this.getCurrentPagebreak(a);
				this.lastPageNum !== d && (b = e[1], c.fire("pageChange", [d, a, b])), this.lastPageNum = d
			}
		}, this.onNext = function(a) {
			var b = this.ias.getCurrentScrollOffset(this.ias.$scrollContainer);
			this.pagebreaks.push([b, a]);
			var c = this.getCurrentPageNum(b) + 1;
			this.ias.fire("pageChange", [c, b, a]), this.lastPageNum = c
		}, this.onPrev = function(a) {
			var b = this,
				c = b.ias,
				d = c.getCurrentScrollOffset(c.$scrollContainer),
				e = d - c.$scrollContainer.height(),
				f = c.getFirstItem();
			this.enabled = !1, this.pagebreaks.unshift([0, a]), c.one("rendered", function() {
				for (var d = 1, g = b.pagebreaks.length; g > d; d++) {
					b.pagebreaks[d][0] = b.pagebreaks[d][0] + f.offset().top
				}
				var h = b.getCurrentPageNum(e) + 1;
				c.fire("pageChange", [h, e, a]), b.lastPageNum = h, b.enabled = !0
			})
		}, this
	};
IASPagingExtension.prototype.initialize = function(a) {
	this.ias = a, jQuery.extend(a.listeners, this.listeners)
}, IASPagingExtension.prototype.bind = function(a) {
	try {
		a.on("prev", jQuery.proxy(this.onPrev, this), this.priority)
	} catch (b) {}
	a.on("next", jQuery.proxy(this.onNext, this), this.priority), a.on("scroll", jQuery.proxy(this.onScroll, this), this.priority)
}, IASPagingExtension.prototype.unbind = function(a) {
	try {
		a.off("prev", this.onPrev)
	} catch (b) {}
	a.off("next", this.onNext), a.off("scroll", this.onScroll)
}, IASPagingExtension.prototype.getCurrentPageNum = function(a) {
	for (var b = this.pagebreaks.length - 1; b > 0; b--) {
		if (a > this.pagebreaks[b][0]) {
			return b + 1
		}
	}
	return 1
}, IASPagingExtension.prototype.getCurrentPagebreak = function(a) {
	for (var b = this.pagebreaks.length - 1; b >= 0; b--) {
		if (a > this.pagebreaks[b][0]) {
			return this.pagebreaks[b]
		}
	}
	return null
}, IASPagingExtension.prototype.priority = 500;
var IASSpinnerExtension = function(a) {
		return a = jQuery.extend({}, this.defaults, a), this.ias = null, this.uid = (new Date).getTime(), this.src = a.src, this.html = a.html.replace("{src}", this.src), this.showSpinner = function() {
			var a = this.getSpinner() || this.createSpinner(),
				b = this.ias.getLastItem();
			b.after(a), jQuery("body").append(a), a.fadeIn()
		}, this.showSpinnerBefore = function() {
			var a = this.getSpinner() || this.createSpinner(),
				b = this.ias.getFirstItem();
			b.before(a), a.fadeIn()
		}, this.removeSpinner = function() {
			this.hasSpinner() && this.getSpinner().remove()
		}, this.getSpinner = function() {
			var a = jQuery("#ias_spinner_" + this.uid);
			return a.length > 0 ? a : !1
		}, this.hasSpinner = function() {
			var a = jQuery("#ias_spinner_" + this.uid);
			return a.length > 0
		}, this.createSpinner = function() {
			var a = jQuery(this.html).attr("id", "ias_spinner_" + this.uid);
			return a.hide(), a
		}, this
	};
IASSpinnerExtension.prototype.bind = function(a) {
	this.ias = a, a.on("next", jQuery.proxy(this.showSpinner, this)), a.on("render", jQuery.proxy(this.removeSpinner, this));
	try {
		a.on("prev", jQuery.proxy(this.showSpinnerBefore, this))
	} catch (b) {}
}, IASSpinnerExtension.prototype.unbind = function(a) {
	a.off("next", this.showSpinner), a.off("render", this.removeSpinner);
	try {
		a.off("prev", this.showSpinnerBefore)
	} catch (b) {}
}, IASSpinnerExtension.prototype.defaults = {
	src: " ",
	html: '<div class="app-loading"><div class="loading-bar"></div></div>'
};
var IASTriggerExtension = function(a) {
		return a = jQuery.extend({}, this.defaults, a), this.ias = null, this.html = a.html.replace("{text}", a.text), this.htmlPrev = a.htmlPrev.replace("{text}", a.textPrev), this.enabled = !0, this.count = 0, this.offset = a.offset, this.$triggerNext = null, this.$triggerPrev = null, this.showTriggerNext = function() {
			if (!this.enabled) {
				return !0
			}
			if (!1 === this.offset || ++this.count < this.offset) {
				return !0
			}
			var a = this.$triggerNext || (this.$triggerNext = this.createTrigger(this.next, this.html)),
				b = this.ias.getLastItem();
			return b.after(a), a.fadeIn(), !1
		}, this.showTriggerPrev = function() {
			if (!this.enabled) {
				return !0
			}
			var a = this.$triggerPrev || (this.$triggerPrev = this.createTrigger(this.prev, this.htmlPrev)),
				b = this.ias.getFirstItem();
			return b.before(a), a.fadeIn(), !1
		}, this.onRendered = function() {
			this.enabled = !0
		}, this.createTrigger = function(a, b) {
			var c, d = (new Date).getTime();
			return b = b || this.html, c = jQuery(b).attr("id", "ias_trigger_" + d), c.hide(), c.on("click", jQuery.proxy(a, this)), c
		}, this
	};
IASTriggerExtension.prototype.bind = function(a) {
	this.ias = a, a.on("next", jQuery.proxy(this.showTriggerNext, this), this.priority), a.on("rendered", jQuery.proxy(this.onRendered, this), this.priority);
	try {
		a.on("prev", jQuery.proxy(this.showTriggerPrev, this), this.priority)
	} catch (b) {}
}, IASTriggerExtension.prototype.unbind = function(a) {
	a.off("next", this.showTriggerNext), a.off("rendered", this.onRendered);
	try {
		a.off("prev", this.showTriggerPrev)
	} catch (b) {}
}, IASTriggerExtension.prototype.next = function() {
	this.enabled = !1, this.ias.pause(), this.$triggerNext && (this.$triggerNext.remove(), this.$triggerNext = null), this.ias.next()
}, IASTriggerExtension.prototype.prev = function() {
	this.enabled = !1, this.ias.pause(), this.$triggerPrev && (this.$triggerPrev.remove(), this.$triggerPrev = null), this.ias.prev()
}, IASTriggerExtension.prototype.defaults = {
	text: "Load more items",
	html: '<div class="ias-trigger ias-trigger-next" style="text-align: center; cursor: pointer;"><a>{text}</a></div>',
	textPrev: "Load previous items",
	htmlPrev: '<div class="ias-trigger ias-trigger-prev" style="text-align: center; cursor: pointer;"><a>{text}</a></div>',
	offset: 0
}, IASTriggerExtension.prototype.priority = 1000;
(function($, sr) {
	var debounce = function(func, threshold, execAsap) {
			var timeout;
			return function debounced() {
				var obj = this,
					args = arguments;

				function delayed() {
					if (!execAsap) {
						func.apply(obj, args)
					}
					timeout = null
				}
				if (timeout) {
					clearTimeout(timeout)
				} else {
					if (execAsap) {
						func.apply(obj, args)
					}
				}
				timeout = setTimeout(delayed, threshold || 100)
			}
		};
	jQuery.fn[sr] = function(fn) {
		return fn ? this.bind("resize", debounce(fn)) : this.trigger(sr)
	}
})(jQuery, "smartresize");

function whichTransitionEvent() {
	var t, el = document.createElement("fakeelement");
	var transitions = {
		"transition": "transitionend",
		"OTransition": "oTransitionEnd",
		"MozTransition": "transitionend",
		"WebkitTransition": "webkitTransitionEnd"
	};
	for (t in transitions) {
		if (el.style[t] !== undefined) {
			return transitions[t]
		}
	}
}
var customTransitionEnd = whichTransitionEvent();
(function($) {
	var fbCount = 0;
	$.fn.fluidbox = function(opts) {
		var settings = $.extend(true, {
			viewportFill: 0.95,
			debounceResize: true,
			stackIndex: 1000,
			stackIndexDelta: 10,
			closeTrigger: [{
				selector: ".fluidbox-overlay",
				event: "click"
			}, {
				selector: "document",
				event: "keyup",
				keyCode: 27
			}],
			immediateOpen: false,
			loadingEle: true
		}, opts);
		var keyboardEvents = ["keyup", "keydown", "keypress"];
		if (settings.stackIndex < settings.stackIndexDelta) {
			settings.stackIndexDelta = settings.stackIndex
		}
		$fbOverlay = $("<div />", {
			"class": "fluidbox-overlay",
			css: {
				"z-index": settings.stackIndex
			}
		});
		var $fb = this,
			$w = $(window),
			vpRatio, funcCloseFb = function(selector) {
				$(selector + ".fluidbox-opened").trigger("click")
			},
			funcPositionFb = function($activeFb, customEvents) {
				var $img = $activeFb.find("img").first(),
					$ghost = $activeFb.find(".fluidbox-ghost"),
					$loader = $activeFb.find(".fluidbox-loader"),
					$wrap = $activeFb.find(".fluidbox-wrap"),
					$data = $activeFb.data(),
					fHeight = 0,
					fWidth = 0;
				$img.data().imgRatio = $data.natWidth / $data.natHeight;
				if (vpRatio > $img.data().imgRatio) {
					if ($data.natHeight < $w.height() * settings.viewportFill) {
						fHeight = $data.natHeight
					} else {
						fHeight = $w.height() * settings.viewportFill
					}
					$data.imgScale = fHeight / $img.height();
					$data.imgScaleY = $data.imgScale;
					$data.imgScaleX = $data.natWidth * (($img.height() * $data.imgScaleY) / $data.natHeight) / $img.width()
				} else {
					if ($data.natWidth < $w.width() * settings.viewportFill) {
						fWidth = $data.natWidth
					} else {
						fWidth = $w.width() * settings.viewportFill
					}
					$data.imgScale = fWidth / $img.width();
					$data.imgScaleX = $data.imgScale;
					$data.imgScaleY = $data.natHeight * (($img.width() * $data.imgScaleX) / $data.natWidth) / $img.height()
				}
				var offsetY = $w.scrollTop() - $img.offset().top + 0.5 * ($img.data("imgHeight") * ($img.data("imgScale") - 1)) + 0.5 * ($w.height() - $img.data("imgHeight") * $img.data("imgScale")),
					offsetX = 0.5 * ($img.data("imgWidth") * ($img.data("imgScale") - 1)) + 0.5 * ($w.width() - $img.data("imgWidth") * $img.data("imgScale")) - $img.offset().left,
					scale = parseInt($data.imgScaleX * 1000) / 1000 + "," + parseInt($data.imgScaleY * 1000) / 1000;
				$ghost.add($loader).css({
					"transform": "translate(" + parseInt(offsetX * 10) / 10 + "px," + parseInt(offsetY * 10) / 10 + "px) scale(" + scale + ")",
					top: $img.offset().top - $wrap.offset().top,
					left: $img.offset().left - $wrap.offset().left
				});
				$ghost.one(customTransitionEnd, function() {
					$.each(customEvents, function(i, customEvent) {
						$activeFb.trigger(customEvent)
					})
				})
			},
			funcCalc = function($fbItem) {
				vpRatio = $w.width() / $w.height();
				if ($fbItem.hasClass("fluidbox")) {
					var $img = $fbItem.find("img").first(),
						$ghost = $fbItem.find(".fluidbox-ghost"),
						$loader = $fbItem.find(".fluidbox-loader"),
						$wrap = $fbItem.find(".fluidbox-wrap"),
						data = $img.data();

					function imageProp() {
						data.imgWidth = $img.width();
						data.imgHeight = $img.height();
						data.imgRatio = $img.width() / $img.height();
						$ghost.add($loader).css({
							width: $img.width(),
							height: $img.height(),
							top: $img.offset().top - $wrap.offset().top + parseInt($img.css("borderTopWidth")) + parseInt($img.css("paddingTop")),
							left: $img.offset().left - $wrap.offset().left + parseInt($img.css("borderLeftWidth")) + parseInt($img.css("paddingLeft"))
						});
						if (vpRatio > data.imgRatio) {
							data.imgScale = $w.height() * settings.viewportFill / $img.height()
						} else {
							data.imgScale = $w.width() * settings.viewportFill / $img.width()
						}
					}
					imageProp();
					$img.load(imageProp)
				}
			},
			fbClickHandler = function(e) {
				if ($(this).hasClass("fluidbox")) {
					var $activeFb = $(this),
						$img = $(this).find("img").first(),
						$ghost = $(this).find(".fluidbox-ghost"),
						$loader = $(this).find(".fluidbox-loader"),
						$wrap = $(this).find(".fluidbox-wrap"),
						linkedImg = encodeURI($activeFb.attr("href")),
						timer = {};
					var fbOpen = function() {
							$activeFb.trigger("openstart");
							$activeFb.append('<div class="fluidbox-overlay" style="z-index: 1000; opacity: 1;"></div>').data("fluidbox-state", 1).removeClass("fluidbox-closed").addClass("fluidbox-opened");
							$(".rightbar").after('<div class="fluidbox-overlay" style="z-index: 0; opacity: 1;"></div>');
							$(".header").addClass("slide--up");
							$(".header").removeClass("slide--reset");
							if (timer["close"]) {
								window.clearTimeout(timer["close"])
							}
							timer["open"] = window.setTimeout(function() {
								$(".fluidbox-overlay").css({
									opacity: 1
								})
							}, 100);
							$(".fluidbox-wrap").css({
								zIndex: settings.stackIndex - settings.stackIndexDelta - 1
							});
							$wrap.css({
								"z-index": settings.stackIndex + settings.stackIndexDelta
							})
						},
						fbClose = function() {
							$activeFb.trigger("closestart");
							$activeFb.data("fluidbox-state", 0).removeClass("fluidbox-opened fluidbox-loaded fluidbox-loading").addClass("fluidbox-closed");
							if (timer["open"]) {
								window.clearTimeout(timer["open"])
							}
							timer["close"] = window.setTimeout(function() {
								$(".fluidbox-overlay").remove();
								$(".header").addClass("slide--reset");
								$(".header").removeClass("slide--up");
								$wrap.css({
									"z-index": settings.stackIndex - settings.stackIndexDelta
								})
							}, 10);
							$(".fluidbox-overlay").css({
								opacity: 0
							});
							$ghost.add($loader).css({
								"transform": "translate(0,0) scale(1,1)",
								opacity: 0,
								top: $img.offset().top - $wrap.offset().top + parseInt($img.css("borderTopWidth")) + parseInt($img.css("paddingTop")),
								left: $img.offset().left - $wrap.offset().left + parseInt($img.css("borderLeftWidth")) + parseInt($img.css("paddingLeft"))
							});
							$ghost.one(customTransitionEnd, function() {
								$activeFb.trigger("closeend")
							});
							$img.css({
								opacity: 1
							})
						};
					if ($(this).data("fluidbox-state") === 0 || !$(this).data("fluidbox-state")) {
						$activeFb.addClass("fluidbox-loading");
						$img.css({
							opacity: 0
						});
						$ghost.css({
							"background-image": "url(" + $img.attr("src") + ")",
							opacity: 1
						});
						if (settings.immediateOpen) {
							$activeFb.data("natWidth", $img[0].naturalWidth).data("natHeight", $img[0].naturalHeight);
							fbOpen();
							funcPositionFb($activeFb, ["openend"]);
							$("<img />", {
								src: linkedImg
							}).load(function() {
								$activeFb.trigger("imageloaddone").trigger("delayedloaddone").removeClass("fluidbox-loading").addClass("fluidbox-loaded").data("natWidth", $(this)[0].naturalWidth).data("natHeight", $(this)[0].naturalHeight);
								$ghost.css({
									"background-image": "url(" + linkedImg + ")"
								});
								funcPositionFb($activeFb, ["delayedreposdone"])
							}).error(function() {
								$activeFb.trigger("imageloadfail");
								fbClose()
							})
						} else {
							$("<img />", {
								src: linkedImg
							}).load(function() {
								$activeFb.trigger("imageloaddone").removeClass("fluidbox-loading").addClass("fluidbox-loaded").data("natWidth", $(this)[0].naturalWidth).data("natHeight", $(this)[0].naturalHeight);
								settings.immediateOpen = true;
								$ghost.css({
									"background-image": "url(" + linkedImg + ")"
								});
								fbOpen();
								funcPositionFb($activeFb, ["openend"])
							}).error(function() {
								$activeFb.trigger("imageloadfail");
								fbClose()
							})
						}
					} else {
						fbClose()
					}
					e.preventDefault()
				}
			};
		var funcResize = function(selectorChoice) {
				if (!selectorChoice) {
					$fb.each(function() {
						funcCalc($(this))
					})
				} else {
					funcCalc(selectorChoice)
				}
				var $activeFb = $("a.fluidbox.fluidbox-opened");
				if ($activeFb.length > 0) {
					funcPositionFb($activeFb, ["resizeend"])
				}
			};
		if (settings.debounceResize) {
			$(window).smartresize(function() {
				funcResize()
			})
		} else {
			$(window).resize(function() {
				funcResize()
			})
		}
		$fb.each(function(i) {
			if ($(this).is("a") && $(this).children().length === 1 && $(this).children().is("img") && $(this).css("display") !== "none" && $(this).parents().css("display") !== "none") {
				var $fbInnerWrap = $("<div />", {
					"class": "fluidbox-wrap",
					css: {
						"z-index": settings.stackIndex - settings.stackIndexDelta
					}
				});
				var $fbLoader = $("<div />", {
					"class": "fluidbox-loader"
				});
				fbCount += 1;
				var $fbItem = $(this);
				$fbItem.addClass("fluidbox fluidbox-closed").attr("id", "fluidbox-" + fbCount).wrapInner($fbInnerWrap).find("img").first().css({
					opacity: 1
				}).after('<div class="fluidbox-ghost" />').each(function() {
					var $img = $(this);
					if ($img.width() > 0 && $img.height() > 0) {
						funcCalc($fbItem);
						$fbItem.click(fbClickHandler)
					} else {
						$img.load(function() {
							funcCalc($fbItem);
							$fbItem.click(fbClickHandler);
							$fbItem.trigger("thumbloaddone")
						}).error(function() {
							$fbItem.trigger("thumbloadfail")
						})
					}
				});
				if (settings.loadingEle) {
					$fbItem.find(".fluidbox-ghost").after($fbLoader)
				}
				$(this).on("recompute", function() {
					funcResize($(this));
					$(this).trigger("recomputeend")
				});
				var selector = "#fluidbox-" + fbCount;
				if (settings.closeTrigger) {
					$.each(settings.closeTrigger, function(i) {
						var trigger = settings.closeTrigger[i];
						if (trigger.selector != "window") {
							if (trigger.selector == "document") {
								if (trigger.keyCode && keyboardEvents.indexOf(trigger.event) > -1) {
									$(document).on(trigger.event, function(e) {
										if (e.keyCode == trigger.keyCode) {
											funcCloseFb(selector)
										}
									})
								} else {
									$(document).on(trigger.event, selector, function() {
										funcCloseFb(selector)
									})
								}
							}
						} else {
							$w.on(trigger.event, function() {
								funcCloseFb(selector)
							})
						}
					})
				}
			}
		});
		return $fb
	}
})(jQuery);
(function(factory) {
	if (typeof define === "function" && define.amd) {
		define(["jquery"], factory)
	} else {
		if (typeof exports === "object") {
			module.exports = factory(require("jquery"))
		} else {
			factory(jQuery)
		}
	}
}(function($) {
	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s)
	}
	function decode(s) {
		return config.raw ? s : decodeURIComponent(s)
	}
	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value))
	}
	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")
		}
		try {
			s = decodeURIComponent(s.replace(pluses, " "));
			return config.json ? JSON.parse(s) : s
		} catch (e) {}
	}
	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value
	}
	var config = $.cookie = function(key, value, options) {
			if (arguments.length > 1 && !$.isFunction(value)) {
				options = $.extend({}, config.defaults, options);
				if (typeof options.expires === "number") {
					var days = options.expires,
						t = options.expires = new Date();
					t.setMilliseconds(t.getMilliseconds() + days * 86400000)
				}
				return (document.cookie = [encode(key), "=", stringifyCookieValue(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : ""].join(""))
			}
			var result = key ? undefined : {},
				cookies = document.cookie ? document.cookie.split("; ") : [],
				i = 0,
				l = cookies.length;
			for (; i < l; i++) {
				var parts = cookies[i].split("="),
					name = decode(parts.shift()),
					cookie = parts.join("=");
				if (key === name) {
					result = read(cookie, value);
					break
				}
				if (!key && (cookie = read(cookie)) !== undefined) {
					result[name] = cookie
				}
			}
			return result
		};
	config.defaults = {};
	$.removeCookie = function(key, options) {
		$.cookie(key, "", $.extend({}, options, {
			expires: -1
		}));
		return !$.cookie(key)
	}
}));
!
function(t, e) {
	"function" == typeof define && define.amd ? define(function() {
		return e(t)
	}) : "object" == typeof exports ? module.exports = e : t.echo = e(t)
}(this, function(t) {
	var e, n, o, r, c, a = {},
		u = function() {},
		d = function(t) {
			return null === t.offsetParent
		},
		i = function(t, e) {
			if (d(t)) {
				return !1
			}
			var n = t.getBoundingClientRect();
			return n.right >= e.l && n.bottom >= e.t && n.left <= e.r && n.top <= e.b
		},
		l = function() {
			(r || !n) && (clearTimeout(n), n = setTimeout(function() {
				a.render(), n = null
			}, o))
		};
	return a.init = function(n) {
		n = n || {};
		var d = n.offset || 0,
			i = n.offsetVertical || d,
			f = n.offsetHorizontal || d,
			s = function(t, e) {
				return parseInt(t || e, 10)
			};
		e = {
			t: s(n.offsetTop, i),
			b: s(n.offsetBottom, i),
			l: s(n.offsetLeft, f),
			r: s(n.offsetRight, f)
		}, o = s(n.throttle, 250), r = n.debounce !== !1, c = !! n.unload, u = n.callback || u, a.render(), document.addEventListener ? (t.addEventListener("scroll", l, !1), t.addEventListener("load", l, !1)) : (t.attachEvent("onscroll", l), t.attachEvent("onload", l))
	}, a.render = function() {
		for (var n, o, r = document.querySelectorAll("img[data-echo], [data-echo-background]"), d = r.length, l = {
			l: 0 - e.l,
			t: 0 - e.t,
			b: (t.innerHeight || document.documentElement.clientHeight) + e.b,
			r: (t.innerWidth || document.documentElement.clientWidth) + e.r
		}, f = 0; d > f; f++) {
			o = r[f], i(o, l) ? (c && o.setAttribute("data-echo-placeholder", o.src), null !== o.getAttribute("data-echo-background") ? o.style.backgroundImage = "url(" + o.getAttribute("data-echo-background") + ")" : o.src = o.getAttribute("data-echo"), c || (o.removeAttribute("data-echo"), o.removeAttribute("data-echo-background")), u(o, "load")) : c && (n = o.getAttribute("data-echo-placeholder")) && (null !== o.getAttribute("data-echo-background") ? o.style.backgroundImage = "url(" + n + ")" : o.src = n, o.removeAttribute("data-echo-placeholder"), u(o, "unload"))
		}
		d || a.detach()
	}, a.detach = function() {
		document.removeEventListener ? t.removeEventListener("scroll", l) : t.detachEvent("onscroll", l), clearTimeout(n)
	}, a
});

(function(window, document, $){
	function extend(target, source) {
		for (var prop in source) {
			target[prop] = (typeof source[prop] === 'object') ? extend(target[prop], source[prop]) : source[prop];
		}
		return target;
	}

	window.MouseTooltip = {
		init: function(opts) {
			self.opts = extend({
				cssTransforms: false,
				tooltipOffset: { x: 10, y: 10 },
				tooltipClass: 'mouse-tooltip',
				tooltipId: 'mouse-tooltip',
				contentAttr: 'data-tooltip',
				contentClass: 'with-tooltip',
				mouseActionsHandler: self.onMouseAction
			}, opts || {});

			$('#' + self.opts.tooltipId).remove();
			self.$tooltip = $('body').append('<div id="' + self.opts.tooltipId + '" class="' + self.opts.tooltipClass + '"></div>').find('#' + self.opts.tooltipId).first();
			self.hide();

			if (self.opts.mouseActionsHandler)
				$('body').on('mouseover click mouseout', '.' + self.opts.contentClass, self.opts.mouseActionsHandler);
		},
		content: function(html) {
			self.$tooltip.html(html);
		},
		show: function(html) {
			self.content(html);
			self.$tooltip.removeClass(self.opts.tooltipClass + '--hidden');
			$(document).on('mousemove.tooltip', self._stickToMouse);
		},
		hide: function() {
			self.$tooltip.addClass(self.opts.tooltipClass + '--hidden');
			$(document).off('mousemove.tooltip');
		},
		_stickToMouse: function(e) {
			xOffset = self.opts.tooltipOffset.x;
			yOffset = self.opts.tooltipOffset.y;
			var win = $(window),
				ttWidth = self.$tooltip.outerWidth(),
				ttHeight = self.$tooltip.outerHeight(),
				mouseX = e.pageX,
				mouseY = e.pageY,
				ttLeft = mouseX,
				ttTop = mouseY;
			if ((mouseX + ttWidth + xOffset) > win.width()) {
				ttLeft = mouseX - ttWidth;
				xOffset = xOffset * -1;
			}
			if ((mouseY + ttHeight + yOffset) > win.height()) {
				ttTop = mouseY - ttHeight;
				yOffset = yOffset * -1;
			}
			ttLeft = ttLeft + xOffset + "px";
			ttTop = ttTop + yOffset + "px";
			var pos = {};
			if (self.opts.cssTransforms && window.Modernizr !== undefined && (Modernizr.csstransforms3d || Modernizr.csstransforms)) {
				pos[Modernizr.prefixed('transform')] = "translateX(" + ttLeft + ") translateY(" + ttTop + ")";
				pos['transform'] = "translateX(" + ttLeft + ") translateY(" + ttTop + ")";
				if (Modernizr.csstransforms3d) {
					pos[Modernizr.prefixed('transform')] += " translateZ(0)";
					pos['transform'] += " translateZ(0)";
				}
			} else
				pos = { left: ttLeft, top: ttTop };
			self.$tooltip.css(pos);
		},
		onMouseAction: function(e) {
			$target = $(e.currentTarget);
			var content = $target.attr(self.opts.contentAttr) || $target.find('[' + self.opts.contentAttr + ']').attr(self.opts.contentAttr);
			if (e.type == "mouseover")
				self.show( content );
			else if (e.type == "click")
				self.content( content );
			else
				self.hide();
		}
	};
	var self = window.MouseTooltip;
})(window, document, jQuery);
/* @license minigrid v1.6.1 - minimal cascading grid layout http://alves.im/minigrid */
!function(t){"use strict";function e(t,e,n,o,r){var i=Array.prototype.forEach,f=t instanceof Node?t:document.querySelector(t);if(!f)return!1;var s=f.querySelectorAll(e);if(0===s.length)return!1;n="number"==typeof n&&isFinite(n)&&Math.floor(n)===n?n:6,f.style.width="";var u=f.getBoundingClientRect().width,l=s[0].getBoundingClientRect().width+n,a=Math.max(Math.floor((u-n)/l),1),c=0;u=l*a+n+"px",f.style.width=u,f.style.position="relative";for(var d=[],p=[],h=0;a>h;h++)p.push(h*l+n),d.push(n);i.call(s,function(t){var e=d.slice(0).sort(function(t,e){return t-e}).shift();e=d.indexOf(e);var r=p[e],f=d[e],s=["webkitTransform","MozTransform","msTransform","OTransform","transform"];return t.style.position="absolute",o||i.call(s,function(e){t.style[e]="translate3D("+r+"px,"+f+"px,0)"}),d[e]+=t.getBoundingClientRect().height+n,c+=1,o?o(t,r,f,c):void 0});var m=d.slice(0).sort(function(t,e){return t-e}).pop();f.style.height=m+"px","function"==typeof r&&r(s)}"function"==typeof define&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?module.exports=e:t.minigrid=e}(this);
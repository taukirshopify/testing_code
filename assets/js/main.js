

(function ($) {

  var $status = $('.pagingInfo');
  var $slickElement = $('.hero-main-image');
  
  $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
    if(!slick.$dots){
      return;
    }
    
    var i = (currentSlide ? currentSlide : 0) + 1;
    $status.text(i + '/' + (slick.$dots[0].children.length));
  });
  $(".hero-main-image").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    lazyLoad: 'ondemand',
    arrows: true,
    infinite: false,
    fade: true,
    
    autoplay: true,
		  autoplaySpeed:5000,
        fade: false,
    asNavFor: ".side-image",
    nextArrow: '<div class="slick-custom-arrow slick-custom-arrow-right"><div class="center-div-slide"><img src="http://www.paulhaynes.com/common_images/arrow_hotspot_right.png" alt=""></div></div>',
    prevArrow: '<div class="slick-custom-arrow slick-custom-arrow-left"> <div class="center-div-slide-right"><img src="http://www.paulhaynes.com/common_images/arrow_hotspot_left.png" alt="arrowleft"></div></div>',
  });
  $(".side-image").slick({
    lazyLoad: 'ondemand',
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    Autoplay: true,
    asNavFor: ".hero-main-image",
    focusOnSelect: true,
    variableWidth: true,
  });
  $('.slide-next').click(function(e){
    //e.preventDefault(); 
    $('.hero-main-image').slick('slickNext');
    } );
  $('.slide-prev').click(function(e){ 
    //e.preventDefault(); 

$('.hero-main-image').slick('slickPrev');
} );



$('.pause').click(function() {

  
  // this.removeClass("pause");
  $('.hero-main-image').slick('slickPause');

  
});
$('.play').click(function() {
  $('.hero-main-image').slick('slickPlay');
  $('.hero-main-image').slick('slickNext');
  
});
$('.auto-play-silde').click(function() {
  $('.pause').toggleClass("mainaa");
  $('.play').toggleClass("mainaa");
});

// $(window).resize(function(){
// $('.right-imag-slider-wrapper').slick({
//   lazyLoad: 'ondemand',
//   slidesToShow: 1,
//   arrows: false,
//   autoplay: true,
//   autoplaySpeed: 3000,
//   fade: true,
//   cssEase: 'linear',
//   slidesToScroll: 1,
//   responsive: [
//     {
//       breakpoint: 700,
//       settings: {
//         slidesToShow: 1,
//         arrows: false,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         cssEase: 'linear',
//         fade: true,
//         slidesToScroll: 1
//       }
//     },
//     {
//       breakpoint: 100,
//       settings: "unslick"
//     }
//  ]
// });
// });



$slickGreen = false;
function greenSlider(){    
    if($(window).width() > 801){
        if(!$slickGreen){
          $('.right-imag-slider-wrapper').slick({
            lazyLoad: 'ondemand',
            slidesToShow: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 3000,
            fade: true,
            cssEase: 'linear',
            slidesToScroll: 1
          });
            $slickGreen = true;
        }
    } else if($(window).width() < 800){
        if($slickGreen){
          $('.right-imag-slider-wrapper').slick('unslick');
            $slickGreen = false;
        }
    }
};

$(document).ready(function(){

    greenSlider();
});
$(window).on('resize', function(){
 
     greenSlider();
});


})(jQuery);





(function() {
	const e = document.createElement("link").relList;
	if (e && e.supports && e.supports("modulepreload")) return;
	for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
	new MutationObserver(o => {
		for (const i of o)
			if (i.type === "childList")
				for (const c of i.addedNodes) c.tagName === "LINK" && c.rel === "modulepreload" && r(c)
	}).observe(document, {
		childList: !0,
		subtree: !0
	});

	function t(o) {
		const i = {};
		return o.integrity && (i.integrity = o.integrity), o.referrerpolicy && (i.referrerPolicy = o.referrerpolicy), o.crossorigin === "use-credentials" ? i.credentials = "include" : o.crossorigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i
	}

	function r(o) {
		if (o.ep) return;
		o.ep = !0;
		const i = t(o);
		fetch(o.href, i)
	}
})();
const St = "/cart.json",
	bt = "/cart/add.js",
	vt = "/cart/change.js",
	k = {},
	we = {
		cart: {}
	},
	wt = function(e, t) {
		k[e] = t
	},
	At = function(e) {
		e in k && delete k[e]
	},
	Ct = function(e) {
		Object.keys(k).forEach(t => {
			k[t](e)
		})
	},
	Tt = function() {
		return we.cart
	},
	Ae = function(e) {
		we.cart = e, Ct(e)
	},
	Lt = function() {},
	Z = function() {
		return window.fetch(St, {
			headers: {
				"Cache-Control": "no-store",
				Pragma: "no-cache"
			}
		}).then(e => {
			if (!e.ok) throw new Error("Cart fetch error", e.status);
			return e.json()
		}).then(Ae).catch(console.error)
	},
	Ot = function(e = {}, t = !0) {
		const r = e.quantity || 1;
		return e.id ? window.fetch(bt, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				items: [{
					...e,
					quantity: r
				}]
			})
		}).then(o => {
			if (!o.ok) throw new Error("Cart add error", o.status);
			return o.json()
		}).then(() => {
			Lt(e.id), t && Z()
		}).catch(console.error) : new Promise((o, i) => {
			i(new Error("ID missing"))
		})
	},
	Ce = function(e = {}, t = !0) {
		const {
			line: r,
			id: o = 0,
			quantity: i = 1
		} = e;
		return window.fetch(vt, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				...o ? {
					id: o
				} : {},
				...r ? {
					line: r
				} : {},
				quantity: i
			})
		}).then(c => {
			if (!c.ok) throw new Error("Cart update error", c.status);
			return c.json()
		}).then(c => {
			t && Ae(c)
		}).catch(console.error)
	},
	kt = function(e = {}, t = !0) {
		return Ce({
			...e,
			quantity: 0
		}, t)
	};
Z();
const b = {
	add: Ot,
	addCallback: wt,
	fetch: Z,
	getState: Tt,
	remove: kt,
	removeCallback: At,
	update: Ce
};
const qt = "/?section_id=cart-drawer",
	se = {
		isCartOpen: !1
	},
	x = function() {
		I({
			isCartOpen: !1
		}), document.removeEventListener("click", x)
	},
	$t = function(e) {
		document.body.classList[e ? "add" : "remove"]("state--cart-open"), e ? (document.querySelector(".js-cart button").focus({
			preventScroll: !0
		}), document.addEventListener("click", x)) : (document.querySelector(".js-cartOpen").focus({
			preventScroll: !0
		}), document.removeEventListener("click", x))
	},
	I = function(e = {}) {
		"isCartOpen" in e && (se.isCartOpen = e.isCartOpen, $t(se.isCartOpen))
	},
	It = function(e) {
		e.preventDefault(), e.stopPropagation(), I({
			isCartOpen: !0
		})
	},
	Rt = function() {
		I({
			isCartOpen: !0
		})
	},
	_t = function(e) {
		e.preventDefault(), I({
			isCartOpen: !1
		})
	},
	jt = function(e) {
		const r = e.currentTarget.getAttribute("data-line");
		b.remove({
			line: r
		})
	},
	Mt = function(e) {
		const t = e.currentTarget,
			r = t.getAttribute("data-line"),
			o = t.options[t.selectedIndex].value,
			i = 1 * (t.getAttribute("data-qty") || 1);
		b.remove({
			line: r
		}, !1).then(() => b.add({
			id: o,
			quantity: i
		}))
	},
	z = function(e) {
		const {
			isUnbinding: t
		} = e || {}, r = t ? "removeEventListener" : "addEventListener";
		document.querySelectorAll(".js-cartClose").forEach(o => {
			o[r]("click", _t)
		}), document.querySelectorAll(".js-cartOpen").forEach(o => {
			o[r]("click", It)
		}), document.querySelectorAll(".js-cartRemove").forEach(o => {
			o[r]("click", jt)
		}), document.querySelectorAll(".js-cartReplace").forEach(o => {
			o[r]("change", Mt)
		}), document.querySelector(".js-cart").addEventListener("click", o => o.stopPropagation())
	},
	Pt = function(e) {
		z({
			isUnbinding: !0
		});
		let t = document.createElement("div");
		t.innerHTML = e, document.querySelector(".js-cart").innerHTML = t.querySelector(".js-cart").innerHTML, z(), t.innerHTML = "", t = null
	},
	Dt = function() {
		window.fetch(qt).then(e => {
			if (!e.ok) throw new Error("Cart drawer PJAX error: ", e.status);
			return e.text()
		}).then(Pt).catch(console.error)
	},
	Nt = function() {
		const t = (b.getState() || {}).item_count || "";
		document.querySelector(".js-cartCount").innerHTML = t
	},
	Ht = function() {
		z(), window.location.search.indexOf("cart=open") !== -1 && I({
			isCartOpen: !0
		})
	};
b.addCallback("cartDrawer", Dt);
b.addCallback("cartCount", Nt);
const Te = {
	init: Ht,
	open: Rt
};
const S = {
		previouslyActiveElement: void 0,
		target: void 0
	},
	J = function(e) {
		const t = document.getElementById(e);
		!t || (t.setAttribute("aria-hidden", "true"), (S.previouslyActiveElement || document.querySelector("a, button, p, h1")).focus(), S.previouslyActiveElement = void 0, S.target = void 0)
	},
	Bt = function({
		target: e
	}) {
		const t = document.getElementById(e);
		S.previouslyActiveElement = document.activeElement, S.target = e, t && (t.setAttribute("aria-hidden", "false"), t.querySelector("p, input, button").focus())
	},
	le = function(e) {
		e.preventDefault();
		const t = e.currentTarget.getAttribute("aria-controls");
		J(t)
	},
	xt = function() {
		S.target && J(S.target)
	},
	zt = function() {
		document.querySelectorAll(".js-modalClose").forEach(e => {
			e.removeEventListener("click", le), e.addEventListener("click", le)
		})
	},
	Le = {
		close: J,
		destroy: xt,
		init: zt,
		open: Bt
	},
	O = function(e) {
		e.currentTarget.classList.remove("is-loading")
	},
	Ft = function() {
		const e = document.querySelectorAll(".is-loading");
		[].forEach.call(e, t => {
			t.removeEventListener("load", O), t.removeEventListener("error", O), t.complete && setTimeout(() => O({
				currentTarget: t
			})), t.addEventListener("load", O), t.addEventListener("error", O)
		})
	},
	v = {
		init: Ft
	};

function Ut(n) {
	return n.replace(/\W+/g, "-").replace(/([a-z\d])([A-Z])/g, "$1-$2").toLowerCase()
}
window.requestAnimFrame = (() => window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || !1)();
const Wt = ".js-scroll",
	q = {
		isDisabled: !1,
		resizeTimeout: null
	};
let F = [],
	y, Oe, ke, X, Q = !1,
	R = !1,
	B = 0;
const U = {},
	W = {};

function ee() {
	X = document.querySelectorAll(Wt)
}

function Gt(n, e, t = !1) {
	t ? W[n] = e : U[n] = e
}

function Vt(n) {
	const e = n.getBoundingClientRect(),
		t = window.scrollY || window.pageYOffset,
		r = n.getAttribute("data-callback") || !1,
		o = n.getAttribute("data-no-states") !== "true";
	return {
		el: n,
		callback: r,
		canRender: o,
		top: e.top + t,
		left: e.left,
		height: n.offsetHeight
	}
}

function D() {
	F = Array.prototype.map.call(X, Vt) || []
}

function Yt() {
	ee(), D()
}

function ae(n, e = !1) {
	let t = n;
	return n.callback && (e && n.callback in W ? t = W[n.callback](n, y) || t : n.callback in U && (t = U[n.callback](n, y) || t)), t
}

function ue(n, e, t) {
	Object.keys(e).forEach(r => {
		const o = e[r],
			i = Ut(r);
		t ? o !== n.states[r] && (o ? n.el.classList.add(i) : n.el.classList.remove(i)) : o ? n.el.classList.add(i) : n.el.classList.remove(i)
	})
}

function Kt(n) {
	let e = n;
	const t = {};
	return t.isInView && (e = ae(e) || e), e.canRender && (e.states ? ue(e, t, e.states) : ue(e, t)), e = ae(e, !0) || e, e.states = t, e
}

function Zt() {
	B > y && !R && y > 0 ? (document.body.classList.add("scrolling-up"), R = !0) : B < y && R && (document.body.classList.remove("scrolling-up"), R = !1), B = y
}

function Jt() {
	return q.isDisabled ? !1 : (y = window.scrollY || window.pageYOffset, F = F.map(Kt), Zt(), !0)
}

function qe() {
	return Q ? (Jt(), window.requestAnimFrame(qe), !0) : !1
}

function $e() {
	Oe = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, ke = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
}

function Xt() {
	$e(), D()
}

function Ie() {
	clearTimeout(q.resizeTimeout), q.resizeTimeout = setTimeout(() => {
		window.requestAnimFrame(Xt)
	}, 100)
}

function Qt() {
	Q = !0, ee(), $e(), D(), qe(), window.addEventListener("resize", Ie)
}

function en() {
	Q = !1, window.removeEventListener("resize", Ie), X = null
}

function tn() {
	return Oe
}

function nn() {
	return ke
}

function on() {
	return y
}

function rn() {
	q.isDisabled = !0
}

function cn() {
	q.isDisabled = !1
}
const L = {
		addCallback: Gt,
		buildCache: D,
		destroy: en,
		disable: rn,
		enable: cn,
		indexElements: ee,
		init: Qt,
		getScrollY: on,
		getWindowHeight: tn,
		getWindowWidth: nn,
		rebuildCache: Yt
	},
	Re = function(e) {
		const t = e.getAttribute("data-src"),
			r = e.getAttribute("data-srcset");
		!t && !r || (t && (e.classList.add("is-loading"), e.setAttribute("src", t), e.removeAttribute("data-src")), r && (e.setAttribute("srcSet", r), e.removeAttribute("data-srcSet")))
	},
	sn = function(e = {}, t) {
		!(window.Shopify && window.Shopify.designMode) && (e.lazyLoaded || t < e.top - L.getWindowHeight()) || (e.el.querySelectorAll("[data-src], [data-srcset]").forEach(Re), v.init(), e.lazyLoaded = !0, window.Shopify && window.Shopify.designMode) || e.el.removeAttribute("data-callback")
	},
	ln = function() {
		L.addCallback("lazy", sn, !0)
	},
	te = {
		init: ln,
		load: Re
	};
const an = function() {},
	un = function() {
		L.init(), v.init(), te.init()
	},
	dn = {
		destroy: an,
		init: un
	};
const fn = {};
const mn = function() {
		v.init(), te.init(), L.init()
	},
	pn = {
		init: mn
	},
	A = {
		controller: null
	},
	ne = function(e = "/") {
		return window.history.pushState({}, "", e), A.controller && A.controller.signal && A.controller.abort(), window.AbortController && (A.controller = new window.AbortController), window.fetch(e, {
			signal: A.controller && A.controller.signal
		}).then(t => {
			if (!t.ok) throw new Error("Router PJAX error: ", t.status);
			return t.text()
		}).catch(t => {
			console.error(t), window.location = e
		})
	};

function j() {
	const n = document.querySelector(".js-filter"),
		e = document.querySelectorAll(".js-filterToggle");
	n.setAttribute("aria-hidden", "true"), e.forEach(t => {
		t.setAttribute("aria-expanded", "false")
	}), window.removeEventListener("click", j), e[0].focus({
		preventScroll: !0
	})
}
const gn = function(e) {
		e.stopPropagation();
		const t = document.querySelector(".js-filter"),
			r = t.getAttribute("aria-hidden") === "false",
			o = document.querySelectorAll(".js-filterToggle");
		t.setAttribute("aria-hidden", r), o.forEach(i => {
			i.setAttribute("aria-expanded", !r)
		}), r ? window.removeEventListener("click", j) : (window.addEventListener("click", j), t.querySelector("input, a, button").focus({
			preventScroll: !0
		}))
	},
	yn = function(e) {
		e.stopPropagation()
	},
	_e = function(e) {
		return ne(e).then(t => {
			j(), M({
				isUnbinding: !0
			});
			const r = `<main ${t.split("<main ").pop().split("</main>")[0]}</main>`;
			let o = document.createElement("div");
			o.innerHTML = r, [".js-filter", ".js-filterActive", ".js-filterControls", ".js-filterResults"].forEach(i => {
				document.querySelector(i).innerHTML = o.querySelector(i).innerHTML
			}), o.innerHTML = "", o = null, M()
		})
	},
	En = function(e) {
		e.preventDefault();
		const t = new URLSearchParams(new window.FormData(e.currentTarget)).toString(),
			r = `${window.location.pathname}?${t}`;
		_e(r)
	},
	hn = function() {
		const e = window.location.pathname;
		_e(e)
	},
	M = function(e = {}) {
		if (!document.querySelector(".js-filter")) return;
		const {
			isUnbinding: t = !1
		} = e || {}, r = t ? "removeEventListener" : "addEventListener";
		document.querySelector(".js-filter")[r]("click", yn), document.querySelector(".js-filter")[r]("submit", En), document.querySelectorAll(".js-filterToggle").forEach(o => {
			o[r]("click", gn)
		}), document.querySelectorAll(".js-filterClear").forEach(o => {
			o[r]("click", hn)
		})
	},
	Sn = function() {
		M({
			isUnbinding: !0
		})
	},
	bn = function() {
		M()
	},
	vn = {
		destroy: Sn,
		init: bn
	};
const wn = "[data-address-country-select]",
	je = ".js-customerAddressEdit",
	Me = ".js-customerAddressCancel",
	Pe = ".js-customerAddressDelete",
	De = function(e) {
		window.confirm(e.currentTarget.getAttribute("data-confirm-message")) && window.Shopify.postLink(e.currentTarget.dataset.target, {
			parameters: {
				_method: "delete"
			}
		})
	},
	Ne = function(e) {
		const t = e.getAttribute("aria-expanded") === "true";
		e.setAttribute("aria-expanded", !t)
	},
	He = function({
		currentTarget: e
	}) {
		Ne(e);
		const t = e.getAttribute("aria-controls"),
			r = document.getElementById(t),
			o = r.getAttribute("aria-hidden") === "false";
		r.setAttribute("aria-hidden", o)
	},
	Be = function({
		currentTarget: e
	}) {
		Ne(e);
		const t = e.getAttribute("aria-controls");
		document.getElementById(t).setAttribute("aria-hidden", "true")
	},
	An = function() {
		document.querySelectorAll(Pe).forEach(e => {
			e.removeEventListener("click", De)
		}), document.querySelectorAll(je).forEach(e => {
			e.removeEventListener("click", He)
		}), document.querySelectorAll(Me).forEach(e => {
			e.removeEventListener("click", Be)
		})
	},
	Cn = function() {
		document.querySelectorAll(je).forEach(e => {
			e.addEventListener("click", He)
		}), document.querySelectorAll(Pe).forEach(e => {
			e.addEventListener("click", De)
		}), document.querySelectorAll(Me).forEach(e => {
			e.addEventListener("click", Be)
		}), new window.Shopify.CountryProvinceSelector("AddressCountryNew", "AddressProvinceNew", {
			hideElement: "AddressProvinceContainerNew"
		}), document.querySelectorAll(wn).forEach(e => {
			const {
				formId: t
			} = e.dataset;
			new window.Shopify.CountryProvinceSelector(`AddressCountry_${t}`, `AddressProvince_${t}`, {
				hideElement: `AddressProvinceContainer_${t}`
			})
		})
	},
	Tn = {
		destroy: An,
		init: Cn
	};
const oe = ".js-heroVideo",
	$ = ".js-playButton",
	de = ".js-hero",
	xe = function() {
		const e = document.querySelector(oe),
			t = document.querySelector($);
		e.play(), t.disabled = !0, e.addEventListener("click", () => {
			e.pause(), t.disabled = !1
		}), e.addEventListener("ended", () => {
			t.disabled = !1
		})
	},
	Ln = function() {
		window.scrollTo({
			behavior: "smooth",
			top: window.innerHeight - 45
		})
	},
	On = function() {
		document.querySelector(oe) && document.querySelector($) && document.querySelector($).removeEventListener("click", xe)
	},
	kn = function() {
		document.querySelector(oe) && document.querySelector($) && document.querySelector($).addEventListener("click", xe), document.querySelector(de) && document.querySelector(de).addEventListener("click", Ln)
	},
	ze = {
		destroy: On,
		init: kn
	};
const qn = function() {
		ze.destroy()
	},
	$n = function() {
		v.init(), ze.init()
	},
	In = {
		destroy: qn,
		init: $n
	};
const Rn = function() {
		v.init()
	},
	_n = {
		init: Rn
	};
const jn = {};
const re = "option-selector--open",
	fe = ".js-optionBtn",
	Mn = ".js-optionSelectorToggle",
	Pn = ".js-productOption",
	Dn = ".js-productOptionLabel",
	C = ".js-waitlistForm",
	Nn = {
		ESC: 27
	},
	ie = {
		activeTab: {
			buttonEl: null,
			controlledEl: null,
			optionSelector: null
		},
		isMobile: void 0,
		timeout: 0
	};
let m = {
	...ie
};
const N = function() {
		const {
			optionSelector: e,
			buttonEl: t,
			controlledEl: r
		} = m.activeTab;
		!(e && t && r) || (e.classList.remove(re), t.setAttribute("aria-expanded", !1), r.setAttribute("aria-hidden", !0), document.removeEventListener("click", ce), document.removeEventListener("keydown", Fe), m.activeTab = {
			...ie.activeTab
		})
	},
	ce = function(e) {
		const {
			optionSelector: t,
			buttonEl: r,
			controlledEl: o
		} = m.activeTab;
		!(t && r && o) || o.contains(e.target) || N()
	},
	Fe = function(e) {
		e.keyCode === Nn.ESC && (e.preventDefault(), N())
	},
	Hn = function() {
		const {
			optionSelector: e,
			buttonEl: t,
			controlledEl: r
		} = m.activeTab;
		!(e && t && r) || (t.setAttribute("aria-expanded", !0), r.removeAttribute("aria-hidden"), r.querySelector("ul").focus(), e.classList.add(re), clearTimeout(m.timeout), m.timeout = setTimeout(() => {
			document.addEventListener("click", ce), document.addEventListener("keydown", Fe)
		}))
	},
	Bn = function(e) {
		e.preventDefault();
		const t = e.currentTarget,
			r = t.parentNode,
			{
				buttonEl: o
			} = m.activeTab;
		if (o) {
			N();
			return
		}
		if (o === t) return;
		const i = document.getElementById(t.getAttribute("aria-controls"));
		m.activeTab = {
			optionSelector: r,
			buttonEl: t,
			controlledEl: i
		}, Hn()
	},
	me = function(e) {
		return e.getAttribute("data-available") === "true"
	},
	xn = function(e) {
		!e || document.querySelectorAll(".js-pdpPrice").forEach(t => {
			t.innerHTML = e
		})
	},
	zn = function(e) {
		if (document.querySelector(fe)) {
			const t = e.currentTarget,
				r = document.querySelector(fe),
				o = document.querySelector(".js-addToBag");
			r.innerHTML = t.getAttribute("data-label"), xn(t.getAttribute("data-price")), me(t) || (o.innerHTML = "Out of stock", o.setAttribute("disabled", "disabled"), document.querySelector(C).getAttribute("data-waitlist") === "true" && !document.querySelector(C).classList.contains("pdp-buy-options__waitlist__shown") && document.querySelector(C).classList.add("pdp-buy-options__waitlist__shown")), me(t) && (o.removeAttribute("disabled"), o.innerHTML = "Add to Bag", document.querySelector(C).getAttribute("data-waitlist") === "true" && document.querySelector(C).classList.contains("pdp-buy-options__waitlist__shown") && document.querySelector(C).classList.remove("pdp-buy-options__waitlist__shown"))
		}
	},
	Fn = function() {
		N()
	},
	Ue = function(e) {
		const {
			unbind: t = !1
		} = e || {}, r = `${t?"remove":"add"}EventListener`;
		document.querySelectorAll(Mn).forEach(o => o[r]("click", Bn)), document.querySelectorAll(Pn).forEach(o => o[r]("change", zn)), document.querySelectorAll(Dn).forEach(o => o[r]("click", Fn))
	},
	Un = function() {
		document.documentElement.classList.remove(re), clearTimeout(m.timeout), document.removeEventListener("click", ce), Ue({
			unbind: !0
		}), m = {
			...ie
		}
	},
	Wn = function() {
		Ue()
	},
	We = {
		destroy: Un,
		init: Wn
	}; /*! js-cookie v3.0.1 | MIT */
function _(n) {
	for (var e = 1; e < arguments.length; e++) {
		var t = arguments[e];
		for (var r in t) n[r] = t[r]
	}
	return n
}
var Gn = {
	read: function(n) {
		return n[0] === '"' && (n = n.slice(1, -1)), n.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
	},
	write: function(n) {
		return encodeURIComponent(n).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent)
	}
};

function G(n, e) {
	function t(o, i, c) {
		if (!(typeof document > "u")) {
			c = _({}, e, c), typeof c.expires == "number" && (c.expires = new Date(Date.now() + c.expires * 864e5)), c.expires && (c.expires = c.expires.toUTCString()), o = encodeURIComponent(o).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
			var d = "";
			for (var s in c) !c[s] || (d += "; " + s, c[s] !== !0 && (d += "=" + c[s].split(";")[0]));
			return document.cookie = o + "=" + n.write(i, o) + d
		}
	}

	function r(o) {
		if (!(typeof document > "u" || arguments.length && !o)) {
			for (var i = document.cookie ? document.cookie.split("; ") : [], c = {}, d = 0; d < i.length; d++) {
				var s = i[d].split("="),
					a = s.slice(1).join("=");
				try {
					var f = decodeURIComponent(s[0]);
					if (c[f] = n.read(a, f), o === f) break
				} catch {}
			}
			return o ? c[o] : c
		}
	}
	return Object.create({
		set: t,
		get: r,
		remove: function(o, i) {
			t(o, "", _({}, i, {
				expires: -1
			}))
		},
		withAttributes: function(o) {
			return G(this.converter, _({}, this.attributes, o))
		},
		withConverter: function(o) {
			return G(_({}, this.converter, o), this.attributes)
		}
	}, {
		attributes: {
			value: Object.freeze(e)
		},
		converter: {
			value: Object.freeze(n)
		}
	})
}
var H = G(Gn, {
	path: "/"
});
const Vn = 365,
	Ge = "SUBSCRIBED",
	Yn = "https://manage.kmail-lists.com/ajax/subscriptions/subscribe",
	Kn = "https://a.klaviyo.com/onsite/components/back-in-stock/subscribe",
	Zn = -(new Date().getTimezoneOffset() / 60),
	Jn = window.settings && window.settings.klaviyoToken ? window.settings.klaviyoToken : "",
	Xn = function(e) {
		return fetch(Yn, {
			method: "POST",
			cache: "no-cache",
			body: e
		}).then(t => t.json())
	},
	Qn = function(e = {}) {
		const {
			listId: t = "",
			email: r = "",
			source: o = "Website"
		} = e, i = window.settings.klaviyoListId ? window.settings.klaviyoListId : "", c = t || i;
		return new Promise((d, s) => {
			(!c || !r) && s(new Error("Required settings missing"));
			const a = {
					email: r,
					g: c,
					$consent: "email",
					$fields: "$consent,$source",
					$list_fields: "$consent",
					$source: o,
					$timezone_offset: Zn
				},
				f = new FormData;
			Object.keys(a).forEach(E => {
				f.append(E, a[E])
			});
			let p = !1;
			Xn(f).then(E => (E.data && E.errors.length && (p = !0), p === !1 ? H.set(Ge, 1, {
				expires: Vn
			}) : s(new Error(E.errors.join(" "))), E)).then(d).catch(s)
		})
	},
	eo = function(e = {}) {
		const t = new FormData;
		return t.append("email", e.email), t.append("variant", String(e.variantId)), t.append("platform", "shopify"), t.append("a", Jn), fetch(Kn, {
			method: "POST",
			cache: "no-cache",
			mode: "cors",
			body: t
		}).then(r => r.json())
	},
	to = () => H.get(Ge),
	Ve = {
		getIsSubscribed: to,
		subscribe: Qn
	};
const no = ".js-addToBag",
	pe = ".js-waitlistForm",
	oo = ".js-waitlistButton",
	Ye = function() {
		return document.querySelector('input[name="id"]:checked') || document.querySelector('input[name="id"][type="hidden"]')
	},
	ro = function(e) {
		e.preventDefault();
		const t = Ye(),
			r = 1;
		!t || b.add({
			id: t.value,
			quantity: r
		}).then(() => {
			Te.open()
		}).catch(console.error)
	},
	io = function() {
		const e = document.querySelector(oo);
		e.innerHTML = "Thank you!", e.setAttribute("aria-live", "polite")
	},
	co = function(e) {
		e.preventDefault();
		const t = document.querySelector(".js-waitlistForm"),
			{
				email: r
			} = t.elements,
			o = Ye(),
			i = t.querySelector("button");
		i.disabled = !0, eo({
			email: r.value,
			variantId: o.value
		}).then(io).catch(console.error)
	},
	Ke = function(e = {}) {
		const {
			unbind: t
		} = e, r = t ? "removeEventListener" : "addEventListener";
		[].forEach.call(document.querySelectorAll(no), o => {
			o[r]("click", ro)
		}), document.querySelector(pe) && document.querySelector(pe)[r]("submit", co)
	},
	so = function() {
		Ke(), We.init()
	},
	lo = function() {
		Ke({
			unbind: !0
		}), We.destroy()
	},
	Ze = {
		destroy: lo,
		init: so
	};
const ao = function() {
		v.init()
	},
	Je = {
		init: ao
	};
const V = ".js-sizingTableBtn",
	uo = ".js-sizingTableClose",
	fo = ".js-sizingHeading";
let h = null;
const mo = function(e) {
		h = document.getElementById(e.getAttribute("aria-controls")), document.querySelectorAll(`[aria-controls="${h.id}"]`).forEach(t => {
			t.setAttribute("aria-expanded", !0)
		}), h.removeAttribute("aria-hidden"), document.querySelector(fo).focus()
	},
	Xe = function() {
		!h || (h.setAttribute("aria-hidden", !0), document.querySelectorAll(`[aria-controls="${h.id}"]`).forEach(e => {
			e.setAttribute("aria-expanded", !1)
		}), document.querySelector(V).focus(), h = null)
	},
	po = function(e) {
		const t = e.currentTarget;
		mo(t)
	},
	Qe = function(e) {
		const {
			unbind: t = !1
		} = e || {}, r = `${t?"remove":"add"}EventListener`;
		document.querySelector(V) && document.querySelector(V)[r]("click", po), document.querySelectorAll(uo).forEach(o => {
			o[r]("click", Xe)
		})
	},
	go = function() {
		Xe(), Qe({
			unbind: !0
		})
	},
	yo = function() {
		Qe()
	},
	Eo = {
		init: yo,
		destroy: go
	},
	ho = 1023;
const So = 88,
	et = ".js-pdpGallery",
	bo = ".js-pdpGalleryDot",
	vo = ".js-pdpGalleryDots",
	tt = ".js-pdpImage",
	nt = {
		gallery: null,
		isMobile: void 0,
		pictures: void 0
	};
let u = {
	...nt
};
const wo = function(e) {
		if (!u.isMobile) {
			const t = e.currentTarget.getAttribute("data-index"),
				o = document.querySelector(`${tt}[data-index="${t}"]`).getBoundingClientRect().top + window.scrollY - So;
			window.scrollTo({
				behavior: "smooth",
				top: o
			})
		}
	},
	ot = function(e) {
		const t = document.querySelector(vo);
		[].forEach.call(t.children, (r, o) => {
			r.classList[o === e ? "add" : "remove"]("is-current")
		})
	},
	rt = function(e) {
		const t = document.querySelector(et),
			r = u.gallery.getAttribute("data-size"),
			o = Math.min(r - 1, e);
		t.children[o].isLoaded || (t.children[o].querySelectorAll("[data-src], [data-srcset]").forEach(te.load), t.children[o].isLoaded = !0)
	},
	Ao = function() {
		if (u.isMobile) return;
		const e = u.gallery.getAttribute("data-size"),
			t = Math.floor(u.gallery.offsetHeight / e),
			r = Math.min(e - 1, Math.floor((window.scrollY + window.innerHeight * .4) / t));
		ot(r), rt(r + 1)
	},
	Co = function(e) {
		if (!u.isMobile) return;
		const t = u.gallery.getAttribute("data-size"),
			r = e.target.scrollLeft,
			o = e.target.scrollWidth - e.target.clientWidth,
			i = Math.min(t - 1, Math.floor(r / o * t));
		ot(i), rt(i + 1)
	},
	it = function() {
		const e = !!window.matchMedia(`(max-width: ${ho}px)`).matches;
		e !== u.isMobile && (e !== u.isMobile && (u.isMobile = e), e && (u.gallery.addEventListener("scroll", Co), u.pictures.forEach(t => {
			t.classList.remove("js-scroll"), t.removeAttribute("data-callback"), t.removeAttribute("data-no-states")
		})), L.rebuildCache())
	},
	ct = function(e = {}) {
		const {
			unbind: t
		} = e, r = t ? "removeEventListener" : "addEventListener";
		window[r]("scroll", Ao), window[r]("resize", it), document.querySelectorAll(bo).forEach(o => {
			o[r]("click", wo)
		})
	},
	To = function() {
		u.gallery = document.querySelector(et), u.pictures = document.querySelectorAll(tt), u.gallery && u.pictures && (ct(), it())
	},
	Lo = function() {
		ct({
			unbind: !0
		}), u = {
			...nt
		}
	},
	st = {
		destroy: Lo,
		init: To
	};
const lt = ".js-recommended",
	Oo = function(e) {
		return fetch(e).then(t => t.text()).then(t => {
			const r = document.createElement("div");
			r.innerHTML = t;
			const o = r.querySelector(lt);
			return o && o.innerHTML.trim().length ? o.innerHTML.trim() : ""
		})
	},
	ko = function(e, t) {
		if (!!t) return t.innerHTML = e, t.innerHTML
	},
	qo = function(e) {
		Oo(e.dataset.url).then(t => ko(t, e)).then(() => {
			Je.init(), L.rebuildCache()
		}).catch(console.error)
	},
	$o = function() {
		v.init(), Ze.init(), Je.init(), Eo.init(), st.init();
		const e = document.querySelector(lt);
		e && qo(e)
	},
	Io = function() {
		Ze.destroy(), st.destroy()
	},
	Ro = {
		destroy: Io,
		init: $o
	},
	_o = "modulepreload",
	jo = function(n, e) {
		return new URL(n, e).href
	},
	ge = {},
	Mo = function(e, t, r) {
		if (!t || t.length === 0) return e();
		const o = document.getElementsByTagName("link");
		return Promise.all(t.map(i => {
			if (i = jo(i, r), i in ge) return;
			ge[i] = !0;
			const c = i.endsWith(".css"),
				d = c ? '[rel="stylesheet"]' : "";
			if (!!r)
				for (let f = o.length - 1; f >= 0; f--) {
					const p = o[f];
					if (p.href === i && (!c || p.rel === "stylesheet")) return
				} else if (document.querySelector(`link[href="${i}"]${d}`)) return;
			const a = document.createElement("link");
			if (a.rel = c ? "stylesheet" : _o, c || (a.as = "script", a.crossOrigin = ""), a.href = i, document.head.appendChild(a), c) return new Promise((f, p) => {
				a.addEventListener("load", f), a.addEventListener("error", () => p(new Error(`Unable to preload CSS for ${i}`)))
			})
		})).then(() => e())
	};
const Po = ".js-storePageSlider",
	at = {
		sliders: []
	};
let Y = {
	...at
};

function Do() {
	return Mo(() => import("https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js"), [], import.meta.url)
}
const No = function() {
		Do().then(e => {
			window.Swiper = e.Swiper, document.querySelectorAll(Po).forEach(t => {
				const r = new Swiper(t, {
					centeredSlides: !0,
					grabCursor: !0,
					lazy: {
						loadPrevNext: !0,
						loadPrevNextAmount: 4
					},
					slidesPerView: "auto"
				});
				Y.sliders.push(r)
			})
		})
	},
	Ho = function() {
		Y.sliders.forEach(e => {
			e.destroy()
		}), Y = {
			...at
		}
	},
	Bo = {
		destroy: Ho,
		init: No
	};
const xo = {},
	ye = Object.freeze(Object.defineProperty({
		__proto__: null,
		about: dn,
		account: fn,
		blog: pn,
		collection: vn,
		customer: Tn,
		home: In,
		look: _n,
		order: jn,
		pdp: Ro,
		storePage: Bo,
		text: xo
	}, Symbol.toStringTag, {
		value: "Module"
	}));

function zo() {
	const {
		pathname: n,
		search: e
	} = window.location;
	document.querySelectorAll("a").forEach(t => {
		const r = t.getAttribute("href");
		r !== n && r !== n + e ? t.removeAttribute("aria-current") : t.setAttribute("aria-current", "page")
	})
}
const g = {
		currentView: null
	},
	ut = function() {
		g.currentView && g.currentView.destroy && g.currentView.destroy()
	},
	Fo = function() {
		const e = document.querySelector("[data-view]");
		if (!e) return;
		const t = e.getAttribute("data-view");
		ye[t] && (g.currentView = ye[t]), typeof g.currentView < "u" && g.currentView && g.currentView.init && g.currentView.init()
	},
	dt = function() {
		Fo(), zo()
	},
	Uo = function(e = "/") {
		ne(e).then(t => {
			ut();
			const r = t.split("<head>").pop().split("</head>")[0],
				o = `<main ${t.split("<main ").pop().split("</main>")[0]}</main>`;
			let i = document.createElement("div");
			i.innerHTML = o, document.getElementById("content").innerHTML = i.children[0].innerHTML, i.innerHTML = r, document.title = i.querySelector("title").innerText || document.title, dt(), i.innerHTML = "", i = null
		})
	},
	ft = {
		destroy: ut,
		fetchUrl: ne,
		init: dt,
		push: Uo
	};
let l = {
	isMobile: void 0,
	isOpen: !1,
	isRolloverActive: !1,
	isSearchOpen: void 0,
	isSubmenuOpen: !1,
	rolloverTime: null,
	searchTimeout: null
};
const Wo = function() {
		document.body.classList[l.isOpen ? "add" : "remove"]("state--navigation-open"), document.body.classList[l.isSubmenuOpen ? "add" : "remove"]("state--navigation-submenu-open"), document.body.classList[l.isSearchOpen ? "add" : "remove"]("state--search-open")
	},
	w = function(e = {}) {
		l = {
			...l,
			...e
		}, Wo()
	},
	Go = function() {
		w({
			isOpen: !l.isOpen
		}), l.isOpen && document.querySelector(".js-navigation button").focus({
			preventScroll: !0
		})
	},
	P = function() {
		document.querySelectorAll(".js-navigationSubmenuToggle").forEach(e => {
			e.setAttribute("aria-expanded", "false")
		}), document.querySelectorAll(".js-navigationSubmenu").forEach(e => {
			e.setAttribute("aria-hidden", "true")
		}), w({
			isSubmenuOpen: !1
		})
	},
	mt = function() {
		P(), w({
			isOpen: !1
		})
	},
	Ee = function({
		targetId: e,
		target: t,
		trigger: r
	}) {
		document.querySelectorAll(`[aria-controls="${e}"]`).forEach(o => {
			o.setAttribute("aria-expanded", "true")
		}), r && r.setAttribute("aria-expanded", "true"), t.setAttribute("aria-hidden", "false"), t.querySelector("a, button").focus({
			preventScroll: !0
		}), w({
			isSubmenuOpen: !0
		})
	},
	Vo = function(e) {
		const t = e.currentTarget,
			r = t.getAttribute("aria-controls"),
			o = document.getElementById(r),
			i = o.getAttribute("aria-hidden") === "false",
			c = t.getAttribute("data-parent"),
			d = c ? document.getElementById(c) : null,
			s = 1 * (t.getAttribute("data-level") || 1);
		!l.isMobile && i && l.isRolloverActive || (i ? (o.setAttribute("aria-hidden", "true"), document.querySelectorAll(`[aria-controls="${r}"]`).forEach((a, f) => {
			a.setAttribute("aria-expanded", "false"), f === 0 && a.focus({
				preventScroll: !0
			})
		}), P(), d && Ee({
			target: d,
			targetId: c
		})) : (!l.isMobile && s !== 2 && P(), Ee({
			target: o,
			targetId: r,
			trigger: t
		})))
	},
	Yo = function(e) {
		const t = e.currentTarget;
		if (l.isMobile) return;
		const r = t.getAttribute("aria-controls"),
			o = document.getElementById(r);
		o.getAttribute("aria-hidden") !== "false" && (clearTimeout(l.rolloverTime), l.isRolloverActive = !0, l.rolloverTime = setTimeout(() => {
			l.isRolloverActive = !1
		}, 500), l.isMobile || P(), document.querySelectorAll(`[aria-controls="${r}"]`).forEach(c => {
			c.setAttribute("aria-expanded", "true")
		}), t.setAttribute("aria-expanded", "true"), o.setAttribute("aria-hidden", "false"), w({
			isSubmenuOpen: !0
		}))
	},
	he = function() {
		const e = !!window.matchMedia("(max-width: 1023px)").matches;
		e !== l.isMobile && w({
			isMobile: e
		})
	},
	Ko = function() {
		l.isMobile || mt()
	},
	Zo = function() {
		w({
			isSearchOpen: !0
		}), document.querySelector(".js-search input").focus()
	},
	Jo = function(e) {
		ft.push(`/search?q=${e}&type=product`)
	},
	Se = function(e) {
		clearTimeout(l.searchTimeout), l.searchTimeout = window.setTimeout(() => {
			const t = e.currentTarget.value;
			t.length > 2 && Jo(t)
		}, 250)
	},
	Xo = function() {
		he(), window.addEventListener("resize", he), document.querySelectorAll(".js-navigationToggle").forEach(e => {
			e.addEventListener("click", Go)
		}), document.querySelectorAll(".js-navigationCloser").forEach(e => {
			e.addEventListener("click", mt)
		}), document.querySelectorAll(".js-navigationSubmenuToggle").forEach(e => {
			e.addEventListener("click", Vo)
		}), document.querySelectorAll(".js-navigationSubmenuOpen").forEach(e => {
			e.addEventListener("mouseover", Yo)
		}), document.querySelectorAll(".js-navigationCloser").forEach(e => {
			e.addEventListener("mouseover", Ko)
		}), document.querySelectorAll(".js-searchOpen").forEach(e => {
			e.addEventListener("click", Zo)
		}), document.querySelectorAll(".js-searchQuery").forEach(e => {
			e.addEventListener("keydown", Se), e.addEventListener("change", Se)
		})
	},
	Qo = {
		init: Xo
	};
const er = 14,
	pt = "MODAL_SEEN",
	tr = ".js-newsletterSubscribe",
	nr = ".js-newsletterSubscribeSuccess",
	or = function(e, t) {
		const r = t.parentNode.querySelector(nr);
		!t || (r.setAttribute("aria-hidden", "false"), t.setAttribute("aria-hidden", "true"), r.focus())
	},
	rr = function(e) {
		const t = e.elements.email.value || "",
			r = e.querySelector("button");
		r.disabled = !0, Ve.subscribe({
			email: t
		}).then(o => or(o, e)).catch(o => console.log(o, e))
	},
	be = function(e) {
		e.preventDefault();
		const t = e.currentTarget;
		rr(t)
	},
	ir = function() {
		return !!H.get(pt)
	},
	cr = function() {
		H.set(pt, 1, {
			expires: er
		})
	},
	sr = function() {
		const e = document.querySelector(tr);
		!e || (e.removeEventListener("submit", be), e.addEventListener("submit", be))
	},
	lr = function() {
		window.settings.enableNewsletterModal && !Ve.getIsSubscribed() && !ir() && setTimeout(() => {
			cr(), Le.open({
				target: "modal-newsletter"
			})
		}, 2e4)
	},
	ar = function() {
		sr(), lr()
	},
	ur = {
		init: ar
	};
const K = ".js-topHatClose",
	gt = ".js-topHatDate",
	dr = "Starting Soon",
	yt = {
		interval: null,
		isClosing: !1,
		topHatEl: null
	};
let T = {
	...yt
};
const fr = ["d", "h", "m", "s"],
	mr = n => n > 9 ? n : `0${n}`,
	ve = function() {
		[].forEach.call(document.querySelectorAll(gt), e => {
			const t = 1 * e.getAttribute("data-date");
			let r = Math.round(Math.max(0, t - Date.now() * .001));
			if (r <= 60) {
				e.innerHTML = dr;
				return
			}
			const o = Math.floor(r / 60 / 60 / 24);
			r -= o * 60 * 60 * 24;
			const i = Math.floor(r / 60 / 60);
			r -= i * 60 * 60;
			const c = Math.floor(r / 60);
			r -= c * 60;
			const d = [o, i, c].map((s, a) => a !== 0 ? mr(s) : s).map((s, a) => s ? `<span>${s}${fr[a]}</span>` : "").filter(s => !!s).slice(0, 2).join("");
			e.innerHTML = d
		})
	},
	Et = function() {
		window.clearInterval(T.interval), T = {
			...yt
		}, document.querySelectorAll(K).forEach(e => {
			e.removeEventListener("click", ht)
		})
	};

function ht(n) {
	n.preventDefault();
	const e = document.querySelector(".js-topHat");
	if (!e || T.isClosing) return;
	T.isClosing = !0;
	const t = e.offsetHeight;
	e.setAttribute("style", `height: ${t}px`), window.setTimeout(() => {
		e.setAttribute("style", "height: 0")
	}), window.setTimeout(() => {
		e && (Et(), e.parentNode.removeChild(e)), T.isClosing = !1
	}, 400)
}
const pr = function() {
		document.querySelectorAll(K).forEach(e => {
			e.addEventListener("click", ht)
		}), document.querySelector(K) && document.body.classList.add("state--top-hat"), document.querySelector(gt) && (ve(), T.interval = window.setInterval(ve, 60 * 1e3))
	},
	gr = {
		destroy: Et,
		init: pr
	};
Te.init();
Le.init();
Qo.init();
ur.init();
ft.init();
gr.init();
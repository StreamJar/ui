import {Injectable, Optional, SkipSelf} from '@angular/core';

/**
* Simple utility for getting the bounds of the browser viewport.
* @docs-private
*/
@Injectable()
export class ViewportRuler {

	/** Cached document client rectangle. */
	private _documentRect?: ClientRect;

	constructor() {
		this._cacheViewportGeometry();
	}

	/**
	* Gets the (top, left) scroll position of the viewport.
	* @param documentRect
	*/
	public getViewportScrollPosition(documentRect = this._documentRect) {
		// The top-left-corner of the viewport is determined by the scroll position of the document
		// body, normally just (scrollLeft, scrollTop). However, Chrome and Firefox disagree about
		// whether `document.body` or `document.documentElement` is the scrolled element, so reading
		// `scrollTop` and `scrollLeft` is inconsistent. However, using the bounding rect of
		// `document.documentElement` works consistently, where the `top` and `left` values will
		// equal negative the scroll position.
		const top = -documentRect.top || document.body.scrollTop || window.scrollY || 0;
		const left = -documentRect.left || document.body.scrollLeft || window.scrollX || 0;

		return {top, left};
	}

	/** Caches the latest client rectangle of the document element. */
	public _cacheViewportGeometry?() {
		this._documentRect = document.documentElement.getBoundingClientRect();
	}
}

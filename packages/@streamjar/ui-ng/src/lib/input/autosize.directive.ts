import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';

/**
* This is taken from Angular Material 2.
* https://github.com/angular/material2/blob/master/src/lib/input/autosize.ts
*/

/** tslint:disable */
@Directive({
	selector: '[jar-textarea-autosize]', //tslint:disable-line
})
export class JarTextareaAutosizeDirective implements OnInit {
	/** Minimum number of rows for this textarea. */
	@Input() public minRows: number;
	@Input() public maxRows: number;

	/** Cached height of a textarea with a single row. */
	private _cachedLineHeight: number;

	constructor(private _elementRef: ElementRef) { }

	/** The minimum height of the textarea as determined by minRows. */
	@HostBinding('style.min-height')
	get _minHeight() {
		return this.minRows ? `${this.minRows * this._cachedLineHeight}px` : null;
	}

	/** The maximum height of the textarea as determined by maxRows. */
	@HostBinding('style.max-height')
	get _maxHeight() {
		return this.maxRows ? `${this.maxRows * this._cachedLineHeight}px` : null;
	}

	public ngOnInit() {
		this._cacheTextareaLineHeight();
		setTimeout(() => {
			this.resizeToFitContent();
		})
	}

	/**
	* Cache the height of a single-row textarea.
	*
	* We need to know how large a single "row" of a textarea is in order to apply minRows and
	* maxRows. For the initial version, we will assume that the height of a single line in the
	* textarea does not ever change.
	*/
	private _cacheTextareaLineHeight(): void {
		const textarea = this._elementRef.nativeElement as HTMLTextAreaElement;

		// Use a clone element because we have to override some styles.
		const textareaClone = textarea.cloneNode(false) as HTMLTextAreaElement;
		textareaClone.rows = 1;

		// Use `position: absolute` so that this doesn't cause a browser layout and use
		// `visibility: hidden` so that nothing is rendered. Clear any other styles that
		// would affect the height.
		textareaClone.style.position = 'absolute';
		textareaClone.style.visibility = 'hidden';
		textareaClone.style.border = 'none';
		textareaClone.style.padding = '';
		textareaClone.style.height = '';
		textareaClone.style.minHeight = '';
		textareaClone.style.maxHeight = '';

		textarea.parentNode.appendChild(textareaClone);
		this._cachedLineHeight = textareaClone.offsetHeight;
		textarea.parentNode.removeChild(textareaClone);
	}

	/** Resize the textarea to fit its content. */
	@HostListener('input')
	public resizeToFitContent() {
		const textarea = this._elementRef.nativeElement as HTMLTextAreaElement;
		// Reset the textarea height to auto in order to shrink back to its default size.
		textarea.style.height = 'auto';

		// Use the scrollHeight to know how large the textarea *would* be if fit its entire value.
		textarea.style.height = `${textarea.scrollHeight}px`;
	}
}

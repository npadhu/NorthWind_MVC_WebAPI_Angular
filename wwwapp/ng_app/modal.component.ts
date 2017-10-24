import { Component, EventEmitter, ElementRef, Input, OnInit, Output } from '@angular/core';

/// <reference path= "../../typings/globals/jquery/index.d.ts" />

//import * as $ from 'jquery';

const $ = require('jquery');

@Component({
    moduleId: module.id.toString(),
    selector: 'modal',
    template: '<ng-content></ng-content>'
})

export class ModalComponent implements OnInit, Output {
    @Input() id: string;
    private element: any;

    detailObject: any;

    @Output() OnModalInit = new EventEmitter();

    constructor(private el: ElementRef) {
        this.element = $(el.nativeElement);
    }

    ngOnInit(): void {
        let modal = this;

        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        this.element.appendTo('body');

        // close modal on background click
        this.element.on('click', function (e: any) {
            var target = $(e.target);
            if (!target.closest('.modal-body').length) {
                modal.close();
            }
        });

        this.OnModalInit.emit(this);
    }
    

    // open modal
    open(): void {
        this.element.show();
        $('body').addClass('modal-open');
    }

    // close modal
    close(): void {
        this.element.hide();
        $('body').removeClass('modal-open');
    }
}
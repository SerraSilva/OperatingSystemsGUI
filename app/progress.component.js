"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var Thread = (function () {
    function Thread() {
    }
    return Thread;
}());
exports.Thread = Thread;
var Queue = (function () {
    function Queue() {
    }
    return Queue;
}());
exports.Queue = Queue;
var ProgressComponent = (function () {
    function ProgressComponent() {
        this.lock = false;
        this.ticks = 0;
        this.create = false;
        this.runningThread = null;
        this.blockedThreads = [];
        this.completeThreads = [];
        this.threads = [
            {
                id: 1,
                priority: randomIntFromInterval(1, 5),
                state: 'ready',
                progress: 0,
                switchTime: 1000000
            },
            {
                id: 2,
                priority: randomIntFromInterval(1, 5),
                state: 'ready',
                progress: 0,
                switchTime: 1000000
            },
            {
                id: 3,
                priority: randomIntFromInterval(1, 5),
                state: 'ready',
                progress: 0,
                switchTime: 1000000
            },
            {
                id: 4,
                priority: randomIntFromInterval(1, 5),
                state: 'ready',
                progress: 0,
                switchTime: 1000000
            },
            {
                id: 5,
                priority: randomIntFromInterval(1, 5),
                state: 'ready',
                progress: 0,
                switchTime: 1000000
            },
            {
                id: 6,
                priority: randomIntFromInterval(1, 5),
                state: 'ready',
                progress: 0,
                switchTime: 1000000
            },
            {
                id: 7,
                priority: randomIntFromInterval(1, 5),
                state: 'ready',
                progress: 0,
                switchTime: 1000000
            },
            {
                id: 8,
                priority: randomIntFromInterval(1, 5),
                state: 'ready',
                progress: 0,
                switchTime: 1000000
            },
            {
                id: 9,
                priority: randomIntFromInterval(1, 5),
                state: 'ready',
                progress: 0,
                switchTime: 1000000
            },
            {
                id: 10,
                priority: randomIntFromInterval(1, 5),
                state: 'ready',
                progress: 0,
                switchTime: 1000000
            }
        ];
        this.queues = [
            {
                priority: 1,
                threads: []
            },
            {
                priority: 2,
                threads: []
            },
            {
                priority: 3,
                threads: []
            },
            {
                priority: 4,
                threads: []
            },
            {
                priority: 5,
                threads: []
            }
        ];
    }
    ProgressComponent.prototype.ngOnInit = function () {
        var _this = this;
        var timer = Rx_1.Observable.timer(2000, 1000);
        timer.subscribe(function (t) { return _this.ticks = t; });
        for (var i = 0; i < this.threads.length; i++) {
            for (var j = 0; j < this.queues.length; j++) {
                if (this.queues[j].priority === this.threads[i].priority) {
                    this.queues[j].threads.push(this.threads[i]);
                }
            }
        }
        if (this.queues[4].threads.length > 0) {
            this.queues[4].threads[0].state = 'running';
            this.runningThread = this.queues[4].threads.shift();
            this.lock = true;
        }
        else {
            if (this.queues[3].threads.length > 0) {
                this.queues[3].threads[0].state = 'running';
                this.runningThread = this.queues[3].threads.shift();
                this.lock = true;
            }
            else {
                if (this.queues[2].threads.length > 0) {
                    this.queues[2].threads[0].state = 'running';
                    this.runningThread = this.queues[2].threads.shift();
                    this.lock = true;
                }
                else {
                    if (this.queues[1].threads.length > 0) {
                        this.queues[1].threads[0].state = 'running';
                        this.runningThread = this.queues[1].threads.shift();
                        this.lock = true;
                    }
                    else {
                        if (this.queues[0].threads.length > 0) {
                            this.queues[0].threads[0].state = 'running';
                            this.runningThread = this.queues[0].threads.shift();
                            this.lock = true;
                        }
                    }
                }
            }
        }
    };
    ProgressComponent.prototype.ngDoCheck = function () {
        if (this.blockedThreads.length > 0 && this.blockedThreads[0] !== undefined) {
            for (var i = 0; i < this.blockedThreads.length; i++) {
                if (this.ticks === this.blockedThreads[i].switchTime) {
                    this.blockedThreads[i].state = 'ready';
                    for (var j = 0; j < this.queues.length; j++) {
                        if (this.blockedThreads.length > 0) {
                            if (this.blockedThreads[i].priority === this.queues[j].priority) {
                                this.queues[j].threads.push(this.blockedThreads[i]);
                                if (i === 0) {
                                    this.blockedThreads.shift();
                                }
                                else if (i === this.blockedThreads.length) {
                                    this.blockedThreads.pop();
                                }
                                else {
                                    this.blockedThreads.splice(i, 1);
                                }
                            }
                        }
                    }
                }
            }
        }
        else {
            this.blockedThreads = [];
        }
        if (this.runningThread !== null) {
            if (this.runningThread.progress === 100) {
                this.runningThread.state = 'complete';
                this.completeThreads.push(this.runningThread);
                this.runningThread = null;
                this.lock = false;
            }
        }
        if (this.runningThread !== null) {
            setInterval(this.runningThread.progress = this.runningThread.progress + 2, 1000);
        }
        if (this.lock === true && this.runningThread !== null) {
            if (this.runningThread.priority < this.queues[4].priority && this.queues[4].threads.length > 0) {
                this.runningThread.state = 'blocked';
                this.runningThread.switchTime = waitTime(this.ticks);
                this.blockedThreads.push(this.runningThread);
                this.queues[4].threads[0].state = 'running';
                this.runningThread = this.queues[4].threads.shift();
            }
            else {
                if (this.runningThread.priority < this.queues[3].priority && this.queues[3].threads.length > 0) {
                    this.runningThread.state = 'blocked';
                    this.runningThread.switchTime = waitTime(this.ticks);
                    this.blockedThreads.push(this.runningThread);
                    this.queues[3].threads[0].state = 'running';
                    this.runningThread = this.queues[3].threads.shift();
                }
                else {
                    if (this.runningThread.priority < this.queues[2].priority && this.queues[2].threads.length > 0) {
                        this.runningThread.state = 'blocked';
                        this.runningThread.switchTime = waitTime(this.ticks);
                        this.blockedThreads.push(this.runningThread);
                        this.queues[2].threads[0].state = 'running';
                        this.runningThread = this.queues[2].threads.shift();
                    }
                    else {
                        if (this.runningThread.priority < this.queues[1].priority && this.queues[1].threads.length > 0) {
                            this.runningThread.state = 'blocked';
                            this.runningThread.switchTime = waitTime(this.ticks);
                            this.blockedThreads.push(this.runningThread);
                            this.queues[1].threads[0].state = 'running';
                            this.runningThread = this.queues[1].threads.shift();
                        }
                    }
                }
            }
        }
        else if ((this.lock === false && this.runningThread === null) ||
            (this.lock === false && this.runningThread !== null)) {
            if (this.queues[4].threads.length > 0) {
                this.queues[4].threads[0].state = 'running';
                this.runningThread = this.queues[4].threads.shift();
                this.lock = true;
            }
            else {
                if (this.queues[3].threads.length > 0) {
                    this.queues[3].threads[0].state = 'running';
                    this.runningThread = this.queues[3].threads.shift();
                    this.lock = true;
                }
                else {
                    if (this.queues[2].threads.length > 0) {
                        this.queues[2].threads[0].state = 'running';
                        this.runningThread = this.queues[2].threads.shift();
                        this.lock = true;
                    }
                    else {
                        if (this.queues[1].threads.length > 0) {
                            this.queues[1].threads[0].state = 'running';
                            this.runningThread = this.queues[1].threads.shift();
                            this.lock = true;
                        }
                        else {
                            if (this.queues[0].threads.length > 0) {
                                this.queues[0].threads[0].state = 'running';
                                this.runningThread = this.queues[0].threads.shift();
                                this.lock = true;
                            }
                        }
                    }
                }
            }
        }
    };
    ProgressComponent.prototype.killSwitch = function () {
        if (this.runningThread !== null) {
            this.completeThreads.push(this.runningThread);
            this.lock = false;
            this.runningThread = null;
        }
    };
    ProgressComponent.prototype.contextSwitch = function () {
        if (this.runningThread !== null) {
            this.runningThread.state = 'blocked';
            this.runningThread.switchTime = waitTime(this.ticks);
            this.blockedThreads.push(this.runningThread);
            this.lock = false;
            this.runningThread = null;
        }
    };
    ProgressComponent.prototype.createThread = function () {
        this.create = true;
    };
    ProgressComponent.prototype.onSubmit = function () {
        this.create = false;
        var newThread = {
            id: this.threads.length + 1,
            progress: 0,
            priority: +this.inputPriority,
            state: 'ready',
            switchTime: 1000000
        };
        this.threads.push(newThread);
        for (var i = 0; i < this.queues.length; i++) {
            if (this.queues[i].priority === newThread.priority) {
                this.queues[i].threads.push(newThread);
            }
        }
    };
    return ProgressComponent;
}());
ProgressComponent = __decorate([
    core_1.Component({
        selector: 'my-progress',
        templateUrl: 'app/progress.component.html'
    })
], ProgressComponent);
exports.ProgressComponent = ProgressComponent;
function waitTime(currentTime) {
    return currentTime + 5;
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//# sourceMappingURL=progress.component.js.map
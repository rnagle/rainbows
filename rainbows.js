(function() {
    var $ = jQuery;

    /**
     * Rainbows class
     */
    var Rainbows = function(container, speed, size) {
        this.container = $(container);
        this.speed = speed || 2;
        this.size = size || 15;
        return this.start();
    };

    Rainbows.prototype.wrap = function(target) {
        var self = this,
            target = $(target),
            new_target = $('<div>'),
            nodes = target.contents().clone();

        nodes.each(function() {
            if (this.nodeType == 3) { // text
                var new_html = "";
                text = this.wholeText;

                for (var i=0; i < text.length; i++) {
                    if (text[i] == ' ')
                        new_html += " ";
                    else
                        new_html += "<span class=\"rainbow\">" + text[i] + "</span>";
                }
                new_target.append(new_html);
            } else {
                $(this).html(self.wrap(this));
                new_target.append(this);
            }
        });

        return new_target.html();
    };

    Rainbows.prototype.guid = function() {
        var s4 = function() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        };
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };

    Rainbows.prototype.generateCSS = function() {
        var style = "<style>",
            animation = "animation: color-change " + this.speed + "s infinite; ",
            rainbow_id = 'rainbow-' + this.guid(),
            data_attr = 'data-rainbow-id',
            selector = this.container.get(0).tagName.toLocaleLowerCase() +
                        '[' + data_attr + '="' + rainbow_id + '"]';

        this.container.attr(data_attr, rainbow_id);

        style += selector + " span.rainbow { ";
        style += animation;
        style += "-moz-" + animation;
        style += "-webkit-" + animation;
        style += "-ms-" + animation;
        style += "-o-" + animation;
        style += "} ";
        for (x = 1; x <= this.size; x++) {
            style += selector + " span.rainbow:nth-child(" + this.size + "n + " + x;
            delay = x * this.speed / this.size - this.speed;
            delay = "animation-delay: " + delay + "s; ";
            style += ") { " + delay;
            style += "-moz-" + delay;
            style += "-webkit-" + delay;
            style += "-ms-" + delay;
            style += "-o-" + delay;
            style += "} ";
        }
        keyframes = "keyframes color-change { 0% { color: red; } 16% { color: orange; } 33% { color: yellow; } 50% { color: green; } 66% { color: blue; } 83% { color: purple; } 100% { color: red; } } ";
        style += "@" + keyframes;
        style += "@-moz-" + keyframes;
        style += "@-webkit-" + keyframes;
        style += "@-ms-" + keyframes;
        style += "@-o-" + keyframes;
        style += "</style>";

        return style;
    }

    Rainbows.prototype.start = function() {
        if (this.container.length && typeof this.container.data('originalHTML') == 'undefined') {
            this.container.data('originalHTML', this.container.html());
            this.container.html(this.wrap(this.container));
            this.container.prepend(this.generateCSS());
        }
        return this;
    };

    Rainbows.prototype.stop = function () {
        this.container.html(this.container.data('originalHTML'));
        this.container.removeData('originalHTML');
        this.container.removeData('rainbows');
        this.container.attr('data-rainbow-id', null);
        return this;
    };

    /**
     * If it seems safe, place Rainbows in global scope.
     */
    if (typeof window.Rainbows == 'undefined')
        window.Rainbows = Rainbows;

    /**
     * As a jQuery plugin
     */
    $.fn.rainbows = function(options) {
        var settings = $.extend({
            speed: 2,
            size: 15
        }, (typeof options == 'object')? options : {});

        return this.each(function(idx, el) {
            if (typeof $(el).data('rainbows') == 'undefined') {
                var speed = $(el).data('speed') || settings.speed,
                    size = $(el).data('size') || settings.size;

                $(el).data('rainbows', new Rainbows(el, Number(speed), Number(size)));
            }

            if (['start', 'stop'].indexOf(options) >= 0)
                $(el).data('rainbows')[options]();
        });
    };

    /**
     * If there are any <rainbow /> or <rainbows /> tags,
     * rainbow-ify them on document ready.
     */
    $(function() { $('rainbow, rainbows').rainbows(); });
}());

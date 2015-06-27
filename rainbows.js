var Rainbows = function(container, duration, interval) {
    var $ = jQuery,
        self = this;

    self.wrap = function(target) {
        var target = $(target),
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

    self.injectCSS = function(duration, size) {
        duration = duration || 2;
        size = size || 15;
        style = "<style>";
        animation = "animation: color-change " + duration + "s infinite; ";
        style += "span.rainbow { ";
        style += animation;
        style += "-moz-" + animation;
        style += "-webkit-" + animation;
        style += "-ms-" + animation;
        style += "-o-" + animation;
        style += "} ";
        for (x = 1; x <= size; x++) {
            style += " span.rainbow:nth-child(" + size + "n + " + x;
            delay = x*duration/size - duration;
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
    if (typeof container !== 'undefined')
        $(container).html(self.wrap(container));
        $(container).prepend(self.injectCSS(duration, interval));
    return self;
};

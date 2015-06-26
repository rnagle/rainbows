var Rainbows = function(container, interval) {
    var $ = jQuery,
        self = this;

    self.last_offset = 0;

    self.colors = [
        'red', 'green', 'yellow', 'blue', 'orange',
        'purple', 'pink', 'brown', 'black', 'gray', 'white'
    ];

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
                        new_html += "<span>" + text[i] + "</span>";
                }
                new_target.append(new_html);
            } else {
                $(this).html(self.wrap(this));
                new_target.append(this);
            }
        });

        return new_target.html();
    };

    self.colorize = function(target, offset) {
        var colors = $.extend([], self.colors);

        if (typeof offset !== 'undefined')
            colors = colors.concat(colors.splice(0, offset));

        $(target).find('span').each(function(idx, el) {
            $(el).attr('class', colors[(idx % colors.length)]);
        });
    };

    self.start = function(target, interval) {
        $(target).html(self.wrap(target));
        self.intervalId = setInterval(function() {
            self.colorize(target, self.last_offset);
            self.last_offset = (self.last_offset + 1) % self.colors.length;
        }, interval || 500);
    };

    if (typeof container !== 'undefined')
        self.start(container, interval);

    return self;
};

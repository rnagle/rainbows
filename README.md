# Rainbows.js

Make your site's text "pop" with a full rainbow treatment.

Inspired by such excellent html tags as `marquee` and `blink`.

See [bit.ly/1BUkD76](http://bit.ly/1BUkD76) for a demo.

Requires jQuery.

## Usage:

### As an HTML tag:

Simply include `rainbows.js` on your page and wrap anything you want in a `<rainbow />` tag.

    <rainbow data-speed="2" data-size="15">...</rainbow>

### As a jQuery plugin:

Select elements you want to rainbow-ify:

    $(document).ready(function() {
        $('body').rainbows();
    });

Optionally pass speed and size parameters:

    $(document).ready(function() {
        $('body').rainbows({
            speed: 2,
            size: 15
        });
    });

### Directly with the `Rainbows` constructor:

`Rainbows` accepts three arguments: `container`, `speed` and `size`.

For example:

    var super_sweet_rainbow_text = new Rainbows('body', 3, 15);

Details:

- `container`: CSS selector identifying the element whose text should be rainbow-ified.
- `speed`: the duration (in seconds) of a rainbow cycle on the `container`'s text.
- `size`: the size of the rainbow color spread across the `container`'s text.

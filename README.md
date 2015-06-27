# Rainbows.js

Make your site's text "pop" with a full rainbow treatment.

Inspired by such excellent html tags as `marquee` and `blink`.

See [bit.ly/1BUkD76](http://bit.ly/1BUkD76) for a demo.

## Usage:

The `Rainbows` function accepts three arguments: `container`, `speed` and `interval`.

For example:

    var super_sweet_rainbow_text = new Rainbows('body', 3, 15);

Details:

- `container`: CSS selector identifying the element whose text should be rainbow-ified.
- `speed`: the duration (in seconds) of a rainbow cycle on the `container`'s text.
- `size`: the size of the rainbow color spread across the `container`'s text.

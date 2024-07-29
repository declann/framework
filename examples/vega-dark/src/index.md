# Vega-Lite responsive dark mode

Using [vega-themes](https://github.com/vega/vega-themes) and Observable Framework’s built-in [`dark` reactive variable](https://observablehq.com/framework/lib/generators#dark()), you can render Vega-Lite charts that respect the user’s [preferred color scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) and the current [Framework theme](https://observablehq.com/framework/themes).

```js echo
import * as themes from "npm:vega-themes";

import * as vega from "npm:vega";
import * as vegaLite from "npm:vega-lite";
import * as vegaLiteApi from "npm:vega-lite-api";
import * as tooltip from "npm:vega-tooltip";
const vl = vegaLiteApi.register(vega, vegaLite, {
  init: (view) => {
    view.tooltip(new tooltip.Handler().call);

    // another suggestion from https://observablehq.com/@vega/vega-lite-api-v5#vl
    if (view.container()) view.container().style["overflow-x"] = "auto";
  }
});


display(
  await vl.render({
    spec: {
      config: {
        ...(dark ? themes.dark : themes.default),
        background: "transparent"
      },
      width: 640,
      height: 250,
      autosize: {type: "fit", contains: "padding"},
      data: {url: "https://vega.github.io/vega-lite/data/cars.json"},
      mark: {type: "bar", tooltip:true},
      encoding: {
        x: {field: "Cylinders"},
        y: {aggregate: "count", title: "Number of cars"}
      }
    }
  }, {hover:true, tooltip: true})
);
```

Unfortunately, since Vega-Lite defaults to rendering with canvas, you can’t use CSS [`currentColor`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword) to inherit the foreground color (as Observable Plot does by default) — and hence the chart must be re-rendered if the preferred color scheme changes, and Vega-Lite’s foreground color won’t exactly match your chosen theme. Additionally, Vega-Lite’s built-in themes do not use a transparent background, and so we override the background for a seamless appearance.


<!-- README.md is generated from README.Rmd. Please edit that file -->

# nebular

<!-- badges: start -->

<!-- badges: end -->

The goal of nebular is to try to add the amazing but alpha
[`nebula.gl`](https://github.com/uber/nebula.gl) to the R-spatial
ecosystem. I don’t think I will have the ability to nurture this as it
deserves, so please let me know if you have interest in helping.

## Installation

Only github and highly unstable, so to try it out install with
`remotes::install_github`.

``` r
remotes::install_github("timelyportfolio/nebular")
```

## Example

Currently `nebula()` supports the following undocumented arguments
`initialViewState`, `mapboxApiAccessToken`, and `features`.

``` r
library(nebular)

# with no arguments not much happens
nebular::nebula()
```

If you have a mapbox token, use it to add mapbox beauty (**except
currently experiencing an unresolved blank mapbox problem**.) When
working correctly, we should see something more like this
[codesandbox](https://codesandbox.io/s/nebulagl-editor-example-crxus).

``` r
nebular::nebula( mapboxApiAccessToken= "pk.ey..." )
```

Let’s now add some `GeoJSON` and set an initial view state.

``` r
nebular::nebula(
  initialViewState = list(
    longitude = -122.43,
    latitude = 37.775,
    zoom = 10
  ),
  features = jsonlite::read_json(
    "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/san-francisco.geojson"
  )
)
```

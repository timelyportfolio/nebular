#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
nebula <- function(..., width = "100%", height = "100vh", elementId = NULL) {

  # describe a React component to send to the browser for rendering.
  component <- reactR::component("Example", list(...))

  # create widget
  htmlwidgets::createWidget(
    name = 'nebula',
    reactR::reactMarkup(component),
    width = width,
    height = height,
    package = 'nebular',
    elementId = elementId #,
    # # this does not solve the invisible mapbox problem
    # dependencies = htmltools::htmlDependency(
    #   name = 'mapbox-gl-css',
    #   version = '1.9.1',
    #   src = list(file = system.file("htmlwidgets", package="nebular")),
    #   stylesheet = 'mapbox-gl.css',
    #   all_files = FALSE
    # )
  )
}

#' Shiny bindings for nebula
#'
#' Output and render functions for using nebula within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a nebula
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name nebula-shiny
#'
#' @export
nebulaOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'nebula', width, height, package = 'nebular')
}

#' @rdname nebula-shiny
#' @export
renderNebula <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, nebulaOutput, env, quoted = TRUE)
}

#' Called by HTMLWidgets to produce the widget's root element.
#' @rdname nebula-shiny
nebula_html <- function(id, style, class, ...) {
  htmltools::tagList(
    # Necessary for RStudio viewer version < 1.2
    reactR::html_dependency_corejs(),
    reactR::html_dependency_react(),
    reactR::html_dependency_reacttools(),
    htmltools::tags$div(id = id, class = class, style = style)
  )
}

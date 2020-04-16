library(shiny)
library(nebula)

ui <- fluidPage(
  titlePanel("reactR HTMLWidget Example"),
  nebulaOutput('widgetOutput')
)

server <- function(input, output, session) {
  output$widgetOutput <- renderNebula(
    nebula("Hello world!")
  )
}

shinyApp(ui, server)
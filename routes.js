
var getRoutes = {
  example: "/anyPath/:num",
}

module.exports = {

  getRoutes: getRoutes,

  showRoutes: function() {
    console.log("\n# Routes")
    for (var route in getRoutes) {
      console.log(`- ${route}: '${getRoutes[route]}'`)
    }
    console.log("")
  }

}

export const xmlToJson = (xml) => {
  try {
    var obj = {}
    if (xml.children.length > 0) {
      for (var i = 0; i < xml.children.length; i++) {
        var item = xml.children.item(i)
        var nodeName = item.nodeName

        if (typeof obj[nodeName] == "undefined") {
          obj[nodeName] = xmlToJson(item)
        } else {
          if (typeof obj[nodeName].push == "undefined") {
            var old = obj[nodeName]

            obj[nodeName] = []
            obj[nodeName].push(old)
          }
          obj[nodeName].push(xmlToJson(item))
        }
      }
    } else {
      obj = xml.textContent
    }
    return obj
  } catch (e) {
    console.log(e.message)
  }
}

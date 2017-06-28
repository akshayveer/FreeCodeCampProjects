function createSVGPath(cx, cy, r1, r2, width) {
  r1 = r1 - width;
  var d = ["M", cx , cy - r2, "L", cx, cy - r1, "A", r1, r1, 0, 0, 1, cx + r1, cy,
  "L", cx + r2, cy, "A", r2, r2, 0, 0, 0, cx, cy - r2];
  var ans =  d.join(" ");
  console.log(ans);
  $("#svg2").attr({"d": ans, "stroke-width":width});
  $("#svg1").attr({"d": ans, "stroke-width":width});
  $("#svg3").attr({"d": ans, "stroke-width":width});
  $("#svg4").attr({"d": ans, "stroke-width":width});

  var dx = 17;
  $("#stop-button").attr({"cx" : r1 + width - dx, "cy" : 100});
  $("#start-button").attr({"cx" : r1 + width, "cy" : 100});
  $("#strict-button").attr({"cx" : r1 + width + dx, "cy" : 100});
}

$(document).ready(function () {
  createSVGPath(0, 100, 100, 30, 5);
})

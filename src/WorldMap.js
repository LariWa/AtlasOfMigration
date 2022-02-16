import { CountriesOutline } from "./CountiresOutline";
import { useMapData } from "./useMapData";
import * as d3 from "d3";
import * as topojson from "topojson";
import React, { useRef, useEffect } from "react";

const width = 960;
const height = 500;
function WorldMap() {
  useEffect(() => {
    var yaw = d3.scaleLinear().domain([0, width]).range([0, 360]);
    var pitch = d3.scaleLinear().domain([0, height]).range([0, 360]);

    var countries;
    var innerlines;
    var selected;
    var rootProjection = d3.geoEquirectangular();
    var projection = d3.geoEquirectangular();

    var path = d3.geoPath().projection(projection);

    var zoom = d3
      .zoom()
      .scaleExtent([1, 5])
      .extent([
        [0, 0],
        [width, height],
      ])
      .translateExtent([
        [-Infinity, -Infinity],
        [Infinity, Infinity],
      ])
      .on("zoom", (event) => {
        zoomed(event);
      });

    var canvas = d3
      .select("canvas")
      .attr("width", width)
      .attr("height", height)
      .style("pointer-events", "all")
      .on("click", function () {
        var pos = projection.invert(d3.pointer(this));
        handleClick(pos);
      })
      .call(zoom);

    var ctx = canvas.node().getContext("2d");

    path.context(ctx);

    d3.json("https://unpkg.com/world-atlas@1/world/110m.json").then(init);

    function init(world) {
      countries = topojson.feature(world, world.objects.countries);
      innerlines = topojson.mesh(
        world,
        world.objects.countries,
        function (a, b) {
          return a != b;
        }
      );

      rootProjection.fitSize([width, height], countries);
      projection
        .scale(rootProjection.scale())
        .translate(rootProjection.translate())
        .rotate(rootProjection.rotate());

      draw();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // countries
      ctx.beginPath();
      path(countries);
      ctx.fillStyle = "#333";
      ctx.fill();

      if (selected) {
        ctx.beginPath();
        path(selected);
        ctx.fillStyle = "#daa520";
        ctx.fill();
      }

      ctx.beginPath();
      path(innerlines);
      ctx.strokeStyle = "#fff";
      ctx.stroke();
    }

    function handleClick(pos) {
      var lastSelected = selected;
      selected = null;
      for (var i = 0; i < countries.features.length; i++) {
        if (d3.geoContains(countries.features[i], pos)) {
          selected =
            lastSelected === countries.features[i]
              ? null
              : countries.features[i];
          break;
        }
      }
      selected ? zoomIn(selected) : zoomOut();
    }

    function zoomIn(feature) {
      var pos = projection(d3.geoCentroid(feature));
      var cur = d3.zoomTransform(canvas.node());
      var k = selected ? getK(feature) : zoom.scaleExtent()[0];
      var x0 = -cur.invertX(pos[0]) * k + width / 2;
      var y0 = -cur.invertY(pos[1]) * k + height / 2;

      var t = d3.zoomIdentity.translate(x0, y0).scale(k);
      canvas.transition().duration(2000).call(zoom.transform, t);
    }

    function zoomOut() {
      canvas.transition().duration(2000).call(zoom.scaleTo, 1);
    }

    function zoomed(event) {
      var scale = rootProjection.scale();
      var translate = rootProjection.translate();
      var t = event.transform;
      var tx = translate[0] - t.invertX(translate[0]);
      var ty = translate[1] * t.k + t.y;

      projection
        .scale(t.k * scale)
        .rotate([yaw(tx), 0, 0])
        .translate([translate[0], ty]);

      draw();
    }

    function getK(feature) {
      var k = 0.8;
      var bounds = d3.geoBounds(feature);
      var bbox = [rootProjection(bounds[0]), rootProjection(bounds[1])];
      var w = Math.abs(bbox[1][0] - bbox[0][0]);
      var h = Math.abs(bbox[1][1] - bbox[0][1]);
      return d3.min([(width / w) * k, (height / h) * k, zoom.scaleExtent()[1]]);
    }
  });
  return <canvas></canvas>;
}

export default WorldMap;

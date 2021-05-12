


d3.json("forbes_billionaires.json").then(
   function(d){
       console.log(d);
        createChart(d);
});

function createChart(data) {
 

    width= 2000;
    height = 1000;
  var svg = d3.select('#chart')
    .append('svg')
    .attr('height', height)
    .attr ('width', width)
    .append('g')
    .attr('transform', 'translate('+ width/2+ ','+height/2+')');

    var radiusScale = d3.scaleSqrt().domain([1, 50]).range([0,35])

    var simulera = d3.forceSimulation()
    
    .force('collide', d3.forceCollide(function(d) {
      return radiusScale(d.NetWorth +1)
    }))
    
    var circles = svg.selectAll()
        .data(data)
        .enter().append('circle')
        .attr('r',function(d) {
          return radiusScale(d.NetWorth)
        })
        .attr('fill', 'lightblue')
        .attr('cx', 100)
        .attr('cy', 300)
        
         
        simulera.nodes(data)
        .on('tick', tick)

        function tick(){
        circles
          .attr('cx', function(d) {
            return d.x
          })
          .attr('cy', function(d) {
            return d.y
          })
}}


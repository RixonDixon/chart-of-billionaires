


d3.json("/forbes_billionaires.json").then(
   function(d){
       console.log(d);
        createChart(d);
      
});

function createChart(data) {
 
  
  var chinaNetWorth= 0;
  var usNetWorth = 0;
  var finNetWorth = 0;
  var otherNetWorth = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].Country == "United States"){
      usNetWorth += data[i].NetWorth;
    }else if(data[i].Country == "China") {
      chinaNetWorth += data[i].NetWorth; 
    }else if (data[i].Country == "Finland"){
      finNetWorth += data[i].NetWorth
    }else{
      otherNetWorth += data[i].NetWorth
    }
  }


  var roundUSNW = Math.round(usNetWorth)
  var roundCHNW =Math.round(chinaNetWorth)
  var roundFINNW =Math.round(finNetWorth)
  var roundOTHNW =Math.round(otherNetWorth)

    width= 1800;
    height =1000;

    tooltip = d3.select('body')
    .append('div')
    .style('position', 'absolute')
    .style('padding', '0 10px')
    .style('background', 'white')
    .style('opacity', 0);
                
  var svg = d3.select('#chart')
    .append('svg')
    .attr('height', height)
    .attr ('width', width)
    .append('g')
    .attr('transform', 'translate('+ width/2+ ','+height/2+')')
   

    var radiusScale = d3.scaleSqrt().domain([1, 50]).range([0,35])

    var simulera = d3.forceSimulation()
    
    .force('collide', d3.forceCollide(function(d) {
      return radiusScale(d.NetWorth +1)
    }))

   
    var circles = svg.selectAll()
        .data(data)
        .enter()
        .append('circle')
        .attr('r',function(d) {
          return radiusScale(d.NetWorth)
        })
        
        
        .attr('fill', function(d){ 
          if(d.Country == 'United States'){ 
            return "blue"}
            if(d.Country == 'Finland'){ 
              return "Green"}
        if(d.Country == "China"){ return 'red'}})
        

        .on('mouseover', function(d) {
          tooltip.transition().duration(200)
            .style('opacity', .9)
            .style('visibility', 'visible')
            console.log(d)
          tooltip.html(
            '<div id="dysfunc" style="font-size: 1rem;  visibility: visible">' + 'Rank:'+ this.__data__.Rank + '<br>' +
               'Name:'+ this.__data__.Name + '<br>' +'Worth:'+ this.__data__.NetWorth + ' bn $' + '<br>'+'Selfmade: '+this.__data__.Self_made+'<br>'+'Nationality: '+this.__data__.Citizenship + '<br>'+'</div>'
          )
            .style('left', (event.pageX -35) + 'px')
            .style('top', (event.pageY -30) + 'px')
            .on('mouseout', function(d){
                this.style.visibility = 'hidden'
                d3.select("#dysfunc").style('visibility','hidden')
            })
          });
     
         
        simulera.nodes(data)
        .on('tick', tick);
        
        svg.append("text")
        .attr("x", -530)
        .attr("y", 250)
        .attr("text-anchor", "middle")
        .style("font-size", "25px") 
        .attr('fill', 'blue')
        .text("US networth " + roundUSNW);
        svg.append("text")
        .attr("x", -515)
        .attr("y", 280)
        .attr("text-anchor", "middle")
        .style("font-size", "25px") 
        .attr('fill', 'red')
        .text("China networth " + roundCHNW);
        svg.append("text")
        .attr("x", -500)
        .attr("y", 310)
        .attr("text-anchor", "middle")
        .style("font-size", "25px")
        .attr('fill', 'black')
        .text("Other networth " + roundOTHNW);
        svg.append("text")
        .attr("x", -485)
        .attr("y", 340)
        .attr("text-anchor", "middle")
        .style("font-size", "25px")
        .attr('fill', 'green') 
        .text("Finland networth " + roundFINNW);

        function tick(){
        circles
          .attr('cx', function(d) {
            return d.x
          })
          .attr('cy', function(d) {
            return d.y
          })

         
        
      
}
  
}


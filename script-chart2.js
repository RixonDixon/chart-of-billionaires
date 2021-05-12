


d3.json("../d3/forbes_billionaires.json").then(
   function(d){
       console.log(d);
        createChart(d);
});

function createChart(data) {
    console.log(data)
    
        const simulation = d3.forceSimulation(data.nodes)
         .force('charge', d3.forceManyBody().strength(-100))
         .force('link', d3.forceLink(data.links).id(d => d.id)
               .distance(50))
          .force('center', d3.forceCenter(300, 300))
        
          const svg = d3.select("body").append("svg")
          .style('background', '#ddeeff')
          .attr("viewBox", [0, 0, 600, 600]);
        
         const node = svg.selectAll('circle')
           .data(data.nodes)
           .enter()
           .append('circle')
           .attr('r', 25)
           .attr('fill', 'blue')
           .attr('fill', 'white')
           .attr('stroke', 'orangered')
           .on('click',(event,d => console.log(event)));       
         const link = svg
           .selectAll('path.link')
           .data(data.links)
           .enter()
           .append('path')
           .attr('stroke', 'black')
           .attr('fill', 'none');
        
        const lineGenerator = d3.line();
         
         simulation.on('tick', () => {
                       node.attr('cx', d => d.x);
                       node.attr('cy', d => d.y);
                       link.attr('d', d => lineGenerator([
                         [d.source.x, d.source.y], 
                         [d.target.x, d.target.y]]) 
                       )
         });
         return svg.node();
      }


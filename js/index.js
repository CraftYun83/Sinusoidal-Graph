function drawExp() {
    document.querySelectorAll("input").forEach((e) => {
        if (e.value == "") {
            e.value = "0"
        }
    })
    if (document.getElementById("sin").checked == true) {
        var expression = document.getElementById("amp").value.toString()+"*sin(2PI/"+document.getElementById("period").value.toString()+"*x+"+document.getElementById("hshift").value.toString()+")+"+document.getElementById("vshift").value.toString()
    } else {
        var expression = document.getElementById("amp").value.toString()+"*cos(2PI/"+document.getElementById("period").value.toString()+"*x+"+document.getElementById("hshift").value.toString()+")+"+document.getElementById("vshift").value.toString()
    }
    console.log(expression)
    try {
        const expr = math.compile(expression)

        // evaluate the expression repeatedly for different values of x
        const xValues = math.range(-10, 10, 0.1).toArray()
        const yValues = xValues.map(function (x) {
            return expr.evaluate({x: x})
        })

        // render the plot using plotly
        const trace1 = {
            x: xValues,
            y: yValues,
            type: 'scatter'
        }

        const layout = {
            yaxis: {fixedrange: true},
            xaxis : {fixedrange: true}
        }

        const data = [trace1]
        Plotly.newPlot('plot', data, layout)
    } catch {
        ;
    }
}

drawExp()

document.getElementById("sin").addEventListener('change', (e) => {
    if (document.getElementById("sin").checked) {
        document.getElementById("cos").checked = false
    }
});

document.getElementById("cos").addEventListener('change', (e) => {
    if (document.getElementById("cos").checked) {
        document.getElementById("sin").checked = false
    }
});

document.getElementById("graph").onclick = function(e) {
    drawExp()
}
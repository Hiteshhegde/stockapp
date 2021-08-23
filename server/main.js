
const body = document.getElementsByTagName('body');
const container1 = document.querySelector('.container1');
const graphGen = document.querySelector('#genGraph');
const td1 = document.querySelector('.AAPLstock');
const td2 = document.querySelector('.GMEstock');
const td3 = document.querySelector('.IBMstock');
const td4 = document.querySelector('.CSstock');
const td5 = document.querySelector('.MSFTstock');
const td6 = document.querySelector('.INTCstock');
const searchBar = document.querySelector('#search-input');
const rows = document.querySelectorAll('tbody tr');


const ws = new WebSocket('ws://localhost:9080/user');
            


            ws.addEventListener("open", () =>{
                console.log("WE are connected");
                ws.send("heya");

            });

            ws.addEventListener("message", e => {
                //console.log(e.data);
                let page = JSON.parse(e.data);
                let x = page.Update;
                let rowData = x.Data[0].RowData[4];
                //console.log(rowData);
                
                              
                let colorData = x.Data[0].Color;
                if(colorData === 'green'){
                    colorData === 'darkgreen';
                }
               
                if(x.Data[0].RowData[2] === 'AAPL'){
                     td1.innerHTML = x.Data[0].RowData[4];
                     td1.style.color=`${colorData}`;
                     aaplArr.push(x.Data[0].RowData[4]);
                     console.log(aaplArr);
                                      
                    
                    
                }
                else if(x.Data[0].RowData[2] === 'GME'){
                     td2.innerHTML = x.Data[0].RowData[4];
                     td2.style.color=`${colorData}`;
                }
                else if(x.Data[0].RowData[2] === 'IBM'){
                     td3.innerHTML = x.Data[0].RowData[4];
                     td3.style.color=`${colorData}`;
                }
                else if(x.Data[0].RowData[2] === 'CS'){
                     td4.innerHTML = x.Data[0].RowData[4];
                     td4.style.color=`${colorData}`;
                }
                else if(x.Data[0].RowData[2] === 'MSFT'){
                     td5.innerHTML = x.Data[0].RowData[4];
                     td5.style.color=`${colorData}`;
                }
                else if(x.Data[0].RowData[2] === 'INTC'){
                     td6.innerHTML = x.Data[0].RowData[4];
                     td6.style.color=`${colorData}`;
                }
               // getGraph();
            })
            
let tableClick = document.querySelector('#t01');

tableClick.addEventListener('click', (e) => {
                console.log(e.target.id)

                let clickedTarget = e.target.id;               

                var myInnerHtml = document.getElementById(`${clickedTarget}`).innerHTML;
                var myInnerTicker = document
                console.log(myInnerHtml);
                
})
// Table Search
searchBar.addEventListener('keyup', (e) => {
    const q = e.target.value;
    rows.forEach((row) => {
        row.querySelectorAll('td')[2].textContent.toLowerCase().startsWith(q) ? row.style.display = '' : row.style.display = 'none';
       
    });
})


//Table Sort
sortTable = (table, column , asc = true) => {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows1 = Array.from(tBody.querySelectorAll("tr"));
    //console.log(rows1);
    const sortedRows = rows1.sort((a, b) => {
        const aColtext = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColtext = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
   
      return aColtext > bColtext ? (1 * dirModifier) : (-1 * dirModifier);
    })
    while(tBody.firstChild)(
        tBody.removeChild(tBody.firstChild)
    )

    tBody.append(...sortedRows);
}


getGraph = () => {
    var data = [
        ["AAPL", td1.textContent],
        ["GME", td2.textContent],
        ["IBM", td3.textContent],
        ["CS", td4.textContent],
        ["MSFT", td5.textContent],
        ["INTC", td6.textContent]
      ];
      
      // create a chart
      chart = anychart.bar();
      
      // create a bar series and set the data
      var series = chart.bar(data);
      
      // set the container id
      chart.container("container");
      
      // initiate drawing the chart
      chart.draw();
}

graphGen.addEventListener('click', (e)=> {
    getGraph();
    console.log(e.target.value);
    
})
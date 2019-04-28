let canvas;
let CELL_SIZE = 30;

function initCanvas()
{
    canvas = document.getElementById('cc');
}

function fillCell(x, y, ctx)
{
    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
}

function drawCell( cellObj, ctx )
{
    let xOrig = cellObj.col * CELL_SIZE;
    let yOrig = cellObj.row * CELL_SIZE;
    let x = xOrig;
    let y = yOrig;
    ctx.beginPath();
    ctx.moveTo(xOrig,yOrig);
    x = x + CELL_SIZE;
    cellObj.wallUp ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    y = y + CELL_SIZE;
    cellObj.wallRight ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    x = x - CELL_SIZE;
    cellObj.wallDown ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    y = y - CELL_SIZE;
    cellObj.wallLeft ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    //ctx.closePath();

    if( cellObj.visited )
    {
        fillCell(xOrig, yOrig, ctx) 
    }
    ctx.stroke();
}

function drawGrid( gridObj )
{
    if(canvas && canvas.getContext)
    {
        CELL_SIZE = canvas.width / gridObj.cols;
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(255, 165, 0, 1.0)';
        ctx.strokeStyle = 'rgba(129, 73, 6, 1.0)';
        for(i = 0; i < gridObj.rows; ++i)
        {
            for(j = 0; j < gridObj.cols; ++j)
            {
                drawCell(gridObj.grid[i][j], ctx);
            }
        }
    }
}

function highlightCurrentCell(currentCell)
{
    if(canvas && canvas.getContext)
    {
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(255, 0, 0, 1.0)';
        fillCell(currentCell.col * CELL_SIZE, currentCell.row * CELL_SIZE, ctx);
    }
}

function clearCanvas()
{
    if(canvas && canvas.getContext)
    {
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function redrawGrid( gridObj )
{
    clearCanvas();
    drawGrid(gridObj);
}

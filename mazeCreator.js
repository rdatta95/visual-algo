var maze;

function initMaze()
{
    maze = new Grid( 10, 10 );
    drawGrid( maze );
    // clearCanvas();
}

function getInitCell()
{
    initPosX = 0;
    initPosY = 0;
    return maze.getCell(initPosX, initPosY);
}

function getUnvisitedNeighbours( currentCell )
{
    let neighbours = [];
    
    let neighbourUp = maze.getCell( currentCell.row, currentCell.col - 1);
    if(neighbourUp && !neighbourUp.isVisited()) 
        neighbours.push( neighbourUp );
    
    let neighbourRight = maze.getCell( currentCell.row + 1, currentCell.col);
    if(neighbourRight && !neighbourRight.isVisited())
        neighbours.push( neighbourRight );
    
    let neighbourDown = maze.getCell( currentCell.row, currentCell.col + 1);
    if(neighbourDown && !neighbourDown.isVisited())
        neighbours.push( neighbourDown );

    let neighbourLeft = maze.getCell( currentCell.row - 1, currentCell.col);
    if(neighbourLeft && !neighbourLeft.isVisited())
        neighbours.push( neighbourLeft );
    return neighbours;
}

function getRandomUnvisitedNeighbour( currentCell )
{
    unvisitedNeighbours = getUnvisitedNeighbours( currentCell );
    unvisitedNeighbourCount = unvisitedNeighbours.length;
    if(unvisitedNeighbourCount > 0)
    {
        randomIndex = Math.floor(Math.random() * 10 % unvisitedNeighbourCount);
        return unvisitedNeighbours[randomIndex];
    }
    else
        return undefined;
}

function removeWallBetweenCells( currentCell, nextCell)
{
    if( currentCell && nextCell )
    {
        if( currentCell.isTopWallTouching( nextCell ) )
        {
            currentCell.removeWallUp();
            nextCell.removeWallDown();
        }
        else if( currentCell.isRightWallTouching( nextCell ) )
        {
            currentCell.removeWallRight();
            nextCell.removeWallLeft();
        }
        else if( currentCell.isDownWallTouching( nextCell ) )
        {
            currentCell.removeWallDown();
            nextCell.removeWallUp();
        }
        else if( currentCell.isLeftWallTouching( nextCell ) )
        {
            currentCell.removeWallLeft();
            nextCell.removeWallRight();
        }
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateMaze()
{
    let currentCell = getInitCell();

    // Set initial cell as visited  
    currentCell.markAsVisited();
    redrawGrid(maze);

    let stack = [];
    stack.push(currentCell);
    while(stack.length > 0)
    {
        nextCell = getRandomUnvisitedNeighbour(currentCell);
        if(nextCell)
        {
            removeWallBetweenCells(currentCell, nextCell);
            stack.push(nextCell);
            nextCell.markAsVisited();
            currentCell = nextCell;
        }
        else
        {
            currentCell = stack.pop();
        }
        await sleep(02);
        redrawGrid( maze );
        highlightCurrentCell(currentCell);
    }
}

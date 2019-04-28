class Cell
{
    constructor(row, col)
    {
        this.wallUp = true;
        this.wallRight = true;
        this.wallDown = true;
        this.wallLeft = true;
        this.visited = false;
        this.row = row;
        this.col = col;
    }

    markAsVisited()
    {
        this.visited = true;
    }
    isVisited()
    {
        return this.visited;
    }
    
    removeWallUp()
    {
        this.wallUp = false;
    }
    removeWallRight()
    {
        this.wallRight = false;
    }
    removeWallDown()
    {
        this.wallDown = false;
    }
    removeWallLeft()
    {
        this.wallLeft = false;
    }

    isTopWallTouching( nextWall )
    {
        return (nextWall.row == this.row - 1 && nextWall.col == this.col);
    }
    isRightWallTouching( nextWall )
    {
        return (nextWall.row == this.row && nextWall.col == this.col + 1);
    }
    isDownWallTouching( nextWall )
    {
        return (nextWall.row == this.row + 1 && nextWall.col == this.col);
    }
    isLeftWallTouching( nextWall )
    {
        return (nextWall.row == this.row && nextWall.col == this.col - 1);
    }
}

class Grid
{
    constructor(rows, cols)
    {
        this.grid = new Array(rows);
        for(let i = 0; i < rows; ++i)
        {
            this.grid[i] = new Array(cols);
            for(let j = 0; j < cols; ++j)
            {
                this.grid[i][j] = new Cell( i, j );
            }
        } 
        this.rows = rows;
        this.cols = cols;
    }
    
    getCell(x, y)
    {
        if( x < 0 || x >= this.cols 
            || y < 0 || y > this.rows )
            return undefined;
        return this.grid[x][y];
    }
}

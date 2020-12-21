let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let image=""
window.addEventListener('load', function() {
    document.getElementById('input').onchange = function(e) {
        var img = new Image();
        img.src = URL.createObjectURL(this.files[0]);
        image = img
      };
  });
 
  draw = () => {
  canvas.width = image.width
  canvas.height = image.height
  ctx.drawImage(image, 0,0);
  alert("Image Successfully Upload")
}

getPixel = (row,col) => {
  let content = ctx.getImageData(0,0,col,row).data;
  var RGB = []
  for(var i=0;i<row;i++)
  {
    let rows=[]
    for(var j=0;j<col;j++)
    {
      let eachpix = []
      for(k=0;k<4;k++)
      {
          eachpix.push(content[(i*col+j)*4+k])
      }
      rows.push(eachpix)
    }
    RGB.push(rows)
  }
  return RGB
}
function setImageData(data, rows, cols) {
  const Image = Array.from({ length: rows*cols*4 });
  for(let i = 0;i < rows; i++) {
      for (let j = 0; j < cols; j++) {
          for (let k = 0; k < 4; k++) {
              Image[( i*cols + j ) * 4 + k ] = data[i][j][k];
          }
      }
  }
  const idata = ctx.createImageData(cols,rows);
  idata.data.set(Image);
  canvas.width = cols;
  canvas.height = rows;
  ctx.putImageData(idata, 0, 0);
}

flipHorizontal = () => {
    let row = canvas.height
    let col = canvas.width
    let imagedata = getPixel(row,col)
    for(var i=0;i<Math.floor(row/2);i++)
    {
      for(var j=0;j<col;j++)
      {
          let t = imagedata[i][j]
          imagedata[i][j] = imagedata[row-i-1][j]
          imagedata[row-i-1][j] = t
      }
    }
setImageData(imagedata,row,col)
}
flipVertical = () => {
  let row = canvas.height
  let col = canvas.width
  let imagedata = getPixel(row,col)
  for(var i=0;i<row;i++)
  {
    for(var j=0;j<Math.floor(col/2);j++)
    {
        let t = imagedata[i][j]
        imagedata[i][j] = imagedata[i][col-j-1]
        imagedata[i][col-j-1] = t
    }
  }
setImageData(imagedata,row,col)
}

rotateLeft = () => {
  let row = canvas.height
  let col = canvas.width
  let image = getPixel(row,col)
  rotateleft_image = []
  for(let i=col-1;i>=0;i--)
  {
     eachrow=[]
     for(let j=0;j<row;j++)
     {
        eachrow.push(image[j][i])
     }
     rotateleft_image.push(eachrow)
  }
  setImageData(rotateleft_image,col,row) 
}

rotateRight = () => {
  let row = canvas.height
  let col = canvas.width
  let image = getPixel(row,col)
  rotateright_image = []
  for(let i=0;i<col;i++)
  {
    eachrow = []
    for(let j=row-1;j>=0;j--)
    {
      eachrow.push(image[j][i])
    }
    rotateright_image.push(eachrow)
  }
  setImageData(rotateright_image,col,row)
}

setColor = () => {
    let col = canvas.width
    let row = canvas.height
    let image = getPixel(row,col)
    for(let i=0;i<row;i++)
    {
        for(let j=0;j<col;j++)
        {
            let RGB = image[i][j]
            let color = RGB[0]*0.3+RGB[1]*0.6+RGB[2]*0.11
            image[i][j][0] = color
            image[i][j][1] = color
            image[i][j][2] = color            
        }
    }
    setImageData(image,row,col)
}

document.getElementById("upload").addEventListener("click",draw)
document.getElementById("flipHor").addEventListener("click",flipHorizontal)
document.getElementById("flipVert").addEventListener("click",flipVertical)
document.getElementById("rotateL").addEventListener("click",rotateLeft)
document.getElementById("rotateR").addEventListener("click",rotateRight)
document.getElementById("greyscale").addEventListener("click",setColor)
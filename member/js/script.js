window.onload = function() {
    var resBlocks = document.querySelectorAll('.res-block');
    var resInfo = document.querySelectorAll('.res-info');
    var maxWidth = 0;
  
    resBlocks.forEach((block) => {
        maxWidth = block.offsetWidth > maxWidth ? block.offsetWidth : maxWidth;
    });
  
    resInfo.forEach((block) => {
      block.style.width = maxWidth + 'px';
    });
  };
  
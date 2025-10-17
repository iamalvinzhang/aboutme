
document.addEventListener('DOMContentLoaded', function() {
  
  const cursor = document.createElement('div');
  cursor.className = 'glowing-cursor';
  document.body.appendChild(cursor);


  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  
  const clickableElements = document.querySelectorAll('a, button, [role="button"], input[type="submit"], input[type="button"]');
  
  clickableElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      cursor.classList.add('clickable');
    });
    
    element.addEventListener('mouseleave', function() {
      cursor.classList.remove('clickable');
    });
  });

 
  document.addEventListener('mousedown', function() {
    cursor.classList.add('pulse');
  });
  
  document.addEventListener('mouseup', function() {
    cursor.classList.remove('pulse');
  });


  document.body.style.cursor = 'none';
  
  
  document.addEventListener('mouseleave', function() {
    cursor.style.display = 'none';
  });
  
  document.addEventListener('mouseenter', function() {
    cursor.style.display = 'block';
  });
});
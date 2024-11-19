// js/copy-button.js
document.addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll('pre[class*="language-"]');
    
    codeBlocks.forEach(block => {
      const button = document.createElement('button');
      button.className = 'copy-button';
      button.textContent = 'Copy';
      
      button.addEventListener('click', async () => {
        const code = block.querySelector('code').textContent;
        await navigator.clipboard.writeText(code);
        
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      });
      
      block.appendChild(button);
    });
  });
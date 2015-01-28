# axtatic
PHP WYSIWYG static site editor

Purpose: Quickpatching server-side static HTML files content.

Security: Simple password. No session used. No cookie used.


1. Set up a password in /axtatic/axtatic.php
2. Upload /axtatic/ to server
3. Include /axtatic/axtatic.js with static HTML page just before &lt;/body&gt; tag:
&lt;script type="text/javascript" src="axtatic/axtatic.js"&gt;&lt;/script&gt;
4. Go open that page in browser.
5. Press Alt+Shift+L and enter the password.
6. Edit the page.
7. Press "SAVE". Bingo.

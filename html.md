<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Context Menu Example</title>
    <style>
        /* Define styles for the context menu */
        .context-menu {
    display: none;
    position: fixed; /* Change to fixed position */
    background-color: #f9f9f9;
    min-width: 120px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    z-index: 1;
}
        .context-menu-item {
            padding: 8px 12px;
            cursor: pointer;
        }
        .context-menu-item:hover {
            background-color: #ddd;
        }
    </style>
</head>
<body>
    <div>TEST</div>
  
     <input type="text" id="textInput" placeholder="Right click here to see context menu"> 
    
    <div class="context-menu" id="contextMenu">
        <div class="context-menu-item" id="pasteOption1">Paste Option 1</div>
        <div class="context-menu-item" id="pasteOption2">Paste Option 2</div>
        <div class="context-menu-item" id="pasteOption3">Paste Option 3</div>
    </div>
    
    <script src="context.js"></script>
</body>
</html>

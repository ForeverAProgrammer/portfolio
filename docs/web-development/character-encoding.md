---
sidebar_position: 1
---

# Character Encoding on Websites

Character encoding is fundamental to how text is displayed on websites. Understanding it helps prevent issues with special characters and internationalization.

## What is Character Encoding?

Character encoding is a system that maps characters (letters, numbers, symbols) to specific numeric codes that computers can understand and store. Without proper encoding, text may display as garbled characters (e.g., � or ??????).

## Common Character Encodings

### UTF-8 (Recommended)
- **Most widely used** encoding for web content
- Supports **all Unicode characters** (1.1+ million characters)
- Backward compatible with ASCII
- Variable-length encoding (1-4 bytes per character)
- Supports all languages including emoji

### ASCII
- Original character encoding standard
- Only supports 128 characters
- Limited to English letters, numbers, and basic symbols
- 7-bit encoding

### ISO-8859-1 (Latin-1)
- Extension of ASCII
- Supports Western European languages
- 8-bit encoding (256 characters)
- **Legacy encoding** - use UTF-8 instead

## Setting Character Encoding in HTML

### HTML5 (Modern)
Always include this meta tag in your `<head>` section:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Page</title>
</head>
<body>
    <h1>Hello World! 你好 🌍</h1>
</body>
</html>
```

### Older HTML (HTML4/XHTML)
```html
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
```

## Server Configuration

### Setting HTTP Headers
The server should send the correct Content-Type header:

```
Content-Type: text/html; charset=UTF-8
```

### Apache (.htaccess)
```apache
AddDefaultCharset UTF-8
```

### Nginx
```nginx
charset UTF-8;
```

## Saving Files with Correct Encoding

When creating HTML files:
1. **Save your files in UTF-8 encoding** (most text editors have this option)
2. Use **UTF-8 without BOM** (Byte Order Mark) for HTML/CSS/JS files
3. Verify your editor's default encoding settings

## Common Issues and Solutions

### Problem: Special characters display as �
**Solution:**
- Add `<meta charset="UTF-8">` to your HTML
- Ensure your file is saved in UTF-8 encoding
- Check server headers

### Problem: Characters work locally but not on server
**Solution:**
- Verify server is sending correct Content-Type header
- Check file upload didn't change encoding
- Ensure database/backend uses UTF-8

### Problem: Mixing encodings causes corruption
**Solution:**
- Use UTF-8 consistently across:
  - HTML files
  - Database
  - Server configuration
  - API responses

## Best Practices

1. **Always use UTF-8** for new projects
2. **Declare encoding early** in `<head>` (before any content)
3. **Be consistent** - use UTF-8 everywhere (files, database, server)
4. **Test with international characters** including emoji: 你好 مرحبا 🌍
5. **Avoid legacy encodings** like ISO-8859-1 or Windows-1252

## Testing Your Encoding

Test page with various characters:
- **English:** Hello
- **Spanish:** ¿Hola! ñ á é í ó ú
- **German:** Über Größe äöü
- **French:** Français ç à è é
- **Chinese:** 你好世界
- **Arabic:** مرحبا
- **Emoji:** 😀 🌍 ⭐

## Resources

- [MDN Web Docs: Character Encodings](https://developer.mozilla.org/en-US/docs/Glossary/Character_encoding)
- [W3C: Character encodings in HTML](https://www.w3.org/International/questions/qa-html-encoding-declarations)
- [UTF-8 Everywhere Manifesto](https://utf8everywhere.org/)

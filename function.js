window.function = function(urls, backgroundColor, textColor) {
    // Data
    urls = urls.value ?? "";
    backgroundColor = backgroundColor.value ?? "#000";
    textColor = textColor.value ?? "#FFF";

    // Decodes URL-encoded characters using decodeURIComponent
    const decodeUrls = urls.map(url => decodeURIComponent(url));

    // Defines the inline CSS for the pill-style links
    const linkStyle = `padding: 8px 15px; background-color: ${backgroundColor}; color: ${textColor}; text-decoration: none; border-radius: 20px; margin: 5px; display: inline-block; font-size: 14px;`;

    // Creates an HTML string with anchor tags for each URL, including the ↗ emoji
    const linksHTML = decodeUrls.map(url => {
        const fileName = url.split('/').pop();
        return `<a href="${url}" target="_blank" style="${linkStyle}">↗ ${fileName}</a>`;
    }).join('');

    // Returns the full HTML string
    return `<div class="links-component" style="margin-bottom: 10px;">${linksHTML}</div>`;
}

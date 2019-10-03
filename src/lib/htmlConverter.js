export const htmlConverter = html => {
  let convertedHTML;
  convertedHTML = convertLink(html);
  convertedHTML = convertYoutube(html);

  return convertedHTML;
};

const convertLink = html => {
  let convertedHTML = html;
  const regexp = new RegExp(/<a href="(.*)">(.*)<\/a>/);
  const targetStr =
    '<a target="_blank" rel="noopener noreferrer" href="$1">$2</a>';
  while (regexp.exec(convertedHTML) !== null) {
    convertedHTML = convertedHTML.replace(regexp, targetStr);
  }
  return convertedHTML;
};

const convertYoutube = html => {
  let convertedHTML = html;
  const regexp = new RegExp(
    /<p>\(<a\shref="https:\/\/www\.youtube\.com\/watch\?v=(.+)".+/
  );
  const targetStrYT =
    '<div class="youtube"><iframe type="text/html" src="https://youtube.com/embed/$1"></iframe></div>';
  while (regexp.exec(convertedHTML) !== null) {
    convertedHTML = convertedHTML.replace(regexp, targetStrYT);
  }
  return convertedHTML;
};

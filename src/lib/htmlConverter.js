export const htmlConverter = html => {
  let convertedHTML;
  convertedHTML = convertLink(html);
  convertedHTML = convertYoutube(convertedHTML);

  return convertedHTML;
};

const convertLink = html => {
  let convertedHTML = html;
  const regexp = new RegExp(/<a href="(.*)">(.*)<\/a>/g);
  const targetStr =
    '<a target="_blank" rel="noopener noreferrer" href="$1">$2</a>';
  convertedHTML = convertedHTML.replace(regexp, targetStr);
  return convertedHTML;
};

const convertYoutube = html => {
  let convertedHTML = html;
  const regexp = new RegExp(
    /<p>\(<a\shref="https:\/\/www\.youtube\.com\/watch\?v=(.+)".+/g
  );
  const targetStrYT =
    '<div class="youtube"><iframe type="text/html" src="https://youtube.com/embed/$1"></iframe></div>';
  convertedHTML = convertedHTML.replace(regexp, targetStrYT);
  return convertedHTML;
};

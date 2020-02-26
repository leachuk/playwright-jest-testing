const AEMPageUtilities = require('./AEMPageUtilities');

global.getElementScreenshot = async (aemUtils, browserName, renditionObj, cssSelector) => {
  const page = await aemUtils.getPage(browserName);
  const resizedPage = await AEMPageUtilities.setViewportSize(page, renditionObj);
  const element = await resizedPage.$(cssSelector);
  const image = await element.screenshot();
  return image;
};

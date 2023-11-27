import { Selector } from 'testcafe';

class UploadPage {
  constructor() {
    this.pageId = '#add-posts';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async goToProfile(testController) {
    await testController.click('#profile-0');
  }
}

export const uploadPage = new UploadPage();

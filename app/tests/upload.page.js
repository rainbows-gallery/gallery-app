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

  async postImage(testController) {
    await testController.setFilesToUpload('#upload-input', ['test.png']);
    await testController.typeText('#description', 'test');
    await testController.click('#post-Submit');
  }
}

export const uploadPage = new UploadPage();
